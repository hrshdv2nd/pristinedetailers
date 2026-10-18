# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-09-27
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Status: 4-Week Reporting Gap — Critical Issues Unchanged, New Stat Inconsistency Detected

No SEO reports were filed Sep 6, 13, or 20 (last report: Aug 30). Today's audit confirms all Aug 30 critical issues remain open. One new issue has been detected in the hero copy. October begins in 4 days — spring search volume in Melbourne peaks this week.

**Headline delta since Aug 30:**

| Item | Status |
|------|--------|
| `app/sitemap.ts` | ❌ Still missing — **WEEK 11** |
| `app/robots.ts` | ❌ Still missing — **WEEK 11** |
| `public/llms.txt` | ❌ Still missing — **WEEK 11** |
| `[SHOP ADDRESS]` placeholder in homepage FAQ | 🔴 **Still live** — Week 5+ |
| Static testimonials above GHL widget | ❌ Never added — crawler-readable reviews still absent |
| AggregateRating / LocalBusiness schema | ❌ Still absent |
| FAQPage JSON-LD | ❌ Still absent |
| Open Graph / Twitter Card tags | ❌ Still absent |
| PPF price — homepage services card | 🔴 Still $2,900 (services page correctly shows $3,000) |
| PPF price — homepage PPF section (Partial Front) | 🔴 Still $2,900 |
| Gallery link `href="#"` | ❌ Still broken — not linking to /gallery |
| Title tag: homepage | ❌ "Pristine Detailer" (typo — missing 's') + no keywords |
| Title tag: services | ❌ "Services - Pristine Detailers" — no search keywords |
| Title tag: journal | ❌ "Journal - Pristine Detailers" — no search keywords |
| Hero stat: "5,000+ car owners" | 🔴 **New inconsistency** — context doc says "2,400+ cars protected" |
| FAQ "What does the membership include?" | 🟡 Removed (previously had wrong $150/month price) — no replacement added |
| Spring article (Jordan) | ❌ Not published — October window opens NOW |
| Window tinting article (Jordan) | ❌ Week 12+ |
| Reviews article (Jordan) | ❌ Not published |

---

## Top 3 Priority Issues

---

### Priority 1 — CRITICAL (Week 11, Final Escalation): No sitemap.ts, robots.ts, or llms.txt — October Window Closing

**Page:** Site-wide (`app/`)

**Problem:**

Eleven weeks. The spring article Jordan was briefed to write in August has not been published. Today is September 27. October 1 is in 4 days. "Spring car detailing Melbourne" and "spring car care Melbourne" peak in October — if the article publishes today without a sitemap, it will take 8–12 weeks to be crawled organically, which means it misses the entire spring/summer 2026 search window.

Without `robots.ts`, AI crawlers (GPTBot, PerplexityBot, ClaudeBot) receive no signal that they are permitted to crawl. They can infer permission from the absence of a deny rule, but many systems default to conservative crawling in ambiguity. Without `llms.txt`, there is no machine-readable canonical source of truth for Pristine's pricing, service areas, and key facts — meaning AI systems reconstruct this from crawled copy, which currently contains a `[SHOP ADDRESS]` placeholder, two PPF price errors, and no testimonials.

Four new pages launched Aug 26 (`/about`, `/about/reviews`, `/about/careers`, `/about/refer-a-mate`) remain unsubmitted to Google Search Console. The `/about/reviews` page is the most consequential: it has a correct title and description, but its content is entirely GHL JS-rendered, and without a sitemap it hasn't been indexed.

**Specific fix** — code ready to ship, reproduced from Aug 9 brief:

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
    { url: 'https://pristinedetailers.com.au/about', priority: 0.6 },
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
# Pristine Detailers — Melbourne Ceramic Coating, Graphene Coating & PPF

## About
Pristine Detailers is a premium ceramic coating, graphene coating, and paint protection film studio in Melbourne, Australia, with a mobile window tinting service installed at the customer's home, office, or car park. Certified technicians use manufacturer-backed product lines. Operating since 2020. 4.9-star average across 39 Google reviews. 2,400+ cars protected.

