# Trophy Cabinet — pending 3D relic art

18 of the 49 `LEGEND_CARDS` entries in `areviax_mass_app (4).html` still render
as flat inline SVG line-icons (a dark circle + a single bronze stroke glyph)
instead of real 3D-rendered relic photography like `images/relics/fist.png`
(Halteres of the Palaestra) or `images/relics/torch.png` (Prometheus's Fire).
User asked for all of them upgraded to match that quality bar.

Blocked as of 2026-09-09: Higgsfield credit balance was 0.45 (not enough for
even one generation + background removal). User confirmed credits reset
monthly, expected back around October — this file is the "pick up exactly
where we left off" checklist for that session, so no research/prompt-writing
needs to happen again.

## How to tell a card is done

Grep the card's `key` in `LEGEND_CARDS` — done ones have
`img:'images/relics/<name>.png'`; pending ones have
`img:'data:image/svg+xml;base64,...'`. Once art lands, both `img` and
`imgThumb` need updating to the same real path (see any already-real entry
for the exact field shape to match).

## Pipeline (same one already proven on the 9 hero cards this session)

1. `generate_image_batch` — small waves (rate-limited), one request per prompt
   below. Match the established look: warm bronze/ember palette, dramatic
   rim lighting, weathered patina, shot like museum relic photography, clean
   isolated background so it's easy to cut out, no text/base/extra props in
   frame unless the prompt says otherwise.
2. Background removal — the custom PIL flood-fill approach from earlier this
   session (not the paid 1-credit `remove_background` tool, to conserve
   budget): resize to 512x512 first for BFS speed, background-ish test is
   `r>135 and g>135 and b>135 and abs(r-g)<22 and abs(g-b)<22 and abs(r-b)<22`
   (catches light-gray gradients, not just pure white).
3. Quantize/resize to 72x72 RGBA PNG (matches every existing `images/relics/`
   file) via `sandbox_exec`.
4. **MD5-verify every transfer** (sandbox `md5sum` vs local `hashlib`/shell
   `md5sum` after decode) — manual base64 transcription is not reliably
   lossless above ~17-20K chars of response text, confirmed the hard way
   earlier this session (Theseus went out with a stale bad file once from
   exactly this).
5. Update the matching `LEGEND_CARDS` entry's `img`/`imgThumb`, drop the file
   in `images/relics/<name>.png`.
6. `node --check` the extracted script, `python3 build_single_file.py`,
   screenshot the Trophy Cabinet via Playwright before/after to confirm no
   regression, sync `mass-app/index.html` from the rebuilt dist bundle
   (that's the file GitHub Pages actually serves — always copy it after
   every rebuild), commit, push (check `git fetch origin main` for
   concurrent pushes first — this repo has multiple concurrent sessions).

## The 18 cards, with target filename and prompt

Deliberately avoided reusing a concept already spoken for elsewhere in the
set (e.g. a second hourglass would collide with Chronos's `hourglass.png`,
a second cornucopia-adjacent horn would collide with `cornucopia.png`) —
picked a more specific, historically real alternative instead where that
came up.

### Bronze — Mortal Foundations (12 total, `dumbbell`/Halteres already real)

| key | name | rarity | target file |
|---|---|---|---|
| kettlebell | The Discus Weight | common | `discus.png` |
| plate | Bronze Votive Disc | common | `votive_disc.png` |
| jumprope | Hermes' Cord | common | `hermes_cord.png` |
| stopwatch | The Hourglass Relic | common | `klepsydra.png` |
| shaker | The Kylix | common | `kylix.png` |
| straps | Charioteer's Reins | common | `reins.png` |
| abwheel | The Chariot Wheel | common | `chariot_wheel.png` |
| battlerope | Serpent of the Hydra | common | `hydra_serpent.png` |
| towel | The Victor's Cloth | common | `victors_cloth.png` |
| liftingbelt | The Hoplite's Girdle | common | `hoplite_girdle.png` |
| gloves | Caestus, the Boxer's Wrap | common | `caestus.png` |
| ball | The Sphere of Atlas | common | `atlas_sphere.png` |

1. **kettlebell — The Discus Weight**
   > A single ancient Greek bronze discus, like the one thrown by the Discobolus, weathered patina with warm gold highlights, resting at a slight angle, museum relic photography, dramatic warm rim lighting, isolated on a plain dark background, no text, no base, no other objects.

2. **plate — Bronze Votive Disc**
   > A round bronze votive offering disc engraved with a laurel wreath motif, ancient Greek temple offering plaque, weathered patina, warm dramatic lighting, museum relic photography, isolated on a plain dark background, no text, no base.

3. **jumprope — Hermes' Cord**
   > A coiled leather athletic cord with small bronze winged ornaments at each end evoking Hermes' winged sandals, ancient Greek gymnasium relic, warm bronze and leather tones, museum relic photography, dramatic lighting, isolated on a plain dark background, no text.

4. **stopwatch — The Hourglass Relic** (NOT an hourglass shape — Chronos already owns that silhouette; use the historically-real Greek water-clock instead)
   > An ancient Greek bronze klepsydra water-clock, a round vessel with a small dripping spout and handle, weathered patina, museum relic photography, dramatic warm lighting, isolated on a plain dark background, no text, no hourglass shape.

5. **shaker — The Kylix**
   > An ancient Greek kylix drinking cup with two curved handles and a shallow bowl, terracotta and gold detailing, museum relic photography, dramatic warm lighting, isolated on a plain dark background, no text, no liquid.

6. **straps — Charioteer's Reins**
   > A coiled leather chariot-racing rein with bronze buckle fittings, ancient Greek charioteer's tack, warm weathered leather and bronze tones, museum relic photography, dramatic lighting, isolated on a plain dark background, no text.

7. **abwheel — The Chariot Wheel**
   > A small bronze-rimmed wooden spoked chariot wheel, ancient Greek relic, weathered wood and bronze, museum relic photography, dramatic warm lighting, isolated on a plain dark background, no text, standing upright at a slight angle.

8. **battlerope — Serpent of the Hydra**
   > A coiled bronze serpent sculpture with multiple sinuous heads evoking the Hydra, dark bronze patina with warm highlights, museum relic photography, dramatic lighting, isolated on a plain dark background, no text.

9. **towel — The Victor's Cloth**
   > A folded ceremonial victor's cloth with a woven laurel-leaf border, draped ancient Greek textile relic, warm cream and gold tones, museum relic photography, dramatic lighting, isolated on a plain dark background, no text.

10. **liftingbelt — The Hoplite's Girdle**
    > An ancient Greek bronze hoplite war-belt with an ornate buckle, weathered patina, warm dramatic lighting, museum relic photography, isolated on a plain dark background, no text, coiled slightly.

11. **gloves — Caestus, the Boxer's Wrap**
    > An ancient Greek caestus boxing wrap, leather straps wound around a fist-shaped form with small bronze studs, weathered leather and bronze, museum relic photography, dramatic warm lighting, isolated on a plain dark background, no text.

12. **ball — The Sphere of Atlas**
    > A weathered bronze and stone globe orb representing the celestial sphere Atlas bears, aged patina with warm highlights, engraved faint constellation lines, museum relic photography, dramatic lighting, isolated on a plain dark background, no text, no figure holding it.

### Mythic Trials (8 total, 3 already real: Prometheus's Fire, Chronos, Athena's Wisdom)

| key | name | rarity | target file |
|---|---|---|---|
| aura_heart | Thymos, the Fighting Heart | rare | `thymos_heart.png` |
| aura_summit | Olympus Ascending | rare | `olympus_peak.png` |
| aura_focus | The Oracle's Gaze | rare | `omphalos.png` |
| aura_resilience | Antaeus, Son of the Earth | rare | `antaeus_earth.png` |
| aura_mind | Metis, Goddess of Craft | rare | `metis_compass.png` |
| aura_growth | Demeter's Harvest | rare | `demeter_pomegranate.png` |

13. **aura_heart — Thymos, the Fighting Heart**
    > A stylized bronze anatomical heart relic with small wings at the sides, ancient Greek warrior spirit symbol, warm dramatic lighting, museum relic photography, isolated on a plain dark background, no text.

14. **aura_summit — Olympus Ascending**
    > A small bronze relic sculpture of a stepped mountain peak with clouds swirling near its summit, evoking Mount Olympus, weathered patina, dramatic warm lighting, museum relic photography, isolated on a plain dark background, no text.

15. **aura_focus — The Oracle's Gaze** (an omphalos, not a generic eye — the actual sacred stone at Delphi, more distinctive and on-theme)
    > An ancient Greek omphalos sacred stone from Delphi, a carved conical stone draped with a woven net pattern, weathered marble and bronze tones, dramatic warm lighting, museum relic photography, isolated on a plain dark background, no text.

16. **aura_resilience — Antaeus, Son of the Earth**
    > A rough chunk of ancient earth and stone bound with bronze bands, evoking the giant Antaeus's connection to the earth, weathered patina, warm dramatic lighting, museum relic photography, isolated on a plain dark background, no text.

17. **aura_mind — Metis, Goddess of Craft**
    > An ancient Greek bronze craftsman's compass and measuring tool, ornately engraved, evoking the goddess Metis's cunning and craft, weathered patina, dramatic warm lighting, museum relic photography, isolated on a plain dark background, no text.

18. **aura_growth — Demeter's Harvest** (pomegranate, not another cornucopia — `relic_cornucopia`/Horn of Abundance already owns that shape; the pomegranate is also the more specific Demeter/Persephone myth reference)
    > A ripe bronze-cast pomegranate with a small wheat sheaf bundle beside it, evoking Demeter's harvest and the myth of Persephone, warm gold and bronze tones, dramatic lighting, museum relic photography, isolated on a plain dark background, no text.
