# CRO Audit — Services Page
**Date:** 2026-08-18  
**Page:** `/services` — `components/pages/services.tsx`  
**Auditor:** Riley (CRO Analyst)  
**Week:** 34 (Cycle: Services)

---

## Context

Previous audits (2026-05-26, 2026-06-23, 2026-07-21) have flagged these items which **remain unimplemented** and are not repeated below — they are still Priority 0:

| Carry-over | Element | Effort |
|---|---|---|
| Revise H1 from brand promise to value prop | Lines 85–87 | 30 min |
| Add hero CTA button below body copy | After line 89 | 15 min |
| Fix "Book a call" → specific CTA (sends to booking URL, not a call) | Line 243 | 2 min |
| Fix "Starting From" label size (11px → 14px) | Line 138 | 5 min |
| Add Basic Detailing ($150) to services array | Line 29 | 30 min |
| Source Ceramic Pro/Gtechniq logos for differentiators section | Lines 189–197 | Half day |

Maintenance Detail was added since the July audit (Issue 2 partially addressed). However its addition introduced a **new pricing data error** — see Issue 1 below.

The July quick win (gallery teaser H2) was **not implemented** — it is re-raised as the quick win again below with an updated recommendation note.

---

## Issue 1 — Maintenance Detail Price Is Wrong: "$150/mo" Contradicts Both Standalone Pricing and Membership Tier

**Element:** `services` array, `services.tsx` lines 35–36; price display, lines 138–143

**Problem:**  
The Maintenance Detail service card shows:

```
price: '$150/mo',
label: 'Included with Essential membership',
```

This is wrong on two counts simultaneously:

1. The standalone Maintenance Detail is priced at **from $99** per the product marketing context. Displaying $150 inflates the apparent cost by 52%.
2. The Essential membership — which this label says includes the service — costs **$99/mo**. Showing "$150/mo" for something "Included with Essential membership" implies the membership costs more than it does.

A visitor comparing the services page price ($150/mo) against the membership page Essential tier ($99/mo) will either think the prices are inconsistent, or assume the service is cheaper through membership by $51/mo — which correctly reflects the value of the membership, but cannot be the intended user journey. More likely: they'll distrust the page entirely.

The label "Included with Essential membership" at $150/mo reads as: "this costs $150 standalone; it's also in the $99 membership." That's a legitimate selling point — but only if the $150 standalone price is accurate, which per business context it isn't.

This is a data entry error from when the service was added to the array, not a copywriting issue. It needs to be corrected before any other work on this page.

**Recommendation:**  
Change `price: '$150/mo'` to `price: '$99'` on line 36. Then update the label on the same line to contextualise the membership save:

```tsx
price: '$99',
label: 'Included with Essential membership ($99/mo)',
```

This shows the standalone price, names the membership, and implies ongoing value — all in a single label. No structural change needed.

---

## Issue 2 — Cancellation Policy Punitive Copy Sits Directly Below the Primary CTA

**Element:** Cancellation notice paragraph, `services.tsx` lines 173–178

**Problem:**  
Immediately below the "Book this service" button — the highest-intent point on the page — users read:

> "24 hours or more notice to transfer or cancel your booking gets you a transfer or credit voucher (a $100 reschedule fee applies to ceramic coating and PPF jobs). Less than 24 hours notice is treated as a No Show with no transfer or credit."

The phrase **"No Show"** is punitive framing. It's the language a business uses internally to describe missed appointments; it's not language a visitor who hasn't booked yet should encounter at their conversion moment. Combined with the $100 fee call-out, this paragraph is a curated list of things that go wrong — placed where the visitor's attention is highest and their motivation to act is at its peak.

This is an exit-intent trigger at the worst possible moment. The visitor was ready to act, the CTA is in front of them, and then they're shown the ways they can be penalised.

The problem isn't the policy (it's reasonable for a mobile service) — it's the placement and framing. The policy copy currently handles a customer service problem (no-shows) by scaring potential customers who haven't booked yet.

**Recommendation:**  
Two-part fix:

1. **Reframe the copy** (same policy, different angle):
   - BEFORE: `"24 hours or more notice to transfer or cancel your booking gets you a transfer or credit voucher (a $100 reschedule fee applies to ceramic coating and PPF jobs). Less than 24 hours notice is treated as a No Show with no transfer or credit."`
   - AFTER: `"Plans change — we get it. Cancel or reschedule with 24+ hours notice and we'll transfer your booking at no charge. Ceramic & PPF bookings: $100 rebooking applies under 24h. Full policy ↗"`

2. **Relocate it** below the "Why we're different" section (after line 198), not immediately after the CTA. Put positive signals (differentiators, reviews) between the CTA and the policy disclaimer — the visitor's last impression before scrolling down should be reinforcing, not cautionary.

---

## Issue 3 — GST Exclusion Is Only Disclosed at the Bottom of the Page, Not at the Price Display

**Element:** Price display in service card, `services.tsx` lines 138–143; GST disclaimer, line 246

**Problem:**  
The service card prominently displays prices at large font size (`fontSize: 40`, line 141):

- Maintenance Detail: $99
- Revitalise Package: $385
- Ceramic Coating: $999
- PPF: $3,000
- Window Tinting: $200

