# CRO Audit — Booking Page
**Date:** 2026-07-07
**Auditor:** Riley (CRO Analyst)
**File:** `components/pages/booking.tsx`
**Goal:** Complete a service booking (4-step flow: Service → Upgrades → Schedule → Confirm)
**Prior audits:**
- `cro-booking-2026-05-12.md` — PPF silent failure, deposit framing, optional phone
- `cro-booking-2026-06-09.md` — Pre-checked TOS, optional address, static membership nudge

---

## Issue 1 — Service Cards Have No Descriptions: Customers Can't Distinguish What They're Buying

**Element:** `StepService`, lines 430–485; `SERVICES` array, lines 10–16

**Current:**
```tsx
const SERVICES = [
  { id: 'essential-detail', name: 'Essential Detail', price: 150, duration: '3 hrs' },
  { id: 'revitalise-detail', name: 'Revitalise Detail', price: 300, duration: '5 hrs', popular: true },
  { id: 'ceramic-3yr', name: 'Ceramic Coating', price: 750, duration: '2 days' },
  { id: 'ppf-full-front', name: 'PPF · Full Front', price: 2999, duration: '3 days' },
  { id: 'ppf-full-car', name: 'PPF · Full Car', price: 7549, duration: '7 days' },
];
```

The card renders only: service name (line 451), duration (line 458), and price (line 462). No description field exists in the data model. No tooltip, no expandable, nothing.

**Problem:** A customer choosing between "Essential Detail" ($150) and "Revitalise Detail" ($300) has no information on which they need. "Revitalise" and "Essential" are brand names — they communicate nothing about scope. The customer's mental model: "Is the extra $150 worth it for my car?" cannot be answered from this page alone. They either:

1. Leave to Google the difference → drop-off
2. Default to the cheaper option to reduce risk → lost upsell
3. Choose "Revitalise" because "Popular" says so, without understanding why → post-service confusion if expectations weren't met

The ceramic and PPF entries are even worse — "PPF · Full Front" vs "PPF · Full Car" is clear, but "Ceramic Coating" has no indication of what preparation is included, what the warranty covers, or how it differs from the ceramic upsell shown in Step 2.

This is compounded by the Step 2 upsell: customers who picked "Essential Detail" then see "Add Ceramic 3yr for an extra $1,890" and have no way to understand why the standalone Ceramic Coating service listed in Step 1 costs $750, not $1,890.

**Recommendation:**

1. Add a `description` field to the `SERVICES` array:
   ```tsx
   { id: 'essential-detail', name: 'Essential Detail', price: 150, duration: '3 hrs',
     description: 'Full exterior wash, decontamination, and interior vacuum. Maintains coated and uncoated cars in good condition.' },
   { id: 'revitalise-detail', name: 'Revitalise Detail', price: 300, duration: '5 hrs', popular: true,
     description: 'Two-stage paint correction, deep interior clean, and 6-month sealant. Full reset for cars needing more than a maintenance wash.' },
   { id: 'ceramic-3yr', name: 'Ceramic Coating', price: 750, duration: '2 days',
     description: 'Chemical bond to your clear coat — hydrophobic, UV-stable, scratch-resistant. Includes prep. 3-year manufacturer-backed warranty.' },
   ```

2. Render the description below the duration label in the card (approximately line 458):
   ```tsx
   <div style={{ fontSize: 13, opacity: 0.6, marginTop: 4 }}>{s.duration}</div>
   {s.description && (
     <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 8, maxWidth: 400 }}>{s.description}</div>
   )}
   ```

3. Add the description field to the `StepService` props type and the component signature at line 419.

---

## Issue 2 — Zero Trust Signals Inside the Booking Flow: Peak Anxiety, Zero Reassurance

**Element:** Sticky aside, lines 348–403; entire booking flow component

**Current:** The sticky aside contains only: service name, duration label, line-item pricing, GST total, and the static membership nudge. No trust signals of any kind appear at any step of the 4-step flow.

**Problem:** The booking page is where purchase anxiety is highest. A customer selecting "PPF · Full Front" for $2,999 is about to hand over their Porsche or Range Rover to someone coming to their home. The questions running through their head:

- "Are these technicians actually certified?"
- "What if they scratch my paint?"
- "Is this business legit or will they disappear?"
- "Have they done cars like mine before?"

The homepage and services page likely address some of these. But the booking flow contains zero reassurance at any step. The sticky aside — which is visible for all 4 steps and is the most-seen real estate on the page — shows only pricing maths.

Compare to the product-marketing-context proof points available: 4.9 stars across 39 reviews, 2,400+ cars detailed, 6 years operating, ceramic coatings up to 8-year manufacturer warranty, cars served include Porsche/Ferrari/McLaren. None of this appears anywhere in the booking component.

The highest-risk moment for a service business (point of purchase commitment) is currently the trust signal desert.

**Recommendation:**

Add a compact trust strip to the bottom of the sticky aside (below the membership nudge, approximately after line 402):

```tsx
<div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 8 }}>
  <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 13, color: 'var(--ink-2)' }}>
    <span style={{ color: '#C89B37' }}>★★★★★</span>
    <span>4.9 · 39 reviews</span>
  </div>
  <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>2,400+ cars detailed in Melbourne</div>
  <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>Certified technicians · insured</div>
</div>
```

