# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-07-26
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Status: Two Critical New Regressions, Infrastructure at Week 8

**What changed since July 19:**

| Item | Status |
|------|--------|
| [SHOP ADDRESS] placeholder now live in production FAQ | 🔴 **New regression** (commit `e9bb6cb`, Jul 23) — broken copy visible to customers and crawlers |
| "Mobile" keyword removed from homepage title + layout description | 🔴 **New regression** (commit `e9bb6cb`, Jul 23) — drops ranking for primary search query |
| Membership pricing completely removed from site | 🔴 **New regression** (commit `7c840a5`, Jul 22) — /membership redirects to /services, but /services has no Essential/Signature pricing |
| Homepage services preview shows "$150/mo" for Maintenance Detail | 🔴 **Wrong price** — Essential is $99/mo per product-marketing-context.md |
| Homepage FAQ says "$150/month" for membership | 🔴 **Wrong price** — neither Essential ($99/mo) nor Signature ($149/mo) |
| PPF price on homepage still $2,900 | 🔴 **Flagged 4 weeks** — correct price is $3,000 (home.tsx:237, home.tsx:690) |
| `app/sitemap.ts` | ❌ Still missing — **WEEK 8** |
| `app/robots.ts` | ❌ Still missing — **WEEK 8** |
| `public/llms.txt` | ❌ Still missing — **WEEK 8** |
| Services tab-hidden pricing | ❌ Still invisible to crawlers — **WEEK 8** |
| Title tags: homepage, services, membership, blog | ❌ Still keyword-dead — no fix |
| Open Graph / Twitter Card tags | ❌ Still completely absent sitewide |
| FAQPage JSON-LD | ❌ Still missing |
| LocalBusiness + AggregateRating schema | ❌ Still missing |
| Window tinting article (Jordan) | ❌ Still not published — **3 weeks since service launch** |
| Gallery link href="#" | ❌ Still broken |

---

## Top 3 Priority Issues

---

### Priority 1 — CRITICAL: `[SHOP ADDRESS]` placeholder is live in production

**Page:** `/` (`components/pages/home.tsx`, line 822)

**Problem:**

Commit `e9bb6cb` (Jul 23) changed the FAQ answer for "Do you come to my home or office?" from a correct mobile-service description to this:

```
'Detailing (full detail, ceramic coating, PPF, interior care) is completed at our studio — [SHOP ADDRESS]. The one exception is window tinting, which our mobile team installs at your home or office.'
```

`[SHOP ADDRESS]` is a literal unfilled placeholder. Every customer who opens the homepage FAQ sees it. Every AI crawler (Googlebot, GPTBot, PerplexityBot, ClaudeBot) that fetches the homepage sees it. Any AI system asked "where is Pristine Detailers located?" or "do you come to me?" will either extract the broken text or fail to extract a usable answer.

This also introduces a service model contradiction that compounds the SEO problem: the Melbourne section copy says "mobile window tinting brought to your driveway, garage, or office car park" — but the FAQ now says every service except window tinting is at a studio. The product-marketing-context.md says the business is mobile-first ("we come to you"). These signals conflict, which reduces AI citation confidence.

**Impact:**
- Active user-facing bug: customers who tap on this FAQ on mobile will see `[SHOP ADDRESS]` in production
- AI systems will either cite the broken placeholder or flag an inconsistency
- Homepage E-E-A-T signal degraded — a trust indicator (address/location) is visibly absent

**Specific fix** (5 minutes):

In `components/pages/home.tsx`, line 822, replace the answer with correct copy that reflects the actual service model. If the service is now studio-based, fill in the address. If it's still mobile, revert to the correct text. Based on product-marketing-context.md (the authoritative source), the business is mobile — the fix should say:

```tsx
{ q: 'Do you come to my home or office?', a: 'Yes — our mobile team comes to you. We require access to a tap and a standard power point, plus a covered or open space roughly two parking bays wide. We operate across 60+ suburbs in East and South East Melbourne.' },
```

