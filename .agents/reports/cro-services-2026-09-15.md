# CRO Audit — Services Page
**Date:** 2026-09-15  
**Auditor:** Riley (CRO Analyst)  
**File:** `components/pages/services.tsx`  
**Page:** `/services`  
**Cycle week:** 38 (mod 4 = 2 → Services)

---

## Context

Traffic to this page is research/comparison-mode. Visitors have already heard of Pristine — they're asking "which service do I need, and is this the right studio?" The page's job is to collapse that decision anxiety and route them to a booking. Primary conversion goal: **Book this service** CTA at `line 236`.

---

## Issue 1 — Hero headline fails the 5-second test

**Element:** `<h1>` at `line 130`  
**Current copy:** *"We treat every car like the one we drive."*

**Problem:** This is a brand sentiment line, not a services-page value proposition. A visitor who landed from a Google search for "ceramic coating Melbourne" hits this headline and learns nothing about what services exist, what they cost, or why Pristine is different. By the time they absorb it, they've already started scanning for something more concrete. It belongs on an About page, not here.

**Recommendation:** Replace with a headline that names the service category, the location, and the differentiator — all within one line. This is the one place on the page where every visitor's eyes land first.

Suggested copy: **"Certified ceramic, graphene & PPF. Melbourne studio. Warrantied results."**

That's 9 words. A visitor scanning on mobile knows exactly where they are and why it's worth staying.

---

## Issue 2 — Add-ons mixed with primary services in the selector, creating decision paralysis

**Element:** Service selector pills, `lines 151–171`  
**Affected services:** Leather Ceramic Coating (`line 83`), Glass Coating (`line 95`), Wheel Coating (`line 101`)

**Problem:** The selector renders 6 services at identical visual weight in a single horizontal row: Ceramic & Graphene, PPF, Leather Ceramic, Glass Coating, Wheel Coating, Mobile Window Tinting. The three add-ons each already carry the label `"Add-on to any coating or PPF service"` in their `label` field (`lines 88, 97, 102`) — but that label only appears *inside* the detail card, after the visitor has clicked through. In the selector row, there's no distinction.

For the New Car Owner persona (the highest-value ICP segment), this looks like 6 separate decisions to make. They freeze. The add-ons aren't independent purchase decisions — they're upsells once a primary service is chosen.

**Recommendation:** Visually separate the selector into two groups using a section break or light heading:  
- **Primary services:** Ceramic & Graphene, PPF, Window Tinting  
- **Add-ons:** Leather Ceramic ($250), Glass ($150), Wheel ($200)  

A simple `<div>` separator with a small label `"Add-on services"` before the last three pills solves this without a design overhaul. It tells the visitor the add-ons are extras, not starting points.

---

## Issue 3 — "Talk to our team" section creates a trust mismatch and blocks mid-funnel visitors

**Element:** Bottom CTA section, `lines 314–326`  
**CTA label:** `"Book a call"` at `line 321–322`  
**BOOKING_URL destination:** `https://link.upscalerhq.com/booking/pristine-detailers`

**Problem:** The section eyebrow says "Need help choosing?" and the body says "We'll recommend the right plan based on your vehicle, schedule, and protection needs." This sets the expectation of a consultation — a low-friction "talk to us first" path. But the single CTA sends the visitor to the booking flow. That's a mismatch: the copy says *consultation*, the button destination says *commit*.

Mid-funnel visitors — people who want to ask "is PPF right for my Porsche?" before booking — hit this section, expect a way to enquire, and find only a booking link. They bounce. There's no SMS, no email, no WhatsApp path.

**Recommendation:** Two options (pick one):  
1. **Keep the section purpose, add a real enquiry path:** Add a secondary "Text us a question" link (or WhatsApp/SMS) alongside the CTA. This matches "Need help choosing?" with an actual low-friction answer.  
2. **Align the CTA to the destination:** Change the CTA label to `"Book this service"` and the eyebrow to `"Ready to protect your car?"` — drop the consultation framing, own it as the final booking prompt.

Option 2 is the quicker implementation. Option 1 likely captures more mid-funnel leads.

---

## Quick Win — Hero subheading copy

**Element:** Hero `<p>` at `line 132–134`  
**Current:** *"From ceramic and graphene coatings to long-term PPF installations, we make premium protection feel effortless."*

**Problem:** "Feel effortless" is a process claim about the customer experience, not an outcome about the car. The ICP cares about what happens to the paint — not how smooth the booking feels. "Feel effortless" also slightly undersells: it sounds like a convenience play, not a craft-and-certification play.

**Before:**
> From ceramic and graphene coatings to long-term PPF installations, we make premium protection feel effortless.

**After:**
> Ceramic coating, graphene coating, and PPF — applied by certified technicians with manufacturer warranties up to 9 years.

The revision names the three primary services (good for SEO and 5-second scanning), drops the vague benefit, and immediately replaces it with the two strongest credibility signals: *certified technicians* and *9-year warranty*.

---

## Bigger Bet — Replace the service selector with a jobs-based decision guide

**Current state:** Horizontal pill selector (`lines 141–171`) assumes visitors know what ceramic, graphene, PPF, and glass coating each mean and which one they need.

**The bet:** Most visitors to this page are in the New Car Owner or Time-Poor Professional persona. They don't arrive thinking "I want a graphene coating" — they arrive thinking "I bought a Porsche and I don't want to ruin the paint." The current UI maps to Pristine's product taxonomy; it should map to the customer's job-to-be-done.

**Test hypothesis:**  
Replace the service selector with three entry-point cards at the top of the section:

| Card | Headline | Routes to |
|------|----------|-----------|
| Card A | "New car — protect it from day one" | Ceramic/Graphene detail (with PPF upsell mention) |
| Card B | "High-risk areas — stop stone chips before they happen" | PPF detail |
| Card C | "I already have a coating — I need add-ons" | Add-ons group |

Each card is a single click. The full selector stays below as a secondary "Browse all services" fallback for the Car Enthusiast persona who already knows what they want.

**Why it might win:** It removes the "which one do I need?" anxiety at the top of the page, mirrors the language in the Jobs to Be Done section of the PMC (`"Protect my paint from Melbourne's roads... before damage happens"`), and surfaces the PPF upsell to ceramic buyers naturally — which is exactly the combination Pristine recommends (`line 80`: "Stack with ceramic for maximum long-term defence").

**How to test:** Run original selector vs. jobs-based entry cards on `/services`. Primary metric: click-through to booking from the services detail card. Secondary: which service panel gets the most "Book this service" clicks.

---

## Summary table

| # | Element | Line(s) | Severity | Effort |
|---|---------|---------|----------|--------|
| 1 | Hero `<h1>` — brand line instead of value prop | 130 | High | Low |
| 2 | Service selector — add-ons mixed with primary services | 151–171 | Medium | Low |
| 3 | "Talk to our team" CTA mismatch | 314–326 | Medium | Low–Medium |
| QW | Hero `<p>` — vague benefit, swap for proof | 132–134 | Medium | Low |
| BB | Jobs-based decision guide replacing pill selector | 141–171 | High | High |
