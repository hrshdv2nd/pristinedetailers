# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-05-31
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Progress Since Last Week

**Three weeks in — nothing from the carry-forward list has been closed.**

The sitemap + robots.txt fix (Priority 1 for the third consecutive week) has still not been implemented. The homepage is still a `'use client'` file with no metadata export. The review count discrepancy is still live on the homepage. Jordan published at least two articles this week — those slugs exist in the database but have zero guarantee of being discovered by Googlebot without a sitemap, and GPTBot/PerplexityBot have no explicit permission to crawl them.

The compounding cost is real: every article Jordan publishes without a sitemap is a bet on Googlebot happening to re-crawl `/blog` and follow the link. Each week of delay on homepage metadata is a week the highest-traffic page competes for "mobile car detailing Melbourne" with an inherited layout title.

---

## Top 3 Priority Issues

---

### Priority 1 — CRITICAL (3rd week open): No Sitemap or Robots.txt

**Page:** Site-wide (`app/`)

**Problem:**

`app/sitemap.ts`, `app/robots.ts`, `public/sitemap.xml`, `public/robots.txt` — none exist. Confirmed again this week.

Jordan is publishing blog articles on a Tuesday/Friday schedule. Each published article at `/blog/[slug]` is only discovered by Googlebot if it crawls the `/blog` index page and follows the link. For a site without a sitemap, this relies entirely on crawl frequency — which for a newer domain with low backlink authority is unpredictable. Articles can sit unindexed for 4–8 weeks.

For AI search: GPTBot (ChatGPT), PerplexityBot, ClaudeBot (Anthropic), and Google-Extended (Gemini/AI Overviews) all check `robots.txt` before proceeding. Without one, these bots operate on default assumptions — some proceed, some do not. There is currently no explicit invitation for any AI engine to cite Pristine Detailers content. This is the single most direct lever for AI discoverability and it requires zero content work to pull.

**Search queries this blocks:** Every article slug published by Jordan. Any AI answer for "ceramic coating Melbourne", "PPF cost Melbourne", "mobile car detailing Melbourne" that should cite a Pristine blog post.

**Specific Fix:**

Create `app/sitemap.ts` (fetches all published blog slugs from Supabase):

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

After deploying, submit `https://pristinedetailers.com.au/sitemap.xml` to Google Search Console.

**Time to implement:** 30 minutes. This has been 30 minutes of work for three weeks.

---

### Priority 2 — HIGH (2nd week open): Homepage Is 'use client' — No Metadata, No Melbourne in Title, FAQ Invisible to Crawlers

**Page:** `/` (`app/page.tsx`, `components/pages/home.tsx`)

**Problem:**

`app/page.tsx` is still a `'use client'` file (line 1). A `'use client'` page file cannot export `metadata`. The homepage title is permanently the layout fallback: *"Pristine Detailers — Melbourne's Premium Mobile Detailing"* — it cannot be overridden without converting the file.

More important is what this means for the FAQ. The `FAQSection` component (`home.tsx` line 991) contains four high-value Q&A pairs that Melbourne buyers search for verbatim:

- "Do you come to my home or office?"
- "How long does a ceramic coating application take?"
- "Can I combine PPF and ceramic coating?"
- "What does the membership include?"

The FAQ is rendered by a `useState` accordion (`'use client'`, open state toggled by click). Since the page is client-rendered, an AI crawler fetching the homepage HTML sees no FAQ content in the initial payload — it receives a Next.js shell. These four answers are invisible to ChatGPT, Perplexity, Claude, and Google AI Overviews. They are exactly the kind of self-contained, direct-answer passages that AI engines extract and cite.

Additionally, `home.tsx` line 890 still has `href="#"` for "View gallery" — a broken internal link that Googlebot follows and returns nothing.

**Search queries this blocks:** "mobile car detailing Melbourne", "ceramic coating Melbourne", "can you combine PPF and ceramic coating", "how long does ceramic coating take", "car detailing membership Melbourne".

**Specific Fix:**

Step 1 — Convert `app/page.tsx` to a server component:

```tsx
// app/page.tsx — remove 'use client', add metadata export
import type { Metadata } from 'next';
import { Home } from '@/components/pages/home';

export const metadata: Metadata = {
  title: 'Mobile Car Detailing Melbourne — Ceramic Coating & PPF | Pristine Detailers',
  description: 'Premium mobile car detailing in Melbourne. Ceramic coating from $750, PPF from $2,900, membership from $79/mo. We come to your driveway — Toorak, Brighton, South Yarra and 60+ suburbs.',
};

export default function Page() {
  return <Home />;
}
```

The `'use client'` directive stays in `components/pages/home.tsx` where it belongs. The page file itself does not need it.

Step 2 — Fix the gallery link (`home.tsx` line 890):
```tsx
// Current:
<a href="#" ...>View gallery <Arrow /></a>
// Fix:
<a href="/gallery" ...>View gallery <Arrow /></a>
```

