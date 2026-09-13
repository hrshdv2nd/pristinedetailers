# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-09-13
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Status: New Title Regression + Spring Window Closes — Sitemap/Robots/llms.txt at Week 11

**What changed since Aug 30:**

| Item | Status |
|------|--------|
| Title tag: "Pristine Detailer" (singular) — Sep 9 commit 66c4407 | 🔴 **New regression** — brand name typo live in production |
| Title tag keyword regression: "Paint Protection Specialists" | 🔴 **New regression** — "Ceramic Coating", "PPF" removed from title |
| Ceramic price restructuring: $999 → $750 (Ceramic), $1,299 → $999 (Graphene) | 🟡 Services page updated; homepage PPF card still wrong |
| Blog article `/blog/is-ceramic-coating-worth-it-melbourne` | 🔴 **Price mismatch** — likely references old $999 ceramic pricing |
| GHL review widget replaces static testimonials | 🔴 **Week 3** of regression — no static testimonials on homepage |
| `[SHOP ADDRESS]` placeholder in homepage FAQ | 🔴 **Still live — Week 11** |
| Homepage PPF card price (`$2,900`) | 🔴 **Still wrong — Week 11** — should be $3,000 |
| `app/sitemap.ts` | ❌ Missing — **WEEK 11** |
| `app/robots.ts` | ❌ Missing — **WEEK 11** |
| `public/llms.txt` | ❌ Missing — **WEEK 11** |
| Spring car care article (Jordan) | 🔴 **Window CLOSED** — Sep 14 deadline has passed; Oct peak will be missed |
| Open Graph / Twitter Card tags | ❌ Completely absent — **WEEK 11** |
| Services tab-hidden pricing (`display:none`) | ❌ All 5 panels hidden — **WEEK 11** |
| Gallery link `href="#"` | ❌ Still broken |
| FAQPage JSON-LD | ❌ Missing |
| LocalBusiness + AggregateRating schema | ❌ Missing |

---

## Top 3 Priority Issues

---

### Priority 1 — NEW REGRESSION: Title tag typo + keyword removal (Sep 9, commit 66c4407)

**Page:** `/` and site-wide default (`app/page.tsx`, `app/layout.tsx`)

**Problem:**

The Sep 9 "ceramic update" commit changed the title tag from:

> "Pristine Detailers - Melbourne's Premium Ceramic Coating & PPF"

to:

> "Pristine Detailer | Melbourne's Paint Protection Specialists"

Two separate regressions in one commit:

**1. Brand name typo:** "Pristine Detailer" (singular) is not the business name. Google and AI systems are now indexing the wrong brand name. If a Melbourne driver searches "Pristine Detailers" (as they would type it), the indexed brand identity no longer matches the query exactly. This creates a brand recognition gap between the site's title and every off-site mention of "Pristine Detailers".

**2. Keyword removal:** "Ceramic Coating" and "PPF" are the top-volume commercial queries that drive bookings for this business. The previous title included both. The replacement phrase "Paint Protection Specialists" is a generic service descriptor with low independent search volume — Melbourne car owners type "ceramic coating Melbourne" and "PPF Melbourne", not "paint protection specialists Melbourne".

Per the AI SEO skill's authority signals: title tags are among the most-weighted signals for query-keyword alignment in both Google rankings and AI citation extraction. Perplexity and ChatGPT use page titles to identify content relevance before deciding whether to cite a page. A title without "ceramic coating" makes the homepage less citable for the primary commercial query.

The homepage page-level metadata (`app/page.tsx`) uses the same wrong title. The layout-level fallback (`app/layout.tsx`) also has it. Both files need fixing together.

**Specific fix** — update both files:

**`app/page.tsx`:**
```tsx
export const metadata: Metadata = {
  title: "Pristine Detailers | Ceramic Coating, Graphene Coating & PPF Melbourne",
  description: "Melbourne's premium ceramic coating, graphene coating, and paint protection film studio, plus mobile window tinting. Certified technicians. Serving 60+ suburbs.",
};
```

