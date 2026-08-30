# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-08-30
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Status: Critical Issues Enter Week 10 — New Regression Detected in Reviews Section

**What changed since Aug 9:**

| Item | Status |
|------|--------|
| `[SHOP ADDRESS]` placeholder in homepage FAQ | 🔴 **Still live** — Week 4 unfixed |
| Membership pricing (Essential $99/mo, Signature $149/mo) | 🔴 **Still invisible** — Week 4 unfixed |
| Homepage FAQ membership price ($150/month) | 🔴 **Still wrong** — Week 4 unfixed |
| Homepage services card — Maintenance Detail `$150/mo` | 🔴 **Still wrong** — should be $99/mo |
| Homepage PPF price (×2 locations) | 🔴 **Still $2,900** — inconsistent with services page |
| `app/sitemap.ts` | ❌ Missing — **WEEK 10** |
| `app/robots.ts` | ❌ Missing — **WEEK 10** |
| `public/llms.txt` | ❌ Missing — **WEEK 10** |
| Services tab-hidden pricing (display:none) | ❌ All 5 panels still hidden — **WEEK 10** |
| Open Graph / Twitter Card tags | ❌ Completely absent — **WEEK 10** |
| FAQPage JSON-LD | ❌ Missing |
| LocalBusiness + AggregateRating schema | ❌ Missing |
| Title tags: homepage, services, journal | ❌ Still keyword-weak |
| Gallery link `href="#"` | ❌ Still broken |
| Email inconsistency (hello@ vs info@) | ❌ Unresolved |
| Window tinting article (Jordan) | ❌ **WEEK 7 since service launch** — no article, no sitemap |
| Spring car care article (Jordan) | 🔴 **DEADLINE MISSED** — was due Aug 20, still not published |
| TestimonialsSection → GHL ReviewWidget (Aug 26) | 🔴 **New regression** — static testimonials replaced with JS widget |
| New /about page and subpages | 🟡 **New pages, SEO gaps identified** |

---

## Top 3 Priority Issues

---

### Priority 1 — NEW REGRESSION: GHL Review Widget replaces static testimonials (Aug 26 commit `7ed9e7e`)

**Page:** `/` (`components/pages/home.tsx`)

**Problem:**

The Aug 26 "reviews update" commit replaced `<TestimonialsSection />` (static, crawler-readable HTML) with `<ReviewsSection />` rendering `<GHLReviewWidget widgetId="6a8e8f43e666b1066b0a2017" />`. GHL (Go High Level) review widgets are JavaScript-rendered: they load review content dynamically after page execution, which means Googlebot, GPTBot, PerplexityBot, and ClaudeBot receive an empty container when they crawl the homepage.

What was previously crawler-visible:
- Named testimonials (Marcus T. — Porsche 911 GT3, Priya S. — Range Rover Sport, Dan K. — Tesla Model S Plaid)
- Specific car makes and suburbs (Toorak, showroom-quality language)
- Review count and star rating as text

What AI crawlers now see in the reviews section: nothing (JS widget renders empty without executing).

This is a direct E-E-A-T regression. The testimonials in `product-marketing-context.md` are among Pristine's strongest trust signals — named real customers, specific high-value vehicles, specific suburbs. Perplexity and ChatGPT heavily weight "named-person + specific outcome" quotes when deciding whether to cite a local service business as authoritative.

The GHL widget may serve real reviews to human visitors, but it provides zero content to AI crawlers and zero structured data to Google. There is also no `AggregateRating` schema to tell Google "4.9 stars, 39 reviews" — that claim existed only as text on the old static section and is now gone from crawler-readable HTML entirely.

**Specific fix (two options):**

**Option A — Server-side fallback (recommended, 30 minutes):** Render the three named testimonials as static HTML above the GHL widget. The widget can still display live reviews for humans; the static block ensures crawler-readable proof.

