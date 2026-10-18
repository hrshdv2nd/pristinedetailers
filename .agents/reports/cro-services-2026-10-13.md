# CRO Audit — Services Page
**Date:** 2026-10-13  
**Page:** `/services` — `components/pages/services.tsx`  
**Auditor:** Riley (CRO Analyst)  
**Week:** 42 (Cycle: Services)

---

## Persistent Carry-Overs (5 Audits, Still Unimplemented)

These have been raised every audit since May 2026. Not detailed again — see previous reports. They remain Priority 0.

| Item | Location | Effort |
|---|---|---|
| H1: value prop not brand promise | Line 129–130 | 30 min |
| Hero CTA button missing | After line 134 | 15 min |
| "Book a call" CTA mislabeled — links to booking form, not a call | Line 321–322 | 2 min |
| Cancellation policy punitive copy placed after primary CTA | Lines 251–256 | 15 min |
| "Starting From" label: `fontSize: 11` too small | Line 215 | 5 min |
| Gallery teaser H2: "Browse the work." → specific proof line | Line 301 | 2 min |
| No `excl. GST` note adjacent to price display | Lines 214–219 | 10 min |

Note: The Maintenance Detail price error flagged in August is moot — that service is no longer in the array.

---

## Issue 1 — PPF and Graphene Have No Secondary "Learn More" CTA — Visitors with $3,000 Intent Have Nowhere to Go Except Book or Leave

**Element:** `learnMoreHref` field in `services` array and conditional render, `services.tsx` lines 63, 69–71, 79–82, 239–243

**Problem:**

The `learnMoreHref` field is defined on one service only: the Ceramic tier (line 63: `/blog/is-ceramic-coating-worth-it-melbourne`). The render logic at lines 239–243:

```tsx
{learnMoreHref && (
  <Link href={learnMoreHref} className="pd-btn pd-btn-ghost">
    Learn more <Arrow />
  </Link>
)}
```

...means "Learn more" shows for Ceramic and nothing else. Graphene (line 69), PPF (line 79), Window Tinting (line 113), and all three add-ons have no secondary CTA. The visitor's only choice on those cards is "Book this service" or leave.

PPF is the highest-ticket service on the page at $3,000 (line 79). It is also the most complex — "self-healing polyurethane film, precisely cut and installed panel by panel" — and the one most likely to generate pre-purchase questions ("What panels does it cover? Will you recommend PPF or ceramic first? Do you do partial-front vs. full?"). The marketing context identifies "The New Car Owner" as a key persona whose challenge is "Unsure whether to get PPF, ceramic, graphene, or a combination." That persona is not going to click "Book this service" for a $3,000 install without doing more research. The page gives them no research path.

A visitor who clicks PPF, reads the card, and isn't ready to book will close the tab. There's no lower-commitment action that keeps them engaged with the brand.

**Recommendation:**

Add `learnMoreHref` for PPF at minimum:

```tsx
{
  id: 'paint-protection',
  ...
  learnMoreHref: '/blog/ppf-or-ceramic-coating-melbourne', // add this line
  ...
}
```

If the blog post doesn't exist yet, link to the `/contact` page or a `#talk-to-our-team` anchor. A ghost CTA reading "Talk to us about PPF →" (linking to the bottom section) is better than no secondary action at all. Same fix for Graphene (line 69) — the graphene vs ceramic comparison question is the #1 objection in the product marketing context.

---

## Issue 2 — Service Selector Pills Show No Prices or Category Signals Before Clicking — Visitors Blind-Click to Find What They Want

**Element:** Service pill buttons, `services.tsx` lines 150–170

**Problem:**

The six pill buttons render only the service title:

```tsx
{service.title}
```

Prices, labels ("Best for high-risk areas", "Add-on to any coating or PPF service"), and tier information are all hidden inside the card. A visitor who arrives from Google after searching "ceramic coating Melbourne price" has to click into a card to see a price. A visitor who wants to understand what's available sees six equal-weight pills with no pricing or hierarchy signal.

