# `/api/` — Decap CMS GitHub OAuth handler

Two Vercel serverless functions that let non-developers log in to the CMS at
`/admin/` with GitHub, on Vercel (replacing Netlify's `git-gateway`, which
only works on Netlify).

| Route | File | Job |
|---|---|---|
| `/api/auth` | `auth.py` | Redirects the editor to GitHub's consent screen. |
| `/api/callback` | `callback.py` | Exchanges the returned code for a token and hands it to the CMS. |

Both are **Python, standard-library only** — no `requirements.txt`, no
`package.json`. Vercel auto-detects `api/*.py` and runs them with its Python
runtime; they coexist with the static site built by `python3 build.py`.

## One-time setup

**1. Create a GitHub OAuth App**
GitHub → Settings → Developer settings → **OAuth Apps → New OAuth App**
(for an org: the org's Developer settings).

- **Application name:** `Sport Endorse CMS`
- **Homepage URL:** `https://www.sportendorse.com`
- **Authorization callback URL:** `https://www.sportendorse.com/api/callback`

Click **Register**, then **Generate a new client secret**. Copy the **Client ID**
and **Client secret**.

> Testing on the `*.vercel.app` URL before DNS is live? Either register a second
> OAuth App whose callback is `https://<your-project>.vercel.app/api/callback`,
> or add that callback to the same app (GitHub allows one callback per app, so a
> second app is usually cleaner), and temporarily point `base_url` in
> `admin/config.yml` at the `.vercel.app` origin.

**2. Add the secrets to Vercel**
Vercel → Project → **Settings → Environment Variables** (Production, Preview):

| Name | Value |
|---|---|
| `OAUTH_GITHUB_CLIENT_ID` | the Client ID |
| `OAUTH_GITHUB_CLIENT_SECRET` | the Client secret |

Redeploy after adding them (Deployments → ⋯ → Redeploy) so the functions pick
them up.

**3. Point the CMS at these endpoints** — already done in `admin/config.yml`:

```yaml
backend:
  name: github
  repo: OWNER/REPO                       # ← set to the real repo
  branch: main
  base_url: https://www.sportendorse.com # origin serving /api/auth + /api/callback
  auth_endpoint: api/auth
```

Set `repo` to the real `OWNER/REPO`. Give CMS editors **write access** to that
repo (or use a dedicated machine account), since each save commits to `main`.

## How it flows

```
/admin/  →  /api/auth  →  github.com/login/oauth/authorize
                              │ (editor approves)
        GitHub → /api/callback?code=…  →  exchange code for token
                              │
        postMessage handshake hands the token back to the /admin/ window
                              │
        editor saves → commit to main → Vercel rebuilds → live in ~1–2 min
```

## Local testing (optional)

You don't need this deployed to edit content — for local CMS testing run
`npx decap-server` and add `local_backend: true` to `admin/config.yml`. The
OAuth functions are only exercised against the real GitHub App, i.e. on a
deployed Vercel URL.

## Security notes

- The client **secret** lives only in Vercel env vars, never in the repo.
- `auth.py` sets a short-lived, `HttpOnly` `state` cookie; `callback.py` rejects
  any mismatch (CSRF protection).
- `scope` is `repo` so the CMS can commit to a **private** repo. If the repo is
  public, you can narrow it to `public_repo` in `auth.py`.
