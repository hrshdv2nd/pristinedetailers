# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-10-04
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Status: Week 14 — September Studio Pivot Created New SEO Blind Spots on Top of Unresolved 14-Week Backlog

The September 9 business pivot from mobile car detailing to ceramic coating/PPF studio is the most significant SEO event since launch, and it arrived with zero SEO preparation. AI systems that previously cited Pristine Detailers as a "mobile detailer" now serve incorrect answers. Every fix that has been delayed for 14 weeks now needs to account for a completely different positioning.

| Item | Status | Change since Aug 30 |
|------|--------|---------------------|
| `app/sitemap.ts` | ❌ Missing | **Week 14** |
| `app/robots.ts` | ❌ Missing | **Week 14** |
| `public/llms.txt` | ❌ Missing | **Week 14** |
| `[SHOP ADDRESS]` in homepage FAQ | ❌ Still live (home.tsx:817) | **Week 6 — more critical post-pivot** |
| PPF price on homepage (×2 locations) | ❌ `$2,900` — should be `$3,000` | Unresolved |
| Services tab-hidden pricing | ❌ All panels hidden (services.tsx:184) | **Week 14** |
| Open Graph / Twitter Card tags | ❌ Completely absent | No change |
| LocalBusiness + AggregateRating schema | ❌ Missing | No change |
| FAQPage JSON-LD | ❌ Missing | No change |
| Studio address anywhere on site | ❌ **Does not exist** | **New critical issue** |
| Homepage title | 🟡 Updated to "Pristine Detailer | Melbourne's Paint Protection Specialists" | Sep 9 — improvement, still keyword-weak |
| Services page title | ❌ "Services - Pristine Detailers" | No change |
| Blog index title | ❌ "Blog - Pristine Detailers" | No change |
| Journal index title | ❌ "Journal - Pristine Detailers" | No change |
| Article title pattern | ❌ `${title} - Pristine Detailers` (no Melbourne) | No change |
| Gallery link `href="#"` | ❌ Still broken (home.tsx:792) | No change |
| Membership page | ❌ Redirects to /services — no dedicated metadata | Sep 9 change |
| Spring article (Jordan) | ❌ Still not published — **window is now October** | Deadline missed in Aug |
| Window tinting article (Jordan) | ❌ **Week 13** since service launch | Still unpublished |
| AI business model framing | 🔴 **AI caches "mobile detailing" — pivot correction not broadcast** | **New regression** |

---

## Top 3 Priority Issues

---

### Priority 1 — CRITICAL (Week 14, Post-Pivot): No sitemap.ts, robots.ts, or llms.txt — and llms.txt now needs the studio model

**Page:** Site-wide (`app/`)

**Problem:**

Fourteen weeks. The sitemap and robots.txt have been copy-paste-ready since July 12. Now there is a compounding reason they matter more than ever: the September 9 pivot to a ceramic coating/PPF studio means AI systems that previously crawled the site have cached a "mobile detailing" frame for Pristine Detailers. Without a robots.txt explicitly inviting AI bots to recrawl, and without an llms.txt providing a corrected structured summary, every AI answer for "Pristine Detailers" is currently based on outdated positioning.

GPTBot, PerplexityBot, ClaudeBot, and Google-Extended all check `robots.txt` before crawling. With no `robots.txt`, these bots operate on default assumptions. With no `llms.txt`, there is no structured brief for AI engines to extract clean facts about the new studio model, pricing, and service areas.

The studio address is also completely absent from the site — only a `[SHOP ADDRESS]` placeholder exists. llms.txt is currently the fastest path to putting that information in front of AI systems; the FAQ and LocalBusiness schema fixes (below) take longer to reach AI caches.

**Specific fix (60 minutes):**

**`app/robots.ts`:**
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

**`app/sitemap.ts`:**
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

