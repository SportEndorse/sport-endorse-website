# -*- coding: utf-8 -*-
"""
Help Centre for Sport Endorse — Komi-style (search + category grid + articles),
rendered natively into /help/ by build.py.

HOW TO EXTEND
-------------
* Content lives in CATEGORIES and ARTICLES below — plain data, safe to edit.
* An article with status="live" and a non-empty `body` is published: it gets its
  own page, a sitemap entry, and appears in search + on its category page.
* An article with status="draft" is a placeholder: it shows as a greyed
  "coming soon" line on its category page but has NO page, NO sitemap entry and
  is NOT searchable. Fill `body`, flip status to "live" and rebuild to publish.
* Every published article should carry a one-sentence `lead` (the direct answer)
  — it drives the answer-first paragraph AND the FAQPage schema for AEO.
* Keep operational specifics (exact button names, timings, payout mechanics) out
  until they are confirmed from the product walkthroughs. When unsure, draft it.
"""

CONTACT_EMAIL = "info@sportendorse.com"

# --- Category definitions (order = display order on the index) ---------------
CATEGORIES = [
    dict(slug="getting-started", title="Getting Started",
         blurb="New to Sport Endorse? Understand what it is and how it works.",
         icon='<path d="M12 2 2 7l10 5 10-5-10-5Z"/><path d="M6 10v5c0 1.6 2.7 3 6 3s6-1.4 6-3v-5"/>'),
    dict(slug="for-brands", title="For Brands",
         blurb="Find verified athletes, run campaigns and manage deals.",
         icon='<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/>'),
    dict(slug="for-athletes", title="For Athletes & Creators",
         blurb="Join for free, get discovered and get paid for brand deals.",
         icon='<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-6 8-6s8 2 8 6"/>'),
    dict(slug="for-agencies", title="For Agencies",
         blurb="Run client campaigns or find commercial deals for your roster.",
         icon='<circle cx="9" cy="8" r="3.2"/><circle cx="17" cy="9" r="2.6"/><path d="M3 20c0-3.2 2.7-5 6-5s6 1.8 6 5"/><path d="M15 20c0-2.4 1-4 4-4"/>'),
    dict(slug="for-universities", title="For Universities (NIL)",
         blurb="NIL access, athlete education and compliant campaigns.",
         icon='<path d="M12 4 2 9l10 5 10-5-10-5Z"/><path d="M22 9v6"/><path d="M6 11.5V16c0 1.5 2.7 3 6 3s6-1.5 6-3v-4.5"/>'),
    dict(slug="payments-billing", title="Payments & Billing",
         blurb="Subscriptions, deal commission, invoicing and payouts.",
         icon='<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>'),
    dict(slug="account-settings", title="Account & Settings",
         blurb="Manage your profile, team seats and notifications.",
         icon='<circle cx="12" cy="12" r="3"/><path d="M19 12a7 7 0 0 0-.1-1l2-1.6-2-3.4-2.4 1a7 7 0 0 0-1.7-1L14.5 2h-5l-.3 2.6a7 7 0 0 0-1.7 1l-2.4-1-2 3.4L3 11a7 7 0 0 0 0 2l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 1.7 1l.3 2.4h5l.3-2.6a7 7 0 0 0 1.7-1l2.4 1 2-3.4-2-1.6a7 7 0 0 0 .1-1Z"/>'),
    dict(slug="troubleshooting", title="Troubleshooting",
         blurb="Quick fixes for the most common issues.",
         icon='<path d="M12 9v4"/><path d="M12 17h.01"/><path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z"/>'),
    dict(slug="contact", title="Contact Us",
         blurb="Can't find your answer? Get in touch with the team.",
         icon='<path d="M4 4h16v12H5.2L4 17.5Z"/>'),
]

# --- Articles ----------------------------------------------------------------
# body = HTML string (site classes). Root-level links use ../ (help lives in /help/).
def _p(*paras):
    return "".join(f"<p>{x}</p>" for x in paras)

