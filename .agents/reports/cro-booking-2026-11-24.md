# CRO Audit — Booking Page
**Date:** 2026-11-24
**Auditor:** Riley (CRO Analyst)
**File:** `components/pages/booking.tsx`
**Goal:** Complete a service booking (multi-step flow: Service → Upgrades → Schedule → Confirm)
**Prior audits:** May audit (PPF silent failure, deposit framing, optional phone); Jun audit (pre-checked ToS, address not required, sidebar nudge passivity)

---

## Issue 1 — Service Cards Ask for a $385–$7,549 Decision With Zero Product Context

**Element:** `StepService`, service card buttons, lines 428–480

**Current state:** Each card renders only the service name, price, and estimated duration:

```tsx
<h3 style={{ fontSize: 22, fontWeight: 500, margin: 0 }}>{s.name}</h3>
<div style={{ fontSize: 13, opacity: 0.6, marginTop: 4 }}>{s.duration}</div>
// ...
<div style={{ fontFamily: 'var(--f-display)', fontSize: 28, fontWeight: 500 }}>${s.price.toLocaleString()}</div>
```

A first-time visitor arriving from "ceramic coating Melbourne" is shown four options — Revitalise Detail ($385), Ceramic Coating ($999), PPF · Full Front ($2,999), PPF · Full Car ($7,549) — with no description of what any of them include, no indication of warranty tenure, and no guidance on which suits their situation.

**Why this causes drop-off:** Ceramic and graphene have an 8–9 year warranty; PPF stops stone chips but doesn't provide a hydrophobic finish on its own; the Revitalise Detail is a one-day service, not a long-term coating. These distinctions are essential for a customer deciding whether to spend $999 or $2,999. Without them, the customer either (a) leaves to research, (b) selects by price (usually the cheapest), or (c) abandons. The worst case is the customer selecting "Revitalise Detail" — the cheapest, highest-volume service — when they actually need ceramic coating, reducing average order value and creating a mismatch expectation.

**The "Popular" badge makes this worse:** `s.popular === true` only on `revitalise-detail` (line 11). The badge visually anchors the cheapest service as the default recommendation at a moment when premium services are the actual business priority. A customer with a $120K Tesla who would have booked PPF Full Front instead books a Revitalise Detail because "Popular" triggered a social proof shortcut.

**Recommendation:**
1. Add a one-line `description` field to the `SERVICES` array and render it in the card body:
   ```tsx
   { id: 'ceramic-3yr', name: 'Ceramic Coating', description: '8-year hydrophobic barrier — repels water, UV, and contaminants.', price: 999, duration: '2 days' }
   { id: 'ppf-full-front', name: 'PPF · Full Front', description: 'Self-healing film on bonnet, guards, and mirrors — stops stone chips before they hit paint.', price: 2999, duration: '3 days' }
   { id: 'ppf-full-car', name: 'PPF · Full Car', description: 'Full-body self-healing film. Maximum protection for new cars and show cars.', price: 7549, duration: '7 days' }
   { id: 'revitalise-detail', name: 'Revitalise Detail', description: 'Full paint decontamination and polish. The right foundation before coating or PPF.', price: 385, duration: '5 hrs' }
   ```
2. Remove `popular: true` from `revitalise-detail`. The popular label should not be on the cheapest service when the business goal is high-ticket bookings.
3. For ceramic and graphene cards, add a warranty line in small monospace text below the description: `Up to 8-yr manufacturer warranty`.

---

## Issue 2 — 7-Column Date Grid and 5-Column Time Grid Are Untappable on Mobile

**Element:** `StepSchedule`, date grid lines 638–665; time slot grid lines 686–710

**Current state:**
```tsx
// Date grid — 7 columns, 14 dates
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
  {dates.map((d) => (
    <button style={{ padding: '12px 8px', borderRadius: 14 ... }}>
      <div style={{ fontSize: 10, ... }}>{DAYS[d.getDay()].toUpperCase()}</div>
      <div style={{ fontFamily: 'var(--f-display)', fontSize: 26, fontWeight: 500 ... }}>{d.getDate()}</div>
      <div style={{ fontSize: 10, ... }}>{MONTHS[d.getMonth()]}</div>
    </button>
  ))}
</div>

// Time slots — 5 columns
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
```

No `@media` or `className` breakpoint is applied to either grid. On a 390px iPhone screen, 7 columns with 8px gap produces ~47px wide buttons — below Apple's 44px minimum tap target, with 10px font-size text that is illegible. The 5-column time grid produces ~70px buttons which are marginally better but still cramped.

**Why this matters:** Pristine's ICP (Melbourne car owners, 28–55) skews heavily toward mobile Google searches — "ceramic coating Melbourne" on a phone. The booking flow is the entire conversion surface. A step that's physically difficult to tap on the most common device will cause rage-taps, misselections, and abandonment.

**Recommendation:**
1. Switch the date grid to 4 columns on mobile, 7 on desktop using Tailwind or inline grid:
   ```tsx
   // If using Tailwind className:
   className="grid grid-cols-4 md:grid-cols-7 gap-2"

   // Or inline with a responsive check (useWindowWidth hook or CSS variable):
   style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(72px, 1fr))', gap: 8 }}
   ```
   `minmax(72px, 1fr)` will naturally produce 4–5 columns on a 390px screen (72px × 4 = 288px + 24px gap ≈ 312px), and 7 columns on 1024px+.

2. Switch the time slot grid from `repeat(5, 1fr)` to `repeat(auto-fill, minmax(80px, 1fr))` — this produces 4 columns on mobile with adequately-sized tap targets.

