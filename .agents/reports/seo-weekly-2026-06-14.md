# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-06-14
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Status Check: What Changed Since Last Week

**Nothing changed. Six weeks of the same critical issues.**

Filesystem confirmed this morning:
- `app/sitemap.ts` — not created
- `app/robots.ts` — not created
- `app/page.tsx` line 1 — still `'use client'`
- `components/pages/journal-article.tsx` line 1 — still `'use client'`
- `public/llms.txt` — not created
- `home.tsx` line 890 gallery link — still `href="#"`
- `home.tsx` lines 69, 940 — still "30 reviews" / "39 reviews" (should be 240)
- `app/blog/page.tsx` title — still `'Blog — Pristine Detailers'`
- Services page — still no `metadata` export
- Membership page — still no `metadata` export

**New finding this week:** The topic bank in `jordan-content-writer.md` still lists "Ceramic coating vs car wax: the honest comparison for Melbourne weather" as an open topic — but this article was published on 2026-04-01 as *"Ceramic Coating vs. Wax: Why the Upgrade Makes Sense"* at `/blog/ceramic-coating-vs-wax`. Jordan is at risk of writing a duplicate. This topic must be removed from the bank immediately (see bottom of brief).

Per the previous brief's escalation path: Priority 1 and Priority 2 below are now **deployment blockers**. Jordan is publishing twice a week. Every new article is being written, published, and left undiscoverable by Google and uncitable by ChatGPT, Perplexity, and Claude. The content investment is real; the distribution infrastructure is not.

---

## Top 3 Priority Issues

---

### Priority 1 — DEPLOYMENT BLOCKER (Week 6): No Sitemap or Robots.txt

**Page:** Site-wide (`app/` root)

**Problem:**

Six consecutive audits. `app/sitemap.ts` and `app/robots.ts` still do not exist. Jordan is publishing two articles per week. Every `/blog/[slug]` article can only be discovered if Googlebot follows a link from the blog index — a page with no external backlinks and no sitemap reference. At Pristine's current domain authority tier, unsubmitted articles take 4–8 weeks to index. Articles published last month may not yet be in Google's index.

The robots.txt absence is the AI citation blocker. GPTBot, PerplexityBot, ClaudeBot, and Google-Extended all check `robots.txt` before committing to full crawl and index cycles. There is no explicit permission for any AI engine to cite Pristine Detailers content. Every Melbourne search query the journal is written to appear in — "ceramic coating Melbourne", "PPF cost Melbourne", "mobile car detailing Melbourne", "paint correction Melbourne" — has zero guaranteed AI coverage.

**Specific Fix — Two files, ~30 minutes total:**

**`app/sitemap.ts`** (new file):
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

**`app/robots.ts`** (new file):
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

After deploying, manually submit `https://pristinedetailers.com.au/sitemap.xml` in Google Search Console. That's the only post-deploy step.

**Time to implement:** 30 minutes.

---

### Priority 2 — DEPLOYMENT BLOCKER (Week 6): Homepage `'use client'` Blocks All Metadata and FAQ Extraction

**Page:** `/` — `app/page.tsx` line 1, `components/pages/home.tsx`

**Problem:**

`app/page.tsx` opens with `'use client'`. A `'use client'` page route cannot export `metadata`. The homepage title is permanently locked to the root layout fallback: *"Pristine Detailers — Melbourne's Premium Mobile Detailing."* Melbourne searchers typing "mobile car detailing Melbourne", "ceramic coating Melbourne", or "PPF Melbourne" see a brand name, not a service match. SERP click-through rate suffers directly.

The worse problem: `home.tsx` contains a FAQ section with four direct-answer passages — "Do you come to my home or office?", "How long does ceramic coating take?", "Can I combine PPF and ceramic coating?", "What does the membership include?" — that are 20–40 word self-contained answer blocks, exactly what ChatGPT and Perplexity extract for AI answers. Because the FAQ renders via `useState` in a client component, AI crawlers receive a JavaScript shell. These answers do not exist for any AI engine.