ARTICLES = [

 # ---------------- Getting Started ----------------
 dict(slug="what-is-sport-endorse", cat="getting-started", status="live",
   q="What is Sport Endorse?",
   lead="Sport Endorse is an athlete marketing and sports sponsorship platform where brands discover, evaluate, contact and manage verified athletes for campaigns — and where athletes, creators and their agents find commercial deals.",
   keywords="what is sport endorse platform athlete marketing sponsorship overview",
   related=["how-it-works", "who-is-it-for", "do-athletes-pay"],
   body=_p(
     "Sport Endorse connects two sides of the sponsorship market on one platform. Brands and businesses use it to discover, evaluate, contact and manage 9,000+ verified athletes and creators across 280+ sports in 85+ countries — for campaigns, brand ambassadorships, speaking engagements and content partnerships. Athletes, creators and their agents use it to be found by brands and to agree commercial deals.",
     "Instead of the manual outreach and opaque fees typical of agencies, everything happens in the platform: search and shortlisting, in-app messaging, agreed terms and usage rights, secure payment, and campaign reporting.",
     "Commercially, brands pay a market-based subscription and a transparent 14–18% commission on deals — not the 30% cut common on other marketplaces. Athletes and creators join for free.")
   ),

 dict(slug="how-it-works", cat="getting-started", status="live",
   q="How does Sport Endorse work?",
   lead="Brands search verified athletes, shortlist, agree terms and usage rights, pay securely and report on the campaign — all in the platform. Athletes build a free profile, get discovered, agree deals and get paid.",
   keywords="how does sport endorse work process flow steps brand athlete",
   related=["what-is-sport-endorse", "for-brands-overview", "join-as-athlete"],
   body=(
     "<h2>For brands</h2>" + _p(
       "At a high level, a brand campaign moves through the platform like this: find and filter verified athletes by sport, market and audience; shortlist the ones that fit; agree the brief, fee and usage rights; pay securely; then track deliverables and results.")
     + "<h2>For athletes &amp; creators</h2>" + _p(
       "For talent, the flow is: create a free profile, get verified, become discoverable to brands, agree deals that suit you, deliver the content or appearance, and get paid.")
     + "<p class=\"muted\" style=\"font-size:.9rem\">Step-by-step walkthroughs of each screen are being added to this help centre. In the meantime, <a href=\"../brands.html\">For Brands</a> and <a href=\"../talent.html\">For Talent</a> explain each side in more detail.</p>")
   ),

 dict(slug="who-is-it-for", cat="getting-started", status="live",
   q="Is Sport Endorse for brands, athletes, agencies or universities?",
   lead="All four. Brands find and book athletes; athletes and creators get discovered and paid; agencies run client campaigns or monetise a roster; universities run NIL programmes with education and compliance built in.",
   keywords="who is it for brands athletes agencies universities audience which",
   related=["for-brands-overview", "join-as-athlete", "agencies-overview", "universities-nil"],
   body=_p(
     "<b>Brands and businesses</b> use Sport Endorse to discover and book verified athletes for campaigns — start with <a href=\"../brands.html\">For Brands</a>.",
     "<b>Athletes and creators</b> join free to get discovered and paid — start with <a href=\"../talent.html\">For Talent</a>.",
     "<b>Agencies</b> either run campaigns for clients on a brand subscription, or (for sports agencies and agents) monetise a roster through the Agent Partner Programme — start with <a href=\"../sports-agencies.html\">For Agencies</a>.",
     "<b>Universities</b> run compliant NIL programmes with international athlete access and athlete education — start with <a href=\"../universities.html\">Universities &amp; NIL</a>.")
   ),

 dict(slug="do-athletes-pay", cat="getting-started", status="live",
   q="Do athletes and creators pay to join?",
   lead="No. Athletes and creators join Sport Endorse for free — there's no cost to create a profile, get verified or be discovered by brands. Brands pay the subscription, and deals carry a platform commission.",
   keywords="do athletes pay free cost join creators price",
   related=["join-as-athlete", "brand-subscriptions", "deal-commission"],
   body=_p(
     "Joining is free for athletes, creators and their agents. You can build a profile, get verified and become discoverable to brands at no cost.",
     "The platform is funded on the brand side: brands pay a market-based subscription to access athlete markets, and a transparent 14–18% commission applies to deals. See <a href=\"deal-commission.html\">the commission on a deal</a> for how that works.")
   ),

 # ---------------- For Brands ----------------
 dict(slug="for-brands-overview", cat="for-brands", status="live",
   q="How do brands use Sport Endorse?",
   lead="Brands search and filter 9,000+ verified athletes, shortlist the right fit, agree the brief and usage rights, pay securely in-platform, and report on results — with a full-service managed option if you'd rather hand it over.",
   keywords="brands how use find athletes campaign shortlist offer overview",
   related=["brand-subscriptions", "deal-commission", "full-service", "how-it-works"],
   body=(_p(
     "Sport Endorse gives brands direct access to verified athletes without the manual back-and-forth of an agency. You can search and filter by sport, market and audience, shortlist athletes that fit the brief, and handle messaging, agreed terms, usage rights, payment and reporting in one place.",
     "Two ways to run it: <b>self-serve</b>, where your team runs the campaign on the platform; or <b>full-service</b>, where the Sport Endorse team shortlists, negotiates, manages deliverables and reports for you. See <a href=\"full-service.html\">the full-service package</a>.")
     + "<p class=\"muted\" style=\"font-size:.9rem\">Detailed click-by-click guides (searching, posting a brief, making an offer) are being added — see the &ldquo;coming soon&rdquo; items on the <a href=\"for-brands.html\">For Brands</a> category page.</p>")
   ),

 dict(slug="full-service", cat="for-brands", status="live",
   q="What's the full-service (managed) package?",
   lead="Full-service is a hands-off option: the Sport Endorse team shortlists talent, negotiates, manages deliverables and approvals, and reports on results — everything in the platform, run for you.",
   keywords="full service managed package done for you campaign management bespoke custom",
   related=["for-brands-overview", "brand-subscriptions", "support-included"],
   body=_p(
     "The full-service (custom) package includes everything in the platform plus hands-off campaign management. The team shortlists the right talent, negotiates fees, manages content deliverables and approvals, and reports on results — so it's the low-effort option for teams without time to run campaigns in-house.",
     "Packages are tailored to your goals and budget. To scope one, <a href=\"../subscription.html#custom-package\">tell us what you need</a> or <a href=\"contact-us.html\">contact the team</a>.")
   ),

 # ---------------- For Athletes ----------------
 dict(slug="join-as-athlete", cat="for-athletes", status="live",
   q="How do I join as an athlete or creator?",
   lead="Joining is free: create your profile, get verified, and you become discoverable to brands looking for talent in your sport and market. There's no cost and no subscription for athletes and creators.",
   keywords="join athlete creator sign up free profile get started talent",
   related=["do-athletes-pay", "get-discovered", "get-verified"],
   body=(_p(
     "Athletes and creators join Sport Endorse for free. You create a profile, get verified as a genuine athlete or creator, and become discoverable to brands searching for talent that fits their campaigns.",
     "A strong, complete profile helps brands find and choose you. Guides on verification, building your profile and getting discovered are being added to this help centre.")
     + "<p class=\"muted\" style=\"font-size:.9rem\">See <a href=\"../talent.html\">For Talent</a> for an overview while the step-by-step guides are finalised.</p>")
   ),

 # ---------------- For Agencies ----------------
 dict(slug="agencies-overview", cat="for-agencies", status="live",
   q="How do agencies use Sport Endorse?",
   lead="Marketing and creative agencies run client campaigns on a standard brand subscription, with per-client briefs and reporting. Sports agencies and agents monetise a roster through the Agent Partner Programme.",
   keywords="agencies marketing creative sports agents roster clients how use",
   related=["brand-subscriptions", "agent-partner", "for-brands-overview"],
   body=_p(
     "<b>Marketing &amp; creative agencies</b> use Sport Endorse to source and manage verified athletes for their clients, running campaigns on a standard brand subscription with briefs and reporting handled per client. See <a href=\"../marketing-agencies.html\">Marketing Agencies</a>.",
     "<b>Sports agencies &amp; agents</b> use the platform to find commercial deals for the athletes they represent, through the Agent Partner Programme. See <a href=\"agent-partner.html\">the Agent Partner Programme</a> and <a href=\"../sports-agencies.html\">For Sports Agencies</a>.")
   ),

 dict(slug="agent-partner", cat="for-agencies", status="live",
   q="What is the Agent Partner Programme for sports agencies?",
   lead="The Agent Partner Programme lets sports agencies and agents list and monetise a roster on Sport Endorse, with tiered roster subscriptions and a commission share-back on deals. It's rolling out — talk to the team to get set up.",
   keywords="agent partner programme sports agency roster commission share back tiers",
   related=["agencies-overview", "deal-commission", "contact-us"],
   body=(_p(
     "The Agent Partner Programme is designed for agencies and agents who represent athletes. It provides roster subscriptions across tiers, so you can list the athletes you manage and bring brand deals to them through the platform, with a commission share-back on deals done.")
     + "<p class=\"muted\" style=\"font-size:.9rem\">The Agent Partner Programme is rolling out. For current tiers, share-back terms and onboarding, <a href=\"contact-us.html\">contact the team</a> or see <a href=\"../sports-agencies.html\">For Sports Agencies</a>.</p>")
   ),

 # ---------------- Universities ----------------
 dict(slug="universities-nil", cat="for-universities", status="live",
   q="How does NIL on Sport Endorse work for universities?",
   lead="Universities use Sport Endorse to run compliant NIL programmes: brand access for student-athletes, international athlete reach, and athlete education through the Sport Endorse Academy.",
   keywords="universities nil name image likeness student athlete compliance education academy",
   related=["contact-us", "universities-compliance"],
   body=(_p(
     "Sport Endorse supports university NIL programmes with a platform for connecting student-athletes to brand opportunities, access to international athletes, and education for student-athletes via the Sport Endorse Academy (lessons on personal brand, contracts, pricing and taxes).",
     "Programmes are designed to fit institutional compliance requirements. See <a href=\"../universities.html\">Universities &amp; NIL</a> for the full overview.")
     + "<p class=\"muted\" style=\"font-size:.9rem\">A detailed compliance guide is being added to this help centre. For specifics on your programme, <a href=\"contact-us.html\">contact the team</a>.</p>")
   ),

 # ---------------- Payments & Billing ----------------
 dict(slug="brand-subscriptions", cat="payments-billing", status="live",
   q="How do brand subscriptions work?",
   lead="Brand subscriptions are market-based: the price reflects your home market and the athlete markets you want to access. Each athlete market is subscribed separately, so you only pay for the markets you actually campaign in.",
   keywords="brand subscription pricing market based how much cost plans",
   related=["quarterly-vs-annual", "deal-commission", "south-africa-billing", "vat-invoicing"],
   body=_p(
     "Pricing is market-based rather than one-size-fits-all: the rate reflects your brand's home market and the athlete market you want to reach. Because each athlete market is subscribed separately, you only pay for the markets you campaign in.",
     "You can pay annually or quarterly — see <a href=\"quarterly-vs-annual.html\">quarterly vs annual billing</a>. Custom full-service packages are available, and athletes and creators join for free.",
     "See live plans for your region on the <a href=\"../subscription.html\">pricing page</a>.")
   ),

 dict(slug="deal-commission", cat="payments-billing", status="live",
   q="Is there a commission on deals?",
   lead="Yes — a transparent 14–18% platform commission on deal value, depending on deal size. That's well below the 30% take-rates common on US marketplaces, with no hidden agency mark-ups on athlete fees.",
   keywords="commission deal fee percentage 14 18 30 take rate transparent",
   related=["brand-subscriptions", "do-athletes-pay", "south-africa-billing"],
   body=_p(
     "Deals done through the platform carry a transparent commission of 14–18% on deal value, depending on the size of the deal. There are no hidden agency mark-ups on athlete fees.",
     "By comparison, the take-rates on many US athlete marketplaces are around 30%. The commission is the same whichever market you're in — including for South African brands billed in rand.")
   ),

 dict(slug="quarterly-vs-annual", cat="payments-billing", status="live",
   q="Can we pay quarterly instead of annually?",
   lead="Yes, every market has a quarterly option. Annual billing saves roughly a third versus four quarters, so it's the better value for always-on programmes; quarterly suits shorter or budget-cycle campaigns.",
   keywords="quarterly annual billing payment frequency save discount",
   related=["brand-subscriptions", "vat-invoicing", "support-included"],
   body=_p(
     "You can pay annually or quarterly on every market. Annual billing is priced to save roughly a third compared with paying for four quarters, so it's the best value for always-on programmes.",
     "If budget cycles make annual difficult, quarterly keeps you flexible — and custom packages can be structured around your procurement process. <a href=\"contact-us.html\">Talk to us</a> if that helps.")
   ),

 dict(slug="vat-invoicing", cat="payments-billing", status="live",
   q="Is VAT included, and how does invoicing work?",
   lead="Prices are shown excluding VAT or sales tax, which is added at the applicable local rate at checkout and itemised on your invoice for reclaim where eligible. South African brands are an exception — see below.",
   keywords="vat sales tax invoice included checkout reclaim billing tax",
   related=["south-africa-billing", "brand-subscriptions", "quarterly-vs-annual"],
   body=_p(
     "Subscription prices are shown excluding VAT or sales tax. Where it applies, tax is added at the local rate at checkout, and your invoice itemises it clearly so you can reclaim it where eligible.",
     "<b>South African brands are billed differently:</b> because South African companies are billed from Ireland, no VAT is added. See <a href=\"south-africa-billing.html\">how South African brands are billed</a>.")
   ),

 dict(slug="south-africa-billing", cat="payments-billing", status="live",
   q="How are South African brands billed?",
   lead="South African brands are billed in South African rand (ZAR) from Ireland, with no VAT added. Home-market access is priced for South Africa; international markets are available at the standard global rate, in rand.",
   keywords="south africa zar rand billing vat ireland pricing local international",
   related=["brand-subscriptions", "vat-invoicing", "deal-commission"],
   body=_p(
     "For South African brands, subscriptions are billed in rand (ZAR) and invoiced from Ireland. Because the billing entity is in Ireland, no VAT is added to South African subscriptions.",
     "Pricing is local for the home market and standard for international reach: access to South African athletes is priced for the South African market, while the USA, UK, Europe and Rest of World markets are available at the standard global rate expressed in rand. Each market is added separately.",
     "As with every market, athlete deals carry the transparent 14–18% commission. See live rand pricing on the <a href=\"../subscription.html\">pricing page</a> (choose South Africa in the region selector).")
   ),

 dict(slug="support-included", cat="payments-billing", status="live",
   q="What support is included once we've paid?",
   lead="Every brand gets dedicated onboarding. Annual subscribers also get a named customer success manager and direct access to founder support — questions go to people who can act, not a ticket queue.",
   keywords="support included onboarding customer success manager founder help after paying",
   related=["full-service", "brand-subscriptions", "contact-us"],
   body=_p(
     "All brands receive dedicated onboarding to get set up and running. Annual subscribers additionally get a named customer success manager, and every annual client has direct access to founder support.",
     "If you need help, <a href=\"contact-us.html\">contact the team</a> — or reach your customer success manager directly if you're an annual subscriber.")
   ),

 # ---------------- Contact ----------------
 dict(slug="contact-us", cat="contact", status="live",
   q="How do I contact Sport Endorse?",
   lead=f"Email {CONTACT_EMAIL} for any question, or book a demo to talk through your needs. Existing annual subscribers can also reach their customer success manager or founder contact directly.",
   keywords="contact email support demo talk to us get in touch help reach",
   related=["support-included", "what-is-sport-endorse"],
   body=_p(
     f"The quickest way to reach us is email: <a href=\"mailto:{CONTACT_EMAIL}\">{CONTACT_EMAIL}</a>.",
     "If you'd like to see the platform or scope a campaign, <a href=\"../demo.html\">book a demo</a> and we'll walk you through it.",
     "Already a subscriber? Annual clients can contact their named customer success manager or founder contact directly for anything urgent.")
   ),

 # ================= DRAFT scaffolds (no body → show as "coming soon") =========
 dict(slug="find-athletes", cat="for-brands", status="draft", q="Finding and shortlisting athletes"),
 dict(slug="post-a-brief", cat="for-brands", status="draft", q="Posting a campaign brief"),
 dict(slug="make-an-offer", cat="for-brands", status="draft", q="Making an offer and agreeing usage rights"),
 dict(slug="track-a-campaign", cat="for-brands", status="draft", q="Tracking deliverables and reporting"),

 dict(slug="get-verified", cat="for-athletes", status="draft", q="Getting verified as an athlete or creator"),
 dict(slug="build-your-profile", cat="for-athletes", status="draft", q="Building a profile that gets you booked"),
 dict(slug="get-discovered", cat="for-athletes", status="draft", q="Getting discovered by brands"),
 dict(slug="get-paid", cat="for-athletes", status="draft", q="Getting paid for a deal"),

 dict(slug="manage-roster", cat="for-agencies", status="draft", q="Managing a roster of athletes"),

 dict(slug="universities-compliance", cat="for-universities", status="draft", q="Staying compliant with NIL rules"),

 dict(slug="update-profile", cat="account-settings", status="draft", q="Updating your profile and company details"),
 dict(slug="team-seats", cat="account-settings", status="draft", q="Adding team members and managing seats"),
 dict(slug="notifications", cat="account-settings", status="draft", q="Managing notifications"),
 dict(slug="reset-password", cat="account-settings", status="draft", q="Resetting your password"),

 dict(slug="login-issues", cat="troubleshooting", status="draft", q="I can't log in"),
 dict(slug="payment-failed", cat="troubleshooting", status="draft", q="My payment didn't go through"),
 dict(slug="cant-find-athlete", cat="troubleshooting", status="draft", q="I can't find an athlete or market"),
 dict(slug="app-vs-web", cat="troubleshooting", status="draft", q="What can I do in the app vs on the web?"),
]


