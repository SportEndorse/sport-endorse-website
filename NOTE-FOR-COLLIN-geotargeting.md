# Note for Collin — enabling IP-based geotargeting on Vercel

We removed the manual region dropdown from the site header. Region (which drives
the pricing currency: £ / $ / €) is now chosen automatically. There are **two
layers**, and only the first needs anything from you on the Vercel side.

---

## 1. True IP geotargeting — `middleware.js` (needs a quick check from you)

**What it does:** `middleware.js` (in the repo root) is a Vercel **Edge
Middleware**. On the first page a visitor loads, it reads their IP country at
the edge (`geolocation()` → `x-vercel-ip-country`), maps it to one of our
regions (`us | uk | ie | eu | za | row`), and sets a `se-geo` cookie. The
front-end (`assets/site.js`) reads that cookie first when picking the region.

**What you need to check / do:**

1. **Dependency install.** `middleware.js` imports `@vercel/edge`. We added a
   minimal `package.json` at the root that lists it as a dependency. Vercel
   should run the install step automatically before our Python build.
   - Our build command is `python3 build.py` (set in `vercel.json`).
   - If the deploy log shows `@vercel/edge` was **not** installed (i.e. the
     middleware fails to bundle), set the **Install Command** in
     Project → Settings → General to `npm install` explicitly. That runs first,
     then `python3 build.py`.
   - (Alternative if you'd rather not add npm to a Python project at all: the
     middleware can be rewritten to read the `x-vercel-ip-country` header
     directly with the raw Web API and drop the `@vercel/edge` dependency +
     `package.json`. Happy to switch it — just let us know.)

2. **Middleware detection.** Vercel auto-detects `middleware.js` at the repo
   root — no config needed. After deploy, confirm it appears under
   Project → Deployments → (latest) → **Functions / Middleware**.

3. **Geo headers.** The IP-country header is provided automatically by Vercel
   on all plans. **No environment variables or extra config required.**

4. **Matcher / cost.** The middleware only runs on page navigations
   (`assets/`, `images/`, `admin/` are excluded) and only sets the cookie once
   per visitor (30-day cookie), so invocation volume stays low.

**How to test (it won't work on localhost — needs the edge):**
- Deploy to a Preview or Production URL.
- Open DevTools → Application → Cookies and confirm a `se-geo` cookie appears
  with a value like `uk`, `us`, `ie`, `eu`, `za`, or `row`.
- Load `/subscription` and check the currency matches (UK IP → £, US → $,
  IE/EU → €). Use a VPN to spot-check other countries.

**If the middleware is ever removed/disabled, nothing breaks** — the site falls
back to client-side detection (browser language + timezone). It's just less
precise than true IP.

**Region mapping** lives at the top of `middleware.js` (`REGION_BY_COUNTRY`) and
is easy to edit if you want to move a country into a different pricing region.

---

## 2. Gentle language banner — no action needed

`assets/site.js` shows a small, dismissible banner (bottom of the screen) if a
visitor's **browser language** is one we publish (ES / FR / DE / IT / NL) and
differs from the page they're on — e.g. a Spanish browser on an English page
sees "Esta página también está disponible en español · Ver en español". It's
one tap, never auto-redirects (better for SEO and for users), and is remembered
once dismissed. This is 100% client-side — **nothing to configure on Vercel.**

---

## Summary of files added/changed
- `middleware.js` — **new** — Edge Middleware for IP → region cookie.
- `package.json` — **new** — so Vercel installs `@vercel/edge`.
- `assets/site.js` — reads the `se-geo` cookie; adds the language banner.
- `assets/style.css` — styles for the banner.
- Header — region dropdown removed (language selector kept).

Any questions, ping us and we'll adjust.
