# Areviax — competitive analysis & selling-point thinking

*Compiled 12 Oct 2026 from four parallel research passes (lifting apps, nutrition apps, gamification/retention, productivity/habit apps) plus our own UI audit (`ux-audit.md`).*

> **Confidence note.** Search tooling was rate-limited and returned many competitor-written blogs. Facts below are tagged **[V]** verified from a cited source, **[B]** background knowledge (not re-verified for 2026), **[?]** conflicting/unverified. Prices move constantly: re-check on the live store listing before using any number externally. Nothing here is legal advice.

---

## 1. The market in one page

| Segment | Who's winning | What they won on | Where they're weak |
|---|---|---|---|
| **Lifting loggers** | Hevy (free + Pro ~$24–75), Strong, JEFIT | Speed, price, **social feed + shareable workout cards** | No nutrition, no coaching depth, no reward layer |
| **AI / programmed lifting** | Fitbod, Gravl, Alpha Progression, RP Hypertrophy, Boostcamp | Auto-progression (RIR/soreness), expert programs | Dry, expensive ($60–180/yr), no food, no game |
| **Human coaching** | Future, Ladder, Caliber | Accountability from a person | $150–200+/month |
| **Nutrition trackers** | MacroFactor (adaptive TDEE, $72/yr), MyFitnessPal (+ Cal AI), Cronometer | Logging speed (photo/voice/barcode), data honesty | Weight-loss framing; **nobody serves low appetite / hardgainers**; billing-trust scandals (Cal AI pulled from App Store Apr 2026 [V]) |
| **Habit/productivity** | Notion, Todoist/TickTick, Sunsama, Motion, Finch, Habitica | Flexibility, rituals, emotional attachment | Abandonment ("productivity-app graveyard"), price creep, shallow student support |
| **Engagement benchmark** | Duolingo (58.7M DAU, 84% record retention, Streak Revival 2026 [V]), Strava (14B kudos in 2025 [V]), Spotify Wrapped (500M shares [V]) | Streaks + forgiveness, social proof, shareable recaps | — |

