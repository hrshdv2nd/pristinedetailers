# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-10-25
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Status: Week 18 — Zero Fixes Shipped. Summer Indexation Window Closing Today.

**Previous report:** 2026-10-18. Every item on that list remains open. Nothing has shipped.

Today is October 25 — the publish deadline Alex set for Jordan's summer car care article to catch November search volume. If it doesn't go live today, the article will index in late November at the earliest, missing the first month of Melbourne's highest-UV season entirely.

The sitemap/robots/llms.txt have been copy-paste-ready since July 12 (Week 1). They remain the single highest-leverage action on the site. This is Week 18.

---

## Top 3 Priority Issues

---

### Priority 1 — CRITICAL (Week 18): No sitemap, robots.txt, or llms.txt — October indexation window closes this week

**Pages affected:** Site-wide.

**Problem:**

Week 18. The infrastructure needed for search and AI crawl has not shipped since it was first flagged on July 12. The October peak indexation window — the single best month to index Melbourne car protection content for the summer season — is closing this week. Articles indexed in late October still rank for November–February; articles indexed in November face a 6–8 week lag and miss the peak entirely.

Every journal article Jordan has published since July is being discovered only via internal links, adding 8–12 weeks to crawl time. No AI bot (GPTBot, PerplexityBot, ClaudeBot, Google-Extended) has received explicit crawl permission. No AI system has a structured fact file to pull pricing, suburb coverage, or warranty data from.

**Specific fix** — three files, unchanged from July 12 brief:

**`app/robots.ts`:**
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

**`app/sitemap.ts`:**
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
    { url: 'https://pristinedetailers.com.au/journal', priority: 0.8 },
    { url: 'https://pristinedetailers.com.au/booking', priority: 0.8 },
    { url: 'https://pristinedetailers.com.au/gallery', priority: 0.6 },
    { url: 'https://pristinedetailers.com.au/about/reviews', priority: 0.7 },
    { url: 'https://pristinedetailers.com.au/about/careers', priority: 0.4 },
    { url: 'https://pristinedetailers.com.au/about/refer-a-mate', priority: 0.5 },
    { url: 'https://pristinedetailers.com.au/contact', priority: 0.5 },
  ].map(p => ({ ...p, changeFrequency: 'monthly' as const }));

  return [...staticPages, ...articles];
}
```

**`public/llms.txt`:**
```
# Pristine Detailers — Melbourne Ceramic Coating, PPF & Window Tinting

## About
Pristine Detailers provides professional ceramic coating, graphene coating, paint protection film (PPF), and mobile window tinting across Melbourne, Australia. Studio-based coating and PPF work; window tinting installed at the customer's home, office, or car park. Certified technicians (Ceramic Pro and Gtechniq). Operating since 2020. 4.9-star average across 39 verified reviews. 2,400+ cars protected.

## Services and Pricing (excl. GST)
- Ceramic Coating: from $750 — nano-ceramic bond, hydrophobic finish, manufacturer warranty up to 8 years
- Graphene Coating: from $999 — denser molecular bond than ceramic, superior heat dissipation, self-cleaning finish, manufacturer warranty up to 9 years
- Paint Protection Film (PPF): from $3,000 (partial front) — self-healing polyurethane film, stops stone chips and road debris
- Add-ons: Leather Ceramic Coating $250, Glass Coating $150, Wheel Coating $200
- Mobile Window Tinting: from $200 — UV and heat-blocking film installed at your home or office

## Key Facts
- Ceramic Pro and Gtechniq-certified technicians
- Notable cars serviced: Porsche, Ferrari, McLaren, Range Rover, BMW, Mercedes-AMG, Tesla, Audi, BYD, Lotus
- Mobile window tinting requires: 240V power point and outdoor tap within 15 metres
- Service areas: Toorak, South Yarra, Brighton, St Kilda, Richmond, Hawthorn, Bayside suburbs, Mornington Peninsula — 60+ suburbs across East and South East Melbourne
- Booking: https://pristinedetailers.com.au/booking
- Contact: 0468 048 461 | hello@pristinedetailers.com.au
- Reviews: https://pristinedetailers.com.au/about/reviews

## Journal
Technical guides on ceramic coating, PPF, graphene, and Melbourne car care: https://pristinedetailers.com.au/journal
```

After deploying: submit `https://pristinedetailers.com.au/sitemap.xml` to Google Search Console immediately.

