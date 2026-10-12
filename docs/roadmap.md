# Areviax — roadmap (Q4 2026 → 2027)

*Companion to `ux-audit.md` and `competitive-analysis.md`. Priorities weigh: (1) trust/activation, (2) the hardgainer wedge, (3) growth loops, (4) retention depth, (5) platform. Effort: **S** ≤ 3 days · **M** ≈ 1–3 weeks · **L** ≥ 1 month. Dates are targets, not promises.*

## Principles
1. **First win in 60 seconds.** Everything before the first reward is friction.
2. **Own one lane.** *"The app for people who can't eat enough"* + the only fitness app with a world you want to live in.
3. **Earn-only randomness, honest odds, easy cancel.** Trust is a feature.
4. **Social last, but soon.** Retention and growth live there; it needs a backend first.
5. **Measure before we scale.** No analytics today → we are blind on D1/D7/D30.

## Phase 0 — Foundations (now → 2 weeks) · "Don't lose people, don't lose data"
| Item | Why | Effort |
|---|---|---|
| Privacy-respecting **analytics** (onboarding steps, first workout/meal/crate, D1/D7/D30) | We can't improve what we can't see | S |
| **Free crate at end of onboarding**, opened immediately | First-win moment | S |
| Honest **empty states** with one action + reward; "First Day" 3-step checklist | Fix "zeros everywhere" | S |
| Replace **fake leaderboard rows** with honest "leagues open at 100 founders" | Trust | S |
| **Pricing screen v2**: Free / Lifter / Premium, annual preselected, price visible, one-line cancel | Billing-trust wedge; £17 anchor problem | S–M |
| **Compact sticky page headers**; tap-target padding sweep | Screen real estate, accessibility | S |
| Naming cleanup (Trophy Road vs The Climb) | Clarity | S |
| Waitlist: wire a **real endpoint** (`ENDPOINT` in `waitlist-assets/wl.js`) + **community stats JSON** for Prestige-award % | Collect leads; unlock the "% of members with this award" feature | S |
| **Accounts + cloud sync** design spike (Supabase/Firebase) | Everything on-device today; clearing the browser loses progress | M (spike) |

## Phase 1 — The hardgainer wedge (weeks 2–8) · "Be unmistakably the app for people who can't eat enough"
| Item | Notes | Effort |
|---|---|---|
| **Not-hungry mode** | One tap: today's plan reshuffles to liquid / dense / cold options | M |
| **Calorie-density + cost sort** on recipes ("kcal per 100 g", "£ per 1,000 kcal") | Pure data on the 146 recipes — cheapest unique feature | S |
| **One-tap recipe logging** with portion slider | Avoids photo-AI accuracy risk | S |
| **Liquid-calorie shake builder** (1,000 kcal target) | Highly shareable | M |
| **Surplus autopilot** (adaptive target for +0.25–0.5% bw/week) + **stall breaker** ("add these 3 things") | Credibility feature that justifies price | M |
| **Eat-score streak** (hit the eating floor, not just training) | Rewards the real failure mode | S |
| **UK grocery list** from selected recipes, grouped by aisle | Practicality | M |
| Meal-prep batch mode; restaurant "bulk it" mode | Later in phase | M |
| **Photo / voice "Describe" logging** (match market) | Table stakes; AI cost to model | M–L |
| Safety rails: GP prompt on unexplained loss, under-18 handling, rest-day nudges | Ethics + trust | S |

## Phase 2 — Growth loops (weeks 6–12) · "Make the best assets postable"
| Item | Notes | Effort |
|---|---|---|
| **Statue Unveil card** (9:16, rarity frame, rank, name) at every new trophy | Biggest free-marketing win | S |
| **Transformation card** (before/after + rank + lifts) | Core user story | S |
| **Odyssey recap** at 100 days and each December (Wrapped-style) | 500M-share precedent | M |
| **Referral crates** (two-sided: friend gets a key, referrer a statue) | Dropbox model; gift-only, non-cash | M |
| **Public profile page** `@name` (opt-in) | SEO + Reddit/Discord signatures | M |
| **Oracle notifications** (voice, 1/day cap, mute) | Duolingo-style brand voice without shaming | S |
| **Return of the Prodigal** win-back event | Record-retention precedent | S |
| **Rest tokens + illness mode** | Forgiveness; health safety | S |
| **Published odds + pity timer** on crates | Trust + hygiene | S |

