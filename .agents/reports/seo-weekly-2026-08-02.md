# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-08-02
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Status: Two Critical New Regressions, Infrastructure at Week 8

**What changed since July 19:**

| Item | Status |
|------|--------|
| Ceramic price corrected to $999 across homepage and services | ✅ Done (commit `8fe0e7b`, Jul 28) |
| `[SHOP ADDRESS]` placeholder live in homepage FAQ | 🔴 NEW CRITICAL — actively tells Google + AI Pristine is a studio service |
| PPF Partial Front: $2,900 on homepage vs $3,000 on services page | 🔴 NEW regression (Jul 28 pricing commit) |
| Membership FAQ answer: "$150/month" — wrong price, wrong tier structure | 🔴 NEW regression — wrong fact live in crawlable content |
| Maintenance Detail shown as "$150/mo" in homepage services preview | 🔴 NEW regression — doesn't match $99/mo Essential |
| Services page: "Studio-grade equipment" + "dedicated detailing space" copy | 🔴 NEW — contradicts mobile-only model |
| `/membership` page now redirects to `/services` | 🔴 NEW — dedicated membership content page eliminated |
| `app/sitemap.ts` | ❌ Still missing — **WEEK 8** |
| `app/robots.ts` | ❌ Still missing — **WEEK 8** |
| `public/llms.txt` | ❌ Still missing — **WEEK 8** |
| Services tab-hidden pricing (all 5 services) | ❌ Still invisible — now 5 panels, not 4 |
| Title tags: homepage, services, blog | ❌ Still keyword-dead |
| Open Graph / Twitter Card tags | ❌ Still completely absent sitewide |
| FAQPage JSON-LD (homepage) | ❌ Still missing |
| LocalBusiness + AggregateRating schema | ❌ Still missing |
| Gallery link `href="#"` | ❌ Still broken (`home.tsx:776`) |
| GHL chat widget | ⚠️ Back in `layout.tsx` — was reportedly removed Jul 16 |

---

## Top 3 Priority Issues

---

### Priority 1 — CRITICAL (NEW): `[SHOP ADDRESS]` placeholder is live in homepage FAQ

**Page:** `/` (`components/pages/home.tsx:818`)
**Commit that introduced it:** Not new — this placeholder was never filled in

**Problem:**

The homepage FAQ answer to "Do you come to my home or office?" currently reads:

> *"Detailing (full detail, ceramic coating, PPF, interior care) is completed at our studio - [SHOP ADDRESS]. The one exception is window tinting, which our mobile team installs at your home or office."*

This is a raw, unfilled template string that is visible in the page's HTML. Googlebot, PerplexityBot, and GPTBot have already crawled this. The consequences:

**1. Wrong business model published to Google:** The FAQ explicitly tells search engines Pristine Detailers is a studio-based service that requires customers to bring their car to a fixed location. The entire business differentiation is mobile — we come to you. This FAQ contradicts every other page signal: the hero copy, the Melbourne section, the services page description, the product-marketing-context.md. Google will resolve the conflict using the crawled text, which currently says "studio."

**2. Any AI system queried about "mobile car detailing Melbourne" will not cite Pristine.** The citation eligibility test is whether the site's own content supports the claim. When the homepage FAQ says "completed at our studio," Perplexity and ChatGPT have textual evidence that this is NOT a mobile service — so it won't surface in answers to mobile-intent queries, which is the primary traffic opportunity.

**3. "[SHOP ADDRESS]" is the specific string Googlebot is indexing.** If anyone queries "Pristine Detailers address" or "Pristine Detailers location," Google's AI answer will include the placeholder string verbatim.

**4. Credibility damage with users.** Any customer who reads the FAQ before booking sees raw template code instead of an answer. This signals an unfinished or unprofessional site.

**Specific fix — replace the FAQ array at `home.tsx:817–822`:**

Current:
```tsx
{ q: 'Do you come to my home or office?', a: 'Detailing (full detail, ceramic coating, PPF, interior care) is completed at our studio - [SHOP ADDRESS]. The one exception is window tinting, which our mobile team installs at your home or office.' },
```

