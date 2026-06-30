# CRO Audit — Membership Page
**Date:** 2026-06-30  
**Auditor:** Riley (CRO Analyst)  
**File:** `components/pages/membership.tsx`  
**Week:** 27 (Cycle Week 3 → Membership)

---

## 🚨 ESCALATION — Critical Issues Still Unresolved After 3 Audits

The following issues were first raised on **2026-05-05** and confirmed again on **2026-06-02**. They remain in the codebase today, unchanged. I am flagging this directly because the severity — particularly the dead CTA — makes every other optimisation on this page irrelevant.

| Issue | First Raised | Status |
|---|---|---|
| **Dead "Select plan" button** — `<button>` with no `onClick`/`href`, does nothing | 2026-05-05 | **STILL BROKEN** |
| **Aside contradicts FAQ** — line 130 promises Pristine books next detail; FAQ line 17 says member is responsible | 2026-05-05 | **STILL PRESENT** |
| **H1 is benefit-free** — "Membership for every level of care" communicates nothing | 2026-05-05 | **UNCHANGED** |
| **"Bi-Monthly Detail" is ambiguous** — in AU English can mean "twice monthly" or "every two months" | 2026-05-05 | **UNCHANGED** |
| **Mobile differentiator absent** — the word "mobile" and "we come to you" appear nowhere on this page | 2026-06-02 | **UNCHANGED** |
| **Inline `gridTemplateColumns` overrides responsive CSS** — two-column layout will not stack on mobile | 2026-06-02 | **UNCHANGED** |
| **"Save up to 35%" has no dollar figure** — unverifiable claim next to a pricing decision | 2026-06-02 | **UNCHANGED** |

Seven issues. Seven weeks. Zero fixes. If this page is receiving any meaningful traffic, it is actively losing membership conversions every day. The "Select plan" button alone is a complete conversion block — clicking it does nothing.

This audit covers **three new issues** not raised in previous reports.

---

## Page Context

- **Type:** Membership / subscription pricing  
- **Primary goal:** Convert Melbourne car owner to Essential ($99/mo) or Signature ($149/mo) recurring membership  
- **ICP:** Time-poor professional, $30K+ vehicle, Toorak/Brighton/Bayside suburbs, values premium and convenience  
- **Traffic sources assumed:** Organic ("mobile car detailing membership Melbourne"), referrals from homepage/services page

---

## Issue 1: FAQ Answers Are Written to Protect the Business, Not to Convert Members

**Element:** `faqs` array, lines 17–20 — specifically the three consecutive "No / forfeited / never" answers  
**Problem:**

The FAQ section appears below the CTA buttons — this is where high-intent visitors go when they have a specific objection or want to understand the terms before committing. It is the due-diligence section. These are the four answers a careful reader encounters in sequence:

> Q: "Do you automatically book my monthly appointment?"  
> A: "No. You are responsible for making your booking each month." *(line 17)*

> Q: "What happens if I forget to book?"  
> A: "That month's service is forfeited. Memberships do not include rollovers, credits, or catch-up appointments." *(line 18)*

> Q: "Can I use two details the following month if I missed one?"  
> A: "No. No catch-up details are arranged." *(line 19)*

> Q: "Will you remind me each month?"  
> A: "We generally do not send monthly booking reminders." *(line 20)*

Four consecutive questions answered with a variation of "No, and if you forget, that's your problem." This is not just cold — it directly contradicts the Membership page's own sidebar (line 129): *"Know your schedule: We book your next detail before the current one finishes."*

The policies themselves may be legitimate. But the framing signals indifference to member experience. The ICP's primary membership objection — from the product marketing context — is *"I keep meaning to book a detail but I never get around to it."* The membership is supposed to solve that exact anxiety. These FAQ answers confirm it doesn't.

**Recommendation:**  
Same policies, radically different framing. Lead with what the member *can* do, not what they'll lose.