### The structural facts that matter most for us
1. **AI food logging is now table stakes** (MacroFactor photo/voice, MFP owns Cal AI [V]). We cannot differentiate on "logs fast".
2. **Subscription trust is a live wedge.** Hidden pricing and hard-to-cancel flows got Cal AI pulled [V]. "One-tap cancel, price shown first" is a feature.
3. **Social is where retention and growth live** (Hevy's feed, Strava kudos/clubs, Duolingo friend streaks/leagues). We currently have none of it.
4. **Nobody combines serious progression + game + food.** Strength tools are not fun; fun apps are not strength tools.
5. **Price is our biggest commercial risk.** £17/mo ≈ 5× Hevy Pro, ≈ 3–4× MacroFactor/MFP annual. OS at £16/mo sits at Sunsama/Motion level but sells to students.

---

## 2. Feature matrix (Mass vs the field)

Y = yes · P = partial · N = no · ? = unverified. "Confirm" = verify in our build.

| Capability | Mass | Hevy | Fitbod / Gravl | Alpha Prog. / RP | Boostcamp | MacroFactor | MFP + Cal AI | Strava | Apple Rings |
|---|---|---|---|---|---|---|---|---|---|
| Workout builder + logger | **Y** | Y | Y | Y | Y | N | N | N | N |
| Macro/calorie log | **Y** | N | N / P | N | N | Y | Y | N | N |
| Recipes with photos | **Y (146)** | N | N | N | N | N (import) | N | N | N |
| Photo / voice food logging | **Confirm** | N | N | N | N | **Y** | **Y** | N | N |
| Adaptive calorie target | **N** | N | N | N | N | **Y** | N | N | N |
| Auto-progression (RIR) | **Confirm** | P | **Y** | **Y** | P | N | N | N | N |
| Streaks + freezes | **Y** | P | ? | N | ? | N | P | P | Y |
| Loot crates / keys | **Y** | N | N | N | N | N | N | N | N |
| Collectible trophies / ranks | **Y (65+, 10 ranks)** | P (PR badges) | N | N | N | N | N | P | Y (awards) |
| Friends / feed / kudos | **N** | **Y** | N | N | P | N | P | **Y** | P |
| Shareable cards | **N** | **Y** | N | N | N | N | N | **Y** | P |
| Wearable / Health sync | **N (PWA)** | logging | **Y** | **Y** | N | Watch | Y | **Y** | **Y** |
| Cheap / lifetime tier | **N** | **Y** | N | N | P | N | free (weak) | free | free |
| Human coach | N | N | N | N | N | N | N | N | N |

**Our moat:** ranks + crates + trophy statues + photographed recipes + macros + lifting in one place, with a mythology identity. **Our gaps:** social graph, share artifacts, adaptive/AI logging, wearables, price ladder, auto-progression credibility.

---

## 3. Positioning gaps nobody serves

1. **"The app for people who can't eat enough."** No mainstream nutrition app addresses low appetite / hardgainers. The advice lives in Reddit threads (eat on a schedule, liquid calories) [V]. *This is the single clearest open lane and plays to our 146-recipe library.*
2. **Serious progression wrapped in a game.** Strength apps are dry; gamified apps aren't strength tools.
3. **Lifting + food in one app at a sane price** (Gravl bundles macros web-only; MFP users run a second app).
4. **Gym-intimidated teens/early-20s.** Coaching is $150–200/mo; RP/Alpha assume lifting literacy.
5. **Collectibles with identity.** Hevy's social proof is *data*; nobody gives lifters something to display and collect.
6. **A life-wide ring** (training + study + habits). Apple Rings cover movement only; planners have no rings (OS).
7. **Forgiving streaks on a serious calendar.** Finch is gentle but light; Sunsama is serious but ungamified; Habitica's novelty fades in ~6 months [V].
8. **Student-specific planning** (timetable import, exam countdowns, deadline back-planning, focus rooms).
9. **Cross-app readiness logic** (training load → study load) — impossible for single-purpose competitors.

---

## 4. "How do we make people REALLY want this?" — the selling-point framework

People don't recommend a *feature*; they recommend an **identity, a proof, a story, a tribe, or a deal that feels unfair in their favour**. Mapped to Areviax:

| Lever | What it means here | The concrete product move |
|---|---|---|
| **Identity ("I'm a Titan")** | Rank + statues are already identity tokens | Public profile page `areviax.com/@name`; rank-matched brackets; set titles ("United at Last") shown next to your name |
| **Proof (transformation)** | Skinny→mass is the target user's whole story | Before/after + rank + lifts **Transformation Card**; 12-week "Odyssey" recap (Wrapped-style, 500M-share precedent [V]) |
| **A shareable object** | Statues and the crate reveal are our most beautiful assets and can't be posted | 9:16 **Statue Unveil** card at every new trophy; 6-second PR clip with crate opening and referral code |
| **Tribe** | Kudos + clubs drive Strava (14B kudos; clubs ×4 [V]) | Oath partner → Pantheon crews (4–8) → city-states; kudos as "Offerings" |
| **Story** | Theme is currently cosmetic | Twelve Labours as a serialized campaign; seasonal "Olympic Games" with limited statues |
| **An unfair advantage** | Hardgainers fail by under-eating | **Not-hungry mode**, liquid-calorie builder, calorie-density sort, "1,000 kcal for £2" cost filter |
| **Trust** | Billing scandals are live | Price shown before sign-up, one-tap cancel, published crate odds + pity, no purchasable randomness |
| **A deal** | Hevy $3/mo, Strong lifetime | Free + Lifter + Premium ladder; student tier; founder lifetime-rate lock (already on the waitlist page) |
| **Scarcity & ritual** | Limited-time peaks (Pokémon GO Community Day [B]) | Seasonal roads, weekly Pantheon trial, daily Oracle ritual |

### The 12 niche ideas I'd bet on (ranked by leverage ÷ effort)

1. **Not-hungry mode** — flag low appetite → plan reshuffles to liquid/dense/cold options. *Unserved; tailor-made for our recipe asset.*
2. **Surplus autopilot** — adaptive target tuned to +0.25–0.5% bodyweight/week; "stalled → here are 3 specific add-ons from your recipes".
3. **Statue Unveil + Transformation cards** — free marketing in every user's story.
4. **Eat-score streak** — a streak for hitting the *eating* floor, not just training (rewards the behaviour hardgainers actually fail at).
5. **One-tap recipe logging + UK grocery list + cost per 1,000 kcal** — recipes are our database; no photo AI needed, no accuracy complaints.
6. **Oath partner (pairs) before crews** — Habitica's party effect with a fraction of the complexity.
7. **Return of the Prodigal** — Duolingo-style win-back (15.4M participants, record retention [V]); do 3 workouts to restore a longest streak.
8. **Rest tokens + illness mode** — earned, not bought; protects health-adjacent users; makes forgiveness a feature.
9. **Published odds + pity timer** — trust signal and regulatory hygiene.
10. **Odyssey recap (December + 100-day)** — annual shareable artifact.
11. **Cross-app Compass (Mass ↔ OS)** — training load lightens study plan; rest day in Mass = streak-safe day in OS.
12. **Student tier + timetable/semester wizard (OS)** — the thing students actually pay for.

---

## 5. Competitor profiles (condensed)

### Lifting
| App | Price (verify) | Signature | Love | Complain | Note |
|---|---|---|---|---|---|
| Hevy | Free; Pro ~$2.99/mo, ~$24/yr, ~$75 lifetime | Social feed, shareable cards, routine library | Price, social, clean | Free caps, smaller library | The feed *is* the product |
| Strong | Free limited; lifetime ~$100 | Fast minimal logger | Speed | No coaching/social, dated | Wins by word of mouth |
| Fitbod | ~$96/yr, no free | Auto workouts from recovery | "Tell me what to do" | Billing/refunds, generic | Algorithm must feel smart |
| Gravl | ~$15/mo (annual $60–90 conflicting) | Adaptive AI plans, macros web bundle | Polish, ratings | Paywall after 3 workouts | Creator marketing |
| Alpha Progression | $13/mo, $80/yr | RIR hypertrophy auto-progression | Precision | Set creation clunky | Credibility-led |
| RP Hypertrophy | Premium, region-priced | Mesocycle auto-regulation | Science brand | Cost, rigid | YouTube funnel |
| Boostcamp | Free large; Pro $60/yr | Named expert programs, volume heatmap | Free depth | Logging less slick | Creator distribution |
| Future / Ladder / Caliber | $150–200+/mo (Ladder ~$180/yr) | Human coach / team | Accountability | Price | Human = retention |
| Strava / Apple / Whoop / Peloton | Free–$200/yr | Kudos & clubs / rings / recovery / leaderboards | Social + identity | Not lifting tools | Benchmarks for loops |

### Nutrition
| App | Price | Signature | Complaint |
|---|---|---|---|
| MacroFactor | $72/yr, no free | Adaptive TDEE, photo/voice/Describe, Plate Stack AI (Jul 2026 [V]) | Paid-only; needs consistent logging |
| MyFitnessPal | Free (weak); Premium $80/yr | Biggest DB; barcode now paywalled [V]; owns Cal AI | Paywalls, ads, messy entries |
| Cal AI | Hidden until after quiz | Photo-first | Billing trust, accuracy on mixed dishes |
| Cronometer | ~$60/yr | Verified micronutrients, supplements | Cluttered, slow |
| Lose It / Yazio / Lifesum / Noom | $50–200/yr | Meal plans, fasting, coaching | Weight-loss framing |
| Eat This Much / Carbon / Mealime | $3–12/mo | Auto-plans, grocery lists / adaptive coaching | Generic recipes, not surplus |

### Productivity / habits
| App | Price | Signature | Complaint |
|---|---|---|---|
| Notion (+Calendar) | Free–$20 | Databases, templates | Setup rabbit hole |
| Todoist / TickTick / Things 3 | $4 / $3 / one-off | Capture, habits+calendar, calm | Rigid / clutter / Apple-only |
| Sunsama / Motion / Reclaim / Akiflow | $8–34/mo | Daily ritual / AI scheduling | Price, AI reshuffles my life |
| Finch / Habitica / Forest / Streaks | $0–10 | Care pet / RPG party / tree / one-off | Shallow stats / fades at ~6 mo |
| Apple Rings / Gentler Streak | Free / sub | Rings, adaptive "gentle" goals | Rigid goals / lost streaks |

---

## 6. Ethics & regulation guardrails (read before building the loot/social features)

- **Earn-only randomness.** Regulation targets randomised items obtained *for money* (Apple 3.1.1 odds disclosure; Google Play; ASA/UK scrutiny; EU Digital Fairness Act in progress — status to confirm). Our crates are earned, which is a much lower-risk profile. **Never sell crates/keys/drachma or odds boosts; never allow cash trading; gifting only.** Re-run a legal review if that ever changes.
- **Publish odds + pity** in-app and on the site.
- **Forgiveness by default** (freezes, rest tokens, illness mode, revival path). Duolingo's own research notes that broken streaks reduce later use [V, weak].
- **Health safety.** This is a health-adjacent product aimed partly at 16–35s: cap daily-volume rewards, prompt rest days after long streaks, weekly-streak alternative, "see a GP" prompt if weight falls while eating more, careful framing around muscle dysmorphia/compulsive eating, under-18 handling.
- **Subscription rules.** UK DMCC Act and US click-to-cancel: cancellation as easy as sign-up; price visible pre-signup.
- **No shaming notifications; one per day max; easy mute.**
- **Instrument harm**, not only retention: streak-break churn, notification mute rate, wellbeing survey.

## 7. Where the research is thin (do next)
- Pull real App Store / Trustpilot / Reddit review text for Hevy, MacroFactor, Gravl, Alpha Progression, Finch, Sunsama to turn [B] themes into quotes.
- Verify live prices (Hevy, Gravl, Fitbod, Future, Cronometer, Lose It, Yazio).
- Not researched: Setgraph, Stronger by Science programs, NTC/Gymshark 2026 status, Fitbit/Garmin coaching, Hevy 2026 roadmap, Opal, Headspace, Pokémon Sleep.
- Interview 10 target users (16–25 hardgainers; first-year students) — nothing here replaces that.
