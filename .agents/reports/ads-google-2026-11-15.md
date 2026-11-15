# Google Search Ads — Membership
**Date:** 2026-11-15 (Sunday run — prepared ahead of Monday 16 November activation)
**Week:** 47 → Rotation Week 7 (47 mod 8 = 7) → **Membership**
**Platform:** Google Search Ads (Responsive Search Ad)
**Campaign:** GOOG_Lead_Search_Membership_Melbourne_2026W47
**Landing Page:** /membership → /booking (see CRITICAL HOLD below)
**Previous Membership Google run:** Week 43 (October 2026) — 4 weeks ago

---

## ⛔ CRITICAL HOLD — Do Not Activate Until Membership Page Is Fixed

The `/membership` page currently contains a bare redirect to `/services`:

```ts
// app/membership/page.tsx
export default function Page() {
  redirect('/services');
}
```

The `/services` page has zero membership content — no plan cards, no pricing, no sign-up path.

**Any Google traffic sent to `/membership` this week converts at 0%.** The user clicks the ad, lands on the services page, sees ceramic coating and PPF, finds no $99/mo plan, and exits. Budget wasted entirely.

This was flagged as **P0** in the October 20 CRO audit. It has not been fixed in 26 days.

**Before activating these ads, one of the following must ship:**

| Fix | File | Effort | Unlocks |
|-----|------|--------|---------|
| Redirect `/membership` to `/dashboard/membership` | `app/membership/page.tsx:4` | 5 minutes | Logged-in users can reach plan management; cold traffic still dead-ends on sign-in wall |
| Add membership section to `/services` | `components/pages/services.tsx:260` | 3–4 hours | Membership visible to all services traffic immediately |
| Restore standalone `/membership` page with plan cards | New file | 1 day | Full acquisition funnel; highest-converting option |

The minimum viable fix for this campaign is Option B (membership section on `/services`) — it allows the ad to land somewhere meaningful without rebuilding a full page.

The ads below are ready to activate the moment the page is live.

---

## Seasonal Context — Week 47

Week 47 is the natural membership window in the Melbourne prestige car calendar. Three conditions converge this week that do not align at any other point:

**Christmas is six weeks away.** The gifting window for high-consideration gifts — the kind a car enthusiast would not buy themselves but would immediately understand — opens in the second week of November. A Pristine Detailers membership at $99/mo or $149/mo sits in a category that buyers recognise instantly: recurring value, specific to something they care about, relevant from day one. The buyer who searches for a "car membership Melbourne" in mid-November is often researching a gift as much as a personal purchase. The search volume for membership-adjacent terms spikes in this window and again in mid-December. Week 47 is the first beat of that cycle.

**The summer detail backlog is building.** The November–December period is when Melbourne prestige car owners realise their ceramic coating has not had a maintenance top-up since winter, their car has been through spring pollen and bird season, and they are heading into a summer of Peninsula runs, Christmas events, and New Year's driving. The buyer who has not been on a maintenance plan is now looking at their car and thinking: "I need to sort this before Christmas." A membership at $99/mo is a more considered answer than a one-off detail — it solves the ongoing maintenance problem, not just the December one.

**The PPF + ceramic combination buyer from Week 46 is now in upsell territory.** Buyers who engaged with Pristine's PPF campaign last week — who visited the service page, got a quote, or booked a PPF install — are the highest-probability membership candidates. They have already committed to a $3,000+ service. They understand that a ceramic coating on top of PPF needs periodic maintenance to retain the hydrophobic layer. The Signature plan at $149/mo, which includes ceramic top-ups, is the natural next step for this buyer. The targeting note below outlines how to reach this cohort.

---

## Responsive Search Ad — Membership Melbourne

### Headlines (30 chars max)

| # | Headline | Chars | Angle |
|---|----------|-------|-------|
| H1 | Car Membership Melbourne | 24 | Keyword anchor |
| H2 | From $99 Per Month | 18 | Entry price |
| H3 | Priority Slots. Always. | 23 | Booking access benefit |
| H4 | Gift It Before Christmas | 24 | Seasonal gifting |
| H5 | Ceramic Top-Ups Included | 24 | Coating owner upsell |

**Pin guidance:**

