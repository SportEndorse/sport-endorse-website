"""Localized page builder for Sport Endorse (/es/ /fr/ /de/ /it/).
Each language ships as fully server-rendered native HTML — same AEO rules as
English: answer-first block under a single H1, FAQPage JSON-LD, no JS needed
to read anything. Translations live in t_es.py / t_fr.py / t_de.py / t_it.py.
Deep editorial pages (comparison, case studies, compliance guides) remain
English-only for now; locale footers link to them labelled "(EN)".
"""
import importlib

CAL = "demo.html"
SIGNUP = "https://platform.sportendorse.com/signup/talent"
IOS = "https://apps.apple.com/gb/app/sport-endorse/id1524881578"
ANDROID = "https://play.google.com/store/apps/details?id=com.sportendorse.app"

NAV_SLUGS = ["brands.html", "talent.html", "athletes.html", "subscription.html", "faqs.html", "about.html"]


def header(active, t):
    items = "".join(
        f'<li><a href="{s}"{" aria-current=\"page\"" if s == active else ""}>{t["nav"][s]}</a></li>'
        for s in NAV_SLUGS)
    return f"""<header class="site"><div class="wrap nav">
  <a class="logo" href="index.html"><img src="../images/logo/sport-endorse-white.png" alt="Sport Endorse" width="182" height="31"></a>
  <button class="menu-toggle" aria-expanded="false" aria-controls="mainnav">Menu</button>
  <ul id="mainnav">{items}</ul>
  <div class="push">
    <select id="regionpick" class="chip" data-region-picker aria-label="{t['region_label']}">
      <option value="ie">🇮🇪 Ireland</option><option value="uk">🇬🇧 UK</option>
      <option value="us">🇺🇸 USA</option><option value="eu">🇪🇺 {t['europe']}</option>
      <option value="za">🇿🇦 South Africa</option><option value="row">🌍 Global</option>
    </select>
    <select class="chip" data-lang-picker aria-label="{t['lang_label']}">
      <option value="en">EN</option><option value="es">ES</option><option value="de">DE</option>
      <option value="fr">FR</option><option value="it">IT</option><option value="nl">NL</option>
    </select>
    <a class="btn gold sm" href="{CAL}">{t['cta_demo']}</a>
  </div>
</div></header>"""


def footer(t, e):
    return f"""<footer class="site"><div class="wrap">
  <div class="cols">
    <div>
      <a class="logo" href="index.html">Sport <b>Endorse</b></a>
      <p class="tagline">{t['ft_tagline']}</p>
      <p class="entity" style="margin-top:14px">{t['footer_entity']}</p>
      <p class="entity" style="margin-top:10px">{t['hq_office']}: {t['dublin']}, {t['ireland']}<br>{t['us_office']}: Indianapolis, Indiana<br>{t['za_office']}: Hilton, KZN</p>
    </div>
    <div><h4>{t['f_platform']}</h4><ul>
      <li><a href="brands.html">{t['nav']['brands.html']}</a></li>
      <li><a href="talent.html">{t['nav']['talent.html']}</a></li>
      <li><a href="athletes.html">{t['nav']['athletes.html']}</a></li>
      <li><a href="subscription.html">{t['nav']['subscription.html']}</a></li></ul></div>
    <div><h4>{t['f_more']}</h4><ul>
      <li><a href="../compare-athlete-marketing-platforms.html">{t['f_compare']} (EN)</a></li>
      <li><a href="../success-stories.html">{t['f_stories']} (EN)</a></li>
      <li><a href="../healthcare-athlete-marketing.html">{t['f_health']} (EN)</a></li>
      <li><a href="../agencies.html">{t['f_agencies']} (EN)</a></li></ul></div>
    <div><h4>{t['f_company']}</h4><ul>
      <li><a href="about.html">{t['nav']['about.html']}</a></li>
      <li><a href="faqs.html">{t['nav']['faqs.html']}</a></li>
      <li><a href="{IOS}">iOS App</a></li><li><a href="{ANDROID}">Android App</a></li>
      <li><a href="{CAL}">{t['cta_demo']}</a></li></ul></div>
  </div>
  <div class="legal">
    <span>© 2026 Sport Endorse Limited. {t['rights']}</span>
    <span><a href="https://www.sportendorse.com/privacy-center">{t['ft_privacy']}</a> &middot; <a href="/terms-and-conditions">{t['ft_terms']}</a></span>
  </div>
</div></footer>
<script src="../assets/site.js" defer></script>"""


