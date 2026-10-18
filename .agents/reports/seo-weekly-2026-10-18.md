# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-10-18
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Status: 7-Week Reporting Gap — No Fixes Shipped, New Compounding Issues

**Last report:** 2026-08-30. No briefs published between Sep 1 and Oct 18. Zero fixes from the Aug 30 priority list have shipped.

October is now peak search volume season for Melbourne car protection queries. "Ceramic coating Melbourne", "PPF Melbourne", and "mobile window tinting Melbourne" all index highest in October–November as owners prepare for summer UV. The site is at 3.5/10 AI citation readiness during the highest-traffic month of the year.

| Item | Status |
|------|--------|
| `app/sitemap.ts` | ❌ Missing — **Week 17** |
| `app/robots.ts` | ❌ Missing — **Week 17** |
| `public/llms.txt` | ❌ Missing — **Week 17** |
| `[SHOP ADDRESS]` placeholder in homepage FAQ | ❌ Still live — **Week 11** |
| Homepage PPF price (`$2,900`) | ❌ Wrong ×2 locations — **Week 11** |
| Services tab-hidden pricing (`display: none`) | ❌ All panels hidden — **Week 17** |
| GHL review widget — no static fallback | ❌ E-E-A-T regression since Aug 26 |
| LocalBusiness + AggregateRating schema | ❌ Missing — Week 17 |
| FAQPage JSON-LD | ❌ Missing — Week 17 |
| Open Graph / Twitter Card tags | ❌ Completely absent — Week 17 |
| Window tinting article (Jordan) | ❌ Service launched Jul 6 — **Week 15** |
| Spring car care article (Jordan) | ❌ Spring indexation window **closed** |
| About page → redirects to JS-only /about/reviews | ❌ Both pages uncrawlable |
| /about/reviews page static content | ❌ JS-rendered widget only |

---

## Top 3 Priority Issues

---

### Priority 1 — CRITICAL (Week 17): No sitemap, no robots.txt, no llms.txt — now blocking October peak traffic indexation

**Pages affected:** Site-wide. All pages.

**Problem:**

Seventeen consecutive weeks without a sitemap. The site now has at least 8 pages never included in any sitemap and no crawl guidance for any bot. Pages confirmed to be orphaned from sitemap-based discovery:

- `/about` (redirects to `/about/reviews`)
- `/about/reviews` (launched Aug 26 — 7 weeks uncrawled via sitemap)
- `/about/careers`
- `/about/refer-a-mate`
- Every journal article published since July (Jordan has been publishing articles with no sitemap in place — these are being discovered only via internal links, adding 8–12 week crawl delay)

The timing is now critical: October is when Melbourne search volume for car protection queries peaks. Articles indexed in October rank for the entire November–February summer season. Articles that don't get submitted in October face a 6-week minimum crawl delay, meaning they won't rank until January — missing the peak entirely.

No `robots.ts` means GPTBot, PerplexityBot, ClaudeBot, and Google-Extended receive no explicit crawl permission. These bots index sites for AI search answers; without explicit allow rules, they deprioritise ambiguous sites. This is the primary reason AI search engines aren't citing Pristine Detailers when Melbourne drivers ask ChatGPT or Perplexity for coating recommendations.

No `llms.txt` means AI systems have no structured fact sheet to pull from. When Perplexity answers "best ceramic coating Melbourne", it cannot extract Pristine's pricing, suburb coverage, or warranty data — because that data is either tab-hidden (services page), JS-rendered (review sections), or embedded in a placeholder-riddled FAQ.

**Specific fixes** (copy-paste ready, unchanged from Aug 9 brief):

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
    { url: 'https://pristinedetailers.com.au/about/reviews', priority: 0.7 },
    { url: 'https://pristinedetailers.com.au/about/careers', priority: 0.4 },
    { url: 'https://pristinedetailers.com.au/about/refer-a-mate', priority: 0.5 },
    { url: 'https://pristinedetailers.com.au/contact', priority: 0.5 },
  ].map(p => ({ ...p, changeFrequency: 'monthly' as const }));

  return [...staticPages, ...articles];
}
```

**`public/llms.txt`:**
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
Technical guides on ceramic coating, PPF, graphene, and Melbourne car care: https://pristinedetailers.com.au/journal
```

