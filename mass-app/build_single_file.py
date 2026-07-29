#!/usr/bin/env python3
"""
Bundles the split-asset source (areviax_mass_app (4).html + images/ + audio/
+ manifest.json) back into one self-contained .html file for distribution
as a single portable file (e.g. selling/handing out one file, or opening via
file:// with no server).

Usage:
    python3 build_single_file.py [output_path]

Default output: dist/areviax_mass_bundled.html
"""
import re, sys, os, json, base64

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "areviax_mass_app (4).html")
MIME = {".png": "image/png", ".mp3": "audio/mpeg"}


def data_uri_for(rel_path):
    ext = os.path.splitext(rel_path)[1]
    mime = MIME[ext]
    with open(os.path.join(HERE, rel_path), "rb") as f:
        b = f.read()
    return f"data:{mime};base64,{base64.b64encode(b).decode('ascii')}"


def inline_asset_paths(text):
    """Replace every quoted 'images/...' / 'audio/...' path with its data URI."""
    pattern = re.compile(r"(['\"])((?:images|audio)/[^'\"]+\.(?:png|mp3))\1")

    def repl(m):
        quote, rel = m.group(1), m.group(2)
        return quote + data_uri_for(rel) + quote

    return pattern.sub(repl, text)


def build(output_path):
    data = open(SRC, encoding="utf-8").read()

    # Inline the manifest first (it references images/icons/favicon.png
    # internally too), then inline everything else in the HTML/JS/CSS.
    manifest_path = os.path.join(HERE, "manifest.json")
    manifest_obj = json.load(open(manifest_path, encoding="utf-8"))
    manifest_text = inline_asset_paths(json.dumps(manifest_obj))
    manifest_data_uri = "data:application/manifest+json;base64," + base64.b64encode(
        manifest_text.encode("utf-8")
    ).decode("ascii")
    data = data.replace(
        '<link rel="manifest" href="manifest.json">',
        f'<link rel="manifest" href="{manifest_data_uri}">',
        1,
    )

    data = inline_asset_paths(data)

    remaining = re.findall(r"(?:images|audio)/[^'\"]+\.(?:png|mp3)", data)
    if remaining:
        print("WARNING: unresolved asset references left in output:", set(remaining))

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(data)
    print("Bundled ->", output_path, f"({os.path.getsize(output_path)} bytes)")


if __name__ == "__main__":
    out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, "dist", "areviax_mass_bundled.html")
    build(out)