Step 3 — Add FAQPage JSON-LD to the page. The four existing FAQ answers are perfect source material — self-contained, direct, 20–40 words each. Add this to `app/page.tsx`:

```tsx
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do you come to my home or office?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — our mobile team comes to you. We need access to water and power, and a covered or open space roughly the size of two parking bays."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a ceramic coating application take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A full ceramic coating application (including paint correction) is typically a full day of work."
      }
    },
    {
      "@type": "Question",
      "name": "Can I combine PPF and ceramic coating?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — we recommend it. PPF goes on first as a physical barrier, then ceramic coating on top for a hydrophobic finish and self-heal enhancement."
      }
    },
    {
      "@type": "Question",
      "name": "What does the Pristine Detailers membership include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "$79/month includes one monthly wash-and-seal detail, priority same-week booking, 10% off all services, and discounted rates for same-household vehicles."
      }
    }
  ]
};

// In the page component:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
/>
```

---

### Priority 3 — HIGH (new this week): Services Page Has No Metadata and Tab-Hidden Pricing Is Unindexed

**Page:** `/services` (`app/services/page.tsx`, `components/pages/services.tsx`)

**Problem:**

`app/services/page.tsx` exports no metadata. The page inherits the layout default title: *"Pristine Detailers — Melbourne's Premium Mobile Detailing"* — which is the same title as the homepage. Google and AI engines see two pages with identical title tags. This is a duplicate title issue on the highest-commercial-intent page on the site.

The specific service content (descriptions, prices, feature bullets) renders via a JavaScript tab pattern at `services.tsx` line 104:

```tsx
<div key={service.id} style={{ display: selected === service.id ? 'block' : 'none' }}>
```

All services except the default selected tab render with `display: none` in the initial DOM. Google *does* index `display:none` content, but with reduced weight. More critically, AI crawlers (GPTBot, PerplexityBot, ClaudeBot) fetch static HTML and parse it as-is — they see only the first tab's content. The pricing for PPF ($2,900–$7,900), paint correction, and interior detailing is effectively invisible to AI engines.

The sidebar copy is the only Melbourne geo-signal on the entire services page: *"Mobile service across greater Melbourne."* — one sentence. There is no suburb-level targeting, no reference to Melbourne roads, weather, or the specific paint threats that make each service relevant.

**Search queries this blocks:** "ceramic coating Melbourne price", "PPF cost Melbourne", "paint correction Melbourne", "how much does car detailing cost Melbourne".

**Specific Fix:**

Step 1 — Add metadata to `app/services/page.tsx`:

```tsx
import type { Metadata } from 'next';
import { Services } from '@/components/pages/services';

export const metadata: Metadata = {
  title: 'Car Detailing Services Melbourne — Ceramic Coating, PPF & Paint Correction | Pristine Detailers',
  description: 'Mobile car detailing services in Melbourne. Ceramic coating from $750, PPF from $2,900, paint correction from $450, interior detailing from $350. We come to you.',
};

export default function Page() {
  return <Services />;
}
```

Step 2 — Convert tab-hidden content to server-renderable layout. The simplest approach without rebuilding the component is to render all service content visibly and use CSS `position: sticky` or scroll-anchoring for the tab navigation, keeping selected state for the UI while keeping all content in the DOM. An even simpler fix: render all service descriptions in a non-hidden section below the tabs as plain HTML (no display:none), styled as a secondary index. This makes the content fully crawlable while preserving the interactive tab UX.

Step 3 — Add one Melbourne-specific sentence to each service body that names a real use-case context: e.g. for ceramic coating: *"Particularly effective protection against Melbourne's summer UV, bird droppings in inner-east suburbs, and salt air on the Mornington Peninsula."* for PPF: *"Stone chips on the Eastern Freeway and Eastlink are the #1 reason Melbourne drivers invest in front-end PPF coverage."*

**Time to implement:** ~45 minutes for metadata + one-liner geo-copy. Tab-rendering fix is ~1–2 hours.

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "PPF vs Ceramic Coating: The Melbourne Driver's Guide to Choosing the Right Protection"

**Target queries:** "PPF vs ceramic coating", "paint protection film vs ceramic coating Melbourne", "do I need PPF and ceramic coating", "which is better PPF or ceramic coating"

**The gap:** The product-marketing-context.md explicitly lists "PPF vs ceramic coating" as a target search query. It is not in Jordan's topic bank. There is no article on the site that compares these two directly. The homepage FAQ mentions combining both in one sentence — but there is no dedicated comparison page that a buyer researching the decision would find.

