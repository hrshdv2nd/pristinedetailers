# Google Search Ads — Membership
**Date:** 2026-07-01 (Wednesday mid-week run — July 1, new financial year)
**Week:** 27 → Rotation Week 3 → **Membership**
**Platform:** Google Search
**Landing page:** pristinedetailers.com.au/membership → /booking
**Note:** Fresh headline and description set distinct from the 28 June prep run. July 1 is the first day of FY2027 — Melbourne professionals reviewing household and vehicle spend; stronger intent signal than average week. Run these alongside or rotate with the 29 June active set.

---

## Responsive Search Ad — Membership Melbourne (July 1 Refresh)

### Headlines (30 chars max)

| # | Headline | Chars | Angle |
|---|----------|-------|-------|
| H1 | Car Detailing Plans, Melbourne | 30 | Keyword-match + city |
| H2 | Mobile Membership From $99/Mo | 29 | Product + price anchor |
| H3 | Your Car Stays Showroom-Clean | 29 | Outcome |
| H4 | We Detail. You Drive. Repeat. | 29 | Lifestyle / set-and-forget |
| H5 | Toorak & Brighton's Car Plan | 28 | Suburb identity |

**Pin guidance:**
- Pin H1 ("Car Detailing Plans, Melbourne") to Position 1 — city-specific keyword match; distinct from "Monthly Car Detail Melbourne" used in the June 29 set, gives Google two high-relevance city headlines to test
- H2 and H3 rotate in Position 2 — H2 names price immediately to qualify intent; H3 speaks to outcome for the buyer who searches "car detailing Melbourne" without yet knowing what a plan is
- H4 and H5 rotate in Position 3 — H4 ("We Detail. You Drive. Repeat.") is a three-beat rhythm that encodes the entire membership loop in seven words; H5 targets Inner East and Bayside identity, naming the suburbs the ICP lives in rather than describing what we do

**Why H4 matters:** "We Detail. You Drive. Repeat." says nothing about price or features — it describes a relationship. The repeated period structure creates cadence that reads faster than prose. Three clauses in six words: service is done, you're free, it keeps happening. This is the emotional contract of a membership. Tests well against the more literal headline combinations already running.

**Why H5 matters:** A Toorak resident searching "car detailing plans Melbourne" and seeing "Toorak & Brighton's Car Plan" in the headline will read that as social signal — this service already operates in their postcode, not out of a workshop 20km away.

---

### Descriptions (90 chars max)

| # | Description | Chars |
|---|-------------|-------|
| D1 | Two tiers — Essential $99/mo or Signature $149/mo. We come to your suburb, monthly. | 83 |
| D2 | Six years detailing Toorak, Brighton & Bayside. Certified. No workshop drop-off. Ever. | 86 |

**Why D1 works:** Names both tiers with exact prices in one clause — removes the price ambiguity that causes searchers to click through only to leave without converting. "We come to your suburb, monthly" answers the two questions every prospect has: where and how often. Broad enough for any postcode, specific enough in cadence.

**Why D2 works:** "Six years" is the proof point that a new mobile service can't manufacture — signals longevity and local trust. Three suburb names make it concrete without requiring the searcher to already know where Pristine operates. "No workshop drop-off. Ever." is punchy contrast — no word wasted.

---

## Keyword Recommendations

### Exact Match — 5 Keywords (Test Set, Complementing June 29 Active Set)

```
[car detailing monthly plan Melbourne]
[mobile detailing membership Melbourne]
[premium car detailing subscription Melbourne]
[car care plan Melbourne]
[Toorak car detailing service]
```

**Rationale:**
- `[car detailing monthly plan Melbourne]` — phrase variation on the active `[monthly car detailing Melbourne]`; captures the subset of searchers who use "plan" language, indicating they're looking for something structured and recurring rather than a one-off
- `[mobile detailing membership Melbourne]` — "mobile detailing" is the category, "membership" adds filter; complementary to the active `[car detailing membership Melbourne]`, captures different phrase ordering
- `[premium car detailing subscription Melbourne]` — "premium" qualifier self-selects; "subscription" is the transactional word for a younger ICP (30s professional who thinks in subscriptions, not retainers); low volume, high intent
- `[car care plan Melbourne]` — broadens to "car care" category language; picks up buyers using plan language who haven't yet typed "detail" or "membership"; quality landing page message match critical here
- `[Toorak car detailing service]` — suburb-first query; person has already decided they want someone who serves Toorak specifically; highest local conversion potential; test against Inner East postcode exclusions

