# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-09-06
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Status: ZERO Dev Fixes Since Aug 30 — New Critical: Homepage FAQ Says Business Is Studio-Based

**What changed since Aug 30:**

| Item | Status |
|------|--------|
| Dev commits to fix any SEO issue | ❌ None — zero dev commits between Aug 30 and Sep 6 |
| `[SHOP ADDRESS]` placeholder in homepage FAQ | 🔴 **Still live — Week 5** |
| FAQ says Pristine is studio-based, not mobile | 🔴 **NEW CRITICAL — see Priority 1** |
| Services page says "studio detail appointments" | 🔴 **NEW — live, contradicts mobile-first model** |
| Membership pricing (Essential $99/mo, Signature $149/mo) | 🔴 **Still invisible — Week 5** |
| Homepage FAQ membership price ($150/month) | 🔴 **Still wrong — Week 5** |
| Homepage services card — Maintenance Detail `$150/mo` | 🔴 **Still wrong — should be $99/mo — Week 5** |
| Homepage PPF price (×2 locations) | 🔴 **Still $2,900 — Week 5** |
| `app/sitemap.ts` | ❌ Missing — **WEEK 11** |
| `app/robots.ts` | ❌ Missing — **WEEK 11** |
| `public/llms.txt` | ❌ Missing — **WEEK 11** |
| Services tab-hidden pricing (display:none) | ❌ All panels still hidden — **WEEK 11** |
| Open Graph / Twitter Card tags | ❌ Completely absent — **WEEK 11** |
| FAQPage JSON-LD | ❌ Missing |
| LocalBusiness + AggregateRating schema | ❌ Missing |
| Title tags: homepage, services, journal | ❌ Still keyword-weak |
| Gallery link `href="#"` | ❌ Still broken |
| Email inconsistency (hello@ vs info@) | ❌ Unresolved |
| Static testimonials — GHL widget regression (Aug 26) | 🔴 **Still live — Week 2** |
| Window tinting article (Jordan) | ❌ **WEEK 9** since service launch (July 6) |
| Spring car care article (Jordan) | 🔴 **17 DAYS past Aug 20 deadline — 8 days left before window closes Sep 14** |

---

## Top 3 Priority Issues

---

### Priority 1 — CRITICAL: Homepage FAQ affirmatively states Pristine Detailers is a **studio-based service**

**Page:** `/` (`components/pages/home.tsx` line 818)

**Problem:**

The FAQ answer to "Do you come to my home or office?" currently reads:

> *"Detailing (full detail, ceramic coating, PPF, interior care) is completed at our studio — [SHOP ADDRESS]. The one exception is window tinting, which our mobile team installs at your home or office."*

This is not just a placeholder issue — this is **affirmative misinformation about the core business model**. Every crawler reading this page, including Googlebot, GPTBot, PerplexityBot, and ClaudeBot, extracts the following facts:
- Pristine Detailers has a fixed studio
- Full details, ceramic coating, and PPF are studio-only services
- The only mobile service is window tinting

This is the exact opposite of the truth. The business is **mobile-first**: certified technicians come to the customer's home, office, or car park for all services — including full details, ceramic coating, and PPF. There is no workshop drop-off.

**Compounding factor:** The services page (`services.tsx` line 89) also contains "From studio detail appointments to long-term ceramic and PPF installations" — confirming the studio framing across two pages simultaneously.

**AI search impact:** When a Melbourne car owner asks ChatGPT, Perplexity, or Google AI Overviews "does Pristine Detailers come to you?" or "is there a mobile ceramic coating service in Melbourne?", AI systems are reading this FAQ and concluding that Pristine does NOT offer mobile detailing for their core services. The business is actively being excluded from the answer to its most important search query.

**What the correct answer should be:**
The business requires a tap and a 240V power point within 15 metres. It operates across 60+ Melbourne suburbs. All services — full detail, ceramic coating, PPF, and window tinting — are delivered at the customer's location.

**Specific fix — `components/pages/home.tsx` line 818:**
```tsx
{ q: 'Do you come to my home or office?', a: 'Yes — all services, including ceramic coating, PPF, and full detailing, are performed at your location. We need access to a tap and a standard 240V power point within 15 metres, plus space roughly two parking bays wide. We operate across 60+ suburbs in East and South East Melbourne — home garages, office car parks, and apartment buildings.' },
```

