# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-08-09
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Status: Three Critical Issues Unresolved, One New Price Inconsistency

**What changed since July 26:**

| Item | Status |
|------|--------|
| `[SHOP ADDRESS]` placeholder in homepage FAQ | 🔴 **Still live** — Week 3 unfixed |
| Membership pricing (Essential $99/mo, Signature $149/mo) | 🔴 **Still invisible** — Week 3 unfixed |
| PPF price on services page | ✅ **Fixed** — Now correctly $3,000 (commit `8fe0e7b`, Jul 28) |
| PPF price on homepage (services card + PPF section) | 🔴 **Still $2,900** — now inconsistent with services page |
| Homepage FAQ membership price ($150/month) | 🔴 **Still wrong** — neither tier is $150/month |
| Homepage services preview shows "$150/mo" for Maintenance Detail | 🔴 **Still wrong** — Essential is $99/mo |
| Melbourne section stat widgets (60+ suburbs, 5,000+ cars) | 🟡 **Removed** (Jul 28) — E-E-A-T signal loss |
| `app/sitemap.ts` | ❌ Still missing — **WEEK 9** |
| `app/robots.ts` | ❌ Still missing — **WEEK 9** |
| `public/llms.txt` | ❌ Still missing — **WEEK 9** |
| Services tab-hidden pricing | ❌ Still invisible to crawlers — **WEEK 9** |
| Open Graph / Twitter Card tags | ❌ Still completely absent |
| FAQPage JSON-LD | ❌ Still missing |
| LocalBusiness + AggregateRating schema | ❌ Still missing |
| Title tags: homepage, services, blog | ❌ Still keyword-weak — no fix |
| Gallery link `href="#"` | ❌ Still broken — `home.tsx:776` |
| Email inconsistency (hello@ vs info@) | ❌ footer vs contact page — unresolved |
| Window tinting article (Jordan) | ❌ Still not published — **WEEK 5** since service launch |

---

## Top 3 Priority Issues

---

### Priority 1 — CRITICAL: `[SHOP ADDRESS]` placeholder still live in production (Week 3)

**Page:** `/` (`components/pages/home.tsx`, line 818)

**Problem:**

This unfilled template token has been live on the homepage FAQ for three consecutive weeks. The FAQ answer for "Do you come to my home or office?" currently reads:

```
'Detailing (full detail, ceramic coating, PPF, interior care) is completed at our studio - [SHOP ADDRESS]. The one exception is window tinting, which our mobile team installs at your home or office.'
```

Every customer who taps that FAQ question on mobile sees a broken literal token. Every AI crawler that fetches the homepage FAQ — GPTBot, PerplexityBot, ClaudeBot, Googlebot — reads the same broken text. AI systems asked "where is Pristine Detailers located?" or "does Pristine Detailers come to me?" will either extract the broken placeholder or fail to extract any usable answer.

The FAQ text also contradicts the site's own copy: the Melbourne section directly above says "mobile window tinting brought to your driveway, garage, or office car park." These conflicting signals reduce AI citation confidence for all mobile-service queries.

The business context (`product-marketing-context.md`) defines the service as mobile-first: "we come to you." That is what the FAQ should say.

**Specific fix** (5 minutes):

In `components/pages/home.tsx`, line 818, replace the answer:

```tsx
{ q: 'Do you come to my home or office?', a: 'Yes — our mobile team comes to you. We need access to a tap and a standard power point, plus space roughly two parking bays wide. We operate across 60+ suburbs in East and South East Melbourne. Window tinting is also installed on-site at your location.' },
```

If the business has actually moved to a studio model, fill in the real address, update `product-marketing-context.md`, and rewrite the Melbourne section copy to match. The placeholder cannot remain either way.

**Time to implement:** 5 minutes.

---

### Priority 2 — CRITICAL: Membership pricing invisible sitewide + three wrong prices (Week 3)

**Pages:** `/` and `/services` (`components/pages/home.tsx` lines 235 and 821; `components/pages/services.tsx`)

**Problem:**