3. Increase date button vertical padding from `'12px 8px'` to `'14px 6px'` on mobile to ensure minimum 44px height even at reduced width.

---

## Issue 3 — Zero Trust Signals Across All Four Booking Steps

**Element:** `Booking()` layout, particularly the sticky aside, lines 346–402; and all step headings

**Current state:** The sticky aside contains:
- Order summary (service, add-ons, price breakdown)
- GST calculation
- Passive membership savings note (covered in Jun audit)

Across all four steps and the aside, there are **no** trust signals: no star rating mention, no "2,400+ cars protected", no certified technician reference, no warranty reminder, no customer name/car. The only quality signal present is the existing membership nudge, which is about price, not quality.

**Why this matters:** The booking flow is where purchase intent is highest — and also where the customer is most anxious about committing $999–$8,000 to a business they may be using for the first time. The product marketing context identifies this explicitly: *"I don't know who to trust with a car like this."* Pristine has the proof points to answer this objection directly (4.9★ / 39 reviews, 2,400+ cars, Ceramic Pro and Gtechniq certified, Porsche/Ferrari/McLaren portfolio). None of them appear in the booking flow.

This is particularly acute on `StepConfirm` (the final step), where the customer is one click from handing over payment details. At this moment, the only content visible in the main column is a dry booking summary table and a checkbox. There is no reassurance, no reminder of what they're getting, no human element.

**Recommendation:**

**Immediate (aside):** Replace the bottom of the sticky aside (after the total, below the membership nudge) with a compact trust strip on `step >= 1`:
```tsx
<div style={{ marginTop: 20, borderTop: '1px solid var(--line)', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
  <div style={{ fontSize: 12, color: 'var(--ink-3)', display: 'flex', gap: 8, alignItems: 'center' }}>
    <span>★ 4.9</span>
    <span style={{ opacity: 0.5 }}>·</span>
    <span>39 reviews</span>
  </div>
  <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Ceramic Pro + Gtechniq certified</div>
  <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>2,400+ cars protected in Melbourne</div>
</div>
```

**StepConfirm:** Add a single testimonial before the booking summary table:
```tsx
<blockquote style={{ margin: '0 0 28px', padding: '16px 20px', background: 'var(--bg)', borderRadius: 12, borderLeft: '3px solid var(--navy)', fontSize: 14, lineHeight: 1.6 }}>
  "The finish on my GT3 is better than factory. Water rolls off in sheets. Worth every dollar."
  <footer style={{ marginTop: 8, fontSize: 12, color: 'var(--ink-3)' }}>— Marcus T., 2024 Porsche 911 GT3</footer>
</blockquote>
```

This testimonial directly addresses *"is this worth the money?"* — the dominant final-step objection — with a named customer and a recognisable car.

---

## Quick-Win Copy Change

**Element:** `StepService` heading, line 423

**Before:**
```tsx
<h2 style={{ fontSize: 56, fontWeight: 500 }}>
  What are we <span className="pd-hl">caring</span> for?
</h2>
```

**After:**
```tsx
<h2 style={{ fontSize: 56, fontWeight: 500 }}>
  What does your <span className="pd-hl">car need?</span>
</h2>
```

**Rationale:** "What are we caring for?" is brand-adjacent language that works on a homepage but introduces friction at a decision step. It's a question the customer has to decode — *"caring for" = selecting a service?* — before they can answer it. "What does your car need?" mirrors the customer's actual internal question at this step, is unambiguous, and positions the page as a needs-matching tool rather than a form. It also subtly reframes the booking as being about the car (the customer's investment) rather than the transaction.

No code change required beyond the two string replacements above.

---

## Bigger-Bet A/B Test

**Hypothesis:** Adding a two-question service recommender before the flat service list will increase Step 0 (Service selection) → Step 1 (Upgrades) completion, particularly for first-time visitors who arrive from generic "ceramic coating Melbourne" searches and don't know the difference between ceramic, graphene, and PPF.

**Control:** Current flat service list (`StepService` as-is — four cards, no descriptions, no recommender).

**Variant:** Insert a `StepRecommend` before `StepService` (new step 0, shifting the current 4-step flow to 5):

```
Step 0 — Recommender (new)
  Q1: "Is your car newly purchased, or existing?"
       [New car / Existing car]
  Q2: "What matters most to you?"
       [Stop stone chips] [Best possible finish] [Restore what's there]

  → Based on answers, the system pre-selects and highlights a service with a one-line reason:
     e.g. "New car + stop stone chips → PPF Full Front: physically blocks chips before they hit paint."
     The other services remain visible but appear below the recommendation.
```

**Why it might work:** The ICP personas include "The New Car Owner" and "The Car Enthusiast" — both groups who have intent but lack the knowledge to distinguish coating types without guidance. Rather than leaving them on a cold list, the recommender meets them at their question ("what should I get?") and answers it with a specific recommendation. This reduces the chance they close the tab to research, and reduces the chance they select the cheapest option by default. The recommended card should still be tappable and mutable — the customer can override the recommendation at any time.

**Metrics to track:**
- Step 0 → Step 1 completion rate (primary)
- Average order value of completed bookings (secondary — did the recommender shift bookings toward higher-ticket services?)
- Time-on-step for `StepService` (a significant drop in dwell time suggests the recommendation reduced decision paralysis)

**Condition for running:** Resolve the Issue 1 service description gap first. The recommender has less value if the service cards it pre-selects still lack descriptions.