**Why this converts:** Comparison-format articles earn ~33% AI citation share — the highest of any content type. A Melbourne buyer who is comparing quotes from competing services will Google "PPF vs ceramic coating" before committing. An authoritative, table-driven answer from Pristine positions the brand as the trusted expert *before* any competitor gets a chance to speak. The fact that Pristine recommends combining both (PPF first, ceramic on top) is a differentiator that should be explained in full, not buried in an FAQ.

**Format for AI extraction:**
- Opening definition block (40–60 words): "What is PPF?" and "What is ceramic coating?" — self-contained, citable sentences
- Comparison table: Protection type / Physical barrier / Chemical resistance / Self-healing / Durability / Starting price / Best for
- "Can you use both together?" section — direct answer, step-by-step application order
- Melbourne-specific column in the table: stone chips (freeway), bird droppings (Toorak/Hawthorn), salt air (Mornington Peninsula)
- "Which should I choose?" decision guide — buyer questions with direct answers

**Suggested title:** "PPF vs Ceramic Coating: The Melbourne Driver's Guide to Choosing the Right Paint Protection"
**Category:** Paint Protection Film
**Pass to Jordan:** Yes — add to topic bank.

---

### Content Idea 2 — "Car Detailing Cost in Melbourne: Full Pricing Guide for Ceramic, PPF, and Detailing in 2026"

**Target queries:** "how much does car detailing cost Melbourne", "ceramic coating cost Melbourne 2026", "car detailing prices Melbourne", "PPF cost Melbourne", "mobile detailing price Melbourne"

**The gap:** All of Pristine's pricing currently lives inside the JavaScript tab interface on `/services` — where it is partially invisible to crawlers and entirely invisible to AI systems. A buyer Googling "how much does car detailing cost Melbourne" cannot land on a Pristine page that directly answers the question. This is an unforced error: the pricing exists and is publicly listed, but it's locked behind a UI pattern that search engines and AI systems can't read.

**Why this converts:** Pricing articles convert because they attract buyers who are ready to spend — they've decided on the service and are now comparing quotes. A 2026-dated, Melbourne-specific pricing guide that includes Pristine's actual prices (not a "contact us for a quote" wall) will rank for these commercial-intent queries and be the kind of concrete, factual page that AI engines extract and cite. The Princeton GEO study found that pages with specific numbers and statistics earn 37–40% higher AI citation rates.

**Format for AI extraction:**
- Summary pricing table at the top: Service / What's included / Starting price / Duration
  - Maintenance wash: from $X, 2–3 hours
  - Interior detailing: from $350, 3–4 hours
  - Paint correction (1-stage): from $450, 4–6 hours
  - Paint correction (2-stage): from $650, 6–8 hours
  - Ceramic coating (incl. correction): from $750, full day
  - PPF partial front: from $2,900, 1 day
  - PPF full body: from $7,900, 2–3 days
- "What affects detailing cost?" section — vehicle size, paint condition, service type, add-ons
- "Is mobile detailing more expensive?" — direct comparison, explain why mobile premium is worth it
- Membership pricing comparison: pay-per-visit vs. $79/mo vs. $149/mo breakdown

**Suggested title:** "Car Detailing Cost in Melbourne: Full Pricing Guide for Ceramic, PPF & Detailing (2026)"
**Category:** Detailing
**Pass to Jordan:** Yes — add to topic bank.

---

## AI Citation Readiness Score

**Score: 3.5 / 10** — unchanged from last week.

### Reasoning

Nothing from last week's priority list was addressed. The score does not improve when no changes are made.

| Signal | Status | Change |
|--------|--------|--------|
| Server-side rendered content | Partial — `/blog` and `/blog/[slug]` only | No change |
| Homepage metadata | None — `'use client'` blocks all exports | No change |
| Services metadata | None — inherits generic layout title | No change |
| Membership metadata | None — no metadata export | No change |
| Blog index title | Generic ("Blog — Pristine Detailers") | No change |
| Blog article title pattern | No Melbourne signal (`${title} — Pristine Detailers`) | No change |
| Structured data (schema) | None anywhere on the site | No change |
| `robots.txt` | Missing — AI bots have no explicit permission | No change |
| `sitemap.xml` | Missing — new articles risk weeks of non-discovery | No change |
| `llms.txt` | Missing — AI agents have no structured summary | No change |
| FAQ content (AI-extractable) | Homepage + membership FAQs are client-rendered | No change |
| Pricing facts (extractable) | Tab-hidden on /services, partial on /blog articles only | No change |
| Author attribution on articles | DB field exists, not rendered in template | No change |
| Review count consistency | 30 / 39 / 240 / 240 — still inconsistent on homepage | No change |
| AI bot access | No robots.txt — unknown default behaviour per bot | No change |

### What Needs to Happen for Score to Move

