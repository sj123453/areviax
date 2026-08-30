# Road Icons — Exact Spec

You mentioned wanting to make the XP/Trophy/Weight Roads feel like Brawl
Stars' path screens, but with a compass instead of a star as the badge.
The code is already wired up for this — drop the 3 files below into the
right folder and they appear automatically, no further changes needed.
Until they exist, the app just keeps showing the current emoji, so there's
no rush and nothing will look broken in the meantime.

## What to make: 3 files

| Road | Filename | Accent color to design around |
|---|---|---|
| XP Road | `xp-compass.png` | Orange — `#FF8C3C` |
| Trophy Road | `trophy-compass.png` | Gold — `#FFD25A` |
| Weight Road | `weight-compass.png` | Iron blue — `#8FD8FF` |

**Where they go:** `mass-app/images/roads/` (the folder already exists,
currently empty).

**Format:** PNG, transparent background, **512×512px**, square canvas
(design the compass to sit roughly centered with a little breathing room
around it — it gets displayed as small as ~20px in some spots, so avoid
fine detail that would disappear at that size).

**Design idea, not a rule:** a compass rose (the 4/8-point star-like navigation
symbol) in place of Brawl Stars' star — you already said you'd work out the
exact look, this is just the technical spec so whatever you make drops in
cleanly. One shared "compass" silhouette recolored 3 ways (matching the
table above) would read as a consistent icon family, the same way Brawl
Stars' single star recolors per rarity.

## Where each one shows up

Once a file exists at its path, it automatically replaces the emoji in:
1. The road's own page header, next to the title (e.g. "🛤️ XP Road" →
   your compass + "XP Road").
2. The matching hub card on the Progress page (same title, smaller).

Nothing else needs to change on my end — the fallback-to-emoji code checks
for the file and swaps over the moment it's there.

## If you want more than 3

Optional, not required — if you want a small amount of extra polish beyond
the 3 title badges above, the same 3 files (or size variants of them) could
also work as:
- A favicon-style tab icon per road page (would need a smaller export,
  e.g. 64×64, but the 512×512 master scales down fine).
- A subtle watermark in the road's hero/scenery area (already has its own
  faint background texture, so this would be a "more" not a "need").

Send the 3 base files first — everything above is optional extra mileage,
not a blocker.