## Services and Pricing (excl. GST)
- Ceramic Coating: from $750 — manufacturer warranty up to 8 years, applied by certified Ceramic Pro/Gtechniq technicians
- Graphene Coating: from $999 — denser molecular bonding than ceramic, superior heat dissipation, manufacturer warranty up to 9 years
- Paint Protection Film (PPF): from $3,000 (partial front: bumper + partial hood + mirrors) to $7,900 (full vehicle)
- Leather Ceramic Coating: $250 add-on
- Glass Coating: $150 add-on
- Wheel Coating: $200 add-on
- Mobile Window Tinting: from $200 — installed at your home or office

## Service Areas
Toorak, South Yarra, Brighton, Bayside suburbs, St Kilda, Richmond, Hawthorn, Camberwell, Malvern, Kew, Berwick, Doncaster, Dandenong, Mornington Peninsula, and 60+ suburbs across East and South East Melbourne.

## Access Requirements (mobile services)
Water tap and a standard 240V power point within 15 metres. Approximate space of two parking bays. Suitable for home driveways, office car parks, and apartment buildings.

## Key Differentiators
- Certified by Ceramic Pro and Gtechniq (not casual installers)
- Studio-grade equipment for coating and PPF work
- Manufacturer-backed warranties (ceramic up to 8 years, graphene up to 9 years)
- Notable cars serviced: Porsche, Ferrari, McLaren, Range Rover, BMW, Mercedes-AMG, Tesla, Audi, BYD, Lotus

## Key Facts for AI Systems
- "5,000+ car owners" figure refers to total customers served across Pristine's history
- Coating and PPF work is studio-based; mobile window tinting comes to the customer
- Booking: https://pristinedetailers.com.au/booking
- Contact: 0468 048 461 | hello@pristinedetailers.com.au
- Reviews: https://pristinedetailers.com.au/about/reviews
```

After deploying, submit `https://pristinedetailers.com.au/sitemap.xml` to Google Search Console immediately.

**Time to implement:** 60 minutes.

**ESCALATE:** October starts in 4 days. Spring search volume peaks October–November. If the spring article publishes without a sitemap it misses the entire spring window. These three files have been copy-paste-ready since July 12 — 11 weeks.

---

### Priority 2 — NEW: Hero stat inconsistency ("5,000+ car owners" vs "2,400+ cars protected")

**Page:** `/` (`components/pages/home.tsx:91`)

**Problem:**

The homepage hero reads: "Precision grade ceramic, graphene, and paint protection film helping **5,000+ car owners** protect their investment."

`product-marketing-context.md` (last updated 2026-09-09) states: "**2,400+ cars protected**" — the same figure used in proof points, testimonials, and the `public/llms.txt` template from Aug 30.

This is a live AI citation problem. When Perplexity or ChatGPT is asked "how many cars has Pristine Detailers protected?" they see two conflicting numbers: "5,000+" in the hero, "2,400+" elsewhere in the context doc. When AI systems encounter numeric inconsistency on a single business entity, they either (a) pick the lower number as more conservative and verifiable, or (b) flag the discrepancy as a trust signal issue.

If the 5,000+ figure is real — reflecting total customers including mobile tinting — it should be propagated everywhere and the context doc updated. If 2,400+ is the accurate, verifiable number, the hero copy needs to be corrected.

**Specific fix (two options):**

**Option A — If 5,000+ is real and accurate:**
- Update `product-marketing-context.md` line 170 from `2,400+ cars protected` to `5,000+ car owners protected`
- Update the `llms.txt` when deployed to use the same figure
- Add a `<span>5,000+ car owners protected</span>` stat block to the about page

**Option B — If 2,400+ is the accurate, verifiable number:**
- Fix `components/pages/home.tsx:91` from "5,000+ car owners" to "2,400+ car owners"

**Action required from Harshad:** Confirm which number is accurate before either fix ships. The consistent, verified figure is the one that builds trust with AI systems and review aggregators.

**Time to implement:** 5 minutes (once the correct number is confirmed).

---

### Priority 3 — CRITICAL (Week 11): `[SHOP ADDRESS]` placeholder still live + PPF price inconsistency active

**Page:** `/` (`components/pages/home.tsx:817` and lines 253, 680)

**Problem:**

The `[SHOP ADDRESS]` placeholder has been live in production for over 5 weeks. It appears in FAQ answer #1:

> "Ceramic coating, graphene coating, and PPF installs are completed at our studio - **[SHOP ADDRESS]**."