**`public/llms.txt`** — REWRITTEN for studio model (do not use the Aug 30 draft, which referenced mobile detailing):
```
# Pristine Detailers — Melbourne Ceramic Coating, Graphene Coating & PPF Studio

## About
Pristine Detailers is a certified ceramic coating, graphene coating, and paint protection film (PPF) studio in Melbourne, Australia. Services are applied by Ceramic Pro and Gtechniq-certified technicians in a purpose-built studio. Mobile window tinting is also available — installed at the customer's home, office, or car park. Operating since 2020. 4.9-star average across 39 reviews. 2,400+ cars protected.

## Services and Pricing (excl. GST)
- Ceramic Coating: from $750 — applied at studio, manufacturer warranty up to 8 years
- Graphene Coating: from $999 — denser molecular bonding than ceramic, superior heat dissipation, manufacturer warranty up to 9 years
- Paint Protection Film (PPF): from $3,000 (partial front) — self-healing polyurethane film, stops stone chips and road debris
- Add-ons: Leather Ceramic Coating $250 | Glass Coating $150 | Wheel Coating $200
- Mobile Window Tinting: from $200 — installed at your home, office, or car park

## Combining Services
PPF and ceramic/graphene coating can be combined and we recommend it: PPF goes on first as a physical barrier, coating goes on top for the hydrophobic finish.

## Studio vs Mobile
Ceramic coating, graphene coating, and PPF installs are completed at our Melbourne studio. Window tinting is the one service our mobile team brings to you.

## Service Areas
Toorak, South Yarra, Brighton, Bayside suburbs, St Kilda, Richmond, Hawthorn, Camberwell, Malvern, Kew, Inner East Melbourne, Mornington Peninsula, and 60+ suburbs across East and South East Melbourne.

## Notable Cars Serviced
Porsche, Ferrari, McLaren, Range Rover, BMW, Mercedes-AMG, Tesla, Audi, BYD, Lotus

## Contact
Phone: 0468 048 461
Booking: https://pristinedetailers.com.au/booking
```

**IMPORTANT NOTE:** The llms.txt above omits the studio address because `[SHOP ADDRESS]` is a placeholder — the actual address does not appear anywhere in the codebase. Before deploying llms.txt, Harshad must supply the studio address. It should also be added to `home.tsx:817` (FAQ fix) and to LocalBusiness schema. This is the single most urgent data gap on the site.

After deploying, submit `https://pristinedetailers.com.au/sitemap.xml` to Google Search Console.

**Time to implement:** 60 minutes (once studio address is confirmed).

---

### Priority 2 — CRITICAL (NEW): Studio address is missing everywhere — blocks local SEO and all AI answers

**Pages:** `/` (home.tsx:817), `app/layout.tsx`, `public/llms.txt`

**Problem:**

The September 9 pivot made Pristine Detailers a studio-based business. Customers now need to bring their car to the studio for ceramic coating, graphene, and PPF. But the studio address doesn't appear anywhere on the site — only the `[SHOP ADDRESS]` placeholder in the homepage FAQ (home.tsx:817), which has been live for at least 6 weeks.

This creates three simultaneous failures:

1. **AI failure:** AI systems asked "where is Pristine Detailers?" or "can I bring my car to Pristine Detailers?" extract the FAQ and return `[SHOP ADDRESS]` — a literal placeholder — as the answer. Any AI session that cached this is now spreading malformed information.

2. **Local SEO failure:** Google Maps "ceramic coating near me" and "ceramic coating [suburb]" require a verified business address in Google Business Profile matched to on-site LocalBusiness schema. Without an address, the studio cannot rank in the Local Pack for these queries — which are the highest-intent ceramic coating discovery queries that exist.

3. **Booking failure:** A customer who books ceramic coating needs to know where to drop their car. The FAQ is the natural place to find this. It currently tells them the answer is `[SHOP ADDRESS]`.

**Specific fix:**

Step 1 — **Harshad must confirm the studio address.** This is a business data item that cannot be inferred from the codebase. Everything below depends on it.

Step 2 — Replace the `[SHOP ADDRESS]` placeholder in `home.tsx:817`:
```tsx
{ q: 'Do you come to my home or office?',
  a: 'Ceramic coating, graphene coating, and PPF installs are done at our studio at [CONFIRMED ADDRESS], Melbourne. Window tinting is the exception — our mobile team installs that at your home, office, or apartment car park.' },
```