- **H1 ("Car Membership Melbourne") → Pin Position 1.** A buyer typing `[car membership Melbourne]` or `[monthly car detail Melbourne]` is in category evaluation mode. H1 confirms the product category and location. The job of Position 1 is to confirm the buyer is in the right place — closing happens in H2–H5 and in the descriptions.

- **H2 ("From $99 Per Month") → Pin Position 2.** The price anchor is the most important information for a buyer evaluating a subscription. $99/mo for a prestige car maintenance service is immediately legible as a reasonable premium — not cheap, but proportionate to the car value being protected. It pre-qualifies the buyer: someone who reads $99/mo and continues is already indicating budget alignment.

- **H3 ("Priority Slots. Always.") → Rotate Position 3.** Priority booking is the operational benefit that separates Pristine's membership from an ad-hoc booking. In November–December, Pristine's calendar fills for the summer. A member-first slot policy is immediately compelling to the buyer who has experienced being waitlisted for a detail heading into Christmas. Run in Position 3 when the search term indicates scheduling intent (e.g., `[prestige car detail Melbourne December]`).

- **H4 ("Gift It Before Christmas") → Rotate Position 3.** The gifting angle for the buyer searching in November–December with a car enthusiast in mind. "Before Christmas" is a natural deadline without manufactured urgency — Christmas is six weeks away and it is accurate as a timing frame. Run against buyers in Toorak, South Yarra, Brighton, Hawthorn postcode targeting in Position 3 for the November gifting window.

- **H5 ("Ceramic Top-Ups Included") → Rotate Position 3.** The upsell signal for existing ceramic and graphene coating customers. A buyer who already has a coating installed will recognise "ceramic top-ups" as the specific maintenance service their coating needs. This headline converts the buyer who already understands the product category — it surfaces a specific included benefit rather than restating the membership concept. Run in Position 3 when the search term signals existing coating ownership (e.g., `[ceramic coating maintenance Melbourne]`, `[graphene coating maintenance`).

---

### Descriptions (90 chars max)

| # | Description | Chars |
|---|-------------|-------|
| D1 | Essential $99/mo. Signature $149/mo. Priority slots. Melbourne studio. 4.9 stars. | 81 |
| D2 | Your car's on a plan. Monthly care, ceramic top-ups, priority booking. From $99 per month. | 90 |

**Why D1 works:** D1 is the information-dense close. Both plan tiers with pricing, the operational benefit (priority slots), the studio confirmation (Melbourne studio), and social proof (4.9 stars) in 81 characters. A buyer evaluating membership who reads D1 has everything they need to click: plan options, price range, the booking advantage, and a trust signal. The description does not explain what the plans include — that is the landing page's job. It presents the decision frame.

**Why D2 works:** "Your car's on a plan" is a reframe. Rather than selling a membership, D2 describes an outcome state: a car that is maintained on a schedule by a certified studio, with ceramic top-ups and priority access built in. "Monthly care, ceramic top-ups, priority booking" is a three-item benefit list — specific, concrete, in the language of a car owner who already knows what each of these means. "From $99 per month" closes with the entry price. Run D2 as primary when the search term indicates an existing ceramic coating owner (they will recognise "ceramic top-ups" as directly relevant).

---

## Keyword Recommendations

### Exact Match — 5 Keywords

```
[car detailing membership Melbourne]
[monthly car detail Melbourne]
[car detailing subscription Melbourne]
[ceramic coating maintenance Melbourne]
[premium car care plan Melbourne]
```

**Rationale:**

- `[car detailing membership Melbourne]` — the primary intent term. The buyer who types "membership" in a car care search is already thinking in subscription terms. Highest search intent alignment in this campaign. Allocate 40–50% of budget here.

- `[monthly car detail Melbourne]` — cadence-based search. This buyer is not necessarily thinking "membership" yet; they are thinking "regular detail." The ad converts this buyer by reframing a recurring booking into a plan — priority access, consistent pricing, ceramic maintenance included. The word "monthly" in their search term signals they have already decided on frequency; the ad's job is to surface the structured product.

- `[car detailing subscription Melbourne]` — subscription-minded buyer. This buyer is using the vocabulary of recurring payments and service plans. They are evaluating Pristine against whatever other subscription options they find. H2 (price anchor) and D1 (both plans, pricing, trust signal) are the closing sequence for this buyer.