```
Q: Do you automatically book my monthly appointment?
Current: "No. You are responsible for making your booking each month."
Revised: "Bookings are made by you via our online scheduler — we recommend
locking in your slot early in each billing period to secure your preferred time."

Q: What happens if I forget to book?
Current: "That month's service is forfeited. Memberships do not include rollovers,
credits, or catch-up appointments."
Revised: "Services are allocated per billing period and don't carry over.
We recommend booking the moment your billing period starts — it takes 90 seconds
and your slot is guaranteed."

Q: Will you remind me each month?
Current: "We generally do not send monthly booking reminders."
Revised: "We don't send automatic reminders — set a calendar alert on your billing
date and you'll never miss a service."
```

The policies haven't changed. The tone no longer signals that Pristine is adversarial toward members who forget.

---

## Issue 2: The Membership Page Has Zero Member Testimonials

**Element:** Entire page — hero (lines 49–71), plan cards (lines 76–113), sidebar (lines 124–142)  
**Problem:**

The membership page asks visitors to commit to a recurring direct debit — the highest-friction conversion on the entire site. Social proof is most powerful when it matches the specific commitment being asked. The product marketing context contains an ideal membership testimonial:

> *"Six months of school-run punishment and it still looks showroom. Membership has paid for itself."* — Priya S., 2023 Range Rover Sport

This quote does three things no other copy on the page does:
1. Proves the membership delivers on its "consistent maintenance" promise over real time (6 months)
2. Addresses the most common usage context (school runs = high-frequency, wear-prone driving)
3. Uses the exact phrase "Membership has paid for itself" — which is the core objection being handled (is $149/mo worth it?)

Instead of this quote, the sidebar "What members love" section (lines 127–141) lists three generic benefit headings — **"Know your schedule," "Save without compromise," "Priority service"** — written in brand voice rather than member voice. These read as features, not proof.

The sidebar's first benefit also promises "We book your next detail before the current one finishes" (line 130), which the FAQ directly contradicts. A member testimonial replaces this invented claim with a real one.

**Recommendation:**  
Add Priya S.'s testimonial as a standalone blockquote directly above the CTA buttons at line 114, between the plan cards and the "Select plan" / "Book member service" buttons:

```tsx
<blockquote style={{ marginTop: 32, marginBottom: 8, padding: '20px 24px',
  borderLeft: '3px solid #C89B37', background: '#F8F7F3' }}>
  <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-2)', fontStyle: 'italic' }}>
    "Six months of school-run punishment and it still looks showroom.
    Membership has paid for itself."
  </p>
  <cite style={{ marginTop: 10, display: 'block', fontSize: 13,
    color: 'var(--ink-3)', fontStyle: 'normal' }}>
    — Priya S., 2023 Range Rover Sport
  </cite>
</blockquote>
```

This is the single highest-ROI change available on this page given existing assets.

---

## Issue 3: Essential Plan's Value Case Doesn't Hold Up to Scrutiny

**Element:** Essential plan card, lines 29–34, description line 38  
**Problem:**

The Essential plan is:
- $99/mo  
- Includes: "Monthly wash + seal", "Priority booking", "Member support"

A one-off maintenance wash from Pristine starts at $99 (per the product marketing context: "Maintenance Detail: from $99"). A potential member doing basic math will conclude: *"I'm paying $99/mo for a service that costs $99 one-off — with none of the rollover flexibility and the requirement that I remember to book it."*

The value proposition for Essential only works if:
- (a) the member price for the wash+seal is meaningfully lower than $99, making the membership a discount, OR
- (b) priority booking has tangible dollar or convenience value, OR
- (c) the $99 one-off price gets meaningfully higher if booked without a membership

None of these are communicated on the page. The Essential plan description (line 38) — *"Light protection and a monthly exterior refresh for city drivers"* — says nothing about what the member is saving or why $99/mo is better than $99 per booking.

