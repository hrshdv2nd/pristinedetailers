# CRO Audit — Booking Page
**Date:** 2026-10-27  
**Auditor:** Riley (CRO Analyst)  
**Page:** `/booking` — `components/pages/booking.tsx`  
**Week in rotation:** Week D (week 44)

---

## Summary

The booking flow has a structural dead-end for two of its four listed services, a missing premium product, and a misleading confirm button. Together these three issues expose the highest-intent visitors — the ones who've already clicked "Book" — to the exact friction that kills conversions for a premium service business.

---

## Issue 1 — PPF Services Dead-End Without a Fallback (Critical)

**Element:** `SETMORE_MAP` lines 29–30; `StepSchedule` lines 678–680

**Problem:** `ppf-full-front` ($2,999) and `ppf-full-car` ($7,549) have empty `serviceKey` and `staffKey` values. A user who selects either service, picks a date, and reaches Step 3 hits this message: *"Service not yet linked to Setmore - please call us to book this service."* There is no phone number, no email link, no enquiry form — just a dead sentence. This happens at Step 3, after the user has already committed time selecting a service and choosing a date. The exit rate at this point will be near 100%.

These are the two highest-value services in the catalogue. A full-car PPF job at $7,549 is 20× the margin of a Revitalise Detail. Losing that lead to a dead-end message is not a CRO problem — it's a revenue leak.

**Recommendation:** Two options in priority order:
1. Connect both PPF services to Setmore and populate their keys — the clean fix.
2. If PPF bookings require a consultation before scheduling, detect `!hasServiceKey` on Step 1 (not Step 3) and swap the "Continue" CTA to "Request a quote →" that routes to a contact/enquiry form with the service pre-filled. The user should never reach Step 3 to discover they can't book.

---

## Issue 2 — Graphene Coating Doesn't Exist in the Booking Flow (High)

**Element:** `SERVICES` array, lines 10–15

**Problem:** Graphene Coating is the business's premium differentiated product — 9-year manufacturer warranty, superior heat dissipation, the thing that separates Pristine Detailers from cheaper installers. It is listed in the product context as a primary search term ("graphene coating Melbourne") and a lead differentiator. It is completely absent from the `SERVICES` array.

The menu currently shows: Revitalise Detail, Ceramic Coating, PPF Full Front, PPF Full Car.

A user who comes from a search for "graphene coating Melbourne" lands on the booking page and has no path to book the thing they searched for. They either settle for Ceramic Coating (without knowing it's a step down) or leave.

**Recommendation:** Add graphene to the `SERVICES` array and `SETMORE_MAP`. Suggested entry:

```ts
{ id: 'graphene-3yr', name: 'Graphene Coating', price: 999, duration: '2 days' }
```

Place it between Ceramic Coating and PPF Full Front so the price ladder reads naturally: $999 → $2,999 → $7,549. Add a one-line differentiator on the card: "Denser bond than ceramic — 9yr warranty."

---

## Issue 3 — Address Field Confuses Studio Service Customers (Medium)

**Element:** `StepSchedule`, lines 714–729

**Problem:** The address input appears for every service with the helper text: *"Required for mobile window tinting · greater Melbourne."* Customers booking Ceramic Coating or PPF are studio services — they bring the car in, not the other way around. There is no studio address anywhere in the booking flow.

A user booking a $999 Ceramic Coating reaches Step 3, sees an address field, and is left uncertain: "Do I give them my address? Do I go to them? Where is the studio?" That uncertainty raises abandonment risk on a high-ticket booking. The confusion is compounded because the hint copy acknowledges the address is only *required* for tinting — implying studio customers might still need to provide one but aren't told why.

**Recommendation:** Add a conditional render. If `service === 'window-tinting'` (or equivalent mobile service ID), show the address field as required. For all other services, replace the address field with a studio location block:

```
📍 Our studio — [Street Address], [Suburb] VIC  
Drop off your car; we'll contact you when it's ready.
```

This also adds a useful micro-trust signal (physical presence = legitimacy) at the moment the customer is about to hand over their personal details.

---

## Quick Win — Fix the "Confirm & pay" Button Copy

**Element:** `StepConfirm`, line 340 (the confirm button in the parent `Booking` component)

The TOS text on line 819 says: *"A 20% deposit is charged now; the balance post-service."* The confirm button says: **"Confirm & pay $1,098.90"** (or whatever the total is). These two pieces of copy are in the same viewport and they contradict each other. The button implies the user is paying the full amount right now. This is the last thing a user reads before committing — and it's wrong.

This creates last-second hesitation or, worse, a dispute when the user sees only a 20% charge on their card and thinks the booking failed.

**Before:**
```
Confirm & pay ${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}
```

**After:**
```
Confirm booking — $${(total * 0.2).toLocaleString(undefined, { maximumFractionDigits: 2 })} deposit now
```

One-line change. Eliminates a trust gap at the exact moment of commitment.

---

## Bigger Bet — Add a Trust Bar to Step 1 (Service Selection)

**Element:** `StepService`, lines 421–484

**Hypothesis:** The service selection step (`StepService`) has no trust signals whatsoever. The only content is a heading, a one-line subheading, and the four service cards. A user who navigated here from the homepage has seen proof (4.9★, 2,400+ cars, certifications) — but a user who landed directly on `/booking` via a Google Ad or a referral link has seen nothing.

The service cards themselves also have no descriptions — just a name, duration, and price. "Revitalise Detail · 5 hrs · $385" is not enough to confirm this is the right service for someone who's never visited before.

**Test:** Variant A (control) = current bare service cards. Variant B = add:
1. A micro-trust bar above the service list: `★ 4.9 · 39 reviews · 2,400+ cars protected · Ceramic Pro certified`
2. One-line benefit copy under each service name on the card:
   - Revitalise Detail → *"Deep clean + paint decontamination — your car back to baseline"*
   - Ceramic Coating → *"8yr hydrophobic protection, bonded to your clear coat"*
   - Graphene Coating → *"Denser than ceramic, 9yr warranty, better heat dissipation"*
   - PPF Full Front → *"Physical barrier against stone chips, self-healing film"*

**Why test rather than just ship:** The service cards are also the highest-intent selector in the flow. Adding copy could slow decision-making for users who already know what they want. A/B test lets us confirm the trust payoff outweighs the added cognitive load before making it permanent.

**Primary metric:** Step 1 → Step 2 completion rate.  
**Secondary metric:** Add-on attach rate (users who understand what they bought are more likely to add leather/glass/wheel ceramic).

---

## Notes for Jordan

- Issue 1 (quick fix path) and the button copy change are both implementable without design input.
- Issue 2 (graphene) needs a Setmore service key from the ops side before the code change makes sense.
- Issue 3 requires knowing the studio address to populate the location block.