```tsx
// Add above <GHLReviewWidget> in ReviewsSection
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 40 }}>
  {[
    { quote: 'The finish on my GT3 is better than factory. Water rolls off in sheets. Worth every dollar.', name: 'Marcus T.', car: '2024 Porsche 911 GT3', suburb: 'South Yarra' },
    { quote: 'Six months of school-run punishment and it still looks showroom. Membership has paid for itself.', name: 'Priya S.', car: '2023 Range Rover Sport', suburb: 'Toorak' },
    { quote: 'They came to my garage in Toorak, set up a whole dust barrier. Most professional service I\'ve had.', name: 'Dan K.', car: '2022 Tesla Model S Plaid', suburb: 'Toorak' },
  ].map(t => (
    <div key={t.name} style={{ background: '#f8f8f6', borderRadius: 12, padding: 28 }}>
      <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 16 }}>"{t.quote}"</p>
      <p style={{ fontWeight: 600, fontSize: 13 }}>{t.name} — {t.car}, {t.suburb}</p>
    </div>
  ))}
</div>
```

**Option B — Add AggregateRating schema immediately** (15 minutes, partial fix): even without restoring static testimonials, inject structured data so Google knows the star rating. Add to `app/layout.tsx`:

```tsx
<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Pristine Detailers",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "39" }
}) }} />
```

Do both. Option B alone does not restore the E-E-A-T content that was removed.

**Time to implement:** 30 minutes (Option A) + 15 minutes (Option B).

---

### Priority 2 — CRITICAL (Week 4): `[SHOP ADDRESS]` placeholder live in production + four wrong prices

**Page:** `/` (`components/pages/home.tsx` lines 252, 254, 680, 818, 821)

**Problem:**

Week 4. The `[SHOP ADDRESS]` placeholder is still live on the homepage FAQ. All five items below remained unfixed through the Aug 26 reviews update commit, despite the file being touched:

| Location | Current copy | Correct copy |
|----------|-------------|--------------|
| `home.tsx:818` — FAQ "Do you come to my home?" | `[SHOP ADDRESS]` placeholder in answer | Remove — business is mobile-first |
| `home.tsx:821` — FAQ "What does the membership include?" | `$150/month gets you...` | Neither tier is $150/month |
| `home.tsx:252` — Services card, Maintenance Detail | `from: '$150'` with `/mo` suffix | `from: '$99'` (Essential membership) |
| `home.tsx:254` — Services card, Paint Protection Film | `from: '$2,900'` | `from: '$3,000'` |
| `home.tsx:680` — PPF section, Partial Front | `'$2,900'` | `'$3,000'` |

All five are in a file the developer opened and committed on Aug 26. None were corrected.

AI systems querying "does Pristine Detailers come to me?" extract the FAQ answer and encounter `[SHOP ADDRESS]`. AI systems querying "how much is Pristine Detailers membership?" extract `$150/month` — a price that does not exist on any tier. AI systems querying "PPF Melbourne" compare the homepage ($2,900) with the services page ($3,000) and encounter a pricing conflict.

**Specific fixes** (all in `components/pages/home.tsx`):

**Line 818** — Replace FAQ answer:
```tsx
{ q: 'Do you come to my home or office?', a: 'Yes — our mobile team comes to you. We need access to a tap and a standard 240V power point within 15 metres, plus space roughly two parking bays wide. We operate across 60+ suburbs in East and South East Melbourne, including home garages, office car parks, and apartment buildings.' },
```

**Line 821** — Replace FAQ membership answer:
```tsx
{ q: 'What does the membership include?', a: 'Essential ($99/mo) covers a monthly wash-and-seal and priority booking. Signature ($149/mo) adds a bi-monthly full detail, ceramic maintenance, and exclusive add-on pricing. Members save up to 35% annually vs. pay-per-visit.' },
```

**Line 252** — Change `from: '$150'` → `from: '$99'`

**Lines 254 and 680** — Change both `$2,900` → `$3,000`