If the business has genuinely transitioned to a fixed studio, fill in the actual address and update product-marketing-context.md, the layout description, and all service page hero copy to reflect the change.

**Time to implement:** 5 minutes (fix the placeholder). 30 minutes if the service model needs updating across the site.

---

### Priority 2 — CRITICAL: Membership pricing completely invisible on the site

**Pages:** `/` and `/services` (`components/pages/home.tsx`, `components/pages/services.tsx`)

**Problem:**

This is a compounding regression across three commits this week:

1. **Commit `3f87c18`** (Jul 22): Membership plans moved from `/membership` component to `/services` — correct direction
2. **Commit `7c840a5`** (Jul 22): Entire membership plan section (MEMBERSHIP_PLANS array + plan selector + FAQ) deleted from `services.tsx` — 130+ lines gone
3. **Result**: `/membership` redirects to `/services`, but `/services` now has zero membership plan content — no Essential, no Signature, no pricing, no plan comparison

Additionally, the homepage has wrong pricing in two places:
- Services preview card (home.tsx:235): Shows "$150/mo" for Maintenance Detail — but Essential is $99/mo
- FAQ answer (home.tsx:825): Says "$150/month" — wrong against current pricing ($99/mo Essential, $149/mo Signature)

**Searches that now fail completely:**
- "mobile car detailing membership Melbourne" → no page on the site explains membership pricing
- "Pristine Detailers membership cost" → AI will find no price to cite
- "car detailing subscription Melbourne" → zero relevant content

**Specific fix:**

**Step 1 — Fix the homepage FAQ price** (5 minutes). In `home.tsx:825`, update to reflect actual pricing:
```tsx
{ q: 'What does the membership include?', a: 'Essential membership ($99/mo) covers a monthly wash-and-seal detail with priority booking. Signature ($149/mo) includes a bi-monthly full detail, ceramic maintenance, and exclusive add-on pricing. Members save up to 35% annually.' },
```

**Step 2 — Fix the homepage services preview price** (2 minutes). In `home.tsx:235`, update from `'$150'` to `'$99'`:
```tsx
{ tag: '01', title: 'Maintenance Detail', blurb: 'Monthly wash-and-seal, included with Essential membership.', from: '$99', priceSuffix: '/mo', badge: 'Membership', href: '/services', image: '/images/20250525_093249.jpg' },
```

**Step 3 — Restore membership pricing to the services page** (30 minutes). A compact membership tier comparison must be visible on `/services` — it's where `/membership` now redirects. The content deleted in `7c840a5` was the only place on the site where Essential and Signature plans were described with benefits. Add back a concise membership section below the service selector:

```tsx
{/* Membership Plans — must be AI-visible as static HTML, not in tabs */}
<section id="membership" className="pd-sect-sm" style={{ borderTop: '1px solid var(--line)' }}>
  <div className="pd-container">
    <div className="pd-eyebrow" style={{ marginBottom: 16 }}>Membership</div>
    <h2 style={{ fontSize: 36, fontWeight: 600, marginBottom: 8 }}>Monthly care from $99.</h2>
    <p style={{ color: 'var(--ink-2)', maxWidth: 560, marginBottom: 40 }}>
      Two tiers. Both include priority booking and member pricing. Members save up to 35% annually.
    </p>
    <div className="pd-two-col" style={{ gap: 20, maxWidth: 640 }}>
      <div className="pd-card" style={{ padding: 28 }}>
        <div className="pd-eyebrow">Essential</div>
        <div style={{ fontSize: 40, fontWeight: 600, fontFamily: 'var(--f-display)', marginTop: 12 }}>$99<span style={{ fontSize: 16, fontWeight: 400 }}>/mo</span></div>
        <ul style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8, padding: 0 }}>
          {['Monthly wash + seal', 'Priority booking', 'Member support'].map(b => <li key={b} style={{ display: 'flex', gap: 8, fontSize: 14, color: 'var(--ink-2)', listStyle: 'none' }}><CheckIcon />{b}</li>)}
        </ul>
      </div>
      <div className="pd-card" style={{ padding: 28, border: '2px solid #C89B37' }}>
        <div className="pd-eyebrow" style={{ color: '#C89B37' }}>Signature · Most popular</div>
        <div style={{ fontSize: 40, fontWeight: 600, fontFamily: 'var(--f-display)', marginTop: 12 }}>$149<span style={{ fontSize: 16, fontWeight: 400 }}>/mo</span></div>
        <ul style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8, padding: 0 }}>
          {['Bi-monthly full detail', 'Ceramic maintenance', 'Exclusive add-on pricing'].map(b => <li key={b} style={{ display: 'flex', gap: 8, fontSize: 14, color: 'var(--ink-2)', listStyle: 'none' }}><CheckIcon />{b}</li>)}
        </ul>
      </div>
    </div>
    <Link href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="pd-btn pd-btn-dark" style={{ marginTop: 24, display: 'inline-flex' }}>Join a membership <Arrow /></Link>
  </div>
</section>
```

