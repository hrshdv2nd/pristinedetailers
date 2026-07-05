# Google Search Ads — Paint Correction
**Date:** 2026-07-05 (Sunday prep run — ready to activate Monday 6 July)
**Week:** 28 → Rotation Week 4 → **Paint Correction**
**Platform:** Google Search
**Landing page:** pristinedetailers.com.au/services/paint-correction → /booking
**Note:** Membership (week 27) ads are live from the 28 June run. This set preps week 28's service focus.

---

## Responsive Search Ad — Paint Correction Melbourne

### Headlines (30 chars max)

| # | Headline | Chars | Angle |
|---|----------|-------|-------|
| H1 | Paint Correction Melbourne | 26 | Primary keyword match |
| H2 | Swirl Mark Removal Melbourne | 28 | Specific problem — high intent |
| H3 | Mobile Machine Polish Service | 29 | Product + differentiator |
| H4 | Before Ceramic — Fix The Paint | 30 | Intent bridge — upsell hook |
| H5 | Swirl-Free Finish. Certified. | 29 | Outcome + proof |

**Pin guidance:**
- Pin H1 ("Paint Correction Melbourne") to Position 1 — exact-match keyword; catches the buyer who already knows the term and is comparing providers
- H2 and H3 rotate in Position 2 — H2 speaks to the specific pain (swirl marks from drive-through washes or car parks) using the language the ICP searches; H3 handles searchers who don't know the term "paint correction" but know they want someone to come to them with a machine
- H4 and H5 rotate in Position 3 — H4 catches buyers who arrived via a ceramic coating search and are being directed here first (critical upsell path — you cannot coat poorly-prepared paint); H5 closes on the outcome with "Certified" as credibility shorthand

**Why H4 matters:** A significant portion of paint correction searches come from buyers who already want ceramic coating — they've been told, or read, that correction comes first. "Before Ceramic — Fix The Paint" intercepts that exact mindset, validates the decision sequence, and positions Pristine as the expert who does both steps correctly. This also naturally leads to a higher average order value.

---

### Descriptions (90 chars max)

| # | Description | Chars |
|---|-------------|-------|
| D1 | Machine polishing removes swirl marks and scratches. Mobile to Toorak, Brighton & Bayside. | 90 |
| D2 | Paint prep done at your Toorak or Brighton home — correction before ceramic, done right. | 88 |

**Why D1 works:** Opens with the service mechanism ("machine polishing") — not a vague claim but a technical description that signals expertise to a car-aware audience. Names the specific damage types (swirl marks, scratches) that Melbourne car owners actually search for after noticing their paint in direct sunlight. Closes with three suburb names to reinforce local intent and confirm coverage.

**Why D2 works:** "Done at your home" removes the workshop objection in the first clause. The dash before "correction before ceramic" is a signal to buyers who are sequencing their treatment decisions — it validates their research without needing to explain. "Done right" is a quiet confidence claim that distinguishes from DIY or inferior mobile washers who won't tell you that doing correction wrong introduces more swirls.

---

## Keyword Recommendations

### Exact Match — 5 Keywords

```
[paint correction Melbourne]
[swirl mark removal Melbourne]
[car scratch removal Melbourne]
[machine polish Melbourne]
[paint correction before ceramic coating Melbourne]
```

**Rationale:**
- `[paint correction Melbourne]` — highest-intent primary term; buyer is solution-aware and searching for a provider, not still researching the problem
- `[swirl mark removal Melbourne]` — maps to the most visible and emotionally frustrating damage type; Toorak and Bayside owners notice swirls in outdoor light or garage lighting; high conversion intent
- `[car scratch removal Melbourne]` — broader problem language for buyers who don't know the term "swirl mark" but have noticed light scratching, typically from car parks or automated washes; still strong intent
- `[machine polish Melbourne]` — searcher already knows the product; shorter, high-volume term worth owning with its own ad group
- `[paint correction before ceramic coating Melbourne]` — long-tail, low volume, extremely high intent; buyer is mid-research on a higher-ticket decision; conversion rate typically high, CPA will be efficient despite low volume

---

### Negative Keywords — 3 to Exclude

```
[panel beater scratch repair]
[car respray Melbourne]
[paint touch up kit]
```