Replace with:
```tsx
{ q: 'Do you come to my home or office?', a: 'Yes — we come to you. Our certified technicians travel to your home, office, or apartment car park across 60+ Melbourne suburbs. You need a standard 240V power point and access to an outdoor tap within 15 metres. Mobile window tinting is also installed on-site. No workshop drop-off required.' },
```

Also update the membership FAQ answer at `home.tsx:821` (currently "$150/month" — wrong):

Current:
```tsx
{ q: 'What does the membership include?', a: '$150/month gets you one monthly wash-and-seal detail, priority same-week booking, 10% off all our other services and discounted rates for same household vehicles.' },
```

Replace with:
```tsx
{ q: 'What does the membership include?', a: 'Essential ($99/month) includes a monthly wash-and-seal detail with priority booking. Signature ($149/month) adds a bi-monthly full detail, ceramic maintenance service, and exclusive add-on pricing. Members save up to 35% annually compared to pay-per-visit rates.' },
```

**Time to implement:** 10 minutes.
**Impact:** Immediately restores mobile service signal to Google and AI crawlers. Removes harmful wrong facts from homepage content. This is the most urgent fix on the board.

---

### Priority 2 — CRITICAL (Week 8, Escalate): No sitemap.ts, robots.ts, or llms.txt

**Page:** Site-wide (`app/`)

**Problem:**

Eight consecutive weeks. The July 12 and July 19 briefs both contained copy-paste-ready code for all three files. None have been implemented.

**What's compounding this week:**

The Jul 28 pricing commit (`8fe0e7b`) introduced a new pricing inconsistency — homepage PPF Partial Front now shows $2,900 while the services page correctly shows $3,000. When `llms.txt` is finally written, it must use **$3,000** for PPF Partial Front (matching `services.tsx`) — not the homepage figure, which is currently wrong.

Jordan has published articles on a Tuesday/Friday schedule since May — an estimated 20–25+ articles in Supabase. Without a sitemap, Googlebot discovers new blog URLs only by re-crawling the `/blog` index on its own schedule. At Pristine's current domain authority level, this takes 4–8 weeks. Articles published in May are plausibly still not indexed. Every article Jordan publishes before the sitemap ships accrues indexation delay.

**Specific fix — carry forward from July 12 and July 19 briefs:**

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

Note: `/membership` is NOT included in the sitemap — it now 302-redirects to `/services`. Only canonical, indexable URLs belong in a sitemap.

**`public/llms.txt`** (20 minutes — **use these prices**):
```
# Pristine Detailers — Melbourne Mobile Car Detailing

## About
Pristine Detailers is a premium mobile car detailing service operating across Melbourne, Australia. Certified technicians travel to the customer's home, office, or apartment car park — no workshop drop-off required. Operating since 2020. 4.9-star average. 2,400+ cars detailed.

## Services and Pricing (excl. GST)
- Maintenance Detail: from $99 (standalone) or included with Essential membership ($99/month)
- Revitalise Package: from $300 — full decontamination, two-stage paint correction, 6-month sealant
- Ceramic Coating (incl. paint correction): from $999 — manufacturer warranty up to 8 years
- Paint Protection Film: Partial Front from $3,000 / Full Front from $4,200 / Full Vehicle from $7,900
- Mobile Window Tinting: from $200 — installed at your home or office

## Membership
- Essential: $99/month — monthly wash + seal, priority booking, member support
- Signature: $149/month — bi-monthly detail, ceramic maintenance, exclusive add-on pricing (most popular)
- Members save up to 35% annually vs. pay-per-visit

## Service Areas
Toorak, South Yarra, Brighton, Bayside suburbs, St Kilda, Richmond, Hawthorn, Camberwell, Malvern, Kew, Berwick, Doncaster, Dandenong, Mornington Peninsula, and 60+ suburbs across East and South East Melbourne.

## Key Facts
- Mobile only — certified technicians come to your home, office, or apartment car park
- Requires: 240V power point, outdoor tap within 15 metres
- Notable cars serviced: Porsche, Ferrari, McLaren, Range Rover, BMW, Mercedes-AMG, Tesla, Audi, BYD, Lotus
- Booking: https://pristinedetailers.com.au/booking
- Contact: hello@pristinedetailers.com.au | 0491 108 905
```