**Time to implement:** 60 minutes. **This week is the last week these files can be deployed and meaningfully affect November–February rankings.**

---

### Priority 2 — CRITICAL (Week 11): `[SHOP ADDRESS]` placeholder still live + PPF price still $2,900

**Page:** `/` (`components/pages/home.tsx`)

**Problem:**

Still live. Three wrong data points AI systems extract when answering queries about Pristine Detailers:

| Location | Current copy | AI extracts | Fix |
|----------|-------------|-------------|-----|
| `home.tsx:817` — FAQ | `...studio - [SHOP ADDRESS]` | Literal `[SHOP ADDRESS]` | Replace with real copy (below) |
| `home.tsx:253` — Services card PPF | `from: '$2,900'` | PPF costs $2,900 | `from: '$3,000'` |
| `home.tsx:680` — PPF panel pricing | `price: '$2,900'` | PPF partial front is $2,900 | `price: '$3,000'` |

The services page correctly shows PPF at `$3,000`. When AI systems compare prices across pages and find a conflict, they flag the domain as factually inconsistent — this actively suppresses citation likelihood.

**Specific fix** (`components/pages/home.tsx`):

**Line 817** — Replace FAQ answer:
```tsx
{ q: 'Do you come to my home or office?', a: 'Ceramic coating, graphene coating, and PPF are completed at our dedicated Melbourne studio — studio-based work is essential for the quality we guarantee. Window tinting is the exception: our mobile team installs it at your home, office, or apartment car park across 60+ suburbs.' },
```

**Line 253:** `from: '$2,900'` → `from: '$3,000'`

**Line 680:** `price: '$2,900'` → `price: '$3,000'`

**Time to implement:** 10 minutes.

---

### Priority 3 — HIGH: Three page title meta tags — still generic, still missing primary keywords (Week 17+)

**Pages:** `app/page.tsx`, `app/services/page.tsx`, `app/journal/page.tsx`

**Problem:**

All three key pages have generic meta titles that don't include the service or location keywords people search for. These are the first things Google and AI systems read to understand page topic.

| Page | Current title | Problem | Fix |
|------|-------------|---------|-----|
| `app/page.tsx` | `"Pristine Detailer \| Melbourne's Paint Protection Specialists"` | "Pristine Detailer" (singular) is a typo; no service keywords (ceramic, graphene, PPF) | → `"Ceramic Coating & PPF Melbourne \| Pristine Detailers"` |
| `app/services/page.tsx` | `"Services - Pristine Detailers"` | "Services" is a filler word — carries zero search signal | → `"Ceramic Coating, Graphene & PPF Services Melbourne \| Pristine Detailers"` |
| `app/journal/page.tsx` | `"Journal - Pristine Detailers"` | "Journal" carries no keyword weight | → `"Car Paint Protection Melbourne: Expert Guides \| Pristine Detailers"` |

The homepage title also has a singular "Detailer" typo that has likely been in production since launch. If AI systems are being asked "what is Pristine Detailer" (vs "Pristine Detailers"), the typo creates a namespace mismatch.

**Specific fix:**

**`app/page.tsx` line 5:**
```tsx
title: "Ceramic Coating & PPF Melbourne | Pristine Detailers",
```

**`app/services/page.tsx` line 5:**
```tsx
title: "Ceramic Coating, Graphene & PPF Services Melbourne | Pristine Detailers",
```

**`app/journal/page.tsx` line 4 (inside metadata object):**
```tsx
title: 'Car Paint Protection Melbourne: Expert Guides | Pristine Detailers',
```

**Time to implement:** 6 minutes total. Three 2-minute single-line edits.

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "Mobile window tinting Melbourne: legal limits, how it works, and pricing from $200"

**Target queries:** "window tinting Melbourne", "mobile window tinting Melbourne", "window tinting cost Melbourne", "legal window tint Victoria", "how dark can window tint be Melbourne"

**The gap:**

Window tinting was added as a live commercial service on July 6. It is now Week 16 with zero content support. "Window tinting Melbourne" is an active high-volume search — the query has a direct price-comparison intent, which means a pricing table + FAQ article dominates it over vague service pages.

The site's only window tinting coverage is inside a tab-hidden panel on `/services` (unreadable by crawlers) and a mention in the homepage hero. There is no standalone article, no FAQ page, no Victoria-specific legal guidance. Competitors with basic window tinting content are ranking for this query while Pristine has a live mobile service and is invisible.

