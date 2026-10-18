# CRO Audit: Booking Page
**Auditor:** Riley (CRO Analyst)
**Date:** 2026-09-29
**File:** `components/pages/booking.tsx`
**Rotation week:** Week 40 → Week D (Booking)

---

## Summary

The booking flow's 4-step structure is clean and the order summary sidebar is solid. But three issues are killing conversions before a customer ever reaches the confirm step: service cards give no context to help people self-select, the two highest-value services (PPF) are silently unbookable online, and the final CTA tells customers they're paying the full total when they're only paying a 20% deposit.

---

## Issue 1: Service cards have no description — customers can't self-select with confidence

**Element:** `StepService` → service card inner `<div>`, lines 447–456

**Problem:**
Each card shows name, duration, and price — nothing else. A customer who arrived from a "ceramic coating Melbourne" search sees four cards: Revitalise Detail ($385), Ceramic Coating ($999), PPF · Full Front ($2,999), PPF · Full Car ($7,549). Nothing explains what each service actually does, who it's for, or how to choose between them.

The "Popular" badge sits on Revitalise Detail (the cheapest, most basic option). For a brand trying to grow high-ticket ceramic/PPF bookings, this anchors visitors down, not up — and sends mixed signals about what Pristine Detailers is actually known for.

The step heading "What are we *caring* for?" (line 423) reads like a vet's waiting room, not a premium protection studio.

**Recommendation:**
Add a one-line descriptor under each service name. Keep it benefit-first, not process-first:

```
Revitalise Detail     — Deep clean, machine polish, interior dress. Full-day refresh.
Ceramic Coating       — 3-year ceramic bond. Hydrophobic, UV-stable, self-cleaning.
PPF · Full Front      — Self-healing film on bonnet, bumper, mirrors. Stops stone chips cold.
PPF · Full Car        — Full-panel film coverage. The last protection your paint will ever need.
```

Move the "Popular" badge to Ceramic Coating (or remove it entirely). Change the step heading to "What are we **protecting**?" — one word shift that aligns with every differentiator in the brand brief.

---

## Issue 2: PPF services are unbookable online — highest-value SKUs hit a dead end

**Element:** `SETMORE_MAP` lines 29–30 + `StepSchedule` fallback, line 679–682

**Problem:**
PPF · Full Front (`serviceKey: ''`) and PPF · Full Car (`serviceKey: ''`) have no Setmore keys. When a customer selects either, picks a date, and waits for slots — they see:

> *"Service not yet linked to Setmore - please call us to book this service."*

PPF starts at $2,999. The full-car job is $7,549. These are the highest-value items in the catalogue, and they silently drop customers into a friction wall at step 3 of a 4-step flow. The message reads like an internal bug note, not customer communication.

**Recommendation:**
Until Setmore is configured for PPF, replace the error state with a frictionless "Request a quote" path. When `!hasServiceKey` and a date is selected, render a compact mini-form in place of the time-slot grid:

```
Your PPF consultation is handled directly by our studio team.
[First name] [Email] [Phone]
[Your vehicle + year]
[ Request my time — we'll confirm within 2 business hours ]
```

POST to a lightweight `/api/enquiry` endpoint (or even a Formspree endpoint as a stopgap). This captures the lead rather than losing them. Separately, prioritise getting PPF keys into Setmore — these are $3K–$7.5K bookings.

---

## Issue 3: "Confirm & pay" CTA shows full total but only charges a 20% deposit

**Element:** `StepConfirm` confirm button, line 340; ToS copy, line 819

**Problem:**
The confirm button reads:

> *"Confirm & pay $1,098.90"*

The Terms of Service box directly below it reads:

> *"A 20% deposit is charged now; the balance post-service."*

For a Ceramic Coating booking, the actual charge at confirmation is ~$219.78. But the button leads with the full GST-inclusive total. At the last step of a funnel, showing a $1,099 amount on the primary CTA when the customer is only committing $220 today is a meaningful trust and friction problem — particularly for customers who aren't credit-card-ready for the full amount right now.

**Recommendation:**
Calculate and display the deposit inline on the button. Add a `deposit` const and surface it:

```ts
const deposit = total * 0.2;
```

Button copy (line 340):
```
Confirm & reserve — $219.78 deposit today
```

Update the ToS label (line 819) to match:
```
I agree to the 24h cancellation policy.
A 20% deposit ($219.78) is charged now — the balance is settled post-service.
```

The ToS checkbox is `defaultChecked` (line 817) — customers aren't actively agreeing to anything. Consider removing `defaultChecked` and requiring an explicit tick before the confirm button becomes active.

---

## Quick Win: Change one heading word on the service step

**Element:** `StepService` heading, line 423–426

**Before:**
```tsx
<h2>What are we <span className="pd-hl">caring</span> for?</h2>
```

**After:**
```tsx
<h2>What are we <span className="pd-hl">protecting?</span></h2>
```

"Protecting" is the brand's core verb (used 11 times in the product-marketing-context), aligns with ICP language ("I want to keep it that way"), and re-frames the step as a protection decision — not a care-and-maintenance one. Takes 30 seconds to change.

---

## Bigger Bet: "Help me choose" guided selector at Step 0

**Hypothesis:** A significant portion of booking-flow abandonment on the service step comes from customers who don't know which service is right for them — especially the $750–$3K range. Adding a two-question "recommendation" path will reduce drop-off at step 0 and increase average order value by steering undecided customers toward ceramic/graphene instead of the entry-level Revitalise Detail.

**The test:**
Add a secondary link below the service list: *"Not sure which protection is right for your car? →"*

Clicking it opens a focused 2-question flow inline (not a modal):

1. "What's your main concern?"
   - [ ] Stone chips and road debris
   - [ ] Long-term hydrophobic finish + UV protection
   - [ ] Both — I want the full picture

2. "How long do you plan to keep the car?"
   - [ ] 1–3 years
   - [ ] 5+ years
   - [ ] It's a keeper / collector

Based on answers, highlight one service with a "Recommended for you" banner and a 1-sentence rationale ("Your freeway commute + 5-year ownership timeline = PPF up front, ceramic on top.").

**Expected impact:** +15–25% conversion rate at step 0 for visitors who use the selector; measurable shift in service mix toward higher-ATV options.

**Effort:** Medium — new inline component, no backend needed, no Setmore changes required.

---

## Notes for Jordan

1. **Quick win (minutes):** Change "caring" → "protecting" on line 423.
2. **Medium effort (hours):** Add 1-line service descriptions to `SERVICES` array (line 10–15) and render them in `StepService` service cards (line 447–456). Move "Popular" badge to Ceramic Coating.
3. **Medium effort (hours):** Update confirm button (line 340) to show deposit amount, not full total. Remove `defaultChecked` on the ToS checkbox (line 817).
4. **Higher effort (days):** PPF enquiry fallback form when `!hasServiceKey`. Requires a `/api/enquiry` endpoint or Formspree integration.
5. **Separate task:** Chase Setmore configuration for PPF · Full Front and PPF · Full Car service keys.
