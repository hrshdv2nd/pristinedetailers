# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-05-17  
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Executive Summary

Three structural problems are suppressing rankings and AI discoverability: missing page-level metadata on the two highest-commercial-intent pages (`/services` and `/membership`), JavaScript-tab-hidden service content that may not index, and zero structured data across the entire site. The homepage H1 contains no Melbourne or detailing keywords. AI citation readiness is critically low — most key pages are `'use client'` components, meaning LLM crawlers hitting raw HTML see a Next.js shell, not the content. Fixing these requires code changes, not just copy edits.

---

## Top 3 Priority Issues

---

### Priority 1 — Services Page: No Metadata + Tab-Hidden Content May Not Index

**Page:** `/services` (`components/pages/services.tsx`)

**Problem:**  
`app/services/page.tsx` exports no `metadata` object. The page title defaults to the root layout's global title ("Pristine Detailers — Melbourne's Premium Mobile Detailing") — the same title Google sees for every page on the site except `/journal`. Duplicate titles across pages is a direct ranking signal penalty.

Worse: the service detail copy — including the full ceramic coating description ("A nano-ceramic barrier bonded directly to your paintwork. Hydrophobic, UV-stable, and scratch-resistant...") and PPF copy — is rendered with `display: selected === service.id ? 'block' : 'none'`. Only the active tab (default: `vehicle-detailing`) is visible in the DOM on initial render. Google can render JavaScript but the risk is real that non-active tab content is deprioritised or skipped in crawl. If Googlebot renders this page and only indexes the Vehicle Detailing copy, the ceramic coating and PPF pages have zero indexed content — the two highest-value services.

**Search queries this blocks:** "ceramic coating Melbourne", "paint protection film Melbourne", "PPF installer Melbourne", "mobile ceramic coating Melbourne"

**Specific Fix:**

Step 1 — Add metadata to `app/services/page.tsx`:
```tsx
import type { Metadata } from 'next';
import { Services } from '@/components/pages/services';

export const metadata: Metadata = {
  title: 'Ceramic Coating, PPF & Mobile Detailing Services | Pristine Detailers Melbourne',
  description: 'Professional mobile ceramic coating from $750, paint protection film from $2,900, and full detailing across Melbourne. Certified technicians. Book online.',
};

export default function Page() {
  return <Services />;
}
```

Step 2 — Fix the tab content visibility. In `components/pages/services.tsx`, line 104, change:
```tsx
// Current (hides content from crawler):
style={{ display: selected === service.id ? 'block' : 'none' }}

// Fix (content stays in DOM, visible to crawler):
style={{ visibility: selected === service.id ? 'visible' : 'hidden', height: selected === service.id ? 'auto' : 0, overflow: 'hidden' }}
```

Or better: convert to individual server-rendered service sections (one H2 per service, all visible) and use anchor links for the tab UX — this also opens up ranking for individual service queries.

---

### Priority 2 — Homepage H1 and Page Metadata Have Zero Keyword Signal

**Page:** `/` (`components/pages/home.tsx`, `app/page.tsx`)

**Problem:**  
The homepage H1 is: *"Where your car meets its best self."*

This is good brand copy. It is useless for organic search. The query "mobile car detailing Melbourne" is the primary commercial intent query for this business, and it appears nowhere in the H1, the hero paragraph, or any heading on the page. The hero paragraph reads: *"Obsessive-grade detailing - from monthly maintenance details to elite paint protection services."* — no suburb, no "Melbourne", no "mobile".

The page is also `'use client'`, which means `app/page.tsx` cannot export a `metadata` object. The homepage inherits the root layout's global title and description by default, but cannot override them. This means the homepage has no unique title signal beyond what the root layout provides.

Additionally: the homepage FAQ section (lines 993–1044 of `home.tsx`) answers real buyer questions — "Do you come to my home or office?", "How long does ceramic coating take?", "Can I combine PPF and ceramic coating?", "What does the membership include?" — but has no `FAQPage` JSON-LD schema. Google cannot generate rich FAQ results from this.

**Search queries this blocks:** "mobile car detailing Melbourne", "car detailing Melbourne come to you", "ceramic coating how long does it take Melbourne"

**Specific Fix:**

Step 1 — Convert `app/page.tsx` to a server component by removing `'use client'` and lifting that directive into the component itself:
```tsx
// app/page.tsx — make this a server component
import type { Metadata } from 'next';
import { Home } from '@/components/pages/home';

export const metadata: Metadata = {
  title: 'Mobile Car Detailing Melbourne — Ceramic Coating & PPF | Pristine Detailers',
  description: 'Premium mobile car detailing in Melbourne. Ceramic coating from $750, PPF from $2,900, maintenance membership from $79/mo. We come to your driveway.',
};

export default function Page() {
  return <Home />;
}
```
(The `'use client'` directive stays in `components/pages/home.tsx` — it's a client component, that's fine. Only the page wrapper needs to be a server component to export metadata.)

Step 2 — Update the H1 in `home.tsx` line 82 to include a keyword signal without killing the brand voice:
```
// Current:
"Where your car meets its best self."

// Suggested:
"Melbourne's most obsessive mobile detailing."
```
Or keep the brand line and add a keyword-rich subtitle as a visible paragraph above the hero CTA.