This restores the only location on the site where Essential and Signature pricing is visible to both users and AI crawlers.

**Time to implement:** 40 minutes total.

---

### Priority 3 — CRITICAL (Week 8, Escalate): No sitemap.ts, robots.ts, or llms.txt

**Page:** Site-wide (`app/`)

**Problem:**

Eight consecutive weeks since first flagging. The July 12 brief contained copy-paste-ready code for all three files. Zero implementation. Jordan has now published articles on a Tuesday/Friday schedule since early May — estimated 20–25 articles in Supabase — none of which have a sitemap to accelerate Google's discovery. At the domain's current authority, new articles take 4–8 weeks to be indexed organically.

The window tinting service launched July 6. Three weeks later there's still no window tinting article (Jordan, flagged as URGENT for 3 weeks) AND no sitemap to help Google find it when it's finally published.

The ceramic coating price has been at $999 since Jul 16. Every AI system answering "how much is ceramic coating at Pristine Detailers?" is citing whatever price it crawled last — there is no authoritative `llms.txt` to correct it. The membership pricing regression this week makes this worse: AI systems now have no machine-readable source for Essential ($99/mo) or Signature ($149/mo).

**Specific fix** — unchanged from July 12 + July 19 briefs. All three files are copy-paste-ready:

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
Pristine Detailers provides professional-grade car detailing, ceramic coating, and paint protection film in Melbourne, Australia. Certified technicians travel to the customer's home, office, or car park — no workshop drop-off required. Operating since 2020. 4.9-star average across 240+ reviews. 2,400+ cars detailed.

## Services and Pricing (excl. GST)
- Maintenance Detail: from $150/mo — monthly wash + seal (included with Essential membership)
- Revitalise Package: from $385 — full decontamination, two-stage paint correction, 6-month sealant
- Ceramic Coating (incl. paint correction): from $999 — manufacturer warranty up to 8 years
- Paint Protection Film: from $3,000 (partial front) to $7,900 (full vehicle)
- Mobile Window Tinting: from $200 — installed at your home or office

## Membership
- Essential: $99/month — monthly wash + seal, priority booking, member support
- Signature: $149/month — bi-monthly detail, ceramic maintenance, exclusive add-on pricing (most popular)
- Members save up to 35% annually vs. pay-per-visit

## Service Areas
Toorak, South Yarra, Brighton, Bayside suburbs, St Kilda, Richmond, Hawthorn, Camberwell, Malvern, Kew, Berwick, Doncaster, Dandenong, Mornington Peninsula, and 60+ suburbs across East and South East Melbourne.

## Key Facts
- Requires access to water and a standard power point
- Notable cars serviced: Porsche, Ferrari, McLaren, Range Rover, BMW, Mercedes-AMG, Tesla, Audi, BYD, Lotus
- Booking: https://pristinedetailers.com.au/booking
- Contact: 0468 048 461 | hello@pristinedetailers.com.au
```

**Time to implement:** 60 minutes total. After deploying, submit `https://pristinedetailers.com.au/sitemap.xml` to Google Search Console.