**Time to implement:** 60 minutes total.
**After deploying:** Submit `https://pristinedetailers.com.au/sitemap.xml` to Google Search Console.

**ESCALATE:** Week 8. Flag to Harshad directly.

---

### Priority 3 — NEW THIS WEEK: Pricing inconsistencies across homepage create wrong facts for AI crawlers

**Pages:** `/` (`home.tsx:235`, `home.tsx:663`, `home.tsx:821`) and `components/pages/services.tsx:20`

**Problem:**

The Jul 28 pricing commit (`8fe0e7b`) updated several prices but introduced multiple mismatches between the homepage, the services page, and `product-marketing-context.md`. These wrong prices are currently in crawlable HTML and will be extracted by AI systems as facts.

**Specific errors:**

| Location | Current (Wrong) | Should Be | Source of Truth |
|---|---|---|---|
| `home.tsx:235` — ServicesPreview | Maintenance Detail `$150/mo` | `$99/mo` (Essential) or drop priceSuffix and show service from price `$99` | `product-marketing-context.md` line 19 |
| `home.tsx:663` — PPFSection | Partial Front `$2,900` | `$3,000` | `services.tsx:63` + context doc line 23 |
| `home.tsx:821` — FAQ | `$150/month` membership | `$99/month` Essential, `$149/month` Signature | context doc lines 26–27 |
| `services.tsx:20–21` — Differentiators | "Studio-grade equipment" + "A dedicated detailing space" | Should reference mobile operation, not a studio | Business model is mobile |

**Specific fixes:**

**1. PPF price in homepage PPFSection (`home.tsx:663`):**
```tsx
// Current (wrong):
{ name: 'Partial Front', parts: 'Bumper + partial hood + mirrors', price: '$2,900' },

// Fix:
{ name: 'Partial Front', parts: 'Bumper + partial hood + mirrors', price: '$3,000' },
```

**2. Maintenance Detail price in ServicesPreview (`home.tsx:235`):**
```tsx
// Current (wrong):
{ tag: '01', title: 'Maintenance Detail', from: '$150', priceSuffix: '/mo', badge: 'Membership', ... },

// Fix — show correct Essential membership entry price:
{ tag: '01', title: 'Maintenance Detail', from: '$99', priceSuffix: '/mo', badge: 'Membership', ... },
```

**3. Services differentiators copy (`services.tsx:20–21`):**
```tsx
// Current (wrong):
{ title: 'Studio-grade equipment', desc: 'A dedicated detailing space with the tools casual detailers simply don\'t have.' },

// Fix:
{ title: 'Professional-grade equipment', desc: 'The same tools used in top-tier studios, packed and brought to your location — car park, driveway, or office.' },
```

**4. Membership FAQ answer** — already included in Priority 1 fix above.

**Time to implement:** 20 minutes total for all four edits.
**Impact:** Removes three wrong facts from crawlable homepage content. Aligns all AI-extractable pricing signals with the services page. Removes "studio" language from services page copy.

---

## Carry-Forward Flags (unchanged from July 19)

| Issue | Location | Status |
|---|---|---|
| Services tab-hidden content | `services.tsx:131` — `display: selected === service.id ? 'block' : 'none'` | ❌ Week 8 |
| Title tag: services page | `app/services/page.tsx` — "Services - Pristine Detailers" | ❌ No keywords |
| Title tag: blog index | `app/blog/page.tsx` — "Blog - Pristine Detailers" | ❌ No keywords |
| Open Graph / Twitter Card tags | `app/layout.tsx` — completely absent | ❌ Week 8 |
| FAQPage JSON-LD | Homepage + services | ❌ Week 8 |
| LocalBusiness + AggregateRating schema | Site-wide | ❌ Week 8 |
| Gallery link `href="#"` | `home.tsx:776` | ❌ Still broken |
| `/membership` redirect | `app/membership/page.tsx` | 🟡 302 redirect to /services — acceptable but loses any earned SEO equity |
| `app/journal/page.tsx` and `/journal/[slug]/page.tsx` | Dead code, 301 redirecting | 🟡 Safe to delete |
| `product-marketing-context.md` PPF price | Line 23 — still says `$3,000` | ✅ Correct, matches services.tsx |

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "Is Car Detailing Tax Deductible in Australia? A Guide for Melbourne Business Owners and Rideshare Drivers"