**Budget note:** Run these as a separate ad group from the June 29 active keywords. Don't merge. Monitor CTR independently for 7 days before consolidating budget to winners.

---

### Negative Keywords — 3 to Exclude

```
[free car detail]
[car wash subscription]
[cheap car detailing]
```

**Rationale:**
- `[free car detail]` — no conversion potential; likely a promotion hunter, not a membership buyer
- `[car wash subscription]` — drive-through wash intent (Moo Moo, Red Rocket); completely different product category; will inflate clicks without converting
- `[cheap car detailing]` — price-first language signals the buyer is not in the $99–$149/mo ICP; will inflate CPC without improving conversion rate

---

## Ad Group Structure — Test Layer

```
Campaign: GOOG_Search_Membership_Melbourne_Wk27_Jul01
├── Ad Group 1: [Membership — Plan Language]
│   Keywords: [car detailing monthly plan Melbourne], [car care plan Melbourne]
│   Ad: H1 pinned; H2 + H4 rotating; D1 (both tiers, price-anchored)
│   Note: "Plan" searchers are asset-minded — speak to the structure and frequency, not just the service
│
├── Ad Group 2: [Membership — Premium + Mobile]
│   Keywords: [mobile detailing membership Melbourne], [premium car detailing subscription Melbourne]
│   Ad: H1 pinned; H3 + H4 rotating; D2 (proof + suburb names)
│   Note: "Premium" and "subscription" language signals a solution-aware buyer — confirm quality and convenience, don't educate
│
└── Ad Group 3: [Membership — Suburb Intent]
    Keywords: [Toorak car detailing service]
    Ad: H5 pinned ("Toorak & Brighton's Car Plan"); D2 as primary description
    Note: Suburb-specific query demands suburb-specific answer in the headline; generic city-level copy underperforms here
```

---

## Retargeting Note

For users who visited `/membership` but did not convert (window: 7 days):

> **Headline:** Your Plan's Still Available
> **Description:** Spots fill Mondays in Toorak, Brighton, and the Inner East. One click to lock in your schedule.

**Angle shift for July 1:** For retargeting audiences who visited the site in June but didn't convert, July 1 is a natural reset prompt — "new financial year, sort this now." Consider a 24-hour time-specific copy variant:

> **Headline:** New FY, Same Opportunity
> **Description:** Your detail membership is one booking away. We come to Toorak, Brighton, Bayside — from $99/mo.

Window: 7-day hot.
Frequency cap: 3× per week.
Exclude: active members and anyone who booked any service in the past 14 days.

---

## Pre-Launch Checklist

- [ ] Confirm active ad set from 29 June is live and pacing correctly before adding this test layer
- [ ] Add these keywords to a **separate ad group** — do not merge with active June 29 set
- [ ] Conversion tracking confirmed on `/booking` confirmation page
- [ ] UTM params: `utm_source=google&utm_medium=cpc&utm_campaign=membership-melbourne-jul01&utm_content=fresh-headlines`
- [ ] Location: Melbourne metro — Inner East (3141, 3142, 3122, 3103) and Bayside (3186, 3188, 3191, 3204) primary; exclude regional VIC
- [ ] Suppress active members from all groups via CRM exclusion list
- [ ] Ad schedule: Mon–Sat, 7am–8pm AEST

---

## Context Notes

- **Why running on a Wednesday:** July 1 is the first day of FY2027 in Australia. Melbourne professionals often make delayed decisions — gym memberships, household subscriptions, vehicle maintenance plans — at the start of the financial year. Running a fresh ad layer today captures searches from people acting on exactly that impulse.
- **Distinct from June 28 prep set:** H1–H5 and D1–D2 here are all new copy. Keywords are a complementary test layer, not replacements. Run in parallel; judge on CTR and membership-page conversion rate at 7 days.
- **Melbourne-specific hooks:** Toorak, Brighton, Bayside named explicitly; "six years" credibility signal for locals who know mobile services often come and go
- **Tone check:** Direct, factual, no marketing language — "We Detail. You Drive. Repeat." and "No workshop drop-off. Ever." are plain claims, not promises
- **Next rotation:** Week 28 → Paint Correction — Google ads Monday 6 July, Meta ads Thursday 9 July
