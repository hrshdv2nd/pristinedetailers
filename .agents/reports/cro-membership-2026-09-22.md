# CRO Audit — Membership Page
**Date:** 2026-09-22  
**Auditor:** Riley (CRO Analyst)  
**Week:** 39 (Cycle Week 3 → Membership)

---

## Critical State Change Since Last Audit (2026-06-30)

The `components/pages/membership.tsx` referenced in every prior membership audit **no longer exists**. The route is now:

```tsx
// app/membership/page.tsx — lines 1–5
import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/services');
}
```

The membership product still exists (dashboard, portal, terms page, and `MembershipPlan` DB type are all intact). The page was removed. Whether this was intentional — a teardown ahead of a redesign — or an accidental deletion is unclear, but the result is the same: **any user landing on `/membership` is silently dropped onto the Services page with no membership context, no plan options, and no conversion path**.

All seven issues from the June 30 escalation list are now moot — the page is gone. This audit addresses the current state of the funnel.

---

## Page Context

- **Page audited:** `/membership` route + adjacent membership touchpoints  
- **Primary goal:** Convert Melbourne car owner to a recurring monthly membership via Stripe checkout  
- **ICP:** Time-poor professional, $30K+ vehicle, values convenience and consistency  
- **Traffic sources affected:** Any inbound link to `/membership` (email, nav, social, Google) plus dashboard upsell and membership-terms back-link

---

## Issue 1: `/membership` Is a Silent Dead End — The Entire Conversion Surface Is Gone

**Element:** `app/membership/page.tsx`, line 4  
**Problem:**

`redirect('/services')` sends every prospective member to the general Services page. The Services page (`components/pages/services.tsx`) contains no membership section, no plan cards, no pricing for recurring plans, and no CTA specific to membership. A user who follows a "join our membership" email link, clicks "Membership" in the nav, or arrives from a Google ad targeting membership search queries lands on a page that talks about ceramic coatings. There is no recovery path.

The Services page CTA (line 236) reads "Book this service" and opens the external booking URL — a one-off booking flow, not a membership checkout. A high-intent membership visitor who doesn't immediately leave will book a one-off job instead of a recurring plan, or leave.

Three downstream systems still assume a membership page exists:
1. `components/pages/membership-terms.tsx`, line 93: back-link text says "← Back to membership" but `href="/services"` sends the user to Services.  
2. `components/portal/customer/membership-client.tsx`, line 79: "View Plans" button links to `/services`, where no plans appear.  
3. Any existing marketing email or social post that links to `/membership`.

**Recommendation:**  
Restore a minimal membership landing page at `app/membership/page.tsx` immediately — it does not need to be the full prior page. At minimum: a headline naming what the membership is, plan cards pulled from the active `MembershipPlan` records (the portal already renders these in `membership-client.tsx` lines 58–73 — the layout can be reused), and a Stripe checkout CTA. The infrastructure is already there; the page is the only missing piece.

---

## Issue 2: Membership-Terms Back-Link Labels `/services` as "Back to Membership"

**Element:** `components/pages/membership-terms.tsx`, line 93  
**Problem:**

```tsx
<Link
  href="/services"
  style={{ ... }}
>
  ← Back to membership
</Link>
```

A user reading the Terms & Conditions page is in the final due-diligence phase before subscribing — the highest-intent position in the funnel. When they click "← Back to membership", the link text promises to return them to the membership context. Instead, `href="/services"` drops them on the general Services page, which has no membership content. The user's research context is broken; they have to find their way back to a page that doesn't exist.

This also means Pristine is sending high-intent, terms-reading users to a page optimised for one-off bookings — likely triggering ceramic/graphene booking intent instead of the membership conversion they were closer to completing.

**Recommendation:**  
Update the `href` to point to the correct URL once the membership page is restored. In the interim, either remove the back-link or point it to `/dashboard/membership` for logged-in users.

```tsx
// Current — line 93
href="/services"

// Fix once /membership page is restored
href="/membership"
```

---

## Issue 3: Dashboard Upsell Copy Is Generic and Unanchored to Any Value

