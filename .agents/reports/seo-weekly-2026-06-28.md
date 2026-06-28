# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-06-28
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Status: Four Weeks of Compounding Risk

The four critical issues flagged in the May 17, May 24, May 31, and June carry-forward reports remain unresolved. As of this audit:

- `app/sitemap.ts` — still does not exist
- `app/robots.ts` — still does not exist
- `public/llms.txt` — still does not exist
- `app/page.tsx` — still `'use client'` on line 1, no metadata exported, FAQ invisible to AI crawlers
- `app/services/page.tsx` — server component, but still no metadata export, tab-hidden pricing still invisible
- `app/membership/page.tsx` — still no metadata export

One new development this week changes the risk profile: **a pricing update was deployed on 2026-06-27** (commit `903192f`). The Essential membership price rose from $79/mo to $99/mo, and the Maintenance Detail from $79 to $99. This is now a live discrepancy between what's on the site and what AI engines may have previously indexed from any page, blog post, or third-party source referencing the old price.

---

## Top 3 Priority Issues

---

### Priority 1 — CRITICAL (5th+ week open): No Sitemap, No Robots.txt, No llms.txt

**Page:** Site-wide (`app/`)

**Problem:**

Still no `app/sitemap.ts`, `app/robots.ts`, or `public/llms.txt`. Jordan has been publishing articles on a Tuesday/Friday schedule since at least May. Each article published without a sitemap relies entirely on Googlebot re-crawling `/blog` and following the new link — on a domain with low backlink authority, that can mean 4–8 weeks of non-indexation per article.

GPTBot, PerplexityBot, ClaudeBot, and Google-Extended all check `robots.txt` before crawling. With no `robots.txt`, these AI bots operate on default assumptions — some don't crawl at all. There is still no explicit invitation for any AI engine to cite Pristine Detailers content.

The June 27 pricing update makes this more urgent: if a cached AI answer quotes "$79/month" for the Essential membership — sourced from any previously crawled page — that answer is now factually wrong and can't be corrected until those bots are given permission to recrawl. With no `robots.txt` explicitly allowing recrawl, there is no signal for AI systems to refresh their cached content.

**Search queries blocked:** Every article Jordan has published since May. Any AI answer for "ceramic coating Melbourne", "PPF Melbourne", "mobile car detailing Melbourne", "car detailing membership Melbourne".

**Specific Fix:**

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
Pristine Detailers is a premium mobile car detailing service operating across Melbourne, Australia. Technicians travel to the customer's home, office, or car park. The business has been operating for 6 years, holds a 4.9-star average across 240 reviews, and has detailed 2,400+ cars.

## Services and Pricing (excl. GST)
- Maintenance Detail: from $99
- Basic Detailing: from $150
- Revitalise Package: from $300
- Ceramic Coating (incl. paint correction): from $750 — manufacturer-backed warranty up to 8 years
- Paint Protection Film: from $2,900

## Membership
- Essential: $99/month — monthly wash + seal, priority booking, member support
- Signature: $149/month — bi-monthly detail, ceramic maintenance, exclusive add-on pricing (most popular)
- Members save up to 35% annually compared to pay-per-visit

## Service Areas
Toorak, South Yarra, Brighton, Bayside suburbs, St Kilda, Richmond, Hawthorn, Inner East Melbourne, Mornington Peninsula

## Key Facts
- Mobile only — no workshop drop-off required
- Requires access to water and a standard power point
- Notable cars serviced: Porsche, Ferrari, McLaren, Range Rover, BMW, Mercedes-AMG, Tesla, Audi, BYD, Lotus
- Reviews: 4.9 stars / 240 reviews
- Booking: https://pristinedetailers.com.au/booking
```

After deploying, submit `https://pristinedetailers.com.au/sitemap.xml` to Google Search Console.

**Time to implement:** 45 minutes total. This is week five.

---

### Priority 2 — CRITICAL (4th week open): Homepage Is 'use client' — No Metadata, FAQ Invisible to All AI Crawlers

**Page:** `/` (`app/page.tsx`, `components/pages/home.tsx`)

**Problem:**

`app/page.tsx` line 1 is still `'use client'`. A `'use client'` page cannot export `metadata`. The homepage competes for "mobile car detailing Melbourne" with the layout fallback title: *"Pristine Detailers — Melbourne's Premium Mobile Detailing"* — the same title inherited by every other page with no metadata.

The FAQ section (`home.tsx` line 994, `FAQSection` component) contains four high-value Q&A pairs rendered via a `useState` accordion — client-side only. An AI crawler fetching the homepage sees a Next.js JavaScript shell with no FAQ content in the initial HTML payload. ChatGPT, Perplexity, Claude, and Google AI Overviews cannot read these answers. The FAQ was also updated this week: the answer to "What does the membership include?" now correctly says "$99/month" (updated in commit `903192f`) — but this update is invisible to AI systems because the whole component is client-rendered.