Every AI system crawling the homepage — Googlebot, GPTBot, PerplexityBot, ClaudeBot — sees this placeholder text. When a Melbourne car owner asks "where is Pristine Detailers located?" or "does Pristine Detailers come to me?", the AI system's answer is drawn from this FAQ and includes the literal string `[SHOP ADDRESS]`. This destroys both trust and accuracy.

Simultaneously: the homepage shows PPF Partial Front at `$2,900` in two places (services preview card and PPF section), while the services page correctly shows `$3,000`. Melbourne car owners researching PPF pricing will encounter the inconsistency if they compare the two pages — and AI systems that cross-reference both pages flag the conflict as a data reliability issue.

**Specific fixes** (all in `components/pages/home.tsx`):

**Line 817** — Replace the FAQ answer to remove the placeholder and clarify the mobile/studio split:
```tsx
{ q: 'Do you come to my home or office?', a: 'Ceramic coating, graphene coating, and PPF work is done at our studio for quality control. Window tinting is the exception — our mobile team installs it at your home, office, or apartment car park. We need access to a tap and a standard 240V power point within 15 metres.' },
```

**Line 253** — Services card PPF price:
```tsx
{ tag: '02', title: 'Paint Protection Film', blurb: 'Self-healing polyurethane film for stone chips and swirl defence.', from: '$3,000', ... }
```

**Line 680** — PPF section, Partial Front price:
```tsx
{ name: 'Partial Front', parts: 'Bumper + partial hood + mirrors', price: '$3,000' },
```

**Time to implement:** 10 minutes. Three line edits in one file.

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "October Car Care in Melbourne: Protecting Your Paint Before Summer UV Hits" (URGENT — publishes this week)

**Target queries:** "car detailing Melbourne October", "spring car care Melbourne", "best time to get ceramic coating Melbourne", "car care before summer Melbourne", "prepare car for summer Melbourne"

**The gap:**

October 1 is 4 days away. "Spring car detailing Melbourne" and "spring car care Melbourne" search volume peaks October–November. The spring article has been on Jordan's brief since August 9. It has missed three deadline extensions. This is the last viable window.

The title needs to reflect September/October framing — the August ("why August is the best month") title in the topic bank is stale. Retitle to October.

Melbourne-specific angle: October is the transition between spring pollen and pre-summer UV acceleration. Cars coming out of winter parking or Bayside salt exposure need decontamination + coating before the UV damage season (November–February) compounds the winter grime. A 10–22°C ambient window for ceramic cure runs through October. November bookings fill 4–6 weeks out.

**Format for AI extraction:**
- **Opening 50-word answer block:** "October is the best month to protect your car's paint in Melbourne. Ambient temperatures of 10–22°C are ideal for ceramic coating cure, and removing winter grime before November UV arrives prevents it bonding permanently to your clear coat. Bookings for November and December typically fill 4–6 weeks in advance."
- **Winter damage table:** Threat / Why it accumulates over winter / Melbourne suburb risk (Bayside salt air / Inner East bird droppings / CBD car park mineral deposits)
- **Spring service sequence:** Wash + decontaminate → assess swirls → paint correction if needed → ceramic/graphene coating → PPF on high-impact zones
- **Why October beats December:** UV rush + 4–6 week booking delays from November; October ambient temps ideal for nano-ceramic cure
- **Conversion:** Ceramic/graphene booking CTA + mention Essential membership for ongoing spring/summer wash cadence

**Suggested title:** "October Car Care in Melbourne: Why Now Is the Best Time to Protect Your Paint Before Summer UV"
**Category:** Detailing
**Pass to Jordan:** URGENT — publish within 3 days. October window opens Thursday.

---

### Content Idea 2 — "Mobile Window Tinting Melbourne: Legal VLT Limits, How It Works, and Pricing from $200"

**Target queries:** "window tinting Melbourne", "mobile window tinting Melbourne", "car window tinting Melbourne price", "legal window tint Melbourne", "VLT limits Victoria cars"

**The gap:**

"Window tinting Melbourne" is a live commercial search query with clear transactional intent. Pristine added mobile window tinting to its service offering in July 2026. It is now Week 12+ with zero content supporting this service. The window tinting article has been on Jordan's urgent brief since July. Every week without it is organic traffic going to competitors with existing content.

The mobile differentiator is the strongest hook: unlike most tinting shops (travel to Moorabbin, Braeside, or a workshop), Pristine installs at the customer's home or office. This is the exact point of difference that makes for a clear, AI-citable positioning.