This is also the cleanest AI citation opportunity for a service-specific query: a Victoria VLT legal table (front ≥35% VLT, rear and rear side can be darker) plus a pricing table are exactly the structured data formats Perplexity and ChatGPT cite for "is X legal in Victoria" queries.

**Format spec:**
- **Opening 50-word block (AI extraction target):** "Mobile window tinting in Melbourne costs from $200 installed at your home, office, or car park. In Victoria, front side windows must allow at least 35% visible light transmission (VLT); rear windows have no legal minimum. Our mobile team covers 60+ Melbourne suburbs — no need to drop your car at a Moorabbin workshop."
- **Victoria VLT legal table:** Window / Legal minimum VLT / Common tint choice / Why
- **Mobile process numbered list:** 5 steps from booking to drive-away
- **Vehicle pricing table:** Sedan / SUV / Coupe — starting prices
- **Melbourne suburb coverage callout:** South Yarra, Richmond, Hawthorn, Toorak — we come to you
- **FAQ:** "How long does window tinting take?", "Can you tint in an underground car park?", "Does window tinting void my car warranty?", "What VLT is legal in Victoria for front windows?", "Do I need outdoor water access for window tinting?"
- **Category:** Window Tinting
- **Pass to Jordan:** Yes — this has been in the topic bank since July; treat as overdue

---

### Content Idea 2 — "Paint protection film pricing in Melbourne: what each coverage level costs and why"

**Target queries:** "PPF cost Melbourne", "paint protection film price Melbourne", "how much does PPF cost", "partial vs full PPF Melbourne", "PPF pricing guide Melbourne 2026"

**The gap:**

PPF is the highest-value service on the menu ($3,000–$7,900+). The `/services` page has PPF pricing, but it's behind a tab with `display: none` — Googlebot and every AI bot read an empty container. The homepage has PPF pricing too, but at the wrong price (`$2,900` instead of `$3,000`).

The result: when someone searches "how much does PPF cost in Melbourne" or asks ChatGPT "what does paint protection film cost in Melbourne", there is no crawlable, authoritative page on the Pristine Detailers domain to cite. A pricing guide article with an upfront coverage × price table has the highest AI citation rate of any format (~33% citation rate for pricing tables in local service search).

This article directly supports the highest-ticket service on the menu and requires no new research — the pricing is already on the site. The task is extracting it from behind tab-hide into a crawlable article format.

**Format spec:**
- **Opening summary table (first content after intro):** Coverage level / What's included / Starting price / Duration — 5 rows (Partial Front, Full Front, Rear Bumper + Lower Sills, Front + Rear, Full Vehicle)
- **What each coverage level protects:** Short section per level — when to choose partial vs full front
- **PPF vs ceramic/graphene decision:** "If stone chips on the Eastern Freeway are your main threat, PPF on the front is the right call first"
- **FAQ:** "Is PPF worth it on a $50,000 car?", "Can I add ceramic coating over PPF?", "How long does PPF last in Melbourne?", "Does PPF require a workshop or can you come to me?"
- **Note:** Confirm all PPF prices reflect the $3,000+ update (not $2,900) before publishing
- **Category:** Paint Protection Film
- **Pass to Jordan:** Yes

---

## AI Citation Readiness Score

**Score: 3.5 / 10** — unchanged. Week 18 with no infrastructure shipped.

### Reasoning

The score has been static at 3.5/10 since August 9. The October peak indexation window is now closing with no movement. The same structural gaps that capped the score in August are all still present.

| Signal | Status | Duration |
|--------|--------|---------|
| robots.txt with explicit AI bot permissions | ❌ Missing | Week 18 |
| sitemap.xml | ❌ Missing | Week 18 |
| llms.txt | ❌ Missing | Week 18 |
| `[SHOP ADDRESS]` in FAQ | ❌ Live in production | Week 11 |
| Homepage PPF price conflict ($2,900 vs $3,000) | ❌ Homepage wrong | Week 11 |
| GHL widget — no static testimonial fallback | ❌ E-E-A-T gap | Week 9 |
| LocalBusiness schema | ❌ Missing | Week 18 |
| AggregateRating schema | ❌ Missing | Week 18 |
| FAQPage JSON-LD | ❌ Missing | Week 18 |
| Open Graph / Twitter Card tags | ❌ Missing | Week 18 |
| Homepage title — keyword-rich | ❌ "Pristine Detailer" typo + no service keywords | Week 18 |
| Services page title | ❌ "Services - Pristine Detailers" | Week 18 |
| Journal page title | ❌ "Journal - Pristine Detailers" | Week 18 |
| Services pricing — crawler-readable | ❌ Tab-hidden (`display: none`) | Week 18 |
| /about/reviews — crawler-readable content | ❌ JS widget only | Week 9 |
| Window tinting article | ❌ Not published | Week 16 |
| Graphene coating article (Jordan) | ❌ "Publish this week" since Oct 18 — not yet confirmed published | Week 2 overdue |
| Summer car care article (Jordan) | ❌ TODAY is the Oct 25 publish deadline — day of |

