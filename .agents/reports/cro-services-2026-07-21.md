# CRO Audit — Services Page
**Date:** 2026-07-21
**Page:** `/services` — `components/pages/services.tsx`
**Auditor:** Riley (CRO Analyst)
**Week:** 30 (Cycle: Services)

---

## Context

The previous two Services audits (2026-05-26, 2026-06-23) flagged the H1 tagline, "Book a call" label mismatch, and the "Starting From" label legibility. **All three persist unchanged in the current source.** This audit does not repeat those — they remain Priority 0. What follows is three distinct issues in the current build not previously flagged.

---

## Issue 1 — The Hero Section Has No CTA: High-Intent Visitors Must Scroll to Find Any Booking Path

**Element:** Hero section, `services.tsx` lines 77–87

**Problem:**
The hero is 87 lines of JSX with zero calls to action. No "Book" button, no link, no shortcut to the service selector below. A visitor arriving from a Google search for "mobile car detailing Melbourne" or "ceramic coating Melbourne" — the highest-intent traffic this page receives — sees a personality tagline and a descriptive paragraph, then must scroll to find where to act.

The hero body copy (line 83–85) reads:
> "From mobile detail appointments to long-term ceramic and PPF installations, we make premium service feel effortless."

This is a value statement, not a pathway. The visitor already decided they want to explore services — the job of the hero is to direct that intent, not restate it.

The competitor landscape makes this worse: fixed-location studios and mobile wash companies typically have "Book Online" in their nav and a hero CTA. A visitor who clicked in from a paid ad and sees no immediate booking path in the hero will often back-button before reaching the service selector at line 92.

**Recommendation:**
Add a single primary CTA button inside the hero section, immediately below the body copy (after line 85). Map it to `BOOKING_URL`:

```tsx
<Link
  href={BOOKING_URL}
  target="_blank"
  rel="noopener noreferrer"
  className="pd-btn pd-btn-dark"
  style={{ marginTop: 32, display: 'inline-flex' }}
>
  Book a service <Arrow />
</Link>
```

Optionally add a proof micro-line below it: `4.9 ★ · 2,400+ cars detailed across Melbourne` — 16px, `var(--ink-3)`, no link. This keeps the hero conversion-focused without a structural redesign.

---

## Issue 2 — Entry-Level Services ($99–$150) Are Entirely Missing: The Page's Cheapest Offer Is $200 Window Tinting

**Element:** `services` array, `services.tsx` lines 33–70

**Problem:**
The product marketing context lists the business's lowest-ticket services as Maintenance Detail (from $99/visit) and Basic Detailing (from $150). Neither appears anywhere on this page. The four services shown are:
- Revitalise Package — $385 (default on load)
- Ceramic Coating — $999
- Paint Protection Film — $3,000
- Window Tinting — $200

A new visitor arriving cold hits a page where the cheapest detailing service starts at $385. The Revitalise Package label ("Best for neglected or pre-sale vehicles") immediately tells a first-time visitor this service isn't for their well-maintained daily driver — leaving them nowhere to go.

The business's likely highest-volume conversion path (new customer → $99/$150 wash → upsell to membership or ceramic) is completely invisible. This isn't a copy problem; it's a product-catalogue omission that creates an artificially high price floor on the services page and abandons the audience segment most likely to convert their first visit.

The absence also undermines the membership sell. The Signature membership at $149/mo includes bi-monthly details — but a visitor who can't find a standalone "Basic Detail" listed anywhere will struggle to evaluate whether the membership is a good deal.

**Recommendation:**
Add Maintenance Detail and Basic Detailing to the `services` array. These should appear first in the tab order (before the Revitalise Package) so first-time visitors see an accessible entry point. Suggested data:

```tsx
{
  id: 'maintenance-detail',
  title: 'Maintenance Detail',
  description: 'A thorough wash, decontamination, and hand-dry to keep a well-maintained car in condition.',
  price: '$99',
  label: 'Best for regular upkeep between major treatments',
  body: '...',
  benefits: ['Hand wash & decontamination', 'Wheel clean & tyre dress', 'Interior vacuum & wipe-down', 'Hand-dried & inspected'],
},
```

Change the default `useState` value (line 32) to `'maintenance-detail'` so the lowest-friction service is what new visitors see first.

---

## Issue 3 — Certification Claims Are Text-Only at the Point of Maximum Doubt

**Element:** `DIFFERENTIATORS` array and its render block, `services.tsx` lines 18–23 and lines 164–181

**Problem:**
The differentiator "Certified technicians" (line 20) reads:
> "Trained and certified by Ceramic Pro and Gtechniq, not casual detailers."