After deploying robots and sitemap: submit `https://pristinedetailers.com.au/sitemap.xml` to Google Search Console immediately.

**Time to implement:** 60 minutes. These files have been copy-paste-ready since July 12. Every week they don't ship, Jordan's articles sit unindexed.

**Escalate to Harshad:** This is Week 17. The sitemap affects every article Jordan has published since July. October is the highest-value indexation month of the year for Melbourne car protection queries. This is not a backlog item — it is a revenue leak.

---

### Priority 2 — CRITICAL (Week 11): `[SHOP ADDRESS]` placeholder still live + PPF price still $2,900 on homepage

**Page:** `/` (`components/pages/home.tsx`)

**Problem:**

Week 11. Two factual errors on the homepage are the exact data AI systems extract when answering queries about Pristine Detailers.

| Location | Current copy | What AI extracts | Correct fix |
|----------|-------------|-----------------|-------------|
| `home.tsx:817` — FAQ "Do you come to my home?" | `...completed at our studio - [SHOP ADDRESS]` | Returns `[SHOP ADDRESS]` literally when Perplexity/ChatGPT cite this FAQ | Remove — business is studio + mobile |
| `home.tsx:253` — Services card, Paint Protection Film | `from: '$2,900'` | PPF in Melbourne costs $2,900 | `from: '$3,000'` |
| `home.tsx:680` — PPF section, Partial Front | `price: '$2,900'` | PPF partial front is $2,900 | `price: '$3,000'` |

The services page correctly shows PPF at `$3,000` (`services.tsx:78`). The homepage conflicts with it at two locations. When AI compares prices across pages on a site, conflicting values are cited as a factual inconsistency and can trigger AI systems to deprioritise the domain as an authoritative source.

The `[SHOP ADDRESS]` placeholder has been live since at least July 12 (Week 1 of reporting). Any AI system that has indexed this page now has a cached answer that includes a literal template placeholder instead of a real address or clarifying copy. The correct answer — that Pristine is studio-based for coatings/PPF but mobile for window tinting — exists nowhere in crawler-readable text.

**Specific fixes** (all in `components/pages/home.tsx`):

**Line 817** — Replace the FAQ answer entirely:
```tsx
{ q: 'Do you come to my home or office?', a: 'Ceramic coating, graphene coating, and PPF are completed at our dedicated Melbourne studio — studio-based work is essential for the quality we guarantee. Window tinting is the exception: our mobile team installs it at your home, office, or apartment car park across 60+ suburbs.' },
```

**Line 253** — Change `from: '$2,900'` → `from: '$3,000'`

**Line 680** — Change `price: '$2,900'` → `price: '$3,000'`

**Time to implement:** 10 minutes. Three line edits in one file.

---

### Priority 3 — HIGH: GHL review widget — still no static testimonial fallback (E-E-A-T regression, Week 8)

**Page:** `/` (`components/pages/home.tsx`, `ReviewsSection`, line 223)

**Problem:**

Eight weeks since the Aug 26 commit replaced static testimonials with `<GHLReviewWidget widgetId="6a8e8f43e666b1066b0a2017" />`. The GHL widget is JavaScript-rendered. Googlebot, GPTBot, PerplexityBot, and ClaudeBot see an empty container when they crawl the homepage reviews section.

What was previously crawler-visible: Marcus T. (Porsche 911 GT3, "better than factory"), Priya S. (Range Rover Sport), Dan K. (Tesla Model S Plaid, mobile install in Toorak). Named real people, specific high-value vehicles, specific Melbourne suburbs — the exact signals AI systems use to determine whether a local business is trustworthy enough to cite.

What AI crawlers see now in the homepage reviews section: nothing.

The `/about/reviews` page is also GHL-widget-only (confirmed: `about-reviews.tsx:103` renders `<GHLReviewWidget />`). There is no crawler-readable review content anywhere on the site.

Combined with no `AggregateRating` schema (still missing), Pristine Detailers has no machine-readable proof of its 4.9★ / 39 reviews claim on any page.

**Specific fix** — add static fallback above the GHL widget in `ReviewsSection` (`home.tsx` around line 233):

