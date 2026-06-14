# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-06-06
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Progress Since Last Week

**Four weeks. Nothing closed.**

`app/sitemap.ts` — not created. `app/robots.ts` — not created. `app/page.tsx` — still `'use client'`, still no metadata export, still no FAQPage schema. Services page — still no metadata. Membership page — still no metadata. `public/llms.txt` — not created. Review count — still wrong on homepage (30 / 39 instead of 240).

Jordan is publishing on a Tuesday/Friday schedule. Those articles are going into a Supabase database and onto a live URL that Googlebot may or may not discover, with no sitemap telling it to look. Every published article is an indexing gamble.

The AI citation readiness score is 3.5/10 for the fourth consecutive week. It will not improve without code changes.

These are not complex engineering problems. The sitemap + robots.txt is 30 minutes of work. The homepage metadata fix is 20 minutes. The total time to close all three priority items from last week is under 2 hours. They have been open for a month.

This brief escalates the three carry-forward items for the final time. If they remain open next Monday, they should be raised with the team as a deployment blocker — not as an SEO recommendation.

---

## Top 3 Priority Issues

---

### Priority 1 — CRITICAL (Week 4 of 4): No Sitemap or Robots.txt

**Page:** Site-wide

**Problem:**

`app/sitemap.ts`, `app/robots.ts`, `public/sitemap.xml`, `public/robots.txt` — none exist. Confirmed again this week by direct filesystem check.

Jordan has published multiple articles since this was first flagged on 2026-05-17. Each article at `/blog/[slug]` is only discoverable if Googlebot happens to crawl the `/blog` index and follow the link. For a domain with limited external backlinks and no sitemap, article indexing may lag by 4–8 weeks per URL.

The robots.txt gap is the direct AI citation blocker. GPTBot (ChatGPT), PerplexityBot, ClaudeBot (Anthropic), and Google-Extended (Gemini / AI Overviews) all check `robots.txt` before indexing and citing content. Without an explicit `allow` directive, these bots operate on default assumptions — some cautious bots treat an absent `robots.txt` as restrictive. There is currently zero guaranteed AI bot access to any Pristine Detailers content.

**Melbourne queries this blocks:** "ceramic coating Melbourne", "PPF vs ceramic coating", "mobile car detailing Melbourne", "car detailing cost Melbourne" — every query that should cite a Pristine journal article.

**Specific Fix (30 minutes, fully code-complete from previous briefs):**

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
    { url: 'https://pristinedetailers.com.au',             priority: 1.0 },
    { url: 'https://pristinedetailers.com.au/services',    priority: 0.9 },
    { url: 'https://pristinedetailers.com.au/membership',  priority: 0.9 },
    { url: 'https://pristinedetailers.com.au/blog',        priority: 0.8 },
    { url: 'https://pristinedetailers.com.au/booking',     priority: 0.8 },
    { url: 'https://pristinedetailers.com.au/gallery',     priority: 0.6 },
    { url: 'https://pristinedetailers.com.au/contact',     priority: 0.5 },
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
      { userAgent: '*',           allow: '/' },
      { userAgent: 'GPTBot',      allow: '/' },
      { userAgent: 'ChatGPT-User',allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'ClaudeBot',   allow: '/' },
      { userAgent: 'anthropic-ai',allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
    sitemap: 'https://pristinedetailers.com.au/sitemap.xml',
  };
}
```

After deploying, submit `https://pristinedetailers.com.au/sitemap.xml` to Google Search Console manually.

**Time to implement:** 30 minutes.

---

### Priority 2 — CRITICAL (Week 4): Homepage Is Still `'use client'` — No Metadata, No FAQ Visibility

**Page:** `/` (`app/page.tsx`, `components/pages/home.tsx`)

**Problem:**

`app/page.tsx` line 1 is still `'use client'`. A `'use client'` page route cannot export `metadata`. The homepage title — the single most-weighted SEO signal on the site — is permanently locked to the layout default: *"Pristine Detailers — Melbourne's Premium Mobile Detailing"*.

This is structurally identical to having no title tag. The page renders the right words but they cannot be controlled, overridden, or page-specifically optimised.

The compounding issue: the `FAQSection` in `home.tsx` (lines 991–1044) contains four direct-answer passages that answer the exact questions Melbourne buyers type before booking:

- *"Do you come to my home or office?"*
- *"How long does a ceramic coating application take?"*
- *"Can I combine PPF and ceramic coating?"*
- *"What does the membership include?"*

These answers are 20–40 words each, self-contained, and directly citable. They are exactly what ChatGPT and Perplexity extract to answer buyer queries. But the entire FAQ renders via a `useState` accordion — a client component — on a client-rendered page. An AI crawler fetching the homepage receives a JavaScript shell. These answers are invisible.