Three weeks since the `/membership` redirect to `/services` landed users on a page with zero membership pricing. The situation has not changed: Essential ($99/mo) and Signature ($149/mo) appear nowhere on the live site — not on the services page, not on a membership page, not in any machine-readable form.

Additionally, three homepage prices are wrong against the authoritative source (`product-marketing-context.md`):

| Location | Current copy | Correct copy |
|----------|-------------|--------------|
| `home.tsx:235` — Services preview card | Maintenance Detail: from $150/mo | from $99/mo (Essential) |
| `home.tsx:821` — FAQ answer | "$150/month gets you..." | No tier costs $150/month |
| `home.tsx:237` — Services card | Paint Protection Film: from $2,900 | from $3,000 (updated, services page already fixed) |
| `home.tsx:663` — PPF section | Partial Front: $2,900 | $3,000 (inconsistent with services page) |

The last two also create an internal price inconsistency: the services page now correctly shows PPF at $3,000 (fixed July 28) but the homepage still shows $2,900 in two places. Any AI system comparing the two pages will surface a conflicting price.

**What Melbourne searches now fail completely:**
- "mobile car detailing membership Melbourne" → no page explains pricing
- "Pristine Detailers membership cost" → AI finds no price to cite
- "car detailing subscription Melbourne" → zero relevant content
- "how much does Pristine Detailers membership cost?" → AI citation impossible

**Specific fixes:**

**Step 1 — Fix homepage services card** (`home.tsx:235`, 2 minutes):
```tsx
{ tag: '01', title: 'Maintenance Detail', blurb: 'Monthly wash-and-seal, included with Essential membership.', from: '$99', priceSuffix: '/mo', badge: 'Membership', href: '/services', image: '/images/20250525_093249.jpg' },
```

**Step 2 — Fix homepage FAQ membership answer** (`home.tsx:821`, 3 minutes):
```tsx
{ q: 'What does the membership include?', a: 'Essential ($99/mo) covers a monthly wash-and-seal detail and priority booking. Signature ($149/mo) adds a bi-monthly full detail, ceramic maintenance, and exclusive add-on pricing. Members save up to 35% annually.' },
```

**Step 3 — Fix PPF price on homepage** (`home.tsx:237` and `home.tsx:663`, 5 minutes):
Change both `$2,900` instances to `$3,000`. The services page already shows $3,000 — these are now inconsistent.

**Step 4 — Add membership pricing to `/services`** (30 minutes):
Add a static membership section below the service selector in `services.tsx`. It must render as HTML, not in the tab/selector pattern (which hides content via `display:none`). Copy-ready template was included in the July 26 brief and remains unchanged.

**Time to implement:** 40 minutes total.

---

### Priority 3 — CRITICAL (Week 9, Escalate): No sitemap.ts, robots.ts, or llms.txt

**Page:** Site-wide (`app/`)

**Problem:**

Nine consecutive weeks flagged. Copy-paste-ready code provided in both the July 12 and July 19 briefs. Zero implementation.

The window tinting service has now been live for five weeks. There is still no article and no sitemap to help Google discover it when one is published. Every Jordan article published since May — an estimated 25+ pieces — is being indexed organically at ~4–8 weeks per article rather than within days via sitemap submission. The compounding delay grows every week this ships.

The `llms.txt` absence is now compounded by the membership pricing gap: AI systems have no machine-readable source for Essential ($99/mo) or Signature ($149/mo) pricing, and the homepage FAQ gives them wrong numbers ($150/month) to cite instead.

**Specific fix** — all three files are copy-paste-ready from the July 26 brief (and previous briefs). Reproduced below for reference:

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
    { url: 'https://pristinedetailers.com.au/blog', priority: 0.8 },
    { url: 'https://pristinedetailers.com.au/gallery', priority: 0.6 },
    { url: 'https://pristinedetailers.com.au/booking', priority: 0.8 },
    { url: 'https://pristinedetailers.com.au/contact', priority: 0.5 },
  ].map(p => ({ ...p, changeFrequency: 'monthly' as const }));

  return [...staticPages, ...articles];
}
```

**`public/llms.txt`** (20 minutes):
```
# Pristine Detailers — Melbourne Car Detailing

