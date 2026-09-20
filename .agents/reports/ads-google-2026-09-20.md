# Google Search Ads — Membership
**Date:** 2026-09-20 (Sunday prep run — activate Monday 21 September)
**Week:** 39 → Rotation Week 7 → **Membership**
**Platform:** Google Search Ads (Responsive Search Ad)
**Campaign:** GOOG_Lead_Search_Membership_Melbourne_2026W39
**Landing Page:** /membership → /booking (see Critical Warning below)
**Previous Membership run:** Week 35 (late August)

---

## ⚠️ CRITICAL WARNING — DO NOT ACTIVATE WITHOUT READING THIS

The Membership landing page has a **non-functional "Select plan" CTA button** that was first flagged in a CRO audit on **2026-05-05** and remained unresolved through the last audit on **2026-06-30** (three audits, zero fixes, 136+ days). The button has no `onClick` or `href` — clicking it does nothing.

**If this campaign runs to `/membership` with the button still broken, every ad click produces zero conversions.** The spend is entirely wasted.

**Before activating this campaign:**
1. Confirm with engineering whether the Membership CTA button has been fixed post-June 2026
2. If fixed: activate as written, confirm conversion tracking fires on plan selection
3. If still broken: route to `/booking` with a pre-filled note ("Enquire about Membership") as the landing page, and add a sitelink to `/membership` so the page is accessible without being the primary CTA destination

**Workaround copy for `/booking`-routed traffic:**  
Add headline sitelink: "Book a Membership Consult → /booking" — the booking page can capture membership enquiries even if the dedicated plan selector is broken.

---

## Seasonal Context

Week 39 is the first Membership rotation since August (Week 35) and lands at the single best timing window of the year to sell recurring care: the spring reset moment. Three conditions are simultaneously true for the Inner East and Bayside ICP right now, and none of them were true in August.

**The post-winter audit moment.** Toorak and Brighton car owners who spent winter driving the Eastern and Monash have accumulated water spots from Melbourne's cold mornings, iron fallout from brake dust in slow traffic, and bird-dropping etch that worsens in autumn when deciduous trees are active. The car that was "fine for winter" is not fine for the social season that begins this week. A buyer searching "monthly car detailing Melbourne" or "car care plan Melbourne" in the last week of September is not browsing — they are solving a specific problem: their car is not ready for the season and they want it handled consistently, not just once. The Membership is the correct answer to this need. The one-time service answers "fix this car." The Membership answers "keep this car right."

**The AFL Grand Final window (Saturday 27 September).** The Grand Final is seven days away. A Toorak or South Yarra car owner whose weekend will involve valet parking on Swan Street, Punt Road traffic, or a post-Grand Final Brunetti lunch is acutely aware of their car's presentation right now. This is not the week to book a membership so the car looks good on Saturday — the Grand Final is too close. But it is the exact week to book a membership so the car is right for every Saturday from here: spring racing at Flemington (October–November), Mornington Peninsula drives (October through March), the summer social calendar in general. The Grand Final is not the conversion event. It is the mental activation that prompts the buyer to finally do the thing they have been deferring since July.

**The spring carry-over deferral buyer.** The car owner who said in June "I'll sort the detailing when the weather's better" has reached the moment when the weather is better. Deferred car care has a seasonal psychology: winter provides plausible cover for a car that isn't looking its best ("it's been raining"), and that cover disappears the moment spring starts. A search for "car care plan Melbourne" or "membership car detailing" at this time of year has a strong "I've been meaning to do this" quality — the buyer is not in an exploratory research phase, they are converting a deferred intention. The ad copy should meet them at that moment, not try to re-educate them on why car care matters.

---

## Responsive Search Ad — Membership Melbourne

### Headlines (30 chars max)

| # | Headline | Chars | Angle |
|---|----------|-------|-------|
| H1 | Detailing Membership Melbourne | 30 | Keyword anchor — exact category match |
| H2 | We Come to You. Every Month. | 28 | Mobile USP + cadence promise |
| H3 | Spring Reset. Book Your Plan. | 29 | Seasonal hook — post-winter intent |
| H4 | From $99/mo. Toorak & Bayside | 29 | Price anchor + geo ICP qualification |
| H5 | Set. Forget. Car Stays Right. | 29 | Outcome simplicity — time-poor buyer |