The GST exclusion disclaimer (`"All prices exclude GST."`) appears **once**, in the final dark section at line 246, after two more scroll sections (reviews, gallery, talk-to-our-team). By the time a visitor sees the disclaimer, they've formed their pricing judgement and may have already decided not to book.

For Ceramic Coating, the real price is $1,098.90 inc. GST — nearly $100 more than displayed. For PPF, it's $3,300 inc. GST — $300 more. These are meaningful gaps for a premium-conscious audience doing mental price comparisons. Discovering the gap at checkout (or when talking to the team) is a trust-breaking moment.

The business claims "Transparent pricing" as a differentiator (line 187). Displaying ex-GST prices without a disclosure at the point of display is the opposite.

**Recommendation:**  
Add a GST note adjacent to the price display inside the service card. A simple inline addition at lines 138–143:

```tsx
<div style={{ fontSize: 11, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#C89B37', marginBottom: 6 }}>Starting From</div>
<div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', gap: 6, whiteSpace: 'nowrap' }}>
  <span style={{ fontFamily: 'var(--f-display)', fontSize: 40, fontWeight: 500 }}>{service.price}</span>
</div>
<div style={{ color: 'var(--ink-3)', marginTop: 4, fontSize: 11 }}>excl. GST</div>  {/* ADD THIS LINE */}
<div style={{ color: 'var(--ink-3)', marginTop: 8, maxWidth: 220 }}>{service.label}</div>
```

One line of JSX. Removes the expectation mismatch and backs up the "transparent pricing" claim.

---

## Quick Win — Exact Copy Change

**File:** `services.tsx`, line 222 (gallery teaser `<h2>`)

*Note: This was recommended in the July 21 audit and was not implemented. Re-raising as it remains a 2-minute fix.*

| | Copy |
|---|---|
| **Before** | `Browse the work.` |
| **After** | `Before and after — see what we actually do to paint.` |

"Browse the work" is passive and portfolio-generic. The replacement names the format (before/after), promises proof of craft rather than curated shots, and uses the word "paint" — the specific anxiety the ICP brings to this page. Single string change, no structural edit.

---

## Bigger Bet — A/B Test: Sticky Mobile Bottom Bar vs. No Persistent CTA

**Current state:**  
The "Book this service" CTA lives inside each service card (line 159), below the price, body copy, and benefits list. On mobile (where most local search traffic lands), this means a visitor must scroll ~600–800px from the top of the page before they reach any booking action. If they land mid-page via a shared link or back-navigate from a blog post, the CTA is even further out of view.

**The problem this solves:**  
Mobile visitors from local Google searches ("mobile car detailing Melbourne", "ceramic coating near me") arrive with high intent and short attention spans. Every scroll they complete before reaching the CTA is an opportunity to lose them. The current layout requires: hero → scroll → tab selector → scroll → price → body → benefits → CTA. On a 375px screen, that's 4–5 full-screen scrolls before they can act.

**Hypothesis:**  
A sticky bottom action bar — appearing after 300px of scroll depth and showing the currently selected service name, its price, and a "Book this service" button — would reduce the conversion scroll depth and increase mobile booking click-through rate without degrading desktop experience (where it wouldn't appear).

**Proposed variant:**

```tsx
// Appears on mobile only (max-width: 640px), after 300px scroll
// Shows: "Maintenance Detail · $99 excl. GST" + [Book now →]
// Dismissible with a small X; auto-hides when user reaches the full CTA
```

**Test design:**
- **Control:** Current layout — CTA inside service card only  
- **Variant:** Sticky mobile bottom bar with dynamic service name + price + CTA  
- **Primary metric:** Mobile CTA click-through rate (scroll depth to click)  
- **Secondary metric:** Booking completion rate after click (ensure the bar doesn't generate low-intent clicks)  
- **Guardrail:** Desktop conversion rate (should be unaffected; verify)

**Implementation note:** Requires a `useEffect` scroll listener and a `useState` for visibility — approximately 30–40 lines of new JSX/CSS. Lower complexity than the quiz variant proposed in July; no new UX pattern for the user to learn.

---

## Summary Priority

| Priority | Issue | Element | Effort |
|---|---|---|---|
| **0 — Blocker** | Fix Maintenance Detail price ($150/mo → $99 + update label) | Line 36 | 5 min |
| 0 — Carry-over | H1: value prop not brand promise | Lines 85–87 | 30 min |
| 0 — Carry-over | Add hero CTA button | After line 89 | 15 min |
| 0 — Carry-over | Fix "Book a call" → "Get a recommendation" or similar | Line 243 | 2 min |
| 0 — Carry-over | Fix "Starting From" label (11px → 14px) | Line 138 | 5 min |
| 1 — This week | Add `excl. GST` note under price display in service card | Lines 138–143 | 10 min |
| 1 — This week | Reframe + relocate cancellation policy copy | Lines 173–178 | 15 min |
| 1 — This week | Gallery teaser H2 copy change | Line 222 | 2 min |
| 2 — Next sprint | Add Basic Detailing ($150) to services array | Line 29 | 30 min |
| 2 — Next sprint | Source + add Ceramic Pro/Gtechniq certification logos | Lines 189–197 | Half day |
| Future test | Sticky mobile CTA bar vs. no persistent CTA | New component | 2–3h dev + 2 weeks traffic |