**Element:** `components/portal/customer/membership-client.tsx`, lines 76–80  
**Problem:**

```tsx
<h3>No Active Membership</h3>
<p>Choose a plan to start booking premium care.</p>
<a href="/services">View Plans</a>
```

This is the upsell shown to every logged-in customer without a membership. It's the moment with the highest conversion intent on the entire site — the user is authenticated, they've used the service before, and they're inside the customer portal. The copy wastes it.

Three specific failures:
1. **"Premium care" is undefined.** The user already had a one-off service. "Premium care" doesn't differentiate the membership from what they already bought.  
2. **"View Plans" links to `/services` where no plans exist.** The link leads to a dead end (see Issue 1).  
3. **No value hook.** The most powerful membership benefit for a repeat customer — locked-in pricing, guaranteed slots, no re-booking effort — is absent. The target customer's stated pain point is *"I keep meaning to book but I never get around to it"*; this copy doesn't address it.

**Recommendation:**  
Copy change (see Quick Win below). Link target: update to `/membership` once restored, or to `/dashboard/membership#plans` if the plan selector is added to the portal instead.

---

## Quick Win — Dashboard Upsell Copy Rewrite

**Element:** `components/portal/customer/membership-client.tsx`, lines 77–78  

**Before:**
> Choose a plan to start booking premium care.

**After:**
> Monthly maintenance, locked-in pricing, and a guaranteed slot every billing period — no chasing availability.

**Why:** Directly addresses the real objection ("I never get around to booking") and names three concrete membership benefits in the language of the ICP (professional, time-poor, owns a car they care about). Takes 2 minutes to change. Won't fully convert without fixing the "View Plans" link destination.

---

## Bigger Bet — A/B Test: Membership Checkout Within Dashboard vs. Redirect to Landing Page

**Hypothesis:** Embedding a minimal plan-selector and Stripe checkout initiation directly in the `MembershipClient` component (authenticated context) will convert more non-member portal visitors than redirecting them to an external landing page.

**Rationale:**  
The logged-in portal user has already cleared the trust barrier that a landing page exists to overcome. Sending them out to a marketing page and back reintroduces friction. The checkout action (`startMembershipCheckout` in `membership-client.tsx` line 24) already exists and works — it just isn't exposed to non-members. A two-card plan comparison (`Essential` vs `Signature`) with pricing and a single "Start Membership" button per plan, rendered directly in the `isActive === false` branch (currently lines 76–83), removes the round-trip entirely.

**Control:** Current state — non-member sees "View Plans" → `/services` redirect → dead end  
**Variant A:** Non-member sees inline plan cards + "Start [Plan Name] — $X/mo" buttons that call `startMembershipCheckout` directly  
**Variant B:** Non-member sees "View Plans" → restored `/membership` landing page → Stripe checkout  

**Primary metric:** Membership activation rate for portal visitors without an active plan  
**Secondary:** Drop-off between portal visit and checkout initiation  
**Minimum run:** 4 weeks given portal visit volume. Declare at 85% confidence — low-volume environment.

**Note:** Variant A requires fetching available `MembershipPlan` records in the dashboard server component and passing them to `MembershipClient` as a new `availablePlans` prop — the component already accepts a typed `Props` interface (line 9) that makes this straightforward.

---

## Summary Prioritisation

| Priority | Issue | File | Effort | Impact |
|---|---|---|---|---|
| **P0** | Restore `/membership` page — currently a redirect to Services | `app/membership/page.tsx` | 3–4 hours | Every `/membership` visit currently converts zero memberships |
| **P0** | Fix "View Plans" link in portal upsell | `membership-client.tsx:79` | 5 mins | After page is restored, this is the highest-traffic entry point to it |
| **P1** | Rewrite dashboard upsell copy (Quick Win) | `membership-client.tsx:78` | 5 mins | Immediate improvement regardless of page restoration |
| **P1** | Fix terms page back-link label + `href` | `membership-terms.tsx:93` | 5 mins | Stops high-intent readers bouncing to Services |
| **P2** | Inline plan-selector A/B test (Bigger Bet) | `membership-client.tsx` | 1 day | Eliminates redirect friction for highest-intent users |
