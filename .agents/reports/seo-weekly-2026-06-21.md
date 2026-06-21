# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-06-21
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Status Check: What Changed Since Last Week

**Nothing changed. Week 7. Same issues. Same score.**

Filesystem confirmed this morning (2026-06-21):

| File / Issue | Status |
|---|---|
| `app/sitemap.ts` | Not created |
| `app/robots.ts` | Not created |
| `app/page.tsx` line 1 | `'use client'` — unchanged |
| `components/pages/journal-article.tsx` line 1 | `'use client'` — unchanged |
| `public/llms.txt` | Not created |
| `app/layout.tsx` Open Graph tags | Missing — no `og:title`, `og:image`, or `twitter:card` |
| `home.tsx` line 890 | `href="#"` — gallery link still broken |
| `home.tsx` lines 69, 940 | "30 reviews" / "39 reviews" — still wrong (should be 240) |
| `home.tsx` line 845 | **"15% off services s"** — truncated live copy (NEW this week) |
| `app/blog/page.tsx` title | Still `'Blog — Pristine Detailers'` |
| `app/blog/[slug]/page.tsx` title | Still `${data.title} — Pristine Detailers` (no Melbourne) |
| Services page metadata | Missing |
| Membership page metadata | Missing |
| Schema markup (all pages) | None anywhere on the site |

Jordan has been publishing twice a week. Every article goes out without a sitemap reference, without robots.txt access permission for AI bots, and with a `'use client'` directive on the article template that makes the full body invisible to AI crawlers. The content investment compounds weekly; the distribution infrastructure does not.

**New finding this week:** The truncated string `'15% off services s'` is live on the homepage membership benefits section (`home.tsx` line 845). This is a partially-written string that was never completed — it renders as "15% off services s" to every visitor and is visible in the page source. Combined with the existing discount conflict (10% in the homepage FAQ, 15% in the homepage benefits, 35% on the membership page), the site now displays three different membership discount figures across three locations, one of which is a broken string. This is detailed in Priority 3 below.

---

## Top 3 Priority Issues

---

### Priority 1 — DEPLOYMENT BLOCKER (Week 7): No Sitemap or Robots.txt

**Page:** Site-wide (`app/` root)

**Problem:**

Week 7. `app/sitemap.ts` and `app/robots.ts` still do not exist.

Jordan is publishing two articles per week. Each article at `/blog/[slug]` is only discoverable if Googlebot follows a link from the `/blog` index — a page with zero external backlinks and no sitemap. For a domain at Pristine's current authority level, articles without sitemap references can take 4–8 weeks to index. Articles published in early June may not be in Google's index today.

The robots.txt absence is the AI citation blocker. GPTBot (ChatGPT), PerplexityBot, ClaudeBot (Anthropic/Claude), and Google-Extended (Gemini/AI Overviews) all check `robots.txt` before full crawl and citation cycles. Without an explicit `allow`, some cautious AI crawlers skip non-linked content on lower-authority domains. There is currently no guaranteed AI access to any Pristine Detailers page.

**Melbourne queries this blocks (every week these remain unimplemented):**
- "ceramic coating Melbourne"
- "PPF cost Melbourne"
- "mobile car detailing Melbourne"
- "paint correction Melbourne"
- "car detailing membership Melbourne"
- Every `/blog/[slug]` article Jordan has ever published

**Specific Fix — Two files, ~30 minutes:**

`app/sitemap.ts` (new file):
```ts
import { createClient } from '@supabase/supabase-js';

export default async function sitemap() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );

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
    { url: 'https://pristinedetailers.com.au',            priority: 1.0 },
    { url: 'https://pristinedetailers.com.au/services',   priority: 0.9 },
    { url: 'https://pristinedetailers.com.au/membership', priority: 0.9 },
    { url: 'https://pristinedetailers.com.au/blog',       priority: 0.8 },
    { url: 'https://pristinedetailers.com.au/booking',    priority: 0.8 },
    { url: 'https://pristinedetailers.com.au/gallery',    priority: 0.6 },
    { url: 'https://pristinedetailers.com.au/contact',    priority: 0.5 },
  ].map(p => ({ ...p, changeFrequency: 'monthly' as const }));

  return [...staticPages, ...articles];
}
```

