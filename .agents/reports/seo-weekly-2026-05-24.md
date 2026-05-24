# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-05-24
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Progress Since Last Week

One item resolved: the `/journal` → `/blog` 301 redirect is now live in `next.config.mjs`, and the `/blog` route has been rebuilt as a server component with metadata and `generateMetadata` for individual article slugs. This consolidates link equity from the old journal URLs into the canonical `/blog` route. Good work.

What's still not done (carried from last week): homepage metadata, services page metadata, tab-hidden content on services, and all structured data. Those remain the most impactful open items on the board.

New critical issue surfaced this week: the site has no `sitemap.xml` or `robots.txt`. This is now Priority 1.

---

## Top 3 Priority Issues

---

### Priority 1 — No Sitemap or Robots.txt: Googlebot Is Flying Blind

**Page:** Site-wide (`public/` directory and `app/`)

**Problem:**

Neither `public/sitemap.xml`, `app/sitemap.ts`, `public/robots.txt`, nor `app/robots.ts` exist anywhere in the project. This affects the site in two compounding ways:

**Sitemap gap:** Googlebot discovers pages only through internal links. Static pages (`/services`, `/membership`, `/gallery`, `/booking`, `/contact`) are all reachable from the nav. But blog article URLs — e.g., `/blog/ceramic-coating-melbourne` — are only discoverable if Googlebot crawls the `/blog` index page and follows each link. Without a sitemap, new articles may sit unindexed for weeks, and older articles with few internal links are effectively invisible. A Next.js sitemap at `app/sitemap.ts` that fetches all published slugs from Supabase would tell Googlebot exactly what to crawl.

**Robots.txt gap:** Without a `robots.txt`, AI crawlers operate with no instructions. GPTBot (ChatGPT), PerplexityBot, ClaudeBot (Anthropic), and Google-Extended (Gemini/AI Overviews) all check `robots.txt` before indexing content. Right now, they're either proceeding without direction or being blocked by a default policy — there's no way to know. Explicitly allowing these bots is the single most direct action to improve AI citation readiness.

**Search queries this blocks:** All blog articles that haven't been manually discovered. Any AI system looking to cite a Pristine Detailers article for "ceramic coating Melbourne" queries.

**Specific Fix:**

Create `app/sitemap.ts`:
```ts
import { createClient } from '@/lib/supabase/server';

export default async function sitemap() {
  const supabase = await createClient();
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
    { url: 'https://pristinedetailers.com.au/about', priority: 0.6 },
    { url: 'https://pristinedetailers.com.au/contact', priority: 0.5 },
    { url: 'https://pristinedetailers.com.au/booking', priority: 0.8 },
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
      // Explicitly allow AI citation bots
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

**Time to implement:** ~30 minutes. Highest-leverage fix available right now.

---

### Priority 2 — Homepage Still Has No Metadata and No Melbourne Signal in H1

**Page:** `/` (`app/page.tsx`, `components/pages/home.tsx`)

**Problem:**

This is last week's Priority 2 — still unresolved, escalated because the sitemap issue is now Priority 1. Every week this stays broken is a week the homepage competes for "mobile car detailing Melbourne" with no title tag advantage.

`app/page.tsx` (lines 1–7) is still `'use client'` with no metadata export:

```tsx
'use client';
import { Home } from '@/components/pages/home';
export default function Page() {
  return <Home />;
}
```

A `'use client'` page file cannot export `metadata`. This means the homepage title is permanently inherited from `app/layout.tsx`: *"Pristine Detailers — Melbourne's Premium Mobile Detailing"*. That's an acceptable title — but it's the same title Googlebot sees for the homepage, and it cannot be overridden per-page without converting the page route to a server component.

The H1 (`home.tsx`, line 82) is still: **"Where your car meets its best self."** No Melbourne. No mobile. No detailing. The hero paragraph (`home.tsx`, line 90) reads: *"Obsessive-grade detailing - from monthly maintenance details to elite paint protection services."* Also contains no Melbourne or suburb reference.

The homepage FAQ (lines 993–1044) answers exactly the questions Melbourne buyers type into Google: *"Do you come to my home or office?"*, *"How long does ceramic coating take?"*, *"Can I combine PPF and ceramic?"* — but is rendered client-side and has no FAQPage schema.

**Search queries this blocks:** "mobile car detailing Melbourne", "ceramic coating Melbourne", "car detailing come to you Melbourne", "mobile detailer Melbourne".

**Specific Fix:**

Step 1 — Convert `app/page.tsx` to a server component (remove `'use client'` from the page file; it stays in `components/pages/home.tsx`):

```tsx
// app/page.tsx — server component, no 'use client' directive
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