def ticker(t):
    items = (f"<span>{t['tk_founded']} <b>{t['tk_city_founded']}</b></span>"
             f"<span><b>9,000+</b> {t['tk_athletes']}</span>"
             f"<span><b>280+</b> {t['tk_sports']}</span><span><b>85+</b> {t['tk_countries']}</span>"
             f"<span>{t['tk_live']} <b>2021</b></span>"
             f"<span>{t['tk_trusted']} <b>Puma · WHOOP · PwC · Kellogg's</b></span>"
             f"<span>{t['tk_offices']} <b>{t['tk_city_offices']}</b></span>")
    return f'<div class="ticker"><div class="track">{items}{items}</div></div>'


def faq_section(title, items, light=True):
    blocks = "".join(f"<div><h3>{q}</h3><p>{a}</p></div>" for q, a in items)
    return (f'<section class="{"light" if light else ""}"><div class="wrap">'
            f'<div class="section-head"><p class="eyebrow">FAQ</p><h2>{title}</h2></div>'
            f'<div class="faq">{blocks}</div></div></section>')


def cards(items, cls="grid g3"):
    return f'<div class="{cls}">' + "".join(
        f'<div class="card"><h3>{h}</h3><p>{p}</p></div>' for h, p in items) + "</div>"



CUSTOM_PKG_L10N = {
 "es": dict(eyebrow="Personalizado / A medida",
   h2="Paquete full-service: gestionamos la campaña por ti",
   intro="Para equipos sin tiempo para buscar y gestionar atletas internamente: nuestro equipo preselecciona y negocia el talento, gestiona entregables y aprobaciones e informa los resultados de principio a fin. Cuéntanos qué necesitas y diseñaremos un paquete a medida.",
   incl_label="Qué incluye",
   items=["Preselección y negociación de talento","Gestión de campaña y entregables","Flujos de aprobación listos para cumplimiento","Informe de fin de campaña","Soporte directo de los fundadores"],
   note="Cada paquete a medida se ajusta a tu campaña, mercados y presupuesto.",
   form_label="Solicitud de paquete personalizado",
   fallback="¿Prefieres empezar la conversación ahora? Reserva una llamada o escríbenos y diseñaremos tu paquete a medida.",
   cta="Hablar con ventas"),
 "fr": dict(eyebrow="Personnalisé / Sur mesure",
   h2="Offre full-service : nous menons la campagne pour vous",
   intro="Pour les équipes sans le temps de sourcer et gérer des athlètes en interne : notre équipe présélectionne et négocie les talents, gère les livrables et les validations et rend compte des résultats de bout en bout. Dites-nous ce dont vous avez besoin et nous cadrerons une offre sur mesure.",
   incl_label="Ce qui est inclus",
   items=["Présélection et négociation des talents","Gestion de campagne et des livrables","Flux de validation prêts pour la conformité","Reporting de fin de campagne","Support direct des fondateurs"],
   note="Chaque offre sur mesure est cadrée selon votre campagne, vos marchés et votre budget.",
   form_label="Demande d'offre personnalisée",
   fallback="Vous préférez démarrer la conversation maintenant ? Réservez un appel ou écrivez-nous et nous cadrerons votre offre sur mesure.",
   cta="Parler aux ventes"),
 "de": dict(eyebrow="Individuell / Maßgeschneidert",
   h2="Full-Service-Paket – wir führen die Kampagne für Sie durch",
   intro="Für Teams ohne Zeit, Athleten intern zu finden und zu steuern: Unser Team wählt Talente aus und verhandelt, steuert Deliverables und Freigaben und berichtet Ergebnisse von Anfang bis Ende. Sagen Sie uns, was Sie brauchen, und wir schnüren ein maßgeschneidertes Paket.",
   incl_label="Was enthalten ist",
   items=["Talentauswahl und -verhandlung","Kampagnen- und Deliverable-Steuerung","Compliance-fähige Freigabe-Workflows","Reporting zum Kampagnenende","Direkter Gründer-Support"],
   note="Jedes maßgeschneiderte Paket wird auf Ihre Kampagne, Märkte und Ihr Budget zugeschnitten.",
   form_label="Anfrage für individuelles Paket",
   fallback="Lieber jetzt ins Gespräch kommen? Buchen Sie einen Termin oder schreiben Sie uns, und wir schnüren Ihr maßgeschneidertes Paket.",
   cta="Mit dem Vertrieb sprechen"),
 "it": dict(eyebrow="Personalizzato / Su misura",
   h2="Pacchetto full-service: gestiamo la campagna per te",
   intro="Per team senza il tempo di trovare e gestire atleti internamente: il nostro team seleziona e negozia i talenti, gestisce deliverable e approvazioni e riporta i risultati end-to-end. Dicci di cosa hai bisogno e definiremo un pacchetto su misura.",
   incl_label="Cosa include",
   items=["Selezione e negoziazione dei talenti","Gestione di campagna e deliverable","Flussi di approvazione pronti per la compliance","Report di fine campagna","Supporto diretto dei fondatori"],
   note="Ogni pacchetto su misura è definito in base alla tua campagna, ai mercati e al budget.",
   form_label="Richiesta pacchetto personalizzato",
   fallback="Preferisci iniziare subito la conversazione? Prenota una call o scrivici e definiremo il tuo pacchetto su misura.",
   cta="Parla con il team vendite"),
 "nl": dict(eyebrow="Op maat / Maatwerk",
   h2="Full-servicepakket: wij voeren de campagne voor je uit",
   intro="Voor teams zonder tijd om zelf atleten te vinden en te beheren: ons team selecteert en onderhandelt talent, beheert deliverables en goedkeuringen en rapporteert de resultaten van begin tot eind. Vertel ons wat je nodig hebt en we stellen een pakket op maat samen.",
   incl_label="Wat is inbegrepen",
   items=["Talentselectie en onderhandeling","Campagne- en deliverablebeheer","Compliancegerichte goedkeuringsworkflows","Rapportage bij einde campagne","Directe ondersteuning van de oprichters"],
   note="Elk pakket op maat wordt afgestemd op je campagne, markten en budget.",
   form_label="Aanvraag pakket op maat",
   fallback="Liever nu het gesprek starten? Boek een gesprek of stuur ons een bericht en we stellen je pakket op maat samen.",
   cta="Praat met sales"),
}