Step 3 — Add LocalBusiness schema to `app/layout.tsx` (inside `<head>`):
```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "name": "Pristine Detailers",
  "description": "Certified ceramic coating, graphene coating, and paint protection film studio in Melbourne. Mobile window tinting also available.",
  "url": "https://pristinedetailers.com.au",
  "telephone": "+61468048461",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "[CONFIRMED ADDRESS]",
    "addressLocality": "Melbourne",
    "addressRegion": "VIC",
    "addressCountry": "AU"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "39"
  },
  "openingHours": "Mo-Sa 08:00-17:00"
}) }} />
```

Step 4 — Add the confirmed address to `public/llms.txt` under the Studio section (see Priority 1 template above).

**Time to implement:** 30 minutes once address is confirmed. The address confirmation is the blocker.

**Search queries unblocked:** "ceramic coating studio Melbourne", "where is Pristine Detailers", "ceramic coating near [suburb]", "ceramic coating Melbourne location", Google Maps Local Pack for all coating queries.

---

### Priority 3 — ONGOING: Title tags are keyword-weak across every page — 15 minutes to fix them all

**Pages:** `app/page.tsx`, `app/services/page.tsx`, `app/blog/page.tsx`, `app/journal/page.tsx`, `app/blog/[slug]/page.tsx`, `app/journal/[slug]/page.tsx`

**Problem:**

After the September 9 update, the homepage title became "Pristine Detailer | Melbourne's Paint Protection Specialists" — an improvement, but it omits the three primary commercial keywords ("ceramic coating", "graphene coating", "PPF") that every Melbourne buyer searches before booking. Every other page is worse:

| Page | Current title | Problem |
|------|--------------|---------|
| Homepage | "Pristine Detailer | Melbourne's Paint Protection Specialists" | No "ceramic coating", "graphene", "PPF" |
| Services | "Services - Pristine Detailers" | Zero keyword value |
| Blog index | "Blog - Pristine Detailers" | Generic, no Melbourne signal |
| Journal index | "Journal - Pristine Detailers" | Generic, no Melbourne signal |
| Blog articles | `${title} - Pristine Detailers` | No Melbourne in any article title in SERPs |
| Journal articles | `${title} - Pristine Detailers` | Same |

Each of these is a single-line change. Combined, they unlock every article Jordan has written to appear with a Melbourne signal in Google SERPs.

**Specific fixes:**

`app/page.tsx` (and `app/layout.tsx` — update the fallback too):
```tsx
title: 'Ceramic Coating Melbourne | Graphene Coating & PPF Studio | Pristine Detailers',
description: "Melbourne's certified ceramic coating and graphene coating studio. PPF from $3,000, ceramic from $750, graphene from $999. Plus mobile window tinting. Toorak, Brighton, South Yarra and 60+ suburbs.",
```

`app/services/page.tsx`:
```tsx
title: 'Ceramic Coating, Graphene Coating & PPF Melbourne | Pristine Detailers Services',
description: 'Studio-grade ceramic coating from $750, graphene coating from $999, and PPF from $3,000. Certified by Ceramic Pro and Gtechniq. Book online.',
```

`app/blog/page.tsx`:
```tsx
title: 'Car Protection Journal Melbourne | Ceramic Coating & PPF Guides | Pristine Detailers',
```

`app/journal/page.tsx`:
```tsx
title: 'Car Protection Journal Melbourne | Ceramic Coating & PPF Guides | Pristine Detailers',
```

`app/blog/[slug]/page.tsx` line 30 and `app/journal/[slug]/page.tsx` line 19:
```tsx
title: `${data.title} | Melbourne Ceramic Coating | Pristine Detailers`,
```

**Time to implement:** 15 minutes total. Every change is one line.

**Search queries unblocked:** "ceramic coating Melbourne", "graphene coating Melbourne", "PPF Melbourne", "paint protection Melbourne", "ceramic coating [Melbourne suburb]" — on every page, not just the homepage.

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "Ceramic Coating vs Graphene Coating in Melbourne: Which Is Worth the Extra Cost?"