- `[ceramic coating maintenance Melbourne]` — the highest-LTV keyword in this campaign. The buyer who searches for "ceramic coating maintenance" is an existing coating customer — they have already invested in a ceramic or graphene coating and are actively seeking a maintenance solution. The Signature plan at $149/mo (which includes ceramic top-ups) is a perfect answer to this search. H5 ("Ceramic Top-Ups Included") pins directly to this term's intent. Bid +20% — this buyer already understands the product category and has demonstrated the highest-ticket service willingness in Pristine's category.

- `[premium car care plan Melbourne]` — high-intent, premium-qualifier search. The buyer who appends "premium" is explicitly filtering for quality and willing to pay for it. This term may surface from a buyer who has already seen Pristine's brand (via PPF or ceramic ads in prior weeks) and is now looking for the ongoing-care product. Run H1 + H3 (priority slots) + H5 (ceramic top-ups) for this group.

---

### Negative Keywords — 3 to Exclude

```
[automatic car wash]
[car service]
[diy car detailing]
```

**Rationale:**

- `[automatic car wash]` — drive-through car wash subscription intent. A large segment of "car subscription" or "car membership" searches in Melbourne are looking for auto wash club memberships (unlimited monthly machine washes at $20–40/mo). This is an anti-ICP buyer: volume, price-sensitive, machine-wash-based. The word overlap with "membership" and "subscription" makes this negative essential. Exclude. This exclusion also suppresses `[car wash club Melbourne]`, `[unlimited car wash Melbourne]`, and `[wash monkey]` and similar brand-adjacent queries.

- `[car service]` — mechanical service. Broad searches for "car service Melbourne" are overwhelmingly intent for mechanical servicing (oil change, brake inspection, roadworthy), not detailing. Any ad triggered by this term creates immediate message mismatch. Exclude to prevent spend waste on buyers who have no intent to purchase a detailing membership.

- `[diy car detailing]` — self-service intent. A buyer searching for DIY detailing is looking for products or tutorials to maintain their own car. Zero conversion probability as a Pristine member. Exclude. This suppresses `[diy car polish]`, `[how to ceramic coat your car]`, and similar self-service variants.

---

## Ad Group Structure

```
Campaign: GOOG_Lead_Search_Membership_Melbourne_2026W47
├── Ad Group 1: [Membership — Direct Category Intent]
│   Keywords: [car detailing membership Melbourne],
│             [car detailing subscription Melbourne],
│             [monthly car detail Melbourne]
│   Headline pin: H1 (keyword anchor) + H2 (price) + H3 (priority slots)
│   Description: D1 primary (both plans, pricing, trust signal)
│   Bid adjustment: Base — primary volume driver for the campaign
│   Note: Monitor for search term expansions to suburb-level
│         (Toorak, Brighton, Hawthorn membership); add as exact terms when volume supports

├── Ad Group 2: [Membership — Ceramic Maintenance Upsell]
│   Keywords: [ceramic coating maintenance Melbourne]
│   Headline pin: H1 + H5 (ceramic top-ups — directly mirrors the search term) + H2 (price)
│   Description: D2 primary — "ceramic top-ups" in D2 body mirrors the search intent precisely
│   Bid adjustment: +20% — existing coating customer; Signature plan at $149/mo is the natural
│                           product match; highest ticket outcome in the membership campaign

└── Ad Group 3: [Membership — Premium Care Plan]
    Keywords: [premium car care plan Melbourne]
    Headline pin: H1 + H3 (priority slots — premium buyer cares about access) + H4 (gift framing
                  if running in November gifting window)
    Description: D1 primary (social proof anchors the premium positioning)
    Bid adjustment: Base — lower search volume; brand-recall buyer from prior campaign exposure
```

---

## Retargeting Note

For users who visited `/services` or `/dashboard/membership` with membership intent but did not convert (window: 7 days — membership is a faster deliberation cycle than PPF at $3,000; a buyer considering $99/mo makes the decision in days, not weeks):

> **Headline:** Your Membership Slot. Book Now.
> **Description:** Priority summer access. From $99.