SA_L10N = {
 "es": dict(sa_head="Marcas sudafricanas — facturación en ZAR",
   sa_intro="Precios locales para las marcas sudafricanas, en rands. Suscríbete a deportistas sudafricanos a una tarifa local, o llega a EE. UU., Reino Unido, Europa y el resto del mundo: cada mercado se añade por separado.",
   sa_market="Sudáfrica",
   sa_note="Facturado desde Irlanda en rands sudafricanos, sin IVA. Los acuerdos con deportistas conllevan la comisión estándar del 14–18 %."),
 "fr": dict(sa_head="Marques sud-africaines — facturé en ZAR",
   sa_intro="Tarifs locaux pour les marques sud-africaines, en rands. Abonnez-vous aux athlètes sud-africains à un tarif local, ou touchez les États-Unis, le Royaume-Uni, l'Europe et le reste du monde — chaque marché s'ajoute séparément.",
   sa_market="Afrique du Sud",
   sa_note="Facturé depuis l'Irlande en rands sud-africains, sans TVA. Les accords avec les athlètes comportent la commission standard de 14–18 %."),
 "de": dict(sa_head="Südafrikanische Marken — Abrechnung in ZAR",
   sa_intro="Lokale Preise für südafrikanische Marken, in Rand. Abonnieren Sie südafrikanische Athleten zum lokalen Tarif oder erreichen Sie die USA, das UK, Europa und den Rest der Welt — jeder Markt wird separat hinzugefügt.",
   sa_market="Südafrika",
   sa_note="Abgerechnet aus Irland in südafrikanischen Rand, ohne MwSt. Athleten-Deals unterliegen der Standardprovision von 14–18 %."),
 "it": dict(sa_head="Brand sudafricani — fatturazione in ZAR",
   sa_intro="Prezzi locali per i brand sudafricani, in rand. Abbonati agli atleti sudafricani a una tariffa locale, o raggiungi USA, Regno Unito, Europa e il resto del mondo — ogni mercato si aggiunge separatamente.",
   sa_market="Sudafrica",
   sa_note="Fatturato dall'Irlanda in rand sudafricani, senza IVA. Gli accordi con gli atleti prevedono la commissione standard del 14–18 %."),
 "nl": dict(sa_head="Zuid-Afrikaanse merken — facturering in ZAR",
   sa_intro="Lokale prijzen voor Zuid-Afrikaanse merken, in rand. Abonneer je op Zuid-Afrikaanse atleten tegen een lokaal tarief, of bereik de VS, het VK, Europa en de rest van de wereld — elke markt wordt apart toegevoegd.",
   sa_market="Zuid-Afrika",
   sa_note="Gefactureerd vanuit Ierland in Zuid-Afrikaanse rand, zonder btw. Atletendeals kennen de standaardcommissie van 14–18%."),
}