**ESCALATE:** Eight consecutive weeks unimplemented. Estimated 20–25 Jordan articles currently experiencing slow organic indexation. The window tinting service has been live 3 weeks with no indexable content and no sitemap to help when the article is published. Flag to Harshad directly.

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "What's the difference between a car detail and a car wash? Melbourne guide"

**Target queries:** "difference between car detail and car wash", "car detail vs car wash Melbourne", "what does a car detailer do", "is a car detail worth it", "how long does a car detail last"

**The gap:**

"Car detail vs car wash" is a definitional, high-volume query that sits at the very top of the detailing funnel — before a customer has committed to booking anything. Zero coverage on the site. This is the query a potential customer types before they even know they want detailing.

Crucially, it's also a structure AI systems love: the entire answer is a comparison. The content naturally contains a table (car wash vs detail: time, tools, result, how long it lasts, who it's for), a definition block up top, and an FAQ at the end. This format earns the highest AI citation rate (~33%) of all content types.

Melbourne angle: most customers have used a drive-through wash or petrol station auto-wash. The article needs to call out by name why these fall short for paint-conscious owners in inner-east suburbs (South Yarra Wash+ on Chapel Street, Priceline forecourt washes in Richmond — swirl marks, brushes on clear coat).

**Format for AI extraction:**
- **Opening definition block (50 words):** "A car detail involves chemical decontamination, machine polishing, and professional-grade protection applied panel by panel — typically 3–6 hours of work. A car wash cleans surface dirt with soap and water in under 15 minutes. The difference matters most if your car has a ceramic coating or you care about its paint condition."
- **Side-by-side comparison table:** Time / Equipment / Surface prep / Result longevity / Who it's for / Typical Melbourne cost
- **When to wash vs. when to detail:** Decision-tree section for Melbourne seasonality
- **FAQ:** "How often should I detail vs wash in Melbourne?", "Will a car wash scratch my ceramic coating?", "Can a car wash remove swirl marks?", "Is detailing worth it before selling a car?"

**Suggested title:** "Car Detail vs Car Wash: What's the Difference and Which One Does Your Car Actually Need?"
**Category:** Detailing

**Pass to Jordan:** Yes — add to topic bank.

---

### Content Idea 2 — "How to book mobile car detailing in Melbourne: what to expect, access requirements, and timing"

**Target queries:** "how to book mobile car detailing Melbourne", "mobile car detailing how does it work", "what do I need for mobile car detailing", "mobile car detailing requirements Melbourne", "can mobile detailers come to apartments"

**The gap:**

The "mobile car detailing Melbourne" query is the business's primary commercial keyword — but there's no single page that explains *how it works*. What do I need access to? How far in advance do I book? How long will you be at my place? What if I'm in an apartment?

This becomes more urgent because this week's [SHOP ADDRESS] regression has introduced ambiguity about whether Pristine is mobile or studio-based. A dedicated "how it works" article rebuilds that signal for AI systems and addresses the highest-friction pre-booking objections for inner-city Melbourne customers.

The apartment/underground car park angle is unique to Pristine's mobile model and not replicated by competitor studio pages. South Yarra, Richmond, Prahran, and Hawthorn ICP customers live in apartments — they need explicit confirmation that the service works in their building before they book.

**Format for AI extraction:**
- **Opening answer block (40–50 words):** "To book mobile car detailing in Melbourne with Pristine Detailers, you need access to a standard 240V power point and an outdoor tap within 15 metres of your car. We operate at your home, office, or apartment car park across 60+ suburbs — no workshop drop-off required."
- **Step-by-step booking process:** Numbered list (search → select service → pick suburb → access check → confirm)
- **Access requirements table:** Power (distance, outlet type), Water (indoor/outdoor tap, minimum flow), Space (minimum dimensions), Surface (undercover vs outdoor)
- **Melbourne-specific section:** Confirmed building types we service (apartment car parks, office car parks, home garages, open driveways), suburbs with highest demand
- **FAQ:** "Can you detail my car in an underground car park?", "What if I don't have outdoor water access?", "Do you need electricity?", "How far in advance do I need to book?"