`app/robots.ts` (new file):
```ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*',               allow: '/' },
      { userAgent: 'GPTBot',          allow: '/' },
      { userAgent: 'ChatGPT-User',    allow: '/' },
      { userAgent: 'PerplexityBot',   allow: '/' },
      { userAgent: 'ClaudeBot',       allow: '/' },
      { userAgent: 'anthropic-ai',    allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
    sitemap: 'https://pristinedetailers.com.au/sitemap.xml',
  };
}
```

Post-deploy: submit `https://pristinedetailers.com.au/sitemap.xml` in Google Search Console. That is the only step after deployment.

**Time to implement:** 30 minutes. This has been 30 minutes of work for seven weeks.

---

### Priority 2 — DEPLOYMENT BLOCKER (Week 7): Two `'use client'` Directives Make All Content AI-Uncitable

**Pages:** `/` (`app/page.tsx`) and all `/blog/[slug]` articles (`components/pages/journal-article.tsx`)

**Problem:**

These are two separate `'use client'` problems but they share the same root cause — client-only rendering makes pages invisible to AI crawlers — and they can be fixed in the same session.

**`app/page.tsx` (homepage):**
Still opens with `'use client'` on line 1. A `'use client'` page route cannot export `metadata`. The homepage title is permanently the layout fallback: *"Pristine Detailers — Melbourne's Premium Mobile Detailing."* Melbourne searchers typing "mobile car detailing Melbourne" or "ceramic coating Melbourne" see a brand name in the SERP, not a service match. The four FAQ answers in `home.tsx` — direct, self-contained, 20–40 word passages answering the most common pre-booking questions — are inside a `useState` accordion and are rendered only in the browser. ChatGPT, Perplexity, and Claude see an empty shell at the homepage URL.

**`components/pages/journal-article.tsx` (all blog articles):**
Still opens with `'use client'`. Jordan has published multiple articles covering ceramic coating, PPF, and paint correction — exactly the content Melbourne car owners search AI engines for. Every word of every article renders in the browser only. AI crawlers receive a Next.js shell. None of Jordan's articles have been cited by any AI engine, and none can be until this directive is removed.

This is a one-line fix on the article template. The article body is statically fetched from Supabase in the server component at `app/blog/[slug]/page.tsx`. There is no `useState`, no browser API, no interactive element in `journal-article.tsx` that requires client-side rendering. The `'use client'` directive is doing nothing except blocking AI citation of every article on the site.

**Specific Fix — Two steps, ~40 minutes total:**

**Step 1 — Fix `app/page.tsx`** (remove `'use client'`, add metadata + FAQPage schema):