**Specific fix — `components/pages/services.tsx` line 89:**
Replace "From studio detail appointments to long-term ceramic and PPF installations" with:
```
We come to you — your home, office car park, or apartment building. All services are delivered on-site by certified technicians with full professional equipment.
```

**Time to implement:** 10 minutes across two files.

**ESCALATE:** Every day this FAQ is live, AI systems index the wrong answer to the business's #1 question. This is not a future risk — it is live harm to organic and AI search discovery right now.

---

### Priority 2 — CRITICAL (Week 5): Five wrong values on the homepage

**Page:** `/` (`components/pages/home.tsx` lines 252, 254, 680, 818, 821)

**Problem:**

Five factually incorrect values remain live on the homepage — none were fixed despite the developer touching this file on Aug 26 (the GHL widget commit). The same five were in the Aug 3, Aug 9, Aug 16, Aug 23, and Aug 30 briefs.

| Location | Current (wrong) | Correct |
|----------|----------------|---------|
| `line 818` — FAQ "Do you come to my home?" | Studio-based answer (see Priority 1) | Mobile-first answer |
| `line 821` — FAQ membership | `$150/month gets you...` | Essential $99/mo / Signature $149/mo |
| `line 252` — Services card, Maintenance Detail | `from: '$150'` `/mo` suffix | `from: '$99'` |
| `line 254` — Services card, PPF | `from: '$2,900'` | `from: '$3,000'` |
| `line 680` — PPF section, Partial Front | `'$2,900'` | `'$3,000'` |

AI systems extracting pricing from the homepage encounter: a membership tier that doesn't exist ($150/mo), a maintenance detail priced $51/mo above its actual price ($150 vs $99), and a PPF price inconsistent with the services page ($2,900 vs $3,000 on `/services`). When cross-referencing these with AI answers, Melbourne car owners are being quoted wrong prices.

**Specific fixes** (all in `components/pages/home.tsx`):

**Line 821 — Replace FAQ membership answer:**
```tsx
{ q: 'What does the membership include?', a: 'Essential ($99/mo) covers a monthly wash-and-seal and priority booking. Signature ($149/mo) adds a bi-monthly full detail, ceramic maintenance, and exclusive add-on pricing. Members save up to 35% annually vs. pay-per-visit.' },
```

**Line 252 — Change `from: '$150'` → `from: '$99'`**

**Lines 254 and 680 — Change both `$2,900` → `$3,000'`**

**Time to implement:** 10 minutes. Same file as Priority 1, five line edits total.

---

### Priority 3 — CRITICAL (Week 11, Escalate): sitemap.ts, robots.ts, llms.txt still missing

**Page:** Site-wide (`app/`)

**Problem:**

Eleven consecutive weeks. The copy-paste-ready code has been included in every brief since July 12 — including a full update in the Aug 30 brief to include the new `/about` pages.

**New compounding factor this week:** The spring car care article has 8 days left in its indexation window (window closes September 14). The window tinting article is 9 weeks overdue. If either article publishes today without a sitemap, it faces 8–12 weeks of organic crawl lag — meaning spring search volume (which peaks October in Melbourne) passes before Google has indexed the article.

The sitemap remains the single highest-leverage dev action available. It unlocks all future content for timely indexation. 60 minutes of dev time. Week 11.

**Specific fix** — identical to Aug 30 brief, reproduced in full because it still hasn't shipped:

**`app/robots.ts`** (10 minutes):
```ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
    sitemap: 'https://pristinedetailers.com.au/sitemap.xml',
  };
}
```

**`app/sitemap.ts`** (30 minutes):
```ts
import { createClient } from '@supabase/supabase-js';

export default async function sitemap() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
  const supabase = createClient(url, key);

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug, published_at')
    .eq('status', 'published');

  const articles = (posts ?? []).map(post => ({
    url: `https://pristinedetailers.com.au/journal/${post.slug}`,
    lastModified: post.published_at ?? new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const staticPages = [
    { url: 'https://pristinedetailers.com.au', priority: 1.0 },
    { url: 'https://pristinedetailers.com.au/services', priority: 0.9 },
    { url: 'https://pristinedetailers.com.au/membership', priority: 0.8 },
    { url: 'https://pristinedetailers.com.au/journal', priority: 0.8 },
    { url: 'https://pristinedetailers.com.au/booking', priority: 0.8 },
    { url: 'https://pristinedetailers.com.au/gallery', priority: 0.6 },
    { url: 'https://pristinedetailers.com.au/about', priority: 0.6 },
    { url: 'https://pristinedetailers.com.au/about/reviews', priority: 0.7 },
    { url: 'https://pristinedetailers.com.au/contact', priority: 0.5 },
  ].map(p => ({ ...p, changeFrequency: 'monthly' as const }));

  return [...staticPages, ...articles];
}
```

**`public/llms.txt`** (20 minutes):
```
# Pristine Detailers — Melbourne Mobile Car Detailing