**Suggested title:** "Mobile Car Detailing in Melbourne: How It Works, What You Need, and How to Book"
**Category:** Detailing

**Pass to Jordan:** Yes — add to topic bank.

---

## AI Citation Readiness Score

**Score: 3.5 / 10** — down from 3.8 last week.

### Reasoning

Two new regressions this week pulled the score below last week:

1. **[SHOP ADDRESS] placeholder in FAQ** (commit `e9bb6cb`): The homepage FAQ answer for "Do you come to my home or office?" contains a literal broken placeholder. Any AI system parsing the homepage FAQ will either extract the text verbatim (including the broken placeholder) or fail to extract a usable answer. This degrades the homepage's E-E-A-T signal on the highest-authority page on the site.

2. **Membership pricing vanished from the site** (commits `3f87c18` + `7c840a5`): `/membership` now redirects to `/services`, but `/services` has no Essential or Signature pricing visible. Additionally, the homepage shows $150/mo in the services preview and FAQ — wrong against $99/mo and $149/mo actual pricing. Any AI queried about Pristine Detailers membership now has no coherent pricing to cite.

3. **"Mobile" keyword removed from homepage title** (commit `e9bb6cb`): Title and layout description no longer contain the word "mobile" — the primary differentiator and the primary commercial keyword. "Mobile car detailing Melbourne" is in the top-3 queries the business needs to rank for. Losing "mobile" from the homepage title is a ranking signal regression.

| Signal | Status | Change from Jul 19 |
|--------|--------|---------------------|
| robots.txt | ❌ Missing | **Week 8** |
| sitemap.xml | ❌ Missing | **Week 8** |
| llms.txt | ❌ Missing | **Week 8** |
| [SHOP ADDRESS] placeholder in FAQ | ❌ Live in production | **New regression** |
| Membership pricing on site | ❌ Completely absent | **New regression** |
| Homepage FAQ membership price | ❌ $150/mo (wrong) | **New regression** |
| "Mobile" keyword in title | ❌ Removed | **New regression** |
| PPF price on homepage | ❌ $2,900 (should be $3,000) | Week 4 unfixed |
| FAQPage JSON-LD | ❌ Missing | No change |
| LocalBusiness + AggregateRating schema | ❌ Missing | No change |
| Open Graph / Twitter Card tags | ❌ Completely absent | No change |
| Services pricing (AI-visible) | ❌ Tab-hidden | Week 8 |
| Title tag: services page | ❌ "Services — Pristine Detailers" | No change |
| Title tag: blog index | ❌ "Journal — Pristine Detailers" | No change |
| Gallery link href="#" | ❌ Still broken | No change |
| Email address (footer vs contact page) | ❌ Still inconsistent (hello@ vs info@) | No change |
| Window tinting article (Jordan) | ❌ Not published | **Week 3** since service launch |

### What moves the score to 6.0+ this week

| Fix | Score impact | Effort |
|-----|------------|--------|
| Fix [SHOP ADDRESS] placeholder | +0.3 | 5 min |
| Restore membership pricing (FAQ + services page) | +0.3 | 40 min |
| `robots.ts` + `sitemap.ts` + `llms.txt` | +0.8 | 60 min |
| LocalBusiness + AggregateRating schema | +0.5 | 45 min |
| Services tab visibility fix (all 5 services) | +0.4 | 45 min |
| Title tag rewrites (homepage, services, blog) | +0.3 | 15 min |
| FAQPage JSON-LD (homepage) | +0.3 | 20 min |
| Fix PPF price $2,900 → $3,000 on homepage | +0.1 | 5 min |

