# Sales & Affiliate Strategy — first draft

Working notes on how to sell the apps and run an affiliate program without
any infrastructure beyond what already exists (static pages, Formspree-style
form endpoints, no backend yet). Treat this as a starting point to revise
together, not a finished plan.

## Pricing ladder (already live on the waitlist pages)

- **Standard** — £17/mo Mass, £16/mo OS. What launch pricing is, no
  discount. Shown mainly as the anchor the other two tiers discount against.
- **Founder** — £14/mo, free to join (email only). The "I believe in this
  but don't want to commit money yet" tier.
- **Founder+** — £12/mo, pre-pay via a follow-up checkout email. The tier
  the whole pricing panel is built to sell — cheapest, because pre-paying
  before launch is the highest-trust action a stranger can take.

This is a real-scarcity ladder, not an artificial countdown timer: the
prices genuinely get worse for people who wait, because Standard is the
permanent ceiling once it's public.

## Organic sales channels (no ad spend required)

1. **Build-in-public content** — short clips of the actual app (workout
   builder catching a PR, the crate-crack animation, the daily digest)
   posted where the target audience already is (fitness TikTok/Reels,
   r/fitness-adjacent subs where allowed, X). The product's own hooks
   (gamification, streaks) are naturally clip-friendly — lean on that
   instead of generic "check out my app" posts.
2. **Founder testimonials once Phase 2 starts** — the review cards already
   on `index.html` are placeholders; replace with real Founder+ quotes the
   moment there are any. Nothing converts better than a real person's
   before/after.
3. **Cross-promotion between Mass and OS** — each waitlist links to the
   other's; once Phase 5's shared streaks ship, that becomes a real reason
   to run both, not just a footer link.

## Affiliate program — realistic version for where the stack is today

A full self-serve affiliate dashboard needs a backend that doesn't exist
yet. Until Phase 2's backend lands, run affiliates the manual-but-honest way:

1. **Referral links, no backend required** — already implemented on
   `waitlist.html` (`?ref=<anything>` captured to `localStorage`, submitted
   with the signup so Formspree records who referred whom). Anyone can make
   a link with their own name/handle as the ref code — no approval process
   needed to start tracking interest.
2. **Manual payout tier once there's real revenue** — e.g. give an
   affiliate a recurring % of their referrals' subscription for as long as
   those referrals stay subscribed (this is the standard SaaS affiliate
   model and it's easy to explain: "you get paid as long as they stay").
   Tracked by hand against the Formspree `ref` field until Phase 2's backend
   can automate it — small volume makes this genuinely fine short-term.
3. **Who to approach first** — the same fitness/productivity creators whose
   audience already overlaps with Mass/OS's target user; a fixed early-bird
   rate (e.g. a higher % than the standing rate) for the first handful of
   affiliates mirrors the same "earlier = better rate" psychology already
   used on the pricing tiers, and gives them a reason to move now instead
   of waiting to see how it performs.

## What has to happen before any of this scales

- A real backend (Phase 2) to automate referral tracking and payouts —
  manual tracking works for the first dozen affiliates, not hundreds.
- A real payment processor connected, so there's actual recurring revenue
  to split with affiliates in the first place.

## Open questions for you, not decided here

- What affiliate cut feels right — industry-standard SaaS affiliate rates
  run roughly 15–30% recurring; where in that range depends on margins
  once real infra costs (hosting, the eventual backend, payment processor
  fees) are known.
- Whether to open affiliates to anyone who asks early on, or hand-pick the
  first cohort from creators you already know — hand-picking is lower risk
  while there's no backend to police it, but slower to start.
