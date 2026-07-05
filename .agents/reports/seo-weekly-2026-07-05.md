# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-07-05
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Status: Progress This Week, Core Blockers Still Open

Three meaningful wins this week closed issues that had been open for 4+ weeks:

- `app/page.tsx` — `'use client'` removed. Homepage is now a proper server component with metadata. This alone unlocks correct title/description indexing for the #1 priority query ("mobile car detailing Melbourne") and allows FAQPage JSON-LD to be added.
- `app/services/page.tsx` and `app/membership/page.tsx` — both now export metadata. Duplicate description problem (10 pages, flagged by Semrush) fixed.
- 26 broken `/about` links fixed. Internal link equity now flows correctly to key pages.

However, the three highest-impact technical items remain unimplemented for the **sixth consecutive week**:

- `app/sitemap.ts` — still does not exist
- `app/robots.ts` — still does not exist
- `public/llms.txt` — still does not exist

And a new issue emerged from this week's fixes: the metadata titles across all key pages are now live but keyword-empty — they won't compete in SERPs.

---

## Top 3 Priority Issues

---

### Priority 1 — CRITICAL (Week 6): No Sitemap, No Robots.txt, No llms.txt

**Page:** Site-wide (`app/`)

**Problem:**

Six weeks. Jordan has published on a Tuesday/Friday schedule since early May — that is at minimum 12 articles published without a sitemap. Each article relies entirely on Googlebot re-crawling `/blog` and following new links from the index page. On a domain with low backlink authority, blind re-crawl can mean 4–8 weeks of non-indexation per article.

GPTBot (ChatGPT), PerplexityBot, ClaudeBot (Anthropic), and Google-Extended (Gemini/AI Overviews) all check `robots.txt` before crawling. Without one, these bots operate on default assumptions — some don't crawl at all. Pristine Detailers has published 12+ expert articles since May and has **zero explicit invitation** for any AI engine to read them.

The Essential membership price changed to $99/mo on 2026-06-27. Any AI system that cached the old "$79/month" from a prior crawl can't know the price changed without recrawl signals. Without `robots.txt` allowing recrawl and `sitemap.xml` signalling content freshness via `lastModified`, that stale AI answer persists indefinitely.

**Specific fix:**

Create `app/sitemap.ts`:

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
    url: `https://pristinedetailers.com.au/blog/${post.slug}`,
    lastModified: post.published_at ?? new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const staticPages = [
    { url: 'https://pristinedetailers.com.au', priority: 1.0 },
    { url: 'https://pristinedetailers.com.au/services', priority: 0.9 },
    { url: 'https://pristinedetailers.com.au/membership', priority: 0.9 },
    { url: 'https://pristinedetailers.com.au/blog', priority: 0.8 },
    { url: 'https://pristinedetailers.com.au/gallery', priority: 0.6 },
    { url: 'https://pristinedetailers.com.au/booking', priority: 0.8 },
    { url: 'https://pristinedetailers.com.au/contact', priority: 0.5 },
  ].map(p => ({ ...p, changeFrequency: 'monthly' as const }));

  return [...staticPages, ...articles];
}
```

Create `app/robots.ts`:

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

Create `public/llms.txt`:

```
# Pristine Detailers — Melbourne Mobile Car Detailing

## About
Pristine Detailers is a premium mobile car detailing service operating across Melbourne, Australia. Certified technicians travel to the customer's home, office, or car park — no workshop drop-off. Operating for 6 years. 4.9 stars across 240 reviews. 2,400+ cars detailed.

## Services and Pricing (excl. GST)
- Maintenance Detail: from $99
- Basic Detailing: from $150
- Revitalise Package: from $300
- Ceramic Coating (incl. paint correction): from $750 — manufacturer-backed warranty up to 8 years
- Paint Protection Film: from $2,900

## Membership
- Essential: $99/month — monthly wash + seal, priority booking, member pricing
- Signature: $149/month — bi-monthly detail, ceramic maintenance, exclusive add-on pricing (most popular)
- Members save up to 35% annually compared to pay-per-visit

## Service Areas
Toorak, South Yarra, Brighton, Bayside suburbs, St Kilda, Richmond, Hawthorn, Inner East Melbourne, Mornington Peninsula