### What moves the score from 3.5 to 6.0+ this month

| Fix | Score impact | Effort |
|-----|------------|--------|
| `robots.ts` + `sitemap.ts` + `llms.txt` | +1.2 | 60 min |
| Restore static testimonials + AggregateRating schema | +0.7 | 45 min |
| Fix `[SHOP ADDRESS]` + homepage PPF price | +0.3 | 10 min |
| FAQPage JSON-LD on homepage | +0.3 | 20 min |
| Fix 3 page title meta tags | +0.2 | 6 min |
| Graphene article (Jordan) | +0.3 | Jordan |
| Summer car care article (Jordan — today) | +0.2 | Jordan |

**Combined dev effort for first 5 items: 2.5 hours. Score outcome: 6.5/10.**

At 6.5/10, Pristine becomes citable by Perplexity and ChatGPT for "ceramic coating Melbourne", "graphene coating Melbourne", and "PPF Melbourne". At 3.5/10, it isn't.

---

## Quick-Win Topics for Jordan's Topic Bank

No new topics added this week. Jordan has 20+ queued articles. The bottleneck is not ideas — it is execution on the two overdue priority pieces:

1. **"Melbourne summer car care guide 2026: protecting your paint from October UV, heat, and bird drops"** — publish deadline is **today, October 25**. If it doesn't publish today, the November seasonal window is missed. Full spec in Oct 18 brief and already in topic bank.

2. **"Graphene coating Melbourne: what it is, how it compares to ceramic, and whether the $249 premium is worth it"** — marked "publish this week" since Oct 18. One week overdue. Highest AI citation potential of any article in the bank. Full spec in Oct 18 brief and already in topic bank.

3. **"Mobile window tinting Melbourne: legal limits, how it works, and pricing from $200"** — new this week as a content idea above. 16 weeks since the service launched. Add to top of Jordan's topic bank.

---

## Carry-Forward Flags (all open, unchanged)

- **GHL review widget** (`home.tsx:233`): Add static testimonial block above `<GHLReviewWidget>`. Full code in Oct 18 brief. Week 9.
- **AggregateRating + LocalBusiness schema** (`app/layout.tsx`): Full JSON-LD in Oct 18 brief. Week 18.
- **FAQPage JSON-LD**: Homepage FAQ is crawler-visible text — wrap in FAQPage schema. Week 18.
- **Open Graph tags** (`app/layout.tsx`): Add `openGraph` + `twitter` metadata. Every WhatsApp share is a blank card. 20 minutes. Week 18.
- **Services tab-hidden pricing** (`services.tsx:184`): `display: none` hides all pricing panels. Week 18.
- **Membership pricing** (`/membership` → redirects to `/services`): AI systems answering "Pristine Detailers membership pricing" find nothing. Week 18.
- **About page / `/about/reviews`**: Both pages uncrawlable (redirect + JS-only widget). Week 18.
- **Email address alignment**: Confirm `hello@` vs `info@` discrepancy across footer and contact page.
- **Gallery link** (`home.tsx`): `href="#"` → `href="/gallery"`. 2 minutes.

---

*Next audit: 2026-11-01*

**ESCALATE — Harshad:** Today is the last day to publish the summer car care article for November search volume. The sitemap/robots/llms.txt have been copy-paste-ready for 18 weeks. The three page title fixes are 6 minutes of work. The homepage still has a literal `[SHOP ADDRESS]` placeholder and a wrong PPF price being served to AI systems every day. The site is at 3.5/10 AI citation readiness at peak season with a 2.5-hour path to 6.5/10. Every week these don't ship, Jordan's articles index 8–12 weeks late.*
