/* Help centre search — loads the static index and filters as you type.
   No dependencies; enhances the search box on /help/. */
(function () {
  var input = document.getElementById("hcq");
  var box = document.getElementById("hcresults");
  if (!input || !box) return;

  var data = [];
  fetch("search-index.json")
    .then(function (r) { return r.ok ? r.json() : []; })
    .then(function (j) { data = j || []; })
    .catch(function () { data = []; });

  function esc(s) { return (s || "").replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  function score(item, q) {
    var hay = (item.t + " " + item.l + " " + item.k + " " + item.c).toLowerCase();
    if (hay.indexOf(q) === -1) return 0;
    var s = 0;
    if (item.t.toLowerCase().indexOf(q) !== -1) s += 5;
    if (item.k.toLowerCase().indexOf(q) !== -1) s += 3;
    if (item.l.toLowerCase().indexOf(q) !== -1) s += 1;
    return s || 1;
  }

  function render(q) {
    if (!q) { box.hidden = true; box.innerHTML = ""; return; }
    var ranked = data
      .map(function (it) { return { it: it, s: score(it, q) }; })
      .filter(function (x) { return x.s > 0; })
      .sort(function (a, b) { return b.s - a.s; })
      .slice(0, 8);
    if (!ranked.length) {
      box.innerHTML = '<div class="none">No results. Try “pricing”, “commission”, “verify” or <a href="contact.html">contact us</a>.</div>';
    } else {
      box.innerHTML = ranked.map(function (x) {
        return '<a href="' + x.it.u + '"><span class="rc">' + esc(x.it.c) +
          '</span><span class="rt">' + esc(x.it.t) + '</span>' +
          '<span class="rl">' + esc(x.it.l) + '</span></a>';
      }).join("");
    }
    box.hidden = false;
  }

  var t;
  input.addEventListener("input", function () {
    clearTimeout(t);
    var q = input.value.trim().toLowerCase();
    t = setTimeout(function () { render(q); }, 90);
  });

  // keyboard: arrow up/down + enter
  input.addEventListener("keydown", function (e) {
    var items = Array.prototype.slice.call(box.querySelectorAll("a"));
    if (!items.length) return;
    var cur = box.querySelector("a.on");
    var i = items.indexOf(cur);
    if (e.key === "ArrowDown") { e.preventDefault(); i = Math.min(i + 1, items.length - 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); i = Math.max(i - 1, 0); }
    else if (e.key === "Enter") { if (cur) { e.preventDefault(); window.location = cur.getAttribute("href"); } return; }
    else return;
    items.forEach(function (a) { a.classList.remove("on"); });
    if (items[i]) items[i].classList.add("on");
  });

  document.addEventListener("click", function (e) {
    if (!box.contains(e.target) && e.target !== input) { box.hidden = true; }
  });
})();
