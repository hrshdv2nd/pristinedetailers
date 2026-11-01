# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-11-01
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Status: Week 18+ — No Fixes Shipped. New Critical URL Error Found in Oct 18 Sitemap Fix.

**Last report:** 2026-10-18. Zero fixes from the Oct 18 priority list have shipped. The site enters November — the start of Melbourne's peak UV season — at 3.5/10 AI citation readiness with no sitemap, no robots.txt, no llms.txt, a live `[SHOP ADDRESS]` placeholder on the homepage, conflicting PPF prices, and no crawler-readable review content.

**New finding this week:** The sitemap fix provided in the Oct 18 report contains a critical URL path error. It maps articles to `/journal/${slug}` but every article on the site lives at `/blog/[slug]`. Implementing the Oct 18 sitemap as written would submit 404 URLs to Google for every published journal article. The corrected version is in Priority 1 below.

| Item | Status |
|------|--------|
| `app/sitemap.ts` | ❌ Missing — **Week 18** |
| `app/robots.ts` | ❌ Missing — **Week 18** |
| `public/llms.txt` | ❌ Missing — **Week 18** |
| Oct 18 sitemap fix — URL path error | ❌ NEW: maps to `/journal/` but articles are at `/blog/` |
| `/journal` and `/blog` — dual index with no canonical | ❌ NEW: duplicate content signal |
| `[SHOP ADDRESS]` placeholder — homepage FAQ | ❌ Still live — **Week 12** |
| Homepage PPF price (`$2,900`) | ❌ Wrong ×2 locations — **Week 12** |
| Services tab-hidden pricing | ❌ Still hidden — **Week 18** |
| LocalBusiness + AggregateRating schema | ❌ Missing — **Week 18** |
| FAQPage JSON-LD | ❌ Missing — **Week 18** |
| Open Graph / Twitter Card tags | ❌ Missing — **Week 18** |
| GHL review widget — no static fallback | ❌ E-E-A-T regression — **Week 9** |
| Summer car care article (Jordan) | ❌ Due Oct 25 — **1 week late** |
| Graphene coating article (Jordan) | ❌ Priority since Oct 18 — not published |

---

## Top 3 Priority Issues

---

### Priority 1 — CRITICAL (Week 18 + NEW URL ERROR): Sitemap/robots/llms.txt still missing — and the Oct 18 sitemap fix maps to the wrong URLs

**Pages affected:** Site-wide. Every published journal article.

**Problem:**

Eighteen weeks without a sitemap. The site is now in the highest-traffic period of the year for Melbourne car protection queries. October and November are peak indexation months for "ceramic coating Melbourne", "PPF Melbourne", and "graphene coating Melbourne" — articles indexed this month rank for the entire November–February summer season.

**New finding this week:** The `app/sitemap.ts` fix in the Oct 18 report maps article URLs to `/journal/${post.slug}`. But every article on the site lives at `app/blog/[slug]/page.tsx` — that is, at `/blog/${post.slug}`. The `/journal/page.tsx` index links to `/blog/${slug}` paths. The `/blog/[slug]/page.tsx` is where individual articles render. If the Oct 18 sitemap were deployed unmodified, Google would receive a sitemap full of 404 URLs for every article Jordan has published. The correct path is `/blog/${post.slug}`.

**Correct `app/sitemap.ts`** (replaces the Oct 18 version — note `/blog/` not `/journal/`):

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
    { url: 'https://pristinedetailers.com.au/blog', priority: 0.8 },
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

**`app/robots.ts`** (unchanged from Oct 18 — still correct):

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

**`public/llms.txt`** (unchanged from Oct 18 — still correct, deploy as-is):

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
Technical guides on ceramic coating, PPF, graphene, and Melbourne car care: https://pristinedetailers.com.au/blog
```

After deploying: submit `https://pristinedetailers.com.au/sitemap.xml` to Google Search Console immediately.

**Time to implement:** 60–90 minutes (including correcting the URL path from `/journal/` to `/blog/`).

---

### Priority 2 — CRITICAL (Week 12): `[SHOP ADDRESS]` placeholder live on homepage + PPF price still wrong

**Page:** `/` (`components/pages/home.tsx`)

**Problem:** Unchanged from Oct 18. Three factual errors on the homepage remain live in the exact fields AI systems extract when answering queries about Pristine Detailers.