**Rationale:**
- `[panel beater scratch repair]` — buyer has structural damage (deep scratch, dent) requiring bodywork; no overlap with surface paint correction; will burn spend and create frustrated arrivals on-site
- `[car respray Melbourne]` — buyer wants full repainting; paint correction treats existing clear coat, not replacement; completely different product and price point
- `[paint touch up kit]` — DIY intent; searching for a product, not a service; zero conversion potential; also signals price sensitivity incompatible with the Revitalise Package starting at $300

---

## Ad Group Structure Recommendation

```
Campaign: GOOG_Search_PaintCorrection_Melbourne_Wk28
├── Ad Group 1: [Paint Correction — Direct Intent]
│   Keywords: [paint correction Melbourne], [machine polish Melbourne]
│   Ad: H1 pinned; H2 + H5 rotating; D1 as primary description
│   Note: Buyer is product-aware — they've researched paint correction and are now choosing a provider;
│         H2 (swirl mark language) and D1 (specific damage types) speak to why they decided they need it

├── Ad Group 2: [Paint Correction — Problem Language]
│   Keywords: [swirl mark removal Melbourne], [car scratch removal Melbourne]
│   Ad: H2 pinned; H3 + H5 rotating; D1 as primary description
│   Note: Searcher may not know the term "paint correction" — they know they have a problem;
│         H2 mirrors their exact search term; D1 then introduces the correct term and service mechanism

└── Ad Group 3: [Paint Correction — Ceramic Intent Bridge]
    Keywords: [paint correction before ceramic coating Melbourne]
    Ad: H4 pinned ("Before Ceramic — Fix The Paint"); D2 as primary description
    Note: Buyer is sequencing a two-step treatment; this ad set bridges paint correction to the ceramic
          coating upsell — landing page should confirm the correction → ceramic pathway and price both
```

---

## Retargeting Note

For users who hit `/services/paint-correction` or the correction section of `/booking` but did not convert:

> **Headline:** Your Paint's Ready For Correction
> **Description:** We come to Toorak, Brighton and Bayside — certified machine polish, no drop-off needed. Book this week.

Window: 7-day hot retargeting.
Frequency cap: 3 impressions/week.
Message angle: The logistical barrier removed — "no drop-off" is the sentence that turns hesitation into a booking for this ICP. No discount. The friction isn't price; it's convenience and trust that a mobile service can match a studio result.

---

## Pre-Launch Checklist

- [ ] Conversion tracking on `/booking` confirmation page (with paint correction service selected)
- [ ] UTM params: `utm_source=google&utm_medium=cpc&utm_campaign=paintcorrection-melbourne-wk28`
- [ ] Landing page `/services/paint-correction` loads under 3 sec on mobile
- [ ] Ad schedule: Mon–Sat, 7am–8pm AEST
- [ ] Location targeting: Melbourne metro (Inner East + Bayside primary); exclude regional VIC
- [ ] Suppress existing customers who booked paint correction in last 90 days (CRM exclusion list)
- [ ] Confirm ceramic coating retargeting sequence is linked for post-conversion upsell

---

## Context Notes

- **Melbourne-specific hooks used:** Toorak and Brighton named in both descriptions; Bayside referenced in D1; suburb specificity signals to Inner East ICP that Pristine operates in their territory
- **Tone check:** Technical but accessible — "machine polishing", "swirl marks", "clear coat" used accurately; no vague superlatives; "done right" is the only near-subjective claim and it has implicit proof in the context
- **Seasonal relevance:** Post-winter is prime paint correction timing for Melbourne — months of wet roads, bird droppings, and grit from the Mornington Peninsula have accumulated on paint since April; July–August is when paint-aware owners act before spring or before booking a ceramic coating
- **Upsell path:** Paint correction is the natural lead-in to ceramic coating ($750+). Landing page should offer the combined Revitalise + Ceramic pathway visibly. Do not bury it — a buyer who books correction is the most qualified ceramic prospect Pristine has
- **Revitalise Package tie-in:** From $300, includes two-stage paint correction, decontamination, deep clean, 6-month sealant — position as the full-reset option for buyers who want more than just swirl removal
- **Next rotation:** Week 29 → Ceramic Coating (weeks 1 and 5 in the 8-week cycle, week 29 mod 8 = 5) — prep Google ads Monday 13 July, Meta ads Thursday 16 July