**`app/layout.tsx`:**
```tsx
export const metadata: Metadata = {
  title: "Pristine Detailers | Ceramic Coating, Graphene Coating & PPF Melbourne",
  description: "Obsessive-grade ceramic coating, graphene coating, and paint protection film in Melbourne. Certified studio. Mobile window tinting at your driveway.",
};
```

Also fix services page (`app/services/page.tsx`) and journal (`app/journal/page.tsx`) while you're in the metadata:
- Services: `"Car Detailing Services Melbourne | Ceramic Coating, Graphene, PPF & Window Tinting | Pristine Detailers"`
- Journal: `"Car Detailing Journal Melbourne | Ceramic Coating & PPF Guides | Pristine Detailers"`

**Time to implement:** 10 minutes. Four metadata objects.

---

### Priority 2 — PRICE MISMATCH: Blog article references old $999 ceramic pricing after Sep 9 price restructure

**Page:** `/blog/is-ceramic-coating-worth-it-melbourne`

**Problem:**

The Sep 9 commit `f6e0865` changed ceramic coating pricing from $999 to $750 (and graphene from $1,299 to $999). The services page (`services.tsx`) and product marketing context were updated to reflect $750 ceramic / $999 graphene. However:

1. **The existing blog article** (`/blog/is-ceramic-coating-worth-it-melbourne`) was written when ceramic was $999. If it mentions "$999" anywhere in its body, AI systems extracting pricing data from the site now receive conflicting signals: the services page says $750, the blog says $999, the homepage PPF card still says $2,900 instead of $3,000.

2. **Homepage PPF card still $2,900** (`components/pages/home.tsx` line 253: `from: '$2,900'`). This was a Week 4 issue. After the Sep 9 commit touched `home.tsx` and restructured service cards, the $2,900 PPF price was retained unchanged. Services page says $3,000. The price conflict is now Week 11.

AI systems querying "how much does ceramic coating cost in Melbourne" will extract multiple prices from multiple pages and surface the cheapest one (often the most recent content or the most authoritative-looking one). If the blog article says $999 while the services page says $750, AI citation tools will flag this as contradictory data. Pricing conflicts are the single most reliable way to get excluded from AI comparison answers.

**Specific fixes:**

**Step 1** — Check and update the blog article pricing:
```
Search /blog/is-ceramic-coating-worth-it-melbourne content for "$999" and update to "$750"
```
Jordan should also check whether any other published journal articles reference $999 ceramic or $1,299 graphene — both prices changed Sep 9 and any published content referencing them is now producing incorrect AI extractions.

**Step 2** — Fix PPF price on homepage (`components/pages/home.tsx` line 253):
```tsx
{ tag: '02', title: 'Paint Protection Film', blurb: 'Self-healing polyurethane film for stone chips and swirl defence.', from: '$3,000', ... }
```

**Step 3** — Fix `[SHOP ADDRESS]` in homepage FAQ (`home.tsx` line 817):
```tsx
{ q: 'Do you come to my home or office?', a: 'Ceramic coating, graphene coating, and PPF installs are completed at our studio in Melbourne. Window tinting is the one service our mobile team installs at your home or office — we need access to a tap and a 240V power point within 15 metres, plus two parking-bay widths of space.' },
```

**Time to implement:** 20 minutes total (blog article check + two line edits in home.tsx).

---

### Priority 3 — CRITICAL (Week 11, Final Escalation): sitemap.ts, robots.ts, llms.txt — ship this week

**Page:** Site-wide (`app/`)

**Problem:**

Eleven consecutive weeks. Every week since July 12, this brief has contained copy-paste-ready code for all three files. Not one has shipped.

This week brings a new compounding consequence: the Sep 9 price restructuring means the site now has a new pricing story that no AI system can extract accurately or consistently. The pricing is in JSX component files, hidden behind tab interaction (`display: none` on 5 service panels), inconsistent between pages, and there is no `llms.txt` providing a structured pricing reference. If an AI agent in Melbourne searches for "ceramic coating Melbourne pricing", here is what it finds:

- Homepage card: $750 (correct after Sep 9 update)
- Services page: $750 ceramic / $999 graphene (correct, but tab-hidden)
- Blog article: likely $999 ceramic (stale, if not updated per Priority 2 above)
- PPF: $2,900 on homepage, $3,000 on services page (conflicting)
- No `llms.txt` to anchor the correct pricing in one readable file

The result: AI systems cannot cite Pristine's pricing confidently. Perplexity will surface a competitor with consistent, readable pricing instead.

Additionally: there are now at minimum 6 pages with no sitemap entry — `/about`, `/about/reviews`, `/about/careers`, `/about/refer-a-mate`, plus any journal articles published since the sitemap was supposed to ship. Every day without a sitemap is another day Google must find these by crawl, which for newly-launched pages takes 8–12 weeks.

**Specific fix** — all three files reproduced:

**`app/robots.ts`** (10 minutes):
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

**`app/sitemap.ts`** (30 minutes):
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
    { url: 'https://pristinedetailers.com.au/about', priority: 0.6 },
    { url: 'https://pristinedetailers.com.au/about/reviews', priority: 0.7 },
    { url: 'https://pristinedetailers.com.au/contact', priority: 0.5 },
  ].map(p => ({ ...p, changeFrequency: 'monthly' as const }));

  return [...staticPages, ...articles];
}
```

**`public/llms.txt`** (20 minutes) — updated with Sep 9 pricing:
```
# Pristine Detailers — Melbourne Ceramic Coating, Graphene Coating & PPF

## About
Pristine Detailers is a studio-based ceramic coating, graphene coating, and paint protection film specialist in Melbourne, Australia. Mobile window tinting is also available at the customer's home, office, or car park. Certified technicians trained by Ceramic Pro and Gtechniq. 6 years operating. 4.9-star average across 39+ reviews. 2,400+ cars protected.

## Services and Pricing (excl. GST)
- Ceramic Coating: from $750 — nano-ceramic barrier bonded to paintwork; hydrophobic, UV-stable, scratch-resistant; manufacturer warranty up to 8 years; applied by certified technicians
- Graphene Coating: from $999 — graphene-infused coating with denser molecular bonding than ceramic; superior heat dissipation and scratch resistance; manufacturer warranty up to 9 years
- Paint Protection Film (PPF): from $3,000 (partial front) to $7,900 (full vehicle) — self-healing polyurethane film; stops stone chips and road debris
- Leather Ceramic Coating: $250 add-on — ceramic-based sealant for leather seats and trim
- Glass Coating: $150 add-on — hydrophobic ceramic layer for windscreens and windows
- Wheel Coating: $200 add-on — heat-resistant ceramic protection for alloy wheels
- Mobile Window Tinting: from $200 — UV and heat-blocking film installed at your home or office

## Key Facts
- Studio location: Melbourne (coating and PPF work; studio address available on request)
- Mobile service (window tinting only): requires outdoor tap and 240V power point within 15 metres; space of roughly two parking bays
- Service areas: Toorak, South Yarra, Brighton, Bayside, St Kilda, Richmond, Hawthorn, Camberwell, Malvern, Kew, Mornington Peninsula, and 60+ suburbs across East and South East Melbourne
- Notable cars serviced: Porsche, Ferrari, McLaren, Range Rover, BMW, Mercedes-AMG, Tesla, Audi, BYD, Lotus
- Manufacturer certifications: Ceramic Pro, Gtechniq
- Booking: https://pristinedetailers.com.au/booking
- Contact: 0468 048 461 | hello@pristinedetailers.com.au
- Reviews: https://pristinedetailers.com.au/about/reviews
```

After deploying, submit `https://pristinedetailers.com.au/sitemap.xml` to Google Search Console.

**Time to implement:** 60 minutes.