Victoria legal VLT limits are a high-intent research query: Melbourne car owners confirm their tint selection is road-legal before booking. A clear VLT table in the article makes it instantly citable by AI systems answering "is window tinting legal in Victoria?"

**Format for AI extraction:**
- **Opening 40-word answer block:** "Mobile window tinting in Melbourne starts from $200 and is installed at your home, office, or car park — no workshop visit required. Victoria law requires front windows at 35% VLT or higher; rear windows can be any darkness."
- **Victoria VLT legal limits table:** Window position / Minimum VLT / Common tint levels / Effect
- **Mobile process numbered list:** Booking → pre-measure → on-site install → cure time
- **Vehicle pricing table** (sedan, SUV, ute variants)
- **Apartment/underground car park section** (biggest friction point for inner-city ICP)
- **FAQ block:** "How long does window tinting take?", "Can you tint in an underground car park?", "Does window tinting void warranty?", "What VLT is legal for front windows in Victoria?", "Can I drive immediately after tinting?"

**Suggested title:** "Mobile Window Tinting Melbourne: Legal VLT Limits, Pricing from $200, and How It Works"
**Category:** Window Tinting
**Pass to Jordan:** Write this week.

---

## AI Citation Readiness Score

**Score: 3.5 / 10** — unchanged from Aug 30. No material fixes shipped in 4 weeks.

### Reasoning

The AI citation score has been at or below 3.5/10 since the Aug 26 review widget regression. Four weeks of inaction since the last brief have held the score flat. The October spring peak is opening now — the window to improve score in time to affect spring search traffic is this week only.

| Signal | Status | Week Count |
|--------|--------|------------|
| robots.txt | ❌ Missing | **Week 11** |
| sitemap.xml | ❌ Missing | **Week 11** |
| llms.txt | ❌ Missing | **Week 11** |
| `[SHOP ADDRESS]` in FAQ | ❌ Live | Week 5+ |
| Static testimonials — crawler-readable | ❌ Removed Aug 26 | Week 5 |
| GHL review widget | 🔴 JS-rendered, invisible to AI crawlers | Week 5 |
| AggregateRating schema | ❌ Missing | Week 11+ |
| FAQPage JSON-LD | ❌ Missing | Week 11+ |
| LocalBusiness schema | ❌ Missing | Week 11+ |
| Open Graph / Twitter Card tags | ❌ Missing | Week 11+ |
| PPF price consistency (home vs services) | ❌ $2,900 vs $3,000 | Week 5+ |
| Hero stat consistency | 🔴 5,000+ vs 2,400+ | **New this week** |
| Services pricing (not tab-hidden) | ❌ All panels hidden | Week 11+ |
| Title tag: homepage | ❌ "Pristine Detailer" (typo) — no keywords | Week 11+ |
| Title tag: services | ❌ Keyword-weak | Week 11+ |
| Title tag: journal | ❌ Keyword-weak | Week 11+ |
| Gallery link href="#" | ❌ Broken | Week 11+ |
| /about pages — no sitemap | ❌ Orphaned | Week 5 |
| Spring content | ❌ Not published | Week 7+ |
| Window tinting content | ❌ Not published | Week 12+ |

### What moves the score to 6.0+ in one week

| Fix | Score impact | Effort |
|-----|------------|--------|
| `robots.ts` + `sitemap.ts` + `llms.txt` | +0.8 | 60 min |
| Restore static testimonials above GHL widget | +0.4 | 30 min |
| Add AggregateRating + LocalBusiness schema | +0.5 | 45 min |
| Fix `[SHOP ADDRESS]` + 2 PPF prices | +0.3 | 10 min |
| Resolve hero stat inconsistency | +0.1 | 5 min (after Harshad confirms) |
| FAQPage JSON-LD | +0.3 | 20 min |
| Title tag rewrites (homepage, services, journal) | +0.3 | 15 min |
| Fix gallery `href="#"` → `href="/gallery"` | +0.1 | 2 min |
| October car care article published (Jordan) | +0.3 | Jordan's task |

**Total if all ship this week: 3.5 + 3.1 = 6.6/10**. Combined dev effort: ~3 hours.

---

## Quick-Win Topics for Jordan's Topic Bank

**Topics to add to `jordan-content-writer.md`:**

