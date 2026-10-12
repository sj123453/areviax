# Areviax — UI/UX audit (Mass + OS)

*Run 12 Oct 2026 against the live build: every Mass page (22) and every OS page (14) was loaded at phone size (390×844) as a brand-new user, plus the Mass onboarding. Findings are from the screenshots, DOM checks (tap-target sizes, overflow, alt text, console errors) and the code. Competitor comparisons come from `competitive-analysis.md`.*

## 0. Headline

Both apps already have something almost no competitor has: a **strong, consistent identity** (marble/ember palette, Cinzel + Outfit type, meander borders, mythological copy) and, in Mass, a **reward layer that feels like a game, not a tracker**. The audit's job is therefore not "make it prettier" — it is to remove the friction that stops a new user reaching the first reward, and to add the few things the category now treats as table stakes.

Console health: **0 page errors** across all 36 pages. No horizontal overflow on any page. Zero images missing alt text.

## 1. What is working (protect these)

| Area | Why it works |
|---|---|
| Identity | Pages read as one world. "The Larder — Recipes to grow", "The Almanac — Plan the week" give every screen a point of view competitors lack. |
| Onboarding (Mass) | 7 short steps with rulers for weight/height/age, a progress strip, and "we'll calculate exact targets" — feels like a blueprint, not a form. |
| Transparency | The in-app Roadmap page lists what shipped vs in progress. Rare, and builds trust. |
| Reward loop | Crates → "?" silhouette → light burst, Trophy Road with milestone medals, prestige awards, typed keys. Production quality of the reveal is already above Brawl-Stars-clone level for a fitness app. |
| Forgiveness | Streak freezes and savers earned in-app (not bought). |
| Recipes | 146 recipes with photos, swaps and flavour tips — a real asset none of the nutrition trackers have. |
| OS "Science" page | Explains *why* each mechanic works (completion bias, Locke & Latham). Credibility builder. |

## 2. Findings — Mass

Severity: **P0** hurts activation/trust now · **P1** hurts retention · **P2** polish.

| # | Finding | Evidence | Sev | Fix |
|---|---|---|---|---|
| M1 | **Zeros everywhere for a new user.** The top bar shows three pills (streak 0, drachma 0, Arete 0) and most pages open on empty cards ("0 items", "—"). First impression is "nothing here". | Dashboard, Fuel, Progress, Recover screenshots | P0 | Give every empty state a *single* next action with a reward attached ("Log your first meal → +25 Arete + Bronze Crate"). Show a 3-step "First Day" checklist on Home that fills the top-bar pills. |
| M2 | **No first-win in the first 60 seconds.** After onboarding the user lands on a Home screen that asks them to *open a gift* or *start a session*; neither is the guaranteed dopamine hit. | Dashboard | P0 | End onboarding with an auto-granted crate opening (the existing Brawl-Box sequence) so the best moment of the app is the *first* thing they feel. |
| M3 | **Hero headers eat ~25–30% of every screen.** Each page opens with a tall photo header + title + meander, pushing real content below the fold on a 844px phone. | Recipes, Fuel, Progress, Recover, Reflect | P1 | Collapse to a compact sticky title after first scroll; keep the full hero only on Home and Trophy pages. |
| M4 | **Small tap targets.** 45 interactive elements under 36px on Fuel alone (water drops, macro chips, swipe cards); 25 on Forge. Below Apple's 44pt guidance. | DOM check | P1 | Raise hit-areas with padding/`::before` expanders without changing the visual size. |
| M5 | **Pricing is hard to read at a glance.** Premium £17 appears under three different framings (Monthly / "+Book £10 first month" / Annual −20%) before the benefits list. A competitor audit shows pricing clarity is now a trust wedge (Cal AI was pulled from the App Store over billing design). | Subscription page | P0 | One screen: *Free / Lifter / Premium*, annual preselected with the monthly price shown, a plain "cancel anytime in one tap", and the founder rate called out. See roadmap §Pricing. |
| M6 | **Leaderboard shows illustrative rows.** It labels them as illustrative, but a board of named people ("Rowan Prescott 281 pts") that aren't real is a trust risk the first time someone notices. | Leaderboard | P0 | Replace with "Be among the first — leagues open at 100 founders" plus a *real* personal-best ladder until real data exists. Never show fabricated people. |
| M7 | **Social layer is missing.** Hevy and Strava make friends/feed the retention engine; Mass has leagues (UI only) and no friends, kudos, crews or sharing. | Leagues, Leaderboard | P1 | Oath partner → crews → kudos ("Offerings"). Needs a backend; see roadmap. |
| M8 | **Nothing leaves the app.** There is no share card, public profile, or referral link — the most beautiful assets (statues, Trophy Road, crate reveal) can't be posted. | — | P1 | "Statue Unveil" 9:16 card, transformation card, `@name` public page, referral crates. |
| M9 | **Learn page is a 16,000-character wall.** Great content, but a single scroll with no chaptering/search/"read next". | Learn | P2 | Chapter cards with read-time, a daily "one idea" push into Home. |
| M10 | **Fuel tab front-loads a chart ("700 kcal gap") before logging.** The first thing on Fuel should be the log button, not the diagnostic. | Fuel | P1 | Log / Scan / Recipes at top (already there) — move the TDEE explainer behind an "Why?" link. |
| M11 | **No wearable/HealthKit sync, no widgets, background push is limited.** A PWA cannot do these; competitors (Hevy, Strong, Fitbod, Gravl, Alpha Progression) all do. | — | P1 | Wrap with Capacitor for iOS/Android once the web core is stable. |
| M12 | **Two entry points to the same road.** Rank (3D islands), Trophy Road and the legacy Arete Road all exist; copy and names vary ("Arete Road", "Road to Olympus", "Trophy Road"). | Nav, hubs | P2 | One name per surface: *Trophy Road* (checkpoints) and *The Climb* (3D ranks). |
| M13 | **Buttons restyled three times in a week.** Visual language is now flat gold — good — but secondary actions still vary between pages (some pill, some rectangle). | Settings, Subscription | P2 | Audit remaining ad-hoc button classes against the shared set. |

