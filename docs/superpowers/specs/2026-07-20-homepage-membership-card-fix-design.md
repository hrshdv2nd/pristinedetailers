# Homepage Membership Card Fix — Design Spec

**Date:** 2026-07-20
**Scope:** Phase 1 of the "website narrative & credibility" plan. Phases 2-4 (About page rebuild, site-wide credibility/readability pass) are deferred and out of scope here.

## Problem

The homepage's "Three pillars of obsession" services grid ([components/pages/home.tsx:224](../../../components/pages/home.tsx#L224)) lists a "Maintenance Detail" card at **"From $99"**, styled and linked identically to the three genuine one-off services beside it (Ceramic Coating, PPF, Window Tinting). All four cards link to `/services`.

There is no $99 one-off service anywhere on the site — not on `/services`, not in the `/booking` wizard (cheapest bookable one-off is Revitalise at $300+GST). $99/mo is actually the price of the **Essential membership's** monthly wash-and-seal. A visitor who clicks that card lands on `/services`, sees no $99 option, and the site's first pricing claim turns out to be false — a credibility problem right at the top of the funnel.

**Decision (confirmed with stakeholder):** $99 is a membership perk, not a one-off service. Reframe the card to sell membership, not a one-off booking.

## Design

Keep the card in its existing position/slot in the 4-card grid (least disruptive, no layout change) but change what it communicates and where it points:

1. **Price display** — show `$99/mo + GST` instead of `$99 + GST`, so the recurring nature is explicit at a glance. Achieved by adding an optional `priceSuffix` field to the card data, appended after the price, before the "+ GST" label.
2. **Badge** — add a small pill badge reading **"Membership"** in the same top-right badge slot the Ceramic card uses for "Flagship" (generalizing that slot from a `flagship`-only boolean to an optional `badge` string, so both badges render through the same code path). The membership card keeps the existing white-card styling (only the Ceramic card keeps the black "flagship" treatment) — only the badge changes.
3. **Blurb copy** — change from "Monthly exterior wash, interior clean." to "Monthly wash-and-seal, included with Essential membership." — makes the membership relationship explicit in-line, before the visitor even clicks.
4. **Link target** — this card's `<a>` points to `/membership` instead of `/services`. The other three cards keep linking to `/services`. Achieved by adding an optional per-card `href` field (falls back to `/services` if unset).

No other cards, copy, or layout change. The section heading "Three pillars of obsession" is unaffected by this change and needs no edit — with the membership card now clearly marked as a membership perk rather than a fourth "pillar," the three genuine service pillars (Ceramic, PPF, Tinting) are what the heading already describes.

## Out of scope (explicitly deferred)

- Rebuilding `/about` (currently redirects to `/about/reviews`) — Phase 2.
- Site-wide copy/credibility/readability pass, ABN placeholder fix, trust-signal additions — Phase 3.
- Reconciling the stale $750 ceramic price in `.agents/product-marketing-context.md` (internal doc, not user-facing) — flagged for stakeholder, not fixed here.

## Acceptance criteria

- Homepage membership card shows "$99/mo + GST" and a "Membership" badge.
- Clicking that card navigates to `/membership`; the other three cards still navigate to `/services`.
- Blurb reads "Monthly wash-and-seal, included with Essential membership."
- No visual regression to the other three cards or the flagship Ceramic card's existing badge/styling.
- `npm run build` passes with no new type errors.