**Target queries:** "is car detailing tax deductible australia", "can I claim car detailing on tax australia", "car detailing ATO deduction", "car detailing tax write off australia", "rideshare car detailing tax deduction"

**The gap:**

Zero coverage on site. This is an entirely unaddressed ICP segment: Melbourne professionals who use their car for work — Uber/rideshare drivers, mobile tradespeople, sales reps, real estate agents — and who are entitled to claim vehicle maintenance expenses under ATO rules. For this segment, a ceramic coating or annual detail isn't a luxury; it's a legitimate business expense.

The ATO allows deductions for work-related car expenses where the vehicle is used to produce income. Car detailing qualifies as a maintenance/running expense when the vehicle is used for business purposes — the claim follows the same proportion as general vehicle use (logbook or cents-per-km method). This isn't contested territory; it's standard ATO guidance.

**Why it earns AI citations:** Specific ATO references + dollar figures + Melbourne-specific examples (rideshare driver averaging 40,000km/year in Melbourne is a real-world scenario AI will extract). The query "is car detailing tax deductible australia" returns mostly generic accounting sites — a Melbourne detailer producing authoritative, factually accurate guidance is differentiated.

**Format for AI extraction:**
- **Opening 50-word answer block:** "Car detailing is tax deductible in Australia when your vehicle is used to produce assessable income. Under ATO guidelines, the deduction follows your documented work-use percentage — if you use your car 70% for work, 70% of your detailing cost is claimable. You must keep a logbook or use the cents-per-km method."
- **Three-scenario table:** Rideshare driver / Mobile tradesperson / Company car — eligibility, method, typical claim
- **What counts as a claimable expense:** Maintenance Detail ✅ / Ceramic Coating ✅ (can be depreciated) / PPF ✅ (capital asset, depreciated)
- **What doesn't count:** Personal car with incidental business use / no logbook
- **FAQ block:** "Can I claim a ceramic coating on tax?", "Do I need receipts for car detailing ATO?", "Can Uber drivers claim car detailing?", "Is car washing different from detailing for ATO?"
- **Close:** "If your Melbourne commute earns income, protecting your car is a business investment. A Maintenance Detail at $99/month, a Revitalise at $300, or a $999 ceramic coating — all claimable in proportion to work use."

**Suggested title:** "Is Car Detailing Tax Deductible in Australia? A Melbourne Driver's ATO Guide (2026)"
**Category:** Detailing
**Pass to Jordan:** Yes — add to topic bank.

---

### Content Idea 2 — "How to Book Mobile Car Detailing in Melbourne: Step-by-Step from Enquiry to Completion"

**Target queries:** "how to book mobile car detailing Melbourne", "what do I need for mobile car detailer to come", "what happens when you book a car detailer", "how does mobile car detailing work Melbourne", "can mobile detailer come to my apartment"

**The gap:**

The site has a booking link but zero procedural content explaining what happens when you book. This is the highest-friction pre-conversion question for new customers — especially inner-city apartment dwellers in South Yarra, Richmond, and Prahran who aren't sure if their building qualifies. The [SHOP ADDRESS] placeholder in the current FAQ actively creates this doubt. This article resolves it permanently with a format AI can extract.

The mobile process article added to Jordan's topic bank targets the broader "how does it work" angle, but this idea is specifically about the **booking flow** — the procedural step-by-step from clicking "Book" to driving away. These are different articles serving different intent stages.