## 3. Findings — OS

| # | Finding | Evidence | Sev | Fix |
|---|---|---|---|---|
| O1 | **Notifications only fire while a tab is open.** The Reminders page says so honestly ("not true background push… needs a server"), then shows a *Blocked* state with no way forward. For a reminders-led product this is the biggest functional gap. | Reminders | P0 | Real Web Push (needs a tiny backend + VAPID keys; works for installed PWAs on iOS 16.4+) or a native wrapper. Until then, an in-app "Add to Home Screen" coach and a calendar `.ics` export of reminders. |
| O2 | **Scheduling is a form, not "one tap".** Adding an event needs Day, Time, Repeat, Colour and Link dropdowns before saving. The marketing promise is "one tap to add". | Schedule | P1 | Tap an empty grid slot → inline title field → Enter. Natural-language capture ("Study maths Tue 4pm weekly"). |
| O3 | **The compass ring is the hero but starts empty and grey.** Dashboard shows a big dark ring with zeros; the unique idea is invisible until the user has data. | Dashboard | P1 | Pre-fill with a sample day on first load ("Here's what a full day looks like — make it yours") and animate the rings closing. |
| O4 | **Feature breadth outruns focus.** Canvas, Roulette, Science, Done List, Journal, Mindfulness, Tracking, Study… 14 pages in a "5-tab" shell. Notion's "graveyard" risk (competitive report §5). | Nav | P1 | Ship the ring + schedule + habits as the core; make the rest optional modules enabled in onboarding by goal. |
| O5 | **Same tall hero header problem as Mass** (title + photo + subtitle on every page). | All | P1 | Compact headers. |
| O6 | **Canvas opens to an empty dark grid with 8 tool buttons.** No template, no example. | Canvas | P2 | Start with a template ("Exam plan", "Weekly reset"). |
| O7 | **Not student-specific yet.** No timetable import, exam countdown, deadline planner or focus rooms — the things students actually pay for. | Study | P1 | Semester wizard + exam countdown widget (roadmap Phase 3). |
| O8 | **Price risk.** £16/mo sits at Sunsama/Motion level but the audience (16–30, students) expects $0–10 or one-off. | Waitlist | P0 | Student tier, annual-first, bundle with Mass. |

## 4. Cross-cutting gaps vs the category

| Gap | Seen at | Priority |
|---|---|---|
| Real accounts + cloud sync (everything is on-device; clearing the browser loses progress) | all competitors | **P0 for launch** |
| Backup is manual (export/restore exists) | — | P1 |
| Native push, widgets, HealthKit/Health Connect | Hevy, Strong, Gravl, Fitbod | P1 |
| Friends / feed / kudos | Hevy, Strava | P1 |
| Shareable artifacts | Hevy, Strava, Spotify Wrapped pattern | P1 |
| Adaptive calorie target (MacroFactor-style) | MacroFactor, Carbon | P1 |
| Photo / voice food logging | MacroFactor, MyFitnessPal+Cal AI | P1 |
| Auto-progression (RIR-based) | Alpha Progression, RP, Fitbod, Gravl | P1 |
| Analytics (we cannot measure D1/D7/D30 today) | — | **P0** |

## 5. Quick wins (≤ 1 day each)

1. Replace leaderboard fake rows with an honest empty state (M6).
2. Grant a free crate at the end of onboarding and open it immediately (M2).
3. Compact page headers after first scroll (M3).
4. Expand tap targets with padding (M4).
5. Pricing screen: one view, annual preselected, one-line cancel promise (M5).
6. OS: pre-filled demo ring + inline "add event" (O2, O3).
7. Add privacy-respecting analytics events for: onboarding step completions, first log, first crate, D1/D7 return.
8. One name per road surface (M12).

## 6. Accessibility notes

- Contrast: gold-on-near-black passes AA for body text; the muted `#b9ab94` caption colour on `#0a0605` is ~8:1 (fine) but small `Outfit 300` captions below 12px should go to weight 400.
- `prefers-reduced-motion` is respected on the crate reveal, waitlist pages and road; keep it as a rule for new effects.
- Screen readers: the crate reveal and trophy slots are visual-only — add `aria-live` announcements ("You unlocked Hera, Epic").
- Colour-only signalling: rarity is colour-coded; add a text label next to every colour chip (already present on trophies — keep).
