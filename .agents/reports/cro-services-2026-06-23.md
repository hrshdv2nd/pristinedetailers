# CRO Audit — Services Page
**Date:** 2026-06-23
**Page:** `/services` — `components/pages/services.tsx`
**Auditor:** Riley (CRO Analyst)
**Week:** 26 (Cycle: Services)

---

## Context

The prior audit (2026-05-26) flagged the H1 ("We treat every car like the one we drive"), the "Book a call" CTA label mismatch, and text-only trust signals in the aside. **None of those changes appear in the current source.** Those issues persist and should be prioritised before anything in this report. This audit finds new, distinct issues that weren't covered last month.

---

## Issue 1 — Default Service Label Uses "Quick" on a Premium Brand

**Element:** `services` array, `vehicle-detailing` entry, `label` field (line 19); rendered at line 113 in `services.tsx`

**Problem:**
The Vehicle Detailing service — the one displayed by default on page load (see `useState('vehicle-detailing')` at line 12) — carries the label:

> "Best for a quick inside and out clean"

The word **"quick"** is brand-destroying for a premium mobile detailing business. Every other signal on this page (certified technicians, nano-ceramic barriers, manufacturer warranties) positions Pristine Detailers as thorough and expert. "Quick" signals the opposite — it reads like a $15 drive-through. This label is the first piece of body copy a visitor reads below the price point, and it sets the wrong frame before they've seen any other service.

It also fails as a "best for" label. "Quick clean" describes neither who this service is for nor what outcome they get. The ICP — a time-poor professional with a $50K BMW — doesn't want "quick." They want done-properly-at-my-office.

**Recommendation:**
Replace the label with an outcome + customer profile framing:

- Before: `'Best for a quick inside and out clean'`
- After: `'Best for maintaining a well-kept car between major treatments'`

Or if brevity is preferred:
- After: `'Best for regular care and full presentation detail'`

---

## Issue 2 — No Service Sequencing Context Creates a $1,050 Blind Spot

**Element:** Service card body copy, lines 36–37 (ceramic coating) and 24–29 (revitalise package); rendered in the card at lines 117–118

**Problem:**
The Revitalise Package ($300) and Ceramic Coating ($750) are presented as independent, alternative services. But in practice, paint correction is a prerequisite step for ceramic coating on any car with swirl marks or oxidation — the ceramic bonds to corrected paint, not damaged clear coat. This is knowledge a certified technician has, but the page never shares it.

The ceramic coating body copy (line 36) says:
> "our ceramic coatings are applied by certified technicians and backed by a manufacturer warranty of up to 8 years."

It doesn't say: "For older or previously unprotected paint, we recommend a paint correction step first — ask your technician at booking." That single sentence would:
1. Signal expertise and honest advisory (brand voice win)
2. Surface a natural $300 upsell at the decision moment
3. Reduce post-booking disappointment if a customer books ceramic on paint that needed correction first

**Recommendation:**
Add one sentence to the ceramic coating body copy (line 36, after "manufacturer warranty") and one to the PPF body copy (line 44):

Ceramic coating addition:
> "On vehicles with existing swirl marks or oxidation, we recommend a paint correction step first — your technician will assess this at booking."

PPF addition:
> "For maximum defence, most clients stack PPF with a ceramic coating — ask about our combined installation pricing."

Both changes are copy edits only. The second also surfaces a price-anchoring opportunity (stack pricing implies "getting more for a bundled rate").

---

## Issue 3 — "Starting From" Qualifier Is Invisible on High-Ticket Services

**Element:** Price display block, line 111 in `services.tsx`

**Problem:**
The price label "Starting From" is styled at `fontSize: 11` with `textTransform: 'uppercase'` and `letterSpacing: '0.08em'` in gold (`#C89B37`). The price itself is `fontSize: 40`. This 3.6× size difference means most visitors will register the price before the qualifier. On mobile, 11px caps are effectively illegible.