**Target queries:** "ceramic coating vs graphene coating", "graphene coating Melbourne", "is graphene coating worth it", "ceramic coating vs graphene Melbourne", "graphene vs ceramic which is better"

**The gap:**

The site offers two coating products ($750 ceramic, $999 graphene) but has zero content comparing them. Every buyer considering a graphene coating at $999 first Googles "ceramic vs graphene coating" to validate the $249 premium. This query has no answer on the site — buyers who Google this currently land on a competitor's comparison article or a generic brand page.

This is also the single best AI citation format in the detailing space: a table with structured, comparable facts (product / bonding type / heat dissipation / scratch resistance / hydrophobicity / warranty / starting price) that AI engines extract and reproduce verbatim. A 50-word opening definition block followed by a comparison table is the exact format Perplexity and ChatGPT use when answering "what's the difference between ceramic and graphene coating?"

**Format for AI extraction:**
- **Opening 50-word definition block:** "Graphene coating and ceramic coating are both nano-scale paint protection products applied by certified technicians. Graphene bonds more densely to clear coat than silicon dioxide-based ceramics, giving superior heat dissipation (graphene conducts heat 20× more efficiently than ceramic), better scratch resistance, and a 9-year manufacturer warranty vs ceramic's 8-year."
- **Comparison table:** Product / Molecular structure / Heat dissipation / Scratch resistance / Hydrophobicity / Warranty / Starting price (Melbourne)
- **When to choose ceramic:** budget-conscious buyers, second cars, cars under $50K
- **When to choose graphene:** primary vehicles, high-UV exposure (Bayside, Mornington Peninsula), premium cars (Porsche, Ferrari, Tesla)
- **Melbourne specifics:** UV near Port Phillip Bay makes heat dissipation more important than in cooler climates — the graphene premium earns back faster here
- **FAQ:** "Is graphene coating worth it for a Toyota?", "What's the difference between graphene and ceramic?", "Can I upgrade from ceramic to graphene?", "Does Pristine use Gtechniq or Ceramic Pro graphene?"

**Suggested title:** "Ceramic Coating vs Graphene Coating in Melbourne: Is the Extra Cost Worth It?"
**Category:** Graphene Coating
**Pass to Jordan:** Yes — add to topic bank. This is the highest AI-citation-value article available to the site. No deadline, but high priority.

---

### Content Idea 2 — "October Is Melbourne's Last Chance Before Summer UV Peaks: What to Do to Your Paint Now"

**Target queries:** "spring car care Melbourne", "car detailing Melbourne October", "best time for ceramic coating Melbourne", "car protection before summer Melbourne", "prepare car for summer Melbourne"

**The gap:**

The spring article from the August 9 brief ("Why August is the Best Month...") missed its deadline and has been retitled three times. It is now October — late spring in Melbourne. This is not a missed window; it is the peak of that window. Melbourne UV peaks in November and December, and the October pre-UV article has maximum purchase intent right now. By November, the "before summer" frame expires.

This is also the first dedicated seasonal content on the site. No competitor has published a 2026 Melbourne spring/summer preparation article.

**Format for AI extraction:**
- **Opening 50-word answer block:** "In Melbourne, UV radiation peaks in November and December, with Port Phillip Bay amplifying it by up to 15% in Bayside suburbs. October is the last viable window to apply a ceramic or graphene coating — once temperatures exceed 28°C consistently, application conditions become less predictable and booking delays begin."
- **UV risk table:** Month / Melbourne UV index peak / Ceramic coating suitability / Why
- **Pre-summer service sequence:** Wash + decontaminate → assess swirls → paint correction → ceramic/graphene coat → PPF on high-impact zones (front bumper, hood leading edge, A-pillars)
- **Melbourne suburb specifics:** Bayside suburbs (Beaumaris, Sandringham, Brighton) face UV amplification from bay reflection; Inner East (Hawthorn, Kew, Camberwell) face UV + bird dropping acidity; CBD/South Yarra face car park scratches + UV
- **Booking urgency:** "The October booking window fills first — by November Pristine's ceramic schedule carries a 2–3 week lead time"
- **FAQ:** "Is it too late to get ceramic coating in Melbourne in October?", "Should I get PPF before summer?", "How long does ceramic coating need to cure before a heatwave?"