**Headline chars:** "Your Membership Slot. Book Now." = 31 — OVER. Trim: "Membership Slot. Book Now." = 26 ✓
**Description chars:** "Priority summer access. From $99." = 32 — OVER (90 max for description, but this is the retargeting RSA description, 90 max). Revised: "Priority summer slots open. Essential $99/mo. Signature $149/mo. Book before December." = 85 chars ✓

**Retargeting logic:** A buyer who reached the membership portal or the services page and left is in a low-friction deliberation stage — $99/mo requires less deliberation than $3,000 for PPF. The retargeting message should be a simple booking prompt. No discount — the membership is a recurring product and discounting entry undermines the plan's perceived value.

---

## Ad Schedule Recommendation

**Run:** Monday–Saturday, 7:00am–9:00pm AEST
**Peak windows:**
- 7:00–9:00am (pre-work commute; membership consideration often happens during the daily routine when the buyer is thinking about their car)
- 12:00–1:30pm (lunch decision window)
- 7:00–9:30pm (evening research; gifting searches peak in this window for the November–December window)
**Sunday:** 50% weekday budget — membership is a considered purchase but lower-deliberation than PPF; weekend activation ensures the gifting buyer who researches on Sunday can find Pristine
**November–December gifting uplift:** Increase budget by 15% from November 16 through December 15 for the gifting window; return to base from December 15 as gift-giving decisions complete

---

## Pre-Launch Checklist

- [ ] **P0: Membership landing page functional** — `/membership` must NOT redirect to `/services`; either restore the page or add a membership section to services before activating
- [ ] Confirm `/dashboard/membership` plan management UI is functional for new account sign-ups (not just existing members)
- [ ] Confirm Stripe checkout via `startMembershipCheckout(planId)` is wired to a reachable UI
- [ ] Conversion tracking firing on membership sign-up with plan tier (Essential or Signature) and monthly value ($99 or $149)
- [ ] UTM params: `utm_source=google&utm_medium=cpc&utm_campaign=membership-melbourne-wk47`
- [ ] Negative keyword list applied before activation: [automatic car wash], [car service], [diy car detailing], [car wash club], [unlimited car wash], [mechanical service]
- [ ] Confirm geotargeting — Melbourne metro + Inner East + Bayside + Mornington Peninsula; exclude rural Victoria
- [ ] Pause or audience-exclude the Week 46 PPF campaign before activating — buyers in PPF consideration should be route-managed to PPF booking, not intercepted by membership ads (membership upsell is a post-PPF booking conversation, not a competing campaign)
- [ ] Automated extensions: sitelinks to `/booking`, `/dashboard/membership`; callouts: "Essential $99/mo", "Signature $149/mo", "Priority Booking", "Ceramic Maintenance Included", "2,400+ Cars Protected"

---

## Context Notes

- **Landing page status (critical):** As of 2026-11-15, `/membership` redirects to `/services` with zero membership content. These ads cannot convert until this is fixed. The October 20 CRO audit documented this as P0 — 26 days without resolution. The ads are ready; the page is not.
- **Week 47 gifting frame:** Christmas is six weeks away. The H4 headline ("Gift It Before Christmas") is accurate and seasonally appropriate — not manufactured urgency. Run it from November 16 through December 10; retire it after December 10 when gifting decisions have been made.
- **Membership vs. one-off service:** The search buyer who types `[monthly car detail Melbourne]` has already self-qualified as a buyer who wants recurring service. The ad's job is not to explain the concept of a plan — it is to surface Pristine's specific plan, its price, and its operational benefits (priority slots, ceramic top-ups). The landing page closes the sale; the ad starts the conversation.
- **Week 45–46 campaign continuity:** Buyers who saw Pristine's ceramic or PPF ads in the past two weeks and visited the site are now warm for membership. The audience exclusion logic ensures PPF active-consideration buyers are not intercepted by membership ads. Buyers who visited ceramic coating pages (not in active checkout) are valid targets for the Signature plan — ceramic top-ups are directly relevant to them.
- **Next rotation:** Week 48 (November 23–29) → Paint Correction (rotation pos 8, 48 mod 8 = 0 = position 8). Prep Google ads Monday 23 November. Paint correction in late November — summer reveal framing ("before the summer season, before the Christmas party drive") is the natural angle.
