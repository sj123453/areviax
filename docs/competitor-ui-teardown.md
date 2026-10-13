# Competitor UI/UX teardown and improvement plan (13 Oct 2026)

Built from four research passes (lifting, nutrition, engagement/social, premium/coaching) on top of `competitive-analysis.md`.

**Confidence tags:** [V] read on a primary/official page, [B] secondhand (review/blog/forum), [?] not verified.

**Limits, stated plainly:** Firecrawl was rate-limited, and nobody could open the apps. Tab bars, tap counts, onboarding length, palettes, typography and motion are mostly NOT verified. Whoop, Oura, Zwift and most of Strava/Nike/Habitica were thin. Treat pricing as a snapshot, since sources conflict in places. A screenshot-based pass is the next research step once the quota clears.

## 1. What the field does (verified highlights)

| Area | Best-in-class | Takeaway for Mass |
|---|---|---|
| Set logging | Hevy: prefilled last values, set-complete tap, per-exercise rest timer (5s-5min, ±15s, auto-start), plate and warm-up calculators, live PR banner (5 PR types, toggleable) [V]. Strong: "simplest interface", fastest logger [V/B] | Speed is table stakes. Log in one tap with previous values prefilled |
| Targets | MacroFactor: back-calculates expenditure from intake plus weight trend, updates weekly, Bulk/Cut/Maintain with chosen rate and goal ETA [V] | The only app confirmed to take bulking seriously. We should do surplus properly |
| Meal logging | MFP: swipe right to copy yesterday, "•••" copies a meal, calories consumed/remaining at the top [V]. MacroFactor: recipe import from URL or cookbook photo [V] | Repeat-meal speed matters for fixed-routine eaters |
| Gamification | Duolingo: tiered streak animations (+1.7% D7 retention), pre-bought freezes plus paid repair, weekly leagues with opt-in public profile [V]. Strava: Trophy Case, 4 latest badges on profile [V]. Club Peloton: "hide my level" toggle [B] | We have the strongest theme. Copy the structure, not the guilt |
| Premium feel | Named authority/voice, high-fidelity media, one decision per screen, scores over raw logs, no dead "subscribe" buttons [mostly B/synthesis] | Our dark+gold look fits. Keep gold for rewards only |
| Pricing | Hevy $2.99/mo or $74.99 lifetime [V]; Strong ~$30/yr, $99.99 forever [V]; Fitbod $15.99/mo; Centr ~$29.99; Ladder $29.99; MacroFactor $11.99/mo [V]; Juggernaut $35/mo [B] | £17/mo sits mid-premium. Needs a clear free tier or trial and a value story |

## 2. Gaps nobody fills (our wedge)
- Lifting + calories/protein in one app (every lifting app is training-only) [lifting report].
- Surplus-first design. Most nutrition apps read deficit-first. I found no app that frames "calories left to eat" as the target to hit [?].
- Recipes matched to today's remaining protein.
- Offline-first PWA with no store-subscription friction.
- Mythology rank system driven by training and nutrition together.

## 3. What to avoid (verified)
- Guilt copy and shame notifications (Duolingo criticism [B]).
- Ratchet streaks with no rest or illness path (Apple, Peloton [V/B]).
- Punitive stat/gear loss on a missed day (Habitica [V]).
- Randomised crates sold through layered currency or limited-time banners. FTC v. Cognosphere, Jan 2025 ($20M) [V]; Apple App Review 3.1.1 requires odds disclosure [V].
- Card-up-front trials that draw refund complaints (Freeletics, Cal AI billing issues [V/B]).
- Showing a second offer after a declined paywall (cited in Apple's removal of Cal AI [B]).

## 4. Improvement plan for Mass (ordered)

### A. Fix the daily loop (highest impact)
1. **Fuel home = "left to eat".** Log button first, then calories/protein remaining as a target to hit, then the diagnostic chart (M10).
2. **Repeat meals in one gesture:** swipe to copy yesterday, copy-meal, favourites, quick-add (MFP pattern).
3. **Day-close prompt:** "Did you eat more than you logged?" so partial logging doesn't wreck the numbers.
4. **Weekly auto-adjust:** weight trend with a gain-rate band; if the trend stalls for ~2 weeks, suggest +150–250 kcal (MacroFactor pattern, simplified).
5. **Log set in one tap:** prefilled last values, per-exercise rest timer with ±15s and a "next" preview, plate calculator, a live PR banner that feeds rank XP.

### B. Make the streak fair and delightful
6. Keep freezes. Add a **free repair route** and a **rest/illness day** (no punishment).
7. **Weekly streak** option alongside daily.
8. Tiered **streak-extend animation**, bigger at 7/30/100.
9. Rotate notification copy, with mute per category and no guilt tone.

### C. Make the best assets postable (M8)
10. Share cards: Ascension card (rank + streak), trophy placard with an odds footer, weekly "Olympiad" result, year-in-review "Labours" recap.
11. Trophy Cabinet shows the 4 latest on the profile; add a "hide my level" toggle.

### D. Premium feel
12. Home: one primary "today" action; echo name, goal and equipment after onboarding.
13. Exercise guide cards: add a preview (duration, equipment) before the steps; a short written cue and regression/progression per step; swap-exercise and injury flag.
14. Gold only for rewards and progress, never for body text. One consistent motion language.

### E. Trust and money
15. **Crates stay earn-only**, with published odds before opening. No paid drachma packs for minors. Document the age-gating.
16. **Pricing:** keep a permanent free logging tier (Hevy/Strong approach). Charge for programs, recipes and rank features. Annual at ~50% off monthly. No card for the trial. Show a sample Trophy Road level before the paywall. Make cancel obvious.
17. First-win onboarding: end on a guaranteed small reward and a Bulk goal with a chosen rate and an ETA.

### F. Later
18. Oath partner, then crews. Opt-in public leaderboard with weekly reset. Cross-app Compass with OS.

## 5. What would change my mind
Real user testing of Fuel and the exercise guide. A screenshot teardown of Hevy, Fitbod, MacroFactor, MFP and Centr. Retention data from the first 100 users.

## 6. Sources
See the four reports' source lists in the research session. Key pages: hevyapp.com/features, macrofactor.com/macrofactor, support.myfitnesspal.com (Today tab), duolingo.com/help, support.strava.com (Trophy Case), ftc.gov (Cognosphere), developer.apple.com App Review Guidelines.