Step 2 — Update the H1 in `home.tsx` to carry keyword weight without killing the brand voice. Current line 82:
```
"Where your car meets its best self."
```
Suggested replacement:
```
"Melbourne's most obsessive mobile detailing."
```
Or, if brand line is protected, add a keyword-rich subtitle as a `<p>` before the CTA buttons: *"Professional ceramic coating, PPF, and full detailing — brought to your driveway across Melbourne."*

Step 3 — Add FAQPage JSON-LD via the page's `<head>` (inject in `app/page.tsx` using `next/head` or a `<script>` tag with `type="application/ld+json"`). The 4 existing FAQ questions (lines 993–998 of `home.tsx`) are perfect source material — they answer real buyer questions in concise, extractable form.

---

### Priority 3 — Four-Way Review Count Inconsistency Is Blocking Star Ratings in SERPs

**Pages:** Homepage hero (`home.tsx` line 69), homepage testimonials (`home.tsx` line 943), footer (`footer.tsx` line 54), `/about/reviews` metadata (`app/about/reviews/page.tsx`)

**Problem:**

The review count is reported as four different numbers across the site:
- Homepage hero badge: **"4.9 / 30 reviews"**
- Homepage testimonials heading: **"4.9 stars across 39 reviews"**
- Footer (appears on every page): **"★ 4.9 · 240 reviews"**
- `/about/reviews` metadata: **"4.9 stars across 240 verified customer reviews"**

The footer and the about/reviews page both say 240 — that's almost certainly the accurate current number. The homepage is showing figures that are 6–8x smaller than actual, which undermines social proof on the highest-traffic page.

This inconsistency was flagged last week as blocking AggregateRating schema implementation. It's still blocking it. Adding schema with a wrong review count creates a trust signal liability — Google may suppress rich results if on-page claims don't match schema data.

The practical consequence: the site cannot show star ratings in Google SERPs for "mobile car detailing Melbourne" without clean, consistent AggregateRating schema. Star ratings in SERPs typically increase CTR by 15–30%. For a business where every booking matters, that's significant.

**Specific Fix:**

Step 1 — Update `home.tsx` line 69:
```tsx
// Current:
★ 4.9 / 30 reviews
// Fix:
★ 4.9 / 240 reviews
```

Step 2 — Update `home.tsx` line 943:
```tsx
// Current:
"4.9 stars" across 39 reviews.
// Fix:
"4.9 stars" across 240 reviews.
```

