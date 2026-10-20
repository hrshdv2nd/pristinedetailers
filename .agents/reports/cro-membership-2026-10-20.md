# CRO Audit — Membership Page
**Date:** 2026-10-20
**Auditor:** Riley (CRO Analyst)
**Assigned file:** `components/pages/membership.tsx` (does not exist — see Structural Finding)
**Week:** 43 (Cycle Week 3 → Membership)

---

## STRUCTURAL FINDING — The Membership Page No Longer Exists

`components/pages/membership.tsx` has been removed from the codebase. The route it backed — `/membership` — is now handled by `app/membership/page.tsx` (line 1–5), which is a bare next.js `redirect('/services')`.

Every visitor or inbound link that reaches `/membership` is silently bounced to the services page, which contains zero membership information — no plans, no pricing, no sign-up path.

**Evidence of live membership product:** `actions/membership.ts` contains working Stripe checkout and billing portal logic. `components/portal/customer/membership-client.tsx` shows plan management UI. The cancellation policy and privacy policy both reference membership subscriptions. The backend exists; the front door to it has been deleted.

**Previous audits this cycle:** The June 2026 audit series (three reports, 2026-05-05 through 2026-06-30) documented a standalone membership page with a broken CTA button, contradictory copy, and seven unresolved issues. At some point between June 30 and today, that page was removed. Given the number of unfixed issues, the removal appears to have been a simplification decision rather than a replacement strategy. The replacement strategy never shipped.

This audit covers **three new issues** measured against the current state of the site, not the deleted page.

---

## Page Context

- **Type:** Membership / subscription acquisition funnel
- **Primary goal:** Convert a Melbourne car owner browsing `/membership` into an Essential ($99/mo) or Signature ($149/mo) subscriber
- **Actual state:** The page is a redirect to a services page that makes no mention of membership
- **Traffic sources affected:** Any organic search for "Pristine Detailers membership", internal nav links to `/membership`, any past email or campaign links, any social posts referencing the membership URL

---

## Issue 1 — `/membership` Redirects to a Page With No Membership Information

**Element:** `app/membership/page.tsx`, line 4 — `redirect('/services')`

**Problem:**

The entire membership acquisition funnel is broken at the entry point. A visitor who arrives at `/membership` — whether from a Google search, a referral link, an old social post, or the homepage's membership card (per the July 2026 design spec) — lands on the services page. The services page (`components/pages/services.tsx`) covers ceramic coating, graphene coating, PPF, leather/glass/wheel add-ons, and window tinting. The word "membership" does not appear anywhere in its source code. There is no pricing for a subscription, no plan comparison, no sign-up path.

The conversion path is: **membership intent → `/membership` → `/services` → confusion → exit**.

This is not a CRO problem that can be fixed with copy. The conversion path has been physically removed.

**Recommendation:**

Option A (fastest): Restore a minimal `/membership` page with the two plan cards (Essential $99/mo, Signature $149/mo), a single CTA per plan that sends authenticated users to Stripe checkout and unauthenticated users to account creation, and the Priya S. testimonial recommended in the June 2026 audit. The checkout infrastructure (`startMembershipCheckout` in `actions/membership.ts`) already works.

Option B (faster still, if the page removal was intentional): Pick a destination. Either redirect `/membership` to the `/dashboard/membership` portal (where users can select and start a plan — though Issue 2 below shows that also fails), or add a membership section to the services page. A redirect-to-nowhere is worse than either of these.

---

## Issue 2 — The Portal Membership Page Dead-Ends Non-Members Back to Services

**Element:** `components/portal/customer/membership-client.tsx`, line 79 — `<a href="/services" ...>View Plans</a>`

**Problem:**

A logged-in customer who does not yet have a membership sees:

> "No Active Membership"
> "Choose a plan to start booking premium care."
> **[View Plans]** → links to `/services`

This link sends them back to the services page, which — as established — has no membership information. The user is now in a logged-in loop: portal says "go to services to see plans", services has no plans, `/membership` redirects back to services.

The `startMembershipCheckout(planId)` function in `actions/membership.ts` (lines 56–83) is fully wired: it creates a Stripe customer, looks up the plan's `stripe_price_id`, and redirects to a hosted checkout session. The function is never called from any public UI because there is no UI that passes it a `planId`.

**Recommendation:**

Replace the "View Plans" → `/services` link in `membership-client.tsx` line 79 with inline plan cards that call `handleCheckout(planId)` directly. The plan data already comes from Supabase via `getMembershipStatus()` — extend the query or make a second `getMembershipPlans()` query to fetch available plans for the non-member state. At minimum, hard-code the two plan IDs as a temporary fix until the public page is restored.

