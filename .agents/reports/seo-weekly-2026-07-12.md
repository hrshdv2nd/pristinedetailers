# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-07-12
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Status: Progress on Metadata, New Service Gap Emerged, Infrastructure Still Missing

**What changed since June 28:**

| Item | Status |
|------|--------|
| Homepage server component conversion | ✅ Done (commit `d0e3455`, July 2) |
| Unique metadata on all key pages (services, membership, blog, booking) | ✅ Done (commit `d0e3455`, July 2) |
| 26 broken /about links fixed | ✅ Done (commit `41bf263`, July 1) |
| Window tinting added as 5th service | 🆕 New this week (commit `44ed0ba`, July 6) — zero keyword coverage |
| Hero stats section removed from homepage | ⚠️ Regression (commit `b9883ee`, July 7) — "2,400+ Cars", "5yr Coatings", "$99/mo" gone |
| PPF price updated to $3,000 (was $2,900) | ⚠️ New pricing discrepancy — `product-marketing-context.md` still says $2,900 |
| `app/sitemap.ts` | ❌ Still missing — WEEK 6 |
| `app/robots.ts` | ❌ Still missing — WEEK 6 |
| `public/llms.txt` | ❌ Still missing — WEEK 6 |
| Services tab-hidden pricing | ❌ Still invisible to AI |
| Homepage review count (30/39 → 240) | ❌ Still wrong |
| FAQPage JSON-LD on homepage | ❌ Still missing |
| LocalBusiness + AggregateRating schema | ❌ Still missing |
| Blog article titles (missing Melbourne signal) | ❌ Still `${title} — Pristine Detailers` |

---

## Top 3 Priority Issues

---

### Priority 1 — CRITICAL (Week 6, no change): No sitemap.ts, robots.ts, or llms.txt

**Page:** Site-wide (`app/`)

**Problem:**

Six weeks after first flagging this. Jordan has been publishing articles on a Tuesday/Friday schedule since May — that's approximately 20+ articles published with no sitemap signal. Each article depends on Googlebot re-crawling `/blog` and following a new link on a low-authority domain, which takes 4–8 weeks. Articles published in May may still be unindexed.

GPTBot, PerplexityBot, ClaudeBot, and Google-Extended have no `robots.txt` to read — some default to not crawling. There is still no `llms.txt` to give AI systems a correct, parseable summary of Pristine's services and prices. This means:

- The $99/mo Essential pricing (updated June 27) has no authoritative machine-readable source. Any AI system queried about "Pristine Detailers membership cost" is answering from stale cache.
- The PPF price is now $3,000 on the services page, but $2,900 in `product-marketing-context.md`. When `llms.txt` is eventually written, use $3,000.
- The window tinting service ($200) added July 6 has no machine-readable representation anywhere.

**Searches blocked:** "ceramic coating Melbourne", "PPF Melbourne", "mobile car detailing Melbourne", "car detailing membership Melbourne", every blog article Jordan has published since May.

**Specific fix — create `app/sitemap.ts`:**

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

**Create `app/robots.ts`:**

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

**Create `public/llms.txt`** (use current prices — $99/mo Essential, $149/mo Signature, PPF $3,000):

```
# Pristine Detailers — Melbourne Mobile Car Detailing

## About
Pristine Detailers is a premium mobile car detailing service operating across Melbourne, Australia. Certified technicians travel to the customer's home, office, or car park — no workshop drop-off. Operating 6 years. 4.9-star average across 240 reviews. 2,400+ cars detailed.

## Services and Pricing (excl. GST)
- Maintenance Detail: from $99
- Basic Detailing: from $150
- Revitalise Package: from $300
- Ceramic Coating (incl. paint correction): from $750 — manufacturer warranty up to 8 years
- Paint Protection Film: from $3,000
- Mobile Window Tinting: from $200

## Membership
- Essential: $99/month — monthly wash + seal, priority booking, member support
- Signature: $149/month — bi-monthly detail, ceramic maintenance, exclusive add-on pricing (most popular)
- Members save up to 35% annually vs pay-per-visit

## Service Areas
Toorak, South Yarra, Brighton, Bayside suburbs, St Kilda, Richmond, Hawthorn, Inner East Melbourne, Mornington Peninsula

## Key Facts
- Mobile only — no workshop drop-off required
- Requires access to water and a standard power point
- Notable cars: Porsche, Ferrari, McLaren, Range Rover, BMW, Mercedes-AMG, Tesla, Audi, BYD, Lotus
- Booking: https://pristinedetailers.com.au/booking
```