For PPF at `$3,000` and ceramic at `$750`, this is consequential. A visitor who reads "$3,000" without seeing "starting from" will form a fixed-price expectation. If they inquire and learn the actual price is higher (based on vehicle size, panel coverage, prep work), they experience a negative surprise — exactly the wrong emotional state before a $3K commitment. If it's lower, there's a missed opportunity to have anchored higher.

The label below the price — `service.label` at line 113 — is set to `color: 'var(--ink-3)'`, the dimmest colour in the system. The "Best for high-risk areas" label for PPF provides almost no value in this position and does nothing to justify a $3K starting price.

**Recommendation:**
1. Increase the "Starting From" label to `fontSize: 13` or `14` to ensure it reads before the price on all screen sizes.
2. Replace the static `service.label` below the price with a short "what affects final pricing" hint specific to each service. For PPF: `"Final price varies by panel coverage and vehicle size."` For ceramic: `"Priced by coating tier and vehicle condition."` This sets correct expectations pre-booking.

---

## Quick Win — Exact Copy Change

**File:** `services.tsx`, line 19 (data array) and its render at line 113

| | Copy |
|---|---|
| **Before** | `Best for a quick inside and out clean` |
| **After** | `Best for maintaining a well-kept car between major treatments` |

This is a data change in the `services` array — no structural edit required. It removes a brand-undermining word and replaces it with framing that positions the $120 service as part of an ongoing car care practice (which supports membership cross-sell).

---

## Bigger Bet — A/B Test: Pre-Assessment Offer in the "Need Help Choosing?" Card

**Current state (lines 63–76):**
The hero sidebar card reads "Talk to our team" with copy: "We'll recommend the right plan based on your vehicle, schedule, and protection needs." The CTA is "Book a call."

The card is too abstract to generate clicks. "We'll recommend a plan" is what every service business says. There's nothing specific enough to make a visitor think "yes, I need this."

**Hypothesis:**
Replace the vague advisory card with a specific, no-cost offer: a free paint condition assessment as part of any booking. Frame it around the concrete decision a visitor is already making — "ceramic or PPF? do I need paint correction first?" — and give them a reason to book before they've fully decided.

**Proposed card copy:**
> **Not sure where to start?**
>
> "Most cars need paint correction before ceramic coating — but not all. When you book, your technician will assess your paint at no extra charge and confirm the right approach before any product touches your car."
>
> [CTA: Book and get a free assessment →]

**Why this works:**
- Removes a decision barrier (I don't know which service I need)
- Makes the expert consultation a feature of the booking, not a pre-booking hurdle
- Consistent with the brand voice: direct, technical, not salesy
- "At no extra charge" is concrete risk reduction without a discount

**Test design:**
- **Control:** Current "Talk to our team / Book a call" card
- **Variant:** Assessment-offer card with copy above
- **Primary metric:** Click-through to Setmore booking link from this card
- **Secondary metric:** Total booking page sessions (did the variant lift overall page conversion?)
- **Guardrail:** Monitor booking completion rate — does the assessment offer attract lower-intent visitors who don't follow through?

---

## Summary Priority

| Priority | Issue | Element | Effort |
|---|---|---|---|
| 0 — Carry over | Change "Book a call" → "Book a Service" | Line 74 | 2 min |
| 0 — Carry over | Revise H1 from brand promise to value prop | Lines 57–59 | 30 min |
| 0 — Carry over | Add cert badges + testimonials to aside | Lines 127–136 | Half day |
| 1 — This week | Remove "quick" from Vehicle Detailing label | Line 19 | 2 min |
| 2 — This week | Add sequencing guidance to ceramic + PPF body copy | Lines 36, 44 | 20 min |
| 3 — This sprint | Fix "Starting From" legibility + add pricing context labels | Line 111–113 | 1 hour |
| Future test | Pre-assessment offer vs. generic advisory card | Lines 63–76 | Dev + 2 weeks traffic |