The three add-on services (Leather Ceramic $250, Glass Coating $150, Wheel Coating $200) are visually indistinguishable from the three primary services (Ceramic from $750, Graphene from $999, PPF $3,000). The labels that explain this relationship ("Add-on to any coating or PPF service") exist in the `service.label` field but only appear inside the card — after clicking. A visitor looking at the pill row has no idea that three of these six services cannot be booked standalone.

On mobile (where most local search traffic lands), the horizontal scrolling pill row (line 147: `overflowX: 'auto'`) has `scrollbarWidth: 'none'` — no scroll indicator. A visitor on a 390px screen sees approximately 3 pills. They don't know there are 3 more unless they swipe. The add-ons may not be visible at all without interaction.

**Recommendation:**

Two changes, either will help:

1. **Price on the pill (low effort, high impact):** Change line 168 from `{service.title}` to:
   ```tsx
   {service.title}{service.price ? ` · from ${service.price}` : service.tiers ? ` · from ${service.tiers[0].price}` : ''}
   ```
   This shows "Ceramic & Graphene coating · from $750" on the pill — visitors who came to find a price get it at a glance.

2. **Visual separator for add-ons (low effort, medium impact):** Insert a non-interactive separator element between `window-tinting` and `leather-ceramic-coating` in the pill row — a vertical divider or a small "Add-ons" text label. The three add-ons are meaningfully different from the three primary services; treating them identically misleads visitors about what the page covers.

---

## Issue 3 — "Why We're Different" Section Makes Four Trust Claims and Backs None of Them with a Number or Logo

**Element:** `DIFFERENTIATORS` array (lines 19–24) and section render (lines 260–277)

**Problem:**

The four differentiator cards contain:
1. "Studio-grade equipment" — "A dedicated coating and PPF studio with the tools casual installers simply don't have."
2. "Certified technicians" — "Trained and certified by Ceramic Pro and Gtechniq, not casual installers."
3. "One point of contact" — "Text or call - no chasing different people for updates."
4. "Transparent pricing" — "Clear pricing for every stage of your service, no surprises."

None of these are anchored by a number, a certification mark, a stat, or a named reference. "Studio-grade equipment" says nothing without a photo or spec. "Certified technicians" names Ceramic Pro and Gtechniq in prose but no logo or certification badge appears — a claimed certification without a logo carries the same weight as an unclaimed one. "One point of contact" is a process benefit with no proof. "Transparent pricing" is self-referential — pricing is on the same page.

Meanwhile, the business has concrete proof points that go unused in this section:
- **2,400+ cars protected** — nowhere on this page except in the review widget context
- **6 years operating in Melbourne** — does not appear on this page at all
- **4.9 stars / 39 reviews** — in the review section heading only
- **Ceramic Pro and Gtechniq certified** — named in the differentiator desc but zero visual evidence

The ICP's core tension is "I don't know who to trust with a car like this." Showing four qualitative claims in the "Why we're different" section without any anchored proof gives a suspicious visitor no reason to believe the claims. This section currently looks identical to what any premium-claiming detailing business would put on their website.

**Recommendation:**

Update the `DIFFERENTIATORS` array to embed one verifiable claim in each card:

```tsx
const DIFFERENTIATORS = [
  {
    title: '2,400+ vehicles protected',
    desc: 'Six years applying ceramic, graphene, and PPF in Melbourne — from daily drivers to Porsche, Ferrari, and McLaren.',
  },
  {
    title: 'Ceramic Pro & Gtechniq certified',
    desc: 'Manufacturer-certified technicians, not casual installers. Warranties are only valid when a certified tech applies the product.',
  },
  {
    title: 'One point of contact',
    desc: 'Text or call — no chasing different people for updates on your job.',
  },
  {
    title: 'Transparent pricing',
    desc: 'Clear pricing for every service on this page, with no surprises at checkout.',
  },
];
```

