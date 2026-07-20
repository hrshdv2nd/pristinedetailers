# Services Page Declutter — Design Spec

**Date:** 2026-07-20
**Scope:** Restructure `/services` ([components/pages/services.tsx](../../../components/pages/services.tsx)) from a cramped two-column layout into a clear single-column narrative. Copy content is largely unchanged (same 4 services, same "why we're different" claims); this is a structural/layout change, using added page length to give each idea room instead of stacking unrelated content in a sticky sidebar.

## Problem

The current layout crams everything above the fold into two competing columns:
- A "Talk to our team" contact card sits beside the hero headline, fighting for attention before a visitor has seen a single service.
- The service detail card (tabs + price + description + benefits) is squeezed into a 1.4fr column beside a sticky sidebar.
- That sidebar stacks three unrelated blocks into one card: "Why we're different" (4-item trust list), a star-rating blurb, and a "See it in person" gallery CTA — all competing for the same cramped 1fr of width.

Net effect: dense, low-hierarchy, hard to scan (confirmed via user screenshot).

## Design

Reflow into six full-width sections, top to bottom, each with one job:

1. **Hero** — headline + subhead only, no competing card.
2. **Service selector** — same pill-tab pattern (works well, keep it), but the selected service's detail card is now full-width. Benefits list moves from a cramped 2-col grid to a roomier 4-col row (or 2x2 on smaller screens) since it has the full container width.
3. **Why we're different** — promoted out of the sidebar into its own full-width section, `pd-four-col` grid, one card per differentiator with a check icon, title, and short description (same 4 claims as today, just given real space).
4. **Social proof** — dedicated section reusing the same review data/card style as the homepage's testimonials section (`TestimonialsSection` in `home.tsx`): 3 named reviews with car model and star rating, instead of one generic "rated 5 stars" line.
5. **Gallery teaser** — "See it in person" becomes a full-width band with an actual portfolio image (reusing an existing asset already used in the homepage gallery) next to the CTA, instead of a small text-only card.
6. **Talk to our team** — moved to the bottom as the closing consultative CTA (dark band, matching the site's existing closing-CTA pattern), for visitors who reach the end without booking.

All sections use the page's existing CSS custom-property/utility-class system (`pd-container`, `pd-card`, `pd-btn`, `pd-eyebrow`, `pd-four-col`, `pd-three-col`, `--ink-2`/`--ink-3`, `--line`, `--bg-2`) — no new design tokens introduced.

## Out of scope

- No changes to service data (titles, prices, descriptions, benefits) or the `/booking` flow.
- No changes to `Nav`/`Footer` components.
- This does not fold in Phase 2 (About page) or the rest of Phase 3 (site-wide credibility pass) — those remain separate, deferred items.

## Acceptance criteria

- Page reads top-to-bottom as: hero → service detail → why we're different → social proof → gallery teaser → talk to our team → footer.
- No sticky sidebar; no single card bundling unrelated content.
- Tab-switching between services still works and only one service's detail is visible at a time.
- `npm run build` passes with no new type errors.
