# CRO Audit — Membership Page (Routed: /services)
**Date:** 2026-08-25  
**Auditor:** Riley (CRO Analyst)  
**File:** `components/pages/services.tsx`  
**Week:** 35 (Cycle Week 3 → Membership)  
**Route note:** `app/membership/page.tsx` (line 4) redirects all `/membership` traffic to `/services` — this audit covers the services page as the live destination for all membership traffic.

---

## Structural Flag: /membership Sends Visitors to a Page With No Membership Content

Before the issue-specific audit, this must be documented.

`app/membership/page.tsx` line 4 contains `redirect('/services')`. The services page (`components/pages/services.tsx`) contains:

- **Zero** dedicated membership sections
- **Zero** plan comparison (Essential $99/mo vs. Signature $149/mo)
- **Zero** "Join membership" CTAs
- **One** mention of "Essential membership" — as a label in the Maintenance Detail card at line 34

Any visitor arriving from organic search ("mobile car detailing membership Melbourne"), a homepage membership CTA, or a direct `/membership` link lands on a generic services page with no path to convert to a membership. The membership product literally cannot be purchased from this page.

This is upstream of copy — it is a routing and page-architecture gap. Fix options:
1. Restore a dedicated `/membership` page with plan cards, testimonial, and a working sign-up CTA
2. Add a membership plan section to the services page (above the service selector or as a dedicated section before the footer)
3. At minimum: route the redirect to a contact/enquiry form with the subject "Membership enquiry" rather than a generic services page

The three issues below are real conversion problems on the services page regardless — but they are secondary to the fact that membership visitors currently have no conversion path at all.

---

## Issue 1: "Studio-grade equipment" differentiator says Pristine has a studio

**Element:** `DIFFERENTIATORS` array, `components/pages/services.tsx:20`

**Problem:**  
The "Why we're different" section (lines 183–199) renders four cards. The first:

> **Studio-grade equipment**  
> "A dedicated detailing space with the tools casual detailers simply don't have."

"A dedicated detailing space" is the exact opposite of what Pristine is. The business's one-liner is *"Melbourne's premium mobile car detailing service — we come to you."* No studio. No detailing space a customer visits.

A visitor comparing Pristine to fixed studios (the primary competitor type per the product marketing context) will read "dedicated detailing space" and conclude Pristine is also a drop-off location — eliminating the primary differentiator. The "Why we're different" section is read at the decision point, immediately before a visitor clicks "Book this service." Introducing this confusion here is maximally damaging.

**Recommendation:**  
Replace with a differentiator that makes the mobile premise explicit:

```
Current:
{ title: 'Studio-grade equipment', desc: 'A dedicated detailing space with the tools casual detailers simply don\'t have.' }

Replacement:
{ title: 'Mobile — we come to you', desc: 'We bring studio-grade equipment to your home, office, or car park. No drop-off, no waiting room, same results.' }
```

The "studio-grade equipment" claim is preserved in the description. "Dedicated detailing space" is removed. The mobile advantage leads — which is correct given the ICP's primary pain point is logistics.

---

## Issue 2: Hero sub-heading uses "studio detail appointments" — the exact phrase that frames Pristine as a workshop

**Element:** Hero section, `components/pages/services.tsx:89`

**Problem:**  
The hero sub-heading reads:

> "From studio detail appointments to long-term ceramic and PPF installations, we make premium service feel effortless."

"Studio detail appointments" implies the customer visits a studio. This is the second sentence on the page — before the service selector, before the differentiators, before any mention of mobile. The ICP's switching trigger (from the product marketing context) is: *"Frustrated by needing to drop off at a workshop."* The word "studio" activates that exact pain and names Pristine as the source of it.

The hero headline (line 87) — "We treat every car like the one we drive." — is craft-focused and says nothing about mobile or come-to-you. Two sentences into the page, the primary differentiator has not appeared once.

**Recommendation:**  
Rewrite line 89 to put "mobile" in the first seven words and pre-empt the quality objection in the same sentence:

```
Before:
"From studio detail appointments to long-term ceramic and PPF installations, we make premium service feel effortless."

After:
"We come to your home, office, or car park across Melbourne — from a monthly wash-and-seal to a full ceramic or PPF install. Same results as a fixed studio, without the drop-off."
```

This is also the Quick Win below. Implementation: one line, five minutes.

---

## Issue 3: "Book a call" CTA links to a service booking form — intent mismatch at the exact visitor who most needs guidance