Additionally, in `StepConfirm` (line 757), replace the hardcoded `staffName="Pristine Detailers"` prop passed at line 306 with a trust-building line in the summary table. The current render shows "Technician: Pristine Detailers" which reads as a placeholder. Change the confirm table row to read:

```
Technician  |  Certified Pristine technician (confirmed 24h prior by SMS)
```

This turns a placeholder into a promise and addresses the "will they actually show up?" anxiety at the exact moment of commitment.

---

## Issue 3 — 7-Column Date Grid Collapses to Unusable Tiles on Mobile

**Element:** `StepSchedule`, lines 641–666

**Current:**
```tsx
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
  {dates.map((d) => (
    <button ... style={{ padding: '12px 8px', borderRadius: 14, ... }}>
      <div style={{ fontSize: 10, ... }}>{DAYS[d.getDay()].toUpperCase()}</div>
      <div style={{ fontFamily: 'var(--f-display)', fontSize: 26, fontWeight: 500, marginTop: 4 }}>{d.getDate()}</div>
      <div style={{ fontSize: 10, opacity: 0.6, marginTop: 2 }}>{MONTHS[d.getMonth()]}</div>
    </button>
  ))}
</div>
```

**Problem:** 7 columns with `gap: 8` on a 375px viewport (standard iPhone SE / most Android) means each date button is roughly `(375 - 16 - 6*8) / 7 = 43px` wide. A tile that fits a 26px date number, a 10px day abbreviation, a 10px month label, and 24px of vertical padding (`12px top + 12px bottom`) in 43px of horizontal space will either clip the text or force the number to overflow. Apple's Human Interface Guidelines recommend 44px minimum for tappable targets; this is right at the edge with zero horizontal margin for error.

More critically, local mobile search traffic is the dominant acquisition channel for this business (Melbourne suburb + intent keywords → Google Maps/mobile). If Step 3 is broken on mobile, the majority of incoming traffic hits a broken date picker at the most critical step.

The main 2-column layout on line 273 (`gridTemplateColumns: '1.6fr 1fr'`) also has no responsive breakpoint — at 375px, both the wizard and the sticky aside render side by side, giving the wizard roughly 225px of usable width.

**Recommendation:**

1. Swap to a 4-column date grid on mobile using a CSS custom property or a responsive class:
   ```tsx
   <div style={{
     display: 'grid',
     gridTemplateColumns: 'repeat(4, 1fr)',
     gap: 8,
   }}>
   ```
   4 columns at 375px gives ~84px per tile — fully tappable with readable text. Two rows of 7 shows all 14 days without horizontal scrolling.

2. Stack the main layout on mobile. Add `pd-two-col-1-6` to the project's responsive CSS so it collapses to a single column below 768px. Move the `pd-aside-sticky` below the wizard steps on mobile so it doesn't eat half the screen during the primary flow.

3. For quick validation, check whether `pd-two-col-1-6` has a mobile breakpoint in the existing styles — if not, this requires a CSS addition, not just a component change.

---

## Quick-Win Copy Change

**Element:** `StepService`, line 428

**Before:**
```
Pick a service. You can add upgrades next.
```

**After:**
```
All services are performed on-site — home, office, or car park. Select what your car needs.
```

**Rationale:** The current sub-copy is pure navigation instruction ("pick... you can... next") — it burns the only line of body copy in Step 1 on task management rather than value. The replacement restates the core differentiator ("on-site") at the exact moment the customer is making their first selection, and reframes the action as matching their car's need rather than filling out a form. It also neutralises the most common cold-visitor question ("do I need to drop it off?") without requiring them to scroll or search.

---

## Bigger-Bet A/B Test

**Hypothesis:** Showing a concise social proof strip *between* the step indicator and the Step 1 service cards will increase step 1 → step 4 completion rate, because customers who are reassured before they start selecting are less likely to second-guess and abandon mid-flow.

**Control:** Current booking flow — step indicator at the top, then immediately into `StepService` with "What are we caring for?" and the service cards.

**Variant:** Insert a single-line proof rail between the step pill nav (line 245) and the `<div>` containing the step content (line 274):

```tsx
<div style={{
  display: 'flex',
  justifyContent: 'center',
  gap: 28,
  marginBottom: 32,
  fontSize: 13,
  color: 'var(--ink-3)',
  borderBottom: '1px solid var(--line)',
  paddingBottom: 24,
}}>
  <span>★ 4.9 · 39 reviews</span>
  <span>2,400+ cars detailed</span>
  <span>Certified technicians</span>
  <span>6 years in Melbourne</span>
</div>
```

**Why it might work:** The booking page currently has no trust bridge between the marketing site (where trust is established) and the purchase flow (where trust needs to persist). Customers who arrive via Google search or direct link land in the booking flow cold — no homepage hero, no testimonials, no before/afters. A single lightweight proof rail adds zero steps and minimal visual weight, but anchors the customer in the credential context before they make their first decision.

**Primary metric:** Step 1 → Step 4 completion (booking started to booking confirmed).
**Secondary metric:** Drop-off rate at step 0 (customers who land on the booking page but never click a service card). If the variant reduces this, the proof rail is doing conversion work before any interaction.

**Condition for declaring a winner:** Minimum 200 completed step-1 selections per variant, 95% confidence. Given booking volume, this likely requires 4–6 weeks of runtime.
