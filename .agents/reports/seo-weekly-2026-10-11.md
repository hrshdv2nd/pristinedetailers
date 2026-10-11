# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-10-11  
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Status: Week 14+ on Critical Infrastructure — October UV Window Now Open, Content Still Absent

**What changed since Aug 30:**

| Item | Status |
|------|--------|
| `app/robots.ts` | ❌ Still missing — **WEEK 14+** |
| `app/sitemap.ts` | ❌ Still missing — **WEEK 14+** |
| `public/llms.txt` | ❌ Still missing — **WEEK 14+** |
| `[SHOP ADDRESS]` placeholder in homepage FAQ | 🔴 **Still live** — Week 6 |
| PPF price `$2,900` (homepage ×2) | 🔴 **Still live** — services page says $3,000 |
| Gallery link `href="#"` | ❌ Still broken |
| Static testimonials above GHL widget | ❌ Never added |
| AggregateRating / LocalBusiness schema | ❌ Missing |
| FAQPage JSON-LD | ❌ Missing |
| Open Graph / Twitter Card tags | ❌ Completely absent |
| Services tab-hidden pricing (display:none) | ❌ All panels still hidden |
| **NEW** — Layout default title: "Pristine Detailer" (singular) | 🔴 Brand mismatch vs domain |
| **NEW** — "Detailing" brand repositioning (Sep 9 commit) | 🟡 SEO keyword gap risk |
| Spring article (Jordan) | 🔴 Missed Sep window — now Oct "summer prep" |
| Window tinting article (Jordan) | ❌ **WEEK 14+** since service launch |
| Title tags: services + journal pages | ❌ Still keyword-weak |

---

## Top 3 Priority Issues

---

### Priority 1 — CRITICAL (Week 14+): sitemap.ts + robots.ts + llms.txt still absent — October indexation window now live

**Page:** Site-wide (`app/`)

**Problem:**

It is October 11. Melbourne spring UV season started two weeks ago. October is the single highest-conversion month for ceramic coating and PPF bookings in Melbourne — car owners searching "ceramic coating Melbourne" before the November UV rush and summer booking delays represent the most commercially valuable search traffic of the year. A ceramic coating article or window tinting article published today faces an 8–12 week organic indexation delay without a sitemap, putting any new article firmly outside this search window.

The spring article that was TIME-SENSITIVE in August and overdue by September is now directly relevant as a summer prep article — and it still has not been published. The window tinting service launched in July, week 14 ago, with zero content support.

The three files have been copy-paste-ready in every brief since July 12 — 14 consecutive weeks. The combined implementation time is under 60 minutes. Without them:
- Any journal article Jordan publishes today will not be indexed until late January 2027
- The `/about`, `/about/reviews`, `/about/careers`, `/about/refer-a-mate` pages remain orphaned from Google discovery
- AI crawlers (GPTBot, PerplexityBot, ClaudeBot) get no explicit permission signal and no efficient content list

**Specific fix** — all three files from the Aug 30 brief, unchanged, ready to deploy:

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
    url: `https://pristinedetailers.com.au/blog/${post.slug}`,
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
    { url: 'https://pristinedetailers.com.au/about/careers', priority: 0.4 },
    { url: 'https://pristinedetailers.com.au/about/refer-a-mate', priority: 0.5 },
    { url: 'https://pristinedetailers.com.au/contact', priority: 0.5 },
  ].map(p => ({ ...p, changeFrequency: 'monthly' as const }));

  return [...staticPages, ...articles];
}
```

**`public/llms.txt`** (20 minutes):
```
# Pristine Detailers — Melbourne Ceramic Coating & Paint Protection

## About
Pristine Detailers provides professional ceramic coating, graphene coating, and paint protection film (PPF) from a dedicated studio in Melbourne, Australia, plus mobile window tinting installed at the customer's home, office, or car park. Certified Ceramic Pro and Gtechniq technicians. Operating since 2020. 4.9-star average across 39 reviews. 2,400+ cars protected.