def build(lang, sh):
    # Point the demo CTA at this language's own demo page only where one is
    # actually built; otherwise fall back to the English page one level up.
    # (Dutch has no i18n.json entry, so nl/demo.html never gets generated.)
    global CAL
    CAL = "demo.html" if lang in sh.get("DEMO_LANGS", ()) else "../demo.html"
    t = importlib.import_module("t_" + lang).T
    fl = sh["faq_ld"]
    chrome = lambda slug: (header(slug, t), footer(t, sh["ENTITY"]))
    P = {}

    vs = {"video_eyebrow": t["v_eyebrow"], "video_title": t["v_title"], "video_sub": t["v_sub"],
          "video_coming": t["v_coming"], "video_hint": t["v_hint"]}

    # ---------- index ----------
    body = f"""
<section class="hero"><div class="wrap">
  <p class="eyebrow">{t['hx_eyebrow']}</p>
  <h1>{t['hx_h1']}</h1>
  <div class="answer"><p>{t['positioning']}</p></div>
  <p style="margin-top:18px" class="lead muted">{t['hx_lead']}</p>
  <div class="cta">
    <a class="btn gold" href="brands.html">{t['hx_cta1']}</a>
    <a class="btn ghost" href="{CAL}">{t['cta_demo']}</a>
    <a class="btn ghost" href="talent.html">{t['hx_cta3']}</a>
  </div>
</div></section>
{ticker(t)}
{sh['video_section'](vs)}
<section class="light"><div class="wrap">
  <div class="section-head"><p class="eyebrow">{t['hx_trust_eye']}</p><h2>{t['hx_trust_h2']}</h2></div>
  {sh['logos_wall']("../")}
</div></section>
<section><div class="wrap">
  <div class="section-head"><p class="eyebrow">{t['hx_three_eye']}</p><h2>{t['hx_three_h2']}</h2></div>
  {cards(t['hx_three'])}
</div></section>
<section class="light"><div class="wrap">
  <div class="section-head"><p class="eyebrow">{t['hx_how_eye']}</p><h2>{t['hx_how_h2']}</h2></div>
  {cards(t['hx_steps'], 'steps grid')}
</div></section>
{faq_section(t['hx_faq_h2'], t['hx_faq'], light=False)}
<section class="light"><div class="wrap" style="text-align:center">
  <h2>{t['hx_final_h2']}</h2>
  <p class="lead muted" style="margin:12px auto 24px;max-width:620px">{t['hx_final_p']}</p>
  <a class="btn gold" href="{CAL}">{t['cta_demo']}</a>
  <a class="btn ghost" href="subscription.html">{t['cta_pricing']}</a>
</div></section>"""
    P["index.html"] = dict(title=t["hx_title"], desc=t["hx_desc"], body=body,
                           jsonld=[fl(t["hx_faq"])] + sh["video_ld"](lang), chrome=chrome("index.html"))

    # ---------- brands ----------
    body = f"""
<section class="hero"><div class="wrap">
  <p class="eyebrow">{t['nav']['brands.html']}</p>
  <h1>{t['br_h1']}</h1>
  <div class="answer"><p>{t['br_answer']}</p></div>
  <div class="cta"><a class="btn gold" href="subscription.html">{t['br_cta1']}</a>
  <a class="btn ghost" href="{CAL}">{t['cta_demo']}</a></div>
</div></section>
{ticker(t)}
<section class="light"><div class="wrap">
  <div class="section-head"><p class="eyebrow">{t['br_cap_eye']}</p><h2>{t['br_cap_h2']}</h2></div>
  {cards(t['br_caps'])}
</div></section>
{faq_section(t['br_faq_h2'], t['br_faq'], light=False)}
<section class="light"><div class="wrap" style="text-align:center">
  <h2>{t['br_cmp_h2']}</h2>
  <p class="lead muted" style="margin:12px auto 24px;max-width:640px">{t['br_cmp_p']}</p>
  <a class="btn gold" href="../compare-athlete-marketing-platforms.html">{t['br_cmp_cta']} (EN)</a>
</div></section>
<section><div class="wrap" style="text-align:center">
  <h2>{t['br_final_h2']}</h2>
  <p class="lead muted" style="margin:12px auto 24px;max-width:600px">{t['br_final_p']}</p>
  <a class="btn gold" href="subscription.html">{t['cta_pricing']}</a>
  <a class="btn ghost" href="{CAL}">{t['cta_demo']}</a>
</div></section>"""
    P["brands.html"] = dict(title=t["br_title"], desc=t["br_desc"], body=body,
                            jsonld=[fl(t["br_faq"])], chrome=chrome("brands.html"))

    # ---------- talent ----------
    body = f"""
<section class="hero"><div class="wrap">
  <p class="eyebrow">{t['nav']['talent.html']}</p>
  <h1>{t['ta_h1']}</h1>
  <div class="answer"><p>{t['ta_answer']}</p></div>
  <div class="cta"><a class="btn gold" href="{SIGNUP}">{t['ta_cta1']}</a>
  <a class="btn ghost" href="{IOS}">App Store</a><a class="btn ghost" href="{ANDROID}">Google Play</a></div>
</div></section>
{ticker(t)}
<section class="light"><div class="wrap">
  <div class="section-head"><p class="eyebrow">{t['ta_why_eye']}</p><h2>{t['ta_why_h2']}</h2></div>
  {cards(t['ta_cards'])}
</div></section>
{faq_section(t['ta_faq_h2'], t['ta_faq'], light=False)}
<section class="light"><div class="wrap" style="text-align:center">
  <h2>{t['ta_final_h2']}</h2>
  <p class="lead" style="margin:12px auto 24px;max-width:600px">{t['ta_final_p']}</p>
  <a class="btn gold" href="{SIGNUP}">{t['ta_final_cta']}</a>
</div></section>"""
    P["talent.html"] = dict(title=t["ta_title"], desc=t["ta_desc"], body=body,
                            jsonld=[fl(t["ta_faq"])], chrome=chrome("talent.html"))

    # ---------- athletes ----------
    _translated = (not sh.get("ATHLETES_CUSTOM")) and len(t["ath_bios"]) == len(sh["ATHLETES"])
    _ath = sh["ATHLETES"]
    def _render(a):
        if _translated:
            i = _ath.index(a)
            a = {**a, "bio": t["ath_bios"][i], "tags": t["ath_tags"][i]}
        return sh["profile_card"](a, badge=t["ath_badge"], prefix="../")
    profiles = sh["geo_profile_grids"](_render, labels=t.get("ath_geo_labels"),
                                       custom=sh.get("ATHLETES_CUSTOM"))
    body = f"""
<section class="hero"><div class="wrap">
  <p class="eyebrow">{t['ath_eyebrow']}</p>
  <h1>{t['ath_h1']}</h1>
  <div class="answer"><p>{t['ath_answer']}</p></div>
  <div class="cta"><a class="btn gold" href="{CAL}">{t['ath_cta1']}</a>
  <a class="btn ghost" href="talent.html">{t['ath_cta2']}</a></div>
</div></section>
{ticker(t)}
<section class="light"><div class="wrap">
  <div class="section-head"><p class="eyebrow">{t['ath_grid_eye']}</p><h2>{t['ath_grid_h2']}</h2>
  <p>{t['ath_grid_p']}</p></div>
  {profiles}
</div></section>
{faq_section(t['ath_faq_h2'], t['ath_faq'], light=False)}
<section class="light"><div class="wrap" style="text-align:center">
  <h2>{t['ath_final_h2']}</h2>
  <p class="lead muted" style="margin:12px auto 24px;max-width:620px">{t['ath_final_p']}</p>
  <a class="btn gold" href="{CAL}">{t['cta_demo']}</a>
</div></section>"""
    P["athletes.html"] = dict(title=t["ath_title"], desc=t["ath_desc"], body=body,
                              jsonld=[fl(t["ath_faq"])], chrome=chrome("athletes.html"))

    # ---------- subscription ----------
    ANNUAL = [["$6,000", "$3,000", "$6,000", "$3,000"], ["£999", "£1,200", "£999", "£999"],
              ["€999", "€999", "€1,800", "€999"], ["€999", "€999", "€999", "€999"]]
    QUARTERLY = [["$2,200", "$1,100", "$2,200", "$1,100"], ["£380", "£480", "£380", "£380"],
                 ["€360", "€360", "€660", "€360"], ["€360", "€360", "€360", "€360"]]

    def loc_rate_table(vals):
        head = "".join(f"<th>{m}</th>" for m in t["su_markets"])
        rows = "".join(f"<tr><th>{t['su_origins'][i]}</th>" + "".join(f"<td>{v}</td>" for v in r) + "</tr>"
                       for i, r in enumerate(vals))
        return (f'<div class="tablewrap"><table class="compare"><thead><tr><th>{t["su_origin_h"]}</th>{head}</tr>'
                f'</thead><tbody>{rows}</tbody></table></div>')

    pb = dict(add=t["su_add"], added=t["su_added"], orx=t["su_or"], yr=t["su_yr"], qtr=t["su_qtr"],
              sel=t["su_sel"], start=t["su_start"], bill_a=t["su_bill_a"], bill_q=t["su_bill_q"],
              eye=t["su_market_eye"], demo=t["cta_demo"], markets=t["su_markets"],
              heads=t["su_geo_h"], cal=CAL)
    geo_blocks = "".join(sh["plan_builder_block"](i, default=(i == 2), t=pb) for i in range(4))
    _sa = dict(pb); _sa.update(SA_L10N.get(lang, {}))
    _sa["sa_labels"] = [_sa.get("sa_market", "South Africa")] + list(pb["markets"])
    geo_blocks += sh["sa_plan_block"](t=_sa)

    c_items = "".join(f"<li>{x}</li>" for x in t["su_c_feats"])
    body = f"""
<section class="hero"><div class="wrap">
  <p class="eyebrow">{t['nav']['subscription.html']}</p>
  <h1>{t['su_h1']}</h1>
  <div class="answer"><p>{t['su_answer']}</p></div>
</div></section>
{ticker(t)}
<section class="light"><div class="wrap">
  <div class="section-head"><p class="eyebrow">{t['su_rate_eye']}</p><h2>{t['su_rates_h2']}</h2>
  <p>{t['su_geo_p']}</p></div>
  {geo_blocks}
  <p class="muted" style="margin-top:14px;font-size:.85rem">{t['su_eff']}</p>
</div></section>
<section><div class="wrap">
  <div class="grid g2">
    <div class="card"><span class="eyebrow">{t['su_comm_eye']}</span><h3>{t['su_comm_h']}</h3><p>{t['su_comm_p']}</p></div>
    <div class="card plan"><span class="eyebrow">{t['su_c_name']}</span>
      <div class="price">{t['su_c_price']}</div>
      <p style="margin-top:14px"><a class="btn ghost" href="#custom-package">{t['su_c_cta']}</a></p></div>
  </div>
</div></section>
{sh["custom_package_section"](CUSTOM_PKG_L10N[lang])}
{faq_section(t['su_faq_h2'], t['su_faq'])}
<section><div class="wrap" style="text-align:center">
  <h2>{t['su_final_h2']}</h2>
  <p class="lead muted" style="margin:12px auto 24px;max-width:600px">{t['su_final_p']}</p>
  <a class="btn gold" href="{CAL}">{t['cta_demo']}</a>
</div></section>"""
    P["subscription.html"] = dict(title=t["su_title"], desc=t["su_desc"], body=body,
                                  jsonld=[fl(t["su_faq"])], chrome=chrome("subscription.html"))

    # ---------- about ----------
    e = sh["ENTITY"]
    rows = "".join(f"<tr><th>{k}</th><td>{v}</td></tr>" for k, v in t["ab_facts"])
    _roles_ok = len(t.get("ab_roles", [])) == len(sh["TEAM"])
    _members = ([{**m, "role": t["ab_roles"][i]} for i, m in enumerate(sh["TEAM"])] if _roles_ok else sh["TEAM"])
    team = sh["team_grid"](_members, prefix="../", labels=t.get("ab_group_labels"))
    body = f"""
<section class="hero"><div class="wrap">
  <p class="eyebrow">{t['ab_eyebrow']}</p>
  <h1>{t['ab_h1']}</h1>
  <div class="answer"><p>{t['positioning']}</p></div>
</div></section>
<section class="light"><div class="wrap">
  <div class="section-head"><p class="eyebrow">{t['ab_facts_eye']}</p><h2>{t['ab_facts_h2']}</h2></div>
  <div class="tablewrap"><table class="compare"><tbody>{rows}</tbody></table></div>
</div></section>
<section><div class="wrap">
  <div class="section-head"><p class="eyebrow">{t['ab_found_eye']}</p><h2>{t['ab_found_h2']}</h2></div>
  <div class="grid g2">
    <div class="card"><h3>Trevor Twamley — {t['ab_ceo']}</h3><p>{t['ab_trevor']}</p></div>
    <div class="card"><h3>Declan Bourke — {t['ab_coo']}</h3><p>{t['ab_declan']}</p></div>
  </div>
</div></section>
<section class="light"><div class="wrap">
  <div class="section-head"><p class="eyebrow">{t['ab_team_eye']}</p><h2>{t['ab_team_h2']}</h2>
  <p>{t['ab_team_p']}</p></div>
  {team}
</div></section>
<section><div class="wrap">
  <div class="section-head"><p class="eyebrow">{t['ab_tl_eye']}</p><h2>{t['ab_tl_h2']}</h2></div>
  {cards(t['ab_timeline'], 'steps grid')}
</div></section>
<section class="light"><div class="wrap" style="text-align:center">
  <h2>{t['ab_final_h2']}</h2>
  <p class="lead muted" style="margin:12px auto 24px;max-width:600px">{t['ab_final_p']}</p>
  <a class="btn gold" href="{CAL}">{t['cta_demo']}</a>
</div></section>"""
    P["about.html"] = dict(title=t["ab_title"], desc=t["ab_desc"], body=body,
                           jsonld=[], chrome=chrome("about.html"))

    # ---------- faqs ----------
    blocks = "".join(f"<div><h3>{q}</h3><p>{a}</p></div>" for q, a in t["fq_items"])
    body = f"""
<section class="hero"><div class="wrap">
  <p class="eyebrow">FAQ</p>
  <h1>{t['fq_h1']}</h1>
  <div class="answer"><p>{t['fq_answer']}</p></div>
</div></section>
<section class="light"><div class="wrap"><div class="faq">{blocks}</div>
<p class="updated">{t['fq_updated']}: {sh['TODAY']}</p>
</div></section>"""
    P["faqs.html"] = dict(title=t["fq_title"], desc=t["fq_desc"], body=body,
                          jsonld=[fl(t["fq_items"])], chrome=chrome("faqs.html"))

    return P