| Fix | Score Impact | Effort |
|-----|-------------|--------|
| Add `robots.txt` explicitly allowing AI bots | +0.5 | 20 min |
| Add `sitemap.ts` with all blog slugs | +0.3 | 30 min |
| Convert homepage to server component + add metadata | +0.5 | 30 min |
| Add FAQPage JSON-LD on homepage | +0.5 | 20 min |
| Add `LocalBusiness` + `AggregateRating` schema to layout | +0.5 | 45 min |
| Fix review count (30/39 → 240 on homepage) | +0.2 | 10 min |
| Add `llms.txt` to `public/` | +0.3 | 20 min |
| Add services page metadata | +0.2 | 10 min |
| Add membership page metadata | +0.2 | 10 min |

**If all of the above are completed this week, the score goes to approximately 6.5/10.** Total implementation time: under 4 hours. The score has been stuck at 3.5 because none of these items have been actioned. They are all independently deployable — any one of them improves the site.

### Path to 8/10 (Realistic by End of June)

1. **This week:** Robots.txt + sitemap (30 min). Homepage server component + metadata + FAQPage schema (45 min). Services + membership metadata (15 min). Review count fix (10 min). Total: ~2 hours. Score → ~5.5/10.
2. **Next week:** `LocalBusiness` + `AggregateRating` JSON-LD in `app/layout.tsx`. `llms.txt` in `public/`. Fix blog index title and article title pattern (one-line change each). Score → ~6.5/10.
3. **Week 3:** Publish PPF vs Ceramic comparison article (comparison tables = highest AI citation format). Add `Article` + `FAQPage` schema to all blog posts. Score → ~7.5/10.
4. **Week 4:** Services tab-hidden content converted to crawlable structure. Suburb-level Melbourne copy added to services. Score → ~8/10.

---

## Quick-Win Topics for Jordan's Topic Bank

The following two topics should be added to the topic bank in `jordan-content-writer.md` immediately. Both fill genuine Melbourne keyword gaps and are not already in the bank.

1. **"PPF vs Ceramic Coating: The Melbourne Driver's Guide to Choosing the Right Paint Protection"** — Comparison table format, ~33% AI citation rate, targets a query explicitly listed in our keyword targets but currently unserved. Add to Paint Protection Film category. *Note for Jordan: include a Melbourne-specific column in the comparison table — stone chips on the Eastern Freeway and Eastlink for PPF, UV and bird droppings for ceramic. The fact we recommend both is a differentiator — make that the conclusion.*

2. **"Car Detailing Cost in Melbourne: Full Pricing Guide for Ceramic, PPF & Detailing (2026)"** — Direct answer to the highest-commercial-intent pricing query in the category. Prices are already on the site (buried in JS tabs on /services) — Jordan just needs to surface them in article format with context. Pricing articles with specific numbers earn 37–40% higher AI citation rates (Princeton GEO study). Add to Detailing category. *Note for Jordan: open with a summary pricing table — Service / Starting price / Duration — at the very top of the article, before any intro copy. That table is what AI engines extract and cite.*

---

## Secondary Flags (Carry-Forward)

These are not Priority 1–3 this week but remain open and unresolved:

- **Blog article title pattern missing Melbourne** (`app/blog/[slug]/page.tsx` line 30): Change `${data.title} — Pristine Detailers` to `${data.title} | Melbourne | Pristine Detailers`. One-line change. Adds Melbourne signal to every article in Google's SERP title.
- **Blog index title is generic** (`app/blog/page.tsx` line 6): Change `'Blog — Pristine Detailers'` to `'Car Detailing Blog Melbourne | Ceramic Coating & PPF Guides | Pristine Detailers'`. One-line change.
- **Review count on homepage still wrong** (`home.tsx` lines 69 and 940): Line 69 says "4.9 / 30 reviews", line 940 says "4.9 stars across 39 reviews". Footer and `/about/reviews` both correctly say 240. Fix both homepage instances to 240. Required before AggregateRating schema can be added — inconsistent counts create a structured data trust liability.
- **Membership page has no metadata** (`app/membership/page.tsx`): No export. Inherits generic layout title. Add: `title: 'Car Detailing Membership Melbourne | From $79/mo | Pristine Detailers'`. 10 minutes.
- **`llms.txt` still missing**: A file at `public/llms.txt` summarising services, prices, and suburb coverage is the cheapest AI discoverability improvement on the board. AI agents (ChatGPT Browse, Perplexity, Claude) parse this as structured context without needing to render JavaScript. 20 minutes to write.
- **`app/journal/page.tsx` is dead code**: The `/journal` → `/blog` redirect in `next.config.mjs` means `app/journal/page.tsx` is never served. It can be safely removed to reduce developer confusion.

---

*Next audit: 2026-06-07 | Carry-forward MUST close: sitemap.ts + robots.ts (Priority 1, week 4 if not done). Homepage server component + metadata (Priority 2, week 3 if not done). These are under 1 hour of work each. If they are open next Monday, escalate to the broader team.*