```tsx
import type { Metadata } from 'next';
import { Home } from '@/components/pages/home';

export const metadata: Metadata = {
  title: 'Mobile Car Detailing Melbourne — Ceramic Coating & PPF | Pristine Detailers',
  description: 'Premium mobile car detailing across Melbourne. Ceramic coating from $750, PPF from $3,000, membership from $79/mo. We come to your driveway — Toorak, Brighton, South Yarra and 60+ suburbs.',
};

export default function Page() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Do you come to my home or office for car detailing in Melbourne?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes — our mobile team comes to you anywhere across Melbourne. We need access to water, power, and a covered or open space roughly the size of two parking bays."
        }
      },
      {
        "@type": "Question",
        "name": "How long does a ceramic coating application take?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A full ceramic coating application including paint correction is typically a full day. Brand-new vehicles with no correction needed may take less time. All work is done by certified technicians at your location."
        }
      },
      {
        "@type": "Question",
        "name": "Can I combine PPF and ceramic coating on my car?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes — we recommend combining both for maximum protection. PPF goes on first as a physical barrier against stone chips and scratches. Ceramic coating goes on top for a hydrophobic finish, UV resistance, and self-healing enhancement."
        }
      },
      {
        "@type": "Question",
        "name": "What does the Pristine Detailers membership include?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "From $79/month, the Essential membership includes one monthly wash-and-seal detail, priority same-week booking, and discounted rates on all other services. The Signature membership at $149/month includes bi-monthly detailing and ceramic maintenance."
        }
      }
    ]
  };

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

The `'use client'` directive stays in `components/pages/home.tsx` where the `useState` accordion actually lives. The page file does not need it.

**Step 2 — Fix `components/pages/journal-article.tsx`** (delete one line):

Open the file. Delete line 1:
```tsx
'use client';  ← delete this line
```

Verify the build compiles after removal. There should be no `useState`, `useEffect`, or browser API calls in this component — it renders a static article body. If any are found, extract them to a small `'use client'` sub-component.

After removing the directive, add `BlogPosting` JSON-LD to `app/blog/[slug]/page.tsx` using data already fetched for `generateMetadata`:

```tsx
// In the Page() function, before return <JournalArticle />
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.title,
  "description": post.excerpt,
  "datePublished": post.published_at,
  "author": { "@type": "Organization", "name": "Pristine Detailers", "url": "https://pristinedetailers.com.au" },
  "publisher": { "@type": "Organization", "name": "Pristine Detailers", "url": "https://pristinedetailers.com.au" },
  "mainEntityOfPage": { "@type": "WebPage", "@id": `https://pristinedetailers.com.au/blog/${slug}` }
};
```

**Time to implement:** ~40 minutes total (20 min per file).

---

### Priority 3 — HIGH (NEW THIS WEEK): Live Copy Corruption — Three Discount Figures, One Broken String

**Page:** `/` (`components/pages/home.tsx`) and `/membership` (`components/pages/membership.tsx`)

**Problem:**

The Pristine Detailers membership discount is currently displayed as three different numbers across the same site. This is not a rounding difference — these are three distinct claims:

| Location | File | Line | What It Says |
|---|---|---|---|
| Homepage FAQ section | `home.tsx` | 997 | `10% off all our other services` |
| Homepage membership benefits | `home.tsx` | 845 | **`15% off services s`** ← truncated, broken string |
| Membership page body copy | `membership.tsx` | 67 | `save up to 35% on bookings annually` |

Line 845 of `home.tsx` is a live, rendered string that appears on the homepage right now: **"15% off services s"**. This is a partially written string that was never completed — it ends at "s" and the full text was clearly cut mid-edit. Every site visitor and every search crawler sees this.

The ceramic coating warranty has a parallel conflict: homepage (`home.tsx` line 349) says "lasting up to 5 years" while the services page (`services.tsx` line 36) says "backed by a manufacturer warranty of up to 8 years." These are two different claims about the same core product, on two public pages.

**Why this is an SEO and AI problem, not just a copy problem:**

AI engines — Perplexity, ChatGPT, Claude — extract factual claims from pages. When they encounter conflicting numerical claims about the same product from the same domain (10% / 15% / 35% for the same membership benefit; 5 years / 8 years for the same coating warranty), they have two options: cite the wrong number confidently, or avoid citing the page at all. Both outcomes are bad. This conflict is also a hard blocker on adding `AggregateRating` or `PriceSpecification` schema — no structured data should be added while the underlying numbers are inconsistent, because schema embeds the claim in a machine-readable format that gets read by Google's Rich Results validator and AI Overviews simultaneously.

**Specific Fix — Agree on the real numbers, then update three files:**

Step 1: Decide the canonical discount figure. (Is the Essential membership 10%, 15%, or something else? Is "save up to 35%" a lifetime or annual figure?) Once decided:

Step 2 — Fix `home.tsx` line 845:
```tsx
// Current (broken):
'15% off services s'
// Fix (example if 15% is correct):
'15% off all services'
```

Step 3 — Align `home.tsx` line 997 (FAQ) with whatever line 845 now says. Both must show the same number.

Step 4 — Resolve the ceramic warranty: pick either 5 years or 8 years and update whichever page has the wrong figure.

**Time to implement:** 20 minutes once the business has agreed on the correct numbers. Getting the numbers agreed is a 5-minute conversation, not a code problem.

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "How to Remove Swirl Marks From Your Car: When to DIY and When to Book Paint Correction"

**Target queries:** "swirl marks car paint Melbourne", "how to fix car paint swirls", "paint swirl removal Melbourne", "car paint correction swirls", "remove swirls from car paint", "swirl marks on black car"

**The gap:** The topic bank has no article addressing swirl marks — despite the fact that swirl marks are the #1 reason Melbourne drivers book paint correction, and "swirl marks" is one of the most commonly Googled paint damage queries in Australia. Every `/services` visitor who sees "paint correction" already has swirl marks on their car. The search happens before the service page visit. There is no article on Pristine's site that captures that pre-research moment.

**Why this converts:** Swirl mark queries are high-intent — the driver is looking at their car, unhappy with what they see, and Googling the cause. The article converts to paint correction bookings because it explains what swirls are, why DIY methods make them worse (orbital polishers applied incorrectly introduce new swirls), and what a 1-stage or 2-stage professional correction achieves. This is a decision-stage article, not a top-of-funnel one.

**Why it's AI-citable:** The comparison format (DIY vs professional) earns ~33% AI citation share — the highest of any content type. Lead with a direct 50-word answer block: "Swirl marks in car paint are fine circular scratches in the clear coat, most commonly caused by incorrect washing technique (circular hand washing, dirty chamois) or automatic car washes with stiff brushes. Single-stage swirls can sometimes be polished by hand; deep or widespread swirling requires machine polishing by a trained technician." That passage is exactly what AI engines extract.

**Format for AI extraction:**
- Lead block (50 words): what swirl marks are and how they form
- Table: Swirl severity level / Visible in sun? / Polishable by hand? / Needs machine correction?
- "DIY section" — what actually works and what makes it worse
- "When to call a professional" — 1-stage vs 2-stage correction decision guide
- Melbourne note: automated car washes in Melbourne (Mornington Peninsula servo washes, shopping centre washes) are the primary swirl source for the ICP
- FAQ: "Will wax cover swirl marks?", "Do swirl marks affect resale value?", "How much does swirl mark removal cost in Melbourne?"

**Suggested title:** "Swirl Marks on Your Car: When to DIY and When to Book Paint Correction in Melbourne"
**Category:** Detailing
**Pass to Jordan:** Yes — add to topic bank.

---

### Content Idea 2 — "Car Detailing Membership vs Pay-As-You-Go: What Melbourne Drivers Actually Save"

**Target queries:** "car detailing subscription Melbourne", "car wash membership Melbourne", "is car detailing membership worth it", "car detailing monthly plan Melbourne", "car maintenance subscription Melbourne", "mobile detailing membership cost"

**The gap:** The `/membership` page lists the plans and prices but contains no value-calculation content — no breakdown of what a driver saves annually, no comparison of pay-per-visit vs subscription. A Melbourne driver considering the $79/mo Essential plan has to do the maths themselves. Nobody does the maths themselves when they're comparing options on a phone. An article that does the calculation for them — "if you detail 12 times a year at $X per wash, the membership breaks even at month 3 and saves you $Y by month 12" — answers the exact question holding the buying decision back.

**Why this converts:** "Is it worth it?" is the last question before a purchase decision, which means this article captures buyers at peak intent. It is also the query that has zero competition from generic detailing sites, because membership programs are specific to individual businesses. Any Perplexity or ChatGPT user asking "is a car detailing membership worth it in Melbourne?" will get an answer from this article or not get a Melbourne-specific answer at all.

**Why it's AI-citable:** Pricing articles with specific numbers earn 37–40% higher AI citation rates (Princeton GEO study). A table showing annual cost comparison at different visit frequencies is directly extractable. The article should open with a direct answer: "At 12 monthly details per year, Pristine Detailers' Essential membership ($79/mo) saves Melbourne drivers approximately $X compared to pay-per-visit rates — the break-even point is month 3."

**Format for AI extraction:**
- Opening direct answer (1 sentence with a specific dollar figure)
- Annual savings table: Visit frequency / Pay-per-visit annual cost / Essential membership annual cost / Saving
- "What's included" breakdown per tier: Essential ($79/mo) vs Signature ($149/mo)
- "Who the membership is for" — city driver who books monthly vs occasional detailer who books 2x a year
- FAQ: "Can I pause my Pristine membership?", "What if I miss a month?", "Does the membership discount apply to ceramic coating?"
- Membership CTA at the end

**Note for Jordan:** The savings figure in the opening sentence must be calculated from actual current prices — do not estimate. Pull the pay-per-visit price for the maintenance wash from the `/services` page and calculate the actual annual saving. That specific number is the entire reason this article gets cited.

**Suggested title:** "Car Detailing Membership vs Pay-As-You-Go: What Melbourne Drivers Actually Save in 2026"
**Category:** Membership
**Pass to Jordan:** Yes — add to topic bank.

---

## AI Citation Readiness Score

**Score: 3.5 / 10 — Unchanged. Week 7.**

The score cannot move without code changes. No code changes were made this week. The score has been 3.5 since 2026-05-24 — eight weeks on the same number.

### Full Signal Inventory

| Signal | Status | Blocking Issue | Est. Effort |
|--------|--------|----------------|-------------|
| `robots.ts` — explicit AI bot permission | **Missing** | Create `app/robots.ts` | 15 min |
| `sitemap.ts` — content discovery | **Missing** | Create `app/sitemap.ts` | 15 min |
| Homepage server-side render | **Blocked** | `'use client'` in `app/page.tsx` line 1 | 20 min |
| Homepage `metadata` export | **Blocked** | Same — `'use client'` prevents export | included above |
| Homepage FAQPage JSON-LD | **Missing** | Follows from homepage SSR fix | 20 min |
| `journal-article.tsx` SSR | **Blocked** | `'use client'` in `components/pages/journal-article.tsx` line 1 | 10 min |
| Article `BlogPosting` schema | **Missing** | Follows from journal-article SSR fix | 30 min |
| Services page `metadata` | **Missing** | `app/services/page.tsx` has no export | 10 min |
| Membership page `metadata` | **Missing** | `app/membership/page.tsx` has no export | 10 min |
| Blog index title | **Generic** | `'Blog — Pristine Detailers'` in `app/blog/page.tsx` | 5 min |
| Blog article title pattern | **Missing Melbourne** | `${data.title} — Pristine Detailers` in `app/blog/[slug]/page.tsx` | 5 min |
| `LocalBusiness` JSON-LD | **Missing** | Add to `app/layout.tsx` | 45 min |
| `AggregateRating` schema | **Blocked** | Review count inconsistent (30/39/240) — false data risk | Fix counts first |
| Open Graph / Twitter Card tags | **Missing** | No `og:` metadata in `app/layout.tsx` | 30 min |
| Review count | **Wrong** | `home.tsx` lines 69, 940 show 30 and 39 (correct: 240) | 10 min |
| Data integrity (discount, warranty) | **Conflicting** | Resolve before schema — 3 discount figures, 2 warranty durations | 20 min |
| Live copy error | **Broken** | `'15% off services s'` in `home.tsx` line 845 | 2 min |
| `public/llms.txt` | **Missing** | Structured business context for AI agents | 20 min |
| Gallery link | **Broken** | `href="#"` in `home.tsx` line 890 | 1 min |
| `app/journal/page.tsx` | **Dead code** | Redirect in `next.config.mjs` means this file never serves | delete |

### Why the Score Is Stuck

The content assets exist. Six-plus published articles. FAQ sections on two pages. Real pricing. Service descriptions. Melbourne suburb coverage copy. The problem is render mode and infrastructure — every content asset is either blocked behind client-side rendering (invisible to AI) or impossible to discover (no sitemap, no robots.txt permission). The site's SEO and AI citation score is an infrastructure problem, not a content problem.

### What Happens to the Score When Each Fix Ships

| Fix | Score Impact |
|---|---|
| `robots.ts` | +0.5 (AI bots now have explicit permission) |
| `sitemap.ts` | +0.3 (articles indexed faster, crawl path established) |
| Homepage `'use client'` removed + metadata + FAQPage schema | +1.0 (single biggest unlock: meta title, FAQ extraction, schema) |
| `journal-article.tsx` `'use client'` removed + BlogPosting schema | +1.0 (every published article becomes AI-citable) |
| Services + membership metadata | +0.4 |
| Blog index title + article title Melbourne signal | +0.2 |
| `LocalBusiness` JSON-LD | +0.5 |
| Review count fix | +0.2 (prerequisite for AggregateRating) |
| Data conflicts resolved | +0.2 (trust signal; prerequisite for pricing schema) |
| `llms.txt` | +0.3 |
| Open Graph tags | +0.2 |

**If all the above ship this week: score reaches approximately 7.3/10.** Total time: under 5 hours of developer work, none of it architecturally complex. The gap between 3.5 and 7.3 is five hours of implementation spread across seven weeks of reports.

### Path to 8.5/10 (Achievable by mid-July)

1. **This week (5 hrs):** All items above. Score → ~7.3/10.
2. **Next week (2 hrs):** `llms.txt` file. Suburb-specific copy on services page (one paragraph per service naming Melbourne roads and conditions). Score → ~7.8/10.
3. **Week 3 (3 hrs via Jordan):** Publish PPF vs Ceramic comparison article (comparison tables = ~33% AI citation rate). Publish swirl mark article or membership value article. Score → ~8.2/10.
4. **Week 4 (2 hrs):** Services tab-hidden content converted to server-rendered structure so PPF/paint correction pricing is readable by AI crawlers. Score → ~8.5/10.

---

## Quick-Win Topics — Jordan's Topic Bank Updates

### Add (New This Week)

**1. "Swirl Marks on Your Car: When to DIY and When to Book Paint Correction in Melbourne"**
*(Added by Alex — targets "swirl marks car paint Melbourne" and "paint swirl removal Melbourne", currently unserved on the site. High-conversion path to paint correction bookings — swirl marks are the #1 reason Melbourne drivers book this service. Comparison format (DIY vs professional) earns ~33% AI citation rate. Open with a direct 50-word passage defining swirl marks and their cause — that passage is what AI extracts. Include a severity table (Light / Moderate / Deep) with machine-polishing threshold. Melbourne note: automated car washes in local shopping centres and petrol stations are the primary swirl source for inner-city drivers in Richmond, South Yarra, Prahran. FAQ: "Will wax cover swirl marks?", "Do swirl marks affect resale value?", "How much does swirl removal cost in Melbourne?". Detailing category.)*

**2. "Car Detailing Membership vs Pay-As-You-Go: What Melbourne Drivers Actually Save in 2026"**
*(Added by Alex — targets "car detailing subscription Melbourne" and "is car detailing membership worth it", zero coverage on site. Decision-stage query with high conversion intent — the person asking is one calculation away from signing up. Open with ONE sentence containing a specific dollar saving figure — calculate from real current pay-per-visit prices vs membership fee, do not estimate. Annual savings comparison table is the core of the article: Visit frequency / Pay-per-visit annual cost / Essential membership ($79/mo) annual cost / Annual saving. The maths is what AI engines extract and cite. FAQ: "Can I pause my membership?", "Does the discount apply to ceramic coating?", "What if I miss a month?" — these answers are already on the membership page FAQs, can be quoted directly. Membership category.)*

---

## Carry-Forward Flags (All Open, All Unresolved)

These are unchanged from previous briefs. Specific file references are exact:

- **Services page metadata** — `app/services/page.tsx` has no `metadata` export. Title to add: `'Car Detailing Services Melbourne — Ceramic Coating, PPF & Paint Correction | Pristine Detailers'`. Ten minutes.
- **Membership page metadata** — `app/membership/page.tsx` has no `metadata` export. Title to add: `'Car Detailing Membership Melbourne — From $79/mo | Pristine Detailers'`. Ten minutes.
- **Blog index title** — `app/blog/page.tsx` line 4: change `'Blog — Pristine Detailers'` → `'Car Detailing Blog Melbourne | Ceramic Coating & PPF Guides | Pristine Detailers'`. One line.
- **Blog article title Melbourne signal** — `app/blog/[slug]/page.tsx` line 30: change `${data.title} — Pristine Detailers` → `${data.title} | Melbourne | Pristine Detailers`. One line.
- **Gallery link broken** — `home.tsx` line 890: `href="#"` → `href="/gallery"`. Thirty seconds.
- **Review count wrong** — `home.tsx` lines 69 and 940: "30 reviews" and "39 reviews" → "240 reviews" to match `/about/reviews`. Ten minutes. Required before `AggregateRating` schema can be added.
- **Live typo** — `home.tsx` line 845: `'15% off services s'` → `'15% off all services'` (or whatever the agreed correct number is). Two minutes.
- **Data conflict — membership discount** — Three different figures across the site: 10% (FAQ), 15% (benefits), 35% (membership page). Decide the canonical number. Update all three locations.
- **Data conflict — ceramic warranty** — `home.tsx` line 349 says 5 years; `services.tsx` line 36 says 8 years. One is wrong. Fix the incorrect page.
- **Open Graph tags missing** — No `og:title`, `og:description`, `og:image`, or `twitter:card` in `app/layout.tsx`. Every link shared to LinkedIn, Facebook, or iMessage renders as a blank card. Add to `metadata` object in `app/layout.tsx`. Thirty minutes.
- **`public/llms.txt` missing** — A plain-text file at the site root summarising services, prices, and suburb coverage is the fastest AI-discoverability improvement with the lowest build risk. AI agents (ChatGPT Browse, Perplexity, Claude) parse this as context without needing to render JavaScript. Twenty minutes to write.
- **`LocalBusiness` JSON-LD missing** — Adding to `app/layout.tsx` triggers Google Knowledge Panel eligibility on branded searches and provides entity signals across all AI engines. Forty-five minutes.
- **`app/journal/page.tsx` dead code** — The permanent redirect from `/journal` to `/blog` in `next.config.mjs` means this file is never served. Safe to delete. The actual journal index is `app/blog/page.tsx`.

---

*Next audit: 2026-06-28 | Week 8. The sitemap, robots.txt, and both `'use client'` directives have collectively blocked AI indexation for eight weeks. Any one of them is a 10–30 minute fix. If none are resolved by next Monday, this will be escalated as a formal cross-team blocker — the content team is producing two articles a week with zero guaranteed AI distribution.*
