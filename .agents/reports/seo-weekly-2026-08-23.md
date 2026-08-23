# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-08-23
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Status: No Material Changes Shipped Since Aug 9. New Critical Issue Discovered.

**What changed since 2026-08-09:**

| Item | Status | Change |
|------|--------|--------|
| `[SHOP ADDRESS]` placeholder in homepage FAQ | 🔴 **Still live** — **Week 4 unfixed** | No change |
| Membership pricing visible on site | 🔴 **Still invisible** — Week 4 unfixed | No change |
| Homepage FAQ membership price ($150/month wrong) | 🔴 **Still wrong** — Week 4 unfixed | No change |
| Homepage services card ($150/mo for Maintenance) | 🔴 **Still wrong** — Week 4 unfixed | No change |
| Homepage PPF price ($2,900 vs services page $3,000) | 🔴 **Still inconsistent** | No change |
| `app/sitemap.ts` | ❌ Missing — **WEEK 10** | No change |
| `app/robots.ts` | ❌ Missing — **WEEK 10** | No change |
| `public/llms.txt` | ❌ Missing — **WEEK 10** | No change |
| Services tab-hidden pricing (`display:none`) | ❌ Still invisible to crawlers — Week 10 | No change |
| Open Graph / Twitter Card tags | ❌ Completely absent | No change |
| FAQPage JSON-LD | ❌ Missing | No change |
| LocalBusiness + AggregateRating schema | ❌ Missing | No change |
| Title tag: homepage (no "mobile" keyword) | ❌ Still weak | No change |
| Title tag: services page ("Services - Pristine Detailers") | ❌ Still weak | No change |
| Gallery link `href="#"` | ❌ `home.tsx:776` | No change |
| Window tinting article (Jordan) | ❌ Not published — **Week 7** since service launch | No change |
| **Duplicate article routes `/journal/[slug]` + `/blog/[slug]`** | 🔴 **NEW — Live duplicate content risk** | **First flagged this week** |

---

## Top 3 Priority Issues

---

### Priority 1 — CRITICAL (NEW): Duplicate article routes at `/journal/[slug]` and `/blog/[slug]`

**Pages:** `app/journal/[slug]/page.tsx` AND `app/blog/[slug]/page.tsx`

**Problem:**

Two separate Next.js routes serve identical article content from the same Supabase query with no canonical coordination:

- `app/blog/[slug]/page.tsx` — the intended canonical URL, uses `createClient` from `@supabase/supabase-js` directly, `revalidate: 300`
- `app/journal/[slug]/page.tsx` — a duplicate route, uses `createClient` from `@/lib/supabase/server`, `revalidate: 3600`

The `/journal` listing page links all articles to `/blog/${slug}` (confirmed in `components/pages/journal.tsx:79`). The article back-link in `journal-article.tsx:122` also points to `/blog`. So the intended canonical is clearly `/blog/[slug]`. But `/journal/[slug]` is live and indexable — there is no redirect, no `noindex`, and no explicit canonical tag in either route's `generateMetadata`.

**What this means in practice:**

1. Google can crawl and index `/journal/is-ceramic-coating-worth-it-melbourne` AND `/blog/is-ceramic-coating-worth-it-melbourne` as separate pages with identical content. Without a declared canonical, Google picks one — often not the one you want.
2. Every internal link (from `/journal` listing, from the article back-link, from the sitemap when it ships) points to `/blog/[slug]`. PageRank signalled via those internal links goes to `/blog/[slug]`. But Google may have already indexed the `/journal/[slug]` version and canonicalised there.
3. Search Console Coverage will show "Duplicate, Google chose different canonical" warnings once volume increases. You lose ranking signal on both URLs rather than consolidating it on one.
4. The inconsistent revalidation (300s vs. 3600s) means the two routes may briefly serve different content if an article is edited — another canonicalization signal Google will penalise.
5. When the sitemap ships (Priority 3 below), it must include only one URL per article — and it must match the canonical declared in the page itself.

**Specific fix (10 minutes):**

In `app/journal/[slug]/page.tsx`, replace the entire file with a redirect:

