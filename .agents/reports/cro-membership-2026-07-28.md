# CRO Audit — Membership Page
**Date:** 2026-07-28  
**Auditor:** Riley (CRO Analyst)  
**File:** `app/membership/page.tsx` → redirects to `components/pages/services.tsx`  
**Week:** 31 (Cycle Week 3 → Membership)

---

## Architecture Change — All Prior Issues Are Moot

The `components/pages/membership.tsx` that was audited three times (May 5, June 2, June 30) **no longer exists**. The `/membership` route now silently redirects to `/services` (`app/membership/page.tsx`, line 4). All previously flagged issues — dead "Select plan" button, contradictory sidebar/FAQ, broken mobile grid, absent "mobile" differentiator — are gone with the page.

This audit examines the current state: the services page (`components/pages/services.tsx`) as the de facto membership experience.

---

## Issue 1: `/membership` Redirects to a Services Page Where the Signature Plan Doesn't Exist

**Element:** `app/membership/page.tsx` line 4 (the redirect itself) + `components/pages/services.tsx` lines 28–75 (the `services` array)

**Problem:**  
A visitor arriving at `/membership` — from Google ("mobile car detailing membership Melbourne"), from a homepage link, or from any email campaign — is redirected to a generic services page. The page's above-the-fold hero (line 85–90) reads:

> *"We treat every car like the one we drive."*

There is no above-the-fold signal that this is a membership page. The word "membership" appears once on the visible page — as the small label text below the Maintenance Detail price: *"Included with Essential membership"* (line 36). 

More critically: the Signature plan ($149/mo, described in the product marketing context as the "most popular" tier where "members save up to 35% annually") does not appear anywhere in the `services` array or anywhere else on the page. The Essential tier is referenced indirectly. The Signature tier is completely invisible.

A visitor with membership intent cannot compare tiers, understand savings, or join the Signature plan. They can only book a one-off "Maintenance Detail" service.

**Recommendation:**  
Two viable paths:

1. **Restore a dedicated `/membership` page** (recommended — addresses a recurring traffic destination) with a membership-specific hero, Essential vs. Signature comparison table, the Priya S. testimonial (flagged across multiple prior audits), and a "Join" CTA distinct from the services booking flow.

2. **If keeping the redirect:** Add a `#membership` anchor section to `services.tsx` above the service selector (before line 96) that includes: (a) membership hero copy, (b) Essential vs. Signature comparison with pricing, (c) a "Start membership" CTA, and redirect `/membership` to `/services#membership`. Visitors land in context rather than at the top of a generic services page.

---

## Issue 2: "Studio-grade equipment" Differentiator Describes a Fixed Studio — Pristine Detailers Is Mobile

**Element:** `DIFFERENTIATORS` array, `components/pages/services.tsx` line 21

**Current copy:**
```js
{ 
  title: 'Studio-grade equipment', 
  desc: 'A dedicated detailing space with the tools casual detailers simply don\'t have.' 
}
```

**Problem:**  
"A dedicated detailing space" describes a fixed-location workshop — which is precisely the model Pristine Detailers does not use and which the ICP is actively trying to avoid. The product marketing context is explicit: *"no workshop, no waiting room, same results as a fixed studio."*

This is not a tone problem — it is a factual error. A visitor reading this section could conclude Pristine operates a fixed studio they'd need to drive to, which (a) contradicts the mobile value proposition and (b) eliminates the primary reason the ICP would choose Pristine over a local detailing studio.

The "Why we're different" section (lines 183–199) is positioned as the trust-building, objection-handling block. The first differentiator — the one rendered first, read first, remembered longest — describes the wrong business model.

**Recommendation:**  
Change the `desc` on line 21 to anchor on mobile + equipment:

> `'Professional-grade equipment delivered to your door — the same machines and product lines used in fixed studios, without the drop-off.'`

This fixes the factual error, reintroduces the mobile differentiator, and maintains the contrast with "casual detailers" that the original was trying to make.

---

## Issue 3: "Book this service" CTA on the Maintenance Detail Card Breaks the Membership Conversion Path

**Element:** `components/pages/services.tsx` lines 158–165 (the CTA block inside the service detail panel) + line 32 (Maintenance Detail price `'$150/mo'`) + line 36 (label `'Included with Essential membership'`)

**Problem:**  
The Maintenance Detail card shows:
- Price: **$150/mo** (line 32)
- Label: *"Included with Essential membership"* (line 36)
- CTA: **"Book this service"** (line 159)