## About
Pristine Detailers provides professional car detailing, ceramic coating, and paint protection film across Melbourne, Australia. Certified technicians service the customer's home, office, or car park — no workshop drop-off required. Operating since 2020. 4.9-star average across 240+ reviews. 2,400+ cars detailed.

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
```

After deploying, submit `https://pristinedetailers.com.au/sitemap.xml` to Google Search Console immediately.

**Time to implement:** 60 minutes total.

**ESCALATE:** Nine consecutive weeks. This is now materially costing Jordan's content investment. Harshad: every article Jordan publishes adds to a backlog of slow-indexed content because there is no sitemap. The three files take 60 minutes to ship and have been copy-paste-ready since July 12.

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "Spring car care Melbourne: why August and September are the best time to protect your paint" (TIME-SENSITIVE)

**Target queries:** "car detailing Melbourne spring", "best time to get ceramic coating Melbourne", "best time to get PPF Melbourne", "car care after winter Melbourne", "spring car detailing Melbourne"

**The gap:**

Late winter → early spring is the highest-intent detailing window for Melbourne car owners — and the site has zero seasonal content targeting it. Publish this week (Aug 9–13) and it has 6–8 weeks to index before spring search volume peaks in October.

Melbourne's winter (June–August) leaves a specific accumulation pattern on paint: road mineral deposits from wet roads (Punt Road, the Eastern Freeway drainage, car park puddles), bird droppings sitting longer in cold weather without self-cleaning from rain, and Bayside salt air near Port Phillip Bay. By August, the damage is visible — and the fix (wash → paint correction → ceramic coating) directly maps to Pristine's service stack.

Critically, spring is also the optimal coating application window: ambient temps between 10–22°C are ideal for ceramic cure (avoids summer UV cure rush, avoids winter moisture curing issues). An article that explains this timing positions Pristine as the authoritative source for "when should I get a ceramic coating in Melbourne?" — a pre-purchase question every coating customer asks.

**Format for AI extraction:**
- **Opening answer block (50 words):** "The best time to get a ceramic coating in Melbourne is August through September — ambient temperatures of 10–22°C create ideal curing conditions, and treating winter grime before it bonds permanently saves paint correction costs. August also beats the summer booking rush."
- **Winter damage table:** Threat / Why it accumulates in winter / Risk by suburb (Bayside salt air / Inner East bird droppings / CBD car park minerals)
- **Seasonal service guide:** Wash + decontaminate → paint correction (if swirls present) → coating → PPF (if high-impact zones)
- **Why timing matters for ceramic application:** Temperature + humidity effect on nano-ceramic curing
- **Conversion:** Essential membership for spring maintenance cadence; Ceramic + PPF quote for owners with winter damage

**Suggested title:** "Spring Car Care in Melbourne: Why August Is the Best Month to Protect Your Paint"
**Category:** Detailing

**Pass to Jordan:** Yes — add to topic bank at top. TIME-SENSITIVE: publish before August 20 for September indexation benefit.

---

### Content Idea 2 — "Prestige car detailing Melbourne: what BMW, Porsche, Range Rover and Tesla owners need to know"

**Target queries:** "BMW detailing Melbourne", "Porsche paint protection Melbourne", "Range Rover detailing Melbourne", "Tesla ceramic coating Melbourne", "prestige car detailing Melbourne", "luxury car detailing Melbourne"

**The gap:**

BMW, Porsche, Range Rover, Tesla, and Ferrari are explicitly named in the product-marketing-context.md as cars Pristine services — and three testimonials reference specific prestige models (Porsche 911 GT3, Range Rover Sport, Tesla Model S Plaid). Yet there is zero content on the site that targets owners of these vehicles by make.

Brand-named detailing queries ("BMW detailing Melbourne", "Tesla ceramic coating Melbourne") represent some of the highest commercial intent in the local detailing category — people typing these queries already own the car and are actively researching care options. Each search is nearly ready to book.

