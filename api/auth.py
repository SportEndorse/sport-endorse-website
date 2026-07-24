# Decap CMS — GitHub OAuth: step 1 of 2 (authorize)
#
# Vercel serverless function (Python, standard library only — no dependencies).
# Reached at /api/auth. Redirects the editor's browser to GitHub's consent
# screen, then GitHub sends them back to /api/callback (see callback.py).
#
# Required environment variables (set in Vercel → Project → Settings → Env Vars):
#   OAUTH_GITHUB_CLIENT_ID      — from the GitHub OAuth App
#   OAUTH_GITHUB_CLIENT_SECRET  — used by callback.py, not here
# See api/README.md for the full one-time setup.

from http.server import BaseHTTPRequestHandler
import os
import secrets
import urllib.parse


class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        client_id = os.environ.get("OAUTH_GITHUB_CLIENT_ID")
        if not client_id:
            self.send_response(500)
            self.send_header("Content-Type", "text/plain; charset=utf-8")
            self.end_headers()
            self.wfile.write(b"Missing OAUTH_GITHUB_CLIENT_ID environment variable.")
            return

        # Reconstruct this deployment's own origin so the callback URL is correct
        # on production, preview and custom domains alike.
        host = self.headers.get("x-forwarded-host") or self.headers.get("host", "")
        proto = self.headers.get("x-forwarded-proto", "https")
        redirect_uri = f"{proto}://{host}/api/callback"

        # CSRF protection: random state echoed back by GitHub and re-checked in
        # callback.py against this HttpOnly cookie.
        state = secrets.token_urlsafe(24)

        params = urllib.parse.urlencode({
            "client_id": client_id,
            "redirect_uri": redirect_uri,
            "scope": "repo,user:email",   # "repo" so the CMS can commit to a private repo
            "state": state,
            "allow_signup": "false",
        })
        authorize_url = "https://github.com/login/oauth/authorize?" + params

        self.send_response(302)
        self.send_header("Location", authorize_url)
        self.send_header(
            "Set-Cookie",
            f"decap_oauth_state={state}; Path=/; Max-Age=600; HttpOnly; Secure; SameSite=Lax",
        )
        self.end_headers()
