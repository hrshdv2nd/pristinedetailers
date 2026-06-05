# CRO Audit — Membership Page
**Date:** 2026-06-02  
**Auditor:** Riley (CRO Analyst)  
**File:** `components/pages/membership.tsx`  
**Week:** 23 (Cycle Week 3 → Membership)

---

## ⚠️ Escalation Notice — Unresolved Issues from 2026-05-05

The previous membership audit (4 weeks ago) identified **4 issues, including 2 P0s**. All four remain unaddressed in the codebase today. The most critical: the "Select plan" button (line 112) is still a dead `<button>` with no `onClick` and no `href`. This is not a CRO optimisation problem — it is a broken conversion path that is actively costing signups right now.

| Issue from May 5 | Line | Status |
|---|---|---|
| Dead "Select plan" button | 112 | **Still broken** |
| Aside contradicts FAQ re: booking responsibility | 127 vs 17 | **Still present** |
| H1 is a tautology with no value prop | 54 | **Unchanged** |
| "Bi-Monthly Detail" ambiguous in AU English | 38 | **Unchanged** |

These do not need to be re-analysed. They need to be implemented. This week's audit focuses on **three additional issues** not covered in the May report.

---

## Page Context

- **Type:** Membership / subscription pricing  
- **Primary goal:** Convert Melbourne car owner to Essential ($79/mo) or Signature ($149/mo) recurring membership  
- **ICP:** Time-poor professional, $30K+ vehicle, Toorak/Brighton/Bayside suburbs, values premium and convenience  
- **Key differentiator missing from this page:** Mobile — we come to you

---

## Issue 1: The Mobile Differentiator Is Completely Absent from This Page

**Element:** Entire page — hero (lines 49–71), plan cards (lines 76–108), aside (lines 121–139), FAQ (lines 15–25)  
**Problem:** The word "mobile" does not appear once on the membership page. "We come to you" does not appear. "Home," "office," or "car park" do not appear.

This is the single most meaningful reason a time-poor professional joins a Pristine membership instead of finding a cheaper one-off wash. The business is built on the come-to-you model — it's listed as Differentiator #1 in the product marketing context. But on the membership page — the page specifically designed to sell the ongoing relationship — it is completely invisible.

A visitor arriving from "car detailing membership Melbourne" or "mobile car detailing subscription Melbourne" has their primary pain point (time, logistics, having to drive to a studio) completely unaddressed from the moment they land to the moment they click away.

**Recommendation:**  
1. Rewrite the H1 subhead (line 55) to include the mobile angle (see Quick Win below).
2. Add a short line to each plan card description anchoring it to the mobile format. E.g., Essential: *"Light protection and a monthly exterior refresh — we come to you in Melbourne's inner suburbs."* Signature: *"Bi-monthly maintenance and ceramic care. We come to your home, office, or car park."*
3. Add one FAQ question: *"Where do you perform the service?"* Answer: *"At your home, office car park, or anywhere in Melbourne's inner suburbs and Bayside. You don't need to go anywhere."*

---

## Issue 2: Inline `gridTemplateColumns` Overrides Responsive CSS Classes on Mobile

**Element:** Hero grid — line 51; plan/aside grid — line 73  
**Problem:**  

```jsx
// Line 51
<div className="pd-two-col pd-two-col-1-2"
  style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 40, alignItems: 'start' }}>

// Line 73
<div className="pd-two-col pd-two-col-1fr-300"
  style={{ marginTop: 60, display: 'grid', gridTemplateColumns: '1fr 300px', gap: 40, alignItems: 'start' }}>
```

The inline `style` prop sets `gridTemplateColumns` unconditionally. Even if `.pd-two-col` and `.pd-two-col-1-2` define responsive breakpoints in the global stylesheet (e.g., `@media (max-width: 768px) { grid-template-columns: 1fr }`), inline styles in React have higher specificity than stylesheet-defined rules. The column layouts will **not** collapse on mobile regardless of what the CSS classes define.

For a premium mobile detailing business in Melbourne — where the primary ICP discovery path is local Google search on a phone — a two-column layout that doesn't stack on mobile is a direct conversion blocker. At 375px, the plan cards at `1fr` and `300px` render at roughly 175px and 135px respectively, making them unreadable.

**Recommendation:**  
Remove the `gridTemplateColumns` and `display: 'grid'` properties from the inline `style` props on lines 51 and 73. Let the `pd-two-col`, `pd-two-col-1-2`, and `pd-two-col-1fr-300` CSS classes handle layout and responsiveness. If the current CSS classes don't define responsive breakpoints, add them — don't fix it with more inline styles.

---