Step 3 — Once review count is consistent (240), add `AggregateRating` to the `LocalBusiness` JSON-LD in `app/layout.tsx` (see Priority 3 schema fix from last week's brief). This unlocks star rich results site-wide for all commercial queries.

**Time to implement:** ~10 minutes for the copy fixes. Schema implementation follows after.

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "Paint Protection Film Price Guide Melbourne 2026: Full Front, Full Body, and What Affects the Cost"

**Target queries:** "PPF cost Melbourne", "paint protection film price Melbourne", "how much does PPF cost Australia", "full front PPF Melbourne"

**The gap:** The services page shows PPF prices ($2,900 partial, $4,200 full front, $7,900 full vehicle) in an accordion panel rendered via JavaScript tab. These prices are not indexed as readable content. No article explains what affects PPF cost, what each coverage level includes, or why Melbourne-specific driving (stone chips on Eastlink, gravel on the Mornington Peninsula, bitumen spray on the Calder Freeway) makes front-end PPF particularly relevant.

**Why this converts:** PPF is the highest-ticket single service ($2,900–$7,900). Buyers researching PPF are commercial-intent — they're comparing quotes and looking for justification for the spend. An article that explains the pricing rationale, includes a comparison table, and references Melbourne-specific use cases positions Pristine as the obvious expert choice before they call anyone.

**Format for AI citation:**
- Definition: "What is Paint Protection Film?" (40–60 words, self-contained)
- Pricing table: Partial front / Full front / Full vehicle — with what's included at each level
- "What affects the cost of PPF?" — listed factors (vehicle size, panel complexity, film brand, installation method)
- Melbourne-specific section: Eastlink stone chips, gravel roads Mornington Peninsula, summer heat
- "PPF vs ceramic coating: do I need both?" — direct comparison, links to `/services`

**Suggested title:** "Paint Protection Film Pricing in Melbourne: What Each Coverage Level Costs and Why"
**Category:** Paint Protection Film
**Pass to Jordan:** Yes — add to topic bank.

---

### Content Idea 2 — "How Long Does Mobile Car Detailing Take? A Service-by-Service Time Guide"

**Target queries:** "how long does car detailing take", "how long does ceramic coating take Melbourne", "how long does PPF installation take", "mobile detailing appointment length"

**The gap:** The homepage FAQ (`home.tsx`, line 995) answers: *"A full ceramic application (including paint correction) is typically 1 day worth of work."* That's one sentence. There's no content that breaks down appointment duration by service type — which is a question almost every first-time customer has before booking. No article on the site covers this.

**Why this captures Melbourne searchers:** Melbourne's ICP is time-poor (professionals, 28–55, managing school runs, client meetings, Bayside lifestyle). The mobile service model already addresses the "I don't have time to take my car to a shop" problem — but people still want to know: can I be home for this? Do I need to clear the garage? Will this take all day? An article that answers these questions by service is both useful and a pre-booking objection handler.

**Format for AI citation:**
- Table: Service name / Typical duration / What affects timing
  - Maintenance wash: 2–3 hours
  - Full interior detail: 3–4 hours
  - Paint correction (1-stage): 4–6 hours
  - Paint correction (2-stage): 6–8 hours
  - Ceramic coating: Full day (including correction)
  - PPF (partial front): 1 day
  - PPF (full vehicle): 2–3 days
- "What do I need to prepare?" — water and power access, clear space of two bays
- Melbourne-specific note: apartment dwellers in South Yarra/Richmond — building access, carpark logistics

**Suggested title:** "How Long Does Mobile Car Detailing Take? A Time Guide by Service for Melbourne Drivers"
**Category:** Detailing
**Pass to Jordan:** Yes — add to topic bank.

---

## AI Citation Readiness Score

**Score: 3.5 / 10** (up from 3.0 last week)

### Reasoning

| Signal | Status | Notes |
|--------|--------|-------|
| Server-side rendered content | Partial ↑ | `/blog` and `/blog/[slug]` now server-rendered with metadata. Homepage, services, membership still client-only |
| Structured data (schema) | None | No LocalBusiness, FAQPage, AggregateRating, Article, or Service schema anywhere |
| `llms.txt` | Missing | Not in `public/` or site root |
| `robots.txt` | Missing | No instructions to any crawler, AI or otherwise |
| `sitemap.xml` | Missing | Googlebot has no URL inventory; new blog articles may go unindexed |
| FAQ content | Present, partially accessible | Homepage FAQ is client-rendered (invisible to AI crawlers). Membership FAQs are also client-rendered |
| Concrete pricing facts | Partially accessible | `/blog` page is server-rendered but pricing lives in tab-hidden JS on `/services` |
| Author attribution on articles | Not surfaced | `author` field exists in DB, not rendered in `JournalArticle` component |
| Review count consistency | Broken | 30 / 39 / 240 / 240 — blocks schema implementation |
| AI bot access (robots.txt) | Unknown | No robots.txt means no explicit permission or denial for GPTBot, PerplexityBot, ClaudeBot |

### What Changed This Week (+0.5)

The `/blog` server component with `generateMetadata` on individual articles is real progress. AI crawlers fetching `/blog/ceramic-coating-vs-ppf` now get a populated `<title>` and `<meta name="description">` in the initial HTML — instead of an empty Next.js shell. Small improvement, but it's the first page on the site (besides `/journal/page.tsx` which now 301s) with article-level server-rendered metadata.

### Path to 7/10 in 4 Weeks

1. **Week 1 (now):** Add `robots.txt` and `sitemap.xml` via `app/robots.ts` and `app/sitemap.ts`. Fix review count discrepancy. Both are under 1 hour of work combined. Immediate crawl improvement.
2. **Week 2:** Convert `app/page.tsx` to server component, add homepage metadata. Add `LocalBusiness` + `FAQPage` JSON-LD. This moves the homepage from invisible to AI crawlers to citable.
3. **Week 3:** Fix services page — add metadata to `app/services/page.tsx`, convert tab-hidden content to CSS visibility pattern or server-rendered sections.
4. **Week 4:** Publish "Ceramic Coating vs Wax" and "PPF Pricing Guide" articles (comparison table format — ~33% AI citation share for this content type). Add `Article` schema to all blog posts.

---

## Quick-Win Topics for Jordan's Topic Bank

The following two topics should be added to the topic bank in `jordan-content-writer.md` immediately. Both have high AI citation potential due to their format (pricing table, time table) and answer queries Melbourne buyers search before booking:

1. **"Paint Protection Film pricing in Melbourne: what each coverage level costs and why"** — Commercial intent, pricing table format, fills the gap left by tab-hidden pricing on `/services`. Comparison table format has the highest AI citation rate (~33%). Add to Paint Protection Film category.

2. **"How long does mobile car detailing take? A service-by-service time guide for Melbourne drivers"** — Answers the #1 pre-booking question, structured table format, Melbourne-specific logistics angle (apartments, office carparks, suburban driveways). Add to Detailing category.

---

## Secondary Flags

- **Blog article title format lacks location signal.** `app/blog/[slug]/page.tsx` generates `${data.title} — Pristine Detailers`. Suggested pattern: `${data.title} | Melbourne | Pristine Detailers` — adds a consistent Melbourne signal to every article metadata title without rewriting the articles themselves. One-line change to `generateMetadata`.

- **Blog index page metadata is generic.** `app/blog/page.tsx` has `title: 'Blog — Pristine Detailers'`. Change to: `title: 'Car Detailing Blog Melbourne | Ceramic Coating & PPF Guides | Pristine Detailers'`. Adds the Melbourne keyword to the page Google indexes for "car detailing blog Melbourne".

- **Broken gallery link on homepage.** `home.tsx` line 890: the "View gallery" link still has `href="#"`. Should be `href="/gallery"`. Still unresolved from last week.

- **Membership page still has no metadata.** `app/membership/page.tsx` exports no metadata. Lowest-effort fix from last week's list: add `title: 'Car Detailing Membership Melbourne | From $79/mo | Pristine Detailers'` and a 155-character description. ~5 minutes of work.

- **`llms.txt` still missing.** A simple file at `public/llms.txt` summarising services, prices, and suburb coverage would take 20 minutes to write and gives AI agents (ChatGPT with Browse, Perplexity, Claude) a fast, structured overview of the business without needing to parse JavaScript-rendered pages.

---

*Next audit: 2026-05-31 | Carry-forward: sitemap + robots.txt (Priority 1 must be closed this week). Review count fix takes 10 minutes — no excuse for it being open next Monday.*