# ============================================================ RENDERING
def _live(arts):
    return [a for a in arts if a.get("status") == "live" and a.get("body")]

def _cat(slug):
    return next(c for c in CATEGORIES if c["slug"] == slug)

def _arts_in(cat_slug):
    return [a for a in ARTICLES if a["cat"] == cat_slug]

def _icon(svg):
    return (f'<svg class="hc-ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
            f'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{svg}</svg>')

def _breadcrumb(ctx, trail):
    """trail: list of (label, href_or_None). Renders visible nav + JSON-LD."""
    BASE = ctx["BASE"]
    parts = []
    items = []
    for i, (label, href) in enumerate(trail):
        if href:
            parts.append(f'<a href="{href}">{label}</a>')
        else:
            parts.append(f'<span aria-current="page">{label}</span>')
        # JSON-LD needs absolute URLs; map help-relative hrefs to canonical
        items.append({"@type": "ListItem", "position": i + 1, "name": label})
    nav = '<nav class="hc-crumb" aria-label="Breadcrumb">' + ' <span class="sep">›</span> '.join(parts) + '</nav>'
    ld = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": items}
    return nav, ld

def _faq_ld(q, answer_text):
    return {"@context": "https://schema.org", "@type": "FAQPage",
            "mainEntity": [{"@type": "Question", "name": q,
                            "acceptedAnswer": {"@type": "Answer", "text": answer_text}}]}

