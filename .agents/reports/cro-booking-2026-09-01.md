# CRO Audit — Booking Page
**Auditor:** Riley (CRO Analyst)
**Date:** 2026-09-01
**File:** `components/pages/booking.tsx`
**Page:** `/booking` — 4-step booking flow (Service → Upgrades → Schedule → Confirm)

---

## Context

The booking page is where intent converts to revenue. Visitors here are self-selected — they've already decided to book. The job of this page is not to persuade; it's to eliminate the friction and anxiety that causes last-minute abandonment. This audit found one catastrophic dead-end, one missing trust layer at exactly the wrong moment, and one careless copy error that undermines credibility.

---

## Issue 1: PPF services silently dead-end the highest-value customers

**Element:** `SETMORE_MAP` (lines 29–30) + `StepSchedule` fallback message (lines 679–681)

**Problem:** Both PPF services — Full Front ($2,999) and Full Car ($7,549) — have empty `serviceKey` and `staffKey` in `SETMORE_MAP`. A customer who selects PPF · Full Car, chooses add-ons, and picks a date in Step 3 hits this:

```
"Service not yet linked to Setmore - please call us to book this service."
```

This is a developer-facing error message shown to a customer who has just committed intent to spend $7,549. There is no phone number. There is no email link. There is no CTA. The session dies. These are the highest-ticket services on the menu, and the booking flow drops them at the point of maximum intent with a sentence that reads like an admin note.

**Recommendation:** At Step 1 (`StepService`), detect `!SETMORE_MAP[s.id]?.serviceKey` on the service card and render an inline badge: `"Quote-based — we'll contact you"`. Then in the Continue button logic (line 324), when a no-key service is selected, replace `Continue →` with `Request a callback →` that routes to `/contact?service=ppf-full-front` or opens a pre-filled `mailto:` with subject `PPF Quote Request`. Do not let these customers reach a dead Schedule step.

---

## Issue 2: Zero trust signals at the moment of financial commitment

**Element:** The order sidebar (`aside`, lines 346–402) — specifically the gap between the membership callout (lines 394–400) and the end of the card

**Problem:** A customer on the Confirm step is about to click "Confirm & pay" on $385–$7,549. The sidebar shows price math and a membership discount prompt. It does not contain a single proof point.

The product-marketing-context identifies "What if they scratch my paint?" and "Is this legit or will they disappear after one job?" as the primary switching anxieties. These are not addressed anywhere on the booking page. No star rating. No review count. No "2,400+ cars detailed." No certification mention. The one moment when social proof is worth the most — seconds before a customer authorises a payment — the page is silent.

**Recommendation:** Add a compact trust row directly after the membership callout in the sidebar (`aside`, after line 400). Three data points inline, no flourish:

```tsx
<div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-3)' }}>
  <span>★ 4.9 · 39 reviews</span>
  <span>2,400+ cars</span>
  <span>6 yrs Melbourne</span>
</div>
```

This takes 6 lines of JSX. It directly counters the "is this legit" anxiety at the highest-leverage point in the funnel.

---

## Issue 3: Address field has wrong service name — breaks credibility

**Element:** `StepSchedule`, line 728

**Problem:** The helper text beneath the address input reads:

```
Required for mobile window tinting · greater Melbourne
```

Pristine Detailers does not offer window tinting. This is either a copy-paste from a different project or a stale template. A customer booking a $999 ceramic coating reads this and thinks: "Am I on the right page? Did this business just swap their service out?" It's a small detail that lands at precisely the wrong time — during form fill, when any doubt causes abandonment.

**Recommendation:** Change line 728 from:
```
Required for mobile window tinting · greater Melbourne
```
to:
```
We come to you — home, office, or car park. Greater Melbourne.
```

This is accurate, on-brand, and reinforces the core value proposition (mobile) at the moment a customer is handing over their address.

---

## Quick Win: Fix the wrong-service copy error

**Component:** `StepSchedule`, line 728

**Before:**
> Required for mobile window tinting · greater Melbourne

**After:**
> We come to you — home, office, or car park. Greater Melbourne.

This is a one-line change. It removes a credibility-breaking error and replaces it with a reminder of the brand's #1 differentiator. Ship it today.

---

## Bigger Bet: Email capture at Step 1 exit to recover abandoned funnels

**Hypothesis:** The booking flow currently captures email only at Step 3 (Schedule). Anyone who selects a service, explores upgrades, then abandons before picking a date is an invisible loss — no email, no remarketing, no follow-up. Given that ceramic coating ($999) and PPF ($3K–$7.5K) are considered purchases requiring multiple touchpoints, a meaningful portion of abandons are "not today" rather than "not ever."

**Test:** After the customer selects a service in Step 1 and clicks "Continue", intercept with a single-field modal or inline prompt before advancing to Step 2:

> "What's your email? We'll hold your booking and send a reminder."

Collect email + selected service, write to CRM/email tool, then continue to Step 2 as normal. Do not block progression — dismissing the prompt still advances the step.

**A/B split:** 50% current flow (no email capture until Step 3) vs. 50% email-at-Step-1 flow.

**Primary metric:** Email capture rate among non-completers (abandons between Step 1 and Step 4).
**Secondary metric:** Step 4 completion rate (confirm the interstitial doesn't hurt completions).

**Expected outcome:** Even capturing 15% of Step 1 abandoners' emails creates a warm remarketing list of customers who have already selected a specific service and price point — the highest-quality lead signal the business can generate. For PPF at $3K–$7.5K, a single re-engaged booking pays back the engineering effort many times over.

---

## Summary

| Priority | Issue | Effort | Impact |
|---|---|---|---|
| Critical | PPF dead-end at Schedule step | Medium | Unblocks $3K–$7.5K bookings |
| High | No trust signals in sidebar | Low | Reduces abandon at payment |
| Low | Wrong service name in address hint | Trivial | Removes credibility gap |
| Quick Win | Fix "window tinting" copy (line 728) | 5 min | Ships today |
| Bigger Bet | Email capture at Step 1 | High | Recovers abandonment list |
