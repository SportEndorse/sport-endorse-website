# Deploying the Sport Endorse site — GitHub + Vercel

**Audience:** Collin (implementation). **Goal:** get this site live on Vercel, auto-deploying from GitHub, with preview URLs on every branch.

Estimated time: **30–45 min** for a working production deploy (steps 0–7). The CMS and custom domain (steps 8–9) can follow once it's live.

---

## 0. Understand what you're deploying (2 min read — don't skip)

This is **not** a Next.js/React app and **not** a plain folder of HTML. It's a **Python static-site generator**:

- `build.py` is the generator. Run `python3 build.py` and it **writes the finished site into the repo root itself** — `index.html`, `brands.html`, …, plus `es/ fr/ de/ it/`, `blog/`, `help/`, `sitemap.xml`, `robots.txt`, `llms.txt`, and `assets/i18n-avail.js`.
- It has **no third-party dependencies** — Python 3 standard library only. There is no `requirements.txt` and you don't need one.
- Page copy, pricing and structure live in `build.py` and the `t_*.py` translation files. Editable *content* (logos, team, athletes, case-study cards, blog posts, company facts) lives in `content/*.json` and is read at build time.
- `assets/` and `images/` are **committed static files** (not generated) — the build only writes one file into `assets/` (`i18n-avail.js`).

**Implication for Vercel:** the "build" is `python3 build.py` and the "output directory" is the repo root (`.`). That's the faithful equivalent of the old `netlify.toml` (`command = "python3 build.py"`, `publish = "."`).

---

## 1. Prerequisites