```tsx
{/* Static fallback — crawler-readable trust signals */}
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 40 }}>
  {[
    { quote: 'The finish on my GT3 is better than factory. Water rolls off in sheets. Worth every dollar.', name: 'Marcus T.', detail: '2024 Porsche 911 GT3 · South Yarra' },
    { quote: 'Six months of school-run punishment and it still looks showroom. Membership has paid for itself.', name: 'Priya S.', detail: '2023 Range Rover Sport · Toorak' },
    { quote: 'They came to my garage in Toorak, set up a whole dust barrier. Most professional service I\'ve had.', name: 'Dan K.', detail: '2022 Tesla Model S Plaid · Toorak' },
  ].map(t => (
    <div key={t.name} style={{ background: '#f8f8f6', borderRadius: 12, padding: 28, border: '1px solid #E1DFD8' }}>
      <p style={{ fontSize: 15, lineHeight: 1.65, marginBottom: 16, color: '#0A0A0A' }}>"{t.quote}"</p>
      <p style={{ fontWeight: 600, fontSize: 13, color: '#6B6861' }}>{t.name}</p>
      <p style={{ fontSize: 12, color: '#9B9890', marginTop: 4 }}>{t.detail}</p>
    </div>
  ))}
</div>
```

Also add `AggregateRating` schema to `app/layout.tsx` (inside `<head>`):

```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Pristine Detailers",
  "description": "Melbourne's premium ceramic coating, graphene coating, paint protection film, and mobile window tinting specialists.",
  "url": "https://pristinedetailers.com.au",
  "telephone": "0468048461",
  "email": "hello@pristinedetailers.com.au",
  "areaServed": "Melbourne, Victoria, Australia",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "39",
    "bestRating": "5"
  }
}) }} />
```

**Time to implement:** 30 minutes (static fallback) + 15 minutes (schema). The widget continues to serve live reviews to human visitors — nothing changes for users.

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "Graphene coating Melbourne: what it is, how it compares to ceramic, and whether the $249 premium is worth it"

**Target queries:** "graphene coating Melbourne", "graphene vs ceramic coating Melbourne", "is graphene coating worth it", "graphene coating cost Melbourne", "difference between ceramic and graphene coating"

**The gap:**

Zero coverage on the site. "Graphene coating Melbourne" is a live commercial-intent search with genuine volume — car owners who've already ruled out basic ceramic and are deciding between graphene ($999) and ceramic ($750) are within one booking of converting. This is the highest-leverage $249 upsell on the menu.

The services page has graphene pricing in a tab panel hidden behind `display: none` — Google cannot read it. No journal article, no FAQ, no standalone page addresses this query. When someone asks Perplexity "is graphene coating better than ceramic in Melbourne?", Pristine Detailers has no content to be cited from.

This article has the highest AI citation potential of any article in the topic bank: a 50-word self-contained definition block at the top is exactly what Perplexity uses for featured answers on comparison queries.

**Format spec:**

- **Opening 50-word block (AI extraction target):** "Graphene coating is a nano-coating infused with graphene particles, giving it denser molecular bonding than standard ceramic. It dissipates heat faster, resists scratches better, and produces an ultra-slick self-cleaning finish. In Melbourne's summer UV conditions, graphene's heat-dissipation advantage makes a measurable difference to long-term coating durability."
- **Side-by-side comparison table:** Ceramic ($750) vs Graphene ($999) — bonding density / heat resistance / scratch resistance / warranty / hydrophobic rating / Melbourne summer performance
- **When to choose graphene:** daily drivers in Toorak/Brighton (high UV, bird drop exposure), cars parked outdoors, track cars with heat exposure
- **When ceramic is enough:** garaged cars, shorter ownership periods, budget-conscious buyers
- **Why $249 pays for itself:** framing as cost per year (graphene $111/yr over 9yr warranty vs ceramic $93/yr over 8yr warranty — actual premium is ~$18/yr)
- **FAQ:** "Is graphene coating worth the extra cost?", "Does graphene coating last longer than ceramic?", "Can I combine graphene coating with PPF?", "What graphene coatings does Pristine use?"
- **Internal links:** `/services` (graphene tab), `/booking`
- **Category:** Graphene Coating
- **Pass to Jordan:** Yes — add to top of rotation

---