def _search_box(ph="Search the help centre…"):
    return (f'<form class="hc-search" role="search" onsubmit="return false">'
            f'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">'
            f'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>'
            f'<input type="search" id="hcq" placeholder="{ph}" autocomplete="off" aria-label="Search the help centre">'
            f'<div id="hcresults" class="hc-results" hidden></div></form>')

def index_body(ctx):
    cards = ""
    for c in CATEGORIES:
        n = len(_live(_arts_in(c["slug"])))
        count = f'<span class="hc-count">{n} article{"s" if n != 1 else ""}</span>' if n else ""
        cards += (f'<a class="card hc-cat" href="{c["slug"]}.html">'
                  f'<span class="hc-icb">{_icon(c["icon"])}</span>'
                  f'<h3>{c["title"]}</h3><p>{c["blurb"]}</p>'
                  f'<span class="hc-more">Browse{count} <span aria-hidden="true">→</span></span></a>')
    return f"""
<section class="hero hc-hero"><div class="wrap" style="text-align:center">
  <p class="eyebrow">Help Centre</p>
  <h1>How can we help?</h1>
  <p class="lead" style="margin:0 auto 22px;max-width:52ch">Answers on using Sport Endorse — for brands, athletes, agencies and universities.</p>
  {_search_box()}
</div></section>
<section class="light"><div class="wrap">
  <div class="grid g3 hc-grid">{cards}</div>
  <div class="hc-contact card" style="margin-top:26px;text-align:center">
    <h3>Can't find your answer?</h3>
    <p class="muted">The team is happy to help.</p>
    <p><a class="btn gold" href="mailto:{CONTACT_EMAIL}">Email {CONTACT_EMAIL}</a>
       <a class="btn ghost" href="contact-us.html">More ways to reach us</a></p>
  </div>
</div></section>
<script src="../assets/help-search.js" defer></script>
"""

