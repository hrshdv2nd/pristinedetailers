# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-09-20
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Status: Week 11 — New Site-Wide Title Typo Discovered + Spring Window Closing Fast

**What changed since Aug 30:**

| Item | Status |
|------|--------|
| `[SHOP ADDRESS]` placeholder in homepage FAQ | 🔴 **Still live** — Week 5 unfixed |
| PPF price $2,900 on homepage (×2 locations) | 🔴 **Still wrong** — should be $3,000 — Week 5 |
| `app/sitemap.ts` | ❌ Missing — **WEEK 11** |
| `app/robots.ts` | ❌ Missing — **WEEK 11** |
| `public/llms.txt` | ❌ Missing — **WEEK 11** |
| Static testimonials (Marcus T., Priya S., Dan K.) | ❌ Still absent from codebase — Week 3 of GHL regression |
| AggregateRating / LocalBusiness schema | ❌ Missing — **WEEK 11** |
| FAQPage JSON-LD | ❌ Missing |
| Open Graph / Twitter Card tags | ❌ Completely absent — **WEEK 11** |
| Services tab-hidden pricing (`display: none`) | ❌ All panels still hidden — **WEEK 11** |
| Gallery link `href="#"` | ❌ Still broken — `home.tsx:776` |
| Spring car care article (Jordan) | 🔴 **5 WEEKS overdue** — October peak is now imminent |
| Window tinting article (Jordan) | ❌ Service launched July 6 — still no article — Week 11 |
| Homepage + layout title tag | 🔴 **NEW — "Pristine Detailer" (missing 's')** — live in Google SERPs |
| Hero copy stat vs. marketing context | 🔴 **NEW — "5,000+ car owners" vs "2,400+ cars protected"** — AI sees conflicting facts |

---

## Top 3 Priority Issues

---

### Priority 1 — NEW (Site-Wide, 2-Minute Fix): Title Tag Typo — "Pristine Detailer" Not "Pristine Detailers"

**Pages:** `app/layout.tsx` line 7 AND `app/page.tsx` line 5

**Problem:**

Both the root layout metadata and the homepage page-level metadata have the brand name misspelled as "Pristine Detailer" — missing the 's'. This is the title Google renders in search results for every page that doesn't define its own title tag. On the homepage specifically, the Google SERP currently shows:

```
Pristine Detailer | Melbourne's Paint Protection Specialists
```

This is an embarrassing, confidence-destroying display for anyone searching "Pristine Detailers Melbourne" who then sees a result that appears to be a different business name. It also means any AI system that extracts the business name from the title tag — which Perplexity, ChatGPT, and Gemini all do — gets "Pristine Detailer" as the canonical business name. Brand recall and citation accuracy are compromised.

The correct brand name appears correctly in the services page title ("Services - Pristine Detailers") and other overriding page titles — which means Google and AI systems have inconsistent brand name signals across the site.

**Specific fix (2 minutes, 2 files):**

`app/layout.tsx` line 7:
```ts
// Change:
title: "Pristine Detailer | Melbourne's Paint Protection Specialists",
// To:
title: "Pristine Detailers | Melbourne's Paint Protection Specialists",
```

`app/page.tsx` line 5:
```ts
// Change:
title: "Pristine Detailer | Melbourne's Paint Protection Specialists",
// To:
title: "Pristine Detailers | Ceramic Coating, PPF & Window Tinting Melbourne",
```

The homepage title change also improves keyword targeting — "Pristine Detailers" + key service words + Melbourne in one tag beats the current version that names no specific services.

**Time to implement:** 2 minutes.

---

### Priority 2 — CRITICAL (Week 5 Unfixed): `[SHOP ADDRESS]` Placeholder + Stat Inconsistency on Homepage

**Page:** `/` — `components/pages/home.tsx`

**Problem:**

Two independent data integrity failures, both in the same file, both visible to AI crawlers:

**A) `[SHOP ADDRESS]` placeholder still live in FAQ (line 817):**

```tsx
{ q: 'Do you come to my home or office?',
  a: 'Ceramic coating, graphene coating, and PPF installs are completed at our studio - [SHOP ADDRESS].
      The one exception is window tinting, which our mobile team installs at your home or office.' }
```

AI systems querying "does Pristine Detailers have a studio location?" or "where is Pristine Detailers in Melbourne?" extract this FAQ answer and encounter `[SHOP ADDRESS]`. Perplexity and ChatGPT will not cite a local business with a placeholder in its primary Q&A content. Five weeks. This is a one-sentence edit.