**Time to implement:** 15 minutes. Same file, five line edits.

---

### Priority 3 — CRITICAL (Week 10, Escalate): No sitemap.ts, robots.ts, or llms.txt

**Page:** Site-wide (`app/`)

**Problem:**

Ten consecutive weeks unfixed. Copy-paste-ready code has been in every brief since July 12.

This week there is a new compounding factor: the site now has at minimum four pages that don't exist in any sitemap — `/about`, `/about/reviews`, `/about/careers`, `/about/refer-a-mate` — all launched in the past three weeks with zero Google Search Console submission. These pages are orphaned from Google discovery without a sitemap.

The `/about/reviews` page is particularly significant: it has a reasonable title ("Reviews - Pristine Detailers") and description ("4.9 stars from verified customers. Melbourne's most trusted car detailing service.") — but without a sitemap, it will take 8–12 weeks to be crawled organically, at which point the GHL widget issue (Priority 1) means its content is JS-rendered and uncrawlable anyway.

Jordan's spring car care article (commissioned in August 9 brief, TIME-SENSITIVE deadline of Aug 20 already missed) still hasn't been published. If it publishes today without a sitemap, it faces the same 8–12 week organic crawl delay. Spring search volume in Melbourne peaks in October. The indexation window is closing.

**Specific fix** — all three files reproduced from the Aug 9 brief, updated to include the new `/about` pages:

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

**`app/sitemap.ts`** (30 minutes) — now includes /about pages:
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

**`public/llms.txt`** (20 minutes):
```
# Pristine Detailers — Melbourne Car Detailing

## About
Pristine Detailers provides professional car detailing, ceramic coating, and paint protection film across Melbourne, Australia. Certified technicians service the customer's home, office, or car park — no workshop drop-off required. Operating since 2020. 4.9-star average across 39 reviews. 2,400+ cars detailed.

## Services and Pricing (excl. GST)
- Maintenance Detail: from $99/mo (Essential membership) — monthly wash + seal
- Revitalise Package: from $385 — full decontamination, two-stage paint correction, 6-month sealant
- Ceramic Coating: from $999 — manufacturer warranty up to 8 years, applied by certified technicians
- Paint Protection Film: from $3,000 (partial front) to $7,900 (full vehicle)
- Mobile Window Tinting: from $200 — installed at your home or office

## Membership
- Essential: $99/month — monthly wash + seal, priority booking, member support
- Signature: $149/month — bi-monthly detail, ceramic maintenance, exclusive add-on pricing (most popular)
- Members save up to 35% annually vs. pay-per-visit

## Service Areas
Toorak, South Yarra, Brighton, Bayside suburbs, St Kilda, Richmond, Hawthorn, Camberwell, Malvern, Kew, Berwick, Doncaster, Dandenong, Mornington Peninsula, and 60+ suburbs across East and South East Melbourne.

## Key Facts
- Mobile service: requires access to water and a standard 240V power point within 15 metres
- Notable cars serviced: Porsche, Ferrari, McLaren, Range Rover, BMW, Mercedes-AMG, Tesla, Audi, BYD, Lotus
- Booking: https://pristinedetailers.com.au/booking
- Contact: 0468 048 461 | hello@pristinedetailers.com.au
- Reviews: https://pristinedetailers.com.au/about/reviews
```

After deploying, submit `https://pristinedetailers.com.au/sitemap.xml` to Google Search Console.

**Time to implement:** 60 minutes total.

**ESCALATE — Week 10:** Harshad, the spring article that Jordan was briefed to publish by Aug 20 has not been published. If it publishes today, it won't be indexed before October without a sitemap. Spring search volume in Melbourne peaks in October. Every day this week matters. The three files take 60 minutes to ship and have been copy-paste-ready since July 12.

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "Spring car detailing in Melbourne: what to do in September before summer UV hits" (URGENT — rescheduled from Aug 9)