def category_body(ctx, c):
    live = _live(_arts_in(c["slug"]))
    drafts = [a for a in _arts_in(c["slug"]) if a.get("status") == "draft"]
    crumb, crumb_ld = _breadcrumb(ctx, [("Help Centre", "index.html"), (c["title"], None)])
    rows = ""
    for a in live:
        rows += (f'<a class="hc-art" href="{a["slug"]}.html"><span class="hc-q">{a["q"]}</span>'
                 f'<span class="hc-lead">{a["lead"]}</span></a>')
    coming = ""
    if drafts:
        items = "".join(f'<li>{d["q"]} <span class="hc-soon">coming soon</span></li>' for d in drafts)
        coming = (f'<div class="hc-comingbox"><p class="eyebrow">More guides on the way</p>'
                  f'<ul class="hc-coming">{items}</ul></div>')
    body = f"""
<section class="hero hc-hero-sm"><div class="wrap">
  {crumb}
  <p class="eyebrow"><span class="hc-icb sm">{_icon(c["icon"])}</span></p>
  <h1>{c["title"]}</h1>
  <p class="lead" style="max-width:56ch">{c["blurb"]}</p>
</div></section>
<section class="light"><div class="wrap hc-narrow">
  <div class="hc-list">{rows or '<p class="muted">Guides for this section are coming soon.</p>'}</div>
  {coming}
  <p style="margin-top:26px"><a href="index.html">← All help topics</a></p>
</div></section>
"""
    return body, [crumb_ld]