**Pin guidance:**

- **H1 ("Detailing Membership Melbourne") → Pin Position 1.** The buyer typing `[car detailing membership melbourne]` or `[monthly detailing subscription melbourne]` is in active category-evaluation mode. H1 confirms relevance immediately and earns the click without performing. No adjective, no promise — just the service, the format, and the city. The buyer who clicks is already pre-qualified on intent.

- **H2 ("We Come to You. Every Month.") → Rotate Position 2.** The primary differentiator the Membership buyer is evaluating against is whether they have to drive somewhere every month. Most premium car care services in Melbourne require studio drop-off. Pristine's mobile membership removes that friction entirely. "We Come to You" answers the objection in four words. "Every Month" confirms the cadence without requiring them to read the landing page to find out. The period-separated structure reads as two confident facts, not a tagline.

- **H3 ("Spring Reset. Book Your Plan.") → Rotate Position 2.** This headline is specific to the Week 39 activation window — late September, post-winter, spring social season beginning. "Spring Reset" is a framing the buyer has almost certainly applied to other areas of their life this week (wardrobe, garden, schedule). "Book Your Plan" is a CTA that implies the plan already exists and the only step remaining is the booking. This headline has a limited shelf life and should be swapped for an evergreen alternative in weeks that are not spring transitions.

- **H4 ("From $99/mo. Toorak & Bayside") → Rotate Position 3.** Price anchoring for the Membership is a different exercise than for PPF at $3,000. The ICP buyer who owns a $100K+ car does not find $99/mo intimidating — but they do expect to see what they're paying before they click. H4 does two things: it confirms price accessibility ($99/mo is less than most Toorak residents' monthly fuel bill), and it names the two highest-LTV suburb clusters in the same breath, so a buyer in either area recognises that Pristine already operates where they live. No guesswork about service radius — the suburb names confirm it.

- **H5 ("Set. Forget. Car Stays Right.") → Rotate Position 3.** This headline is built for the time-poor professional persona — the ICP buyer who knows car care is important but can never prioritise it over work, family, and social commitments. Three short clauses. "Set" — you book once. "Forget" — you don't manage it month to month. "Car Stays Right" — the outcome, stated simply and accurately. No hyperbole. "Stays Right" is the language of maintenance, not detailing glamour — it speaks to someone who wants their car to remain at a consistent standard, not someone chasing a competition show-car result.

---

### Descriptions (90 chars max)

| # | Description | Chars |
|---|-------------|-------|
| D1 | Winter left water spots, grime, iron fallout. Monthly care at your door resets it. | 83 |
| D2 | Certified technicians. Member rates on ceramic & PPF. 4.9 stars, 2,400+ cars protected. | 88 |

**Why D1 works:** "Winter left water spots, grime, iron fallout" is an accurate inventory of what Melbourne's winter does to a car that has been driven and not detailed for three months. Water spots come from cold-morning condensation and rain drying on paint. Iron fallout is brake particulate that embeds in clear coat over high-traffic commute routes. The list is factual, not alarmist, and any Inner East or Bayside car owner reading it in late September will recognise at least two of the three from their own car. "Monthly care at your door resets it" answers the problem with the solution — mobile, recurring, accessible. No price, no offer, no "limited time." The problem and the mechanism are the close.

**Why D2 works:** Positions Pristine's Membership as a certified professional service, not a subscription wash. "Certified technicians" directly contradicts the alternative most Melbourne car owners have used: generic mobile wash vans with no training standard. "Member rates on ceramic & PPF" is the benefit that makes a $99/mo membership a strategic investment rather than just a maintenance convenience — the buyer protecting a $100K+ car has a future PPF or ceramic coating in mind, and knowing they will pay less as a member makes the recurring commitment rational. The social proof stack (4.9 stars, 2,400+ cars) closes the credibility gap for a buyer who has not used Pristine before.