| Location | Current copy | What AI extracts | Correct fix |
|----------|-------------|-----------------|-------------|
| `home.tsx:817` — FAQ "Do you come to my home?" | `...completed at our studio - [SHOP ADDRESS]` | Returns `[SHOP ADDRESS]` literally | Remove — replace with specific copy below |
| `home.tsx:253` — Services card, PPF | `from: '$2,900'` | PPF in Melbourne costs $2,900 | `from: '$3,000'` |
| `home.tsx:680` — PPF section, Partial Front | `price: '$2,900'` | PPF partial front is $2,900 | `price: '$3,000'` |

**Specific fixes** (all in `components/pages/home.tsx`):

**Line 817** — Replace FAQ answer:
```tsx
{ q: 'Do you come to my home or office?', a: 'Ceramic coating, graphene coating, and PPF are completed at our dedicated Melbourne studio — studio-based work is essential for the quality we guarantee. Window tinting is the exception: our mobile team installs it at your home, office, or apartment car park across 60+ suburbs.' },
```

**Line 253** — Change `from: '$2,900'` → `from: '$3,000'`

**Line 680** — Change `price: '$2,900'` → `price: '$3,000'`

**Time to implement:** 10 minutes.

---

### Priority 3 — HIGH (NEW THIS WEEK): Dual blog index — `/journal` and `/blog` both exist with no canonical relationship

**Pages:** `app/journal/page.tsx` and `app/blog/page.tsx`

**Problem:**

The site has two publicly accessible pages that render the same `Journal` component with the same article listing:
- `/journal` (renders `Journal`, title: "Journal - Pristine Detailers")
- `/blog` (renders `Journal`, title: "Blog - Pristine Detailers")

Individual articles live at `/blog/[slug]`. The `journal.tsx` component links to `/blog/${slug}` for every article card. The footer links to `/blog`. The article back-button says "Back to Blog" and links to `/blog`. This means `/journal` is a dead-end index page: it lists articles, but every link from it leads out to `/blog/` paths.

From Google's perspective: two pages with identical content and different `<title>` tags. No canonical tag on either. No 301 redirect. Link equity from any external sites linking to `/journal` is stranded and doesn't flow to `/blog`, which is the canonical URL for this content.

**Specific fix:**

Convert `app/journal/page.tsx` to a redirect:

```ts
// app/journal/page.tsx
import { redirect } from 'next/navigation';

export default function Page() {
  redirect('/blog');
}
```

This is the same pattern as the current `app/membership/page.tsx` (which redirects to `/services`). One line change. All SEO equity from the `/journal` path consolidates to `/blog`.

After deploying: verify `/journal` 301 redirects to `/blog` via `curl -I https://pristinedetailers.com.au/journal`.

**Time to implement:** 5 minutes.

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "PPF vs ceramic coating Melbourne: which wins in summer heat, UV, and bird drops?"

**Target queries:** "PPF vs ceramic coating Melbourne", "paint protection film vs ceramic coating Melbourne", "should I get PPF or ceramic coating Melbourne", "PPF vs ceramic difference", "best paint protection Melbourne"

**The gap:**

The "PPF vs ceramic coating" article has been in Jordan's topic bank since May, but with a lower priority. November moves this topic to urgent. This is the single most common pre-purchase question among Pristine's ICP: the new car owner who's heard of both PPF and ceramic but doesn't know which to book. The services page has no comparison content. There is no journal article addressing this directly.

November timing matters: Melbourne summer starts in earnest this month. The twin threats — UV fading (ceramic/graphene's domain) and stone chips from freeway trips to the Peninsula (PPF's domain) — are both live simultaneously in November. The article has a natural "why both" conclusion that maps to Pristine's highest-ticket combined packages.

**Format spec for Jordan:**

- **Opening 50-word block (AI extraction target):** "PPF (paint protection film) is a physical barrier that stops stone chips, road debris, and car park impacts. Ceramic coating is a chemical bond that repels water, UV, and bird drops. They solve different problems — which is why most Pristine customers in Melbourne's inner east and bayside suburbs use both: PPF on high-impact zones, ceramic coating on top."
- **Side-by-side table:** PPF vs Ceramic Coating — What it protects against / Visibility / Self-healing / Price (Melbourne) / Lifespan / Best for
- **Melbourne summer angle:** Eastern Freeway/Eastlink stone chip risk for PPF; Bayside UV and Toorak bird drops for ceramic
- **Why combining them is the right answer for most buyers:** PPF first (physical), ceramic on top (chemical) — explain the stack
- **When PPF alone is right:** weekend/track car that's garaged and rarely washed
- **When ceramic alone is right:** daily driver in a covered car park with low freeway exposure
- **Pricing section:** PPF from $3,000 (partial front) / Ceramic from $750 / Graphene from $999 / Combined package options
- **FAQ:** "Does ceramic coating stick to PPF?", "Can I apply ceramic on top of PPF?", "Which is more expensive, PPF or ceramic coating in Melbourne?", "Does PPF prevent bird drop damage?"
- **Internal links:** `/services`, `/booking`
- **Category:** Paint Protection Film
- **Pass to Jordan:** Yes — add to topic bank, November priority