The first two cards become proof-backed rather than claim-only. The stat (2,400+ / 6 years) and the certification names (Ceramic Pro / Gtechniq) are specific, verifiable, and hard for a competitor to copy. The `desc` for the certification card also explains *why* certification matters — "warranties are only valid when a certified tech applies the product" is a conversion line that addresses the "do I really need a certified installer?" objection.

---

## Quick Win — Exact Copy Change

**File:** `services.tsx`, line 129–130 (H1 headline)

This has been carried over since the first services audit on 2026-05-26 — five months, five audit cycles. The page cannot convert at full potential while the headline reads as a brand sentiment line. This is a 30-second edit.

| | Copy |
|---|---|
| **Before** | `We treat every car like the one we drive.` |
| **After** | `Ceramic coating, graphene coating, and PPF — certified studio in Melbourne.` |

The replacement: (1) names what the page is actually about, (2) includes "certified" — the top ICP trust signal, (3) includes "Melbourne" for local search intent match, (4) matches the search queries that drive most traffic to this page ("ceramic coating Melbourne", "PPF Melbourne"). Brand warmth belongs in the subheading; the H1 must communicate what this is.

---

## Bigger Bet — A/B Test: "Get a quote" vs. "Book this service" on the PPF Card

**Current state:**  
Every service card, including PPF at $3,000, shows the same "Book this service" CTA (line 236). Clicking it opens an external booking form (`BOOKING_URL` — a standard service booking flow).

**The problem this solves:**  
PPF is the page's highest-ticket offering and the one that most requires a consultation before purchase. A first-time visitor who's never had PPF installed on their car — "The New Car Owner" persona — is not going to commit $3,000 via a booking form without speaking to someone first. Asking them to "Book this service" on a $3,000 job treats PPF the same as a $150 wheel coating. The CTA creates an expectation mismatch: the label says "book" but the intent is likely "learn more and see if this is right for my car."

**Hypothesis:**  
Replacing "Book this service" with "Get a quote" on the PPF card, linking to a contact/consultation form rather than the booking form, will increase PPF click-through rate and reduce booking form abandonment from visitors who weren't ready to book but did want to start a conversation.

**Proposed variant:**  
Conditionally render a different CTA label and href when `service.id === 'paint-protection'`:

```tsx
<Link
  href={service.id === 'paint-protection' ? '/contact?service=ppf' : BOOKING_URL}
  target="_blank"
  rel="noopener noreferrer"
  className="pd-btn pd-btn-dark"
>
  {service.id === 'paint-protection' ? 'Get a quote' : 'Book this service'} <Arrow />
</Link>
```

**Test design:**  
- **Control:** "Book this service" → booking form (current)  
- **Variant:** "Get a quote" → contact/consultation form  
- **Primary metric:** PPF CTA click-through rate  
- **Secondary metric:** PPF quote form completion rate  
- **Guardrail:** Ceramic and Graphene booking click-through (should be unaffected)  

**Note:** This test also requires the contact page to have a PPF-specific path (pre-fill the service field via query param) — otherwise a "Get a quote" click that lands on a generic contact form is a worse experience than the current booking form. Confirm with Jordan that `/contact?service=ppf` pre-fills before launching.

---

## Summary Priority

| Priority | Issue | Element | Effort |
|---|---|---|---|
| **0 — H1 carry-over (5 months)** | "We treat every car like the one we drive." → value prop headline | Line 129–130 | 30 min |
| 0 — Carry-overs | See carry-over table above | Various | 50 min total |
| **1 — This audit** | Add `learnMoreHref` to PPF and Graphene cards | Lines 69, 79 | 15 min |
| **1 — This audit** | Add price to pills OR add add-on separator | Lines 150–170 | 20 min |
| **2 — This audit** | Update DIFFERENTIATORS with proof numbers | Lines 19–24 | 20 min |
| Future test | "Get a quote" vs. "Book this service" on PPF card | Line 236 | 2h dev + 2 weeks traffic |