**Time to implement:** 45 minutes total. After deploying, submit `https://pristinedetailers.com.au/sitemap.xml` to Google Search Console.

---

### Priority 2 — CRITICAL (New this week): Window tinting is a new service with zero keyword footprint

**Page:** `/services` (`components/pages/services.tsx`), `app/services/page.tsx`

**Problem:**

Mobile Window Tinting was added as the 5th service on July 6 (commit `44ed0ba`). The description and $200 price exist in the services component but are rendered via the same tab-hidden pattern as all other services — `display: selected === service.id ? 'block' : 'none'` at `services.tsx:112`. AI crawlers, Googlebot, and Perplexity all fetch HTML, not JS state. The window tinting panel is invisible to every non-human reader.

This compounds an existing problem: the services page title is "Services — Pristine Detailers" — no Melbourne, no services named. The meta description mentions "ceramic coating, paint protection film" but not window tinting. A Melbourne car owner searching "window tinting Melbourne" or "mobile window tinting Melbourne" will find dedicated tinting shops, not Pristine, because:
1. The service isn't in any page title or crawlable description
2. There's zero blog content supporting the query
3. The service pricing is client-rendered and invisible to indexation

"Window tinting Melbourne" is a high-commercial-intent query (~500–2,000 searches/month, $15–25 CPC equivalent). Pristine is a mobile provider — a significant differentiation — but no one will find it.

**Searches blocked:** "window tinting Melbourne", "mobile window tinting Melbourne", "car window tinting cost Melbourne", "window tint Melbourne $200".

**Specific fix — three steps:**

Step 1 — Update `app/services/page.tsx` title and description to include window tinting:

```tsx
export const metadata: Metadata = {
  title: 'Car Detailing Services Melbourne | Ceramic Coating, PPF & Window Tinting | Pristine Detailers',
  description: 'Premium mobile car detailing in Melbourne — ceramic coating from $750, PPF from $3,000, mobile window tinting from $200, and full detailing packages. We come to your driveway.',
};
```

Step 2 — Render all service bodies as visible HTML (same as the fix in previous reports for AI visibility), with JavaScript tab state layered on top. In `services.tsx`, replace `display: selected === service.id ? 'block' : 'none'` with a CSS class approach that keeps all content in the DOM but visually hides non-selected tabs. This fixes visibility for all 5 services at once, not just tinting.

Step 3 — Pass window tinting article to Jordan (see Quick-Win Topics below).

**Time to implement:** 20 minutes for the metadata + class rename. Tab visibility refactor is 30–45 minutes and unblocks AI visibility for all 5 services simultaneously.

---

### Priority 3 — HIGH (Carry-forward, Week 5): Homepage and key page titles are keyword-dead

**Pages:** `app/page.tsx` line 5, `app/services/page.tsx` line 5, `app/membership/page.tsx` line 5

**Problem:**

The metadata fix on July 2 (commit `d0e3455`) gave every page a unique description, which is good. But the title tags still don't contain the primary keywords these pages need to rank for.

| Page | Current title | What it should compete for | Problem |
|------|--------------|---------------------------|---------|
| `/` | "Pristine Detailers — Melbourne's Premium Mobile Detailing" | "mobile car detailing Melbourne", "ceramic coating Melbourne" | No primary keyword in title |
| `/services` | "Services — Pristine Detailers" | "car detailing Melbourne", "ceramic coating Melbourne", "PPF Melbourne" | No Melbourne, no services named |
| `/membership` | "Membership Plans — Pristine Detailers" | "car detailing membership Melbourne", "mobile detailing subscription Melbourne" | No Melbourne, no pricing |

Google's title tag is the primary on-page signal for a search query. A competitor with "Mobile Car Detailing Melbourne | Ceramic Coating from $750" in their title will consistently outrank a page titled "Services — Pristine Detailers" for every service-level query. Title tags are one of the highest-ROI changes in technical SEO and take 5 minutes per page.

