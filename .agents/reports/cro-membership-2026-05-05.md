# CRO Audit — Membership Page
**Date:** 2026-05-05  
**Auditor:** Riley (CRO Analyst)  
**File:** `components/pages/membership.tsx`  
**Week:** 19 (Cycle Week 3 → Membership)

---

## Page Context

- **Type:** Membership/Pricing page  
- **Primary goal:** Get visitor to join Essential ($79/mo) or Signature ($149/mo) plan  
- **ICP:** Time-poor Melbourne professional, $30K+ car, Toorak/Brighton/Bayside  
- **Key promise from product-marketing-context.md:** Set-and-forget protection. We come to you.

---

## Issue 1: The Primary CTA Is a Dead Button

**Element:** `<button className="pd-btn pd-btn-dark">Select plan</button>` — line 112  
**Problem:** This button has no `onClick` handler and no `href`. Clicking it does nothing. Meanwhile the actual conversion action — `"Book member service"` at line 113 — is styled as `pd-btn-ghost` (secondary/muted). The CTA hierarchy is inverted AND the primary-styled button is broken.

A visitor who reads both plan cards, decides on Signature, and clicks the dark "Select plan" button gets zero feedback and zero path forward. They've hit a dead end at the moment of highest intent.

**Recommendation:**  
Wire "Select plan" to navigate to the booking URL with the selected plan pre-selected as a query param (e.g. `?plan=signature`), OR replace "Select plan" with a direct booking link matching the current `plan` state. Promote "Book member service" to `pd-btn-dark` and remove or demote "Select plan" if it has no functional destination.

---

## Issue 2: The Aside Directly Contradicts the FAQ

**Element:** Aside card "What members love" → "Know your schedule" block — line 126–128  
vs. FAQ answers — lines 17–20

**Problem:** Line 127 says: *"We book your next detail before the current one finishes, so your car stays on track."*

The FAQ (lines 17–20) says the exact opposite:  
- "No. You are responsible for making your booking each month."  
- "We generally do not send monthly booking reminders."  
- Missed months are forfeited, no rollovers, no catch-ups.

Any visitor who reads the aside and then the FAQ will spot this. For a professional ICP who chose Pristine over cheaper operators *because* they trust expert claims, this contradiction is trust-destroying. The aside is making a promise the FAQ explicitly breaks.

**Recommendation:**  
Rewrite the "Know your schedule" benefit to reflect reality. The honest version is still a sell: priority booking access means *when* you're ready to book, you get served first. That's a real benefit. Lean into it accurately:

> "Priority access means you're never waiting weeks for a slot. When you're ready to book, you're first in."

Delete the fabricated "we book it for you" claim entirely.

---

## Issue 3: The H1 Wastes Its Position on a Tautology

**Element:** `<h1>` at line 54  
**Current copy:** *"Membership for every level of care."*  
**Problem:** Three things wrong here:

1. **Redundant:** The page is already labelled "Membership" by the Nav active state and the eyebrow directly above this H1 (line 53). The H1 restates what the visitor already knows.
2. **Vague:** "Every level of care" says nothing. It doesn't tell the ICP — a time-poor BMW owner in Toorak — what they get, how often, or why it's worth $79–$149/month.
3. **Missing the core hook:** The entire business differentiator is "mobile, come to you." The H1 doesn't mention it. The subhead (line 55) mentions saving on services but buries the time-poor angle — which is the ICP's actual pain point.

A visitor landing here from Google "car detailing membership Melbourne" needs to know within 3 seconds: what they get, why it's designed for them, and that it comes to them. None of that is in the H1.

**Recommendation:** See Quick Win below.

---

## Issue 4 (Bonus): "Bi-Monthly Detail" Is Ambiguous and Undersells

**Element:** Signature plan benefits list — line 38  
**Current:** `'Bi-Monthly Detail'`  
**Problem:** In Australian English, "bi-monthly" means every two months to most readers. If the Signature plan at $149/mo only includes a detail every *two* months, the Essential plan at $79/mo (monthly wash + seal) appears to offer more frequent service at half the price. The Signature plan description says "maintenance detailing" but the benefit label creates unnecessary confusion.

**Recommendation:** Replace with explicit frequency: `'Monthly full detail'` or `'Full detail every visit'`. Clarity beats cleverness here.

---

## Quick Win — H1 Copy Change

**Location:** Line 54

**Before:**
> "Membership for every level of care."

**After:**
> "Your car, always looked after. We come to you."

This version: (1) leads with the outcome the ICP wants, (2) answers "why membership vs. one-off" (always = ongoing), (3) states the mobile differentiator in four words. Same character count, dramatically higher relevance.

Alternative if the brand voice feels this is too casual:
> "Consistent, professional care. At your home, office, or car park."

---

## Bigger Bet — A/B Test: Replace Generic Aside with Real Member Testimony

**Current:** The "What members love" aside (lines 121–138) is three generic benefit blurbs with no attribution, no specificity, and no social proof weight. It reads like marketing copy, because it is.

**Test hypothesis:** Replacing the aside card with a single attributed member testimonial — name, suburb, car type, and a specific outcome — will increase plan selection clicks by 15–25%.

**Test B variant:**

Replace the entire aside card with:

```
[Photo]
"I had a Model Y that was getting hammered by the Nepean Highway. 
Since joining Signature I haven't thought about the paint once."
— James R., Frankston, Tesla Model Y
★★★★★ Signature member since 2024
```

Include one more below it:

```
[Photo]
"Saves me having to chase appointments. Priority booking means 
I'm always sorted before a big weekend."
— Sarah K., Brighton, BMW X5
★★★★★ Signature member since 2023
```

**Why this wins:** The ICP is a car owner in a named suburb, driving a named car. A testimonial from someone identical to them — same suburb, same vehicle tier — is a mirror. It collapses the "will this work for me?" objection that no amount of feature copy can answer. The FAQ section already does a good job handling logistics objections; the missing piece is social proof that the membership *actually works* for people like them.

**Measurement:** Track plan card selection clicks and "Book member service" button clicks as primary metric. Secondary: scroll depth past FAQ (currently no social proof pulls them back up).

---

## Summary Prioritisation

| Priority | Issue | Effort | Expected Impact |
|---|---|---|---|
| P0 — Fix now | Dead "Select plan" button (Issue 1) | Low | Blocking conversions today |
| P0 — Fix now | Aside contradicts FAQ (Issue 2) | Low | Trust-destroying |
| P1 — This sprint | H1 copy (Issue 3 / Quick Win) | Low | Above-fold clarity |
| P1 — This sprint | "Bi-Monthly" ambiguity (Issue 4) | Low | Reduces plan confusion |
| P2 — Test | Real testimonials in aside (Bigger Bet) | Medium | 15–25% uplift hypothesis |