The Essential membership is $99/mo (per product marketing context). The card is presenting the non-member price ($150/mo) alongside a label that implies a cheaper membership option exists — but provides no path to actually joining that membership. The CTA "Book this service" takes the visitor to the standard Setmore booking link, where they are presumably booking a one-off service, not subscribing to a $99/mo membership.

A visitor reading this card could conclude: *"The monthly wash costs $150/mo, but I could get it as part of a membership for $99/mo — how do I do that?"* There is currently no answer to that question anywhere on the page.

This creates a conversion path gap specifically for the visitor who is closest to joining a membership — they've identified the relevant service, noticed the membership mention, and are ready to act. They have no way to act on membership intent from this card.

**Recommendation:**  
Add a secondary CTA to the Maintenance Detail card only (inside the `service.id === 'maintenance-detail'` branch, after line 165):

```tsx
{service.id === 'maintenance-detail' && (
  <Link href="/membership" className="pd-btn pd-btn-ghost">
    Join Essential — $99/mo <Arrow />
  </Link>
)}
```

This links to `/membership` which, once a proper membership page exists (Issue 1), creates a complete funnel. Even before that, surfacing "Join Essential — $99/mo" as a second CTA communicates the savings delta ($150 → $99) at the exact moment the visitor is evaluating the Maintenance Detail.

---

## Quick Win — Fix the "Dedicated Detailing Space" Line

**Element:** `DIFFERENTIATORS[0].desc`, `components/pages/services.tsx` line 21

**Before:**
> "A dedicated detailing space with the tools casual detailers simply don't have."

**After:**
> "Professional-grade equipment delivered to your door — the same machines and product lines used in fixed studios, without the drop-off."

**Why:** One sentence, zero code complexity, fixes a factual error that contradicts the brand's primary differentiator. A visitor who reads "dedicated detailing space" may conclude they need to visit a studio — the exact barrier that the ICP's push factor identifies as why they're switching away from fixed studios. This change takes under five minutes and every services page visitor sees it.

---

## Bigger Bet — A/B Test: Membership Module Inserted Above the Service Selector

**Hypothesis:** Adding a compact Essential vs. Signature comparison module above the service tab selector (before line 96) — visible without scrolling on desktop, one scroll down on mobile — will generate measurable membership inquiries where currently there are zero from this page.

**Rationale:**  
The services page currently has no conversion path to membership. Every visitor who lands here with membership intent either (a) bounces, (b) books a one-off service instead, or (c) searches elsewhere for membership information. The `/membership` redirect means this page IS the membership page — but it doesn't know it.

**Control:** Current layout — hero → service selector tabs → differentiators → reviews → gallery  
**Variant B:** hero → membership comparison module → service selector tabs → differentiators → reviews → gallery

**Membership module spec:**
```
┌─────────────────────────────────────────────────────────┐
│  MEMBERSHIP                                              │
│  Your car, maintained. Every month, without thinking.   │
│                                                          │
│  ┌───────────────────┐  ┌────────────────────────────┐  │
│  │ Essential — $99/mo│  │ Signature — $149/mo   ★    │  │
│  │ Monthly wash+seal │  │ Bi-monthly full detail +   │  │
│  │ Priority booking  │  │ ceramic maintenance        │  │
│  │                   │  │ Members save ~$1,000/yr    │  │
│  │ [Join Essential]  │  │ [Join Signature]           │  │
│  └───────────────────┘  └────────────────────────────┘  │
│  "Six months of school-run punishment and it still looks │
│   showroom. Membership has paid for itself." — Priya S. │
└─────────────────────────────────────────────────────────┘
```

**Primary metric:** Click-through on "Join Essential" or "Join Signature" (tracked separately)  
**Secondary metrics:** Scroll depth past the module (engagement), bounce rate on the services page for `/membership` referral traffic  
**Minimum run:** 4 weeks — membership conversion volume is low and needs time to generate signal  
**Winner criteria:** 85% confidence minimum; given low traffic, use Bayesian testing rather than frequentist

---

## Summary Prioritisation

| Priority | Issue | File + Line | Effort | Expected Impact |
|---|---|---|---|---|
| **P0** | `/membership` has no membership experience — Signature plan invisible | `app/membership/page.tsx:4` + `services.tsx` | High | Zero membership conversions from direct `/membership` traffic |
| **P1** | "Book this service" CTA on Maintenance Detail has no membership join path | `services.tsx:159` | Low | Closes the gap for highest-intent membership visitors |
| **P1 — Quick Win** | "Dedicated detailing space" is factually wrong for a mobile service | `services.tsx:21` | Low (5 min) | Fixes brand contradiction visible to all services page visitors |
| **P2** | A/B test — membership module above service selector | `services.tsx:95` | Medium | Enables first measurable membership conversion from services page |