## Phase 3 — Social & depth (Q1 2027) · needs the backend from Phase 0
| Item | Effort |
|---|---|
| **Oath partner** (shared streak, pair-only) → **Pantheon crews (4–8)** with weekly crate | M → L |
| **Kudos as "Offerings"** (one-tap, capped) | S |
| **Weekly leagues** (30-person, Bronze→Diamond, protected rest week) | M |
| **Rank-matched brackets** by bodyweight class | M |
| **Auto-progression (double progression + RIR check-in)** with "why this weight" explainer | L |
| **Strength-standards component in rank** (relative bench/squat/deadlift) | M |
| **Per-muscle volume heatmap** ("body of the hero") | M |
| **Hevy/Strong CSV import** | S–M |
| Seasonal Trophy Road + **Olympic Games** event (limited statues, rerun later) | M |

## Phase 4 — Platform (Q1–Q2 2027)
| Item | Why | Effort |
|---|---|---|
| **Capacitor (iOS/Android) wrapper** | Real push, widgets, HealthKit/Health Connect, Apple Watch logging, store presence | L |
| Web Push for installed PWAs (interim) | iOS 16.4+ supports it; needs tiny backend + VAPID | M |
| Accessibility pass (aria-live reveals, text-label rarity, contrast of small captions) | WCAG | S–M |
| Stores: age-rating answers for randomised rewards; odds page | Compliance | S |

## Areviax OS track
| Phase | Item | Effort |
|---|---|---|
| 0 | Pre-filled **demo compass ring**; **inline add-event** (tap slot → type → Enter) | S |
| 0 | Fix **dead-end Blocked notifications** state with a guided "Add to Home Screen" + `.ics` export | S |
| 1 | Make ring + schedule + habits the core; other modules **opt-in by goal** at onboarding | M |
| 1 | **Student tier** (£4–6, .ac.uk verification) + **bundle with Mass** | S |
| 2 | **Semester wizard** (modules, exam dates → countdown ring + study-block schedule); timetable import (photo/ICS) | M–L |
| 2 | **Daily shutdown ritual** ("Nyx" evening screen) + capacity-cap warning | M |
| 2 | **Habit score** (weighted) instead of binary streak; "storm" pause for exam/sick weeks | M |
| 3 | **Focus rooms** (anonymous Agora presence, no video) + Pomodoro feeding the study ring | M–L |
| 3 | **Cross-app Compass**: Mass training load lightens OS plan; rest day in Mass = streak-safe in OS; shards ↔ crates | M |
| 3 | Lightweight **spaced-repetition** (daily 5 recall cards), Anki/CSV import | M |

## Content & assets
- **Recipe photos:** 88 recipes still lack photos (see list in repo history/PR notes). Generation quota ran out mid-run; resume when quota resets.
- **Trophy turntable frames** for the 14 replaced bronze statues (currently static stills).
- **Waitlist screenshots** refresh each release (script in this session's notes; re-run `shoot.js`-style capture).

## Metrics to track from day one
| Funnel | Metric | Target (initial) |
|---|---|---|
| Activation | % completing onboarding; % with first log within 48 h | 70% / 50% |
| Retention | D1 / D7 / D30 | 45% / 25% / 12% (benchmarks: Finch 54/37 [V weak], Duolingo 51/35 for context) |
| Monetisation | Free→paid conversion; annual share; refund/cancel rate | 3–5%; >50% annual; track |
| Growth | Share-card posts per 100 new trophies; invite conversion; K-factor | >5; >15%; >0.2 |
| Health/harm | Streak-break churn; notification mute rate; wellbeing pulse | Don't worsen release over release |

## Risks & mitigations
| Risk | Mitigation |
|---|---|
| **Price vs perceived value** (£17 ≈ 5× Hevy) | Ladder (Free/Lifter/Premium), student tier, annual-first, hardgainer-specific value; run price tests |
| **Feature creep** (esp. OS: 14 pages) | Core-first; modules opt-in |
| **Backend dependency** for social/leaderboards/push | Phase 0 spike; start with Supabase |
| **Loot-box regulation** | Earn-only, odds published, no purchasable randomness, no cash trading |
| **Health harm** (streak pressure, eating behaviours, minors) | Rest tokens, weekly streaks, safety prompts, age handling |
| **PWA limits** (push, widgets, HealthKit) | Capacitor wrapper in Phase 4 |
| **Mythology theme fit unproven** | User interviews + waitlist A/B copy |
| **Solo-builder bandwidth** | Ruthlessly sequence; ship S-items weekly |

## Suggested next 10 working days
1. Analytics events + first-crate-after-onboarding.
2. Empty states + First Day checklist.
3. Pricing screen v2 + remove fake leaderboard rows.
4. Compact headers + tap targets.
5. Calorie-density/cost sort + one-tap recipe logging.
6. Statue Unveil card.
7. Wire waitlist endpoint; start collecting emails.
8. Not-hungry mode prototype.
9. User interviews (10 hardgainers, 5 students).
10. Backend spike (accounts + sync).
