#!/usr/bin/env python3
"""
Publishes the app to the repo root as the normal multi-file version that
GitHub Pages actually serves live — NOT the fully-inlined single-file
bundle build_single_file.py produces.

Why this exists: the live site is index.html at repo root, served over
HTTPS via GitHub Pages (confirmed by the .nojekyll marker and by how the
app is actually opened in practice). A fully-inlined single HTML document
with ~500 images baked in as base64 (what build_single_file.py makes, for
the genuinely different use case of handing someone one portable file to
open via file://) has to be parsed in full, and holds every image's data
in memory for the whole session, on every single visit — regardless of
which page someone actually looks at. Over real HTTPS, the standard fix
is to let the browser do what it's good at: fetch each image only when a
page that needs it actually renders, and cache it normally between visits.
This script does that: it keeps the source's own relative 'images/...' /
'audio/...' references untouched in spirit, just re-pointed at
mass-app/images/ and mass-app/audio/ (where those files actually live —
not duplicated to root, so there's exactly one copy of each binary asset
in the repo) and copies index.html/manifest.json/sw.js to root so the
real paths resolve.

Usage:
    python3 build_deploy.py
"""
import re, os, json

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
SRC = os.path.join(HERE, "areviax_mass_app (4).html")


def rewrite_asset_paths(text):
    """Re-point every quoted 'images/...' / 'audio/...' reference at
    mass-app/images/... / mass-app/audio/... — the root-published
    index.html lives one directory up from where those files actually are."""
    pattern = re.compile(r"(['\"])((?:images|audio)/[^'\"]+\.(?:png|mp3|jpg|jpeg|svg))\1")
    return pattern.sub(lambda m: m.group(1) + "mass-app/" + m.group(2) + m.group(1), text)


def build():
    data = open(SRC, encoding="utf-8").read()
    data = data.replace(
        '<link rel="manifest" href="manifest.json">',
        '<link rel="manifest" href="manifest.json">',  # stays relative to root — manifest.json is copied to root below
        1,
    )
    data = rewrite_asset_paths(data)

    # Checks for a quoted path that's STILL bare (not prefixed with mass-app/)
    # — must require the quote to sit immediately before images/ or audio/,
    # otherwise this false-positives on the tail of every already-correct
    # "mass-app/images/..." path (a bare, unanchored search finds that
    # substring too, which isn't actually a problem).
    remaining = re.findall(r"(['\"])((?:images|audio)/[^'\"]+\.(?:png|mp3|jpg|jpeg|svg))\1", data)
    if remaining:
        print("WARNING: unresolved asset references left in output:", {r[1] for r in remaining})

    out_html = os.path.join(ROOT, "index.html")
    with open(out_html, "w", encoding="utf-8") as f:
        f.write(data)
    print("Wrote ->", out_html, f"({os.path.getsize(out_html)} bytes)")

    # manifest.json: same re-pointing for its icon path, written to root
    manifest_obj = json.load(open(os.path.join(HERE, "manifest.json"), encoding="utf-8"))
    for icon in manifest_obj.get("icons", []):
        if icon.get("src", "").startswith(("images/", "audio/")):
            icon["src"] = "mass-app/" + icon["src"]
    out_manifest = os.path.join(ROOT, "manifest.json")
    with open(out_manifest, "w", encoding="utf-8") as f:
        json.dump(manifest_obj, f)
    print("Wrote ->", out_manifest)

    # sw.js: same re-pointing in its precache list
    sw_src = open(os.path.join(HERE, "sw.js"), encoding="utf-8").read()
    sw_src = rewrite_asset_paths(sw_src)
    out_sw = os.path.join(ROOT, "sw.js")
    with open(out_sw, "w", encoding="utf-8") as f:
        f.write(sw_src)
    print("Wrote ->", out_sw)


if __name__ == "__main__":
    build()