Searches currently under-served by weak titles: "mobile car detailing Melbourne", "ceramic coating Melbourne", "PPF Melbourne", "car detailing membership Melbourne", "window tinting Melbourne".

**Specific fix:**

`app/page.tsx` line 5:
```tsx
title: 'Mobile Car Detailing Melbourne | Ceramic Coating & PPF | Pristine Detailers',
```

`app/services/page.tsx` line 5:
```tsx
title: 'Car Detailing Services Melbourne | Ceramic Coating, PPF & Window Tinting | Pristine Detailers',
```

`app/membership/page.tsx` line 5:
```tsx
title: 'Car Detailing Membership Melbourne | $99/mo Essential · $149/mo Signature | Pristine Detailers',
```

**Also fix the blog index title** (`app/blog/page.tsx` line 5): `'Blog — Pristine Detailers'` → `'Car Detailing Blog Melbourne | Ceramic Coating & PPF Guides | Pristine Detailers'`. One-line change, adds Melbourne to every SERP snippet from the blog index.

**Also fix blog article title pattern** (`app/blog/[slug]/page.tsx` line 30): `${data.title} — Pristine Detailers` → `${data.title} | Melbourne Car Detailing | Pristine Detailers`. One-line change adds Melbourne to every individual article in SERPs.

**Time to implement:** 15 minutes total across all four files.

---

## Regression Flag — Hero Stats Removed (Commit b9883ee, July 7)

**This is a regression that warrants reversal consideration.**

Commit `b9883ee` removed the homepage hero stats block: "2,400+ Cars detailed", "5yr Ceramic Coatings", "Membership from $99/mo". These weren't decorative — they were the only above-the-fold proof points on the homepage. For AI citation readiness, they functioned as E-E-A-T anchors: specific numbers that AI systems extract and repeat when summarising what Pristine Detailers is.

Without these, the homepage has no immediately visible evidence of scale or credibility. A prospective customer (or AI crawling the page) sees only a headline and a paragraph before the first CTA — no social proof to reduce friction, no numbers to anchor trust.

**Recommendation:** Restore the stats block, or move the "4.9 stars across 39 reviews" and "2,400+ cars" references (which still appear at `home.tsx:69` and `home.tsx:966` respectively) closer to the hero — and fix the review count to "240" while doing so. The stats were a positive signal; removing them reduced conversion support and AI extractability simultaneously.

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "Mobile Window Tinting Melbourne: Legal Limits, How It Works, and Pricing from $200" (URGENT)

**Target queries:** "window tinting Melbourne", "mobile window tinting Melbourne", "car window tinting Melbourne", "window tint laws Victoria", "window tinting cost Melbourne", "is mobile window tinting any good"

**The gap:**

Window tinting is now a service Pristine offers, added July 6. There is zero content supporting the query. Every searcher who types "window tinting Melbourne" is sent to a dedicated tinting shop that already has 12 months of topical authority on the query. Pristine's mobile differentiator (no need to drop the car at a shop) is a genuinely compelling hook for this audience — but only if there's content surfacing it.

Victoria window tint laws are frequently misunderstood (front side windows must allow ≥35% VLT, rear windows can be darker) — this creates a perfect FAQ structure that AI systems love to extract.

**Format for AI extraction:**

- Opening definition block (40–60 words): "Mobile window tinting is..." — this sentence is what Perplexity and ChatGPT cite for the "what is mobile window tinting" query
- Victoria legal tint limits table: Window position / Legal VLT % / Common choice / Why
- How mobile tinting works (numbered list — 5 steps from booking to completion)
- Pricing table: Vehicle type / From price / Notes
- Melbourne-specific note: "No need to drop your car at a shop in Moorabbin or Dandenong — we come to your driveway, office car park, or apartment building in South Yarra, Richmond, Hawthorn, Toorak"
- FAQ block: "How long does window tinting take?", "Can you tint car windows in an underground car park?", "Does window tinting void warranty?", "What VLT is legal in Victoria for front windows?"