---

## Keyword Recommendations

### Exact Match — 5 Keywords

```
[car detailing membership melbourne]
[monthly car detailing melbourne]
[mobile car detailing subscription melbourne]
[car care plan toorak]
[detailing membership bayside melbourne]
```

**Rationale:**

- `[car detailing membership melbourne]` — the primary intent term for this campaign. A buyer typing the full membership category alongside Melbourne has already decided they want a recurring service and is evaluating providers. This is the highest-conversion term in the membership campaign and should carry the majority of the budget. Any variation of this term containing "membership" + "Melbourne" is a pre-qualified buyer in active evaluation mode.

- `[monthly car detailing melbourne]` — cadence-specific intent. The buyer typing "monthly" is expressing a specific preference for recurring care — not a one-off, not a seasonal clean, but a monthly routine. This maps directly to the Essential tier ($99/mo, monthly visit). This term will have lower search volume than the primary category term but higher conversion intent — a buyer specifying frequency is further along in their purchase decision than a buyer typing the general category.

- `[mobile car detailing subscription melbourne]` — subscription framing + mobile qualifier. "Subscription" signals the buyer is already thinking in recurring-commitment terms, likely from exposure to other subscription services. The mobile qualifier pre-selects for buyers who specifically want at-home or at-office service — which is Pristine's exact Membership delivery model. This term captures the buyer who has done enough research to know what they're looking for and is now selecting the provider. H2 ("We Come to You. Every Month.") maps directly to this search intent.

- `[car care plan toorak]` — suburb-specific, highest-LTV intent. Toorak (3142) is the single highest-concentration postcode for Pristine's ICP in Melbourne: high-income professionals, prestige European cars, secure private driveways that make mobile service delivery easy and private. A buyer adding "Toorak" to their search term is almost certainly a Toorak resident confirming that this service operates locally. Bid +30% on this term. The Signature tier ($149/mo) should be presented prominently on the landing page for this postcode cluster — the buyer profile makes the incremental spend from $99 to $149 immaterial.

- `[detailing membership bayside melbourne]` — Bayside cluster intent. The Brighton-to-Beaumaris strip (postcodes 3186–3193) represents Pristine's highest-density secondary ICP cluster: homeowners with private garages, weekend cars, and a strong coastal UV exposure that makes recurring maintenance more meaningful than inland postcodes. "Bayside" in the search term confirms geographic self-identification — this buyer knows where Pristine operates and is confirming service coverage before committing. Run this term alongside the Toorak term with a +20% bid adjustment.

---

### Negative Keywords — 3 to Exclude

```
[car wash membership]
[cheap monthly car detailing]
[detailing course membership]
```

**Rationale:**

- `[car wash membership]` — different service tier entirely. A car wash membership (Moo Premium Washes, Jax Quick Service, similar) is a $30–$60/mo recurring drive-through service. The buyer searching for a "car wash membership" is in a completely different value tier from Pristine's Essential ($99/mo) or Signature ($149/mo) offering. Showing a premium, technician-attended mobile service ad to a buyer expecting a conveyor-belt wash creates both a click-through rate drag (they see the price and don't click) and a budget drain when they do click and bounce immediately on the landing page. Exclude it explicitly.

- `[cheap monthly car detailing]` — price-sensitive modifier. The "cheap" qualifier is a direct anti-persona signal from the product marketing context. This buyer is optimising for cost, not quality or outcome — they are not the ICP for a service targeting Toorak and Bayside car owners who are paying to protect a $30K–$200K car. Excluding "cheap" also implicitly suppresses [cheap detailing subscription] and [budget monthly car wash] long-tail variations.

- `[detailing course membership]` — education/training intent. A search for "detailing course membership" is a professional learner or hobbyist looking to join a training program or access educational content about car detailing techniques. This buyer is not in the market for a done-for-you service. Their click is pure waste. The Membership page's content (pricing tiers, mobile service, certified technicians) will not satisfy this search intent and will produce an immediate bounce.

---

## Ad Group Structure

