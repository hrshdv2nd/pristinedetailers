# Google Search Ads — Paint Protection Film (Variant Set B)
**Date:** 2026-05-31 (Week 22 — PPF Focus)
**Platform:** Google Ads (Responsive Search Ad)
**Prepared by:** Taylor, Paid Media Manager
**Note:** Sunday prep session. Week 22 PPF rotation confirmed (`date +%V` = 22; 22 mod 4 = 2 → PPF). A first set was produced on 2026-05-27 — this is Variant Set B with fresh angles for A/B testing: resale value, Bayside/salt damage, prestige car specifics, and the "skip the workshop" convenience hook.

---

## Campaign Context

**Service:** Paint Protection Film (PPF)
**Objective:** Lead generation → `/booking` page conversions
**Audience:** Melbourne car owners (28–55), prestige vehicles (BMW, Mercedes, Audi, Porsche, Tesla, Landcruiser), suburbs: Toorak, South Yarra, Brighton, Bayside, Mornington Peninsula
**Key angles this set:** Resale value protection, Bayside salt-air and road debris damage, prestige-car-specific intent, mobile convenience ("no workshop drop-off")

---

## Ad Creative

### Headlines (30 chars max each)

| # | Headline | Chars | Angle |
|---|----------|-------|-------|
| 1 | PPF Melbourne. We Come To You. | 30 | Geo + mobile anchor |
| 2 | PPF — Guards Your Resale Value | 30 | Resale value protection |
| 3 | PPF at Your South Yarra Home | 28 | Hyper-local geo |
| 4 | Certified PPF Techs. Book Now. | 30 | Trust + CTA |
| 5 | Mobile PPF. Skip the Workshop. | 30 | Convenience differentiator |

**RSA pinning strategy:**
- Pin Headline 1 to Position 1 as the geo/mobile anchor — establishes service + location immediately
- Headlines 2 and 4 rotate freely in Position 2 to test resale-value vs. trust angle
- Headlines 3 and 5 rotate in Position 3 — local specificity vs. convenience hook
- Every combination reads as a complete, standalone statement

---

### Descriptions (90 chars max each)

| # | Description | Chars | Angle |
|---|-------------|-------|-------|
| 1 | Paint damage from Bayside salt air and freeway chips kills resale value. PPF stops both. | 88 | Local hazard + resale value |
| 2 | We come to you — certified techs, same quality as any Melbourne studio. Book online today. | 90 | Trust + mobile + CTA |

**Description notes:**
- Description 1 speaks directly to Bayside/coastal owners and freeway drivers — two pain points the ICP knows personally
- Description 2 neutralises the "is mobile quality as good?" objection without saying it directly
- Both descriptions work with all headline combinations

---

### Display URL Paths
- Path 1: `ppf`
- Path 2: `melbourne`
- Final: `pristinedetailers.com.au/ppf/melbourne`

---

## Keywords — Exact Match (5)

| Keyword | Search Intent | Priority |
|---------|---------------|----------|
| [paint protection film melbourne] | High — core service, ready to book | Primary |
| [ppf installer toorak] | High — suburb-specific, premium buyer | Primary |
| [mobile ppf bayside] | High — convenience seeker + geo | Primary |
| [ppf car melbourne] | High — short-tail, broad high intent | Secondary |
| [paint protection film south yarra] | Medium-High — geo-targeted research stage | Secondary |

**Keyword strategy notes:**
- [ppf installer toorak] targets the postcode where average vehicle value is highest — expect higher CPCs but stronger conversion intent
- [mobile ppf bayside] is undersupplied by competitors who only run generic Melbourne-wide terms; lower competition, strong click intent
- [ppf car melbourne] is deliberately short-tail to catch head searches that [paint protection film melbourne] might miss due to exact match restrictions

---

## Negative Keywords (3)

| Negative Keyword | Reason |
|-----------------|--------|
| self adhesive | DIY product searchers — not our service buyer |
| wholesale | Trade/B2B intent, not retail consumer |
| how to | Informational/DIY intent — not booking stage |

**Note:** Keep "vinyl wrap" and "cheap" from the May 27 negative list. These four together cover the main non-converting query patterns.

---

## Ad Extensions

- **Sitelinks:** `/services` (See All Services), `/gallery` (Before & After), `/about/reviews` (Client Reviews), `/membership` (Monthly Plans)
- **Callouts:** "Mobile Service", "Certified Technicians", "No Workshop Drop-Off", "Serving Toorak to Mornington Peninsula"
- **Structured Snippets:** Services: PPF, Ceramic Coating, Paint Correction, Interior Detailing
- **Location extension:** Enable to surface Melbourne suburb in ad (builds local trust signal)

---

## Targeting Recommendations

- **Geography:** Melbourne metro — exclude low-conversion outer fringe zones (Dandenong, Broadmeadows); tighten budget toward Inner East, Bayside, and Mornington Peninsula
- **Bid adjustments:**
  - +25% for Toorak (3142) — highest avg vehicle value, strongest PPF intent
  - +20% for Brighton (3186), South Yarra (3141)
  - +15% for Hawthorn (3122), St Kilda (3182)
  - +10% for Mornington Peninsula (3930–3945) — gravel road damage is real motivation here
- **Device:** Mobile +15% — service searchers often on their phone after a drive or in a car park
- **Ad schedule:** 7am–9pm AEST; suppress midnight–6am; consider +10% bid on weekends (Friday–Sunday) when car owners are washing/noticing damage to their vehicles
- **Audience signals (observation-only):**
  - "Luxury & prestige vehicle owners" (in-market)
  - "Auto detailing services" (in-market)
  - "New car buyers" (life event signal)
  - Customer match list (existing clients — for cross-sell, not exclusion on this campaign)
- **Audience exclusions:** Existing PPF clients (suppress for 180 days post-service); `/booking` converters in last 30 days

---

## A/B Test Recommendation

Run this Variant Set B alongside the May 27 Set A in the same RSA. Google will auto-optimise toward the better-performing headline combinations. Track:
- **Primary signal:** `/booking` form submission (conversion)
- **Secondary signal:** Headline combination CTR in RSA asset report
- **Evaluation:** Review after 500+ impressions per headline; pause under-performers at 14-day mark

---

## Budget Recommendation

- **Daily budget:** $40–60 AUD (testing phase, consistent with prior set)
- **Bid strategy:** Maximise Conversions — switch to Target CPA once 30+ conversions logged
- **Target CPA:** $80–120 AUD per `/booking` form submit
- **PPF note:** PPF jobs are higher-ticket ($800–2,500+ AUD depending on coverage) — a $100 CPA is still strong ROI

---

## Pre-Launch Checklist

- [ ] Google conversion tag fires on `/booking` thank-you page
- [ ] UTM: `utm_source=google&utm_medium=cpc&utm_campaign=ppf-search&utm_content=rsav2-may31`
- [ ] Landing page loads under 3 seconds on mobile (test from Melbourne IP)
- [ ] Negative keyword list updated with `self adhesive`, `wholesale`, `how to` additions
- [ ] Ad extensions uploaded and reviewed
- [ ] Both RSA variants (Set A + Set B) active in same ad group for combined RSA learning