def article_body(ctx, a):
    c = _cat(a["cat"])
    crumb, crumb_ld = _breadcrumb(ctx, [("Help Centre", "index.html"), (c["title"], f'{c["slug"]}.html'), (a["q"], None)])
    # related (live only)
    rel = [x for x in ARTICLES if x["slug"] in a.get("related", []) and x.get("status") == "live"]
    rel_html = ""
    if rel:
        links = "".join(f'<li><a href="{r["slug"]}.html">{r["q"]}</a></li>' for r in rel)
        rel_html = f'<div class="hc-related"><p class="eyebrow">Related</p><ul>{links}</ul></div>'
    body = f"""
<section class="hero hc-hero-sm"><div class="wrap hc-narrow">
  {crumb}
  <h1>{a["q"]}</h1>
  <p class="lead hc-answer">{a["lead"]}</p>
</div></section>
<section class="light"><div class="wrap hc-narrow">
  <div class="hc-body">{a["body"]}</div>
  {rel_html}
  <div class="hc-help card">
    <div><h3 style="margin:0">Was this helpful?</h3>
    <p class="muted" style="margin:.3em 0 0">Still stuck? <a href="mailto:{CONTACT_EMAIL}">Email {CONTACT_EMAIL}</a> or <a href="contact-us.html">get in touch</a>.</p></div>
    <a class="btn ghost sm" href="{c['slug']}.html">More in {c['title']} →</a>
  </div>
  <p style="margin-top:20px"><a href="index.html">← All help topics</a></p>
</div></section>
"""
    faq = _faq_ld(a["q"], a["lead"])
    return body, [crumb_ld, faq]