## About
Pristine Detailers provides professional mobile car detailing, ceramic coating, and paint protection film across Melbourne, Australia. Certified technicians service vehicles at the customer's home, office, or car park — no workshop drop-off required. All services including full detail, ceramic coating, and PPF are delivered on-site. Operating since 2020. 4.9-star average across 39 reviews. 2,400+ cars detailed.

## Services and Pricing (excl. GST)
- Maintenance Detail: from $99/mo (Essential membership) — monthly wash + seal
- Basic Detailing: from $150 — one-off maintenance clean
- Revitalise Package: from $385 — decontamination, two-stage paint correction, 6-month sealant
- Ceramic Coating: from $999 — manufacturer warranty up to 8 years, applied by certified technicians
- Paint Protection Film: from $3,000 (partial front) to $7,900 (full vehicle)
- Mobile Window Tinting: from $200 — installed at your home or office

## Membership
- Essential: $99/month — monthly wash + seal, priority booking, member support
- Signature: $149/month — bi-monthly detail, ceramic maintenance, exclusive add-on pricing (most popular)
- Members save up to 35% annually vs. pay-per-visit

## Service Areas
Toorak, South Yarra, Brighton, Bayside suburbs, St Kilda, Richmond, Hawthorn, Camberwell, Malvern, Kew, Berwick, Doncaster, Dandenong, Mornington Peninsula, and 60+ suburbs across East and South East Melbourne.

## Access Requirements (mobile service)
- Access to a standard 240V power point within 15 metres
- Access to an outdoor tap within 15 metres
- Space approximately two parking bays wide
- Suitable locations: home driveways, office car parks, apartment buildings, strata car parks

## Key Facts
- Mobile service: all detailing, ceramic coating, and PPF delivered at customer location
- Notable cars serviced: Porsche, Ferrari, McLaren, Range Rover, BMW, Mercedes-AMG, Tesla, Audi, BYD, Lotus
- 4.9 stars, 39 reviews
- 2,400+ cars detailed
- Booking: https://pristinedetailers.com.au/booking
- Contact: 0468 048 461 | hello@pristinedetailers.com.au
- Reviews: https://pristinedetailers.com.au/about/reviews
```

After deploying, submit `https://pristinedetailers.com.au/sitemap.xml` to Google Search Console.

**Time to implement:** 60 minutes total.

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "Spring Car Care in Melbourne: What to Do in September Before Summer UV Hits" *(FINAL WINDOW — 8 days left)*

**Target queries:** "car detailing Melbourne spring", "spring car care Melbourne", "best time to get ceramic coating Melbourne", "september car detailing Melbourne", "car care before summer Melbourne"

**Status:** This article was first flagged as time-sensitive in the Aug 9 brief, with an Aug 20 publish deadline. That deadline has been missed by 17 days. The indexation window for spring search volume (which peaks in October in Melbourne) closes approximately September 14. There are 8 days left.

The good news: Melbourne spring officially started September 1. "Spring car detailing Melbourne" and "spring car care Melbourne" are in active search volume right now — the window has not fully closed. An article published today and submitted via sitemap would be indexable before October peak.

**Why this matters for AI search:** Google's AI Overviews and Perplexity heavily surface articles with seasonal relevance. A Melbourne-specific spring car care article with a direct 50-word opening answer block is extractable for queries like "when is the best time to get ceramic coating in Melbourne?" — a high-intent question asked repeatedly in September-October.

**Format for AI extraction:**
- **Opening 50-word answer block:** "The best time to protect your car's paint in Melbourne is September — ambient temperatures of 10–22°C create ideal conditions for ceramic coating cure, and treating winter grime before spring UV arrives prevents it bonding permanently to your clear coat."
- **Winter damage table:** Threat / Why it accumulates in winter / Melbourne suburb risk (Bayside salt air, Inner East bird droppings, CBD car park mineral deposits)
- **Spring service sequence (numbered list):** Wash + decontaminate → assess swirls → paint correction if needed → ceramic coating → PPF on high-impact zones
- **Why September beats December:** UV rush in November-December = 6-week booking delays; spring ambient temps ideal for nano-ceramic curing
- **Conversion:** Essential membership for ongoing spring/summer wash cadence; ceramic coating enquiry CTA