```
Campaign: GOOG_Lead_Search_Membership_Melbourne_2026W39
├── Ad Group 1: [Membership — Direct Category Intent]
│   Keywords: [car detailing membership melbourne], [mobile car detailing subscription melbourne]
│   Headline pin: H1 (keyword match) + H2 (mobile USP) + H5 (outcome simplicity)
│   Description: D2 primary (certified technician credibility closes for direct-intent buyer)
│   Bid adjustment: Base — this is the workhorse group

├── Ad Group 2: [Membership — Recurring/Monthly Intent]
│   Keywords: [monthly car detailing melbourne]
│   Headline pin: H1 + H3 (spring reset seasonal hook) + H2
│   Description: D1 primary (the "winter left this behind" problem framing)
│   Note: This buyer has specified frequency intent; D1's problem-to-mechanism
│         narrative (water spots, grime, iron fallout → monthly care) resolves
│         the "why monthly?" implicit question before they reach the landing page

├── Ad Group 3: [Membership — Toorak/Inner East Geo Intent]
│   Keywords: [car care plan toorak]
│   Headline pin: H4 (price + geo named) + H2 (mobile USP) + H1
│   Description: D2 primary — social proof closes for the highest-LTV postcode
│   Bid adjustment: +30% — Toorak buyer profile means Signature tier ($149/mo)
│                          is the natural upsell; CPL efficiency at this bid
│                          adjustment is positive vs. the lifetime value

└── Ad Group 4: [Membership — Bayside Geo Intent]
    Keywords: [detailing membership bayside melbourne]
    Headline pin: H4 (with Bayside named — strong local resonance) + H3 + H2
    Description: D1 primary (coastal UV + iron fallout is a Bayside-specific
                 problem the copy is accurate to)
    Bid adjustment: +20%
    Note: Bayside buyer (Brighton, Hampton, Sandringham, Beaumaris) skews
          slightly older than Inner East ICP and responds well to the social
          proof in D2 — consider A/B testing D1 vs D2 in this ad group
          specifically to confirm which angle closes better for Bayside
```

---

## Retargeting Note

For users who visited `/membership` or `/booking` with membership intent but did not complete (7-day window):

> **Headline:** Your Membership Spot Is Here  
> **Description:** Monthly care at your door. From $99/mo. We serve Toorak, Brighton, South Yarra.

**Headline chars:** "Your Membership Spot Is Here" = 28 ✓  
**Description chars:** "Monthly care at your door. From $99/mo. We serve Toorak, Brighton, South Yarra." = 79 ✓

**Retargeting logic:** A buyer who visited the Membership page has already identified a want — they are not evaluating whether to buy; they are evaluating whether to buy from Pristine. The retargeting message should confirm service proximity (suburb naming = "we are local to you") and restate the price so there is no residual uncertainty about cost. Frequency cap: 2 impressions/week, 7-day window. Do not offer a discount — the Membership buyer who visited the page is choosing between premium providers, not negotiating price.

**Note:** If the `/membership` CTA button remains broken, this retargeting audience will have a low-ceiling conversion rate regardless of message quality. The workaround is to route the retargeting click to `/booking` with a pre-populated note: "I want to enquire about Membership." Fix the button; stop routing traffic through a workaround.

---

## Ad Schedule Recommendation

**Run:** Monday–Saturday, 6:30am–9:00pm AEST  
**Peak windows:** 7:00–9:00am (commuter search, time-poor professional is planning their week) and 7:00–9:00pm (evening decision-making, second screen while watching AFL Grand Final week coverage)  
**Grand Final Saturday (September 27):** Pause spend from 2pm–7pm AEST (search intent drops during match); resume for post-match evening window (car owners reflecting on the social season; decision intent resumes)  
**Sunday inclusion:** Light activation (50% of weekday budget) — Sunday is the highest research-to-booking conversion day for considered services in Melbourne's ICP; the buyer who has thought about membership all week makes the booking commitment on Sunday morning

---

## Pre-Launch Checklist