def pages(ctx):
    """Return list of {path, title, desc, body, jsonld} for build.py to render."""
    out = []
    # index
    out.append(dict(path="help/index.html",
                    title="Help Centre | Sport Endorse",
                    desc="Answers on using Sport Endorse — for brands, athletes, agencies and universities. Search guides on pricing, deals, billing and getting started.",
                    body=index_body(ctx), jsonld=[]))
    # categories
    for c in CATEGORIES:
        b, ld = category_body(ctx, c)
        out.append(dict(path=f"help/{c['slug']}.html",
                        title=f"{c['title']} — Help Centre | Sport Endorse",
                        desc=f"{c['blurb']} Sport Endorse help centre.",
                        body=b, jsonld=ld))
    # live articles
    for a in _live(ARTICLES):
        b, ld = article_body(ctx, a)
        out.append(dict(path=f"help/{a['slug']}.html",
                        title=f"{a['q']} | Sport Endorse Help"[:75],
                        desc=a["lead"][:160],
                        body=b, jsonld=ld))
    return out


def search_index(ctx):
    """List of {t,u,c,l,k} for the client-side search."""
    idx = []
    for a in _live(ARTICLES):
        idx.append({"t": a["q"], "u": f'{a["slug"]}.html',
                    "c": _cat(a["cat"])["title"], "l": a["lead"],
                    "k": a.get("keywords", "")})
    return idx