## Services and Pricing (excl. GST)
- Ceramic Coating: from $750 — nano-ceramic barrier, hydrophobic, UV-stable, manufacturer warranty up to 8 years
- Graphene Coating: from $999 — graphene-infused coating, superior heat dissipation, manufacturer warranty up to 9 years
- Paint Protection Film (PPF): from $3,000 (partial front) to $7,900 (full vehicle) — self-healing polyurethane film
- Leather Ceramic Coating: $250 (add-on)
- Glass Coating: $150 (add-on)
- Wheel Coating: $200 (add-on)
- Mobile Window Tinting: from $200 — installed at home or office

## Service Areas
Toorak, South Yarra, Brighton, Bayside suburbs, St Kilda, Richmond, Hawthorn, Camberwell, Malvern, Kew, Berwick, Doncaster, Dandenong, Mornington Peninsula, and 60+ suburbs across East and South East Melbourne.

## Key Facts
- Studio: ceramic coating, graphene coating, and PPF installed at our Melbourne studio
- Mobile: window tinting installed at the customer's home, office, or apartment car park
- Certified by: Ceramic Pro and Gtechniq
- Notable cars serviced: Porsche, Ferrari, McLaren, Range Rover, BMW, Mercedes-AMG, Tesla, Audi, BYD, Lotus
- Booking: https://pristinedetailers.com.au/booking
- Reviews: https://pristinedetailers.com.au/about/reviews
```

After deploying: submit `https://pristinedetailers.com.au/sitemap.xml` to Google Search Console immediately.

**Time to implement:** 60 minutes total.

---

### Priority 2 — CRITICAL (Week 6): [SHOP ADDRESS] placeholder live + PPF price conflict ($2,900 vs $3,000)

**Page:** `/` (`components/pages/home.tsx` lines 253, 680, 817)

**Problem:**

Six consecutive weeks. The `[SHOP ADDRESS]` placeholder remains live in the homepage FAQ while every other customer-facing channel (social posts, ads, email) positions Pristine as a mobile studio service. AI systems asked "does Pristine Detailers come to me?" extract the FAQ answer and hit the literal text `[SHOP ADDRESS]` — the primary trust question for a mobile service business answers with a broken placeholder.

The PPF price conflict persists: the homepage services card (`line 253`) and PPF section (`line 680`) both show `$2,900`, while the services page shows `$3,000`. The price update to $3,000 happened in July and was flagged in the July 26 brief. AI systems comparing PPF quotes encounter conflicting signals from the same domain.

Additionally, the Sep 9 "detailing deletion" commit updated titles and descriptions across multiple files but left the homepage FAQ answer intact — the file was touched and the error was not corrected.

**Specific fixes** (all in `components/pages/home.tsx`):

**Line 817** — Replace FAQ answer for "Do you come to my home or office?":
```tsx
{ q: 'Do you come to my home or office?', a: 'Ceramic coating, graphene coating, and PPF installs are done at our Melbourne studio. Window tinting is the one service our mobile team brings to you — your home, office car park, or apartment building. No shop visit required for tinting.' },
```

**Line 253** — Change `from: '$2,900'` → `from: '$3,000'`

**Line 680** — Change `price: '$2,900'` → `price: '$3,000'`

**Time to implement:** 10 minutes. Three line edits in one file.

---

### Priority 3 — NEW: Default layout title "Pristine Detailer" (singular) is brand-inconsistent and keyword-weak

**Page:** `app/layout.tsx` (line 7), plus `app/services/page.tsx`, `app/journal/page.tsx`

**Problem:**

The Sep 9 "ceramic update" commit changed the layout title from `"Pristine Detailers - Melbourne's Premium Ceramic Coating & PPF"` to `"Pristine Detailer | Melbourne's Paint Protection Specialists"`. Three issues:

1. **Singular "Detailer" vs plural "Detailers"** — The domain is `pristinedetailers.com.au`. The Google Business Profile shows "Pristine Detailers". The layout title now displays "Pristine Detailer" — a different brand name — as the default title across every page that doesn't specify its own. This includes `/booking`, `/gallery`, `/about/careers`, `/about/refer-a-mate`, and `/contact`. AI systems building a knowledge graph of "Pristine Detailers" encounter "Pristine Detailer" as the title of multiple pages — a conflicting entity signal.