This is the single strongest proof point on the page. Ceramic Pro and Gtechniq are manufacturer-backed certification programs — having them means Pristine's technicians have passed a formal standard set by the product brands themselves, not self-assessed. This is what separates them from "weekend detailers" and resolves the number-one visitor anxiety: "will they scratch my paint?"

The page renders this as a text bullet under a gold `<CheckIcon />` (line 175), visually identical in weight to "One point of contact." The Ceramic Pro and Gtechniq logos — which both brands provide to certified applicators — are nowhere on the page. For a visitor deciding whether to hand their $150K Porsche to a company they found online, a logo badge from the manufacturer carries more trust weight than any copy a business writes about itself.

This is particularly costly immediately above the Revitalise Package at $385, the first service a visitor sees on load. The trust deficit at the service-selection moment is where conversion is lost.

**Recommendation:**
1. Add Ceramic Pro and Gtechniq logo images (SVG or PNG, available from their partner portals) to the differentiator card for "Certified technicians" or as a standalone trust bar above or below the service selector (between lines 88 and 92).
2. If brand logos aren't immediately available, add certification-specific copy directly inside the service card body — for example, inside the `ceramic-coating` body (line 49):
   > "We're Ceramic Pro and Gtechniq certified — manufacturer-trained technicians, not unlicensed operators."

Option 2 is a copy change only and can ship today.

---

## Quick Win — Exact Copy Change

**File:** `services.tsx`, line 246 (gallery teaser `<h2>`)

| | Copy |
|---|---|
| **Before** | `Browse the work.` |
| **After** | `Before and after — see what we actually do to paint.` |

The current heading is passive. "Browse the work" tells the visitor what they can do; it doesn't tell them what's there or why it matters. The replacement does three things: (1) names the format (before/after), (2) signals proof of craft rather than portfolio curation, and (3) uses the word "paint" — the thing the ICP is actually anxious about. This is a single string change in the JSX with no structural edit required.

---

## Bigger Bet — A/B Test: Service Recommendation Quiz vs. Tab-Selector Hero

**Current state:**
The service selector (lines 92–162) presents four tabs — Revitalise Package, Ceramic Coating, PPF, Window Tinting — with Revitalise Package open by default. The visitor must already know which service they want (or guess) to use this pattern effectively.

**The problem this solves:**
Most first-time visitors to a detailing services page don't know whether they need paint correction, ceramic coating, or both — or whether PPF is worth it on a 3-year-old car. Decision paralysis at the service level is a common exit trigger: the visitor doesn't know enough to commit to a tab, and there's nothing on the page to guide them.

**Hypothesis:**
A guided "What does your car need?" mini-quiz — 3 questions, no form submission — would surface a recommended service faster than the current tab structure and increase click-throughs to the Setmore booking link.

**Proposed variant:**
Replace or precede the tab selector with a 3-step inline flow:
1. "What best describes your car right now?" → Showroom condition / Needs a refresh / Dull / New car
2. "What's your main concern?" → Protecting the paint / Restoring the finish / UV and heat / All of the above
3. "What timeframe?" → This week / Within a month / Just exploring

Based on answers, surface one recommended service card with the "Book this service" CTA.

**Test design:**
- **Control:** Current tab selector defaulting to Revitalise Package
- **Variant:** 3-question quiz → recommended service card
- **Primary metric:** Click-through rate on "Book this service" from the service section
- **Secondary metric:** Time-on-page (quiz variant should increase this legitimately — users engaging with the quiz are considering, not bouncing)
- **Guardrail:** Booking completion rate after click — ensure quiz doesn't attract lower-quality leads

---

## Summary Priority

| Priority | Issue | Element | Effort |
|---|---|---|---|
| 0 — Carry over | Revise H1 from brand promise to value prop | Lines 80–82 | 30 min |
| 0 — Carry over | Change "Book a call" → specific CTA | Line 266 | 2 min |
| 0 — Carry over | Fix "Starting From" label size (11px → 14px) | Line 133 | 5 min |
| 1 — This week | Add primary CTA to hero section | After line 85 | 15 min |
| 2 — This week | Add Maintenance Detail + Basic Detailing to services array | Line 33 | 45 min |
| 2 — This week | Add certification copy to ceramic card body | Line 49 | 5 min |
| 2 — This week | Update gallery teaser H2 copy | Line 246 | 2 min |
| 3 — Next sprint | Source Ceramic Pro/Gtechniq partner logos, add to differentiators section | Lines 173–179 | Half day |
| Future test | Service quiz vs. tab selector | Lines 92–162 | Dev + 2 weeks traffic |
