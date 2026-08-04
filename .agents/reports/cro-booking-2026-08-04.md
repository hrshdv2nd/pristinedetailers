# CRO Audit — Booking Page
**Analyst:** Riley  
**Date:** 2026-08-04  
**Page:** `/booking` → `components/pages/booking.tsx`  
**Week cycle:** Week 4 (week 32 % 4 = 0)

---

## Summary

The booking flow has solid UX bones — the 4-step wizard, sticky order sidebar, and live Setmore slot-fetching are all strong. But three specific defects are actively killing conversions today: the two highest-ticket services are completely unbookable (dead-end message), the final CTA overstates the payment amount, and a copy error in the address field undermines the brand's premium positioning at exactly the moment trust matters most.

---

## Issue 1 — PPF Services Dead-End (Highest Severity)

**Element:** `SETMORE_MAP` lines 29–30 + `StepSchedule` lines 678–681

**Problem:** Both PPF services — Full Front ($2,999) and Full Car ($7,549) — have empty `serviceKey` and `staffKey` in `SETMORE_MAP`:

```ts
'ppf-full-front': { serviceKey: '', staffKey: '', durationMins: 480 },
'ppf-full-car':   { serviceKey: '', staffKey: '', durationMins: 2880 },
```

When a customer picks either service and advances to Step 3 (Schedule), they hit this message:

> *"Service not yet linked to Setmore - please call us to book this service."*

That's a generic broken-product message for the two highest-revenue jobs on the page. A customer who has already committed enough to select PPF Full Car and advance two steps is the most motivated visitor on the site — this message abandons them with no path forward.

**Recommendation:** Replace the dead-end fallback (line 680–681) with a specific call-to-action for high-ticket enquiries:

```tsx
<div style={{ padding: '24px', background: 'var(--navy-soft)', borderRadius: 14 }}>
  <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 8 }}>PPF bookings are made by quote.</div>
  <p style={{ fontSize: 14, color: 'var(--ink-2)', marginBottom: 16 }}>
    PPF installations need a site inspection before we lock in a date. 
    Call us or leave your number and we'll call you within 2 hours.
  </p>
  <a href="tel:+61XXXXXXXXX" className="pd-btn pd-btn-dark">Call to book PPF →</a>
</div>
```

Until Setmore keys are live, this path needs to convert to a phone call, not a dead end.

---

## Issue 2 — "Confirm & pay $X" Overstates Payment (Conversion Killer at Final Step)

**Element:** Navigation continue button, line 340; T&Cs copy, `StepConfirm` line 819

**Problem:** The final CTA reads:

> *"Confirm & pay $4,235.50"* (example: Ceramic + full total incl GST)

But the T&Cs box (line 819) says: *"A 20% deposit is charged now; the balance post-service."*

These two statements contradict each other and the T&Cs are easy to miss (they're in a small blue info box below the summary). A customer who reads the button — especially someone booking a $7K PPF job — sees they're about to pay the full amount. That's the last thing they see before tapping "Confirm." It's a completely avoidable anxiety trigger that will cause drop-off on high-value bookings.

The deposit amount is never shown as its own number anywhere in the UI.

**Recommendation:** Change the CTA copy (line 340) and add a deposit breakdown to `StepConfirm` (before the T&Cs block):

```tsx
// Line 340 — CTA copy change
{bookingLoading ? 'Confirming…' : `Confirm & pay deposit ($${(total * 0.2).toLocaleString(undefined, { maximumFractionDigits: 2 })})`}

// StepConfirm — add above T&Cs block (after line 815)
<div style={{ fontSize: 13, color: 'var(--ink-2)', marginBottom: 16 }}>
  20% deposit of <strong>${(total * 0.2).toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong> charged now. 
  Balance of <strong>${(total * 0.8).toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong> due on completion.
</div>
```

---

## Issue 3 — Copy Error Calls It "Window Tinting" (Brand Trust Damage)

**Element:** `StepSchedule` component, line 727

**Problem:** The helper text under the address field currently reads:

> *"Required for mobile window tinting · greater Melbourne"*

This is a car detailing business — not tinting. This is a copy error that signals inattention to detail, which is exactly the wrong signal for a premium brand whose entire pitch is *obsessive craft and expertise*. A Porsche GT3 owner who notices this will clock it.

There's a secondary defect: the word "Required" is inaccurate — address is **not** in `canContinueSchedule` (line 135), so the step advances without it. The field is optional in the logic but labelled "Required" in the UI.

**Recommendation:** Fix both problems in one line (line 727):

```tsx
// Before
Required for mobile window tinting · greater Melbourne

// After
Your service location · we detail across greater Melbourne
```

And decide whether to make address actually required. For a mobile service, it should be — add `!!address` to `canContinueSchedule` at line 135:

```ts
const canContinueSchedule = !!selectedDate && !!selectedTime && !!customerName && !!customerEmail && !!address;
```

---

## Quick Win — Upsell Banner Copy (StepAddons, lines 532–533)

The ceramic upsell inside `StepAddons` currently reads:

> **Before:** *"Since we're polishing anyway, lock in 3 years of hydrophobic protection for an extra $1,890."*

This is decent but it doesn't handle the #1 objection: "I can just add ceramic next time." Rewrite to close that exit:

> **After:** *"Your paint is already prepped — add 3-year ceramic protection for $1,890. Book it separately later and it's $999 for the coating alone, plus another detail booking."*

Why it works: "already prepped" is a sunk-cost framing that justifies the add-on right now; the second sentence makes "do it later" cost more in money and friction, which is true.

---

## Bigger Bet — Deposit-First Booking Flow (A/B Test Idea)

**Hypothesis:** The psychological barrier at Step 4 (Confirm) combines two anxieties simultaneously — commitment to a date AND financial commitment. Separating them could meaningfully improve completion rate on high-ticket services.

**Test:** Step 4 CTA becomes *"Lock in your date — $0 now"* (or "Hold this slot"). Payment of the 20% deposit is triggered via email link sent post-booking, with a 2-hour window to confirm. The booking is provisional until payment.

**Why it could win:**
- For a $7,549 PPF booking, committing to a date and paying a $1,510 deposit in the same click is a significant combined commitment. Separating them into two smaller steps reduces per-step friction.
- Customers who "lock in" a date are already heavily invested — the email-to-deposit conversion should be high.
- Matches the mental model of premium service industries (architects, tradespeople, luxury brands) where quote → deposit → schedule is the norm.

**Risk:** Lower-intent browsers could block out slots with no intention to pay. Mitigate with short hold windows (2h) and automatic release.

**Measure:** Booking completion rate on Ceramic and PPF tier specifically. Overall completion rate is a misleading metric here since most drop-off is on high-ticket items.

---

## Notes for Jordan

- Issue 3 (line 727 copy fix + `canContinueSchedule` address requirement) is a safe one-liner — implement immediately.
- Issue 2 (deposit display) is also low-risk UI copy — no backend change needed, calculation is already in scope.
- Issue 1 (PPF dead-end) requires a decision from the business about the right CTA (phone number? enquiry form?). Block on that conversation.
