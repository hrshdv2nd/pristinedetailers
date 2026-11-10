# CRO Audit — Services Page
**Date:** 2026-11-10  
**Page:** `/services` — `components/pages/services.tsx`  
**Auditor:** Riley (CRO Analyst)  
**Week:** 46 (Cycle: Services)

---

## Carry-Over Status

The following items have been raised in prior audits and remain unimplemented. They are Priority 0 and are not detailed again here — see the October 2026 audit for full write-ups. This audit focuses on three new issues.

| Item | Location | Raised | Effort |
|---|---|---|---|
| H1: brand promise, not value proposition | Lines 129–131 | May 2026 | 30 min |
| Hero CTA button missing | After line 134 | May 2026 | 15 min |
| "Book a call" links to booking form, not a call | Lines 321–322 | May 2026 | 2 min |
| "Starting From" label `fontSize: 11` too small to read | Line 215 | May 2026 | 5 min |
| Gallery teaser H2 "Browse the work." — too generic | Line 301 | May 2026 | 2 min |
| No `excl. GST` note adjacent to price display | Lines 214–219 | May 2026 | 10 min |
| Add `learnMoreHref` for PPF and Graphene cards | Lines 69, 79 | Oct 2026 | 15 min |
| Add price to pill OR add-on group separator | Lines 150–170 | Oct 2026 | 20 min |
| Replace DIFFERENTIATORS text with proof-backed stats | Lines 19–24 | Oct 2026 | 20 min |
| Reviews H2: "happy customers" → "39 reviews" | Line 285–286 | Oct 2026 | 2 min |

---

## Issue 1 — Cancellation Policy Copy Placed Immediately After Primary CTA Creates Cold-Feet Anxiety Before the User Has Booked Anything

**Element:** `<p>` block, `services.tsx` lines 251–256

**The copy:**

> "24 hours or more notice to transfer or cancel your booking gets you a transfer or credit voucher (a $100 reschedule fee applies to ceramic coating and PPF jobs). Less than 24 hours notice is treated as a No Show with no transfer or credit."

**Problem:**

This paragraph is rendered immediately below the "Book this service" button — the page's primary conversion action. Its placement is the UI equivalent of a bouncer explaining the ejection policy before you've walked through the door.

The language is clinically punitive. "Treated as a No Show" is the phrasing debt collectors use — it converts a customer-service policy into a threat. A visitor who has just decided to book, clicks the CTA, and reads this before or during the booking process now has two things to process: the booking itself, and what happens if something comes up. That split attention is a decision-paralysis trigger, not a trust signal.

For Ceramic and PPF jobs, the $100 reschedule fee is real and legitimate to disclose. But the _placement_ is the problem, not the policy. This copy appears at the bottom of the service selector section — before the visitor has seen the differentiators section, the reviews, or the final CTA. It arrives at the moment of maximum purchase intent with the worst-case framing.

The CTA at line 236 opens an external booking URL (`BOOKING_URL`). The cancellation policy at lines 251–256 is a pre-booking disclosure. It should not live between the CTA and the next section. It belongs in the booking flow itself — where the information is actually timely — or in a collapsed "Cancellation policy" link only.

**Recommendation:**

Replace the paragraph with a single one-line link:

```tsx
<p style={{ marginTop: 16, fontSize: 13, color: 'var(--ink-3)' }}>
  <Link href="/cancellation-policy" style={{ color: '#C89B37', textDecoration: 'underline', textUnderlineOffset: 3 }}>
    Cancellation & reschedule policy
  </Link>
</p>
```