## Key Facts
- Mobile only — no workshop drop-off required
- Requires access to water and a standard power point at location
- Notable cars serviced: Porsche, Ferrari, McLaren, Range Rover, BMW, Mercedes-AMG, Tesla, Audi, BYD, Lotus
- Booking: https://pristinedetailers.com.au/booking
```

After deploying, submit `https://pristinedetailers.com.au/sitemap.xml` to Google Search Console manually via the Sitemaps report.

**Time to implement:** 45 minutes. This is week six.

**Escalation note:** This is a 30-minute implementation that has been open since the May 17 brief. If sitemap.ts and robots.ts are not deployed before the next audit (2026-07-12), this should be flagged to Harshad directly with a calendar hold for implementation.

---

### Priority 2 — HIGH (NEW): Metadata Exists on All Pages But Titles Are Keyword-Empty

**Pages:** `/` (homepage), `/services`, `/membership`, `/blog`

**Problem:**

This week's fixes deployed metadata on every key page — that's real progress. But the titles themselves don't contain the keywords Melbourne car owners actually search. A title that doesn't include the target query earns fewer clicks in SERPs and earns no relevance signal from Google.

Current titles vs. what they should be:

| Page | Current title | Problem |
|------|--------------|---------|
| `/` | `Pristine Detailers — Melbourne's Premium Mobile Detailing` | Brand-first; "mobile car detailing Melbourne" (the #1 target query) is not in the title |
| `/services` | `Services — Pristine Detailers` | No Melbourne, no service names — invisible for "ceramic coating Melbourne", "PPF Melbourne" |
| `/membership` | `Membership Plans — Pristine Detailers` | No price, no Melbourne — invisible for "car detailing membership Melbourne" |
| `/blog` | `Blog — Pristine Detailers` | No keyword at all; gives Googlebot no signal about what this section covers |
| `/blog/[slug]` | `[Article title] — Pristine Detailers` | No Melbourne geographic signal in any article SERP listing |

A competitor whose services page title reads "Ceramic Coating Melbourne — From $750 | Studio Name" will outclick Pristine's "Services — Pristine Detailers" on brand recognition alone. Every page that lacks a Melbourne keyword in its title is forfeiting click-through rate to competitors who have one.

**Specific fix — five one-file changes, each under 5 minutes:**

`app/page.tsx` — change title to:
```tsx
title: 'Mobile Car Detailing Melbourne | Ceramic Coating & PPF | Pristine Detailers',
description: 'Melbourne's premium mobile detailing service — we come to you. Ceramic coating from $750, PPF from $2,900, membership from $99/mo. Serving Toorak, Brighton, South Yarra and 60+ suburbs.',
```

`app/services/page.tsx` — change title to:
```tsx
title: 'Car Detailing Services Melbourne | Ceramic Coating, PPF & Detailing | Pristine Detailers',
description: 'Mobile car detailing in Melbourne — ceramic coating from $750 (up to 8yr warranty), PPF from $2,900, maintenance detail from $99. We come to your driveway.',
```

`app/membership/page.tsx` — change title to:
```tsx
title: 'Car Detailing Membership Melbourne | $99/mo Essential · $149/mo Signature | Pristine Detailers',
description: 'Melbourne car detailing membership from $99/month. Monthly wash + seal, priority booking, member pricing on all services. Cancel any time.',
```

`app/blog/page.tsx` — change title to:
```tsx
title: 'Car Detailing Blog Melbourne | Ceramic Coating & Paint Protection Guides | Pristine Detailers',
```

`app/blog/[slug]/page.tsx` line 30 — change the article title pattern:
```tsx
// Change:
title: `${data.title} — Pristine Detailers`,
// To:
title: `${data.title} | Melbourne Car Detailing | Pristine Detailers`,
```

This last change adds a Melbourne signal to every article title in Google SERPs — immediately affecting all 12+ published articles with zero content changes. It's a one-line edit.

**Time to implement:** 20 minutes total for all five files.

---

### Priority 3 — HIGH (Carry-forward, Week 4): No Structured Data Anywhere on the Site

**Pages:** `/` (homepage), site-wide layout

**Problem:**

There is still no JSON-LD schema markup on any page. No FAQPage, no LocalBusiness, no AggregateRating. This affects both traditional SEO (rich results eligibility) and AI citation (structured data gives AI engines programmatically extractable facts — Q&A pairs, ratings, service details — without relying on prose extraction).

The homepage FAQ (`home.tsx` FAQSection, line 1007) is rendered via `useState` accordion — the Q&A content is client-side only and invisible to every AI crawler. The FAQ was updated this week as part of the $99/mo price fix, but that update has zero visibility to AI systems because the FAQ never appears in the initial HTML.

The homepage is now a server component (`app/page.tsx`) — this means FAQPage JSON-LD can be added directly to the page file without touching `home.tsx`.

The homepage also shows two different review counts: "30 reviews" (line 69) and "39 reviews" (line 956). The product marketing context says 240 reviews. Adding AggregateRating schema with a wrong count creates a structured data trust liability — fix the displayed counts first, then add schema.

**Specific fix:**

Step 1 — Fix review count in `home.tsx`:
- Line 69: change "30 reviews" to "240 reviews"
- Line 956: change "39 reviews" to "240 reviews"

Step 2 — Add FAQPage JSON-LD to `app/page.tsx` after the metadata export:

```tsx
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do you come to my home or office?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — our mobile team comes to you. We need access to water and a standard power point, and a covered or open space roughly the size of two parking bays." }
    },
    {
      "@type": "Question",
      "name": "How long does a ceramic coating application take?",
      "acceptedAnswer": { "@type": "Answer", "text": "A full ceramic coating application, including paint correction, typically takes a full day." }
    },
    {
      "@type": "Question",
      "name": "Can I combine PPF and ceramic coating?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — and we recommend it. PPF goes on first as a physical barrier against stone chips, then ceramic coating on top for a hydrophobic finish and self-heal enhancement." }
    },
    {
      "@type": "Question",
      "name": "What does the Pristine Detailers membership include?",
      "acceptedAnswer": { "@type": "Answer", "text": "The Essential membership is $99/month and includes one monthly wash-and-seal detail, priority same-week booking, and member pricing on all other services. The Signature plan is $149/month and includes a bi-monthly full detail, ceramic maintenance, and exclusive add-on pricing." }
    }
  ]
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Home />
    </>
  );
}
```

Step 3 — Add `LocalBusiness` + `AggregateRating` to `app/layout.tsx` (applies site-wide). Add as a `<script type="application/ld+json">` block inside `<head>`:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Pristine Detailers",
  "description": "Premium mobile car detailing service in Melbourne. Ceramic coating, PPF, paint correction, and maintenance detailing — we come to you.",
  "url": "https://pristinedetailers.com.au",
  "telephone": "",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Melbourne",
    "addressRegion": "VIC",
    "addressCountry": "AU"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -37.8136,
    "longitude": 144.9631
  },
  "areaServed": ["Toorak", "South Yarra", "Brighton", "Bayside", "St Kilda", "Richmond", "Hawthorn", "Inner East Melbourne", "Mornington Peninsula"],
  "priceRange": "$$$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "240",
    "bestRating": "5"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Car Detailing Services",
    "itemListElement": [
      { "@type": "Offer", "name": "Maintenance Detail", "price": "99", "priceCurrency": "AUD" },
      { "@type": "Offer", "name": "Basic Detailing", "price": "150", "priceCurrency": "AUD" },
      { "@type": "Offer", "name": "Revitalise Package", "price": "300", "priceCurrency": "AUD" },
      { "@type": "Offer", "name": "Ceramic Coating", "price": "750", "priceCurrency": "AUD" },
      { "@type": "Offer", "name": "Paint Protection Film", "price": "2900", "priceCurrency": "AUD" }
    ]
  }
}
```

**Time to implement:** 60 minutes total (review count fix: 5 min; FAQPage JSON-LD: 20 min; LocalBusiness JSON-LD: 35 min).

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "Stone Chip Protection Melbourne: Why Freeway Driving Destroys Your Paint and How PPF Stops It"

**Target queries:** "stone chip protection Melbourne", "rock chip protection Melbourne", "PPF stone chips", "paint chip protection car Melbourne", "Eastern Freeway paint damage"

**The gap:** There is zero content on the site targeting stone chip queries. Stone chips on Melbourne freeways are the #1 anxiety driver for the ICP (mentioned verbatim in customer language: "The stone chips on the freeway are killing me"). This query is high commercial intent — the person searching has already experienced the problem and is ready to book. PPF ($2,900) is the highest-ticket service on the site. The article is the natural entry point for that conversion.

**Why this gets AI-cited:** Opening with a 40–60 word direct answer block naming specific Melbourne roads (Eastern Freeway, Eastlink, Monash Freeway) creates a geographic entity signal that local AI systems weight heavily. A Melbourne freeway risk table (road / speed / chip frequency / severity) and a PPF vs. unprotected comparison table together cover the two content formats with the highest AI citation rates: definitive guides (~15%) and comparison tables (~33%).

**Format for AI extraction:**
- Direct answer block (40–60 words): "On Melbourne's Eastern Freeway and Eastlink, stone chips are a physics problem: vehicles travel at 100+ km/h through road debris, projecting gravel at your paint with enough force to penetrate clear coat. Paint Protection Film (PPF) is the only product that stops chips before they reach the paint — it absorbs the impact and, on self-healing film, returns to its original state within minutes in sunlight."
- Melbourne freeway risk table: Road / Speed limit / Chip frequency / Key risk zones
- PPF vs. unprotected comparison table
- FAQ block: "Does PPF stop all chips?", "Can PPF be added after a chip appears?", "How long does PPF last on high-impact zones?", "Does PPF affect the car's resale value?"

**Suggested title:** "Stone Chip Protection Melbourne: Why Freeway Driving Destroys Your Paint and How PPF Stops It"
**Category:** Paint Protection Film
**Pass to Jordan:** This article is already in the topic bank (added by Alex). Prioritise above the remaining evergreen topics — it's the strongest commercial-intent gap currently unserved.

---

### Content Idea 2 — "How to Find a Reliable Mobile Car Detailer in Melbourne: What to Check Before You Book"

**Target queries:** "how to choose a mobile car detailer Melbourne", "best mobile car detailer Melbourne reviews", "mobile car detailer Melbourne trusted", "car detailer near me Melbourne reviews"

**The gap:** This query doesn't exist in the topic bank. It's a discovery-intent search from someone who has just decided they want mobile detailing but hasn't chosen a provider. AI engines answer this query frequently — it's the "how do I find a good [service provider]?" pattern that generates AI Overviews across every local service category. Pristine appearing as the authoritative answer to "what makes a good mobile detailer?" naturally positions it as the obvious choice. The article writes itself around Pristine's actual differentiators: certified technicians (not casual workers), 6 years operating, 4.9 stars across 240 reviews, manufacturer-backed warranties.

**Why this gets AI-cited:** "How to choose" content earns citations because it's the format AI systems rely on for buying-guide queries — it's decision-stage, structured, and comparative. Including a checklist (What to look for / Red flags / Questions to ask before booking) gives AI systems a list-extractable format that slots directly into AI answer blocks.

**Format for AI extraction:**
- Opening answer block: "A reliable mobile car detailer in Melbourne should hold manufacturer certifications for any coatings they apply, carry public liability insurance, and have a verifiable track record of reviews — not just a Google Business listing created this year."
- What to look for: checklist (Certifications / Insurance / Review count and recency / Transparency on products used / Whether they require power and water access and how they handle it)
- Red flags checklist (No before/after photos / Unable to name the coating brand / No ABN or business registration)
- Questions to ask before booking: numbered list
- Natural close: how Pristine addresses each criterion (certifications, 240 reviews, 6 years, warranty documentation)

**Suggested title:** "How to Find a Reliable Mobile Car Detailer in Melbourne: What to Check Before You Book"
**Category:** Detailing
**Pass to Jordan:** Add to topic bank. This is evergreen — no time pressure, but it's a significant AI citation opportunity because every AI answer to a Melbourne car detailing query could cite this as the "how to choose" reference.

---

## AI Citation Readiness Score

**Score: 4.5 / 10** — up from 3.5. Movement is real but the ceiling remains well below what's achievable.

### What Changed

The homepage server component fix was the single most impactful change since the brief began. A `'use client'` page blocked metadata export, FAQPage JSON-LD, and correct title indexing simultaneously. That's resolved.

Duplicate meta descriptions are fixed. Internal link equity now flows to key pages from the footer.

| Signal | Status | Change from 2026-06-28 |
|--------|--------|-------------------------|
| Server-side rendered content | `/blog`, `/blog/[slug]`, `/services`, `/membership`, `/` | **+0.5** — homepage now SSR |
| Homepage metadata | ✅ Title + description now exported | **Fixed** |
| Services metadata | ✅ Title + description now exported | **Fixed** |
| Membership metadata | ✅ Title + description now exported | **Fixed** |
| Metadata title quality | Weak — no Melbourne keywords in /services, /membership, /blog titles | **New issue** |
| Blog index title | `'Blog — Pristine Detailers'` — no keyword | No change |
| Blog article title pattern | `${title} — Pristine Detailers` — no Melbourne | No change |
| Structured data (schema) | None anywhere on the site | No change |
| `robots.txt` | Missing | No change — week 6 |
| `sitemap.xml` | Missing | No change — week 6 |
| `llms.txt` | Missing | No change |
| FAQ content (AI-extractable) | Client-rendered via useState — invisible to all crawlers | No change |
| Services pricing (AI-extractable) | Tab-hidden via `display: none` — invisible to all crawlers | No change |
| Review count accuracy | "30 reviews" (line 69) and "39 reviews" (line 956) — both wrong, should be 240 | No change |
| AI bot access | No robots.txt — AI bots operate on defaults | No change |
| Pricing accuracy for AI | $99/mo on site — but no structured signal to trigger AI cache refresh | No change |

### What Needs to Happen for Score to Move Above 6.0

| Fix | Score Impact | Effort | Status |
|-----|-------------|--------|--------|
| Add `robots.txt` explicitly allowing AI bots | +0.5 | 20 min | Week 6 |
| Add `sitemap.ts` with all blog slugs | +0.3 | 30 min | Week 6 |
| Add `llms.txt` to `public/` | +0.3 | 20 min | Not done |
| Fix metadata title tags (5 pages) | +0.4 | 20 min | **New — do this week** |
| Add FAQPage JSON-LD on homepage | +0.5 | 20 min | Not done |
| Fix review count (→ 240 on homepage) | +0.2 | 5 min | Not done |
| Add `LocalBusiness` + `AggregateRating` schema to layout | +0.5 | 35 min | Not done |
| Add `Article` schema to blog post page | +0.2 | 20 min | Not done |
| Fix services tab-hidden pricing | +0.2 | 30 min | Not done |

**Total available improvement: +3.1 points → score of ~7.6/10.** Total effort: under 3 hours. Every item is independent and deployable on its own.

---

## Quick-Win Topics for Jordan's Topic Bank

**Updates to existing topic bank entries:**

1. **"Winter car care Melbourne"** — The brief in the topic bank says "write before July 4." It is now July 5, but Melbourne winter runs through August. The article is still timely and the search volume for "winter car care Melbourne" peaks in July-August. Remove the "before July 4" hard deadline; update the flag to: *"Still timely — Melbourne winter runs through August. Publish before August 1 to capture peak seasonal volume."* Do not remove from the topic bank; prioritise before other evergreen entries.

2. **New topic (add to bank):** "How to find a reliable mobile car detailer in Melbourne: what to check before you book" — Discovery-intent query that positions Pristine as the authoritative buying guide for anyone entering the mobile detailing category. See Content Idea 2 above for full brief. Detailing category.

**No pricing corrections needed this week.** The "$79/mo" reference was updated in the June 28 brief; Jordan's topic bank entry for "membership vs pay-as-you-go" already shows the correct $99/mo Essential and $149/mo Signature prices.

---

## Carry-Forward Flags

All items from prior weeks that are not yet Priority 1–3 above remain open:

- **Services tab-hidden pricing** (`components/pages/services.tsx` line 104): `display: selected === service.id ? 'block' : 'none'` hides all non-selected service pricing from Google and every AI crawler. Rendering all service body content in HTML (with JS tab state on top) is the fix. One-line change in the render.
- **Homepage broken gallery link** (`components/pages/home.tsx` line 906): `href="#"` → `href="/gallery"`. 5-minute fix, still open.
- **`app/journal/page.tsx` is dead code**: The `next.config.mjs` redirect (`/journal` → `/blog`, permanent) means these files are never served. Can be safely deleted; reduces developer confusion, no SEO risk.
- **Blog article `Article` schema**: `app/blog/[slug]/page.tsx` renders server-side but has no `Article` JSON-LD. Adding `datePublished`, `author`, and `about` fields would make every blog article eligible for Google's AI Overview article extraction and Perplexity citation.

---

*Next audit: 2026-07-12*
*ESCALATE NOW: If `sitemap.ts` + `robots.ts` are not deployed by 2026-07-12, this should be flagged to Harshad directly with the specific implementation time (45 minutes) and a request to block calendar time this week. Six weeks is too long for a 45-minute fix.*
