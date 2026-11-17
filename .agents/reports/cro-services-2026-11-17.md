# CRO Audit — Services Page
**Date:** 2026-11-17
**Auditor:** Riley (CRO Analyst)
**File:** `components/pages/services.tsx`
**Week:** 47 (Week 3 of 4-week cycle — assigned as Membership; `/membership` redirects to `/services`, so this is the target)

---

## Context

**Page type:** Service listing + pricing  
**Primary conversion goal:** Book a high-ticket service (ceramic coating, graphene coating, PPF)  
**Traffic source:** Primarily organic search ("ceramic coating Melbourne", "graphene coating Melbourne", "PPF Melbourne") and direct  
**ICP:** Melbourne car owners with $30K–$200K+ vehicles who value certified, warrantied protection over price

---

## Issue 1 — Hero Has No CTA: Visitors Who Confirm They're in the Right Place Have Nowhere to Go

**Element:** `<section className="pd-sect-hero">` — lines 126–136  
**Problem:** The hero section renders a headline and subtext but no call-to-action button. A visitor arriving from a "ceramic coating Melbourne" search scans the hero, decides it looks right, and then has to scroll past the full service selector and into the service detail card to reach the first "Book this service" button. That button doesn't appear until line 236, inside a conditionally-rendered `<div>` that is only visible if the matching service tab is active.

For a cold visitor who hasn't clicked any service tab yet, there is no visible CTA at the top of the page. The ICP — a time-poor professional who's been meaning to get their BMW coated — arrives, sees the hero, and either scrolls aimlessly or leaves.

**Recommendation:** Add a primary CTA button directly inside `<section className="pd-sect-hero">`, after the `<p>` on line 133. Use:
```tsx
<Link href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="pd-btn pd-btn-dark" style={{ marginTop: 32, alignSelf: 'flex-start', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
  Book a Service <Arrow />
</Link>
```
This gives every visitor — regardless of which service they're considering — an immediate path to convert. It also anchors intent before they scroll into the service selector.

---

## Issue 2 — Trust Signals Are Buried 3 Sections Below the Fold

**Element:** `<section className="pd-sect-sm">` with `<GHLReviewWidget />` (lines 280–290) and "Why we're different" grid (lines 261–277)  
**Problem:** The brand's strongest proof points — 4.9 stars, 2,400+ cars protected, Ceramic Pro and Gtechniq certification, up to 9-year manufacturer warranty — appear in the 3rd and 4th sections below the hero. A visitor who doesn't scroll far enough never sees them.

For a $750–$3,000+ service purchase, trust is the conversion, not the feature list. The ICP's core anxiety is "I don't know who to trust with a car like this." The page leads with an interior-facing brand statement ("We treat every car like the one we drive") and then forces them to scroll through the full service selector before seeing any third-party proof.

The "Why we're different" grid on lines 269–276 has four strong cards (Studio-grade equipment, Certified technicians, One point of contact, Transparent pricing) but they sit after the booking CTA, meaning they can't do their persuasion job before the user is asked to convert.

**Recommendation:** Add a trust bar immediately below the hero section and above the service selector (`<section className="pd-sect">` on line 139). A single row of 4 proof chips:

```
2,400+ cars protected · 4.9★ / 39 reviews · Ceramic Pro & Gtechniq certified · Up to 9-yr warranty
```

This can be a `<div>` with `display: flex; gap: 32px; borderTop/borderBottom: 1px solid var(--line); padding: 20px 0` using `var(--ink-3)` text and `#C89B37` for the star rating. No new section — a single horizontal strip. At mobile it stacks to 2×2.

Separately, consider moving the "Why we're different" grid above the service detail card, or at minimum surfacing one proof point (certified + warranty) inside the service detail card itself, adjacent to the "Book this service" button.

---

## Issue 3 — "Book a call" CTA Copy Conflicts With the Actual Booking Action

**Element:** Final dark section CTA, line 320–322  
```tsx
<Link href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="pd-btn pd-btn-primary" style={{ marginTop: 28 }}>
  Book a call
</Link>
```
**Problem:** `BOOKING_URL` resolves to `https://link.upscalerhq.com/booking/pristine-detailers` — a service booking form, not a phone or video call. The label "Book a call" implies a consultation or discovery call, which is a different and higher-friction intent. The mismatch creates two problems:

1. Users who want a quick consultation think they're booking a call and are instead dropped into a service booking form — they bounce.
2. Users who are ready to book a service scan the final section, see "Book a call" (which sounds like a sales step, not a final step) and infer there's an extra consultation step before they can actually book — they hesitate.

The section heading even says "Talk to our team." — which reinforces the consultation frame, not the booking frame.

**Recommendation:** Update the CTA button text from "Book a call" to "Book a Service". Optionally update the section heading from "Talk to our team." to "Ready to protect your car?" to match intent:

```tsx
// Line 317
<h2 style={{ fontSize: 36, marginTop: 16, color: '#fff' }}>Ready to protect your car?</h2>

// Line 320–322
<Link href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="pd-btn pd-btn-primary" style={{ marginTop: 28 }}>
  Book a Service <Arrow />
</Link>
```

If a genuine consultation option exists (phone/email/chat), it should be a secondary CTA next to this one, not a replacement for it.

---

## Quick Win — Hero Subtext: Replace "feel effortless" With Specific Proof

**Element:** `<p>` on line 132–134  
**Before:**
> "From ceramic and graphene coatings to long-term PPF installations, we make premium protection feel effortless."

**After:**
> "Ceramic Pro and Gtechniq-certified technicians. Manufacturer warranties up to 9 years. 2,400+ cars protected across Melbourne."

**Why:** The existing line ends on a vague brand promise ("feel effortless") that every competitor could claim. The replacement embeds the three proof points most likely to resolve the ICP's trust objection — certification, warranty, volume — directly in the hero where every visitor sees them. This is a one-line copy change with zero layout impact.

---

## Bigger Bet — A/B Test: Replace Pill Tab Selector With a Visible Card Grid

**Hypothesis:** The current service selector (a horizontal scrolling pill row + single active detail card) forces users through a one-at-a-time reveal of services. The three add-on services (Leather Ceramic $250, Glass Coating $150, Wheel Coating $200) are almost certainly under-booked because they require a user to click through to discover them — they are not co-visible with the main services.

A grid layout showing all 6 services as summary cards simultaneously would:
- Surface add-on services to visitors who arrive intending to book ceramic/PPF and don't know add-ons exist
- Increase add-on attach rate on booking, which is the stated secondary conversion goal
- Reduce drop-off from users who arrive on mobile, see the first pill tab (Ceramic & Graphene), book it, and never see the wheel/glass/leather options

**Test setup:**
- **Control:** Current pill tab + detail card UI (`lines 141–248`)
- **Variant:** 2×3 or 3×2 card grid where each card shows service name, one-line description, starting price, and "Book" CTA — clicking a card expands or anchors to a full detail panel below
- **Primary metric:** Booking clicks per session on add-on services (Leather, Glass, Wheel)
- **Secondary metric:** Overall booking link clicks per session

This is a moderate-effort frontend change but high-upside given the add-on attach rate is explicitly listed as a business priority in the product marketing context.