**Suggested title:** "Spring Car Care in Melbourne: What to Do in September Before Summer UV Arrives"
**Category:** Detailing
**Pass to Jordan:** Publish within 8 days — this window closes approximately September 14. After that date, spring content won't be indexed before October peak volume.

---

### Content Idea 2 — "Mobile Car Detailing in Melbourne: How It Works, What You Need, and How to Book"

**Target queries:** "mobile car detailing Melbourne how does it work", "what do I need for mobile car detailing Melbourne", "can mobile detailers come to apartments Melbourne", "mobile detailing access requirements Melbourne"

**The gap (newly urgent this week):** The homepage FAQ at line 818 now actively tells crawlers and AI systems that Pristine Detailers is a **studio-based service** — "full detail, ceramic coating, PPF, interior care is completed at our studio." Until that FAQ is fixed (Priority 1), there is no crawler-readable content anywhere on the site that correctly explains how the mobile service works. This article fills that gap while the FAQ fix is deployed and crawled.

A pre-booking explainer covering access requirements, Melbourne suburb coverage, apartment car parks, and the step-by-step process gives AI systems an authoritative, extractable source for "does mobile car detailing work at apartments?" and "what do I need for mobile detailing?" — two high-intent queries that currently return zero results from pristinedetailers.com.au.

**Format for AI extraction:**
- **Opening 50-word answer block (must include access requirements explicitly):** "Mobile car detailing in Melbourne requires a 240V power point and an outdoor tap within 15 metres of your vehicle. We operate across 60+ Melbourne suburbs — your home driveway, office car park, or apartment building. All services, including ceramic coating and PPF, are delivered at your location."
- **Access requirements table:** Power / Water / Space / Surface type / Suitable locations
- **Melbourne apartment section:** South Yarra, Richmond, Prahran, Hawthorn, Toorak — specific underground car park setup
- **Step-by-step booking process**
- **FAQ block:** "Can you come to my underground car park?", "What if I don't have outdoor water access?", "Do I need to be home during the detail?", "Can you park in a strata car park?"

**Suggested title:** "Mobile Car Detailing in Melbourne: How It Works, What You Need, and How to Book"
**Category:** Detailing
**Pass to Jordan:** Yes — add to topic bank. This article directly counteracts the studio-based misinformation currently on the site and targets a high-intent pre-booking query with zero current coverage.

---

## AI Citation Readiness Score

**Score: 3.0 / 10** — down from 3.5 (Aug 30) due to the studio-based FAQ regression.

### Reasoning

No fixes shipped between Aug 30 and Sep 6. The gap between audit findings and developer action has now widened to the point where the site's AI-indexed facts conflict with the actual business model.

