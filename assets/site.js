/* Sport Endorse — progressive enhancement layer.
   Everything meaningful is server-rendered in the HTML (AEO requirement).
   This script only: (1) picks a region variant, (2) swaps UI strings for
   non-English visitors, (3) runs the mobile menu. */

(function () {
  "use strict";

  /* ---------- safe storage (falls back to memory) ---------- */
  var mem = {};
  var store = {
    get: function (k) { try { return localStorage.getItem(k) || mem[k] || null; } catch (e) { return mem[k] || null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} mem[k] = v; }
  };

  /* ---------- REGION (geotargeting) ----------
     Regions: us, uk, ie, eu, za, row.
     First visit: infer from browser locale + timezone. Always user-overridable.
     For true server-side geotargeting use the CDN header (see README):
     Cloudflare adds CF-IPCountry; map it to one of these codes at the edge. */
  var REGIONS = ["us", "uk", "ie", "eu", "za", "row"];

  function detectRegion() {
    var saved = store.get("se-region");
    if (saved && REGIONS.indexOf(saved) > -1) return saved;
    var loc = (navigator.language || "").toLowerCase();
    var tz = "";
    try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (e) {}
    if (/-us$/.test(loc) || /^america\//.test(tz) && !/argentina|sao_paulo|bogota|lima|mexico/.test(tz.toLowerCase())) return "us";
    if (/-ie$/.test(loc) || tz === "Europe/Dublin") return "ie";
    if (/-gb$/.test(loc) || tz === "Europe/London") return "uk";
    if (/-za$/.test(loc) || tz === "Africa/Johannesburg") return "za";
    if (/^(de|fr|es|it|nl|pt|pl|sv|da|fi)\b/.test(loc) || /^europe\//.test(tz)) return "eu";
    return "row";
  }

  function applyRegion(region) {
    document.documentElement.setAttribute("data-region", region);
    // Show only matching geo blocks; blocks may list several regions: data-geo="uk ie"
    var blocks = document.querySelectorAll("[data-geo]");
    for (var i = 0; i < blocks.length; i++) {
      var regions = blocks[i].getAttribute("data-geo").split(/\s+/);
      blocks[i].classList.toggle("geo-on", regions.indexOf(region) > -1);
    }
    // Currency symbol swap
    var cur = { us: "$", uk: "£", ie: "€", eu: "€", za: "€", row: "€" }[region];
    var curEls = document.querySelectorAll("[data-currency]");
    for (var j = 0; j < curEls.length; j++) curEls[j].textContent = cur;
    // Sync pickers
    var pickers = document.querySelectorAll("select[data-region-picker]");
    for (var k = 0; k < pickers.length; k++) pickers[k].value = region;
  }

  /* ---------- LANGUAGE (UI chrome only — full localized pages ship as
     /es/, /de/, /fr/, /it/ static builds with hreflang; see README) ---------- */
  var I18N = {
    es: { "nav.brands": "Para marcas", "nav.talent": "Para atletas", "nav.agencies": "Para agencias", "nav.athletes": "Perfiles", "nav.blog": "Blog", "nav.pricing": "Precios", "nav.compare": "Comparar", "nav.stories": "Casos de éxito", "cta.demo": "Reservar demo", "cta.signup": "Registrarse", "cta.explore": "Explorar atletas", "hero.note": "Plataforma de marketing de atletas y patrocinio deportivo — más de 9.000 atletas de élite verificados." },
    de: { "nav.brands": "Für Marken", "nav.talent": "Für Athleten", "nav.agencies": "Für Agenturen", "nav.athletes": "Profile", "nav.blog": "Blog", "nav.pricing": "Preise", "nav.compare": "Vergleich", "nav.stories": "Erfolgsgeschichten", "cta.demo": "Demo buchen", "cta.signup": "Registrieren", "cta.explore": "Athleten entdecken", "hero.note": "Plattform für Athletenmarketing und Sportsponsoring — über 9.000 verifizierte Spitzenathleten." },
    fr: { "nav.brands": "Pour les marques", "nav.talent": "Pour les athlètes", "nav.agencies": "Pour les agences", "nav.athletes": "Profils", "nav.blog": "Blog", "nav.pricing": "Tarifs", "nav.compare": "Comparer", "nav.stories": "Études de cas", "cta.demo": "Réserver une démo", "cta.signup": "S'inscrire", "cta.explore": "Découvrir les athlètes", "hero.note": "Plateforme de marketing d'athlètes et de sponsoring sportif — plus de 9 000 athlètes d'élite vérifiés." },
    it: { "nav.brands": "Per i brand", "nav.talent": "Per gli atleti", "nav.agencies": "Per le agenzie", "nav.athletes": "Profili", "nav.blog": "Blog", "nav.pricing": "Prezzi", "nav.compare": "Confronta", "nav.stories": "Casi di successo", "cta.demo": "Prenota una demo", "cta.signup": "Registrati", "cta.explore": "Scopri gli atleti", "hero.note": "Piattaforma di athlete marketing e sponsorizzazioni sportive — oltre 9.000 atleti d'élite verificati." }
  };

  function applyLang(lang) {
    var dict = I18N[lang];
    var els = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < els.length; i++) {
      var key = els[i].getAttribute("data-i18n");
      if (!dict) { // english: restore original
        if (els[i].hasAttribute("data-i18n-en")) els[i].textContent = els[i].getAttribute("data-i18n-en");
      } else if (dict[key]) {
        if (!els[i].hasAttribute("data-i18n-en")) els[i].setAttribute("data-i18n-en", els[i].textContent);
        els[i].textContent = dict[key];
      }
    }
    var pickers = document.querySelectorAll("select[data-lang-picker]");
    for (var k = 0; k < pickers.length; k++) pickers[k].value = lang;
  }

  /* Pages that exist as full native builds in /es/ /fr/ /de/ /it/.
     Picking a language on these pages NAVIGATES to the translated page;
     other pages fall back to the small dictionary swap above. */
  var LOCALIZED = ["index.html", "brands.html", "talent.html", "athletes.html",
                   "subscription.html", "about.html", "faqs.html"];

  function pageSlug() {
    var seg = (location.pathname.split("/").pop() || "index.html");
    return seg.indexOf(".html") > -1 ? seg : "index.html";
  }

  function switchLang(target) {
    store.set("se-lang", target);
    var current = document.documentElement.lang || "en";
    if (target === current) return;
    var slug = pageSlug();
    var avail = (window.SE_LOC && window.SE_LOC[slug]) || [];
    var hasTarget = target === "en" || avail.indexOf(target) > -1;
    if (LOCALIZED.indexOf(slug) > -1 || avail.length) {
      var up = current === "en" ? "" : "../";
      if (hasTarget) {
        location.href = up + (target === "en" ? "" : target + "/") + slug;
      } else {
        // page not translated into the target language: go to that language's
        // homepage rather than a dead end
        location.href = up + (target === "en" ? "" : target + "/");
      }
      return;
    }
    // Fully English-only page (e.g. blog): light chrome translation only.
    applyLang(target);
  }

  /* ---------- overview video: click-to-play facade ---------- */
  function initVideo() {
    var btn = document.querySelector(".vplay[data-video-id]");
    if (!btn) return;
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-video-id");
      var shell = btn.closest(".video-shell");
      if (!id || !shell) return;
      var f = document.createElement("iframe");
      f.src = "https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0";
      f.title = "Sport Endorse overview video";
      f.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      f.setAttribute("allowfullscreen", "");
      shell.innerHTML = "";
      shell.appendChild(f);
    });
  }

  /* ---------- pricing plan builder ---------- */
  function initPlanBuilders() {
    var blocks = document.querySelectorAll("[data-planbuilder]");
    function fmt(n) { return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
    for (var b = 0; b < blocks.length; b++) (function (blk) {
      var billing = "annual";
      var cards = blk.querySelectorAll("[data-market]");
      var tAdd = blk.getAttribute("data-t-add"), tAdded = blk.getAttribute("data-t-added");
      var tOr = blk.getAttribute("data-t-or"), tYr = blk.getAttribute("data-t-yr"), tQtr = blk.getAttribute("data-t-qtr");

      function render() {
        var total = 0, names = [], keys = [], cur = "";
        for (var i = 0; i < cards.length; i++) {
          var c = cards[i];
          cur = c.getAttribute("data-cur");
          var price = parseInt(c.getAttribute("data-" + billing), 10);
          var alt = parseInt(c.getAttribute("data-" + (billing === "annual" ? "quarterly" : "annual")), 10);
          var elP = c.querySelector("[data-mprice]"), elPer = c.querySelector("[data-mper]"),
              elAlt = c.querySelector("[data-malt]"), elAdd = c.querySelector("[data-madd]");
          if (elP) elP.textContent = cur + fmt(price);
          if (elPer) elPer.textContent = billing === "annual" ? tYr : tQtr;
          if (elAlt) elAlt.textContent = tOr + " " + cur + fmt(alt) + (billing === "annual" ? tQtr : tYr);
          var on = c.classList.contains("sel");
          if (elAdd) elAdd.textContent = on ? tAdded : tAdd;
          if (on) { total += price; names.push(c.querySelector("h3").textContent); keys.push(c.getAttribute("data-market")); }
        }
        var sum = blk.querySelector("[data-msummary]");
        if (!sum) return;
        sum.hidden = keys.length === 0;
        if (keys.length) {
          sum.querySelector("[data-msel]").textContent = names.join(" + ");
          sum.querySelector("[data-mtotal]").textContent = cur + fmt(total) + (billing === "annual" ? tYr : tQtr);
          var start = sum.querySelector("[data-mstart]");
          if (start) {
            var base = start.href.split("?")[0];
            start.href = base + "?billing=" + billing + "&markets=" + keys.join(",");
          }
        }
      }

      blk.addEventListener("click", function (e) {
        var bp = e.target.closest("[data-bill]");
        if (bp) {
          var ps = blk.querySelectorAll("[data-bill]");
          for (var i = 0; i < ps.length; i++) ps[i].classList.remove("on");
          bp.classList.add("on");
          billing = bp.getAttribute("data-bill");
          render();
          return;
        }
        var add = e.target.closest("[data-madd]");
        if (add) { add.closest("[data-market]").classList.toggle("sel"); render(); }
      });

      render();
    })(blocks[b]);
  }

  /* ---------- case-study directory: filters + search ---------- */
  function initStoryFilters() {
    var bar = document.querySelector("[data-storyfilters]");
    if (!bar) return;
    var cards = document.querySelectorAll("[data-story]");
    var state = { industry: "", ctype: "", region: "", q: "" };

    function apply() {
      var shown = 0;
      for (var i = 0; i < cards.length; i++) {
        var c = cards[i];
        var ok = (!state.industry || c.getAttribute("data-industry") === state.industry)
              && (!state.ctype || c.getAttribute("data-ctype") === state.ctype)
              && (!state.region || c.getAttribute("data-region") === state.region)
              && (!state.q || (c.getAttribute("data-search") || "").indexOf(state.q) > -1);
        c.classList.toggle("hidden", !ok);
        if (ok) shown++;
      }
      var count = document.querySelector("[data-fcount]");
      if (count) count.textContent = "Showing " + shown + " of " + cards.length + " campaigns";
      var empty = document.querySelector("[data-fempty]");
      if (empty) empty.hidden = shown !== 0;
    }

    bar.addEventListener("click", function (e) {
      var pill = e.target.closest(".fpill");
      if (!pill) return;
      var group = pill.closest("[data-fgroup]");
      var key = group.getAttribute("data-fgroup");
      var pills = group.querySelectorAll(".fpill");
      for (var i = 0; i < pills.length; i++) pills[i].classList.remove("on");
      pill.classList.add("on");
      state[key] = pill.getAttribute("data-f") || "";
      apply();
    });

    var search = bar.querySelector("[data-fsearch]");
    if (search) search.addEventListener("input", function () {
      state.q = search.value.trim().toLowerCase();
      apply();
    });

    apply();
  }

  /* ---------- boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    var region = detectRegion();
    applyRegion(region);
    store.set("se-region", region);

    var pageLang = document.documentElement.lang || "en";
    var saved = store.get("se-lang");
    if (pageLang === "en") {
      // On English pages the dictionary handles chrome strings if a
      // non-English preference is stored (native builds cover the rest).
      applyLang(saved && I18N[saved] ? saved : "en");
    } else {
      // Native locale page: content is already translated; just sync pickers.
      var pickers = document.querySelectorAll("select[data-lang-picker]");
      for (var k = 0; k < pickers.length; k++) pickers[k].value = pageLang;
    }

    document.addEventListener("change", function (e) {
      if (e.target.matches("select[data-region-picker]")) {
        store.set("se-region", e.target.value);
        applyRegion(e.target.value);
      }
      if (e.target.matches("select[data-lang-picker]")) {
        switchLang(e.target.value);
      }
    });

    initVideo();
    initStoryFilters();
    initPlanBuilders();

    var toggle = document.querySelector(".menu-toggle");
    if (toggle) toggle.addEventListener("click", function () {
      var nav = document.querySelector(".nav");
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });
})();