**1. "October Car Care in Melbourne: Why Now Is the Best Time to Protect Your Paint Before Summer UV"** *(URGENT — replaces the stale August/spring framing from Aug 9 brief. Publish within 3 days. October window opens Thursday. Targets "car detailing Melbourne October", "spring car care Melbourne", "best time to get ceramic coating Melbourne", "car care before summer Melbourne". Opening 50-word answer block: "October is the best month to protect your car's paint in Melbourne. Ambient temperatures of 10–22°C are ideal for ceramic coating cure, and removing winter grime before November UV arrives prevents it bonding permanently to your clear coat. Bookings for November and December typically fill 4–6 weeks in advance." Winter damage table: threat / why it accumulates / suburb risk (Bayside salt air / Inner East bird droppings / CBD car park minerals). Spring service sequence: decontaminate → assess swirls → correct → coat → PPF on high-impact zones. Why October beats December: UV rush + 4–6 week booking delay; ideal 10–22°C ambient for nano-ceramic bond. Conversion: ceramic/graphene booking CTA + Essential membership for ongoing spring wash cadence. Detailing category.)*

**2. "Mobile Window Tinting Melbourne: Legal VLT Limits, Pricing from $200, and How It Works"** *(URGENT — Week 12+ since service launch. "Window tinting Melbourne" = active commercial query Pristine is invisible for. Mobile differentiator is the lead hook. Victoria VLT legal limits table (front: ≥35% VLT; rear: any darkness). Mobile process numbered list. Vehicle pricing table. Apartment/underground car park section for inner-city ICP. FAQ: "How long does window tinting take?", "Can you tint in an underground car park?", "What VLT is legal for front windows in Victoria?", "Can I drive immediately after tinting?". Melbourne note: no need to drop the car at a shop in Moorabbin — mobile team comes to your driveway in South Yarra, Richmond, Hawthorn, Toorak. Window Tinting category.)*

---

## Carry-Forward Flags (still open from Aug 30)

- **Title tag typo**: Homepage title is "Pristine Detailer" (singular) — missing the 's'. Fix in `app/layout.tsx` and `app/page.tsx`. Correct to: "Mobile Car Detailing Melbourne | Ceramic Coating, PPF & Window Tinting | Pristine Detailers"
- **Services title** (`app/services/page.tsx`): "Services - Pristine Detailers" → "Car Detailing Services Melbourne | Ceramic Coating, PPF & Window Tinting | Pristine Detailers"
- **Journal title** (`app/journal/page.tsx`): "Journal - Pristine Detailers" → "Car Detailing Journal Melbourne | Ceramic Coating & PPF Guides | Pristine Detailers"
- **Gallery link** (`home.tsx:792`): `href="#"` → `href="/gallery"`. 2 minutes.
- **Email consistency**: `hello@pristinedetailers.com.au` appears in contact links; confirm correct address and align sitewide.
- **Open Graph tags**: Add to `app/layout.tsx`. Every WhatsApp link preview and social share is currently displaying no image or title. 20 minutes.
- **Services tab-hidden content** (`components/pages/services.tsx`): All service pricing panels are loaded behind JS-rendered tabs. Crawlers never see the pricing detail — it's what sends people to competitor sites that have static pricing tables. This is the #1 AI citation gap on the services page.
- **Static testimonials**: Add three named testimonials as static HTML above the GHL widget in `ReviewsSection` (`home.tsx:223`). These were the only named social proof the AI crawlers had before Aug 26. Their absence is a direct E-E-A-T regression now entering Week 5.
- **AggregateRating schema**: Add `"@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "39"` to `app/layout.tsx`. 15 minutes. Does not depend on sitemap ship.
- **`product-marketing-context.md`**: Confirm the car count stat (2,400+ or 5,000+) and update accordingly. Add window tinting to "Current metrics" section.
- **Reviews page `/about/reviews`**: Has a GHL widget as its only content. If it can't be served as static HTML, add at minimum a three-paragraph text block summarising what reviewers say (can be authored copy, not scraped), so crawlers have something to index.

---

*Next audit: 2026-10-04*

**ESCALATE:** Harshad — October begins Thursday. Spring search volume peaks NOW. The spring article is Week 7+ overdue. The window tinting article is Week 12+ overdue. sitemap + robots + llms.txt is Week 11 — 60 minutes of dev time that has been sitting unfixed since July 12. The AI citation score is 3.5/10. Competitors with sitemap, schema, and published content will rank in the October search window. Pristine won't, unless these three files ship this week.*