---

### Content Idea 2 — "Melbourne car paint in November: the summer protection guide for 2026"

**Target queries:** "car paint protection Melbourne November", "summer car care Melbourne", "UV car paint damage Melbourne", "how to protect car paint Melbourne summer 2026", "ceramic coating Melbourne summer"

**The gap:**

The summer car care article added to Jordan's bank on Oct 18 (with a "publish by October 25" note) is now one week overdue. It has not been published. The framing still works and the urgency has increased: November is when Port Phillip Bay UV intensity reaches its seasonal peak, and November bookings at Pristine typically fill 4–6 weeks out — a November article captures December and January searchers in the critical booking window.

The update for this week: reframe the article from "why you should have done this in October" to "what to do right now in November" — the threat is live, not preventative. The bird drop acidic baking angle (pH 3–4 accelerates on a 30°C+ surface) is the hook: Melbourne will hit 30°C multiple times this month.

**Format spec for Jordan (update from Oct 18 — same article, updated November framing):**

- **Opening 50-word block (AI extraction target):** "Melbourne's November UV — particularly for bayside suburbs like Brighton, Sandringham, and Mordialloc — is among the most damaging in Australia. If you haven't coated your car before the first 30°C day, bird droppings can etch permanently into unprotected clear coat in under 10 minutes. November is still within the protective coating window, but bookings for December slots are filling now."
- **November threat table:** UV intensity / Bird drop acidity / Salt air (Bayside) / Heat on dark paint — suburb-specific risk level (Toorak / Brighton / Richmond / CBD car parks)
- **Summer maintenance schedule by coating type:** ceramic → graphene → PPF → unprotected — what to do now in November
- **Bird drop urgency explainer:** pH 3–4 acid bakes into clear coat within 10 minutes on 30°C+ surface — specific to Melbourne summer
- **Booking urgency:** December slots at Pristine fill 4–6 weeks out — book now for pre-Christmas protection
- **CTA:** Ceramic or graphene coating booking; Essential membership for monthly wash cadence
- **Category:** Ceramic Coating
- **Pass to Jordan:** Yes — publish this week. Peak window is open now through December.

---

## AI Citation Readiness Score

**Score: 3.5 / 10** — Static since July 12. No change.

### Reasoning

Every infrastructure item required for AI citation eligibility remains missing. The score has not moved in 18 weeks because no fixes have shipped.

| Signal | Status | Duration |
|--------|--------|---------|
| robots.txt with explicit AI bot permissions | ❌ Missing | Week 18 |
| sitemap.xml | ❌ Missing | Week 18 |
| llms.txt | ❌ Missing | Week 18 |
| `[SHOP ADDRESS]` in homepage FAQ | ❌ Live | Week 12 |
| Homepage PPF price conflict ($2,900 vs $3,000) | ❌ Homepage wrong | Week 12 |
| GHL widget — no static testimonial fallback | ❌ E-E-A-T gap | Week 9 |
| LocalBusiness schema | ❌ Missing | Week 18 |
| AggregateRating schema | ❌ Missing | Week 18 |
| FAQPage JSON-LD | ❌ Missing | Week 18 |
| Open Graph tags | ❌ Missing | Week 18 |
| Services pricing — crawler-readable | ❌ Tab-hidden (`display: none`) | Week 18 |
| /about/reviews — crawler-readable content | ❌ JS widget only | Week 9 |
| Dual blog index — no canonical | ❌ NEW | Week 1 |
| Summer/seasonal content | ❌ Not published | Overdue since Oct 25 |
| Graphene coating article | ❌ Not published | Priority since Oct 18 |
| PPF vs ceramic article | ❌ Not published | In bank since May |

### Score path from 3.5 to 6.0+