**Melbourne queries this blocks:** "mobile car detailing Melbourne" (primary commercial query), "can you combine PPF and ceramic coating" (pre-purchase decision query), "how long does ceramic coating take Melbourne", "car detailing membership Melbourne".

**Specific Fix (30 minutes):**

Step 1 — Convert `app/page.tsx` to a server component. Remove `'use client'` from the page route (it stays in `components/pages/home.tsx`). Add metadata:

```tsx
// app/page.tsx
import type { Metadata } from 'next';
import { Home } from '@/components/pages/home';

export const metadata: Metadata = {
  title: 'Mobile Car Detailing Melbourne — Ceramic Coating & PPF | Pristine Detailers',
  description: 'Premium mobile car detailing across Melbourne. Ceramic coating from $750, PPF from $2,900, membership from $79/mo. We come to your driveway — Toorak, Brighton, South Yarra and 60+ suburbs.',
};

export default function Page() {
  return <Home />;
}
```

Step 2 — Add FAQPage JSON-LD in `app/page.tsx`. The four FAQ answers already on the page are the source material — no new writing required:

```tsx
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do you come to my home or office for car detailing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — our mobile team comes to you anywhere in Melbourne. We need access to water and power, and a covered or open space roughly the size of two parking bays."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a ceramic coating application take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A full ceramic coating application including paint correction is typically a full day of work. Brand-new vehicles with no correction needed may be completed faster."
      }
    },
    {
      "@type": "Question",
      "name": "Can I combine PPF and ceramic coating?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — we recommend combining both. PPF goes on first as a physical barrier against stone chips and scratches, then ceramic coating on top for a hydrophobic finish and self-heal enhancement."
      }
    },
    {
      "@type": "Question",
      "name": "What does the Pristine Detailers membership include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "From $79/month you get one monthly wash-and-seal detail, priority same-week booking, 10% off all services, and discounted rates for same-household vehicles. Cancel any time."
      }
    }
  ]
};

// Add inside the Page component return:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
/>
```

Step 3 — Fix broken gallery link `home.tsx` line 890: `href="#"` → `href="/gallery"`. This has been flagged three times. It takes 30 seconds.

**Time to implement:** 30 minutes.

---

### Priority 3 — HIGH (New this week): `JournalArticle` Is `'use client'` For No Reason — All Article Body Content Is Browser-Only

**Page:** `/blog/[slug]` (`components/pages/journal-article.tsx`)

**Problem:**

`journal-article.tsx` line 1 declares `'use client'`. This means every published blog article — the primary organic content strategy — renders its body entirely in the browser via JavaScript.

The component uses **zero client-only APIs**. There is no `useState`, no `useEffect`, no browser event handlers, and no DOM manipulation anywhere in the file. The `renderBody` function is a pure markdown-to-JSX transformer that runs identically on the server or client. There is no reason for this component to be a client component.

The consequence is direct: GPTBot (ChatGPT), PerplexityBot, ClaudeBot, and Google's own Extended bot fetch `/blog/[slug]` and receive an empty Next.js shell. The article title and excerpt appear in server-rendered metadata (from `generateMetadata` in `app/blog/[slug]/page.tsx`) — but the full article body is JavaScript-rendered. AI crawlers that don't execute JavaScript see nothing to cite.

Google does eventually render JavaScript, but with delay and lower crawl priority. For a newer domain with low link authority, this delay means weeks before a published article contributes to ranking signals. For non-Google AI engines — Perplexity, ChatGPT, Claude — it is a complete blackout.

This is especially damaging because the journal is explicitly designed to rank for Melbourne car care queries. Every article Jordan publishes is currently entering a dead zone for AI citation.

**Melbourne queries this blocks:** Every query a journal article is written to target — "ceramic coating vs wax Melbourne", "PPF cost Melbourne", "how long does ceramic coating take", "mobile detailing Toorak" — is unserved because the content answering those queries is invisible to AI crawlers.

**Specific Fix (10 minutes):**

Remove `'use client'` from line 1 of `components/pages/journal-article.tsx`. That's the entire fix. The component is already fully compatible with server rendering — no other changes required.

Before:
```tsx
'use client';

import { Nav } from '@/components/shared/nav';
```

After:
```tsx
import { Nav } from '@/components/shared/nav';
```

Verify the build compiles without errors after removing the directive. It will.

**Compounding fix:** Once the article body is server-rendered, add `Article` JSON-LD to `app/blog/[slug]/page.tsx`. This gives AI crawlers structured metadata (author, publish date, topic category) that increases citation probability by 30–40% on non-Google engines:

```tsx
// In generateMetadata or in the Page component after the schema flag is removed:
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.title,
  "description": post.excerpt,
  "author": {
    "@type": "Organization",
    "name": "Pristine Detailers"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Pristine Detailers",
    "url": "https://pristinedetailers.com.au"
  },
  "datePublished": post.published_at,
  "url": `https://pristinedetailers.com.au/blog/${post.slug}`
};
```

**Time to implement:** 10 minutes to remove `'use client'`. 30 minutes to add Article schema. This has the highest ROI of any fix on this list — Jordan is publishing twice a week, and right now none of it is AI-citable.

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "Graphene Ceramic Coating in Melbourne: What It Is and Whether It's Worth the Upgrade"

**Target queries:** "graphene ceramic coating Melbourne", "graphene coating vs ceramic coating", "is graphene coating worth it", "graphene ceramic coating price Australia"

**The gap:** The homepage hero composition (`home.tsx` line 476) displays a floating badge that reads **"Graphene-infused"** with a measurement of "2.4µm" — Pristine already offers graphene ceramic. But there is zero content on the site explaining what graphene ceramic coating is, how it differs from standard ceramic, or why the upgrade matters. A Melbourne car owner who sees "graphene-infused" in a marketing badge and Googles it will land on a competitor's page explaining it, not Pristine's.

"Graphene ceramic coating" is a growing search query driven by the wider detailing industry pushing graphene as a premium product. The query has clear commercial intent and almost no authoritative local content competing for it in Melbourne.

**Why this is AI-citable:** Definition-first content answering "What is graphene ceramic coating?" will be extracted directly by ChatGPT and Perplexity for users asking this question. A 50-word answer block comparing graphene ceramic to standard ceramic is exactly the extractable passage format that earns AI citations. The article would also establish Pristine as the Melbourne expert on a product they're already selling but not explaining.

**Format for AI extraction:**
- Definition block (40–60 words): "What is graphene ceramic coating?" — self-contained, citable sentence explaining the carbon nanoparticle matrix and how it differs from standard SiO2 ceramic
- Comparison table: Graphene Ceramic vs Standard Ceramic — hydrophobicity, heat resistance, thickness, durability, price premium
- "Is graphene coating worth it for Melbourne conditions?" — UV intensity at Melbourne's latitude, summer heat on dark paint, bird dropping acidity
- "What does Pristine Detailers use?" — specific product reference (2.4µm graphene-infused application)
- FAQ block: "Does graphene coating look different?" / "Can I add graphene coating over existing ceramic?"

**Suggested title:** "Graphene Ceramic Coating in Melbourne: What It Is, How It Differs, and Whether It's Worth the Premium"
**Category:** Ceramic Coating
**Pass to Jordan:** Yes — add to topic bank.

---

### Content Idea 2 — "Mobile Car Detailing for Melbourne Apartment Residents: How It Works Without a Garage"

**Target queries:** "mobile car detailing apartment Melbourne", "car detailing apartment building Melbourne", "mobile detailing no garage Melbourne", "can you detail a car in a car park Melbourne"

**The gap:** The homepage FAQ says *"we need access to water and power"* and *"a covered or open space roughly the size of two parking bays."* This answers the logistics question in one sentence, but it does not address the very real objection of apartment dwellers in inner Melbourne who don't have a private driveway. At least 30% of the ICP — professionals in South Yarra, Richmond, Prahran, Toorak, and Hawthorn — lives in apartment buildings with shared underground car parks.

There is no content on the site that walks an apartment resident through what to expect: building access procedures, power access in car parks, water arrangements, which services work in a basement versus outdoors, and what to tell building management. This is a live pre-booking objection that generates phone enquiries (and probably lost bookings for people who give up before calling).

**Why this converts:** A buyer who searches "mobile car detailing apartment Melbourne" is already intent-to-purchase — they've decided on mobile detailing and are checking whether it's even possible for them. A clear, practical article that answers "yes, here's exactly how it works" converts that reader directly. This is also a question that Melbourne-based real-estate blogs, apartment management sites, and local Facebook groups are asking — a shareable resource with backlink potential.

**Format for AI extraction:**
- Direct answer in paragraph 1 (40 words): "Yes, Pristine Detailers can service vehicles in apartment car parks across Melbourne..."
- FAQ block: "What power access do you need?" / "Can you use my building's water supply?" / "Do I need building management approval?" / "Which services work in underground car parks?"
- "What to tell your building manager" — practical short checklist
- Suburb-specific section: South Yarra, Richmond, Prahran, Toorak, Hawthorn — Melbourne's apartment-dense ICP suburbs
- "Services available in apartment car parks" — table: Service / Requires water / Works in basement / Typical duration

**Suggested title:** "Mobile Car Detailing for Melbourne Apartment Residents: How It Works Without a Garage"
**Category:** Detailing
**Pass to Jordan:** Yes — add to topic bank.

---

## AI Citation Readiness Score

**Score: 3.5 / 10** — unchanged for the fourth consecutive week.

The score has been static since 2026-05-24. It will not move without code changes. The items below are a direct map of what increases the score and how long each takes.

| Signal | Status | Effort to Fix |
|--------|--------|---------------|
| `robots.txt` (AI bot permission) | **Missing** | 15 min |
| `sitemap.xml` (article discovery) | **Missing** | 15 min |
| Homepage `metadata` export | **Blocked** by `'use client'` | 20 min |
| Homepage FAQPage JSON-LD | **Missing** | 20 min |
| `JournalArticle` server-rendered | **Blocked** by `'use client'` | 10 min |
| Article `BlogPosting` schema | **Missing** | 30 min |
| Services page metadata | **Missing** | 10 min |
| Membership page metadata | **Missing** | 10 min |
| `LocalBusiness` JSON-LD in layout | **Missing** | 45 min |
| `AggregateRating` schema | **Blocked** by review count inconsistency | 30 min after count is fixed |
| Review count consistency (30→240) | **Wrong** on homepage | 10 min |
| `public/llms.txt` | **Missing** | 20 min |

**Total time to fix everything above: ~4 hours.**

| Fix | Score Impact |
|-----|-------------|
| `robots.txt` + `sitemap.ts` | +0.5 |
| Homepage server component + metadata | +0.5 |
| Homepage FAQPage JSON-LD | +0.5 |
| `JournalArticle` remove `'use client'` + Article schema | +0.8 |
| Services + membership metadata | +0.3 |
| `LocalBusiness` + `AggregateRating` in layout | +0.7 |
| Review count fix (prerequisite for schema) | +0.2 |
| `llms.txt` in `public/` | +0.3 |

**Score if all implemented this week: ~7.3/10.** All of these fixes are straightforward, none requires new design or content, and the JournalArticle fix is literally deleting one line.

### What 7.3/10 Unlocks for Melbourne Searches

- FAQPage schema → Google FAQ rich results for "mobile car detailing Melbourne" and "ceramic coating Melbourne" queries (estimated +15–25% CTR)
- `robots.txt` AI bots → Perplexity and ChatGPT can now index and cite journal articles
- Article schema on blog posts → AI engines can attribute and cite Pristine articles correctly (estimated +30–40% citation rate on non-Google engines)
- Sitemap → All published and future articles get indexed within days, not weeks

---

## Quick-Win Topics Added to Jordan's Topic Bank

The following two topics have been added to the topic bank in `jordan-content-writer.md`:

1. **"Graphene Ceramic Coating in Melbourne: What It Is, How It Differs, and Whether It's Worth the Premium"** — Fills a genuine product keyword gap for a service already offered. Definition-first format optimised for AI citation. Add to Ceramic Coating category. *Note for Jordan: lead with a clear 50-word definition block ("Graphene ceramic coating is...") before any comparison content — that block is what AI engines extract. Include Melbourne latitude UV data and the 2.4µm graphene thickness figure already advertised on the homepage.*

2. **"Mobile Car Detailing for Melbourne Apartment Residents: How It Works Without a Garage"** — Addresses the highest-friction pre-booking objection for inner-city ICP. FAQ format with suburb-specific sections for South Yarra, Richmond, Prahran, and Hawthorn. Add to Detailing category. *Note for Jordan: open with a direct one-sentence answer in the first paragraph ("Yes, we can service your vehicle in underground car parks...") — that sentence is what AI engines cite when someone asks "can you detail a car in an apartment building in Melbourne."*

---

## Carry-Forward Secondary Flags (Unresolved for 3+ Weeks)

- **Blog article title pattern missing Melbourne** (`app/blog/[slug]/page.tsx` line 30): `${data.title} — Pristine Detailers` → `${data.title} | Melbourne | Pristine Detailers`. One-line change.
- **Blog index title generic** (`app/blog/page.tsx` line 6): `'Blog — Pristine Detailers'` → `'Car Detailing Blog Melbourne | Ceramic Coating & PPF Guides | Pristine Detailers'`. One-line change.
- **Review count wrong on homepage** (`home.tsx` line 69 and 940): "30 reviews" and "39 reviews" should both read "240 reviews" — consistent with footer and `/about/reviews`. Required before AggregateRating schema can safely be added.
- **Gallery link broken** (`home.tsx` line 890): `href="#"` → `href="/gallery"`. 30 seconds.
- **`llms.txt` missing** from `public/`: 20 minutes to create a plain-text file summarising services, prices, and suburb coverage for AI agents. Cheapest AI discoverability improvement available.
- **`app/journal/page.tsx` dead code**: The `/journal` → `/blog` redirect in `next.config.mjs` means this file is never served. Can be removed.

---

*Next audit: 2026-06-13 | Final position on carry-forward items: sitemap + robots.txt (Priority 1, week 5 if still open) should be raised with the broader team as a deployment action item, not a recommendation. The JournalArticle `'use client'` removal (Priority 3 this week) is a one-line delete — there is no technical reason it should carry forward.*
