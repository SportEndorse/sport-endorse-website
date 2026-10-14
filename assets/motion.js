/* Sport Endorse - motion layer (EISG-style entrance animation).
   Kept in its OWN file, loaded after site.js, so that:
   (a) any error in the region/i18n logic can never disable the animations
       (and vice versa), and
   (b) removing this one <script> tag + file rolls the whole effect back.
   Pure progressive enhancement: served HTML is never pre-hidden. */
/* ---------- Motion layer (visual only) ----------
   EISG-style entrance animation, implemented as pure progressive enhancement:
   the HTML is never pre-hidden (SEO/AEO-safe), markup stays clean (no
   permanent word-splitting in source), transform/opacity only (no CLS),
   and everything is skipped for prefers-reduced-motion / old browsers. */
(function () {
  "use strict";
  if (window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;

  var io = new IntersectionObserver(function (entries) {
    for (var i = 0; i < entries.length; i++) {
      if (!entries[i].isIntersecting) continue;
      var el = entries[i].target;
      io.unobserve(el);
      el.classList.add("on");
      if (el.hasAttribute("data-t")) runCounter(el);
    }
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

  /* -- word reveal: wrap words in spans at runtime, single spaces preserved -- */
  function splitWords(el) {
    if (el.classList.contains("wsplit")) return;
    var nodes = Array.prototype.slice.call(el.childNodes), i, j;
    for (i = 0; i < nodes.length; i++) {
      var n = nodes[i];
      if (n.nodeType === 3) {
        var parts = n.textContent.split(/(\s+)/), frag = document.createDocumentFragment();
        for (j = 0; j < parts.length; j++) {
          if (!parts[j]) continue;
          if (/^\s+$/.test(parts[j])) frag.appendChild(document.createTextNode(" "));
          else { var w = document.createElement("i"); w.className = "w"; w.textContent = parts[j]; frag.appendChild(w); }  // <i>, not <span>: heading colour rules like ".hero h1 span" must only hit the original emphasis span
        }
        el.replaceChild(frag, n);
      } else if (n.nodeType === 1 && n.textContent.trim()) {
        n.className += " w";           // e.g. the gold <span> travels as one word unit
      }                                // <br> and other empty elements are left untouched
    }
    var ws = el.querySelectorAll(":scope > .w"), d = 0;
    for (i = 0; i < ws.length; i++) { ws[i].style.transitionDelay = d + "ms"; d = Math.min(d + 70, 700); }
    el.classList.add("wsplit");
    io.observe(el);
  }

  /* -- rise-in blocks with per-card stagger -- */
  function rise(el, delay) {
    if (el.classList.contains("rv")) return;
    el.classList.add("rv");
    if (delay) el.style.setProperty("--rvd", delay + "ms");
    io.observe(el);
  }

  /* -- count-up numbers: wrap "1,234+"-style figures found in key lines -- */
  function tagCounters(scope) {
    var cands = document.querySelectorAll(scope), re = /(\d{1,3}(?:[.,]\d{3})+|\d{2,4})\+/;
    for (var c = 0; c < cands.length; c++) {
      var nodes = cands[c].childNodes;
      for (var i = 0; i < nodes.length; i++) {
        var n = nodes[i], m;
        if (n.nodeType !== 3 || !(m = n.textContent.match(re))) continue;
        var sep = m[1].replace(/\d/g, "").charAt(0) || "";
        var span = document.createElement("span");
        span.className = "cnt";
        span.setAttribute("data-t", m[1].replace(/[.,]/g, ""));
        span.setAttribute("data-sep", sep);
        span.textContent = m[1] + "+";
        var after = document.createTextNode(n.textContent.slice(m.index + m[0].length));
        n.textContent = n.textContent.slice(0, m.index);
        n.parentNode.insertBefore(span, n.nextSibling);
        n.parentNode.insertBefore(after, span.nextSibling);
        io.observe(span);
        i += 1;   // continue scanning the remainder text node for further figures
      }
    }
  }
  function fmt(v, sep) {
    var s = String(v);
    return sep ? s.replace(/\B(?=(\d{3})+(?!\d))/g, sep) : s;
  }
  function runCounter(el) {
    var t = parseInt(el.getAttribute("data-t"), 10), sep = el.getAttribute("data-sep"), start = null;
    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / 900, 1), e = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(Math.round(t * e), sep) + "+";
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* -- brand logo wall -> two slow counter-scrolling rows -- */
  function marquee(wall) {
    var kids = Array.prototype.slice.call(wall.children);
    if (kids.length < 10) return;
    var rows = [document.createElement("div"), document.createElement("div")];
    rows[0].className = "lg-row"; rows[1].className = "lg-row rev";
    for (var i = 0; i < kids.length; i++) rows[i % 2].appendChild(kids[i]);
    for (i = 0; i < 2; i++) {
      var dup = rows[i].cloneNode(true);
      dup.setAttribute("aria-hidden", "true");
      while (dup.firstChild) rows[i].appendChild(dup.firstChild);
      rows[i].style.setProperty("--lgm-t", (i ? 66 : 54) + "s");
      wall.appendChild(rows[i]);
    }
    wall.classList.add("lg-marquee");
  }

  function safely(fn) { try { fn(); } catch (e) { /* one feature failing must not kill the rest */ } }

  function boot() {
    safely(function () {
      var els = document.querySelectorAll(".hero h1, .section-head h2");
      for (var i = 0; i < els.length; i++) safely(splitWords.bind(null, els[i]));
    });
    safely(function () {
      var els = document.querySelectorAll(".hero .eyebrow, .hero .lead, .hero .answer, .hero .region-note, .section-head .eyebrow, .section-head p");
      for (var i = 0; i < els.length; i++) rise(els[i], (i % 3) * 90);
    });
    safely(function () {
      var els = document.querySelectorAll(".grid.g2, .grid.g3, .grid.g4, .grid.g5");
      for (var i = 0; i < els.length; i++) {
        var kids = els[i].children;
        for (var k = 0; k < kids.length; k++) rise(kids[k], Math.min(k * 70, 420));
      }
    });
    safely(function () { tagCounters(".hero p.muted, section h2, .kpis b"); });
    safely(function () {
      var wall = document.querySelector(".logos");
      if (wall) marquee(wall);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
