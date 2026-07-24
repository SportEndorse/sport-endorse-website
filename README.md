# Sport Endorse — Rebuilt Website

A fully server-rendered, AEO-first rebuild of sportendorse.com. Every word of content ships as plain HTML — no "JavaScript required" wall, no click-to-reveal accordions — which directly fixes the two critical crawl blockers identified in the SEO/AEO Master Transformation Plan.

## What's in the box

| File | Purpose |
|---|---|
| `index.html` | Homepage — answer-first block, entity ticker, brand wall, 3 segments, FAQ schema |
| `brands.html`, `talent.html`, `agencies.html` | The three audience pages |
| `subscription.html` | Pricing with monthly framing ("~€150/month"), Offer + FAQ schema, VAT/purchase-friction FAQs |
| `compare-athlete-marketing-platforms.html` | Objective 5-platform comparison incl. "where they beat us" |
| `healthcare-athlete-marketing.html` | ICP1 solution page (FTC/FDA compliance playbook) |
| `regulated-industries.html` | ICP3/ICP6 finance, banking, insurance + corporate speakers |
| `campaign-measurement.html` | Reporting/ROI page |
| `why-athlete-sourcing-is-broken.html` | Awareness-stage content hub |
| `success-stories.html` | Fully rendered case studies (14-part framework, segmented by industry) |
| `about.html` | Brand Hub — canonical entity facts table + founder Person schema |
| `faqs.html` | All 25 tracked HubSpot AEO prompts as **literal H3 headings** with 40–70 word answers + FAQPage schema |
| `robots.txt` | Explicitly allows GPTBot, OAI-SearchBot, PerplexityBot, ClaudeBot, Google-Extended |
| `llms.txt` | Markdown directory pointing AI crawlers at the key pages |
| `sitemap.xml` | Auto-generated |
| `build.py` | The mini static-site generator — edit content here, run `python3 build.py` |
| `admin/` | Decap CMS (login at `/admin/` once hosted — see CMS section) |
| `assets/` | One stylesheet, one small progressive-enhancement script |

## Geotargeting (USA / UK / Ireland / Europe / South Africa / Rest of World)