2. **"Paint Protection Specialists" loses service keyword coverage** — The prior layout title included "Ceramic Coating & PPF". The current one uses only "Paint Protection Specialists", which is a generic phrase with negligible search volume compared to "ceramic coating Melbourne", "graphene coating Melbourne", or "PPF Melbourne".

3. **Services and journal titles are still keyword-weak** — `"Services - Pristine Detailers"` and `"Journal - Pristine Detailers"` have been flagged since the May brief. Neither has been updated.

**Specific fixes:**

**`app/layout.tsx` line 7** — Update the fallback title:
```tsx
title: "Pristine Detailers | Ceramic Coating, PPF & Window Tinting Melbourne",
```

**`app/services/page.tsx`** — Update title:
```tsx
title: "Car Protection Services Melbourne | Ceramic Coating, Graphene, PPF & Window Tinting | Pristine Detailers",
```

**`app/journal/page.tsx`** — Update title:
```tsx
title: "Car Protection Journal | Ceramic Coating & PPF Guides for Melbourne Drivers | Pristine Detailers",
```

Note on the "detailing" repositioning: the Sep 9 commit deliberately removed "detailing" from Pristine's title tags and descriptions. If this is a deliberate brand decision (positioning as protection specialists, not detailers), it is coherent — but the site currently has zero content ranking for "mobile car detailing Melbourne" or "car detailing Melbourne" replacement queries. The journal articles in the topic bank (window tinting, PPF pricing, ceramic coating guide) need to publish to cover the commercial queries that used to be served by the "detailing" keyword umbrella.

**Time to implement:** 10 minutes.

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "Summer Car Prep Melbourne: Why October Is the Last Clean Window Before UV Season"

**Target queries:** "ceramic coating Melbourne before summer", "car prep before summer Melbourne", "best time for ceramic coating Melbourne", "paint protection before summer Melbourne", "ceramic coating October Melbourne"

**The gap:**

The spring article brief has been rescheduled twice — from August to September, now to October. October is still commercially relevant: it is the final month before Melbourne's UV peak (November–January) and the last clean booking window before 4–6 week delays. The article is not too late — it is exactly on time for the "I should do this before summer" intent that drives October bookings.

Search trend context: "ceramic coating Melbourne" queries spike in October–November as car owners prepare for summer. The brief from Aug 9 and Aug 30 remains structurally correct; only the seasonal framing needs updating.

**New framing:**

- **Title:** "Summer Car Prep in Melbourne: Why October Is the Last Clean Window Before UV Season"
- **Opening 50-word answer block (AI extraction format):** "October is the optimal month to apply ceramic coating in Melbourne. Ambient temperatures of 14–22°C create ideal conditions for nano-ceramic curing, UV intensity is rising but not yet at peak summer levels, and booking availability before the November UV rush means no 4–6 week wait."
- **Sections to include:**
  - What summer UV does to unprotected paint near Port Phillip Bay (UV index context)
  - Why October beats December: availability, curing conditions, pre-season protection
  - Spring-to-summer service sequence: decontaminate winter grime → correct swirls → ceramic coat → PPF on high-impact zones
  - Melbourne suburb risk table: Bayside salt air / Inner East bird drops / CBD car park abrasion
  - FAQ: "Can I get ceramic coating in summer?", "How long until I can wash after coating?", "Do I need paint correction first?"
  - Conversion: book ceramic coating before October 31; Essential membership for ongoing summer wash cadence

**Category:** Ceramic Coating  
**Pass to Jordan:** Publish before October 20 — this is the last week the article captures October search intent before the indexation delay window becomes irrelevant.

---

### Content Idea 2 — "Mobile Window Tinting Melbourne: Legal VLT Limits, Pricing from $200, and How to Book"

**Target queries:** "window tinting Melbourne", "mobile window tinting Melbourne", "car window tinting Melbourne price", "legal window tint Victoria", "VLT window tint Melbourne"

**The gap:**

