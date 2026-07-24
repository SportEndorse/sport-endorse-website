"""Text-level localization for pages that share the English HTML structure.

Rather than re-templating each page per language, we take the already-correct
English body/title/desc and swap only human-readable text via per-language
maps in i18n.json. Anything not in the map falls back to English, so a page
can never break — and coverage() lets build.py gate hreflang/sitemap signals
so we never advertise a barely-translated page to search engines.
"""
import os, re, json

_HERE = os.path.dirname(os.path.abspath(__file__))
_SKIP = re.compile(r'^[\s\W\d]*$')

def load_i18n():
    p = os.path.join(_HERE, "i18n.json")
    if os.path.exists(p):
        try:
            return json.load(open(p, encoding="utf-8"))
        except Exception as e:
            print(f"WARNING: i18n.json parse error ({e}); locale text falls back to English")
    return {}

def _tr_attr(html, attr, tmap):
    def repl(m):
        v = m.group(1)
        return f'{attr}="{tmap.get(v, v)}"'
    return re.sub(rf'{attr}="([^"]+)"', repl, html)

def localize_html(html, tmap):
    """Swap translatable text nodes + selected attributes using tmap."""
    if not tmap:
        return html
    for attr in ("alt", "aria-label", "placeholder"):
        html = _tr_attr(html, attr, tmap)

    def repl(m):
        pre, text, post = m.group(1), m.group(2), m.group(3)
        key = text.strip()
        if not key or _SKIP.match(key) or key not in tmap:
            return m.group(0)
        # preserve surrounding whitespace exactly
        lead = text[:len(text) - len(text.lstrip())]
        trail = text[len(text.rstrip()):]
        return f"{pre}{lead}{tmap[key]}{trail}{post}"

    return re.sub(r'(>)([^<>]+)(<)', repl, html)

def tr(text, tmap):
    return tmap.get(text.strip(), text) if tmap else text

def coverage(segments, tmap):
    """Fraction of a page's unique visible segments present in tmap."""
    uniq = {s for s in segments if s.strip() and not _SKIP.match(s.strip())}
    if not uniq:
        return 1.0
    have = sum(1 for s in uniq if s in tmap)
    return have / len(uniq)

def extract_segments(html):
    """Same extraction build-time QA uses, to compute coverage."""
    segs = []
    for attr in ("alt", "aria-label", "placeholder"):
        segs += re.findall(rf'{attr}="([^"]+)"', html)
    for t in re.findall(r'>([^<>]+)<', html):
        t2 = t.strip()
        if t2 and not _SKIP.match(t2):
            segs.append(t2)
    return segs