This ambiguity pushes price-aware visitors toward the Signature plan (better value math) or out of the funnel entirely. It also makes Essential feel like a decoy rather than a genuine offer.

**Recommendation:**  
Either (a) make the Essential savings explicit in the plan description ("your monthly wash+seal as a member is $XX — a saving of $XX on standard pricing") or (b) reposition Essential away from wash-and-seal to something that's clearly additive — e.g., emphasising the priority booking benefit in concrete terms: *"Guaranteed same-week availability in Melbourne's Inner East and Bayside — no waiting for a slot."*

If the pricing structure genuinely doesn't deliver a discount at the Essential tier, that's a product issue, not a copy issue — and worth flagging to whoever sets membership pricing.

---

## Quick Win — FAQ Copy Reframe (Issue 1)

**Location:** `faqs` array, line 20  

**Before:**
> "We generally do not send monthly booking reminders. We will contact you only if there is a rainy day, weather issue, or cancellation from our side."

**After:**
> "We don't send automatic booking reminders — we recommend setting a recurring calendar alert on your billing date. Takes 30 seconds to set up and you'll never miss a service."

**Why:** Same information, opposite emotional register. The original implies Pristine's indifference; the rewrite gives the member a simple action and frames it as a tip, not a disclaimer. Takes 2 minutes to implement.

---

## Bigger Bet — A/B Test: Membership Testimonial Above Primary CTAs

**Hypothesis:** Adding Priya S.'s quote (Issue 2) directly above the CTA buttons at line 114 will increase "Book member service" click-through by 20–30% for visitors who scroll past the plan cards.

**Rationale:**  
Visitors who reach line 114 have read both plan cards and have intent but haven't converted. At this scroll depth, the primary barrier is anxiety: "Will this actually be worth it? Will they show up? Will my car really look that good?" A membership-specific testimonial that mentions a real time period (6 months), a real car (Range Rover Sport), and uses the phrase "paid for itself" answers all three in one sentence.

**Control:** Current layout — plan cards → CTA buttons → T&Cs disclaimer  
**Variant:** Plan cards → Priya S. testimonial blockquote → CTA buttons → T&Cs disclaimer  

**Primary metric:** Click-through on "Book member service" or "Select plan" (whichever is fixed first) among users who scroll to plan section.  
**Secondary:** Scroll depth past FAQ section (indicates reduced anxiety, more research confidence).  
**Minimum run:** 3 weeks given low-volume conversion environment. Declare winner at 90% confidence minimum.

---

## Summary Prioritisation

| Priority | Issue | Effort | Expected Impact |
|---|---|---|---|
| **P0 — Blocking** | Dead "Select plan" button *(flagged 3 times)* | 30 mins | Zero plan-to-booking conversions without this |
| **P0 — Trust** | Aside contradicts FAQ on booking responsibility *(flagged 3 times)* | 15 mins | Trust destruction at decision point |
| **P1 — Immediate** | Add Priya S. testimonial above CTAs (Issue 2) | 1 hour | Highest-ROI change available on the page |
| **P1 — Immediate** | Reframe FAQ "No/forfeited/no" answers (Issue 1 + Quick Win) | 45 mins | Converts due-diligence readers into members |
| **P1 — This sprint** | Mobile differentiator absent *(from June 2)* | 2 hours | Core value prop invisible to all visitors |
| **P1 — This sprint** | Inline `gridTemplateColumns` blocks mobile stacking *(from June 2)* | 1 hour | All mobile traffic affected |
| **P2 — This sprint** | Dollar-anchor the 35% savings claim *(from June 2)* | 30 mins | Converts high-intent fence-sitters |
| **P2 — This sprint** | Essential plan value case (Issue 3) | 1 hour | Reduces plan confusion / drop-off |
| **P3 — Next sprint** | Testimonial A/B test (Bigger Bet) | Medium | 20–30% CTA click uplift hypothesis |