## Issue 3: "Save up to 35%" Has No Dollar Anchor and Loses High-Intent Visitors

**Element:** Member benefit card, line 67  
**Current copy:** *"Signature members save up to 35% on bookings annually, enjoy faster scheduling, and receive personalised care plans for their vehicles."*  
**Problem:**  

"Up to 35%" is aspirational marketing language. It has no calculation, no example, and no dollar figure attached. For the ICP — a professional who owns a $50K–$150K vehicle and makes considered purchase decisions — this phrasing reads as unverifiable.

The product marketing context explicitly notes: *"Members save on average $X per year (calculate per service)"* — a placeholder that was never filled in. Four weeks after the last audit, it's still empty.

Consider what 35% actually means:
- Essential member, 12x exterior washes/year at ~$80 each non-member → saves ~$336/year vs. non-member pricing
- Signature member, 12x details/year at ~$250 each non-member → saves ~$1,050/year

These are compelling numbers that justify the subscription cost immediately. A Signature member at $149/mo ($1,788/year) who saves $1,050 on service pricing is paying a net **$738/year for priority mobile detailing** — and the math makes the membership look underpriced, not expensive.

**Recommendation:**  
Do the calculation. Pick a representative scenario (e.g., one full detail per month at typical non-member pricing) and show the annual saving in dollar terms next to the "Save up to 35%" claim. Replace line 67 with:

> *"Signature members save an average of $1,050 per year on detailing services — at $149/mo, your membership effectively pays for itself by month two."*

If exact numbers require internal validation, use a conservative estimate and note it. Even "members typically save $800–$1,200 per year" is more credible and persuasive than "up to 35%."

---

## Quick Win — Subhead Copy Change

**Location:** Line 55  

**Before:**
> "Stay ahead of wear, preserve finishes, and save on every booked service when you join our Signature club."

**After:**
> "Monthly mobile detailing at your door — Signature members save over $1,000 per year on services."

**Why:** The original subhead has three separate selling points loosely chained together, the weakest ("save on every booked service") positioned last. The rewrite leads with the mobile differentiator (absent from the entire page), anchors to a concrete dollar saving, and eliminates "Signature club" — a name that means nothing to a cold visitor. Same length, four times the information density for the ICP.

---

## Bigger Bet — A/B Test: Price Anchoring Module Above the Plan Cards

**Hypothesis:** Showing the annual savings math — as a visual comparison — before presenting plan prices will increase Signature plan selections by 20–35% compared to presenting the plans cold.

**Current state:** Visitor sees `$79/mo` and `$149/mo` with no reference point. Without knowing what a one-off full detail costs, $149/mo feels like a lot. Visitors with high intent but price anxiety will either choose Essential (lower revenue) or leave.

**Test B variant:**  
Add a "What you'd pay without membership" anchor block between the hero section and the plan cards (between lines 71 and 73). Display:

```
Without membership          With Signature membership
Full detail (one-off): $280   Full detail: ~$185 (33% off)
Ceramic maintenance: $180     Ceramic maintenance: ~$120 (33% off)
One-off ad-hoc booking         Priority scheduling

Annual cost: ~$2,760           Annual cost: ~$1,788 (membership)
                               You save: ~$970/year
```

This anchors the $149/mo price against what they're already spending, makes the Signature plan feel like the rational financial decision, and moves the ICP from "is this worth it?" to "which plan is right for me?"

**Measurement:** Primary metric — Signature vs. Essential plan selection rate. Secondary — "Book member service" click-through rate. Run for 4 weeks minimum given the low-volume nature of membership conversions.

---

## Summary Prioritisation

| Priority | Issue | Effort | Expected Impact |
|---|---|---|---|
| P0 — Immediate | Dead "Select plan" button *(from May audit)* | Low | Blocking all plan-to-booking conversions |
| P0 — Immediate | Aside contradicts FAQ *(from May audit)* | Low | Trust-destroying at decision point |
| P1 — This sprint | Mobile differentiator absent from page (Issue 1) | Low-Medium | Core value prop missing |
| P1 — This sprint | Responsive layout broken on mobile (Issue 2) | Low | All mobile traffic affected |
| P1 — This sprint | Subhead copy (Quick Win) | Low | Immediate clarity improvement |
| P1 — This sprint | "Bi-Monthly Detail" ambiguity *(from May audit)* | Low | Reduces plan confusion |
| P2 — This sprint | Dollar-anchor the 35% savings claim (Issue 3) | Low | Converts high-intent fence-sitters |
| P3 — Next sprint | Price anchoring A/B test (Bigger Bet) | Medium | 20–35% Signature uplift hypothesis |