**Target queries:** "car detailing Melbourne spring", "spring car care Melbourne", "best time to get ceramic coating Melbourne", "car care before summer Melbourne", "september car detailing melbourne"

**The gap:**

The spring article was flagged as TIME-SENSITIVE in the Aug 9 brief with a publish deadline of Aug 20. It is now Aug 30 — 10 days past deadline. This is not an excuse to skip it; it is a reason to publish it immediately. Melbourne spring officially starts September 1. The search queries for "spring car detailing Melbourne" and "spring car care Melbourne" have not peaked yet — they trend in September and October, not August. The article is still in its indexation window if published in the next 7 days.

The title from the Aug 9 brief ("Why August Is the Best Month") is now outdated. Retitle to September framing.

Sam's social posts on Aug 24 (Range Rover paint correction) and Aug 27 (Melbourne spring transition paint timing) are already priming this topic for the audience — the article gives them a destination to link to from future posts. Without it, Sam has no URL to reference.

**Format for AI extraction (unchanged from Aug 9 brief):**
- **Opening answer block (50 words):** "The best time to protect your car's paint in Melbourne is September — ambient temperatures of 10–22°C create ideal conditions for ceramic coating cure, and treating winter grime before spring UV arrives prevents it bonding permanently to your clear coat."
- **Winter damage table:** Threat / Why it accumulates in winter / Risk by Melbourne suburb (Bayside salt air / Inner East bird droppings / CBD car park mineral deposits)
- **Spring service sequence:** Wash + decontaminate → assess swirls → paint correction if needed → ceramic coating → PPF on high-impact zones
- **Why September beats December:** UV rush in November/December = 6-week booking delays; spring ambient temps ideal for nano-ceramic curing
- **Conversion:** Essential membership for ongoing spring/summer wash cadence; ceramic coating enquiry CTA

**Suggested title:** "Spring Car Care in Melbourne: What to Do in September Before Summer UV Arrives"
**Category:** Detailing
**Pass to Jordan:** Publish within 7 days — this window closes by September 14.

---

### Content Idea 2 — "What to check after Pristine Detailers reviews your car: a before-and-after guide"

**Target queries:** "Pristine Detailers reviews", "Pristine Detailers Melbourne reviews", "mobile car detailing Melbourne reviews", "best mobile car detailer Melbourne reviews", "ceramic coating Melbourne reviews"

**The gap:**

The new `/about/reviews` page was launched Aug 26 with a title ("Reviews - Pristine Detailers") and description but no crawlable body content — only a GHL widget (JS-rendered, invisible to crawlers). Currently, a Google search for "Pristine Detailers reviews" returns the homepage, not the reviews page, because the reviews page has zero indexable text.

A journal article targeting brand + "reviews" queries creates a content layer that: (a) ranks for "Pristine Detailers reviews" queries in both Google and AI answers; (b) links to `/about/reviews` with proper anchor text; (c) gives AI systems an extractable, sourced statement about the 4.9★ rating and review count.

Melbourne car owners shopping for detailers explicitly compare reviews. An article titled "What our Melbourne customers say about mobile car detailing" or "4.9 stars across 39 reviews: what Pristine Detailers customers actually care about" extracts the named testimonials (Marcus T., Priya S., Dan K.) into a crawlable format while making the reviews page findable.

**Format for AI extraction:**
- **Opening 50-word block:** "Pristine Detailers holds a 4.9-star rating across 39 verified reviews in Melbourne. Customers consistently cite three outcomes: paint quality matching or exceeding factory finish, the convenience of mobile service at home or office, and the long-term effectiveness of ceramic coating protection."
- **Three named testimonial blocks** (100 words each) — expand each with car-specific context: GT3 paint sensitivity, Range Rover school-run use case, Tesla Model S Plaid mobile setup
- **What the reviews tell you** — pattern analysis: what Melbourne customers actually care about (not what Pristine claims they care about)
- **FAQ:** "Are the reviews from real Melbourne customers?", "What types of cars has Pristine Detailers worked on?", "Does Pristine have Google reviews?"
- Internal link to `/about/reviews`