**Element:** Closing CTA section, `components/pages/services.tsx:243`

**Problem:**  
The closing dark section (lines 236–248) is designed for visitors who've seen the full page but haven't committed — the high-value, uncertain segment. It reads:

> **Talk to our team.**  
> "We'll recommend the right plan based on your vehicle, schedule, and protection needs."  
> [**Book a call**]

This copy promises a consultation. The visitor clicks expecting to schedule a conversation with someone who will help them decide.

But `BOOKING_URL` (line 17) — the link target — is `https://link.upscalerhq.com/booking/pristine-detailers`, a transactional service booking flow. Clicking "Book a call" expecting guidance drops the visitor into a form that assumes they've already decided what service to book.

The damage is two-fold:
1. **Intent mismatch:** The visitor who clicks "Book a call" has explicitly said they don't know which service to choose. The booking form presupposes they do.
2. **Trust break:** The CTA copy is warm and advisory. The booking flow is transactional. The shift breaks rapport at the highest-value conversion moment on the page — the undecided visitor considering a $999 ceramic or $3,000+ PPF job.

**Recommendation:**  
Preferred fix — route this CTA to the contact page, not the booking flow:

```tsx
// Line 243: change href from BOOKING_URL to "/contact"
// Keep or improve the button text:
<Link href="/contact" className="pd-btn pd-btn-primary" style={{ marginTop: 28 }}>
  Get a recommendation
</Link>
```

If `/contact` doesn't have a clear "I need help choosing a service" option, a `?subject=service-recommendation` param or a dedicated form would be better still. The booking flow should remain at the service-level "Book this service" buttons (line 159), which are correctly placed and correctly copy'd.

---

## Quick Win — Hero sub-heading: replace "studio" with "we come to you" in one line

**Location:** `components/pages/services.tsx:89`

**Before:**
> "From studio detail appointments to long-term ceramic and PPF installations, we make premium service feel effortless."

**After:**
> "We come to your home, office, or car park across Melbourne — from a monthly wash-and-seal to a full ceramic or PPF install. Same results as a fixed studio, without the drop-off."

**Why it's a quick win:** Single line, no dependencies, no design changes. Removes "studio" framing that contradicts the mobile premise, adds "we come to you" in seven words, names the service range, and pre-empts the top objection ("can mobile be as good as a fixed studio?") in the same sentence — using language directly from the product marketing context objection table. Estimated implementation: 5 minutes.

---

## Bigger Bet — A/B test: craft-first headline vs. convenience-first headline

**Hypothesis:** The current hero headline "We treat every car like the one we drive." is a craft and care signal that resonates with enthusiasts (secondary ICP) but undersells the convenience benefit (mobile, come-to-you) that drives decisions for the primary ICP (time-poor professional). Testing a convenience-first headline will reveal which message produces more service selector clicks and booking conversions.

**Control:**
> "We treat every car like the one we drive."

**Variant:**
> "Premium car detailing, at your door."

**Rationale:**  
The primary ICP chooses Pristine because of "no logistics" — not because of craft. Per the product marketing context, their switching trigger is "Frustrated by needing to drop off at a workshop." The variant front-loads the mobile benefit in four words and reserves the quality/craft signal for the sub-heading. The current headline requires the visitor to infer the mobile benefit; the variant makes it explicit.

**Primary metric:** Click-through on any "Book this service" button (lines 159/243)  
**Secondary metric:** Scroll depth past the service selector (indicates engagement vs. immediate exit)  
**Minimum run:** 3 weeks, 90% confidence threshold  
**Dependency:** Run only after fixing Issue 2 (hero sub-heading), so the sub-heading reinforces whichever headline is in the variant rather than contradicting it.

---

## Summary

| Priority | Issue | Location | Effort |
|---|---|---|---|
| **P0 — Structural** | `/membership` has no membership content | `app/membership/page.tsx:4` | High |
| **P1 — Brand contradiction** | "Studio-grade equipment" says Pristine has a studio | `services.tsx:20` | 10 min |
| **P1 — Copy contradiction** | "studio detail appointments" in hero sub | `services.tsx:89` *(Quick Win)* | 5 min |
| **P1 — CTA mismatch** | "Book a call" links to service booking flow | `services.tsx:243` | 15 min |
| **P2 — Test** | Craft vs. convenience hero headline | `services.tsx:87` | 3 weeks |