The broken gallery link (`home.tsx` line 893, `href="#"`) also remains.

**Search queries blocked:** "mobile car detailing Melbourne", "how long does ceramic coating take", "can you combine PPF and ceramic coating", "car detailing membership Melbourne $99".

**Specific Fix:**

Step 1 — Convert `app/page.tsx` to a server component:

```tsx
// Remove 'use client' from line 1, add metadata export
import type { Metadata } from 'next';
import { Home } from '@/components/pages/home';

export const metadata: Metadata = {
  title: 'Mobile Car Detailing Melbourne — Ceramic Coating & PPF | Pristine Detailers',
  description: 'Premium mobile car detailing in Melbourne. Ceramic coating from $750, PPF from $2,900, membership from $99/mo. We come to your driveway — Toorak, Brighton, South Yarra and 60+ suburbs.',
};

export default function Page() {
  return <Home />;
}
```

The `'use client'` directive stays in `components/pages/home.tsx` where the state lives — only the page file needs changing.

Step 2 — Fix the gallery link (`home.tsx` line 893):
```tsx
// Change href="#" to href="/gallery"
```

Step 3 — Add FAQPage JSON-LD to `app/page.tsx` (the current four FAQ answers are perfect source material):

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
      "acceptedAnswer": { "@type": "Answer", "text": "A full ceramic coating application (including paint correction) is typically a full day of work." }
    },
    {
      "@type": "Question",
      "name": "Can I combine PPF and ceramic coating?",
      "acceptedAnswer": { "@type": "Answer", "text": "Yes — and we recommend it. PPF goes on first as a physical barrier, then ceramic coating on top for a hydrophobic finish and self-heal enhancement." }
    },
    {
      "@type": "Question",
      "name": "What does the Pristine Detailers membership include?",
      "acceptedAnswer": { "@type": "Answer", "text": "$99/month gets you one monthly wash-and-seal detail, priority same-week booking, 10% off all our other services, and discounted rates for same-household vehicles." }
    }
  ]
};
```

**Note on the pricing update:** The FAQPage JSON-LD above correctly uses $99/month (the updated price from commit `903192f`). Once the homepage is converted to a server component and this schema is deployed, AI engines will have the correct price in structured data — fixing the AI citation risk created by the price change.

**Time to implement:** 45 minutes for the page conversion + schema. Fix is fully independent of the FAQ accordion component.

---

### Priority 3 — NEW: Pricing Update Created a Stale AI Citation Risk That Needs Fresh Content

**Page:** `/blog`, `/membership`, and any previously indexed content mentioning "$79/month"

**Problem:**

On 2026-06-27, the Essential membership price changed from $79/mo to $99/mo and the Maintenance Detail from $79 to $99 (commit `903192f`). The site now shows correct prices. But:

1. **AI systems (ChatGPT, Perplexity, Gemini) may have previously cached "$79/month"** from any blog article, social post, or third-party mention. Without a `robots.txt` explicitly inviting recrawl, and without a `sitemap.xml` to signal content freshness via `lastModified`, there is no mechanism to trigger AI systems to refresh their cached answers.

2. **Jordan's topic bank still references "$79/mo"** in the "Car detailing membership vs pay-as-you-go" article brief. If Jordan writes that article using the old price, it will publish incorrect pricing and create a confusing signal.

3. **The homepage FAQ at `home.tsx` line 1000** now correctly says "$99/month" — but since it's client-rendered, this update has zero visibility to AI systems. The fix from Priority 2 above resolves this via JSON-LD.

4. **The membership page has no metadata and no schema** — there is no source of truth that AI engines can unambiguously read for current pricing.

**Search queries at risk:** "car detailing membership Melbourne price", "Pristine Detailers membership cost", "mobile car detailing subscription Melbourne".

**Specific Fix:**

Step 1 — Update Jordan's topic bank (in `jordan-content-writer.md`) — the "membership vs pay-as-you-go" brief still references "$79/mo". The correct Essential price is now $99/mo; Signature is $149/mo. Update the relevant line so Jordan's article uses current prices.

Step 2 — Add metadata to `app/membership/page.tsx` with current pricing:

```tsx
import type { Metadata } from 'next';
import { Membership } from '@/components/pages/membership';

export const metadata: Metadata = {
  title: 'Car Detailing Membership Melbourne | $99/mo Essential · $149/mo Signature | Pristine Detailers',
  description: 'Melbourne car detailing membership from $99/month. Monthly wash, priority booking, member pricing on ceramic coating and PPF. Cancel any time.',
};