The full policy text moves to the booking flow confirmation screen (Jordan's scope). The `/cancellation-policy` page already exists and already contains the full details — this link is enough for anyone who wants to check before booking, without ambushing every visitor who clicks "Book this service."

If the goal is disclosure before the form, the booking form itself (line 17: `BOOKING_URL`) is the correct location.

---

## Issue 2 — Default Service Tab Is Hardcoded — Paid Ad Visitors Landing on the Wrong Service Every Time

**Element:** `useState('ceramic-graphene-coating')` line 48; service selector render lines 150–170

**Problem:**

The active service tab is set via `useState` with a hardcoded default:

```tsx
const [selected, setSelected] = useState('ceramic-graphene-coating');
```

There is no code anywhere on the page that reads a URL query parameter (e.g. `?service=ppf`) to auto-select a tab. The page always opens on Ceramic & Graphene coating, regardless of how the visitor arrived.

This is a message-match failure for any paid traffic that isn't generically targeting "ceramic coating Melbourne." The reports directory shows active Google and Meta ad campaigns (see `ads-google-*.md` and `ads-meta-*.md`). If any ad creative references PPF, Window Tinting, or Graphene specifically, the visitor lands on the Ceramic card and has to actively find the right tab. That gap between ad claim and landing page reality is where paid traffic leaks.

Window Tinting is a distinct product category — mobile, not studio-based, completely different install context. A visitor arriving from a "mobile window tinting Melbourne" ad who lands on the Ceramic tab sees nothing that matches what they searched for in the first visible card. If they don't know to scroll the pill row, they bounce.

Same issue for organic SEO: the blog post at `/blog/is-ceramic-coating-worth-it-melbourne` (linked from `learnMoreHref` on line 63) sends readers back to this page. Those readers are already in the ceramic consideration phase — opening on Ceramic is correct for them. But there's no mechanism to serve PPF-intent or Window Tinting-intent visitors correctly.

**Recommendation:**

Add a one-time `useEffect` that reads the `service` query parameter on mount and sets the initial tab accordingly:

```tsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

// Inside the Services() function, after state declarations:
const searchParams = useSearchParams();
useEffect(() => {
  const serviceParam = searchParams.get('service');
  const validIds = services.map(s => s.id);
  if (serviceParam && validIds.includes(serviceParam)) {
    setSelected(serviceParam);
  }
}, []); // eslint-disable-line react-hooks/exhaustive-deps
```

This requires wrapping the component or its parent in a `<Suspense>` boundary for Next.js 13+ App Router. The change is non-breaking — the default state still handles all direct-nav traffic. The benefit: every ad campaign, email link, and blog cross-link can deep-link to a specific service (`/services?service=paint-protection`, `/services?service=window-tinting`) with zero additional page maintenance.

Tag each service's booking CTA with the service ID when linking from the blog:

```
/blog/ppf-or-ceramic-coating-melbourne → /services?service=paint-protection
/blog/is-ceramic-coating-worth-it-melbourne → /services?service=ceramic-graphene-coating
```

---

## Issue 3 — The Two Testimonials That Would Actually Convert This ICP Are in a Context Doc, Not on the Page

**Element:** Social proof section, `services.tsx` lines 280–290; `GHLReviewWidget` component (line 288)

**Problem:**

The ICP's core anxiety — explicitly stated in the marketing context — is: *"I don't know who to trust with a car like this."*

The business has two testimonials that directly answer this:

> **"The finish on my GT3 is better than factory. Water rolls off in sheets. Worth every dollar."**
> — Marcus T., 2024 Porsche 911 GT3

> **"They came to my garage in Toorak, set up a whole dust barrier. Most professional service I've had."**
> — Dan K., 2022 Tesla Model S Plaid

These testimonials are in `.agents/product-marketing-context.md`. They are not on this page.

Instead, the services page uses `<GHLReviewWidget />` — an unsorted, unedited feed of incoming reviews. The widget may surface a 5-star review about window tinting on the same page as the $3,000 PPF card. It may show a generic "great service!" next to a service description that cites Porsche and Ferrari. The widget is a black box that optimises for breadth, not for the specific conversion job this page has to do.

The Porsche GT3 testimonial placed adjacent to the Ceramic & Graphene card answers the most common pre-purchase question for the Car Enthusiast persona without them having to ask it. The Tesla testimonial in the Window Tinting context ("came to my garage in Toorak") answers the same question for the Time-Poor Professional. Neither of these is reachable by chance through the GHL widget.

The page has the proof. It's in a markdown file. It needs to be on the page.

**Recommendation:**

Add two hardcoded testimonial blocks to the service detail card, rendered conditionally based on the active service. For `ceramic-graphene-coating`, render the Marcus T. testimonial inline below the benefits list (before the CTA row). For `window-tinting`, render the Dan K. testimonial. All other service cards can omit a pinned testimonial and rely on the GHL widget in the section below.

Minimum viable implementation — add this to the service card render block at approximately line 234, inside the `marginTop: 28, display: 'grid'` div, after the `<ul>` benefits block and before the CTA row:

```tsx
{service.id === 'ceramic-graphene-coating' && (
  <blockquote style={{ margin: 0, padding: '16px 20px', borderLeft: '3px solid #C89B37', background: 'var(--bg-2)', borderRadius: 8 }}>
    <p style={{ margin: 0, fontSize: 14, fontStyle: 'italic', color: 'var(--ink-2)', lineHeight: 1.6 }}>
      "The finish on my GT3 is better than factory. Water rolls off in sheets. Worth every dollar."
    </p>
    <footer style={{ marginTop: 8, fontSize: 12, color: 'var(--ink-3)', fontStyle: 'normal' }}>
      Marcus T. — 2024 Porsche 911 GT3
    </footer>
  </blockquote>
)}

{service.id === 'window-tinting' && (
  <blockquote style={{ margin: 0, padding: '16px 20px', borderLeft: '3px solid #C89B37', background: 'var(--bg-2)', borderRadius: 8 }}>
    <p style={{ margin: 0, fontSize: 14, fontStyle: 'italic', color: 'var(--ink-2)', lineHeight: 1.6 }}>
      "They came to my garage in Toorak, set up a whole dust barrier. Most professional service I've had."
    </p>
    <footer style={{ marginTop: 8, fontSize: 12, color: 'var(--ink-3)', fontStyle: 'normal' }}>
      Dan K. — 2022 Tesla Model S Plaid
    </footer>
  </blockquote>
)}
```

The GHL widget below can remain for breadth. These two cards do the targeted conversion work.

---

## Quick Win — Exact Copy Change

**File:** `services.tsx`, line 285–286

This was listed as a 2-minute carry-over in the October 2026 audit. It still hasn't been done.

| | Copy |
|---|---|
| **Before** | `4.9 stars from happy customers.` |
| **After** | `4.9 stars across 39 reviews.` |

"Happy customers" is a claim. "39 reviews" is a fact. The ICP doesn't trust claims — they trust numbers. This is a 30-second edit that makes the trust signal actually function as one.

---

## Bigger Bet — A/B Test: Sticky Service CTA Bar vs. Current Buried Bottom CTA

**Current state:**

The only "Book this service" button is at the bottom of the service card (line 236), after a paragraph of body copy and four benefit bullets. On desktop with a full-height card, this puts the booking CTA approximately 300px below the price display. On mobile, the card stacks vertically and the CTA is even further from the initial visible area.

A visitor who has already decided — based on the price, the tier toggle, or prior research — has to scroll through content they don't need in order to reach the action they came to take.

**Hypothesis:**

A sticky header bar that appears after the visitor has scrolled past the service selector — showing `Book [current service name] · from [price]` → CTA button — will measurably increase booking click-through rate by reducing scroll distance from intent signal to action.

**Proposed variant:**

A `position: sticky; top: 0` bar that renders when `selected` is set, showing:
- Service name (from `services.find(s => s.id === selected).title`)
- Starting price (from active tier or service price)
- "Book now" CTA linking to `BOOKING_URL`
- Visible only when user has scrolled past the pill row (use an `IntersectionObserver` on the pill container)

**Test design:**
- **Control:** Current layout, single CTA at bottom of card
- **Variant:** Sticky bar appears on scroll past selector, bottom CTA remains
- **Primary metric:** "Book this service" / "Book now" combined click-through rate
- **Guardrail metric:** Scroll depth to review section (sticky bar should not reduce research behaviour)
- **Traffic needed:** Approximately 2 weeks at current service-page traffic levels

**Implementation note:** The sticky bar must update when `selected` changes. If Jordan uses `useState` to pass the selected service up, the bar can be a sibling component. If not, lift state to the page level.

---

## Priority Summary

| Priority | Issue | Location | Effort |
|---|---|---|---|
| **0 — Carry-overs** | See carry-over table | Various | ~2h total |
| **1 — This audit** | Remove punitive cancellation copy from post-CTA position | Lines 251–256 | 15 min |
| **1 — This audit** | Add `?service=` URL param tab selection | Line 48 + useEffect | 45 min |
| **2 — This audit** | Add two hardcoded testimonials to ceramic and window tinting cards | Lines ~234 | 30 min |
| **Quick win** | Reviews H2: "happy customers" → "39 reviews" | Line 285–286 | 2 min |
| **Future test** | Sticky service CTA bar | New component | 3–4h dev |