The window tinting service launched in July — 14 weeks ago. There is zero content on the site targeting the query "window tinting Melbourne" despite it being a live commercial service with a starting price of $200. "Window tinting Melbourne" is a consistently searched local query with strong commercial intent.

The services page lists "Mobile Window Tinting" as a service with a price, but the content is hidden in a JavaScript tab — invisible to Google crawlers and AI systems. There is no indexable page on the site that answers "how much does window tinting cost in Melbourne?" from Pristine's perspective.

**Format for AI extraction:**
- **Opening 50-word answer block:** "Mobile window tinting in Melbourne from $200. Pristine Detailers installs premium UV and heat-blocking film at your home, office, or apartment car park — no shop visit needed. Prices start from $200 for a standard vehicle. Legal VLT in Victoria: front side windows must be ≥35%, rear windows can be any level."
- **Victoria VLT legal limits table:** Window position / Minimum VLT / Notes
- **Mobile process numbered list:** What happens on the day (no garage needed, dust control, cure time)
- **Pricing table:** Vehicle type / Price (from)
- **FAQ block:** "How long does window tinting take?", "Can you tint in an underground car park?", "Does window tinting void car warranty?", "What VLT is legal in Victoria?", "Can I roll down the windows immediately after tinting?"
- Internal link to `/services`

**Category:** Window Tinting  
**Pass to Jordan:** This is the most overdue article on the topic bank — week 14 since service launch. No further delay is justified.

---

## AI Citation Readiness Score

**Score: 3.5 / 10** — unchanged from Aug 30. No structural fixes shipped in the six weeks since.

### Reasoning

The Sep 9 commits made two changes with marginal impact on AI discoverability:

1. **Homepage description update** — from "Melbourne's premium car detailing service. Ceramic coating, paint protection film, obsessive-grade car care, and mobile window tinting. Serving 60+ suburbs." to "Melbourne's premium ceramic coating, graphene coating, and paint protection film specialists, plus mobile window tinting. Serving 60+ suburbs." This is a minor positive: naming all three services explicitly in the meta description gives AI crawlers a cleaner signal. Estimated score impact: +0.1.

2. **Layout title change to "Pristine Detailer"** — Introduces entity name conflict (see Priority 3). Estimated score impact: -0.1.

Net: 0.0 change. Score holds at 3.5/10.

| Signal | Status | Since Aug 30 |
|--------|--------|-------------|
| robots.txt | ❌ Missing | No change — Week 14+ |
| sitemap.xml | ❌ Missing | No change — Week 14+ |
| llms.txt | ❌ Missing | No change — Week 14+ |
| `[SHOP ADDRESS]` in homepage FAQ | ❌ Live | No change — Week 6 |
| PPF price conflict ($2,900 vs $3,000) | ❌ Live | No change |
| Static testimonials (crawler-readable) | ❌ Absent | No change — GHL widget only |
| AggregateRating schema | ❌ Missing | No change |
| FAQPage JSON-LD | ❌ Missing | No change |
| LocalBusiness schema | ❌ Missing | No change |
| Open Graph / Twitter Card tags | ❌ Absent | No change |
| Services pricing (tab-hidden, not crawlable) | ❌ Hidden | No change — Week 14+ |
| Layout title brand mismatch ("Detailer") | 🔴 New regression | Sep 9 commit |
| Homepage description — 3 services named | ✅ Improved | Sep 9 commit |
| Summer/spring article | ❌ Not published | Missed Sep window |
| Window tinting article | ❌ Not published | Week 14+ |
| Gallery link `href="#"` | ❌ Broken | No change |

### What moves the score to 6.0+ this month

| Fix | Score impact | Effort |
|-----|------------|--------|
| `robots.ts` + `sitemap.ts` + `llms.txt` | +0.8 | 60 min |
| Fix `[SHOP ADDRESS]` + PPF price + layout title | +0.5 | 20 min |
| Restore static testimonials above GHL widget | +0.4 | 30 min |
| Add LocalBusiness + AggregateRating schema | +0.5 | 45 min |
| FAQPage JSON-LD | +0.3 | 20 min |
| Summer article (Jordan) | +0.3 | Jordan's task |
| Window tinting article (Jordan) | +0.2 | Jordan's task |