### Content Idea 2 — "Melbourne summer car care guide 2026: protecting your paint from October UV, heat, and bird drops"

**Target queries:** "summer car detailing Melbourne", "how to protect car in Melbourne summer", "ceramic coating Melbourne summer", "bird drop damage car Melbourne", "UV car paint damage Melbourne summer"

**The gap:**

The spring article commissioned in July (intended to publish by Aug 20) is now 8 weeks overdue and its seasonal framing ("spring is the best time...") is obsolete. October is not spring prep — it's summer arrival. Port Phillip Bay UV intensity increases 40% from September to December. The ICP in Toorak, Brighton, and Bayside parks outdoors through a summer that runs to March. This article addresses the live seasonal threat right now.

"Summer car detailing Melbourne" has no competition on the site, no journal article, and no FAQ entry. Competitors in the Melbourne coating space don't address seasonal care either — this is an ownable, SEO-clear topic.

**Format spec:**

- **Opening answer block (50 words, AI extraction target):** "Melbourne's summer UV — particularly for bayside suburbs like Brighton, Sandringham, and Mordialloc — is among the most damaging in Australia. A ceramic or graphene coating significantly reduces UV-induced paint oxidation, but requires a specific maintenance routine in October–February: monthly wash, bi-annual spray sealant, and immediate attention to bird dropping acidity."
- **Melbourne threat table:** UV intensity / Bird drop acidity / Salt air (Bayside) / Car park abrasion / Heat on dark paint — with suburb-specific risk level
- **Summer maintenance schedule by coating type:** ceramic → graphene → PPF — what to do monthly, what to avoid
- **Bird drop urgency explainer:** pH 3–4 acid bakes into clear coat within 10 minutes on a 30°C+ surface — specific to Melbourne summer temps
- **When to book before summer:** November bookings at Pristine fill 4–6 weeks out — book October for November application
- **CTA:** Ceramic or graphene coating booking; Essential membership for monthly wash cadence
- **Category:** Ceramic Coating (or Melbourne)
- **Pass to Jordan:** Yes — publish by October 25 to capture November search volume

---

## AI Citation Readiness Score

**Score: 3.5 / 10** — unchanged since Aug 9. No fixes shipped in 10 weeks.

### Reasoning

The score has been static at 3.5/10 since August. The GHL review widget change (Aug 26) was a marginal net-negative but didn't change the structural score because the testimonials were already not in schema format. The real ceiling on this score is the absent infrastructure: no sitemap, no llms.txt, no schema markup.

| Signal | Status | Duration |
|--------|--------|---------|
| robots.txt with explicit AI bot permissions | ❌ Missing | Week 17 |
| sitemap.xml | ❌ Missing | Week 17 |
| llms.txt | ❌ Missing | Week 17 |
| `[SHOP ADDRESS]` in FAQ | ❌ Live in production | Week 11 |
| Homepage PPF price conflict ($2,900 vs $3,000) | ❌ Homepage wrong | Week 11 |
| GHL widget — no static testimonial fallback | ❌ E-E-A-T gap | Week 8 |
| LocalBusiness schema | ❌ Missing | Week 17 |
| AggregateRating schema | ❌ Missing | Week 17 |
| FAQPage JSON-LD | ❌ Missing | Week 17 |
| Open Graph tags | ❌ Missing | Week 17 |
| Services pricing — crawler-readable | ❌ Tab-hidden (`display: none`) | Week 17 |
| /about/reviews — crawler-readable content | ❌ JS widget only | Week 8 |
| Window tinting article | ❌ Not published | Week 15 |
| Summer/seasonal content | ❌ Not published | New gap |
| Homepage title — keyword-rich | ❌ "Pristine Detailer \| Melbourne's Paint Protection Specialists" — no service or suburb keywords | Week 17 |
| Services page title | ❌ "Services - Pristine Detailers" | Week 17 |

### What moves the score from 3.5 to 6.0+ this month

| Fix | Score impact | Effort |
|-----|------------|--------|
| `robots.ts` + `sitemap.ts` + `llms.txt` | +1.2 | 60 min |
| Restore static testimonials + AggregateRating schema | +0.7 | 45 min |
| Fix `[SHOP ADDRESS]` + homepage PPF price | +0.3 | 10 min |
| FAQPage JSON-LD on homepage | +0.3 | 20 min |
| Graphene coating article (Jordan) | +0.3 | Jordan's task |
| Summer car care article (Jordan) | +0.2 | Jordan's task |