**Pricing page is geo-scoped:** visitors see only their brand-origin rates in their own currency (US → USD row, UK → GBP, IE/EU → EUR, ZA/ROW → EUR), with the full four-market rate card available under a "Full rate card" disclosure — so the page stays fully crawlable while humans see one clean currency. The region is inferred client-side from browser locale + timezone and is always user-overridable via the header picker. For true **IP-based** detection, map the CDN country header (Cloudflare's `CF-IPCountry`) to a region code at the edge and set it before page render — see below.

- A **region picker** sits in the header. First visit auto-detects from browser locale + timezone; the choice persists.
- Region-specific content lives in the HTML as `data-geo="us"` / `data-geo="uk ie"` blocks (hero proof lines, pricing currency notes, footer office lines). **All variants exist in the markup**, so crawlers see everything; JS only chooses which to display.
- Currency symbols swap automatically (`$`/`£`/`€`) via `data-currency` spans.
- **Production upgrade:** for true IP-based geotargeting, map Cloudflare's `CF-IPCountry` header to a region code at the edge (Cloudflare Worker / Netlify Edge Function) and set `data-region` on `<html>` server-side. The client script already respects a pre-set region. Never serve *different content per IP on the same URL* to Googlebot vs users (cloaking risk) — this show/hide approach is the safe pattern.

## Languages (EN + full ES / FR / DE / IT builds)

The site now ships **full native-language static builds** at `/es/`, `/fr/`, `/de/`, `/it/` — the "properly" option from the AEO plan, not client-side translation:

- **7 pages per language** (the buyer journey): home, brands, talent, athlete profiles, pricing, about, FAQs — fully translated server-rendered HTML with localized `<title>`/meta, translated FAQPage JSON-LD, `og:locale`, and a complete `hreflang` cluster (en + es/fr/de/it + x-default) on every version. The sitemap carries matching `xhtml:link` alternates.
- **Deep editorial pages** (comparison, case studies, healthcare, measurement) stay English-only for now — locale footers link to them labelled "(EN)". That's correct hreflang practice: only claim a language version you actually maintain. To localize one later, add its strings to `t_es.py`/`t_fr.py`/`t_de.py`/`t_it.py` and a template block in `locale_pages.py`.
- **Editing translations:** all copy lives in `t_es.py`, `t_fr.py`, `t_de.py`, `t_it.py` (one dict per language, same keys). Edit, rerun `python3 build.py`.
- **The language picker** navigates to the native build when a translated version of the current page exists; on English-only editorial pages it falls back to the small chrome dictionary in `assets/site.js`.

## Athlete showcase (`athletes.html` + localized versions)

Eight **clearly-labelled illustrative sample profiles** (fictional people) show brands exactly what a verified profile contains — sport, location, audience, engagement, partnership tags. To feature *real* athletes: get written consent, edit the `ATHLETES` list in `build.py` (bios/tags per language in the `t_*.py` files), and drop 480×480 WebP photos into `images/athletes/` — each card has a pre-commented `<img>` slot that replaces the initials avatar.

## Team section (about page)

Trevor and Declan are real; the other six cards are **role placeholders with `[Team member]` names** — deliberately not invented. Replace names in the `TEAM` list in `build.py` (role titles per language in `t_*.py` → `ab_roles`), add 480×480 WebP headshots to `images/team/`, rerun the build.

## Overview video (homepage)

`build.py` has a `VIDEO_ID = ""` constant. Paste the YouTube ID of the overview video and rebuild:
- The homepage placeholder becomes a **click-to-play facade** (thumbnail + play button; the YouTube iframe — youtube-nocookie.com — loads only on click, so no third-party JS at page load and no Core Web Vitals hit).
- `VideoObject` JSON-LD is emitted automatically on the home page (all languages).
Until then the section shows a styled "coming soon" shell so the layout is ready.

## CMS — non-technical content editing (/admin/)

The site has a working Decap CMS at **`/admin/`**. Editors log in with an email
invite (no GitHub account needed on Netlify) and get friendly forms. Every save
commits to git, CI reruns `build.py`, and the change is live in ~2 minutes.

**What an editor can change, today:**
- **Brand logo wall** (homepage, all 5 languages): add/remove/reorder brands,
  upload real logo images (grayscale-styled automatically) or use styled text.
- **Overview video**: paste a YouTube ID to turn the placeholder into a player.
- **Company facts**: roster/sports/countries numbers, offices — flows into the
  footer, About facts table and Organization schema.
- **Team** (About page): names, roles, locations, headshots.
- **Sample athlete profiles**: the showcase cards (only ever feature real
  athletes with written consent).
- **Case-study cards**: the filterable Success Stories grid, with dropdown
  categories that match the page filters exactly.

**How it works:** the CMS edits JSON files in `content/`; `build.py` reads them
at build time and falls back to built-in defaults if a file is missing or
malformed — so a bad edit can never take the site down, it just gets ignored
with a build warning.

**One-time setup (developer, ~15 min):**
1. Push this folder to a GitHub repo (branch `main`).
2. *Netlify (easiest):* connect the repo — `netlify.toml` handles the build.
   Enable **Identity** and **Git Gateway** in the Netlify dashboard, then
   invite editors by email. Done.
   *GitHub Pages:* the included workflow (`.github/workflows/build-deploy.yml`)
   builds and deploys on push; switch the CMS `backend` in `admin/config.yml`
   to `name: github` with an OAuth app so editors can log in.
3. Editors visit `https://your-site/admin/`, accept the invite, edit, publish.

**What still needs a developer:** page copy and FAQ text (`build.py`),
translations (`t_es.py` etc.), pricing (deliberately code-only, because prices
are quoted inside prose in five languages — changing a number in one place but
not the sentences would publish contradictions), and new pages.

## How this build answers the SEO/AEO Master Plan

- **Answer-first structure** — every page opens with a 40–70 word direct-answer block immediately below a single H1, in subject-verb-object sentences (§9 layout template).
- **Canonical positioning statement** — used verbatim on the homepage, About page and llms.txt (§1).
- **Entity consistency** — "8,000+ verified athletes and creators", founded 2016, launch Oct 2020, founders, offices: identical in footer, ticker, About facts table, JSON-LD, llms.txt (§8).
- **Schema** — Organization + WebSite (home), Person (founders, About), FAQPage (7 pages), SoftwareApplication with Offers (pricing) (§8).
- **No JS-gated content, no accordions** — FAQs and case studies are plain rendered headings/paragraphs (§5).
- **Buyer prompts as literal headings** — all 25 HubSpot-tracked prompts answered on `faqs.html`, and prompt clusters embedded on the matching solution pages (§11).
- **Comparison engine** — objective matrix vs Opendorse/OpenSponsorship/Sponsoo/Pickstar, including where competitors win (Share of Voice + trust) (§2, §9.4).
- **Technical hygiene** — exactly one `<h1>` and one viewport tag per page, meta titles ≤70 chars, descriptions ~150–155, visible "last updated" dates, semantic HTML, system fonts + two Google font families, no blocking third-party scripts, `defer`red JS (§6).
- **robots.txt + llms.txt** — AI bot allow-list and machine-readable site directory (§5, §8). ⚠️ Also whitelist these bots in **Cloudflare's firewall/AI-bots setting** — robots.txt alone won't help if the CDN blocks them.

## Launch checklist (things only you can do)

- **Confirm three placeholders**: the Academy URL (`ACADEMY_URL` in build.py, currently academy.sportendorse.com), the careers inbox (`CAREERS_EMAIL`, currently careers@sportendorse.com), and swap the partner/affiliate Calendly CTAs for dedicated application forms when they exist. Affiliate commission % is deliberately unpublished ("terms shared on approval") until you set it.
- **Open roles** are CMS-editable: Careers collection in /admin/ — add a role and it's live on careers.html after the rebuild; empty list shows the speculative-application message.

1. Drop real image assets into `/images/` as **AVIF/WebP, correctly sized** (replace the text logo wall and add athlete photos with `srcset`) — keep the James-Lowe-at-1.87MB era behind you.
2. Insert **verified campaign metrics** into the case-study results slots (marked in the pages) — quantified tables measurably lift citation rates.
3. Point DNS, whitelist AI bots in Cloudflare, submit `sitemap.xml` in Search Console.
4. Reconcile Crunchbase / Tracxn / LinkedIn to the About-page facts table.
5. Load the 25 prompts into the HubSpot AEO Grader and start the monthly prompt-panel + server-log audit (§13).

## Languages & localization

The site ships in **English + Spanish, French, German and Italian**.

- **7 native-template pages** (home, brands, talent, athletes, subscription, about, faqs) are fully localized in all four languages.
- **8 commercial pages** (agencies hub, sports-agencies, marketing-agencies, universities, careers, strategic-partners, affiliates, academy) are localized via a text-swap pipeline (`localize.py` + `i18n.json`) at 88–97% coverage in all four languages — the pages an international brand, agency or university buyer lands on.
- **6 long editorial/SEO pages** (success-stories, healthcare-athlete-marketing, compare-athlete-marketing-platforms, regulated-industries, campaign-measurement, why-athlete-sourcing-is-broken) remain English-only for now. They are reachable in every language (the selector routes to that language's homepage rather than a dead end) but are **not** advertised via hreflang/sitemap in other languages until translated — deliberately, so Google never sees thin auto-translated pages. Translating them is a pure data addition to `i18n.json`; the pipeline is already wired for all 14 slugs.

**How the safety gate works:** `build.py` computes translation coverage per page per language and only builds/advertises a localized page when coverage ≥ 80% (`COVERAGE_MIN`). Anything below that stays English-only automatically. `assets/i18n-avail.js` exposes the availability map to the language selector.

**Machine-translated, pending native review.** All non-English copy is machine-generated and should be proofread by a native speaker before launch — still on the checklist below.

## Themes

The live design is **midnight** (floodlit navy + kit gold) — the default; just run `python3 build.py`. A full Brand-Bible variant (100% Cyan #0078C1, five-colour palette, Source Sans 3) remains available behind a flag if ever wanted: `SE_THEME=brand python3 build.py`. One stylesheet (`assets/theme-brand.css`) controls it; deleting that file and the `THEME` block in build.py removes the option entirely.

## Custom package HubSpot form

The pricing page has a **Custom / Bespoke Full-Service Package** section with an embedded HubSpot form (English + all four languages). Until it's configured, a book-a-call / email fallback shows so the section is never broken.

To connect the form, set these in `content/settings.json` (from your HubSpot embed code — Marketing → Forms → Share → Embed):

```json
"hubspot": { "portal_id": "YOUR_PORTAL_ID", "form_id": "YOUR_FORM_ID", "region": "eu1" }
```

`region` is `eu1` for EU-hosted portals or `na1` for US. Rebuild (`python3 build.py`) and the live form replaces the fallback everywhere automatically. To theme it, the form renders on a light card and picks up styles under `.formcard` in `assets/style.css`.

## Local preview

Open `index.html` directly, or run `python3 -m http.server` in this folder and browse to http://localhost:8000.