- [ ] A **GitHub account** with permission to create a repo in the Sport Endorse org (or your own account to start).
- [ ] A **Vercel account** — sign up at [vercel.com](https://vercel.com) with **"Continue with GitHub"** so the two are linked from the start.
- [ ] **Git** and **Python 3.10+** installed locally (`git --version`, `python3 --version`).

---

## 2. Put the code on GitHub

From inside the website folder (the one containing `build.py`):

```bash
cd "path/to/2026.07.20"      # the folder with build.py in it

git init
git branch -M main
git add .
git commit -m "Initial import: Sport Endorse static site"
```

Create an **empty** repo on GitHub named e.g. `sportendorse-website` (no README/gitignore — the repo already has files), then:

```bash
git remote add origin https://github.com/<org-or-user>/sportendorse-website.git
git push -u origin main
```

> **Private vs public:** make the repo **private**. See the note in step 6 about source files (`build.py`, `t_*.py`) being reachable on the deployed site — a private repo keeps the source out of GitHub, and step 6 handles the deployed side.

Add a `.gitignore` so local junk never gets committed (create the file, paste, commit):

```gitignore
# OS / editor
.DS_Store
Thumbs.db
.vscode/
.idea/

# Python
__pycache__/
*.pyc

# Vercel
.vercel
```

```bash
git add .gitignore && git commit -m "Add .gitignore" && git push
```

---

## 3. Do a local test build first (catch problems before Vercel does)

```bash
python3 build.py
```

You should see it print `built index.html`, `built es/index.html`, … and finish with a `DONE: … pages` line. Then preview it:

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

Click around: homepage, `/brands.html`, `/subscription.html`, the `/es/` pages, `/help/`, `/blog/`. If this works locally, Vercel will work too.

> The build writes files into the repo root. **Do not commit the generated HTML** as your source of truth — Vercel regenerates it on every deploy. It's fine if some generated files are already tracked; they'll just be overwritten each build. (Optional tidy-up is in step 10.)

---

## 4. Remove the old-host configs

This repo shipped with configs for two *other* hosts. Leaving them causes confusion and, in the case of the GitHub Pages workflow, a second competing deployment on every push. Delete both:

```bash
git rm netlify.toml
git rm .github/workflows/build-deploy.yml
git commit -m "Remove Netlify + GitHub Pages configs (moving to Vercel)"
git push
```

(If the org wants to keep GitHub Pages as a backup, you can instead leave the workflow — but expect two deploys per push. Cleaner to remove it.)

---

## 5. Import the repo into Vercel

1. Vercel dashboard → **Add New… → Project**.
2. **Import** the `sportendorse-website` repo (authorize Vercel for the org if prompted).
3. On the configuration screen, set:

   | Setting | Value |
   |---|---|
   | **Framework Preset** | **Other** |
   | **Build Command** | `python3 build.py` |
   | **Output Directory** | `.`  *(a single dot — the repo root)* |
   | **Install Command** | leave **empty** (no dependencies) |
   | **Root Directory** | leave as-is (repo root) unless you nested the project in a subfolder |

4. Click **Deploy**.

Vercel's build image includes Python 3, so `python3 build.py` runs directly — no extra runtime config needed. First build takes ~1 minute. When it finishes you'll get a live URL like `sportendorse-website.vercel.app`. Open it and click through.

> **If the build fails with "python3: command not found"** (rare): add the tiny `vercel.json` in step 10, which pins the build explicitly, or use the GitHub Actions fallback at the bottom of that step.

---

## 6. Lock down source files on the deployed site (recommended)

Because the output directory is the repo root, the deployed site *also* serves `build.py`, `t_*.py`, `content/*.json`, etc. On a private repo the source isn't on GitHub, but it would still be fetchable at `https://…/build.py`. To block that, add a **`vercel.json`** at the repo root:

```json
{
  "buildCommand": "python3 build.py",
  "outputDirectory": ".",
  "headers": [
    { "source": "/build.py", "headers": [{ "key": "x-robots-tag", "value": "noindex" }] }
  ],
  "redirects": [
    { "source": "/(.*)\\.py", "destination": "/404.html", "statusCode": 404 },
    { "source": "/content/(.*)", "destination": "/404.html", "statusCode": 404 },
    { "source": "/t_(.*)", "destination": "/404.html", "statusCode": 404 }
  ]
}
```

With `vercel.json` present, the dashboard build/output settings are read from this file (you can leave the dashboard fields as set). Commit it:

```bash
git add vercel.json && git commit -m "Add vercel.json (build config + block source files)" && git push
```

The push auto-triggers a redeploy (see step 7).

> Not launch-blocking — you can ship without this and add it right after. But do add it before pointing the real domain at Vercel.

---

## 7. How auto-deploy works from here

Once the repo is connected, Vercel deploys automatically — you won't touch the dashboard again for routine changes:

- **Push to `main`** → Vercel rebuilds (`python3 build.py`) and updates **production**.
- **Push any other branch, or open a PR** → Vercel builds a **Preview Deployment** at a unique URL and comments it on the PR. Use these to review copy/pricing changes before they go live.

Typical change workflow for you or the team:

```bash
git checkout -b update-pricing
# edit build.py / t_*.py / content/*.json
git commit -am "Update Q4 pricing copy"
git push -u origin update-pricing
# open a PR → Vercel posts a preview URL → review → merge to main → live
```

---

## 8. Point the domain at Vercel

When you're ready to go live on the real domain:

1. Vercel → your project → **Settings → Domains → Add**.
2. Add the production domain (e.g. `www.sportendorse.com`, and `sportendorse.com` redirecting to it).
3. Vercel shows the DNS records to set. In the DNS provider (Cloudflare / registrar):
   - `www` → **CNAME** → `cname.vercel-dns.com`
   - apex `sportendorse.com` → **A** record to Vercel's IP (Vercel displays the current one), or use the registrar's ALIAS/ANAME if available.
4. Wait for DNS to propagate; Vercel provisions HTTPS automatically.

> **`BASE` URL:** `build.py` hard-codes `BASE = "https://www.sportendorse.com"` (used in canonicals, sitemap, hreflang, JSON-LD). Those are already correct for the production domain, so canonicals will be right in production. On the temporary `*.vercel.app` URL they'll still *point at* `www.sportendorse.com` — that's expected and fine; don't submit the `.vercel.app` URL to Search Console.
>
> **Cloudflare users:** the README notes AI crawlers must also be allowed in Cloudflare's bot settings, not just `robots.txt`. Keep that in mind if DNS is proxied through Cloudflare.

---

## 9. The CMS (`/admin/`) — important, handle separately

The site includes **Decap CMS** at `/admin/` so non-developers can edit logos, team, athletes, case studies, blog posts and company facts. **Its current backend won't work on Vercel:**

`admin/config.yml` uses `backend: name: git-gateway`, which depends on **Netlify Identity** — a Netlify-only service. On Vercel it will fail to log in.

**The GitHub OAuth backend is already scaffolded in this repo** — `admin/config.yml` is set to `backend: name: github`, and the OAuth handler ships as two Vercel serverless functions in **`/api/`** (`auth.py`, `callback.py`, Python stdlib only). You just need to connect a GitHub OAuth App. Full instructions are in **[`api/README.md`](api/README.md)**; the short version:

1. **Create a GitHub OAuth App** — callback URL `https://www.sportendorse.com/api/callback`; copy the Client ID + secret.
2. **Add two env vars in Vercel** (Settings → Environment Variables): `OAUTH_GITHUB_CLIENT_ID`, `OAUTH_GITHUB_CLIENT_SECRET`; then redeploy.
3. **Set `repo:` in `admin/config.yml`** to the real `OWNER/REPO` (it's currently a placeholder), and give CMS editors write access to the repo (or use a machine account).

That's it — editors then log in at `/admin/` with GitHub, and each save commits to `main` → Vercel rebuilds → live in ~1–2 min. `base_url`/`auth_endpoint` are already pointed at `/api/auth` in `config.yml`.

**Launch-today alternative:** you don't have to wire this up before going live. Content is just JSON/Markdown in `content/` and can be edited directly in GitHub's web UI meanwhile. The site builds identically. The only thing to remember is that `/admin/` login won't complete until the OAuth App + env vars (steps 1–2 above) are in place — it won't break anything else.

> The old `git-gateway` (Netlify-only) backend has already been removed from `config.yml`, so there's no broken Netlify Identity config left in production.

---

## 10. Optional clean-up (nice to have, not required)

- **Keep generated HTML out of git.** Since Vercel regenerates everything, you don't need the built `.html` in the repo. This is optional and slightly fiddly because `build.py` writes in place next to committed `assets/`/`images/`; the simplest safe version is to leave things as-is. Only pursue this if the noisy diffs bother the team.
- **`vercel.json`** — already covered in step 6; it also pins the build command so the project isn't reliant on dashboard settings.

**GitHub Actions fallback (only if Vercel can't run Python):** instead of Vercel building, have GitHub Actions run `python3 build.py`, commit the output to a `gh-pages`-style branch or artifact, and set Vercel to deploy that static output with **Build Command: (empty)** and **Output Directory: `.`**. This is a fallback — the step-5 path (Vercel runs Python) is simpler and should work.

---

## Launch checklist

- [ ] `python3 build.py` runs clean locally (step 3)
- [ ] Repo pushed to GitHub, `.gitignore` in place (step 2)
- [ ] `netlify.toml` and the GitHub Pages workflow removed (step 4)
- [ ] Vercel project deploys green with Build Command `python3 build.py`, Output `.` (step 5)
- [ ] `vercel.json` added to block source files (step 6)
- [ ] Push-to-`main` triggers a production deploy; PRs get preview URLs (step 7)
- [ ] Custom domain added and HTTPS active (step 8)
- [ ] CMS decision made — GitHub OAuth backend wired up, or `/admin/` parked (step 9)
- [ ] Sanity pass on live site: EN + `/es/`, `/help/`, `/blog/`, pricing page, `sitemap.xml`, `robots.txt`
- [ ] `sitemap.xml` submitted in Google Search Console (production domain only)

---

## Quick troubleshooting

| Symptom | Fix |
|---|---|
| Build fails: `python3: command not found` | Add `vercel.json` (step 6/10) or use the GitHub Actions fallback. |
| Build succeeds but site is 404 / blank | Output Directory must be `.` (a dot), not `public` or `dist`. |
| CSS/images missing on live site | `assets/` and `images/` must be committed to git — they're static, not generated. Confirm they were pushed. |
| `/admin/` won't log in | Expected until step 9 is done — `git-gateway` is Netlify-only. Switch to the GitHub backend. |
| Canonical URLs show `www.sportendorse.com` on the `.vercel.app` preview | Expected — `BASE` is hard-coded in `build.py`. Correct in production; ignore on previews. |
| A CMS edit didn't appear | It commits to `main`, which triggers a rebuild — check the Vercel **Deployments** tab for the run and its logs. |

---

*Questions on the build internals: see `README.md` in this repo. The generator is `build.py`; translations are `t_es.py`/`t_fr.py`/`t_de.py`/`t_it.py`; editable content is `content/*.json`.*