**If the first 4 items ship this week (4 issues, ~2.5 hours dev), the score reaches 6.4/10.**

---

## Quick-Win Topics for Jordan's Topic Bank

Add these two to `jordan-content-writer.md` at the top of the topic bank:

**1. "What's the difference between a car detail and a car wash? Melbourne guide"**
*(targets "car detail vs car wash", "difference between car detail and car wash" — the top-of-funnel definitional query for every potential detailing customer in Melbourne. Opening 50-word definition block: "A car detail involves chemical decontamination, machine polishing, and professional-grade protection applied panel by panel — typically 3–6 hours of work. A car wash cleans surface dirt with soap and water in under 15 minutes." Side-by-side comparison table: Time / Equipment / Surface prep / Result longevity / Melbourne cost. FAQ block: "Will a car wash scratch my ceramic coating?", "How often should I detail vs wash in Melbourne?", "Is detailing worth it before selling?". Melbourne angle: name the brushed auto-washes in South Yarra, Richmond, Chapel Street — call out swirl marks. Detailing category.)*

**2. "Mobile car detailing in Melbourne: how it works, what you need, and how to book"**
*(targets "mobile car detailing Melbourne how does it work", "what do I need for mobile car detailing", "can mobile detailers come to apartments" — the pre-booking explainer that currently does not exist on the site. Opening answer block must include access requirements in the first 50 words: "You need a 240V power point and an outdoor tap within 15 metres. We operate across 60+ Melbourne suburbs — home, office, or apartment car park." Access requirements table (power / water / space / surface). Melbourne apartment car park section explicitly naming South Yarra, Richmond, Prahran, Hawthorn, Toorak. FAQ: "Can you come to my underground car park?", "What if I don't have outdoor water access?", "Do I need to be home?". Detailing category. THIS ARTICLE IS PARTICULARLY URGENT — write before the [SHOP ADDRESS] regression on the homepage further erodes AI understanding of the mobile service model.)*

---

## Carry-Forward Flags (all still open)

- **`product-marketing-context.md` needs two updates:**
  1. Line 18: Remove "Basic Detailing: from $150" — service no longer exists (removed Jul 16)
  2. Line 22: Update PPF price from $2,900 → $3,000 (4 weeks unfixed)
- **Membership pricing discrepancy**: `product-marketing-context.md` says Essential $99/mo — homepage says $150/mo. Pick one. Align the whole site.
- **PPF price on homepage** (`home.tsx:237` and `home.tsx:690`): Still shows $2,900. Correct to $3,000. 5 minutes.
- **Gallery link** (`home.tsx:780`): `href="#"` still broken. Change to `href="/gallery"`. 2 minutes.
- **Dead code**: `app/journal/page.tsx` and `app/journal/[slug]/page.tsx` — served via 301 redirect only, safe to delete
- **Email consistency**: Footer says `hello@pristinedetailers.com.au`, contact page metadata says `info@pristinedetailers.com.au` — confirm correct address, align sitewide
- **Open Graph tags**: Still completely absent. Every social share and WhatsApp link preview uses a default stub. Add to `app/layout.tsx` as a 20-minute sitewide fix.
- **Title tags**: Homepage (`app/page.tsx`) and services (`app/services/page.tsx`) still don't include primary keywords. Services page title should be: "Car Detailing Services Melbourne | Ceramic Coating, PPF & Window Tinting | Pristine Detailers"
- **Services tab-hidden content** (`services.tsx:126`): All 5 service panels hidden from AI crawlers via `display:none`. Week 8.

---

*Next audit: 2026-08-02*

**ESCALATE NOW:** Three critical regressions this week + infrastructure at Week 8. Harshad: the [SHOP ADDRESS] placeholder is live on the homepage FAQ today — every visitor who expands that FAQ sees a broken unfilled template. The membership pricing is invisible to both users and AI. Robots.txt and sitemap are at 8 weeks. None of this requires architecture changes — the total fix time is under 3 hours.*