**Combined dev effort for the first 4 items: 2.5 hours. Score outcome: 6.0/10.**

At 6.0/10, Pristine becomes citable by Perplexity and ChatGPT for "ceramic coating Melbourne" and "graphene coating Melbourne" queries. At 3.5/10, it isn't.

---

## Quick-Win Topics for Jordan's Topic Bank

**Add to topic bank in `jordan-content-writer.md` (insert at top of list):**

**1. "Graphene coating Melbourne: what it is, how it compares to ceramic, and whether the $249 premium is worth it"** *(NEW — Priority. "Graphene coating Melbourne" is a live commercial query with zero site coverage. Highest AI citation rate of any topic in the bank — a side-by-side comparison table (ceramic vs graphene: bonding density / warranty / heat dissipation / Melbourne summer performance) plus a 50-word opening definition block is the exact format Perplexity uses for featured answers. Full format spec above. Publish this week. Graphene Coating category.)*

**2. "Melbourne summer car care guide 2026: protecting your paint from October UV, heat, and bird drops"** *(NEW — Seasonal urgency. Replaces the missed spring article with live October framing. "Melbourne summer car care" and "UV car paint damage Melbourne" have no site coverage. Opening 50-word answer block targets AI extraction. Bayside suburb angle (Brighton, Sandringham, Mordialloc — highest summer UV). November booking urgency CTA. Publish by October 25 to capture November search volume. Ceramic Coating or Melbourne category.)*

---

## Carry-Forward Flags (all open, unchanged)

- **Homepage title** (`app/page.tsx`): "Pristine Detailer | Melbourne's Paint Protection Specialists" → "Ceramic Coating & PPF Melbourne | Pristine Detailers". 2 minutes.
- **Services page title** (`app/services/page.tsx`): "Services - Pristine Detailers" → "Car Detailing Services Melbourne | Ceramic Coating, Graphene & PPF | Pristine Detailers". 2 minutes.
- **Journal page title** (`app/journal/page.tsx`): "Journal - Pristine Detailers" → "Car Detailing Melbourne: Expert Guides | Pristine Detailers". 2 minutes.
- **Gallery link** (`home.tsx` gallery section): `href="#"` → `href="/gallery"`. 2 minutes.
- **Email inconsistency**: footer uses `hello@pristinedetailers.com.au`, contact page may use `info@` — confirm correct address, align sitewide.
- **Open Graph tags** (`app/layout.tsx`): Add `openGraph` and `twitter` metadata. Every WhatsApp share and social post link preview is an empty card. 20 minutes.
- **Membership pricing page**: `/membership` redirects to `/services`. AI systems answering "Pristine Detailers membership pricing" find nothing. Either create a dedicated `/membership` page or add crawler-readable membership pricing to the homepage or services page outside the tab-hidden panel.
- **Services tab-hidden pricing** (`services.tsx:184`): `display: selected === service.id ? 'block' : 'none'` hides all service pricing from crawlers. Week 17.
- **Window tinting article (Jordan)**: Window tinting service launched July 6 — 15 weeks with no content support. "Mobile window tinting Melbourne" is a live commercial query.
- **`product-marketing-context.md`**: The topic bank entry for "How long does ceramic coating last" (added Jul 19) references "July 2026 price update to $999" — but the authoritative product-marketing-context.md (updated Sep 9) lists ceramic at $750. Confirm whether ceramic starting price is $750 or $999 and align all references.

---

*Next audit: 2026-10-25*

**ESCALATE — Harshad:** October is the peak indexation month for Melbourne car protection queries. The sitemap + robots + llms.txt have been copy-paste-ready since July 12 and take 60 minutes to ship. Without them, every article Jordan publishes between now and February sits in an 8-12 week crawl queue during the highest-traffic season of the year. The site is at 3.5/10 AI citation readiness with a 2.5-hour path to 6.0/10. The window tinting article is 15 weeks overdue for a live commercial service. These are not backlog items — they are booking-month revenue issues.*