**If the first four items ship this week (2.5 hours dev), score reaches 5.5/10. Add content articles and schema: 6.3/10.**

---

## Quick-Win Topics for Jordan's Topic Bank

Add the following to `jordan-content-writer.md`:

**1. "Summer Car Prep in Melbourne: Why October Is the Last Clean Window Before UV Season"** *(TIME-SENSITIVE — replaces the spring article brief. Publish before October 20. Targets "ceramic coating Melbourne before summer", "best time for ceramic coating Melbourne", "car prep before summer Melbourne". Opening 50-word answer block: "October is the optimal month to apply ceramic coating in Melbourne. Ambient temps of 14–22°C create ideal curing conditions, UV is rising but not yet at peak, and booking availability before the November rush means no 4–6 week wait." Sections: what Melbourne summer UV does to unprotected paint near Port Phillip Bay / why October beats December (availability + curing temps) / spring-to-summer service sequence (decontaminate → correct → coat → PPF on high-impact zones) / Melbourne suburb risk table (Bayside salt air / Inner East bird drops / CBD car park abrasion) / FAQ block / Conversion: book ceramic before October 31, Essential membership for summer wash cadence. Ceramic Coating category. Sam's recent October social posts (spring UV CTA, stone chip CTA) are priming this topic — they need an article URL to drive traffic to.)*

**2. "Mobile Window Tinting Melbourne: Legal VLT Limits, Pricing from $200, and How to Book"** *(OVERDUE — Week 14 since service launch. Targets "window tinting Melbourne", "mobile window tinting Melbourne", "car window tinting Melbourne price", "legal window tint Victoria". Opening 50-word block must include VLT law and mobile differentiator: "Mobile window tinting in Melbourne from $200. Front side windows must be ≥35% VLT under Victorian law; rear windows can be any level. Pristine Detailers installs at your home, office, or apartment car park — no shop drop-off required." Victoria VLT legal limits table. Mobile process numbered list. Pricing table by vehicle type. FAQ: "How long does window tinting take?", "Can you tint in an underground car park?", "Does tinting void car warranty?", "Can I roll down windows immediately?". Internal link to /services. Window Tinting category. Publish this week.)*

---

## Carry-Forward Flags (all still open)

- **Gallery link** (`home.tsx:792`): `href="#"` → `href="/gallery"`. 2 minutes.
- **Open Graph tags** (`app/layout.tsx`): Every social share and WhatsApp preview is broken. 20 minutes.
- **Static testimonials**: Add 3 named customer blocks (Marcus T., Priya S., Dan K.) above `<GHLReviewWidget>` in `ReviewsSection` — crawler-readable proof of quality for AI citation.
- **Services tab-hidden content** (`services.tsx`): `display: none` hides all service pricing panels from crawlers. Pricing is the most cited content type in AI answers for local service queries (~33% citation rate for pricing tables).
- **Email consistency**: Footer says `hello@pristinedetailers.com.au`, contact page says `info@pristinedetailers.com.au` — confirm correct address, align sitewide.
- **`product-marketing-context.md` prices**: Line 22 — PPF still shows $2,900; should be $3,000 (updated July 2026).
- **About page redirect**: `/about` redirects to `/about/reviews` — there is no general about/company page. AI systems asking "where is Pristine Detailers located?" find no address. If the studio address is being kept private, at minimum the about page should carry the suburb and service area in static text.

---

*Next audit: 2026-10-18*

**ESCALATE:** Harshad — October is Melbourne's peak pre-summer booking window for ceramic coating. sitemap + robots + llms.txt have been copy-paste-ready in every brief since July 12 and are still unshipped at Week 14+. The `[SHOP ADDRESS]` placeholder is still live in the homepage FAQ at Week 6. The layout title says "Pristine Detailer" (singular) which is both brand-wrong and keyword-weak. The window tinting article is 14 weeks overdue. Every week these items sit open costs discovery in the highest-intent search month of the year. The combined dev time for the top 3 fixes is under 90 minutes.*