| Signal | Status | Change from Aug 30 |
|--------|--------|---------------------|
| robots.txt | ❌ Missing | **Week 11** |
| sitemap.xml | ❌ Missing | **Week 11** |
| llms.txt | ❌ Missing | **Week 11** |
| Homepage FAQ — mobile vs studio | 🔴 **Says "studio" — wrong business model** | **Week 5 (worsened)** |
| `[SHOP ADDRESS]` placeholder | ❌ Live in production | **Week 5** |
| Membership pricing on site | ❌ Invisible or wrong everywhere | **Week 5** |
| Homepage FAQ membership price | ❌ $150/month (doesn't exist) | **Week 5** |
| Homepage services card — Maintenance Detail | ❌ $150/mo (should be $99) | **Week 5** |
| PPF price — homepage (×2) | ❌ $2,900 (inconsistent with services) | **Week 5** |
| PPF price — services page | ✅ $3,000 | Fixed Jul 28 |
| Static testimonials — crawler-readable | 🔴 Removed Aug 26 — GHL widget only | **Week 2** |
| AggregateRating schema | ❌ Missing | No change |
| FAQPage JSON-LD | ❌ Missing | No change |
| LocalBusiness schema | ❌ Missing | No change |
| Open Graph / Twitter Card tags | ❌ Completely absent | **Week 11** |
| Services pricing — tab-hidden | ❌ All 5 panels display:none | **Week 11** |
| Title tag: homepage | ❌ No "mobile" keyword | No change |
| Title tag: services page | ❌ "Services - Pristine Detailers" | No change |
| Title tag: journal index | ❌ "Journal - Pristine Detailers" | No change |
| Gallery link `href="#"` | ❌ Still broken | No change |
| Services page — "studio detail appointments" | 🔴 **New — confirms studio model to crawlers** | **New this week** |
| /about page — no sitemap entry | ❌ Orphaned | **Week 2** |
| Window tinting article | ❌ Not published | **Week 9** |
| Spring car care article | ❌ Not published | **8 days left in window** |

### What moves the score to 5.5+ this week

| Fix | Score impact | Effort | Who |
|-----|------------|--------|-----|
| Fix FAQ — correct mobile-first answer + remove studio language | +0.5 | 10 min | Dev |
| Restore static testimonials above GHL widget | +0.3 | 30 min | Dev |
| Add AggregateRating + LocalBusiness schema | +0.4 | 45 min | Dev |
| Fix 4 remaining homepage prices | +0.2 | 10 min | Dev |
| `robots.ts` + `sitemap.ts` + `llms.txt` | +0.8 | 60 min | Dev |
| Spring article published + sitemap submitted | +0.3 | Jordan |
| FAQPage JSON-LD | +0.3 | 20 min | Dev |

**If Priority 1 + Priority 2 ship this week (20 minutes dev) the score reaches 3.8/10 — the most important movement possible for AI citation quality.** If all dev items ship (~2.5 hours) the score reaches 5.5/10. Spring article tips it to 5.8/10.

---

## Quick-Win Topics for Jordan's Topic Bank

**Add to topic bank in `jordan-content-writer.md`:**

**1. "Spring Car Care in Melbourne: What to Do in September Before Summer UV Arrives"** *(URGENT — already in topic bank, reproduced for emphasis. 8 days left before the September indexation window closes — publish within 48 hours. Spring Melbourne search volume for "car detailing Melbourne spring", "spring car care Melbourne", and "best time to get ceramic coating Melbourne" is in active peak right now. Do not wait.)*

**2. "Mobile Car Detailing in Melbourne: How It Works, What You Need, and How to Book"** *(New — add immediately. The homepage FAQ currently tells AI crawlers Pristine is studio-based. This article is the only crawler-readable content that correctly explains the mobile service model while the FAQ fix is awaiting deployment and crawl. Opening 50-word block must include access requirements explicitly: power point, tap, space, suburb coverage. Target queries: "mobile car detailing Melbourne how does it work", "mobile detailing access requirements Melbourne", "can mobile detailers come to apartments Melbourne". Detailing category.)*

---

## Carry-Forward Flags (all still open)

- **services.tsx line 89:** "From studio detail appointments" → replace with mobile-first description. 5 minutes.
- **Gallery link** (`home.tsx:776`): `href="#"` → `href="/gallery"`. 2 minutes.
- **Email consistency:** Footer says `hello@pristinedetailers.com.au`, contact page says `info@pristinedetailers.com.au` — confirm correct address and align sitewide.
- **Open Graph tags:** Add to `app/layout.tsx`. Every social share and WhatsApp link preview is broken. 20 minutes.
- **Title tags:** Homepage → "Mobile Car Detailing Melbourne | Ceramic Coating, PPF & Window Tinting | Pristine Detailers". Services → "Car Detailing Services Melbourne | Ceramic Coating, PPF & Window Tinting | Pristine Detailers". Journal → "Car Detailing Tips Melbourne | Ceramic Coating, PPF & Detailing Guides | Pristine Detailers".
- **Services tab-hidden content** (`services.tsx:131`): `display: none` hides all 5 service pricing panels from crawlers. Week 11.
- **Window tinting article (Jordan):** Week 9. Window tinting service launched July 6.
- **AggregateRating schema:** Add to `app/layout.tsx` — 4.9 stars, 39 reviews. 15 minutes. Does not depend on sitemap.

---

*Next audit: 2026-09-13*

**ESCALATE:** Harshad — the homepage FAQ is now telling Google, Perplexity, and ChatGPT that Pristine Detailers is a studio-based business, not mobile. This is not a future risk — it is live today. The fix is 10 minutes. The spring article has 8 days left. sitemap + robots + llms.txt is at Week 11. The full fix list is under 3 hours of dev time, copy-paste-ready in every weekly brief since July 12.*