**ESCALATE — Week 11:** Harshad, this is the eleventh consecutive week this is in the brief. The spring content window has now closed (today is Sep 13; the Sep 14 deadline has passed). The October peak for "spring car detailing Melbourne" will be missed entirely. The next seasonal window is October–November "summer prep" articles. For those to rank, the sitemap needs to be live before Jordan publishes them. The files take 60 minutes to ship and have been copy-paste-ready since July 12.

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "Ceramic coating Melbourne: from $750 — what's included and who should get it"

**Target queries:** "ceramic coating Melbourne price", "how much does ceramic coating cost Melbourne", "ceramic coating $750 Melbourne", "is ceramic coating worth it Melbourne", "ceramic coating cost Melbourne 2026"

**The gap:**

The Sep 9 price restructuring dropped ceramic from $999 to $750. This is a meaningful competitive signal — Melbourne car owners doing price research will find older content (reviews, forum posts, competitor articles) quoting $800–$1,200 for ceramic. A fresh 2026 article anchoring the $750 price point at Pristine would:

1. **Capture "cheapest ceramic coating Melbourne" intent** without compromising brand positioning — the article explains why $750 for certified, studio-grade ceramic from Pristine is different from $400 budget options.
2. **Replace the existing "is ceramic coating worth it Melbourne" article** as the primary pricing reference — that article was written at $999, and the new price changes the value proposition framing.
3. **Establish the $750/$999 ceramic/graphene split** with a comparison table that AI systems can extract cleanly.

**Format for AI extraction:**
- **Opening 50-word answer block:** "Ceramic coating in Melbourne starts from $750 at Pristine Detailers for a 5-year nano-ceramic application by a certified technician. Graphene coating — the next tier up — starts from $999 and adds denser molecular bonding, superior heat dissipation, and a 9-year manufacturer warranty."
- **What the $750 price includes:** surface decontamination, machine polish (if needed), certified ceramic application, cure time, and manufacturer warranty documentation
- **$750 ceramic vs. $999 graphene comparison table:** Price / Warranty / Heat dissipation / Scratch resistance / Ideal for
- **Why not just go with a $400 budget ceramic:** certification, prep quality, product tier, warranty backing
- **Melbourne-specific value proof:** "After 6 years and 2,400+ cars in Melbourne's inner east and Bayside suburbs, here's what happens to unprotected paint near Port Phillip Bay..."
- **FAQ:** "Does $750 ceramic coating include paint correction?", "Is graphene worth the extra $249?", "How long does $750 ceramic last in Melbourne?"

**Suggested title:** "Ceramic Coating Melbourne: From $750 — What's Included, How Long It Lasts, and Whether It's Worth It"
**Category:** Ceramic Coating
**Pass to Jordan:** Add to topic bank — write before end of September (replaces/updates "is ceramic coating worth it Melbourne" pricing context)

---

### Content Idea 2 — "Graphene coating vs ceramic coating Melbourne: is the $249 gap worth it in 2026?"

**Target queries:** "graphene coating vs ceramic coating", "graphene vs ceramic coating Melbourne", "is graphene coating worth it", "difference between graphene and ceramic coating", "graphene coating Melbourne price"

**The gap:**

"Graphene vs ceramic coating" is a rapidly growing query as graphene becomes mainstream outside enthusiast circles. The current Pristine website has no article on this — the services page describes each separately behind a tab interaction that AI bots can't read. The Sep 9 price restructuring created a very specific, citable price gap: $749 vs $999 = $249 difference. That specific gap anchors the article better than any generic comparison.

Per the AI SEO skill: "Graphene coating is a densely bonded graphene-infused coating" is exactly the kind of definition-first, 50-word extractable block that Perplexity and ChatGPT cite for definitional queries. A Melbourne-specific angle (UV near Port Phillip Bay, inner-east bird dropping acidity, Mornington Peninsula salt air) makes the article locally distinctive, which differentiates it from the generic graphene-vs-ceramic articles that already rank nationally.