An article structured with a per-make section (100–120 words each) is independently extractable by AI systems: a user querying Perplexity or ChatGPT with "who does Porsche detailing in Melbourne?" gets the Porsche section cited; a Tesla owner gets the Tesla section. This structure maximises AI coverage across multiple ICP queries from a single piece of content.

**Format for AI extraction:**
- **Opening (50 words):** "Pristine Detailers services prestige cars including Porsche, BMW M-series, Range Rover, Mercedes-AMG, Ferrari, McLaren, Tesla, and Audi across Melbourne. Our certified technicians use manufacturer-approved coatings — GYEON, Gtechniq, Koch-Chemie — with coverage up to 8 years."
- **Per-make sections (~100 words each):** BMW, Porsche, Range Rover, Tesla — include make-specific paint notes (BMW's soft lacquer clear coat, Tesla factory panel gap inconsistency, Porsche GT satin/matte stack)
- **Why prestige cars need specialist care:** dealer wash swirl patterns, soft clear coat sensitivity, factory defect correction
- **Proof points:** Quote Marcus T. (GT3) and Priya S. (Range Rover) — already in product marketing context
- **FAQ:** "Does ceramic coating void my prestige car warranty?", "Can you work on matte paint?", "Do you come to my home or showroom?"

**Suggested title:** "Prestige Car Detailing in Melbourne: What BMW, Porsche, Range Rover and Tesla Owners Need to Know"
**Category:** Detailing

**Pass to Jordan:** Yes — add to topic bank.

---

## AI Citation Readiness Score

**Score: 3.5 / 10** — unchanged from July 26.

### Reasoning

No material fixes shipped since July 26. The PPF price on the services page was corrected ($3,000) — a small positive — but created a new internal inconsistency because the homepage still shows $2,900 in two places. AI systems that compare both pages now encounter conflicting prices for the same service.

One additional regression: the Melbourne section stat widgets ("60+ suburbs", "5,000+ cars detailed", "Instant lead time") were removed in the July 28 commits. These specific numbers earned E-E-A-T credibility — the "5,000+ cars detailed" figure is a verifiable proof point that AI systems use to gauge business legitimacy. The claim still appears in the hero body copy ("helping 5,000+ car owners protect their investment") but the visual stat units being removed from the Melbourne section reduced prominence.

| Signal | Status | Change from Jul 26 |
|--------|--------|---------------------|
| robots.txt | ❌ Missing | **Week 9** |
| sitemap.xml | ❌ Missing | **Week 9** |
| llms.txt | ❌ Missing | **Week 9** |
| `[SHOP ADDRESS]` placeholder in FAQ | ❌ Live in production | Week 3 unfixed |
| Membership pricing on site | ❌ Completely absent | Week 3 unfixed |
| Homepage FAQ membership price | ❌ $150/month (wrong) | Week 3 unfixed |
| Homepage services card membership price | ❌ $150/mo (should be $99) | Week 3 unfixed |
| PPF price — services page | ✅ $3,000 | **Fixed Jul 28** |
| PPF price — homepage (×2) | ❌ $2,900 (inconsistent with services) | New inconsistency |
| Melbourne stat widgets | 🟡 Removed | New regression (Jul 28) |
| FAQPage JSON-LD | ❌ Missing | No change |
| LocalBusiness + AggregateRating schema | ❌ Missing | No change |
| Open Graph / Twitter Card tags | ❌ Completely absent | No change |
| Services pricing (AI-visible, not tab-hidden) | ❌ All 5 panels hidden | Week 9 |
| Title tag: homepage | ❌ No mobile/service keywords | No change |
| Title tag: services page | ❌ "Services - Pristine Detailers" | No change |
| Title tag: journal index | ❌ "Journal - Pristine Detailers" | No change |
| Gallery link `href="#"` | ❌ Still broken | No change |
| Email consistency (hello@ vs info@) | ❌ Footer vs contact page | No change |
| Window tinting article (Jordan) | ❌ Not published | Week 5 since service launch |

### What moves the score to 6.0+ this week

| Fix | Score impact | Effort |
|-----|------------|--------|
| Fix `[SHOP ADDRESS]` placeholder | +0.3 | 5 min |
| Fix 3 wrong homepage prices + restore membership to services page | +0.4 | 40 min |
| `robots.ts` + `sitemap.ts` + `llms.txt` | +0.8 | 60 min |
| LocalBusiness + AggregateRating schema | +0.5 | 45 min |
| Services tab visibility fix | +0.4 | 45 min |
| Title tag rewrites (homepage, services, blog) | +0.3 | 15 min |
| FAQPage JSON-LD | +0.3 | 20 min |

**If the first 3 items ship this week (3 hours dev), score reaches 6.0/10. Without them it stays at 3.5/10 regardless of content published.**

---

## Quick-Win Topics for Jordan's Topic Bank

Add these two to `jordan-content-writer.md` at the top of the topic bank:

**1. "Spring Car Care in Melbourne: Why August Is the Best Month to Protect Your Paint"** *(TIME-SENSITIVE — add to top of bank and write before Aug 20. Targets "car detailing Melbourne spring", "best time to get ceramic coating Melbourne", "car care after winter Melbourne". Opening 50-word AI answer block: "The best time to get a ceramic coating in Melbourne is August through September — ambient temperatures of 10–22°C create ideal curing conditions, and treating winter grime before it bonds permanently saves paint correction costs." Winter damage table: threat / suburb risk / urgency. Seasonal service order: decontaminate → correct → coat → PPF. Why autumn curing beats summer (UV rush + humidity). Conversion to Essential membership and ceramic coating booking. Detailing category.)*

**2. "Prestige Car Detailing in Melbourne: What BMW, Porsche, Range Rover and Tesla Owners Need to Know"** *(Targets "BMW detailing Melbourne", "Porsche paint protection Melbourne", "Tesla ceramic coating Melbourne", "prestige car detailing Melbourne". Per-make sections (~100 words each) independently extractable by AI for brand-specific queries. BMW: soft lacquer clear coat sensitivity. Porsche GT: satin/matte product stack differences. Range Rover: dealership wash swirl pattern history. Tesla: factory panel gap inconsistency and why paint correction is common on delivery. Use Marcus T. (GT3) and Priya S. (Range Rover) testimonials. FAQ: "Does ceramic coating void prestige car warranty?", "Do you come to my home or showroom?", "Can you work on matte paint?". Detailing category.)*

---

## Carry-Forward Flags (all still open)

- **`product-marketing-context.md` needs two updates:**
  1. Line 18: Remove "Basic Detailing: from $150" — service no longer exists
  2. Line 22: Update PPF price from $2,900 → $3,000
- **Gallery link** (`home.tsx:776`): `href="#"` — change to `href="/gallery"`. 2 minutes.
- **Email consistency**: Footer says `hello@pristinedetailers.com.au`, contact page metadata says `info@pristinedetailers.com.au` — confirm correct address, align sitewide.
- **Open Graph tags**: Add to `app/layout.tsx` — every social share and WhatsApp link preview shows a default stub. 20-minute fix.
- **Title tags**: Homepage should include "Mobile Car Detailing Melbourne". Services title should be: "Car Detailing Services Melbourne | Ceramic Coating, PPF & Window Tinting | Pristine Detailers". Blog index: "Car Detailing Journal Melbourne | Pristine Detailers".
- **Services tab-hidden content** (`services.tsx:131`): All 5 service panels hidden from AI crawlers via `display:none`. Week 9.
- **Window tinting article (Jordan)**: Week 5. Window tinting service launched July 6. No content. No sitemap to index it when it's published.

---

*Next audit: 2026-08-16*

**ESCALATE:** Harshad — three identical critical issues for three weeks running. The `[SHOP ADDRESS]` is live today on the homepage FAQ. Membership pricing is invisible on a site whose business model depends on membership conversion. Sitemap + robots + llms.txt is at Week 9 with copy-paste-ready code. Combined fix time: under 2 hours. The window tinting service is now 5 weeks old with no article and no sitemap.*
