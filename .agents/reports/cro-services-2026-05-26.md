# CRO Audit — Services Page
**Date:** 2026-05-26
**Page:** `/services` — `components/pages/services.tsx`
**Auditor:** Riley (CRO Analyst)
**Week:** 22 (Cycle: Services)

---

## Context

This is the highest-intent page on the site. Visitors arriving from organic search ("ceramic coating Melbourne", "PPF mobile Melbourne") or from a homepage CTA are evaluating a $120–$3,000 purchase. Every friction point here has a dollar cost.

---

## Issue 1 — H1 Doesn't Confirm What the Page Is or Where

**Element:** `<h1>` at line 57–59 in `services.tsx`

**Problem:**
> "We treat every car like the one we drive."

This is a brand attitude line, not a value proposition. It says nothing about what services are available, that the service is mobile, or that it operates in Melbourne. A visitor from Google searching "ceramic coating Melbourne" can't confirm within 3 seconds that they've landed in the right place. The sub-copy at line 60 does better ("mobile detail appointments… ceramic and PPF installations") but it's doing the job the H1 should be doing.

**Recommendation:**
Lead with location + service scope in the H1 and move the brand voice into the subheading.

Suggested H1:
> "Mobile Detailing, Ceramic Coating & PPF — Across Melbourne."

Suggested sub-copy:
> "We come to you. Certified technicians, clear pricing, and protection that lasts years — not a weekend."

---

## Issue 2 — "Book a Call" CTA Label Mismatches the Actual Action

**Element:** `<Link>` at line 74 in `services.tsx`

**Problem:**
The hero card CTA reads "Book a call" but the `href` is a Setmore booking scheduler link — it books a *service appointment*, not a phone/video call. This mismatch creates cognitive friction: a visitor ready to book a ceramic coating clicks expecting to schedule a consultation call, lands on a full booking flow, and feels misled. For a $750+ purchase decision, label accuracy is trust. "Book a call" also undersells the value — it sounds like a soft pre-sales step when this is actually the booking moment.

**Recommendation:**
Change line 74 button label from `"Book a call"` to `"Book a Service"` or `"Check Availability"`. This is a two-word fix that removes the intent mismatch entirely.

---

## Issue 3 — Trust Signals Are Text-Only on a $750–$3,000 Decision Page

**Element:** "Why we're different" aside, lines 127–136 in `services.tsx`

**Problem:**
The aside contains four plain-text bullets. One of them — "Technicians certified by Ceramic Pro and Gtechniq" — is the most powerful trust signal on the page, and it's sitting in a `<li>` with `var(--ink-3)` colour (the *dimmest* text shade in the system). There are no:
- Ceramic Pro or Gtechniq certification badges/logos
- Customer reviews or star ratings (they exist on `/about/reviews` but aren't referenced here)
- Link to the gallery or before/after imagery

The sticky aside is the highest-visibility real estate on desktop for a scrolling visitor. Right now it's doing almost nothing. The `BlobImage` in the hero card (line 65–67) is set to `opacity: 0.15` — purely decorative, zero trust value.

**Recommendation:**
Add Ceramic Pro and Gtechniq badge images to the aside with a caption like "Manufacturer-certified application." Pull 1–2 attributed short testimonials from `/about/reviews` into the aside (name, suburb, service type). Add a "See the results →" link to `/gallery`. These changes don't require new content — just surfacing what already exists.

---

## Quick Win — Exact Copy Change

**File:** `services.tsx`, line 74

| | Copy |
|---|---|
| **Before** | `Book a call` |
| **After** | `Book a Service` |

Secondary quick win — line 60 sub-copy:

| | Copy |
|---|---|
| **Before** | `From mobile detail appointments to long-term ceramic and PPF installations, we make premium service feel effortless.` |
| **After** | `Mobile ceramic coating, PPF, and full detailing — we come to you across greater Melbourne. No workshop required.` |

The revised version front-loads the services (matching search intent), confirms mobile delivery, and names the location in the first sentence.

---

## Bigger Bet — A/B Test: All-Prices-Visible vs. Tab-Per-Service

**Current behaviour:** The services selector (lines 82–98) defaults to `vehicle-detailing` ($120) and shows one service at a time. Visitors must click each pill to see pricing. This means a visitor researching ceramic coating ($750) or PPF ($3,000) lands on the entry-level service by default — a potential mismatch that may cause premature bounce.

**Hypothesis:** Showing all four services simultaneously in a scannable comparison layout (name, one-line description, starting price, "Book" CTA) will increase engagement from mid/high-intent visitors and improve booking conversion for the $300–$3,000 services. High-intent buyers want to self-qualify fast; hiding prices behind tabs adds friction they won't tolerate.

**Test design:**
- **Control:** Current tab/pill selector defaulting to vehicle-detailing
- **Variant:** Static comparison grid — 4 cards, all visible, each with title + 1-line description + starting price + "Book" CTA. Remove the tab filter entirely.
- **Primary metric:** Click-through to Setmore booking link
- **Secondary metric:** Which service gets the most bookings (to understand mix shift)

**Risk:** The variant may feel more like a pricing page than a services page. If brand tone matters more than conversion for this URL, the current layout may still win.

---

## Summary Priority

| Priority | Issue | Effort |
|---|---|---|
| 1 — Do this week | Change "Book a call" → "Book a Service" (line 74) | 2 minutes |
| 2 — Do this week | Revise H1 and sub-copy (lines 57–60) | 30 minutes |
| 3 — This sprint | Add cert badges + 1–2 testimonials to aside (lines 127–136) | Half day |
| Future test | Comparison grid vs. tab selector | Dev + 2 weeks of traffic |