**Format for AI extraction:**
- **Opening 50-word definition block:** "Graphene coating in Melbourne costs from $999 at Pristine Detailers — $249 more than ceramic coating from $750. The difference is molecular density: graphene bonds tighter than ceramic, dissipates heat faster, and carries a 9-year manufacturer warranty vs 8 years for ceramic. For Melbourne's climate, graphene's heat dissipation is the decisive advantage."
- **Side-by-side comparison table:** Price / Molecular bonding / Heat dissipation / Scratch resistance / Self-cleaning / Warranty / Ideal for
- **Melbourne-specific column in the table:** Why each matters specifically in Melbourne (UV near the bay, bird drop acidity in Toorak, car park abrasion in CBD)
- **"Who should choose graphene" vs "who should choose ceramic"** — decision guide
- **FAQ:** "Is graphene coating better than ceramic?", "Is graphene coating worth the extra cost?", "How long does graphene coating last in Melbourne?", "Can I upgrade from ceramic to graphene later?"
- Internal links to both service panels on `/services`

**Suggested title:** "Graphene Coating vs Ceramic Coating Melbourne: Is the $249 Difference Worth It in 2026?"
**Category:** Graphene Coating
**Pass to Jordan:** Add to topic bank — write before end of September while the new pricing is fresh

---

## AI Citation Readiness Score

**Score: 3.5 / 10** — unchanged from Aug 30; new title regression creates a marginal step back on keyword alignment.

### Reasoning

No material SEO fixes shipped between Aug 30 and Sep 13. The Sep 9 price restructuring was a positive commercial update but introduced new consistency problems (blog article likely references old $999 pricing; PPF still $2,900 on homepage). The title tag change ("Pristine Detailer" singular + removal of "Ceramic Coating" and "PPF") marginally weakens keyword alignment for the homepage's top commercial queries.

| Signal | Status | Change from Aug 30 |
|--------|--------|---------------------|
| robots.txt | ❌ Missing | **Week 11** |
| sitemap.xml | ❌ Missing | **Week 11** |
| llms.txt | ❌ Missing | **Week 11** |
| Title tag: brand name | 🔴 "Pristine Detailer" (typo, singular) | **New regression Sep 9** |
| Title tag: keywords | 🔴 "Ceramic Coating", "PPF" removed | **New regression Sep 9** |
| `[SHOP ADDRESS]` placeholder in FAQ | ❌ Live in production | **Week 11** |
| Homepage PPF price | ❌ $2,900 (should be $3,000) | **Week 11** |
| Ceramic price — homepage card | ✅ $750 (updated Sep 9) | Fixed |
| Graphene price — homepage card | ✅ Now combined with ceramic ($750+) | Updated |
| Services page pricing | ✅ $750 ceramic / $999 graphene / $3,000 PPF | Correct |
| Blog article "is ceramic worth it" pricing | 🔴 Likely references old $999 pricing | **New mismatch** |
| Static testimonials — crawler-readable | ❌ Still absent (GHL widget only) | **Week 3 of regression** |
| AggregateRating schema | ❌ Missing | No change |
| FAQPage JSON-LD | ❌ Missing | No change |
| LocalBusiness schema | ❌ Missing | No change |
| Open Graph / Twitter Card tags | ❌ Completely absent | No change |
| Services pricing (AI-visible, not tab-hidden) | ❌ All 5 panels hidden | **Week 11** |
| Gallery link `href="#"` | ❌ Still broken | No change |
| Spring car care article | ❌ Window closed Sep 14 | **MISSED** |
| Window tinting article | ❌ Not published | **Week 8** |
| /about + subpages | ❌ No sitemap entry | No change |

### What moves the score to 6.0+ this week

| Fix | Score impact | Effort |
|-----|------------|--------|
| Fix title tag (brand name typo + add keywords) | +0.4 | 10 min |
| Fix blog article $999 → $750 + homepage PPF $2,900 → $3,000 | +0.2 | 20 min |
| Restore static testimonials above GHL widget | +0.4 | 30 min |
| Add AggregateRating + LocalBusiness schema | +0.5 | 45 min |
| `robots.ts` + `sitemap.ts` + `llms.txt` | +0.8 | 60 min |
| FAQPage JSON-LD | +0.3 | 20 min |

