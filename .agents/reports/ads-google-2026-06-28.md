# Google Search Ads — Membership
**Date:** 2026-06-28 (Sunday prep run — ready to activate Monday 29 June)
**Week:** 27 → Rotation Week 3 → **Membership**
**Platform:** Google Search
**Landing page:** pristinedetailers.com.au/membership → /booking
**Note:** PPF (week 26) ads are live from the 24 June run. This set preps week 27's service focus.

---

## Responsive Search Ad — Membership Melbourne

### Headlines (30 chars max)

| # | Headline | Chars | Angle |
|---|----------|-------|-------|
| H1 | Monthly Car Detail Melbourne | 28 | Keyword-match |
| H2 | Mobile Detailing Membership | 27 | Product name |
| H3 | From $99/mo — We Come To You | 28 | Price anchor + differentiator |
| H4 | Members Save 35% Per Year | 25 | Proof/value |
| H5 | Set-And-Forget Car Detailing | 28 | Persona benefit |

**Pin guidance:**
- Pin H1 ("Monthly Car Detail Melbourne") to Position 1 — city-specific keyword match; signals local service intent
- H2 and H3 rotate in Position 2 — H2 names the product for searchers who don't yet know the membership exists; H3 leads with price to qualify intent and immediately signals the mobile differentiator
- H4 and H5 rotate in Position 3 — H4 closes with a concrete saving; H5 lands on the emotional benefit ("set-and-forget") for time-poor professionals who've tried to stay on top of maintenance and failed

**Why H5 matters:** "Set-and-forget" is the phrase Pristine's time-poor ICP uses to describe what they actually want. It reframes the membership from a product purchase into a lifestyle fix. The problem isn't that their car is dirty — it's that maintenance keeps slipping because it requires decisions. This headline answers that directly.

---

### Descriptions (90 chars max)

| # | Description | Chars |
|---|-------------|-------|
| D1 | Monthly wash + bi-monthly detail. We come to Toorak & Bayside. From $99/mo. | 75 |
| D2 | Maintenance that actually happens — direct debit, priority bookings, no mental overhead. | 88 |

**Why D1 works:** Two concrete service elements (monthly wash, bi-monthly detail), two Melbourne suburb names, and a price anchor — all in 75 characters. "We come to" is the structural shorthand that removes the workshop objection without needing to say "no drop-off." Price opens the Signature upsell conversation once they're on-site.

**Why D2 works:** "Actually happens" is the honest diagnosis of the status quo — car maintenance slips because rebooking requires energy. "Direct debit" names the mechanism (automated, no decision required per cycle). "No mental overhead" names the benefit in the language the ICP uses internally. This description is for the searcher who already knows what a detail is and has been meaning to book one consistently; it speaks to the friction, not the service.

---

## Keyword Recommendations

### Exact Match — 5 Keywords

```
[car detailing membership Melbourne]
[monthly car detailing Melbourne]
[mobile car detailing subscription Melbourne]
[regular car detailing Melbourne]
[car maintenance plan Melbourne]
```

**Rationale:**
- `[car detailing membership Melbourne]` — highest-intent query for this product; buyer is already searching for a recurring service, not a one-off
- `[monthly car detailing Melbourne]` — high volume, intent is clear; "monthly" signals they've already decided on frequency
- `[mobile car detailing subscription Melbourne]` — longer tail, lower volume, but extremely high conversion intent; "subscription" signals solution-aware buyer
- `[regular car detailing Melbourne]` — broader term that catches buyers who know they want consistency but haven't heard of Pristine's membership yet; quality landing page message match is critical here
- `[car maintenance plan Melbourne]` — catches the financial-minded buyer thinking about the car as an asset on a maintenance schedule, not just someone who wants a clean car

---

### Negative Keywords — 3 to Exclude

```
[car wash membership]
[drive-through car wash]
[free car detailing]
```

**Rationale:**
- `[car wash membership]` — signals drive-through wash intent (Red Rocket, Moo Moo, etc.) — a completely different product, wrong ICP, will erode quality score
- `[drive-through car wash]` — explicit signal the searcher wants a wash lane, not a mobile certified technician; zero conversion potential
- `[free car detailing]` — price-sensitive query with no commercial intent aligned to the $99–$149/mo membership; will burn budget on unqualified clicks

---

## Ad Group Structure Recommendation

```
Campaign: GOOG_Search_Membership_Melbourne_Wk27
├── Ad Group 1: [Membership — Direct Intent]
│   Keywords: [car detailing membership Melbourne], [mobile car detailing subscription Melbourne]
│   Ad: H1 pinned; H2 + H4 rotating; D2 (the "actually happens" frame)
│   Note: This searcher is already product-aware and looking for a plan — meet them at the product level
│
├── Ad Group 2: [Membership — Frequency Intent]
│   Keywords: [monthly car detailing Melbourne], [regular car detailing Melbourne]
│   Ad: H1 pinned; H3 + H5 rotating; D1 (service cadence + suburbs named)
│   Note: "Monthly" and "regular" signals the buyer knows the frequency they want — confirm it, price it, remove friction
│
└── Ad Group 3: [Membership — Maintenance Mindset]
    Keywords: [car maintenance plan Melbourne]
    Ad: H5 pinned ("Set-And-Forget Car Detailing"); D2 as primary description
    Note: "Maintenance plan" language skews toward asset-minded buyers (engineers, financial types, premium car owners) — speak to the system, not the service
```

---

## Retargeting Note

For users who hit `/membership` or `/booking` (with membership selection) but did not complete:

> **Headline:** Your Plan's Still Available
> **Description:** Priority spots fill Monday mornings. One click to lock in your Toorak or Brighton service schedule.

Window: 7-day hot retargeting.  
Frequency cap: 4 impressions/week.  
Message angle: Slots and availability — not a discount. Membership ICP responds to scarcity of a reliable technician, not a price reduction.

---

## Pre-Launch Checklist

- [ ] Conversion tracking on `/booking` confirmation page (membership tier selected)
- [ ] UTM params: `utm_source=google&utm_medium=cpc&utm_campaign=membership-melbourne-wk27`
- [ ] Landing page `/membership` loads under 3 sec on mobile
- [ ] Ad schedule: Mon–Sat, 7am–8pm AEST
- [ ] Location targeting: Melbourne metro (Inner East + Bayside primary); exclude regional VIC
- [ ] Suppress existing members from all ad groups immediately (CRM sync or email exclusion list upload)

---

## Context Notes

- **Melbourne-specific hooks used:** Toorak, Bayside, Brighton named in descriptions; suburb-specific relevance signals for Inner East audience
- **Tone check:** Functional and direct — "actually happens", "no mental overhead", "set-and-forget" are the buyer's own words, not marketing copy
- **Membership vs one-off distinction:** Do not conflate with single-session bookings. This ad set is strictly for recurring plan sign-ups. Retargeting for single-session visitors uses different copy.
- **Season note:** End of June is a natural membership trigger — "I've been meaning to sort this out" energy after the financial year; also post-winter driving season when paint condition is front of mind
- **Next rotation:** Week 28 → Paint Correction — prep Google ads Monday 6 July, Meta ads Thursday 9 July