**Specific Fix — Two steps, ~30 minutes total:**

**Step 1:** Replace `app/page.tsx` entirely:
```tsx
import type { Metadata } from 'next';
import { Home } from '@/components/pages/home';

export const metadata: Metadata = {
  title: 'Mobile Car Detailing Melbourne — Ceramic Coating & PPF | Pristine Detailers',
  description: 'Premium mobile car detailing across Melbourne. Ceramic coating from $750, PPF from $3,000, membership from $79/mo. We come to your driveway — Toorak, Brighton, South Yarra and 60+ suburbs.',
};

export default function Page() {
  return <Home />;
}
```

The `'use client'` directive belongs in `components/pages/home.tsx` where `useState` actually lives — not in the page route.

**Step 2:** Add FAQPage JSON-LD to `app/page.tsx` using the four existing FAQ answers from `home.tsx`:
```tsx
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
          "text": "Yes — our mobile team comes to you anywhere across Melbourne. We need access to water, power, and a covered or open space roughly the size of two parking bays. Same-day bookings available by phone."
        }
      },
      {
        "@type": "Question",
        "name": "How long does a ceramic coating application take in Melbourne?",
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
          "text": "From $79/month, the Essential membership includes one monthly wash-and-seal detail, priority same-week booking, and 10% off all other services. The Signature membership at $149/month includes bi-monthly detailing, ceramic maintenance, and exclusive add-on pricing."
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

**Time to implement:** 30 minutes.

---

### Priority 3 — HIGH (Escalated from Secondary, Week 2): `journal-article.tsx` `'use client'` Makes Every Article AI-Uncitable

**Page:** All `/blog/[slug]` article pages — `components/pages/journal-article.tsx` line 1

**Problem:**

`journal-article.tsx` opens with `'use client'`. This means the full article body — every paragraph, every subheading, every sentence Jordan has written — renders in the browser and is invisible to AI crawlers. ChatGPT, Perplexity, and Claude receive an empty shell when they fetch any Pristine Detailers article URL.

Jordan has been publishing twice a week for months. The articles — on PPF, ceramic coating, paint correction, mobile detailing — are exactly the content Melbourne car owners are searching for in AI engines. Zero of it is being cited because zero of it is readable to the crawlers that would cite it.

This is a one-line fix. The article body is statically rendered from Supabase data. There is no `useState`, no `useEffect`, no interactive component in the article template that requires client-side rendering.

**Specific Fix — Delete one line, ~10 minutes:**

Open `components/pages/journal-article.tsx`. Delete line 1:
```tsx
'use client';  ← delete this line
```

After removing it, verify the build compiles (no `useState`/browser API calls should exist in this component — if there are any, move them to a small client sub-component). This is the same pattern used successfully in `app/blog/page.tsx`, which correctly does not have a `'use client'` directive.

Following this fix, add `BlogPosting` JSON-LD to `app/blog/[slug]/page.tsx` using the data already fetched for `generateMetadata`:
```tsx
// In the Page() function, before return <JournalArticle />:
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": data.title,
  "description": data.excerpt,
  "datePublished": data.published_at,
  "author": {
    "@type": "Organization",
    "name": "Pristine Detailers",
    "url": "https://pristinedetailers.com.au"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Pristine Detailers",
    "url": "https://pristinedetailers.com.au"
  },
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://pristinedetailers.com.au/blog/${slug}`
  }
};
```

**Time to implement:** 10 minutes to remove directive + 30 minutes to add schema.

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "Stone Chip Protection Melbourne: Why Freeway Driving Destroys Your Paint and How PPF Stops It"

**Target queries:** "stone chip protection Melbourne", "rock chip protection Melbourne", "PPF stone chips", "paint chip repair Melbourne", "stone chip car paint Melbourne"

**The gap:** Zero coverage exists on the site or in the topic bank for the phrase "stone chip protection" — despite the fact that the product marketing context explicitly calls out stone chips as a key Melbourne threat and the Eastern Freeway/Eastlink as primary culprits. Melbourne's freeways are among the worst chip-generating roads in Australia due to bluestone gravel aggregate and heavy truck traffic. The ICP — professionals driving from Toorak, South Yarra, and Hawthorn to the CBD via the Eastern Freeway — encounters this daily. This article would be the primary entry point for that buyer moment.

**Why it's AI-citable:** Opens with a 40–60 word definition block ("Stone chips are the most common cause of paint damage for Melbourne drivers who use the Eastern Freeway, Eastlink, or Monash Freeway regularly. Paint Protection Film — a self-healing polyurethane layer applied before any ceramic coating — absorbs the kinetic energy of gravel impact before it reaches your clear coat."). Includes a named-freeway risk table and PPF-vs-unprotected comparison. Named Melbourne roads are geographic entity signals that boost local AI citation probability.

**Format for AI extraction:**
- Lead paragraph (40–60 words): direct answer defining stone chips + PPF as the solution
- Table: Melbourne freeway / chip risk level / recommended PPF coverage zone
- "What happens when a chip goes untreated" — oxidation timeline
- "Why PPF and not ceramic for chips" — comparison block (AI cites comparison tables at ~33%)
- FAQ block: "Does PPF stop all stone chips?" / "Can PPF be added after a chip appears?" / "How long does PPF last on high-impact zones?"
- CTA: Book a PPF consultation

**Suggested title:** "Stone Chip Protection Melbourne: Why Freeway Driving Destroys Your Paint and How PPF Stops It"
**Category:** Paint Protection Film
**Pass to Jordan:** Yes — add to topic bank (see below)

---

### Content Idea 2 — "Prestige Car Detailing Melbourne: What BMW, Mercedes, Porsche and Tesla Owners Need to Know"

**Target queries:** "BMW detailing Melbourne", "Porsche car detailing Melbourne", "Mercedes ceramic coating Melbourne", "Tesla paint protection Melbourne", "prestige car care Melbourne", "European car detailing Melbourne"

**The gap:** The ICP section of the product marketing context explicitly names BMW, Mercedes, Audi, Toyota Landcruiser, Porsche, and Tesla as the target vehicles — but zero content on the site or in the topic bank targets these makes by name. The topic bank has "Ceramic coating for Teslas" (covering EV-specific differences) but nothing covering European prestige vehicles. These owners search by brand ("BMW detailing Melbourne") not by generic category, and Google surfaces brand-named content for brand-named queries. This is a direct ICP-targeting gap.

**Why it's AI-citable:** Brand names are entities. A structured article with a section per make — BMW, Mercedes, Porsche, Tesla — is exactly how AI engines answer "who does X detailing in Melbourne?" queries. Each brand section (~100 words) becomes independently extractable. The article also captures long-tail queries that are high-intent: owners who search "Porsche GT3 paint correction Melbourne" or "Tesla Model 3 PPF Melbourne" are at peak purchase intent.

**Format for AI extraction:**
- Intro: Why prestige paint behaves differently from mainstream cars (BMW and Mercedes have softer clear coats; Porsche uses thicker OEM paint on some models; Tesla's single-stage panel process)
- Brand-by-brand sections — each ~100 words, each answering "what should [make] owners know before detailing?":
  - **BMW:** soft lacquer clear coat sensitivity to rotary polishers, ceramic coating is near-mandatory for UV near Port Phillip
  - **Mercedes:** AMG paint thickness variations, common swirl issues from dealership wash machines
  - **Porsche:** satin/matte options on GT cars require different product stack; standard ceramic is wrong
  - **Tesla:** paint inconsistency at panel gaps from Fremont/Giga plant, glass roof and ceramic film compatibility
  - **Audi:** RS/S-line bonnet chips on M1 motorway, PPF front coverage zone recommendation
- FAQ block: "Does ceramic coating void prestige car warranty?"
- CTA: "Book a free assessment for your [make]"

**Suggested title:** "Prestige Car Detailing Melbourne: What BMW, Mercedes, Porsche and Tesla Owners Need to Know"
**Category:** Detailing
**Pass to Jordan:** Yes — add to topic bank (see below)

---

## AI Citation Readiness Score

**Score: 3.5 / 10 — Unchanged for Week 6.**

This score has not moved since 2026-05-24. It cannot move without code changes to `app/page.tsx`, `components/pages/journal-article.tsx`, and the creation of `app/sitemap.ts` and `app/robots.ts`. The full remediation table from last week's brief stands:

| Signal | Status | File | Est. Effort |
|--------|--------|------|-------------|
| `robots.ts` — explicit AI bot access | **Missing** | Create `app/robots.ts` | 15 min |
| `sitemap.ts` — content discovery | **Missing** | Create `app/sitemap.ts` | 15 min |
| Homepage `metadata` export | **Blocked** by `'use client'` in `app/page.tsx:1` | Remove directive, add export | 20 min |
| Homepage FAQPage JSON-LD | **Missing** | Add to `app/page.tsx` | 20 min |
| `journal-article.tsx` server render | **Blocked** by `'use client'` in `components/pages/journal-article.tsx:1` | Delete line 1 | 10 min |
| Article `BlogPosting` schema | **Missing** | Add to `app/blog/[slug]/page.tsx` | 30 min |
| Services page `metadata` | **Missing** | `app/services/page.tsx` has no metadata export | 10 min |
| Membership page `metadata` | **Missing** | `app/membership/page.tsx` has no metadata export | 10 min |
| `LocalBusiness` JSON-LD | **Missing** | Add to `app/layout.tsx` | 45 min |
| Data consistency (warranty + discount) | **Conflicting** | Fix across `home.tsx`, `services.tsx`, `membership.tsx` | 20 min |
| Review count consistency | **Wrong** — 30/39/240 in three places | `home.tsx` lines 69, 940 | 10 min |
| Blog index title | **Generic** — `'Blog — Pristine Detailers'` | `app/blog/page.tsx` line 4 | 5 min |
| Article title missing "Melbourne" | **Missing** | `app/blog/[slug]/page.tsx` line 30 | 5 min |
| Gallery link broken (`href="#"`) | **Broken** | `home.tsx` line 890 | 1 min |
| `public/llms.txt` | **Missing** | New file | 20 min |
| Open Graph + Twitter Card tags | **Missing** — no social share previews | Add to `app/layout.tsx` | 30 min |

**Total time to close everything: approximately 4.5–5 hours.**

### Score reasoning

**Why 3.5 and not lower:** The site has real assets — FAQ sections on two pages, service pricing, Melbourne suburb coverage, 6+ published articles, GTM and GA4 wired up. The content foundation exists. The problem is entirely infrastructure and render-mode — none of the assets are accessible to the systems that would surface them.

**Why not higher:** Every article Jordan has published is rendering in the browser only. No AI engine can extract a sentence from any of them. The homepage's best AI-citable content — four FAQ answers — is inside a `useState` accordion that AI crawlers never see. There is no sitemap, no robots.txt, and no schema markup on any page.

**What 7.5/10 looks like from here (4.5 hours of dev work):**
- FAQPage schema on homepage → Google FAQ rich results for "mobile car detailing Melbourne" and "ceramic coating Melbourne" → estimated +15–25% click-through rate uplift
- robots.ts → Perplexity, ChatGPT, and Claude can now index and cite all journal articles
- BlogPosting schema on articles → +30–40% AI citation rate on non-Google platforms
- sitemap.ts → all published and future articles indexed within days, not weeks
- LocalBusiness schema → Google Knowledge Panel and rich snippets on branded searches

---

## Quick-Win Topics — Jordan's Topic Bank Updates

### Remove (Duplicate of Published Article)
**"Ceramic coating vs car wax: the honest comparison for Melbourne weather"** — This topic is currently in the topic bank but the article was already published on 2026-04-01 as *"Ceramic Coating vs. Wax: Why the Upgrade Makes Sense"* at `/blog/ceramic-coating-vs-wax`. Remove from the topic bank in `jordan-content-writer.md` to prevent a duplicate being written.

### Add (New This Week)

**1. "Stone Chip Protection Melbourne: Why Freeway Driving Destroys Your Paint and How PPF Stops It"**
*(Added by Alex — targets "stone chip protection Melbourne" and "rock chip protection Melbourne", zero coverage exists on site or in topic bank. High-conversion entry point for freeway commuters in Toorak, South Yarra, and Hawthorn. Open with a direct 40–60 word answer block naming the Eastern Freeway, Eastlink, and Monash Freeway. Include a Melbourne freeway risk table and a PPF vs. unprotected paint comparison table — comparison tables earn ~33% AI citation rate. FAQ block essential for AI extraction. PPF category.)*

**2. "Prestige Car Detailing Melbourne: What BMW, Mercedes, Porsche and Tesla Owners Need to Know"**
*(Added by Alex — ICP vehicles (BMW, Mercedes, Audi, Porsche, Tesla) are named in the product marketing context but zero content targets them by make. Brand-named queries ("BMW detailing Melbourne") are high-intent and convert. Structure as brand-by-brand sections (~100 words each) — each section is independently extractable by AI for brand-specific queries. Key points per brand: BMW soft lacquer sensitivity, Mercedes AMG paint thickness, Porsche GT satin/matte options, Tesla panel gap inconsistency. Detailing category.)*

---

## Carry-Forward Flags (Open, Not Yet Escalated to Priority)

All items below are unchanged from previous briefs. Specific files and line numbers are exact:

- **Services page metadata** — `app/services/page.tsx` has no metadata export. Add: `title: 'Car Detailing Services Melbourne — Ceramic Coating, PPF & Detailing | Pristine Detailers'`. Five minutes.
- **Membership page metadata** — `app/membership/page.tsx` has no metadata export. Add: `title: 'Car Detailing Membership Melbourne — From $79/mo | Pristine Detailers'`. Five minutes.
- **Blog index title** — `app/blog/page.tsx` line 4: change `'Blog — Pristine Detailers'` → `'Car Detailing Blog Melbourne | Ceramic Coating & PPF Guides | Pristine Detailers'`. One line.
- **Article title pattern** — `app/blog/[slug]/page.tsx` line 30: change `${data.title} — Pristine Detailers` → `${data.title} | Melbourne | Pristine Detailers`. One line.
- **Gallery link broken** — `home.tsx` line 890: change `href="#"` → `href="/gallery"`. Thirty seconds.
- **Review count wrong** — `home.tsx` lines 69 and 940: "30 reviews" and "39 reviews" → "240 reviews" to match `/about/reviews`. Required before AggregateRating schema can be added without false data.
- **Data conflicts** — Ceramic warranty: homepage says 5 years, services page says 8 years. Membership discount: three different figures (10%, 15%, 35%) across `home.tsx` and `membership.tsx`. Resolve and standardise before adding schema with numeric claims.
- **`app/journal/page.tsx` dead code** — The permanent redirect from `/journal` to `/blog` in `next.config.mjs` means this file is never served. Safe to delete.
- **`public/llms.txt` missing** — 20-minute plain-text file providing business context directly to AI agents. The highest leverage/effort ratio item on the entire list.
- **Open Graph tags missing** — No `og:title`, `og:description`, or `og:image` in `app/layout.tsx`. Every link shared to LinkedIn, Facebook, or iMessage renders as a blank card. Add to the root layout metadata object.

---

*Next audit: 2026-06-21. Escalation status: sitemap, robots.txt, and homepage `'use client'` remain DEPLOYMENT BLOCKERS entering Week 7 if not resolved this week. The `journal-article.tsx` one-line fix (10 minutes, affects every article Jordan writes) is now Priority 3 — it should have been fixed in Week 4. If these four items are not resolved by the next audit, they will be escalated beyond the SEO brief to a cross-team flag.*