**Suggested title:** "Mobile Window Tinting Melbourne: Legal Limits, How It Works, and Pricing from $200"
**Category:** Detailing
**Pass to Jordan:** Yes — flag as URGENT. New service launched July 6 with zero supporting content. Every week without this article is market share going to dedicated tinting competitors.

---

### Content Idea 2 — "Melbourne's Underground Car Parks Are Destroying Your Paint: What PPF Actually Protects Against"

**Target queries:** "car park scratches Melbourne", "underground car park paint damage", "PPF car park protection Melbourne", "car door dings Melbourne", "paint protection film inner suburbs Melbourne"

**The gap:**

The ICP — professionals in South Yarra, Richmond, Hawthorn, Toorak, Brighton — parks in underground car parks daily. Narrow bays, trolley marks, door dings, concrete pillar scrapes. This is a universal daily anxiety for Melbourne car owners with premium vehicles, and it's a pain point distinct from freeway stone chips (already covered by the "stone chip protection Melbourne" topic in the bank). Yet there is no content on the site addressing it.

The entry point is emotional: "my car gets scratched in the car park at Crown every time I go." The conversion path is PPF on high-risk panels (doors, rear quarters, boot lid) — a $3,000 service that directly targets this pain point.

**Format for AI extraction:**

- Opening sentence with specific geographic anchor: "Melbourne's underground car parks — Crown Casino, Westfield Doncaster, and the narrow bays under South Yarra apartment towers — cause more minor paint damage per year than freeways do." This geographic specificity is what local AI citations include.
- Melbourne risk location table: Suburb / Venue type / Common damage / PPF coverage recommendation
- Side-by-side comparison: Unprotected door panel vs. PPF-protected door panel after 12 months in inner-Melbourne parking
- PPF coverage tiers: Full vehicle / High-impact panels only / Doors + boot — prices, what each covers
- FAQ: "Can PPF be applied to just door edges?", "Does PPF show in tight car park lighting?", "What about door handle cups?", "How long does PPF last in daily-use parking?"
- Conversion: Book a PPF consultation, mention mobile — "We come to your apartment building in South Yarra, Prahran, or Richmond and complete the install in your allocated car space."

**Suggested title:** "Melbourne's Underground Car Parks and Your Paint: What PPF Protects Against and Why Inner-City Drivers Need It"
**Category:** Paint Protection Film
**Pass to Jordan:** Yes — add to topic bank.

---

## AI Citation Readiness Score

**Score: 4.0 / 10** — up from 3.5 last week.

### Reasoning

Two positive changes this week: the homepage is now a server component capable of exporting metadata (Priority 2 from June 28, finally shipped), and all key pages have unique meta descriptions (fixing the 10 duplicate descriptions Semrush flagged). These are real progress.

However, the hero stats block removal (`b9883ee`) is a minor regression: those numbers were the clearest E-E-A-T signals on the homepage and the easiest content for AI systems to extract and repeat. "We've detailed 2,400+ cars in Melbourne" is the kind of specific, verifiable claim that Perplexity and ChatGPT cite. Its removal was a step backwards.

The infrastructure backlog — sitemap, robots.txt, llms.txt, FAQPage JSON-LD, LocalBusiness schema, correct review counts — remains entirely unaddressed at week 6. The window tinting service launch adds a new invisible data point (AI cannot read that Pristine does window tinting; nothing in the crawlable HTML says so).

| Signal | Status | Change from June 28 |
|--------|--------|---------------------|
| Homepage metadata exportable | ✅ Server component | **Fixed** |
| All pages: unique descriptions | ✅ Unique | **Fixed** |
| Homepage title tag (keyword-rich) | ⚠️ Partial — missing primary keywords | No change |
| Services title tag | ❌ "Services — Pristine Detailers" | No change |
| Membership title tag | ❌ "Membership Plans — Pristine Detailers" | No change |
| Blog index title | ❌ "Blog — Pristine Detailers" | No change |
| Blog article title pattern | ❌ Missing Melbourne signal | No change |
| `robots.txt` | ❌ Missing | **Week 6** |
| `sitemap.xml` | ❌ Missing | **Week 6** |
| `llms.txt` | ❌ Missing | **Week 6** |
| FAQPage JSON-LD (homepage) | ❌ Missing | No change |
| LocalBusiness + AggregateRating schema | ❌ Missing | No change |
| Services pricing (AI-visible) | ❌ Tab-hidden | No change |
| Membership FAQ (AI-visible) | ❌ Client-rendered | No change |
| Review count consistency (30/39 → 240) | ❌ Still wrong | No change |
| Gallery link (`href="#"`) | ❌ Still broken | No change |
| Hero proof points | ❌ Removed July 7 | **Regression** |
| Window tinting (crawlable) | ❌ Tab-hidden, no supporting content | **New gap** |
| PPF price in product context doc | ❌ Says $2,900, site says $3,000 | **New discrepancy** |

