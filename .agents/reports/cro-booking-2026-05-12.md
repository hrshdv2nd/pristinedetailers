# CRO Audit — Booking Page
**Date:** 2026-05-12
**Auditor:** Riley (CRO Analyst)
**File:** `components/pages/booking.tsx`
**Goal:** Complete a service booking (multi-step flow: Service → Upgrades → Schedule → Confirm)

---

## Issue 1 — Confirm CTA Overstates What's Charged Today

**Element:** `Booking()` component, line 339
**Current:**
```tsx
{bookingLoading ? 'Confirming…' : `Confirm & pay $${total.toLocaleString()}`}
```

**Problem:** For a PPF Full Car booking this renders "Confirm & pay $7,549" — but line 805 (buried in a T&C checkbox on Step 4) reveals only a 20% deposit is charged now. A customer sees a $7,549 payment demand and abandons. The deposit disclosure is the last thing they read before the final CTA, which is the worst possible place to learn the real charge amount.

**Recommendation:** Rewrite the CTA to reflect the actual charge. Calculate `depositAmount = Math.round(total * 0.2)` and render:

```tsx
`Confirm booking · $${depositAmount.toLocaleString()} deposit today`
```

Also surface the deposit split in the sidebar order summary (line 375–377) as soon as a service is selected — e.g., "Pay today: $XXX · Balance after service: $XXX" — so the customer is never surprised at Step 4.

---

## Issue 2 — PPF Services Fail Silently at Step 3, Not Step 1

**Element:** `SETMORE_MAP` lines 31–32; `StepSchedule` lines 664–667
**Current:**
```tsx
'ppf-full-front': { serviceKey: '', staffKey: '', durationMins: 480 },
'ppf-full-car':   { serviceKey: '', staffKey: '', durationMins: 2880 },
```
When a customer selects PPF Full Front ($2,999) or PPF Full Car ($7,549), adds upgrade add-ons in Step 2, then arrives at Step 3, they see:

> "Service not yet linked to Setmore — please call us to book this service."

**Problem:** The customer has invested intent and time through two steps, then hits a dead end with a generic fallback message and no phone number. This is the highest-value service in the catalogue and it produces the highest drop-off.

**Recommendation:** Two actions:
1. In `StepService` (`StepService` component, lines 398–470), detect missing `serviceKey` at selection time. Show an inline indicator on the PPF cards — e.g., a "Call to book" badge — so customers self-route before investing time in the flow.
2. Replace the generic fallback string at line 666 with a human message and a direct call link:
   ```tsx
   <div>
     <p>PPF bookings are handled by our senior team.</p>
     <a href="tel:+61XXXXXXXXXX">Call us: 03 XXXX XXXX</a>
   </div>
   ```

---

## Issue 3 — Phone Field Is Optional But Required for the Core Service Promise

**Element:** `StepSchedule`, line 728; `canContinueSchedule` logic, line 134
**Current:**
```tsx
<label style={labelStyle}>Phone</label>
// ...
const canContinueSchedule = !!selectedDate && !!selectedTime && !!customerName && !!customerEmail;
```

**Problem:** The booking confirmation screen (line 207) and the `StepConfirm` intro (line 775) both promise: "We'll text you when your technician is 30 minutes out." That promise is the #1 trust signal for a mobile service — it removes the "will they actually show up?" anxiety. But phone is optional. A customer who skips it loses the key benefit, and there is no explanation of *why* the field matters.

**Recommendation:**
1. Mark phone as required in `canContinueSchedule`:
   ```tsx
   const canContinueSchedule = !!selectedDate && !!selectedTime && !!customerName && !!customerEmail && !!customerPhone;
   ```
2. Change the label to explain the value:
   ```tsx
   <label style={labelStyle}>Mobile number · we'll text you when we're 30 mins away *</label>
   ```

---

## Quick-Win Copy Change

**Element:** `StepService` heading, line 409

**Before:**
```
What are we caring for?
```

**After:**
```
What does your car need?
```

**Rationale:** "What are we caring for?" reads as the brand talking to itself — "we" suggests the technician's perspective, not the customer's. "What does your car need?" is direct, customer-framed, and more intuitive as a prompt to select a service. It also avoids the slightly ambiguous double meaning of "caring" (which could be heard as an emotional plea rather than a service selector). The change takes 10 seconds and removes a micro-moment of confusion at the highest-drop-off point in the flow — Step 1 where the customer hasn't committed yet.

---

## Bigger-Bet A/B Test

**Hypothesis:** Framing the booking as "reserve your spot" instead of "pay the full amount" will increase Step 4 → confirmed conversions by surfacing the deposit model as a feature, not a footnote.

**Control:** Current flow — full service price shown in sidebar and on CTA throughout; deposit disclosed only in T&C text on Step 4.

**Variant:** From the moment a service is selected (Step 1 sidebar), show:

> **Reserve with $X today**
> Balance ($X,XXX) charged after service. Free cancellation up to 24h before.

Carry this framing through every step:
- Sidebar total line: "Due today: $240 · After service: $960"
- Step 4 CTA: "Reserve my appointment · $240 now"

**Prediction:** The variant reduces Step 4 abandonment among high-ticket ($2K+) service customers who experience sticker shock at the current "$7,549" CTA. The "reserve" framing also differentiates from generic booking flows — it positions the deposit as securing a premium technician, consistent with the Pristine Detailers brand voice.

**Metrics to track:** Step 4 → confirmation rate (primary); average order value via add-ons (secondary, to confirm the framing doesn't depress upsell attachment).