- [ ] **Verify `/membership` CTA button is functional** — this is a blocking item; do not spend a dollar until this is confirmed; log into staging environment and click "Select plan" on both Essential and Signature tiers; confirm the booking flow initiates
- [ ] Conversion tracking firing on `/booking` confirmation with service type = "Membership" as event parameter and recurring value ($99 × 12 = $1,188/yr Essential; $149 × 12 = $1,788/yr Signature) as conversion value for ROAS calculation — annual LTV framing makes the CPA threshold significantly higher than a one-off service
- [ ] UTM params: `utm_source=google&utm_medium=cpc&utm_campaign=membership-melbourne-wk39`
- [ ] Landing page mobile load time under 3 seconds — the time-poor professional is searching on iPhone; a slow load is a direct conversion loss
- [ ] Negative keyword list applied before activation: [car wash membership], [cheap monthly car detailing], [detailing course membership], [detailing jobs melbourne] (employment), [diy detailing] (self-service)
- [ ] Audience exclusion: active Membership subscribers (they're already converted; showing them a sign-up ad is wasted spend and may create pricing confusion if rates have changed)
- [ ] Suppress: PPF buyers in last 90 days who have not enquired about Membership — they are mid-lifecycle on a high-ticket one-time service; route them to a membership upsell email sequence, not paid re-acquisition
- [ ] Confirm `/membership` page includes Essential ($99/mo) and Signature ($149/mo) tier descriptions with a clear differentiator — the buyer who searched "car care plan" is comparing tiers before committing; if the page does not differentiate clearly, the click will not convert even with a functional button
- [ ] Confirm mobile service geography is stated explicitly on the `/membership` page — the CRO audit (2026-06-30) flagged that "the word 'mobile' and 'we come to you' appear nowhere on this page"; the ads promise mobile service in H2 and D1; a message mismatch between the ad and the landing page raises bounce rate and degrades Quality Score for this campaign

---

## Context Notes

- **Week 39 seasonal timing:** AFL Grand Final (Sat 27 Sep) and Spring Racing Carnival (October) create a spring social season activation window. The Membership launch timing is optimal: buyers who activate this week will have their first monthly visit before the racing carnival begins. The urgency is real and the buyer supplies it — the ad does not need to manufacture it.
- **Melbourne-specific hooks used:** Post-winter iron fallout and water spots (D1) are accurate Melbourne-specific paint problems from Monash/Eastern Freeway commuting; Toorak and Bayside named in H4 and keyword targeting; Grand Final window referenced in ad schedule, not ad copy (naming the Grand Final in ad copy reads as niche; the buyer's own calendar creates the urgency)
- **Tone check:** "Winter left water spots, grime, iron fallout" — factual, observed, Melbourne-specific. "Set. Forget. Car Stays Right." — outcome-led, not salesy. "Certified technicians" — specific, not "Melbourne's most trusted team." No "we offer," no "passionate," no superlatives. The Membership buyer at $99–$149/mo who lives in Toorak has been sold to before; they recognise hollow copy and will not respond to it.
- **Previous copy rotation (Week 19, Week 35):** Week 19 (May) established core Membership positioning with H4 "Set-and-Forget Car Protection." Week 39 refreshes the copy with seasonal specificity (spring reset, post-winter frame) and a price anchor headline (H4 "From $99/mo") that previous runs did not use. The "We Come to You" USP is carried forward from Week 19 as H2 — it remains the single most differentiating Membership message and should persist across rotations.
- **Landing page fix required (again):** This is the fourth documented period in which paid Membership ads have been prepared against a landing page with a non-functional conversion button. The ad copy, keywords, and campaign structure are sound. The conversion infrastructure is not. Until `/membership` has a working plan-selector CTA, the measurable output of this campaign is enquiries routed through `/booking` — that is a workaround, not a solution. The button fix should be treated as a P0 revenue issue: every week it is broken is a week of Membership ad spend that cannot convert on-page.
- **Next rotation:** Week 40 (September 28 – October 4) → Paint Correction (40 mod 4 = 0). Prep Google ads Sunday 27 September. Spring paint correction season begins — new car owners, post-winter swirl marks, Grand Final parking lot scratches.