### What moves the score to 6.0+ in the next two weeks

| Fix | Score Impact | Effort | Status |
|-----|-------------|--------|--------|
| `robots.ts` + `sitemap.ts` + `llms.txt` | +0.8 | 45 min | ❌ Week 6 |
| FAQPage JSON-LD on homepage | +0.5 | 20 min | ❌ Not done |
| Services tab visibility fix (all 5 services) | +0.4 | 45 min | ❌ Not done |
| LocalBusiness + AggregateRating schema in layout | +0.5 | 45 min | ❌ Not done |
| Fix review count (30/39 → 240) | +0.2 | 5 min | ❌ Not done |
| Title tag rewrites (homepage, services, membership, blog) | +0.3 | 15 min | ❌ Not done |
| Restore or re-add hero proof points | +0.1 | 30 min | ❌ Regression |
| Window tinting article published | +0.1 | Jordan's turn | ❌ Not started |

**If the top 4 items ship this week, the score reaches 6.3/10. Total effort: under 3 hours of dev time.**

---

## Quick-Win Topics for Jordan's Topic Bank

Add these two topics to `jordan-content-writer.md` at the top of the topic bank:

**1. "Mobile Window Tinting Melbourne: Legal Limits, How It Works, and Pricing from $200"**
*(urgent — new service added July 6 with zero content support. "Window tinting Melbourne" is a live commercial query Pristine is currently invisible for. Format: Victoria legal VLT table + mobile process numbered list + vehicle pricing table + FAQ block. Lead with a direct 50-word answer block defining mobile window tinting and calling out the mobile differentiator. Detailing category. Write this week.)*

**2. "Melbourne's Underground Car Parks and Your Paint: What PPF Protects Against and Why Inner-City Drivers Need It"**
*(targets "car park scratches Melbourne" — anxiety specific to the ICP in South Yarra, Richmond, Toorak. Conversion: PPF consultation ($3,000 service). Open with a specific Melbourne location reference in the first sentence. Include a suburb/venue risk table and PPF panel coverage options. FAQ block. Paint Protection Film category.)*

**Also action required for Jordan:**

**Update `product-marketing-context.md` line 22:** PPF price on the services page is now $3,000 (changed since the context doc was last updated, which still shows $2,900). Any article Jordan writes referencing PPF pricing must use **$3,000**, not $2,900. Update the context doc so all agents use the correct figure going forward.

---

## Carry-Forward Flags (all still open)

- **`app/journal/page.tsx` dead code**: Redirect at `next.config.mjs` sends `/journal` → `/blog`. The `app/journal/` directory (`page.tsx` and `[slug]/page.tsx`) is never served. Safe to delete.
- **Services tab-hidden pricing** (`services.tsx:112`): All 5 service descriptions are hidden from AI crawlers. Render all as visible HTML; let JS manage visual state only.
- **Homepage review count** (`home.tsx:69` — "30 reviews"; `home.tsx:966` — "39 reviews"): Both are wrong. Should be 240. Fix before adding AggregateRating schema — conflicting numbers create a structured data trust liability.
- **Gallery link** (`home.tsx:916`): `href="#"` — still broken. Change to `href="/gallery"`.

---

*Next audit: 2026-07-19*

**ESCALATE:** The sitemap, robots.txt, and llms.txt are now at Week 6 with no implementation. These are the highest-impact items on the entire board and the combined implementation time is under 1 hour. If these are not live by 2026-07-19, flag to Harshad directly — every article Jordan publishes between now and then is accruing indexation delay that compounds. The window tinting article should be written this week before competitors establish topical authority on the query.*