Step 3 — Add `FAQPage` JSON-LD in `home.tsx` FAQSection (or in the page's server component via `<Script type="application/ld+json">`):
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do you come to my home or office?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — our mobile team brings all tools and equipment to your location. We need access to water, power, and a covered or open space roughly the size of two parking bays."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a ceramic coating application take?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A full ceramic application including paint correction is typically one full day of work."
      }
    },
    {
      "@type": "Question",
      "name": "Can I combine PPF and ceramic coating?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — PPF is applied first as a physical barrier, then ceramic coating on top for a hydrophobic finish and self-heal enhancement."
      }
    },
    {
      "@type": "Question",
      "name": "What does the Pristine Detailers membership include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "$79/month includes one monthly wash-and-seal detail, priority same-week booking, 10% off all services, and discounted rates for same household vehicles."
      }
    }
  ]
}
```

---

### Priority 3 — Zero Structured Data Across the Entire Site

**Pages:** All pages, primarily `/` and `/services`

**Problem:**  
The site has no JSON-LD structured data anywhere. Specifically missing:

- **`LocalBusiness` / `AutoDetailingBusiness` schema** — Google cannot confirm service area (Melbourne suburbs), business category, or aggregate rating from structured data. The homepage displays "4.9 stars across 39 reviews" visually, but no `AggregateRating` schema means this social proof generates no star rich results in SERP.
- **`Service` schema on `/services`** — Each service (ceramic coating, PPF, vehicle detailing) should have pricing structured data so Google and AI systems can extract "ceramic coating price Melbourne".
- **`FAQPage` schema** — Both the homepage (`/`) and membership page (`/membership`) have FAQ sections. Neither has schema.

Secondary flag: The homepage shows "4.9 / 30 reviews" in the hero badge but "4.9 stars across 39 reviews" in the testimonials section — inconsistent review counts undermine trust signals and create schema data ambiguity. Reconcile these before adding AggregateRating schema.

**Search queries this blocks:** Rich results for "car detailing Melbourne" (star ratings), "mobile detailer Melbourne" (local pack), FAQ rich results for detailing questions.

**Specific Fix:**  
Add a `LocalBusiness` JSON-LD block in `app/layout.tsx` inside `<head>` (after the GTM script):

```json
{
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "AutoDealer"],
  "name": "Pristine Detailers",
  "description": "Premium mobile car detailing in Melbourne — ceramic coating, paint protection film, and full detailing services brought to your driveway.",
  "url": "https://pristinedetailers.com.au",
  "telephone": "[INSERT PHONE]",
  "areaServed": [
    {"@type": "City", "name": "Melbourne"},
    {"@type": "Suburb", "name": "Toorak"},
    {"@type": "Suburb", "name": "Brighton"},
    {"@type": "Suburb", "name": "South Yarra"},
    {"@type": "Suburb", "name": "Hawthorn"},
    {"@type": "Suburb", "name": "Richmond"},
    {"@type": "Suburb", "name": "Berwick"},
    {"@type": "Suburb", "name": "Clyde North"},
    {"@type": "Suburb", "name": "Mornington Peninsula"}
  ],
  "priceRange": "$$",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "39"
  },
  "serviceType": ["Ceramic Coating", "Paint Protection Film", "Mobile Car Detailing", "Paint Correction", "Interior Detailing"]
}
```

Fix the review count discrepancy first (hero badge says 30, testimonials say 39 — update the hero badge to match, or confirm the actual number before implementing schema).

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "Paint Correction Cost in Melbourne: What to Expect for Each Stage (2026)"

**Target query:** "paint correction cost Melbourne" / "paint correction price Melbourne" / "how much does paint correction cost"

**The gap:** The services page mentions paint correction as part of the Revitalise Package ($300) but there is no standalone content targeting paint correction as a search term. "Paint correction" is a high commercial-intent query from Melbourne car owners with swirls, scratches, or oxidised paint. The services page buries it inside a package — there's no article explaining what paint correction is, when you need it, what stages cost, and why you should do it before ceramic coating.

**Why this converts:** Every customer who books ceramic coating needs paint correction first. This article answers the question they Google before booking, positions Pristine as the expert, and creates a natural internal link from the journal to `/services`.

**Format for AI citation:** 
- Definition block: "What is paint correction?" (40–60 words, self-contained)
- Pricing table: Stage 1 ($X) vs Stage 2 ($X) vs Stage 3 ($X) — concrete numbers AI can extract
- "Do I need paint correction before ceramic coating?" — direct answer, citable
- Melbourne-specific note: hail, Eastlink stone chips, car park scratches — why correction demand is high here

**Suggested title:** "Paint Correction in Melbourne: What Each Stage Costs and When You Need It"  
**Category:** Detailing  
**Pass to Jordan:** Yes — add to topic bank.

---

### Content Idea 2 — "Ceramic Coating vs Car Wax: Which Is Worth It for Melbourne Weather?"

**Target query:** "ceramic coating vs wax Melbourne" / "is ceramic coating worth it Melbourne" / "how long does ceramic coating last Melbourne"

**The gap:** "PPF vs ceramic coating" is already in the journal topic bank (Jordan's list). The higher-volume, lower-awareness query is the comparison between ceramic coating and wax — this is the question first-time buyers Google before they've decided on protection level. This is the top-of-funnel entry point. No page on the site currently answers it.

**Why this captures Melbourne searchers:** Melbourne's UV index (which can hit 11+ on summer days), bay salt air in Bayside suburbs, and summer heat cycles actively degrade wax faster than in cooler cities. A Melbourne-specific comparison ("A carnauba wax lasts 8–12 weeks in Melbourne summer, versus 3–5 years for a quality ceramic coating") is locally differentiated, citable, and defensible.

**Format for AI citation:**
- Comparison table: Wax vs Ceramic Coating across Duration / UV protection / Hydrophobic / Cost / Self-cleaning — the #1 AI-cited format (~33% citation share)
- Melbourne context: heat, UV, bird droppings (Moreton Bay figs, Toorak), salt air in Brighton
- Decision guide: "When wax makes sense / when ceramic makes sense" — structured, extractable
- CTA: link to `/services` ceramic coating section

**Suggested title:** "Ceramic Coating vs Wax for Melbourne Weather: The Honest Comparison"  
**Category:** Ceramic Coating  
**Pass to Jordan:** Yes — add to topic bank.

---

## AI Citation Readiness Score

**Score: 3 / 10**

**Reasoning:**

| Signal | Status | Notes |
|--------|--------|-------|
| Server-side rendered content | Partial | `/journal` only — homepage, services, membership are `'use client'`, raw HTML is a Next.js shell |
| Structured data (schema) | None | No LocalBusiness, Service, FAQ, Review, or Article schema anywhere on site |
| `llms.txt` | Missing | Not found in site root or `public/` |
| `/pricing.md` | Missing | Pricing exists on the services page but only in JS-rendered HTML, not in a parseable file |
| FAQ content | Present but unindexable | 4 FAQs on homepage, 10 on membership — no FAQPage schema |
| Concrete facts & specs | Partial | 2.4µm coating thickness, 5yr warranty, $750 ceramic, $2,900 PPF partial — good, but buried in client-rendered components |
| Author attribution on articles | Not confirmed | `author` field exists in DB schema, not surfaced in article UI |
| Content freshness signals | Missing | No "last updated" dates on any page |
| AI bot access (robots.txt) | Not checked | Verify GPTBot, ClaudeBot, PerplexityBot are not blocked |
| Third-party citations | Unknown | Not assessed — Google Business Profile, Reddit, local car forums |

**The single biggest problem:** The homepage, services page, and membership page are all `'use client'` Next.js components. Any AI crawler (Perplexity, Claude with Brave Search, GPTBot) fetching raw HTML gets a `<div id="__NEXT_DATA__">` shell and a blank `<body>`. The content — including pricing, FAQ answers, suburb list, and service descriptions — simply doesn't exist in the initial HTML response.

**Path to a 6/10 in 4 weeks:**
1. Convert page route files to server components and export metadata (fixes crawler issue, doesn't change client component behavior)
2. Add LocalBusiness + FAQPage schema to homepage
3. Add `llms.txt` to site root summarising services, pricing, and service area
4. Publish "Ceramic Coating vs Wax" comparison article (structured table content is highest AI citation format)

---

## Quick-Win Topics for Jordan's Topic Bank

The following should be added to the topic bank in `jordan-content-writer.md` — listed in priority order by keyword gap and AI citation potential:

1. **"Paint correction in Melbourne: what each stage costs and when you need it"** — Fills high-intent gap, supports every ceramic coating sale, comparison table format for AI citation. Add to Detailing category.

2. **"Ceramic coating vs car wax: the honest comparison for Melbourne weather"** — Comparison table format (highest AI citation rate), top-of-funnel, Melbourne-specific UV/heat angle. Add to Ceramic Coating category.

3. **"Mobile car detailing in Toorak, Brighton & South Yarra: what to expect"** — Suburb-specific content targeting high-ICP areas with real search volume. Mention Moreton Bay figs (bird droppings), salt air, car park exposure. Add to Melbourne category.

---

## Secondary Flags (Lower Priority)

- **Broken internal link on homepage:** The "View gallery" link in GallerySection (line 890 of `home.tsx`) has `href="#"` — it leads nowhere. Should link to `/gallery`.
- **Journal article route duplication:** Journal component links to `/blog/${slug}` but `app/journal/[slug]/page.tsx` also exists as a separate route. Both appear to serve article content via the same Supabase query. Confirm which is canonical and 301 redirect or remove the unused route to prevent duplicate content.
- **Membership page metadata:** `app/membership/page.tsx` has no metadata export. Add: `title: 'Monthly Car Detailing Membership Melbourne | Pristine Detailers'`, `description: 'From $79/month — mobile car detailing membership with priority booking, ceramic maintenance, and exclusive member pricing across Melbourne.'`

---

*Next audit: 2026-05-24 | Priority: implement Priority 1 and Priority 2 server component metadata fixes before then.*