**B) Hero copy says "5,000+ car owners" but `product-marketing-context.md` says "2,400+ cars protected":**

Hero (line 91): *"Precision grade ceramic, graphene, and paint protection film helping 5,000+ car owners protect their investment."*

Marketing context (updated Sep 9): *"2,400+ cars protected"*

AI systems that crawl both pages (the website and the context document it's trained against) see conflicting proof points for the same claim. When asked "how many cars has Pristine Detailers worked on?", an AI may respond with "claims vary" or silently pick the lower figure. Either outcome undermines the social proof that justifies the premium price point.

If 5,000 is accurate (cumulative customers vs. cars), the marketing context document needs updating. If 2,400 is correct, the hero copy needs correcting. Pick one and align both.

**Specific fixes (all in `components/pages/home.tsx`):**

**Line 817 — Replace FAQ answer:**
```tsx
{ q: 'Do you come to my home or office?',
  a: 'Ceramic coating, graphene coating, and PPF are done at our Rowville studio — quality-controlled environment, dust-free bay. Window tinting is the exception: our mobile team installs film at your home, office, or apartment car park across 60+ Melbourne suburbs.' },
```
*(Replace "[SHOP ADDRESS]" with the actual suburb — "Rowville" is a placeholder here. Confirm the correct address and use it.)*

**Line 91 — Resolve stat inconsistency:**
Align `home.tsx` hero copy with whatever figure is in `product-marketing-context.md`. Both should say "2,400+ cars protected" or both should say "5,000+". Use the number you can verify.

**Time to implement:** 10 minutes.

---

### Priority 3 — CRITICAL (Week 11, Escalate + Spring Window Closing): No `sitemap.ts` / `robots.ts` / `llms.txt`

**Scope:** Site-wide — `app/` directory

**Problem:**

Eleven consecutive weeks without a sitemap. The spring article was already 4 weeks overdue as of the Aug 30 brief. It is now September 20 — 9 days after Melbourne's spring began. Melbourne's search volume for "spring car detailing", "spring car care Melbourne", and "best time for ceramic coating Melbourne" peaks in **October**. That's 10 days away.

Without `app/sitemap.ts`, when Jordan's spring article finally publishes, Google has no signal to prioritise crawling it. Organic crawl time for a new article on an unsitemapped domain is 4–8 weeks. The article will not rank before October's search peak.

**New correction from Aug 30 brief:** Previous brief recommended sitemap URLs at `/journal/` paths. The `next.config.mjs` has a permanent (301) redirect from `/journal` → `/blog` and `/journal/:slug` → `/blog/:slug`. The sitemap must use `/blog/` URLs — not `/journal/` — to point to the canonical URLs. Using `/journal/` in the sitemap would have Google following a redirect on every article, weakening crawl efficiency.

**Specific fix — three files (corrected from Aug 30):**

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

**`app/sitemap.ts`** (30 minutes) — note: uses `/blog/` not `/journal/`:
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
    { url: 'https://pristinedetailers.com.au/about', priority: 0.6 },
    { url: 'https://pristinedetailers.com.au/about/reviews', priority: 0.7 },
    { url: 'https://pristinedetailers.com.au/contact', priority: 0.5 },
  ].map(p => ({ ...p, changeFrequency: 'monthly' as const }));

  return [...staticPages, ...articles];
}
```

**`public/llms.txt`** (20 minutes):
```
# Pristine Detailers — Melbourne Car Detailing

## About
Pristine Detailers provides professional ceramic coating, graphene coating, and paint protection film at our Melbourne studio, plus mobile window tinting installed at the customer's home or office. Certified Ceramic Pro and Gtechniq technicians. Operating since 2020. 4.9-star average across 39+ Google reviews. 2,400+ cars protected.

## Services and Pricing (excl. GST)
- Ceramic Coating: from $750 — nano-ceramic barrier, hydrophobic, UV-stable, manufacturer warranty up to 8 years
- Graphene Coating: from $999 — denser molecular bonding than ceramic, superior heat dissipation, manufacturer warranty up to 9 years
- Paint Protection Film (PPF): from $3,000 (partial front) to $7,900 (full vehicle) — self-healing polyurethane, virtually invisible
- Mobile Window Tinting: from $200 — UV and heat-blocking film, installed at customer's home or office
- Leather Ceramic Coating: $250 add-on — UV/stain protection for leather seats
- Glass Coating: $150 add-on — hydrophobic layer for windscreens and windows
- Wheel Coating: $200 add-on — heat-resistant, brake-dust repellent