**Suggested title:** "4.9 Stars: What Melbourne Drivers Say About Pristine Detailers' Mobile Car Detailing"
**Category:** Detailing (or Melbourne)
**Pass to Jordan:** Yes — add to topic bank.

---

## AI Citation Readiness Score

**Score: 3.5 / 10** — unchanged from Aug 9, with a new regression risk.

### Reasoning

No material fixes shipped between Aug 9 and Aug 30. The reviews section update (Aug 26) may have introduced a net-negative AI signal by replacing crawler-readable static testimonials with a JS-rendered widget that AI bots cannot parse. If the GHL widget is the only review content on the homepage, AI systems asking "what do customers say about Pristine Detailers?" now find no answer on the homepage — a regression from the previous state.

| Signal | Status | Change from Aug 9 |
|--------|--------|---------------------|
| robots.txt | ❌ Missing | **Week 10** |
| sitemap.xml | ❌ Missing | **Week 10** |
| llms.txt | ❌ Missing | **Week 10** |
| `[SHOP ADDRESS]` placeholder in FAQ | ❌ Live in production | **Week 4** |
| Membership pricing on site | ❌ Completely absent | **Week 4** |
| Homepage FAQ membership price | ❌ $150/month (wrong) | **Week 4** |
| Homepage services card — Maintenance Detail price | ❌ $150/mo (should be $99) | **Week 4** |
| PPF price — services page | ✅ $3,000 | Fixed Jul 28 |
| PPF price — homepage (×2) | ❌ $2,900 (inconsistent with services) | Unfixed |
| Static testimonials — crawler-readable | 🔴 **Removed Aug 26** | **New regression** |
| GHL review widget | 🔴 JS-rendered, invisible to crawlers | **New regression** |
| AggregateRating schema | ❌ Missing | No change |
| FAQPage JSON-LD | ❌ Missing | No change |
| LocalBusiness schema | ❌ Missing | No change |
| Open Graph / Twitter Card tags | ❌ Completely absent | No change |
| Services pricing (AI-visible, not tab-hidden) | ❌ All 5 panels hidden | **Week 10** |
| Title tag: homepage | ❌ No mobile/service keywords | No change |
| Title tag: services page | ❌ "Services - Pristine Detailers" | No change |
| Title tag: journal index | ❌ "Journal - Pristine Detailers" | No change |
| Gallery link `href="#"` | ❌ Still broken | No change |
| /about page — no sitemap entry | ❌ New orphan | **New this week** |
| /about/reviews — JS-only content | ❌ Uncrawlable | **New this week** |
| Window tinting article | ❌ Not published | **Week 7** |
| Spring car care article | ❌ Not published | Deadline missed |

### What moves the score to 6.0+ this week

| Fix | Score impact | Effort |
|-----|------------|--------|
| Restore static testimonials above GHL widget | +0.4 | 30 min |
| Add AggregateRating + LocalBusiness schema | +0.5 | 45 min |
| Fix `[SHOP ADDRESS]` + 4 homepage prices | +0.3 | 15 min |
| `robots.ts` + `sitemap.ts` + `llms.txt` | +0.8 | 60 min |
| Spring article published (Jordan) | +0.3 | Jordan's task |
| FAQPage JSON-LD | +0.3 | 20 min |
| Title tag rewrites (homepage, services, journal) | +0.3 | 15 min |

**If the first 4 items ship this week (2.5 hours dev), score reaches 5.8/10 — the highest it can reach without content. Spring article tips it to 6.1/10.**

---

## Quick-Win Topics for Jordan's Topic Bank

**Update the topic bank in `jordan-content-writer.md`:**