This change takes ~2 hours and immediately gives every logged-in non-member a path to subscribe.

---

## Issue 3 — The Services Page Hero Is Invisible to Membership Intent Traffic

**Element:** `components/pages/services.tsx`, lines 127–136 (hero section)

**Problem:**

The services hero copy is:
> "We treat every car like the one we drive."
> "From ceramic and graphene coatings to long-term PPF installations, we make premium protection feel effortless."

This is good copy for organic services traffic. It is entirely wrong for a visitor who just followed a `/membership` link, read a social post about Pristine's membership program, or wants to understand the ongoing-care angle of the business.

The services page currently shows six one-off services: ceramic coating ($750), graphene coating ($999), PPF ($3,000), leather coating ($250), glass coating ($150), wheel coating ($200), window tinting ($200). None of these have a recurring price or a membership sign-up path. The lowest one-off price visible is $150. A prospect looking for the $99/mo membership option sees nothing remotely close to it and no explanation of why.

This affects the services page itself, not only membership traffic — the business has a recurring revenue product that is completely invisible to all visitors of its most important conversion page.

**Recommendation:**

Add a membership section at the bottom of the services page — below the "Why we're different" differentiators block (`components/pages/services.tsx`, lines 260–277) and above the social proof section — with the two plan tiers, a "From $99/mo" price anchor, and a link to `/dashboard/membership` (which requires sign-up, creating an account-acquisition touchpoint). This is lower-friction than rebuilding the standalone page and ensures membership is visible to all services traffic regardless of how they arrived.

---

## Quick Win — Fix the Portal "View Plans" Link (Issue 2)

**Location:** `components/portal/customer/membership-client.tsx`, line 79

**Before:**
```tsx
<a href="/services" style={{ ... }}>
  View Plans
</a>
```

**After:**
```tsx
<a href="/dashboard/membership#plans" style={{ ... }}>
  View Plans
</a>
```

This is a placeholder fix while the real plan-selection UI is built. Linking to the same page with a `#plans` anchor (once plan cards are added — see Issue 2) keeps the user in the portal instead of bouncing them to a page that has no membership information. Even as a temporary no-op it stops the current circular loop.

**Two-minute change. Stops the worst-case UX path immediately.**

---

## Bigger Bet — Restore the Membership Public Landing Page

**Hypothesis:** Restoring a public `/membership` page with the two plan cards, the Priya S. testimonial, and direct-to-checkout CTAs will generate measurable membership sign-ups within 30 days. Currently, zero sign-ups are possible via the public site regardless of traffic volume.

**Rationale:**

The membership product has a working backend:
- Stripe checkout: `createMembershipCheckout()` in `lib/stripe.ts`
- Plan management: `openBillingPortal()` in `actions/membership.ts`
- Customer portal: `/dashboard/membership` fully functional for active members

The only missing piece is a public page that lets a prospect see the plans and click "Join". The June 2026 audit already identified the Priya S. testimonial as the highest-ROI trust signal available ("Six months of school-run punishment and it still looks showroom. Membership has paid for itself." — Range Rover Sport owner). That asset should anchor the rebuilt page.

**Minimum viable version:**
- H1: Something with specificity, e.g. "Monthly care for Melbourne cars that can't afford to look ordinary."
- Two plan cards: Essential ($99/mo — monthly wash-and-seal, priority booking) and Signature ($149/mo — full interior+exterior, first priority)
- Priya S. testimonial above the plan CTAs
- CTA flow: unauthenticated → create account; authenticated → Stripe checkout

**Control:** Current state — zero conversions possible from public site.
**Variant:** New page with plan cards and checkout CTAs.
**Primary metric:** Membership sign-ups per 100 sessions on `/membership`.
**This is not an A/B test — there is no current variant to test against. Ship the page.**

---

## Summary Prioritisation

| Priority | Issue | File | Effort | Expected Impact |
|---|---|---|---|---|
| **P0** | `/membership` redirects to a page with no membership info | `app/membership/page.tsx:4` | 1–2 hours (quick fix: redirect to `/dashboard/membership`) | Stops every membership-intent visitor from hitting a dead end |
| **P0** | Portal "View Plans" loops back to services | `membership-client.tsx:79` | 30 mins | Stops authenticated non-members from circular dead-end |
| **P1** | Services page has no membership section | `services.tsx:260` | 3–4 hours | Membership visible to all services-page traffic |
| **P1** | Restore standalone `/membership` public page | New file | 1 day | Full acquisition funnel restored; enables any membership growth |
| **P2** | Inline plan cards in portal for non-members | `membership-client.tsx` | 2 hours | Removes the last gap in the post-login conversion path |

The membership product has zero public acquisition path. Fix the redirect first — 30 minutes — then build the full page.