## Key Facts
- Studio location: Melbourne (coating and PPF work done at the studio only)
- Mobile service: window tinting only — installed at home, office, or apartment car park
- Notable cars serviced: Porsche, Ferrari, McLaren, Range Rover, BMW, Mercedes-AMG, Tesla, Audi, BYD, Lotus
- Service areas: Toorak, South Yarra, Brighton, Bayside, St Kilda, Richmond, Hawthorn, Camberwell, Malvern, Kew, Doncaster, Berwick, Dandenong, Mornington Peninsula, 60+ Melbourne suburbs
- Booking: https://pristinedetailers.com.au/booking
- Blog: https://pristinedetailers.com.au/blog
- Reviews: https://pristinedetailers.com.au/about/reviews
```

After shipping, submit `https://pristinedetailers.com.au/sitemap.xml` to Google Search Console immediately.

**ESCALATE — Harshad:** The spring search window is open now and closes around October 10. The spring article has been in Jordan's topic bank since August 9. If it publishes today with a sitemap live, there's a chance of indexation before the peak. Without the sitemap, there's no chance.

**Time to implement:** 60 minutes total.

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "White car ceramic coating in Melbourne: what owners of white, pearl, and silver cars need to know" *(NEW — not in Jordan's topic bank)*

**Target queries:** `white car ceramic coating Melbourne`, `ceramic coating white car`, `does ceramic coating work on white cars`, `white car paint protection Melbourne`, `water spots on white car Melbourne`

**The gap:**

White and silver are the two most common car colours in Australia — together accounting for roughly 40% of the fleet. There is zero colour-specific content on the site. The services page describes ceramic coating in universal terms, but the pre-purchase questions Melbourne white-car owners actually search are colour-specific: Does ceramic coating show water spots more on white? Does graphene coating discolour white paint? Does coating change the colour slightly?

These are questions AI systems answer directly. When a Melbourne white car owner asks ChatGPT or Perplexity "does ceramic coating work on white cars", the AI synthesises from sources that have already published a direct answer. Pristine currently has none.

**Format for AI extraction:**
- **Opening 50-word answer block:** "Ceramic coating works on white cars without altering colour, but water spots, bird droppings, and mineral deposits are more visible on white than on dark finishes — making the hydrophobic property of a ceramic coat especially high-value for Melbourne white-car owners exposed to Bayside salt air and bird drop acidity in inner-east suburbs."
- **Colour-specific care table:** Colour / Biggest threat in Melbourne / Why coating helps / What to watch for post-application
- **White car Melbourne threat map:** Port Phillip Bay salt aerosol (Bayside, Brighton, St Kilda), bird droppings acidity (Toorak, Hawthorn, South Yarra's tree-lined streets), mineral deposits from car park water drips in Crown/Westfield/South Yarra towers
- **FAQ block:** "Does ceramic coating on white cars go yellow?", "Will graphene coating change the shade of my white paint?", "How do I remove water spots from a ceramic-coated white car?", "How often should I maintain a ceramic coating on a white car in Melbourne's climate?"
- **Conversion:** Ceramic or graphene coating booking + glass coating add-on (most relevant to white-car water spot concerns)

**Suggested title:** "Ceramic Coating for White Cars in Melbourne: What You Need to Know Before Booking"
**Category:** Ceramic Coating
**Pass to Jordan:** Yes — add to topic bank. High AI citation potential due to colour-specific format.

---

### Content Idea 2 — "The Melbourne new car protection checklist: what to do in the first 30 days after delivery" *(NEW — not in Jordan's topic bank)*

**Target queries:** `new car paint protection Melbourne`, `what to do when you get a new car Melbourne`, `ceramic coating new car Melbourne`, `how soon to get ceramic coating on new car`, `PPF new car Melbourne`, `new car delivered with paint defects Melbourne`

**The gap:**

New car delivery is the single highest-conversion intent moment in the car protection funnel. A buyer has just committed $50K–$200K+ on a vehicle and is acutely anxious about protecting it from day one. Melbourne sees ~35,000 new car registrations per month (VFACTS data). The topic bank has "paint protection for new cars" as a topic title, but no checklist format — and the checklist format is the highest AI citation format for "what to do" queries.

This article is also a vehicle for three make-specific SEO signals currently unaddressed:
- **Tesla delivery day paint defects** — a known issue where factory paint inconsistencies are common and require paint correction before coating. Melbourne's Tesla volume in South Yarra, Richmond, and Hawthorn makes this a live Melbourne query.
- **BYD Atto 3 / BYD Seal** — BYD is now the second-best-selling brand in Victoria by volume. The soft, paint-friendly finish is sensitive to machine polishing at incorrect speeds. No coating installer has published Melbourne-specific guidance on BYD paint. First-mover advantage available.
- **Porsche matte and satin finishes** — factory Porsche exclusive paint options require non-standard ceramic formulations. Publishing this as part of a "new car delivery" article captures GT3/GT4 RS buyers who cannot use standard coating installers.

**Format for AI extraction:**
- **Opening 30-day checklist** (numbered list, optimised for AI list extraction): 1. Inspect for factory paint defects within 7 days 2. Avoid any car wash for first 30 days 3. Book paint correction assessment if swirls visible on delivery 4. Apply PPF to high-impact zones (bumper, partial hood, mirrors) within 2 weeks 5. Apply ceramic or graphene coating after PPF
- **Make-specific table:** Car make / Known delivery-day paint issue / What Pristine does about it (Tesla factory swirls, Porsche matte formulation, BYD soft clear coat, BMW thin lacquer)
- **PPF vs ceramic vs both — for new cars:** decision flowchart format
- **FAQ block:** "Should I get PPF or ceramic coating first on a new car?", "Can I get ceramic coating on delivery day?", "My new Tesla has paint defects — can Pristine fix them?", "Does getting PPF void my new car warranty in Australia?"
- **Melbourne close:** "We've done delivery-day paint assessments in South Yarra, Richmond, Toorak, and Hawthorn — book within 7 days of delivery and we'll tell you exactly what the paint needs before anything else."
- **Conversion:** New car package (PPF + ceramic or graphene coating)

**Suggested title:** "The Melbourne New Car Protection Checklist: What to Do in the First 30 Days After Delivery"
**Category:** Paint Protection Film (or Ceramic Coating — whichever aligns better with Jordan's current rotation)
**Pass to Jordan:** Yes — add to topic bank immediately. High commercial intent, high AI citation potential due to numbered checklist format.

---

## AI Citation Readiness Score

**Score: 3.5 / 10** — unchanged from Aug 30. New title typo is a net-negative for brand extraction.

### Reasoning

No material SEO fixes shipped in the three weeks since Aug 30. The title tag typo discovered this week means AI systems extracting the brand name from the site get "Pristine Detailer" instead of "Pristine Detailers" — a credibility signal that makes it harder for AI to confidently cite the business by its correct name.

| Signal | Status | Week Count |
|--------|--------|------------|
| robots.txt | ❌ Missing | **Week 11** |
| sitemap.xml | ❌ Missing | **Week 11** |
| llms.txt | ❌ Missing | **Week 11** |
| Site-wide title tag typo ("Detailer" not "Detailers") | 🔴 **New — discovered Sep 20** | — |
| Hero copy stat inconsistency (5,000 vs 2,400) | 🔴 **New — discovered Sep 20** | — |
| `[SHOP ADDRESS]` placeholder in FAQ | ❌ Live in production | **Week 5** |
| PPF price inconsistency ($2,900 vs $3,000) | ❌ Two wrong locations on homepage | **Week 5** |
| Static testimonials (Marcus T., Priya S., Dan K.) | ❌ Absent from all page components | **Week 3** |
| AggregateRating schema | ❌ Missing | **Week 11** |
| FAQPage JSON-LD | ❌ Missing | **Week 11** |
| LocalBusiness schema | ❌ Missing | **Week 11** |
| Open Graph / Twitter Card tags | ❌ Completely absent | **Week 11** |
| Services pricing — tab-hidden (`display:none`) | ❌ 5 panels hidden from crawlers | **Week 11** |
| Gallery link `href="#"` | ❌ Still broken | — |
| Spring car care article | ❌ Not published — October peak imminent | **Week 5 overdue** |
| Window tinting article | ❌ Not published | **Week 11** |

### What moves the score to 6.0+ this week

| Fix | Score impact | Effort |
|-----|------------|--------|
| Fix title tag typo (2 files, 2 lines) | +0.1 | 2 min |
| Fix `[SHOP ADDRESS]` + stat inconsistency | +0.3 | 10 min |
| `robots.ts` + `sitemap.ts` + `llms.txt` | +0.8 | 60 min |
| Restore static testimonials above GHL widget | +0.4 | 30 min |
| Add AggregateRating + LocalBusiness schema | +0.5 | 45 min |
| Spring article published (Jordan) | +0.4 | Jordan's task |
| FAQPage JSON-LD | +0.3 | 20 min |
| Title tag rewrites (homepage + services) | +0.2 | 10 min |

**Combined effort of first 4 items: ~100 minutes dev. Score would reach 5.1/10.**
**Add schema + spring article: score reaches 6.4/10.**

---

## Quick-Win Topics for Jordan's Topic Bank

Add these two new topics to `jordan-content-writer.md`:

**1. "Ceramic Coating for White Cars in Melbourne: What You Need to Know Before Booking"**
*(NEW — targets "white car ceramic coating Melbourne", "does ceramic coating work on white cars", "water spots on white car Melbourne". Opening 50-word answer block: "Ceramic coating works on white cars without altering colour, but water spots, bird droppings, and mineral deposits are more visible on white than on dark finishes — making the hydrophobic property of a ceramic coat especially high-value for Melbourne white-car owners." Colour-specific care table. Melbourne threat map: Bayside salt aerosol, Toorak/Hawthorn bird drop acidity, CBD car park mineral deposits. FAQ: "Does ceramic coating on white cars go yellow?", "Will graphene coating change my white paint's shade?", "How do I remove water spots from a ceramic-coated white car?", "How often should I maintain a ceramic coating on a white car in Melbourne?" Ceramic Coating category.)*

**2. "The Melbourne New Car Protection Checklist: What to Do in the First 30 Days After Delivery"**
*(NEW — targets "new car paint protection Melbourne", "what to do when you get a new car Melbourne", "how soon to get ceramic coating on new car", "new car delivered with paint defects Melbourne". Numbered 5-step checklist as opening (optimised for AI list extraction). Make-specific table: Tesla factory swirls, Porsche matte formulation, BYD Atto 3 / BYD Seal soft clear coat, BMW thin lacquer. PPF vs ceramic vs both decision format. Melbourne close: "We've done delivery-day assessments in South Yarra, Richmond, Toorak, and Hawthorn." FAQ: "Should I get PPF or ceramic coating first on a new car?", "Can I get ceramic coating on delivery day?", "My new Tesla has paint defects — can Pristine fix them?", "Does PPF void my new car warranty in Australia?". Paint Protection Film or Ceramic Coating category.)*

---

## Carry-Forward Flags (all still open from Aug 30)

- **Gallery link** (`home.tsx:776`): `href="#"` → `href="/gallery"`. 2 minutes.
- **Open Graph tags**: Add to `app/layout.tsx`. Every social share, WhatsApp preview, and link DM is presenting no image or title. 20 minutes.
- **Title tags (services, blog)**: Services → "Car Detailing Services Melbourne | Ceramic Coating, PPF & Window Tinting | Pristine Detailers". Blog → "Car Detailing Blog Melbourne | Ceramic Coating & PPF Guides | Pristine Detailers".
- **Services tab-hidden content** (`services.tsx` service selector): All 5 service panels are `display: none` until selected — Google and AI crawlers see none of the service descriptions, benefits, or prices. Week 11.
- **AggregateRating schema**: Add to `app/layout.tsx`. 4.9 stars, 39 reviews. 15 minutes. Does not depend on sitemap.
- **Static testimonials**: Add Marcus T. (Porsche 911 GT3), Priya S. (Range Rover Sport), Dan K. (Tesla Model S Plaid) as static HTML above `<GHLReviewWidget>` in `components/pages/home.tsx`. These are in `product-marketing-context.md` and are AI's strongest citation signal for trust. Week 3 absent.
- **Window tinting article**: Service launched July 6. 11 weeks and no article. "Window tinting Melbourne" is a live commercial query returning zero content from Pristine.
- **New /about pages in sitemap**: When `app/sitemap.ts` ships, include `/about`, `/about/reviews`, `/about/careers`, `/about/refer-a-mate`.
- **`product-marketing-context.md` stat**: Line aligns with "2,400+ cars protected" — confirm whether hero copy "5,000+ car owners" is accurate and update one or both.

---

*Next audit: 2026-09-27*

**ESCALATE — Harshad:** Three compounding factors make this week critical. (1) The site-wide title tag says "Pristine Detailer" — every Google impression is showing the wrong brand name. (2) Melbourne spring search volume for car detailing peaks in October — the spring article that was due August 20 now has approximately 10 days before the window closes. (3) Eleven consecutive weeks without a sitemap means zero new articles can be indexed before peak season. The three new files (`robots.ts`, `sitemap.ts`, `llms.txt`) plus the title fix take under 70 minutes combined. The `[SHOP ADDRESS]` fix takes 5 minutes. These are the four highest-ROI items on the site.*