```tsx
import { redirect } from 'next/navigation';

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/blog/${slug}`);
}
```

This makes `/journal/[slug]` a 307 (temporary) redirect to `/blog/[slug]`, consolidates all PageRank on the canonical URL, and removes the duplicate indexation risk entirely. All existing internal links already point to `/blog/[slug]` so nothing else needs updating.

If Harshad prefers an explicit canonical instead, add this to `generateMetadata` in both files:
```tsx
alternates: { canonical: `https://pristinedetailers.com.au/blog/${slug}` },
```
But the redirect is cleaner.

**Time to implement:** 10 minutes.

---

### Priority 2 — CRITICAL (Week 4 Unresolved): `[SHOP ADDRESS]` placeholder still live in production

**Page:** `/` (`components/pages/home.tsx`, line 819)

**Problem:**

The homepage FAQ answer for "Do you come to my home or office?" still reads:

```
'Detailing (full detail, ceramic coating, PPF, interior care) is completed at our studio - [SHOP ADDRESS]. The one exception is window tinting, which our mobile team installs at your home or office.'
```

This unfilled template token has been live for four consecutive weeks. Every visitor who opens this FAQ sees broken copy. Every AI crawler — GPTBot, PerplexityBot, ClaudeBot, Googlebot — reads it and extracts a meaningless placeholder when answering "is Pristine Detailers mobile?" or "where is Pristine Detailers located?".

The copy also contradicts the brand's own positioning. The Melbourne section says "studio-grade detailing... plus mobile window tinting brought to your driveway, garage, or office car park." The product context defines the business as mobile-first: "we come to you." The FAQ says the opposite.

AI systems detect these conflicts between sections of the same page. Contradiction across sections reduces citation confidence for all mobile-service queries — including "mobile car detailing Melbourne", which is the primary commercial query for this business.

**Specific fix (5 minutes):**

In `components/pages/home.tsx`, line 819, replace the FAQ entry:

```tsx
{ q: 'Do you come to my home or office?', a: 'Yes — our mobile team comes to you. We need access to a tap and a standard power point within 15 metres, plus space roughly two parking bays wide. We operate across 60+ Melbourne suburbs from East Melbourne to Mornington Peninsula. Same-day bookings available by phone.' },
```

If Pristine has moved to a studio-only model: fill in the real address, update `product-marketing-context.md` line 9, and rewrite the Melbourne section copy to remove "mobile window tinting brought to your driveway." The placeholder cannot remain in either scenario.

**Time to implement:** 5 minutes.

---

### Priority 3 — CRITICAL (Week 10, Escalate): No sitemap.ts, robots.ts, or llms.txt

**Pages:** Site-wide (`app/`)

**Problem:**

Ten consecutive weeks flagged. The code from the July 12 and Aug 9 briefs remains unshipped.

The compounding cost is now severe:
- Jordan's window tinting article is **7 weeks overdue** (service launched July 6). When it finally publishes, there is still no sitemap to notify Google — it goes into the same slow-discovery queue as every other article.
- The `/journal/[slug]` duplicate route (Priority 1 above) means Google may currently be indexing the wrong URL for existing articles. When the sitemap ships, it will need to list `/blog/[slug]` — but if Google has already canonicalised to `/journal/[slug]`, fixing it requires both the sitemap AND an explicit canonical. Every week without a sitemap increases the cost of that remediation.
- The `llms.txt` absence means AI systems answering "how much does Pristine Detailers membership cost?" pull from the broken homepage FAQ ($150/month — wrong) rather than a reliable machine-readable source.

All three files are copy-paste-ready from the Aug 9 brief and reproduced below. Combined implementation time: 60 minutes.

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

Note: Do not include `/journal/*` in the sitemap — only `/blog/*`. This reinforces the canonical URL designation from Priority 1.

**`public/llms.txt`** (20 minutes):
```
# Pristine Detailers — Melbourne Car Detailing

## About
Pristine Detailers provides professional car detailing, ceramic coating, and paint protection film across Melbourne, Australia. Certified technicians service the customer's home, office, or car park — no workshop drop-off required. Operating since 2020. 4.9-star average. 2,400+ cars detailed.

## Services and Pricing (excl. GST)
- Maintenance Detail: from $99/mo (Essential membership) — monthly wash + seal
- Revitalise Package: from $385 — full decontamination, two-stage paint correction, 6-month sealant
- Ceramic Coating: from $999 — manufacturer warranty up to 8 years, certified technicians
- Paint Protection Film: from $3,000 (partial front) to $7,900 (full vehicle)
- Mobile Window Tinting: from $200 — installed at your home or office

## Membership
- Essential: $99/month — monthly wash + seal, priority booking, member support
- Signature: $149/month — bi-monthly detail, ceramic maintenance, exclusive add-on pricing (most popular)
- Members save up to 35% annually vs. pay-per-visit

## Service Areas
Toorak, South Yarra, Brighton, Bayside suburbs, St Kilda, Richmond, Hawthorn, Camberwell, Malvern, Kew, Berwick, Doncaster, Dandenong, Mornington Peninsula, and 60+ suburbs across East and South East Melbourne.

## Key Facts
- Mobile service: requires 240V power point and outdoor tap within 15 metres
- Notable cars serviced: Porsche, Ferrari, McLaren, Range Rover, BMW, Mercedes-AMG, Tesla, Audi, BYD, Lotus
- Booking: https://pristinedetailers.com.au/booking
- Contact: hello@pristinedetailers.com.au
```

After deploying, submit `https://pristinedetailers.com.au/sitemap.xml` to Google Search Console immediately.

**ESCALATE — Harshad:** Ten consecutive weeks. The window tinting service is 7 weeks old with no content and no sitemap. Jordan has published an estimated 30+ articles since May; each one is being discovered at organic rate (4–8 weeks) instead of within days. The three files take 60 minutes combined. The code has been copy-paste-ready since July 12.

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "Melbourne summer and your car paint: why UV exposure peaks December–February and what ceramic coating actually does about it"

**Target queries:** "protect car paint Melbourne summer", "UV damage car paint Melbourne", "ceramic coating UV protection Melbourne", "car paint sun damage Melbourne", "best time to get ceramic coating before Melbourne summer"

**The gap:**

It is late August. Melbourne's UV Index climbs above 10 (extreme) in October and peaks in January. Car owners are in the pre-summer purchase window *right now* — the highest-intent period for ceramic coating bookings, before Christmas backlogs lock out summer availability. There is zero content on the site targeting summer UV anxiety or pre-summer paint protection.

The product context names UV near Port Phillip Bay as a specific paint threat. The brand services Bayside suburbs (Brighton, Sandringham, Beaumaris) where reflected UV from the bay accelerates clear coat degradation faster than inland Melbourne. That geographic specificity is both real and differentiating — no generic Melbourne detailer can claim the Bay UV angle authentically.

**Why this beats generic "protect your paint" content:**

Melbourne's UV Index in summer regularly outpaces Sydney and is among the highest in any major southern Australian city due to the proximity to 45°S high-pressure systems and ozone levels. A piece that names Melbourne's specific UV environment with data earns +37–40% AI citation rate over generic protection claims (Princeton GEO study).

**Format for AI extraction:**
- **Opening answer block (50 words):** "In Melbourne, UV radiation peaks between December and February, with the UV Index regularly exceeding 10 — the extreme threshold — near Bayside suburbs. Ceramic coating creates a UV-stable nano-ceramic barrier on clear coat, reducing paint oxidation and fading by blocking UV absorption at the molecular level."
- **Melbourne UV data table:** Month / Average UV Index / Risk to unprotected clear coat / Recommended action
- **Bay suburb section:** Why Brighton, Sandringham, Hampton and Beaumaris see accelerated paint fading — reflected UV from Port Phillip Bay, salt air particulates acting as micro-abrasives that break down clear coat faster
- **What ceramic coating does (mechanism):** UV absorbers in the nano-ceramic matrix, not just gloss — explains the chemistry without jargon
- **Pre-summer booking window:** Why October–November is the optimal application timing (before UV peak, beat the December backlog)
- **Conversion:** Ceramic coating quote CTA; secondary to Essential membership for ongoing UV maintenance wash

**Suggested title:** "Melbourne Summer and Your Car Paint: Why Ceramic Coating Before December Protects You All Season"
**Category:** Ceramic Coating
**Pass to Jordan:** Yes — add to top of topic bank. TIME-SENSITIVE: publish before mid-September to index before pre-summer search volume peaks in October.

---

### Content Idea 2 — "Car park door dings in Melbourne: how PPF on doors, rockers and mirrors stops the damage that's costing you at trade-in"

**Target queries:** "prevent door dings Melbourne", "car park damage paint Melbourne", "PPF door protection Melbourne", "paint protection film doors Melbourne", "stop door dings Melbourne CBD"

**The gap:**

The site already has a topic bank entry for underground car parks and stone chips (Eastern Freeway/Eastlink). This is a different and complementary query cluster: lateral panel damage from car park door swings and trolley contact — the most common source of minor paint damage for inner-city ICP in South Yarra, Richmond, Prahran, and the Melbourne CBD.

Door dings are emotionally charged for owners of $50K–$200K cars. Unlike stone chips (invisible until you're looking for them), a door ding on a Porsche GT or a Range Rover Sport creates an immediate visible dent that the owner feels personally. The search query "prevent door dings Melbourne" is a pure pre-damage protection search — commercial intent, not informational.

PPF coverage on doors, rocker panels and mirrors is an upsell tier that's not prominently explained on the site. The PPF section on the homepage only lists Partial Front / Full Front / Full Vehicle — no mention of door or side panel coverage as a targeted option. An article that names specific Melbourne venues where door dings are most common creates strong geographic entity signals for local AI citation.

**Format for AI extraction:**
- **Opening answer block (55 words):** "Paint Protection Film applied to door panels, rocker panels and wing mirrors physically absorbs impact from car park door swings and shopping trolleys. In Melbourne, the highest-risk venues are multi-storey car parks in South Yarra, Doncaster Westfield, and Crown Casino — where narrow bays and high vehicle density cause the majority of door ding incidents on prestige cars."
- **Melbourne venue risk table:** Car park / Suburb / Risk factor / Why (narrow bays, trolley zones, high-density)
- **PPF coverage options for lateral damage:** Doors / Rockers / Mirrors — what each covers and starting price
- **PPF vs. paint repair comparison:** Cost of one professional door ding repair vs. PPF cost amortised over 5 years
- **ICP-specific framing:** "If you park regularly in South Yarra's underground apartment bays or beneath Crown, the question isn't whether you'll get a door ding — it's when."
- **FAQ block:** "Can PPF stop door dings completely?", "Is PPF worth it just for doors?", "How much does PPF on doors cost in Melbourne?", "Can you see PPF on dark-coloured cars?"
- **Conversion:** PPF consultation CTA; note Partial Front ($3,000) and full-vehicle options

**Suggested title:** "Car Park Door Dings in Melbourne: How PPF on Doors, Rockers and Mirrors Stops the Paint Damage"
**Category:** Paint Protection Film
**Pass to Jordan:** Yes — add to topic bank.

---

## AI Citation Readiness Score

**Score: 3.5 / 10** — unchanged from Aug 9.

No material fixes have shipped since the August 9 brief. The score cannot move without implementation of the infrastructure items (robots, sitemap, llms.txt) or the content fixes (placeholder, pricing, tab-hidden services).

The newly discovered `/journal/[slug]` duplicate route (Priority 1) adds a mild downward pressure: any AI crawlers that indexed articles via the `/journal/` URL now have conflicting canonical signals when they encounter the same content at `/blog/`. This reduces citation confidence on existing articles.

| Signal | Status | Change from Aug 9 |
|--------|--------|-------------------|
| robots.txt | ❌ Missing | Week 10 |
| sitemap.xml | ❌ Missing | Week 10 |
| llms.txt | ❌ Missing | Week 10 |
| Duplicate article routes (`/journal/[slug]`) | 🔴 **New issue** | First flagged Aug 23 |
| `[SHOP ADDRESS]` in FAQ | ❌ Live | Week 4 |
| Membership pricing on site | ❌ Absent | Week 4 |
| Homepage FAQ membership price ($150/mo wrong) | ❌ Wrong | Week 4 |
| Homepage services card price ($150/mo wrong) | ❌ Wrong | Week 4 |
| PPF price inconsistency (home $2,900, services $3,000) | ❌ Inconsistent | No change |
| FAQPage JSON-LD | ❌ Missing | No change |
| LocalBusiness + AggregateRating schema | ❌ Missing | No change |
| Open Graph tags | ❌ Completely absent | No change |
| Services tab-hidden pricing | ❌ Hidden from crawlers | Week 10 |
| Title tag: homepage | ❌ Missing "mobile" keyword | No change |
| Title tag: services page | ❌ Keyword-weak | No change |
| Gallery link `href="#"` | ❌ Broken | No change |
| Article author display | ❌ Field in DB but not rendered | No change |
| Window tinting article | ❌ Unpublished | Week 7 |

### What reaches 5.0/10 this week

| Fix | Score impact | Effort |
|-----|------------|--------|
| Fix `/journal/[slug]` duplicate (redirect) | +0.3 | 10 min |
| Fix `[SHOP ADDRESS]` placeholder | +0.3 | 5 min |
| `robots.ts` + `sitemap.ts` + `llms.txt` | +0.8 | 60 min |

**Those three items = 75 minutes of dev. They move the score from 3.5 to 4.9/10. Without them it stays at 3.5/10 no matter how many articles Jordan publishes.**

---

## Quick-Win Topics for Jordan's Topic Bank

Add these two to `jordan-content-writer.md` at the top of the topic bank:

**1. "Melbourne Summer and Your Car Paint: Why Ceramic Coating Before December Protects You All Season"** *(added by Alex 2026-08-23 — TIME-SENSITIVE, publish before mid-September to index before pre-summer UV search volume peaks in October. Targets "UV damage car paint Melbourne", "ceramic coating UV protection Melbourne", "protect car paint Melbourne summer", "best time to get ceramic coating before Melbourne summer". Opening 50-word AI answer block: "In Melbourne, UV radiation peaks between December and February, with the UV Index regularly exceeding 10 — the extreme threshold — near Bayside suburbs. Ceramic coating creates a UV-stable nano-ceramic barrier on clear coat, reducing paint oxidation and fading by blocking UV absorption at the molecular level." Melbourne UV data table: Month / UV Index / Risk to unprotected clear coat / Action. Bay suburb section: Brighton, Sandringham, Hampton and Beaumaris — reflected UV from Port Phillip Bay plus salt air micro-abrasives. Pre-summer booking window: why October–November beats the December backlog. Mechanism section: UV absorbers in the nano-ceramic matrix (not just gloss). Conversion to ceramic coating quote; secondary to Essential membership. Ceramic Coating category.)*

**2. "Car Park Door Dings in Melbourne: How PPF on Doors, Rockers and Mirrors Stops the Paint Damage"** *(added by Alex 2026-08-23 — targets "prevent door dings Melbourne", "car park damage paint Melbourne", "PPF door protection Melbourne", "paint protection film doors Melbourne". Opening 55-word AI answer block naming specific Melbourne venues: South Yarra underground bays, Doncaster Westfield, Crown Casino. Melbourne venue risk table: car park / suburb / risk factor / why. PPF coverage options: doors / rockers / mirrors — prices and what each covers. PPF vs. paint repair ROI calculation over 5 years. ICP framing: prestige car owners parking in narrow underground bays daily. FAQ: "Can PPF stop door dings completely?", "Is PPF worth it just for doors?", "How much does PPF on doors cost Melbourne?". Pricing note: Partial Front starts at $3,000 (not $2,900). Paint Protection Film category.)*

---

## Carry-Forward Flags (all still open from Aug 9)

- **`product-marketing-context.md` needs two updates:**
  1. Line 18: Remove "Basic Detailing: from $150" — service no longer exists
  2. Line 22: Update PPF price from $2,900 → $3,000
- **Gallery link** (`home.tsx:776`): `href="#"` — change to `href="/gallery"`. 2 minutes.
- **Email consistency**: Footer says `hello@pristinedetailers.com.au`, contact page uses `info@pristinedetailers.com.au` — confirm one address, align sitewide.
- **Open Graph tags**: Add to `app/layout.tsx` — every social share/WhatsApp preview shows a default stub. 20-minute fix.
- **Title tags**: Homepage → "Mobile Car Detailing Melbourne | Ceramic Coating & PPF | Pristine Detailers". Services → "Car Detailing Services Melbourne | Ceramic Coating, PPF & Window Tinting | Pristine Detailers". Blog index → "Car Detailing Journal Melbourne | Pristine Detailers".
- **Services tab-hidden content** (`services.tsx:131`): All 5 panels hidden via `display:none`. Crawlers see no pricing. Week 10.
- **Article author not displayed**: `journal-article.tsx` has `author` in the Post type but doesn't render it. Missing E-E-A-T signal — "written by our technicians" in the journal hero copy goes uncredited in actual articles.
- **Window tinting article (Jordan)**: Week 7. Window tinting has been a live service since July 6 with zero content support and no sitemap to index when published.

---

*Next audit: 2026-08-30*

**ESCALATE — Harshad:** The `/journal/[slug]` duplicate route is new and easy to miss — check it this week before more articles accumulate split PageRank across two URLs. The infrastructure (robots, sitemap, llms.txt) remains at Week 10 with copy-paste-ready code from previous briefs. The `[SHOP ADDRESS]` placeholder is still visible to every person who opens the homepage FAQ. None of these require design work — they're direct code changes with specific fixes provided above.*