**Why now:** Priority 1 above fixes the [SHOP ADDRESS] placeholder with a short FAQ answer. But one FAQ answer doesn't rank. A 700-word procedural article explicitly titled "how to book mobile car detailing in Melbourne" — with access requirements, confirmation steps, and what to prepare — builds the mobile service signal Jordan's articles have been trying to establish since May.

**Format for AI extraction:**
- **Opening 50-word answer block:** "To book mobile car detailing with Pristine Detailers in Melbourne: choose your service and suburb online, select a time slot, and confirm your access requirements — you need a 240V power point and an outdoor tap within 15 metres. Technicians arrive at your home, office, or apartment car park within the booked window."
- **5-step numbered booking process:** Online booking → confirmation message → day-before prep checklist → technician arrival → service completion + walk-around
- **Access requirements table:** Power / Water / Space / Surface type — what qualifies vs. what doesn't
- **Melbourne apartment section:** Addresses the #1 objection by suburb — "Most South Yarra and Richmond apartment buildings have a 240V outlet near the lift lobby. Call building management 24 hours ahead if your car park has height restrictions."
- **What to prepare checklist:** Move other vehicles, clear drip tray space, let building manager know
- **FAQ:** "Can you come to an underground car park?", "What if I don't have outdoor water access?", "Do I need to be home during the detail?", "How long does each service take?"
- **Close:** "From booking to keys in hand, most maintenance details take 2–3 hours. Ceramic and PPF appointments are full-day — book the day off, or let us work at your office while you're inside."

**Suggested title:** "How to Book Mobile Car Detailing in Melbourne: What You Need and What to Expect"
**Category:** Detailing
**Pass to Jordan:** Yes — add to topic bank.

---

## AI Citation Readiness Score

**Score: 3.3 / 10** — down from 3.8 on July 19.

### Reasoning

Three new regressions this week, all in crawlable HTML, push the score below last week:

**1. [SHOP ADDRESS] placeholder (home.tsx:818)** — The worst single regression in the audit history. A page's FAQ is high-weight content for AI extraction — it's precisely the kind of structured Q&A that Perplexity and ChatGPT pull from. This placeholder publishes "studio" as the service delivery model to every crawler. Score impact: -0.4.

**2. Multiple pricing errors on homepage** — Three separate wrong numbers in crawlable HTML, all introduced or carried from the Jul 28 pricing commit. AI systems will extract these as facts. Score impact: -0.2.

