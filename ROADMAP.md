# Areviax Roadmap

The public, short version of this lives on the waitlist pages
(`waitlist.html#roadmap`, `waitlist-os.html#roadmap`). This is the fuller
internal version — same phases, more detail on what "done" actually means
for each one, so it's clear what's left before launch.

## Phase 1 — Core build (in progress now)

**Areviax Mass**
- Workout Builder (muscle-balanced session generation, PR detection) — built
- Smart Log nutrition tracking (portion-word parsing, palm-size meat/fish
  measure, food database) — built
- Recipes, progress charts, recovery tracking — built
- XP / streaks / crates reward system, key upgrades — built
- Subscription screen UI — built, **not wired to a real payment processor**

**Areviax OS**
- Daily compass ring, weekly schedule grid, streaks, shards & rewards — built
- Reminders incl. daily digest — built

**Still open in this phase**
- Real backend: no live database exists yet. All state is local
  (`localStorage`) per device — nothing syncs across devices or survives
  a reinstall today. This has to exist before public launch.
- Real payment processing: no Whop, Stripe, or other processor is connected
  anywhere in the codebase. The waitlist forms are not wired to a live
  endpoint yet either (`WAITLIST_FORM_ENDPOINT` is a placeholder).

## Phase 2 — Founder feedback round

- Ship the current build to the first Founder+ members for real daily use.
- Tune crate odds, XP pacing, and the AI Coach's advice against what
  actually happens in a gym/kitchen, not just internal assumptions.
- Stand up the real backend (auth + a database for profiles, progress,
  and subscription tier) so accounts survive a reinstall and sync across
  devices — required before anyone is charged real money.
- Connect a real payment processor (Whop is the current plan for the
  Founder+ pre-pay checkout) and build the ledger described below so a
  locked-in rate survives a cancel/resubscribe cycle.

### How the "lifetime locked-in rate" actually has to work

Whop (and Stripe) only remember a subscriber's price *while their
subscription is active*. If someone cancels and re-subscribes later, the
platform has no memory of their old rate — it would just charge them
whatever the live price is at that moment. So "lifetime £12/mo" can't be a
plan setting alone; it needs:

1. A permanent, dedicated £12/mo (and £14/mo) plan on the processor side —
   never touched once created, so it doesn't drift with future price rises.
2. A small ledger **outside** the processor (our own database) mapping
   `email → locked rate`, written the moment someone joins at that rate.
3. On any resubscribe, check that ledger first and re-enroll them on their
   original locked plan/price instead of the current live one.

None of this exists yet — it requires the real backend from Phase 2, not
something a static waitlist page can do on its own.

## Phase 3 — Leagues & leaderboards

- Weekly leagues, friend leaderboards, referral rewards.
- Needs a big enough founder cohort to make competition meaningful, so this
  comes after the feedback round, not before.

## Phase 4 — Public launch

- Standard pricing (£17/mo Mass, £16/mo OS) goes live for everyone.
- Every Founder/Founder+ rate locked in before this point is honored via the
  Phase 2 ledger, for as long as that subscription stays active.
- Marketing push: main site, affiliate program (see
  `SALES_AFFILIATE_STRATEGY.md`), paid acquisition once there's proof the
  funnel converts organically first.

## Phase 5 — Post-launch

- AI Coach v2 (more personal, adapts faster to logged data).
- Shared streaks/rewards between Mass and OS for people running both.
- Whatever the Founder feedback round surfaces as the next real gap —
  deliberately left open rather than pre-committing to features nobody
  asked for yet.

## Known open item found during this pass

`index.html`'s "Vault" section currently lists **Physique System** (£17/mo)
and **Areviax OS** (£16/mo) as already-purchasable products inside the £97
Mastermind Bundle, with "View X" buttons pointing at the bundle checkout.
Physique System's description matches Areviax Mass's real features
word-for-word. Every other page in the codebase (both waitlist pages, this
roadmap) treats both apps as pre-launch, waitlist-only, with no real
payment processing anywhere. Those two states contradict each other — a
buyer could pay for the bundle expecting a working app that doesn't exist
yet. This needs a decision before launch: either those two vault entries
get pulled/reworked to point at the waitlist instead of a purchase flow, or
there's a manual-fulfillment process behind them I'm not aware of. Left
untouched pending that call rather than rewritten unilaterally.
