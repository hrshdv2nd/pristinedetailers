# CRO Audit — Booking Page
**Date:** 2026-06-09
**Auditor:** Riley (CRO Analyst)
**File:** `components/pages/booking.tsx`
**Goal:** Complete a service booking (multi-step flow: Service → Upgrades → Schedule → Confirm)
**Prior audit:** `cro-booking-2026-05-12.md` (covered PPF silent failure, CTA deposit framing, optional phone)

---

## Issue 1 — Pre-Checked ToS Checkbox Is a Dark Pattern That Undermines Trust at the Final Step

**Element:** `StepConfirm`, line 803
**Current:**
```tsx
<input type="checkbox" id="tos" defaultChecked style={{ width: 18, height: 18, accentColor: 'var(--navy)' }} />
```

**Problem:** The checkbox for "I agree to the service terms and 24h cancellation policy. A 20% deposit is charged now; the balance post-service." is pre-ticked. Users must actively uncheck it to withhold consent — the opposite of how consent should work. Under Australian Consumer Law and the Privacy Act 1988, pre-filled consent fields are considered unfair contract terms. Beyond the legal risk, there's a UX trust problem: if a first-time customer spots the pre-checked box, it signals that the business is cutting corners on transparency — exactly the wrong signal at the moment they're about to hand over payment details.

There's also a factual gap: the label says "A 20% deposit is charged now" but `handleConfirm()` (lines 136–176) only calls `/api/setmore/book` — there is no Stripe or payment gateway call. If no deposit is actually charged at booking, this copy is misleading and will confuse customers who check their bank statement.

**Recommendation:**
1. Remove `defaultChecked` — the box should be unchecked by default and the Continue button should be disabled until checked.
2. Audit whether a deposit is actually charged at booking. If not, rewrite the label:
   - If no deposit: `"I agree to the service terms and 24h cancellation policy. Full payment is due on the day of service."`
   - If deposit is charged via a separate flow: surface the payment step explicitly before `handleConfirm` fires.
3. Add `!!agreedToTerms` to the condition guarding the `Confirm & pay` button so the field has a functional consequence, not just decoration.

---

## Issue 2 — Address Is Optional for a Mobile Service, Creating Unserviceable Bookings

**Element:** `StepSchedule`, lines 699–714; `canContinueSchedule`, line 134
**Current:**
```tsx
// Line 134
const canContinueSchedule = !!selectedDate && !!selectedTime && !!customerName && !!customerEmail;

// Line 701 — label has no asterisk
<div style={{ fontFamily: 'var(--f-mono)', ... }}>Address</div>
<input
  type="text"
  value={address}
  onChange={(e) => setAddress(e.target.value)}
  placeholder="12 Punt Rd, South Yarra VIC 3141"
  style={inputStyle}
/>
```

**Problem:** `address` is not in `canContinueSchedule`. A customer can complete Step 2 with a date, time, name, and email but leave the address blank. The booking goes through to Setmore (line 149: `address && \`Address: ${address}\`` — the field is only appended to the comment if truthy). The technician receives a confirmed booking with no service location.

For a mobile detailing business where "we come to you" is the entire value proposition, an address-less booking is not just a missed field — it's an unserviceable appointment. There is also no sub-copy explaining why the address matters (unlike phone, which has no explanation either per the May audit). The placeholder `"12 Punt Rd, South Yarra VIC 3141"` is the only hint of what's expected.

**Recommendation:**
1. Add `!!address` to `canContinueSchedule`:
   ```tsx
   const canContinueSchedule = !!selectedDate && !!selectedTime && !!customerName && !!customerEmail && !!address;
   ```
2. Add an asterisk to the label and a reassurance note below it:
   ```tsx
   <div>Address *</div>
   // Below the input:
   <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 10 }}>
     Home, office, or building car park — wherever your car is.
   </div>
   ```
   This replaces the current generic "Mobile service · greater Melbourne" line (line 713) which confirms nothing and could apply to any booking.
3. In `StepConfirm`'s confirmation table (line 784), the Address row already renders `address || '—'`. Once required, the `'—'` fallback becomes impossible and can be removed.

---