**Suggested title:** "October Is Melbourne's Last Pre-Summer Window: How to Protect Your Car's Paint Before UV Season"
**Category:** Detailing (or Ceramic Coating)
**Pass to Jordan:** Yes — add to topic bank. **TIME-SENSITIVE: write and publish within 10 days.** The article ages out in November.

---

## AI Citation Readiness Score

**Score: 3.0 / 10** — Dropped from 3.5. The September 9 pivot without an SEO correction mechanism has created a new citation accuracy risk.

### Reasoning

No material SEO fixes shipped between Aug 30 and Oct 4. The September 9 studio pivot is a net-negative for AI citation readiness because:

1. AI systems that previously cached Pristine Detailers as "mobile car detailers" (the pre-September positioning) now serve that description in answer to "ceramic coating Melbourne" — incorrect framing for what is now a studio-based service
2. The `[SHOP ADDRESS]` placeholder means no AI system can correctly answer "where is the Pristine Detailers studio?" — the most important post-pivot query
3. Without robots.txt or llms.txt, there is no mechanism to push a corrected business description to AI crawlers

| Signal | Status | Change since Aug 30 |
|--------|--------|---------------------|
| robots.txt | ❌ Missing | **Week 14** |
| sitemap.xml | ❌ Missing | **Week 14** |
| llms.txt | ❌ Missing | **Week 14** — needs complete rewrite for studio model |
| Studio address on site | ❌ Absent — only `[SHOP ADDRESS]` placeholder | **New critical gap** |
| LocalBusiness schema with address | ❌ Missing | No change |
| AggregateRating schema | ❌ Missing | No change |
| FAQPage JSON-LD | ❌ Missing | No change |
| Homepage title tag | 🟡 "Pristine Detailer \| Melbourne's Paint Protection Specialists" | Sep 9 improvement — still missing "ceramic coating" keyword |
| Services title tag | ❌ "Services - Pristine Detailers" | No change |
| Blog/Journal title tags | ❌ Generic | No change |
| Article title pattern | ❌ No Melbourne signal | No change |
| Services tab-hidden pricing | ❌ All 5 panels hidden from crawlers | **Week 14** |
| Open Graph tags | ❌ Completely absent | No change |
| AI business model framing | 🔴 "Mobile detailing" cached; reality is ceramic coating studio | **New regression** |
| Gallery link | ❌ `href="#"` (home.tsx:792) | No change |
| PPF price on homepage | ❌ `$2,900` — should be `$3,000` (home.tsx:253, 680) | Unresolved |
| Window tinting article | ❌ Not published | **Week 13** |
| Spring/seasonal article | ❌ Not published | **Deadline missed × 3** |

### What moves the score to 6.0+ this week

| Fix | Score impact | Effort |
|-----|-------------|--------|
| `robots.ts` + `sitemap.ts` + `llms.txt` (with studio address) | +1.0 | 60 min + address confirmation |
| LocalBusiness schema with address + AggregateRating | +0.5 | 30 min |
| `[SHOP ADDRESS]` FAQ fix + address in copy | +0.3 | 15 min |
| Title tag rewrites (all 6 pages) | +0.3 | 15 min |
| FAQPage JSON-LD on homepage | +0.3 | 20 min |
| Services tab-hidden content → always rendered | +0.3 | 30 min |
| October seasonal article published (Jordan) | +0.3 | Jordan's task |
| Open Graph tags in layout.tsx | +0.2 | 20 min |

**If items 1–5 ship this week (under 2.5 hours dev), score reaches 5.7/10.** The studio address is the only blocker — everything else is copy-paste-ready.

---

## Quick-Win Topics for Jordan's Topic Bank

Update `jordan-content-writer.md` with the following:

**1. "Ceramic Coating vs Graphene Coating in Melbourne: Is the Extra Cost Worth It?"** — The highest-AI-citation-value article available to the site. No deadline pressure, but should be written within 2 weeks. Opening 50-word definition block: "Graphene coating and ceramic coating are both nano-scale paint protection products applied by certified technicians. Graphene bonds more densely than silicon dioxide-based ceramic, giving superior heat dissipation, better scratch resistance, and a 9-year manufacturer warranty vs ceramic's 8-year. In Melbourne, Pristine Detailers prices ceramic from $750 and graphene from $999." Comparison table: Product / Molecular structure / Heat dissipation / Scratch resistance / Hydrophobicity / Warranty / Starting price. When to choose ceramic (budget, secondary car, under $50K). When to choose graphene (primary vehicle, Porsche/Ferrari/Tesla, Bayside or Mornington Peninsula UV exposure). Melbourne UV angle: graphene's heat dissipation advantage is amplified by Port Phillip Bay UV. FAQ: "Is graphene worth it for a Toyota?", "Can I upgrade from ceramic to graphene?", "Does Pristine use Gtechniq or Ceramic Pro graphene?". Graphene Coating category.

**2. "October Is Melbourne's Last Pre-Summer Window: How to Protect Your Car's Paint Before UV Season"** — **TIME-SENSITIVE: publish within 10 days.** The spring article that missed its August deadline. Retitled for October framing. Opening 50-word answer block: "In Melbourne, UV radiation peaks in November and December, with Port Phillip Bay amplifying it in Bayside suburbs. October is the last viable month to apply a ceramic or graphene coating — once November arrives, booking lead times extend to 2–3 weeks and pre-UV prep is done." UV risk table by month. Pre-summer service sequence: decontaminate → correct → ceramic/graphene coat → PPF front zones. Melbourne suburb UV specifics (Bayside, Inner East, CBD). Booking urgency close. FAQ: "Is it too late for ceramic coating in October Melbourne?", "Should I get PPF before summer?", "How long does ceramic coating cure before a heatwave?". Detailing category. After publishing, Sam should reference this URL in social posts about October prep timing.

**Also note:** The spring article brief originally titled "Why August Is the Best Month to Protect Your Paint" (in the topic bank) is now outdated. Replace that line with the October-framed title above.

---

## Carry-Forward Flags (all still open)

- **Studio address** (`home.tsx:817`): Replace `[SHOP ADDRESS]` with actual studio address. This is Harshad's data to supply — no developer can fix this without it.
- **PPF price on homepage** (home.tsx:253, 680): `$2,900` → `$3,000` to match services page. Two-minute fix.
- **Gallery link** (`home.tsx:792`): `href="#"` → `href="/gallery"`. Two-minute fix.
- **Email inconsistency**: Confirm whether `hello@pristinedetailers.com.au` or `info@pristinedetailers.com.au` is correct; align across site.
- **Services tab-hidden content** (`services.tsx:184`): `display: selected === service.id ? 'block' : 'none'` → render all panels in HTML, use CSS/JS to show/hide for humans only. Week 14.
- **Open Graph tags** (`app/layout.tsx`): Add `openGraph` and `twitter` to layout metadata. Every social share and WhatsApp link preview is unstyled. 20 minutes.
- **Membership page redirect**: `app/membership/page.tsx` now redirects to `/services`. Membership-specific keywords ("car detailing membership Melbourne", "ceramic coating membership Melbourne") are now unanchored — no dedicated page title, no metadata. Consider whether to restore the membership page or add membership keywords to the services page title/description.
- **Window tinting article (Jordan)**: Week 13 since service launch. "Window tinting Melbourne" is a live commercial query Pristine is invisible for.
- **AggregateRating schema** can be added now, without the address: `{ "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "39" }` inside a minimal LocalBusiness block. 15 minutes, fully independent.

---

*Next audit: 2026-10-11*

**ESCALATE — Harshad:** The studio address has never been added to the website. Everything at the studio level — LocalBusiness schema, the homepage FAQ, llms.txt — is blocked until you supply it. Everything else on this list is copy-paste-ready and has been for 14 weeks. The October seasonal article has a 10-day window before it ages out. The graphene vs ceramic comparison article is the single highest-return content investment currently available.*