| Fix | Score impact | Effort |
|-----|------------|--------|
| `robots.ts` + `sitemap.ts` (corrected URLs) + `llms.txt` | +1.2 | 90 min |
| Restore static testimonials + AggregateRating schema | +0.7 | 45 min |
| Fix `[SHOP ADDRESS]` + homepage PPF price | +0.3 | 10 min |
| FAQPage JSON-LD on homepage | +0.3 | 20 min |
| `/journal` → `/blog` redirect | +0.1 | 5 min |
| Graphene coating article (Jordan) | +0.3 | Jordan's task |
| Summer Melbourne article (Jordan) | +0.2 | Jordan's task |
| PPF vs ceramic article (Jordan) | +0.2 | Jordan's task |

**Combined dev effort for the first 5 items: ~3 hours. Score outcome: 6.6/10.**

At 6.0+, Pristine becomes citable by Perplexity and ChatGPT for "ceramic coating Melbourne" and "graphene coating Melbourne" during November and December — the highest-traffic months of the year for this category.

---

## Quick-Win Topics for Jordan's Topic Bank

**Add to topic bank in `jordan-content-writer.md` (insert at top of the existing list, above the graphene entry from Oct 18):**

**1. "PPF vs ceramic coating Melbourne: which wins in summer heat, UV, and bird drops?"** *(NEW — November urgency. "PPF vs ceramic coating Melbourne" is the most common pre-purchase question for Pristine's ICP and has zero site coverage. Side-by-side table format (what it protects against / visibility / self-healing / price / lifespan / Melbourne summer performance). Natural "why both" conclusion: PPF on high-impact zones, ceramic on top. Melbourne-specific: Eastern Freeway/Eastlink stone chip risk for PPF, Bayside UV and Toorak bird drops for ceramic. Full format spec above. Paint Protection Film category. Publish this week.)*

**2. Melbourne car paint in November: the summer protection guide for 2026** *(OVERDUE from Oct 25. Same format spec as Oct 18 with November framing update — see above. Opening 50-word block updated for November timing. Publish immediately — December booking urgency CTA. Ceramic Coating category.)*

---

## Carry-Forward Flags (unchanged from Oct 18)

- **Homepage title** (`app/page.tsx`): "Pristine Detailer | Melbourne's Paint Protection Specialists" → "Ceramic Coating & PPF Melbourne | Pristine Detailers". Note: "Detailer" (singular) also doesn't match the brand name "Pristine Detailers" (plural). 2 minutes.
- **Services page title** (`app/services/page.tsx`): "Services - Pristine Detailers" → "Ceramic Coating, Graphene & PPF Melbourne | Pristine Detailers". 2 minutes.
- **Blog page title** (`app/blog/page.tsx`): "Blog - Pristine Detailers" → "Melbourne Car Paint Protection: Expert Guides | Pristine Detailers". 2 minutes.
- **Gallery link** (`home.tsx` gallery section, `line 792`): `href="#"` → `href="/gallery"`. 2 minutes.
- **Open Graph tags** (`app/layout.tsx`): Add `openGraph` and `twitter` metadata to the Next.js metadata export. Every WhatsApp share and social post is a blank card. 20 minutes.
- **Footer ABN placeholder**: "ABN 00 000 000 000" is not a real ABN. Confirm and update. AI systems and schema validators read this field. If the real ABN is available, update it — a real ABN is a trust signal for LocalBusiness schema.
- **Services tab-hidden pricing** (`services.tsx:184`): `display: selected === service.id ? 'block' : 'none'` hides all service pricing from crawlers. Week 18. Graphene, leather ceramic, glass, wheel, and window tinting pricing are entirely invisible to Google and AI crawlers.
- **Window tinting article (Jordan)**: Window tinting service launched July 6 — 17 weeks with no content support. "Mobile window tinting Melbourne" is a live commercial query.
- **Membership pricing page**: `/membership` redirects to `/services`. AI systems answering "Pristine Detailers membership pricing" find nothing.

---

*Next audit: 2026-11-08*

**ESCALATE — Harshad:** November is the single highest-traffic month of the year for Melbourne car protection queries. The sitemap, robots, and llms.txt take 90 minutes and have been ready since July — the only new action is correcting the URL path from `/journal/` to `/blog/` in the sitemap. The `/journal` → `/blog` redirect is a 5-minute, one-line fix. The `[SHOP ADDRESS]` placeholder and PPF price conflicts are a combined 10 minutes. These 4 items add up to 2 hours and take the AI citation score from 3.5 to 5.4 — enough for Pristine to begin appearing in Perplexity and ChatGPT answers for "ceramic coating Melbourne" during peak season. Every week they don't ship is a week Pristine is invisible in AI search during November and December.*