## Issue 3 — Sidebar Membership Nudge Is Dead Copy: States a Saving With No Path to Act

**Element:** `Booking()`, lines 380–386 (inside the sticky aside)
**Current:**
```tsx
<div style={{ marginTop: 20, padding: 16, background: 'var(--navy-soft)', borderRadius: 12, ... }}>
  <svg ... />
  <span>Becoming a <b>Signature member</b> saves $78 on this booking.</span>
</div>
```

**Problem:** The "$78 savings" callout appears in the sticky sidebar at every step of the booking flow — the highest-intent moment on the entire website. But it has no link, no button, and no path to act. A customer who reads it is told they could save money, then given absolutely nothing to do about it. The $78 figure is also hardcoded regardless of which service is selected (line 385) — a customer booking PPF Full Car ($7,549) sees the same "$78 saves" message as someone booking an Essential Detail ($120), which makes the claim feel arbitrary.

The opportunity cost here is significant: this sidebar is visible throughout all 4 steps, giving it more impressions than any other element on the page. Using it for a passive statement wastes the most valuable persistent real estate on the booking flow.

**Recommendation:**
1. Make the savings dynamic — calculate it from the selected service total:
   ```tsx
   const memberSaving = sel ? Math.round(sel.price * 0.15) : null;
   // Render only when a service is selected:
   {memberSaving && (
     <div>
       <span>Members save ${memberSaving} on this booking.</span>
       <a href="/membership" style={{ display: 'block', marginTop: 8, fontSize: 13 }}>
         Join before you pay → save today
       </a>
     </div>
   )}
   ```
2. The CTA copy "Join before you pay → save today" creates urgency specific to this moment — the customer is about to pay, the saving is immediately applicable.
3. If membership signup can be completed without leaving the booking flow, a modal is preferable to a link.

---

## Quick-Win Copy Change

**Element:** `StepAddons` upsell banner, line 519

**Before:**
```
Since we're polishing anyway, lock in 3 years of hydrophobic protection for an extra $1,890.
```

**After:**
```
Apply ceramic while we're on-site — 3 years of hydrophobic protection without a second booking.
```

**Rationale:** "Since we're polishing anyway" is only accurate if the customer chose a service that includes paint polishing (Revitalise Detail). It renders for all services — including Interior Detailing and Essential Detail, where no polishing occurs. This makes the copy factually incorrect for a significant portion of users and erodes trust in the upsell.

The replacement copy works for all services, leads with the convenience benefit ("while we're on-site"), and names the specific pain avoided ("without a second booking") — which is real for customers who know ceramic coating usually requires a separate appointment.

---

## Bigger-Bet A/B Test

**Hypothesis:** Replacing the static order summary sidebar with a "What happens next" process panel will increase Step 3 (Schedule) → Step 4 (Confirm) completion, particularly for first-time mobile service customers who have never had a technician come to their home.

**Control:** Current sidebar — service name, price breakdown, total, and passive membership note.

**Variant:** After a date and time are selected (Step 2), the sidebar switches from the order summary to a service experience panel:

```
YOUR APPOINTMENT
──────────────────
✓ Confirm now
   We send you a booking summary by email

✓ Day before
   Your technician confirms via SMS

✓ Day of service
   Text alert when 30 mins away

✓ On arrival
   Work completed at your location

✓ After service
   You inspect, approve, and pay the balance
```

Keep the price total visible at the bottom; replace the membership nudge with the dynamic saving CTA from Issue 3.

**Why it might work:** The most common reason customers abandon mobile service bookings is not price — it's uncertainty about the experience. "Will they actually show up? How will I know when? What if I'm in a meeting?" The step-by-step panel answers these objections without requiring the customer to scroll to the FAQ or the About page. It also reinforces the "we'll text you 30 mins out" promise that the May audit flagged as a key differentiator being underused.

**Metrics to track:** Step 2 → Step 3 completion rate (primary); time spent on Step 2 (secondary — if customers linger longer on variant it suggests they're reading and processing; if they proceed faster it suggests reassurance worked).

**Condition:** Only show the variant panel after `selectedDate && selectedTime` are both set — before that, keep the current order summary so the sidebar isn't empty on Steps 0–1.