**1. "Spring Car Care in Melbourne: What to Do in September Before Summer UV Arrives"** *(URGENT — retitled from Aug 9 brief "Why August Is the Best Month..." — that title is now outdated. Publish within 7 days before the September indexation window closes. Targets "car detailing Melbourne spring", "spring car care Melbourne", "best time to get ceramic coating Melbourne", "car care before summer Melbourne". Opening 50-word answer block: "The best time to protect your car's paint in Melbourne is September — ambient temperatures of 10–22°C are ideal for ceramic coating cure, and treating winter grime before spring UV arrives prevents it bonding permanently to your clear coat." Winter damage table: threat / why it accumulates / Melbourne suburb risk (Bayside salt air, Inner East bird droppings, CBD car park minerals). Spring service sequence: decontaminate → assess swirls → correct → ceramic coat → PPF on high-impact zones. Why September beats December: UV rush + 6-week booking delays. Conversion: Essential membership for ongoing wash cadence, ceramic coating CTA. Detailing category. Sam's Aug 27 social post about Melbourne spring transition paint timing is a good hook for a social share once published.)*

**2. "4.9 Stars: What Melbourne Drivers Say About Pristine Detailers' Mobile Car Detailing"** *(New — targets "Pristine Detailers reviews", "mobile car detailing Melbourne reviews", "ceramic coating Melbourne reviews". Opening 50-word block: "Pristine Detailers holds a 4.9-star rating across 39 verified reviews in Melbourne. Customers consistently cite paint quality matching factory finish, the convenience of mobile service at home or office, and the long-term effectiveness of ceramic coating." Expand three named testimonials with car-specific context: Marcus T. (GT3 paint sensitivity and why it's harder to protect than most cars), Priya S. (Range Rover school-run durability proof), Dan K. (Tesla mobile setup in Toorak garage). Pattern analysis of what Melbourne customers actually care about. FAQ: "Are Pristine Detailers reviews verified?", "What car makes has Pristine worked on?", "Does Pristine have Google reviews?". Internal link to /about/reviews. Detailing category.)*

---

## Carry-Forward Flags (all still open)

- **`product-marketing-context.md`**: Line 18 — "Basic Detailing: from $150" service no longer exists. Line 22 — PPF price still shows $2,900; should be $3,000.
- **Gallery link** (`home.tsx:776`): `href="#"` → `href="/gallery"`. 2 minutes.
- **Email consistency**: Footer says `hello@pristinedetailers.com.au`, contact page says `info@pristinedetailers.com.au` — confirm correct address, align sitewide.
- **Open Graph tags**: Add to `app/layout.tsx`. Every social share and WhatsApp link preview is broken. 20 minutes.
- **Title tags**: Homepage → "Mobile Car Detailing Melbourne | Ceramic Coating, PPF & Window Tinting | Pristine Detailers". Services → "Car Detailing Services Melbourne | Ceramic Coating, PPF & Window Tinting | Pristine Detailers". Journal → "Car Detailing Journal Melbourne | Pristine Detailers".
- **Services tab-hidden content** (`services.tsx:131`): `display: none` hides all 5 service pricing panels from crawlers. Week 10.
- **Window tinting article (Jordan)**: Week 7. Window tinting service launched July 6. Still no article.
- **New /about pages**: Add `/about`, `/about/reviews`, `/about/careers`, `/about/refer-a-mate` to sitemap when `app/sitemap.ts` is shipped.
- **AggregateRating schema**: Add to `app/layout.tsx` — 4.9 stars, 39 reviews. 15 minutes. Does not depend on sitemap ship.

---

*Next audit: 2026-09-06*

**ESCALATE:** Harshad — the GHL review widget has removed the only crawler-readable testimonials from the homepage as of Aug 26. The spring article missed its Aug 20 deadline and has a second chance window of 7 days before the September indexation benefit expires. sitemap + robots + llms.txt is at Week 10. The fix list is unchanged and the combined effort is under 3 hours dev time. The score has been 3.5/10 for four weeks and the new reviews regression risks dropping it further.*