export default function Page() {
  return <Membership />;
}
```

Step 3 — Once Priority 1 (sitemap + robots.txt) is deployed, the `sitemap.xml` should include membership with a fresh `lastModified` timestamp. AI bots that crawl sitemaps will pick up the update.

**Time to implement:** 10 minutes for membership metadata + Jordan's topic bank update. Dependent on Priority 1 for full effect.

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "Winter Car Care in Melbourne: Why June and July Are the Worst Months for Your Paint"

**Target queries:** "winter car care Melbourne", "how to protect car in winter Melbourne", "does cold weather damage car paint", "car detailing winter Melbourne", "road grime Melbourne winter"

**The gap:** It is mid-winter in Melbourne (June 28). There is zero seasonal winter content on the site. The Melbourne winter presents specific paint threats that summer-focused content doesn't address: increased road grime and salt deposits from rain, muddy wheel arches from wet roads, reduced UV threat but increased bird dropping acidity (birds roost longer in cold weather, droppings sit longer on paint). A winter-specific article targets search terms that peak now, when intent is highest, and that no competitor is currently ranking for with fresh 2026 content.

**Why this converts:** Seasonal content with current-year dates earns search rankings within days of publication because it matches the "freshness" signal. A buyer who searched "winter car care Melbourne" in June and found this article is exactly the person who would join the Essential membership as a set-and-forget winter maintenance solution.

**Format for AI extraction:**
- Opening sentence with a specific claim: "In Melbourne, winter road grime accumulates 3–4× faster than summer because wet roads kick up mineral deposits that bond to clear coat within 48 hours."
- Winter threat table: Threat / Why it's worse in winter / Urgency
- Seasonal service recommendation: what to book in June/July vs August
- Membership section: how the monthly wash + seal maps to winter maintenance cadence
- FAQ: "Should I get ceramic coating in winter?", "Does rain damage car paint?", "How often should I wash my car in Melbourne winter?"

**Suggested title:** "Winter Car Care Melbourne: Why June and July Are the Worst Months for Your Paint"
**Category:** Detailing
**Pass to Jordan:** Yes — add to topic bank. Flag as **time-sensitive: write this week before July**.

---

### Content Idea 2 — "Ceramic Coating Maintenance in Melbourne: The 12-Month Care Guide After Application"

**Target queries:** "ceramic coating maintenance Melbourne", "how to maintain ceramic coating", "ceramic coating care guide", "what to do after ceramic coating Melbourne", "ceramic coating washing tips"

**The gap:** The services page sells ceramic coating from $750. The blog has no dedicated post-application care guide. A customer who just paid $750–$2,000+ for a ceramic coating will immediately Google "how to maintain my ceramic coating" — this is a post-purchase query that Pristine should own but doesn't. It's also a query with strong AI citation potential because it calls for a list/guide format with specific instructions.

**Why this converts:** Post-purchase content reinforces brand trust for existing customers (reducing churn from the membership) and is shared by new clients as a reference — organic word-of-mouth from the most satisfied customer segment. The Signature membership ($149/mo) includes ceramic maintenance service — this article is the natural conversion vehicle from one-off ceramic buyer to recurring member.

**Format for AI extraction:**
- Opening definition: "After a ceramic coating application, a 7-day cure period is required before the car can be washed."
- Immediate post-application rules (first 7 days): numbered list, one rule per line — ideal AI extraction format
- Monthly maintenance table: Month 1–3 / 4–6 / 7–12 → what to do and what to avoid
- Melbourne-specific hazards: bird dropping acidity in Toorak and Hawthorn, Bayside salt air, car park scratches in CBD and South Yarra shopping precincts
- FAQ: "Can I run my ceramic-coated car through an auto-wash?", "How do I know if my ceramic coating is still working?", "Does the Signature membership include ceramic maintenance?"

**Suggested title:** "Ceramic Coating Maintenance in Melbourne: The 12-Month Care Guide After Application"
**Category:** Ceramic Coating
**Pass to Jordan:** Yes — add to topic bank.

---

## AI Citation Readiness Score

**Score: 3.5 / 10** — unchanged. Holding, but the pricing update creates a new citation accuracy risk.

### Reasoning

Nothing from the Priority 1 or 2 lists has been implemented in four weeks. The score does not move when no changes are deployed.

The June 27 pricing update introduces a new risk that wasn't present before: AI systems that cached "$79/month" from any prior crawl now have incorrect information. Without `robots.txt` (to signal AI bots), without `sitemap.xml` (to signal content freshness), and without FAQPage or JSON-LD schema (to provide authoritative structured data), there is no mechanism for any AI engine to know the price has changed. This risk grows as more AI sessions query "Pristine Detailers membership cost" and receive a stale answer.

| Signal | Status | Change from May 31 |
|--------|--------|---------------------|
| Server-side rendered content | `/blog`, `/blog/[slug]`, `/services` | No change |
| Homepage metadata | None — `'use client'` blocks export | No change |
| Services metadata | None — no export on server component | No change |
| Membership metadata | None — no export | No change |
| Blog index title | Generic ("Blog — Pristine Detailers") | No change |
| Blog article title pattern | No Melbourne signal | No change |
| Structured data (schema) | None anywhere on the site | No change |
| `robots.txt` | Missing | No change |
| `sitemap.xml` | Missing | No change |
| `llms.txt` | Missing | No change |
| FAQ content (AI-extractable) | Client-rendered, invisible | No change |
| Pricing facts (extractable) | Tab-hidden on /services, invisible on homepage FAQ | No change — but $99 update invisible to AI |
| Review count (homepage) | Line 69: "30 reviews", line 943: "39 reviews" — both wrong (should be 240) | No change |
| AI bot access | No robots.txt | No change |
| Pricing accuracy for AI | $79/mo cached; site now says $99/mo — stale citation risk | **New risk this week** |

### What Needs to Happen for Score to Move

| Fix | Score Impact | Effort | Status |
|-----|-------------|--------|--------|
| Add `robots.txt` explicitly allowing AI bots | +0.5 | 20 min | Not done — week 5 |
| Add `sitemap.ts` with all blog slugs | +0.3 | 30 min | Not done — week 5 |
| Add `llms.txt` to `public/` | +0.3 | 20 min | Not done |
| Convert homepage to server component + add metadata | +0.5 | 30 min | Not done — week 4 |
| Add FAQPage JSON-LD on homepage | +0.5 | 20 min | Not done — week 4 |
| Add membership page metadata | +0.2 | 10 min | Not done |
| Fix review count (30/39 → 240 on homepage) | +0.2 | 10 min | Not done |
| Add services page metadata | +0.2 | 10 min | Not done |
| Add `LocalBusiness` + `AggregateRating` schema to layout | +0.5 | 45 min | Not done |

**If all of the above are implemented this week, the score goes to ~6.5/10.** Total effort: under 4 hours. These are all independent, deployable items.

---

## Quick-Win Topics for Jordan's Topic Bank

The following two topics are new this week and should be added to `jordan-content-writer.md`:

1. **"Winter Car Care Melbourne: Why June and July Are the Worst Months for Your Paint"** — Seasonal content indexed in real-time, targets winter-specific queries at peak intent. Time-sensitive: write before July 1. Format: winter threat table + Melbourne-specific hazards + membership conversion at end. Lead sentence must include a specific data point (see Content Idea 1 above for full brief). Detailing category. *Flag for Jordan: this article is time-sensitive — write before July 4 to capture peak winter search volume.*

2. **"Ceramic Coating Maintenance in Melbourne: The 12-Month Care Guide After Application"** — Post-purchase content for the $750–$2,000 ceramic coating customer. Natural conversion path to Signature membership. Format: first-7-days numbered list + monthly maintenance table + FAQ block. Open with a direct, dateable claim. Ceramic Coating category. (See Content Idea 2 above for full brief.)

**Also action required:** Update the existing "Car detailing membership vs pay-as-you-go" article brief in the topic bank — the brief currently references "$79/mo" for the Essential membership. The correct current price is **$99/mo** (updated 2026-06-27). Failing to update this now guarantees the article publishes with incorrect pricing.

---

## Carry-Forward Flags

All items from prior weeks remain open:

- **Blog article title pattern** (`app/blog/[slug]/page.tsx` line 19): `${data.title} — Pristine Detailers` → `${data.title} | Melbourne Car Detailing | Pristine Detailers`. One-line change. Adds Melbourne to every article title in Google SERPs.
- **Blog index title** (`app/blog/page.tsx` line 5): `'Blog — Pristine Detailers'` → `'Car Detailing Blog Melbourne | Ceramic Coating & PPF Guides | Pristine Detailers'`. One-line change.
- **Homepage review count** (`home.tsx` line 69 and line 943): "30 reviews" and "39 reviews" should both read "240". Fix before AggregateRating schema is added — inconsistent counts create a structured data trust liability.
- **`app/journal/page.tsx` is dead code**: The redirect in `next.config.mjs` (`/journal` → `/blog`, permanent) means `app/journal/page.tsx` and `app/journal/[slug]/page.tsx` are never served. They can be safely deleted to reduce developer confusion.
- **Services tab-hidden pricing** (`components/pages/services.tsx` line 104): `display: selected === service.id ? 'block' : 'none'` hides all non-selected service content from AI crawlers. Rendering all service bodies as visible HTML (with JS tab state layered on top) is the fix.

---

*Next audit: 2026-07-05 | ESCALATE: If sitemap.ts + robots.ts are not deployed by 2026-07-05, this should be flagged to Harshad directly — this is a 5-week backlog on a 30-minute implementation. Jordan's membership article brief must be corrected to $99/mo before the next publish cycle (Tuesday 2026-06-30).*