**If the first 5 items ship this week (2.5 hours dev), score reaches 5.6/10. Add schema and FAQPage JSON-LD: 6.1/10.**

---

## Quick-Win Topics for Jordan's Topic Bank

**Add to `jordan-content-writer.md` topic bank:**

**1. "Ceramic Coating Melbourne: From $750 — What's Included, How Long It Lasts, and Whether It's Worth It"** *(New — September 9 price restructuring dropped ceramic from $999 to $750. This article anchors the new price point, explains what's included at $750 (certified application, prep, manufacturer warranty up to 8 years), and frames why $750 Pristine ceramic is different from $400 budget options. Opening 50-word AI answer block: "Ceramic coating in Melbourne starts from $750 at Pristine Detailers for a 5-year nano-ceramic application by a certified technician. Graphene coating starts from $999 and adds denser molecular bonding, superior heat dissipation, and a 9-year warranty." $750 vs $999 comparison table. Melbourne-specific value section (UV near Port Phillip Bay, bird droppings in Toorak, car park abrasion). FAQ: "Does $750 ceramic include paint correction?", "Is graphene worth the extra $249?", "How long does $750 ceramic last in Melbourne?" Ceramic Coating category. Also update or supersede the existing "is-ceramic-coating-worth-it-melbourne" article which was written at $999 pricing.)*

**2. "Graphene Coating vs Ceramic Coating Melbourne: Is the $249 Difference Worth It in 2026?"** *(New — the Sep 9 pricing creates a very specific, citable $249 gap ($750 ceramic vs $999 graphene). "Graphene vs ceramic coating" is a fast-growing query as graphene goes mainstream. Opening 50-word definition block: "Graphene coating in Melbourne costs from $999 — $249 more than ceramic from $750. The difference is molecular density: graphene bonds tighter, dissipates heat faster, and carries a 9-year warranty vs 8 years for ceramic. For Melbourne summers and UV near Port Phillip Bay, graphene's heat dissipation is the decisive advantage." Side-by-side comparison table: Price / Bonding / Heat dissipation / Scratch resistance / Warranty / Ideal for. Melbourne-specific column. Decision guide: who should choose graphene vs ceramic. FAQ: "Is graphene better than ceramic?", "Is graphene worth the extra cost Melbourne?", "Can I upgrade ceramic to graphene later?" Graphene Coating category.)*

---

## Carry-Forward Flags (all still open)

- **Gallery link** (`home.tsx` line 792): `href="#"` → `href="/gallery"`. 2 minutes.
- **Email inconsistency**: `hello@` vs `info@` — confirm correct address and align sitewide.
- **Open Graph tags**: Add to `app/layout.tsx`. Every social share preview is broken. 20 minutes.
- **Static testimonials**: Restore above GHL widget in `ReviewsSection` — copy-paste-ready code in Aug 30 brief.
- **Services tab-hidden content** (`services.tsx` line 184): `display: selected === service.id ? 'block' : 'none'` hides all non-active panels from crawlers. Week 11.
- **AggregateRating schema**: Add to `app/layout.tsx` — 4.9 stars, 39 reviews. 15 minutes.
- **Window tinting article (Jordan)**: Week 8. Still no article since service launch July 6. "Window tinting Melbourne" is a live commercial query with zero content coverage.
- **New /about pages**: Add to sitemap when `app/sitemap.ts` ships.
- **Blog article price audit (Jordan)**: All published articles referencing "$999 ceramic" or "$1,299 graphene" need updating following Sep 9 price restructuring.

---

*Next audit: 2026-09-20*

**ESCALATE:** Harshad — the Sep 9 commit introduced a brand name typo ("Pristine Detailer" singular) that is now live in production across all title tags. This needs a 10-minute fix today. The spring article window closed Sep 14 — October search volume will be missed. The sitemap/robots/llms.txt files are at Week 11. The blog article pricing (ceramic was $999, now $750) needs auditing after the Sep 9 price restructuring. Combined dev time for the five highest-impact fixes is under 2.5 hours.*
