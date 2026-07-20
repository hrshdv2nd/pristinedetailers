# Ceramic Coating + Free Tinting Promo — Design Spec

**Date:** 2026-07-21
**Scope:** Sitewide offer bar + dedicated `/promo` landing page for the July/August "Free Window Tinting" offer. Reusable structure so future monthly offers only require editing one config file.

## Problem

The user is running a monthly promo (currently: free window tinting with every Ceramic Coating Package, from $999, valid till end of August) that they've been advertising off-site via a flyer/PDF. The site has no way to surface this offer to visitors who land on the homepage or any other page, and no dedicated page to send ad traffic to that's focused purely on converting that one offer. The site also has no lead-capture form wired up yet — the user's GoHighLevel (GHL) form embed will be dropped in after the page exists.

## Design

### 1. Offer config — `lib/offers.ts`

Single source of truth consumed by both the offer bar and the landing page:

```ts
export const currentOffer = {
  slug: 'ceramic-tint-2026-08',
  badge: 'Ceramic Coating Package',
  emoji: '🚗✨',
  barText: 'FREE window tinting with every Ceramic Coating Package — this month only',
  headline: 'Free Window Tinting',
  subhead: 'Receive a free window tinting on every Ceramic Coating Package — till the end of August.',
  price: 'From $999',
  priceNote: 'Ceramic Coating + Tinting Packages',
  expiresAt: '2026-08-31', // ISO date; offer bar hides once today > this date
  ctaHref: '/promo',
};
```

Next month's offer means editing this file only — no hunting through Nav or page JSX. This is intentionally a single hardcoded object, not a database-backed or multi-offer system (YAGNI — there is exactly one active offer at a time today).

### 2. Offer bar — `components/shared/offer-bar.tsx`

- Rendered at the top of `components/shared/nav.tsx` (inside `<Nav>`, above the existing `pd-nav` element) so it appears on every page that already renders `<Nav />` — no per-page wiring needed.
- Black background (`#0A0A0A`), cream/gold text, single line: `{emoji} {barText}`, entire bar wrapped in a `<Link href={ctaHref}>` (whole bar is clickable, not just a sub-link).
- Server-evaluated date check: `if (new Date() > new Date(currentOffer.expiresAt)) return null;` — bar simply stops rendering after expiry, no manual cleanup, no dismiss/close button (adds state complexity for no real benefit here).
- Not sticky itself; scrolls away with the page while the existing `pd-nav` below it remains sticky, matching current nav behavior.

### 3. Landing page — `/promo`

`app/promo/page.tsx` (metadata only) + `components/pages/promo.tsx` (content), following the site's existing page pattern (`<Nav active="promo" />` ... `<Footer />`). Sections top to bottom:

1. **Hero** — maroon badge (reuse `pd-danger` token) showing `badge`, large headline (`headline`) in the site's display font, `subhead` beneath, 5-star trust line ("★★★★★ Trusted by 30+ Melburnians since 2020" — matches existing site trust copy), and the price line (`price` / `priceNote`).
2. **3-photo row** — three image slots matching the flyer's crops (tint-trim close-up, machine polishing, tint film install). Placeholder `<div>`s styled as photo cards until the user supplies the real photos from the flyer; each slot is a single `<Image>` swap once assets exist. Not sourced from existing `public/images` gallery shots (user will provide the flyer's originals).
3. **What's included** — short bullet list reusing existing Ceramic Coating and Window Tinting descriptions/benefits already defined in `components/pages/services.tsx` (kept as local copies here, not imported, since this page is meant to stand alone and outlive any refactor of `services.tsx`).
4. **Lead form** — styled placeholder card: name / phone / email / vehicle fields + submit button, matching site form styling. Wrapped in a clearly marked `{/* GHL EMBED GOES HERE — replace this card with GHL form script/iframe */}` comment block so swapping in the real embed later is a contained, obvious change.
5. **Fine print** — "Offer valid till 31 August 2026. Applies to Ceramic Coating packages only." — date rendered from `currentOffer.expiresAt`, not hand-typed, so it can't drift out of sync with the bar's own expiry check.

Pricing is displayed GST-inclusive (`$999`), consistent with how `services.tsx` already displays the same Ceramic Coating price — no change to the site's existing pricing-display convention.

### Data flow

`lib/offers.ts` → imported by both `offer-bar.tsx` and `promo.tsx`. No other files read this config. No database, no CMS, no admin UI — editing the offer is a code change (matches how the rest of the site's marketing copy is already hardcoded in page components).

## Out of scope (explicitly deferred)

- Wiring the actual GHL form embed script/iframe — user will supply this once the page is live.
- Supplying/optimizing the real flyer photos — user will provide these separately.
- Any multi-offer system, offer history/archive, or admin-editable offer config — not needed for a single active monthly offer.
- A general `/offers` index page — only `/promo` exists for now; can be introduced later if multiple offers ever run concurrently.

## Acceptance criteria

- Black offer bar renders above the nav on every page while `new Date() <= new Date(currentOffer.expiresAt)`, and disappears automatically once that date passes.
- Offer bar is a single clickable element linking to `/promo`.
- `/promo` renders hero, photo row, included-items list, placeholder lead form (with GHL embed comment marker), and fine print, using `<Nav>` / `<Footer>` consistent with the rest of the site.
- Editing only `lib/offers.ts` is sufficient to change the bar text, landing page headline/price/subhead, and expiry date for a future month's offer.
- `npm run build` passes with no new type errors.
