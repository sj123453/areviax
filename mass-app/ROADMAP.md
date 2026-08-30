# Areviax — What's Built vs. What Needs Real Infrastructure

This app currently has **no server or database** — it's a single HTML file that
runs entirely in your browser and saves everything to `localStorage` on that
one device. That's been fine for everything so far (workouts, nutrition,
roads, trophies, recipes), because none of it needs to talk to anything
outside the phone. The features below are different: they genuinely need
something running on the internet, not just more code in this file. Here's
what each one needs, in plain terms, and what it'll cost.

## 1. Ask Areviax — the AI coach

**What's live now:** a real, working on-device FAQ. It matches your question
against ~16 hand-written answers about how the app works (protein targets,
Caloric Shield, Lift Rank, streaks, etc.) and falls back to emailing support
if it can't match anything. No API key, no cost, works offline.

**What "full AI" needs:** a real conversation, where it can answer anything
(not just pre-written FAQ entries) requires calling a hosted AI model over
the internet — the app can't run one itself.
- **What to buy:** an API key from an AI provider (e.g. Anthropic's Claude
  API, or OpenAI). Pay-as-you-go, billed per message — there's no fixed
  subscription, but a rough working number is $10–30/month at low volume
  (a few hundred users chatting occasionally), scaling up with usage.
- **What I need from you:** the API key once you've created the account.
  I wire it in — no other backend needed for this one, since these APIs
  can technically be called straight from the browser (though for a
  production app we'd want a tiny relay server so the key isn't visible
  in the page source — see the "shared backend" note in §4).

## 2. AI Food Scan — photo → macros

**What's live now:** nothing yet — this is 100% unbuilt.

**What it needs:** a vision-capable AI model (same providers as above
support image input, e.g. Claude or GPT-4o) that takes a food photo and
estimates the meal + macros. This is meaningfully harder to get *good* than
the text coach:
- Estimating portion size from a photo is inherently approximate — expect
  to present it as "AI estimate, adjust if needed" rather than exact.
- Cost per scan is higher than a text message (images cost more in API
  billing) — plan for this being a **premium-only** feature, which you'd
  already flagged wanting.
- **What to buy:** same API account as above, image calls just cost more
  per use. No separate subscription needed.

## 3. Friends, chat, and sharing recipes/workouts/ranks

**What's live now:** a genuine but scoped-down version — you can add a
custom food/recipe and generate a share code (a block of text) that another
user pastes in to import it. That's real and works today, with zero backend.

Separately, Settings already has a working **Backup Your Data** section:
a manual "Download Backup" / "Restore From Backup" (a JSON file, works
anywhere, zero backend), plus an opt-in **Automatic Cloud Backup** that
saves silently in the background — but only while the app is being used
through Claude.ai, since it rides on Claude's own per-account storage,
not a server we run. That covers "don't lose my data" already. It does
**not** cover live sync between two people's phones, or friends/chat —
those still need the real backend below.

**What real friending/chat needs:** actual accounts and a live connection
between two people's phones — this is the one item on this list that
**cannot** be faked client-side. It needs:
- **A real backend** — a server + database that stores accounts, friend
  lists, and messages, and a way for phone B to be notified when phone A
  sends something. Realistic options: Firebase (fastest to stand up,
  works well up to moderate scale, ~$0–25/month to start on its free/low
  tiers), or Supabase (similar, open-source-based). Either is a "rent it,
  don't build it from scratch" choice — building a custom server for this
  would be significantly more work for no real benefit at this stage.
- **User accounts** — sign-up/login, which either backend above provides
  out of the box.
- This is the biggest lift on this list. I'd treat it as its own project:
  wiring the app up to a real backend account (I can do the setup once you
  pick Firebase or Supabase and create the account), then building
  friend-add, chat, and share flows on top of it.

## 4. Payments / subscriptions

**What's live now:** the "Go Premium" page — shows the free vs. premium
feature split and monthly/annual pricing, but tapping "Upgrade" just shows
a "not connected yet" message. No money moves.

**What real billing needs:**
- **On the web:** a payment processor — Stripe is the standard choice.
  You create a Stripe account (free to set up, they take ~1.5–3% + a small
  fee per transaction, no monthly fee), and I wire the app up to it.
- **If this ever becomes an iOS/Android app** (not the case yet — it's a
  browser page today): Apple and Google **require** you to use their own
  in-app purchase system for anything sold inside an app, not Stripe
  directly. That means an Apple Developer account ($99/year) and/or Google
  Play Developer account ($25 one-time), plus a middle layer like
  RevenueCat (free up to modest revenue, then a cut) to manage
  subscriptions across both stores and the web from one place.
- **My honest recommendation:** start with Stripe on the web version only.
  Don't take on the app-store accounts and RevenueCat until you're actually
  ready to ship to app stores — it's real ongoing cost and complexity you
  don't need yet.

## Freemium split — my recommendation

You asked how I'd split free vs. premium. Rough principle: **everything
that's just "more of the app" stays free — anything that costs real money
per use (AI calls) is premium.** That's what's already built into the
Subscription page:

**Free, forever:**
- Full workout logging, auto-generated sessions, all training tools
- Nutrition tracking, Caloric Shield, recipes (including adding/sharing
  your own)
- XP/Trophy/Weight Roads, Compass Drops, Leagues — all the game-y stuff

**Premium (~£6.99/mo or ~£66.99/yr in the current mockup pricing):**
- Full AI Coach (real conversation, not FAQ matching)
- AI Food Scan
- Cross-device **sync** (live, automatic, works everywhere — not just the
  Claude.ai-scoped auto-backup that already exists for free today) — this
  needs the same backend as friends/chat (§3), so it'd make sense to
  bundle it in alongside those features once that backend exists.
- No ads (if ads are ever added to the free tier — not currently the plan)

This keeps the free tier genuinely generous (everything that makes the app
fun and useful day-to-day costs you nothing to run), while premium is
funded by the two features that have a real, ongoing cost per user.

## Suggested order to actually build this

1. **Stripe on web** — lowest effort, unlocks real revenue to fund the rest.
2. **AI Coach with a real API key** — you already have the UI; this is
   mostly just wiring in the key once you have one.
3. **Backend (Firebase/Supabase)** for accounts + sync — this unlocks
   friends/chat and cross-device backup at the same time, since they need
   the same foundation.
4. **AI Food Scan** — build once the AI account from step 2 already exists.
5. **Friends/chat features** on top of the step-3 backend.
6. **App store accounts + RevenueCat** — only once you're ready to ship to
   iOS/Android specifically.

Nothing above needs to happen all at once — steps 1–2 alone would make the
Premium tier real without touching the harder backend work.