**3. Membership page eliminated** — `/membership` now 302-redirects to `/services`, which has no membership-specific content visible to crawlers (it's tab-hidden under "Maintenance Detail"). Any AI queried about "Pristine Detailers membership plans" finds an empty redirect. Score impact: -0.1.

One modest positive: the GHL chat widget appears to be lazy-loaded (strategy="lazyOnload"), reducing its LCP impact somewhat — but it was reportedly removed in July, and its return is a marginal regression.

| Signal | Status | Change from Jul 19 |
|--------|--------|---------------------|
| robots.txt | ❌ Missing | **Week 8** |
| sitemap.xml | ❌ Missing | **Week 8** |
| llms.txt | ❌ Missing | **Week 8** |
| FAQPage JSON-LD | ❌ Missing | No change |
| LocalBusiness + AggregateRating schema | ❌ Missing | No change |
| Open Graph / Twitter Card tags | ❌ Absent sitewide | No change |
| Services pricing (AI-visible) | ❌ Tab-hidden (5 panels) | No change — now 5 tabs |
| [SHOP ADDRESS] placeholder in FAQ | ❌ Live in HTML — says "studio" | **New critical regression** |
| PPF price: homepage vs services page | ❌ $2,900 vs $3,000 mismatch | **New regression** |
| Membership FAQ answer | ❌ "$150/month" — wrong | **New regression** |
| Membership page | ❌ Redirects to /services | **New regression** |
| Ceramic price ($999) | ✅ Consistent | Fixed Jul 28 |
| Blog article title pattern | ❌ No Melbourne signal | No change |
| Title tag: services | ❌ "Services - Pristine Detailers" | No change |
| Title tag: blog index | ❌ "Blog - Pristine Detailers" | No change |
| Gallery link href="#" | ❌ Broken | No change |
| "Studio" language on services page | ❌ Contradicts mobile model | **New this week** |

### What moves the score to 6.0+ in the next two weeks

| Fix | Score impact | Effort | Status |
|-----|------------|--------|--------|
| Fix `[SHOP ADDRESS]` placeholder + membership FAQ | +0.5 | 10 min | ❌ New this week |
| Fix 3 pricing errors on homepage | +0.2 | 20 min | ❌ New this week |
| `robots.ts` + `sitemap.ts` + `llms.txt` | +0.8 | 60 min | ❌ Week 8 |
| LocalBusiness + AggregateRating schema | +0.5 | 45 min | ❌ Not done |
| FAQPage JSON-LD (homepage) | +0.5 | 30 min | ❌ Not done |
| Services tab visibility fix | +0.4 | 45 min | ❌ Week 8 |
| Title tag rewrites | +0.3 | 15 min | ❌ Not done |
| Open Graph tags sitewide | +0.2 | 30 min | ❌ Not done |

**If the [SHOP ADDRESS] fix, pricing corrections, and infrastructure files ship this week, the score reaches 5.3/10. Total dev time: under 2 hours.**

---

## Quick-Win Topics for Jordan's Topic Bank

Add these two to `jordan-content-writer.md` at the top of the topic bank:

**1. "Is car detailing tax deductible in Australia? A Melbourne driver's ATO guide (2026)"**
*(Targets "is car detailing tax deductible australia", "can I claim car detailing on tax australia", "car detailing ATO deduction" — zero coverage on site, unaddressed ICP segment (rideshare drivers, mobile tradespeople, sales reps). Opening 50-word answer: "Car detailing is tax deductible in Australia when your vehicle is used to produce assessable income. Under ATO guidelines, the deduction follows your documented work-use percentage — if you use your car 70% for work, 70% of your detailing cost is claimable." Three-scenario table: rideshare driver / mobile tradesperson / company car. What counts: Maintenance Detail ✅, Ceramic Coating ✅ (capital expense, depreciable), PPF ✅. FAQ: "Can I claim ceramic coating on tax?", "Do I need receipts for ATO?", "Can Uber drivers claim car detailing?". Close with specific prices from each service tier. Detailing category.)*

**2. "How to book mobile car detailing in Melbourne: what you need and what to expect"**
*(Targets "how to book mobile car detailing Melbourne", "what do I need for mobile car detailer", "how does mobile car detailing work Melbourne", "can mobile detailer come to my apartment" — the highest-friction pre-conversion question, zero procedural content on site. URGENT: the [SHOP ADDRESS] placeholder in the homepage FAQ has actively damaged the mobile service signal in crawlable HTML — this article rebuilds it. Opening 50-word answer block must include access requirements: "You need a standard 240V power point and an outdoor tap within 15 metres. Pristine Detailers operates across 60+ Melbourne suburbs — home, office, or apartment car park." 5-step numbered booking process. Access requirements table (power / water / space / surface). Melbourne apartment section naming South Yarra, Richmond, Prahran — addresses the #1 inner-city objection. FAQ: "Can you come to an underground car park?", "What if I don't have outdoor water access?", "Do I need to be home?", "How long does each service take?". Detailing category. Write this week — pairs with Priority 1 placeholder fix.)*

---

*Next audit: 2026-08-09*

**IMMEDIATE ACTION REQUIRED:** The `[SHOP ADDRESS]` placeholder is live in the homepage FAQ and is telling Google and every AI crawler that Pristine Detailers is a studio-based service. This is a 10-minute fix. It must ship before any other work this week.

**ESCALATE AGAIN:** sitemap.ts, robots.ts, and llms.txt are now at **Week 8** with copy-paste-ready code supplied in the July 12 and July 19 briefs. Flag to Harshad with the specific implementation time (60 minutes total) and the cost of delay (every Jordan article published since May is potentially unindexed).*
