# Decap CMS — GitHub OAuth: step 2 of 2 (callback)
#
# Vercel serverless function (Python, standard library only — no dependencies).
# GitHub redirects the editor here (/api/callback) with a short-lived ?code.
# This exchanges that code for an access token and hands it back to the Decap
# admin window using Decap/Netlify-CMS's postMessage handshake.
#
# Required environment variables (Vercel → Project → Settings → Env Vars):
#   OAUTH_GITHUB_CLIENT_ID
#   OAUTH_GITHUB_CLIENT_SECRET
# See api/README.md for setup.

from http.server import BaseHTTPRequestHandler
import os
import json
import urllib.parse
import urllib.request


def _cookies(header):
    out = {}
    for part in (header or "").split(";"):
        if "=" in part:
            k, v = part.strip().split("=", 1)
            out[k] = v
    return out


def _handshake_page(message):
    """HTML returned in the popup. It performs the Decap OAuth handshake:
    posts 'authorizing:github' to the opener, then replies to the opener's
    response with the auth result on the opener's real origin."""
    msg_literal = json.dumps(message)  # safe JS string literal
    return (
        "<!doctype html><html><head><meta charset=\"utf-8\">"
        "<title>Signing in…</title></head><body>"
        "<script>(function(){"
        "var message=" + msg_literal + ";"
        "if(!window.opener){document.body.innerText="
        "'This page must be opened from the CMS login window.';return;}"
        "function receive(e){"
        "window.removeEventListener('message',receive,false);"
        "window.opener.postMessage(message,e.origin);"
        "}"
        "window.addEventListener('message',receive,false);"
        "window.opener.postMessage('authorizing:github','*');"
        "})();</script>"
        "<p>Completing sign-in… you can close this window if it does not close "
        "automatically.</p></body></html>"
    )


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        params = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
        code = params.get("code", [None])[0]
        state = params.get("state", [None])[0]
        cookie_state = _cookies(self.headers.get("cookie")).get("decap_oauth_state")

        if not code:
            return self._error("No authorization code was returned by GitHub.")
        if not state or not cookie_state or state != cookie_state:
            return self._error("OAuth state mismatch — please try signing in again.")

        client_id = os.environ.get("OAUTH_GITHUB_CLIENT_ID")
        client_secret = os.environ.get("OAUTH_GITHUB_CLIENT_SECRET")
        if not client_id or not client_secret:
            return self._error(
                "Server is missing OAUTH_GITHUB_CLIENT_ID / OAUTH_GITHUB_CLIENT_SECRET."
            )

        try:
            token = self._exchange(client_id, client_secret, code)
        except Exception as exc:  # network / GitHub error
            return self._error("Token exchange failed: %s" % exc)

        if not token:
            return self._error("GitHub did not return an access token.")

        payload = json.dumps({"token": token, "provider": "github"})
        self._respond(_handshake_page("authorization:github:success:" + payload))

    def _exchange(self, client_id, client_secret, code):
        body = urllib.parse.urlencode({
            "client_id": client_id,
            "client_secret": client_secret,
            "code": code,
        }).encode("utf-8")
        req = urllib.request.Request(
            "https://github.com/login/oauth/access_token",
            data=body,
            headers={
                "Accept": "application/json",
                "User-Agent": "sportendorse-decap-oauth",
            },
            method="POST",
        )
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.load(resp)
        return data.get("access_token")

    def _error(self, message):
        payload = json.dumps({"message": message})
        self._respond(_handshake_page("authorization:github:error:" + payload))

    def _respond(self, html_str):
        body = html_str.encode("utf-8")
        self.send_response(200)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        # clear the state cookie now it's been used
        self.send_header("Set-Cookie", "decap_oauth_state=; Path=/; Max-Age=0")
        self.end_headers()
        self.wfile.write(body)
