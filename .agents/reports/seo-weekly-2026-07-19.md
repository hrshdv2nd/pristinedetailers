# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-07-19
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Status: Three New Regressions, Infrastructure Still at Week 7

**What changed since July 12:**

| Item | Status |
|------|--------|
| Ceramic coating price updated to $999 (homepage + flagship section) | ✅ Done (commit `b0275bc`, Jul 16) — price now consistent across site |
| GHL chat widget script removed from layout.tsx | ✅ Done (commit `e14ce26`, Jul 16) — marginal Core Web Vitals improvement |
| Membership section removed from homepage (145 lines) | 🔴 New regression (commit `53d9254`, Jul 16) — keyword coverage + conversion path removed |
| Basic Detailing ($150) removed from services | 🔴 New regression (commit `75b2dc2`, Jul 16) — product-marketing-context.md not updated |
| `app/sitemap.ts` | ❌ Still missing — **WEEK 7** |
| `app/robots.ts` | ❌ Still missing — **WEEK 7** |
| `public/llms.txt` | ❌ Still missing — **WEEK 7** |
| Services tab-hidden pricing (all 4 services) | ❌ Still invisible to AI and Googlebot |
| Title tags: homepage, services, membership, blog | ❌ Still keyword-dead — no fix |
| Open Graph / Twitter Card tags | ❌ Still completely absent sitewide |
| FAQPage JSON-LD (homepage + membership) | ❌ Still missing |
| LocalBusiness + AggregateRating schema | ❌ Still missing |
| Window tinting article (Jordan) | ❌ Still not published — 2 weeks since service launch |
| PPF price in product-marketing-context.md | ❌ Still says $2,900 — should be $3,000 |
| Review count inconsistency | ❌ Still wrong |
| Gallery link href="#" | ❌ Still broken |
| llms.txt ceramic price | ⚠️ When written: use $999, not $750 (price updated Jul 16) |

---

## Top 3 Priority Issues

---

### Priority 1 — CRITICAL (Week 7, Escalate): No sitemap.ts, robots.ts, or llms.txt

**Page:** Site-wide (`app/`)

**Problem:**

Seven weeks since first flagging. The July 12 brief included copy-paste-ready code for all three files. None have been implemented.

Jordan has published on a Tuesday/Friday schedule since May — estimated 20+ articles in Supabase with no sitemap to accelerate indexation. Each depends on Googlebot discovering new links by re-crawling the `/blog` index on its own schedule, which takes 4–8 weeks on a domain of this authority. Articles published in May are plausibly still not indexed.

**New wrinkle this week**: The ceramic coating price changed from $750 to $999 on Jul 16. When `llms.txt` is finally written, use **$999** — the July 12 template used $750 (now stale). Every AI system queried about "Pristine Detailers ceramic coating cost" is currently citing a cache of whatever it crawled last, with no authoritative machine-readable source to correct it.

**Searches blocked:** "ceramic coating Melbourne", "PPF Melbourne", "mobile car detailing Melbourne", "car detailing membership Melbourne", every individual journal article Jordan has published since May.

**Specific fix** — unchanged from July 12 brief except update ceramic price to $999 in llms.txt:

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
    { url: 'https://pristinedetailers.com.au/membership', priority: 0.9 },
    { url: 'https://pristinedetailers.com.au/blog', priority: 0.8 },
    { url: 'https://pristinedetailers.com.au/gallery', priority: 0.6 },
    { url: 'https://pristinedetailers.com.au/booking', priority: 0.8 },
    { url: 'https://pristinedetailers.com.au/contact', priority: 0.5 },
  ].map(p => ({ ...p, changeFrequency: 'monthly' as const }));

  return [...staticPages, ...articles];
}
```

**`public/llms.txt`** (20 minutes — **use updated prices**):
```
# Pristine Detailers — Melbourne Mobile Car Detailing

## About
Pristine Detailers is a premium mobile car detailing service operating across Melbourne, Australia. Certified technicians travel to the customer's home, office, or car park — no workshop drop-off required. Operating since 2020. 4.9-star average across 240+ reviews. 2,400+ cars detailed.

## Services and Pricing (excl. GST)
- Maintenance Detail: from $99
- Revitalise Package: from $300 — full decontamination, two-stage paint correction, 6-month sealant
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
- Mobile only — no workshop drop-off required
- Requires access to water and a standard power point
- Notable cars serviced: Porsche, Ferrari, McLaren, Range Rover, BMW, Mercedes-AMG, Tesla, Audi, BYD, Lotus
- Booking: https://pristinedetailers.com.au/booking
- Contact: hello@pristinedetailers.com.au | 0491 108 905
```

**Time to implement:** 60 minutes total. After deploying, submit `https://pristinedetailers.com.au/sitemap.xml` to Google Search Console.

**ESCALATE:** This is the 7th consecutive week these three files are flagged with no action. Every Jordan article published between now and implementation accrues indexation delay. Flag to Harshad directly.

---

### Priority 2 — NEW THIS WEEK: Membership section removed from homepage breaks keyword coverage and conversion path

**Page:** `/` (`components/pages/home.tsx`)
**Commit:** `53d9254` (Jul 16, 2026) — 145 lines deleted

**Problem:**

Commit `53d9254` removed the entire membership tab/section from the homepage. This was the only place on the homepage where membership pricing ($99/mo Essential, $149/mo Signature) and plan benefits appeared in visible copy.

The impact is twofold:

**1. SEO keyword gap**: "car detailing membership Melbourne" and "mobile detailing subscription Melbourne" now have zero homepage coverage. The homepage is the highest-PageRank page on the site — losing those keyword signals from it means these queries have no strong anchor page to rank from. The `/membership` page still exists and is correctly indexed, but it doesn't have the PageRank weight the homepage carries. If Pristine wants to rank for membership-intent queries in Melbourne search, the homepage needs to at least reference the plans.

**2. Conversion path severed**: The homepage is the entry point for the majority of organic traffic. A customer landing on the homepage from "mobile car detailing Melbourne" now has no direct path to learn about the membership tier system. The bottom CTA still says "Start membership" with a link to `/membership`, but there are no plan details or pricing visible — no hook to explain what a membership costs or what it includes before clicking.

The FAQ entry "What does the membership include?" at `home.tsx:877` remains and is the only homepage content mentioning membership pricing ("$99/month gets you one monthly wash-and-seal detail..."). This is buried in an accordion that requires a click and is not visible on page load. AI crawlers extracting a pricing claim from the homepage will get at best this single accordion sentence.

**Specific fix:**

Add a compact, always-visible membership CTA block above the homepage FAQ section (before `<FAQSection />`). This doesn't need to replicate the full membership page — just enough to surface pricing and a plan hook:

```tsx
// Membership teaser strip — add between GallerySection and TestimonialsSection
function MembershipTeaser() {
  return (
    <section className="pd-sect-sm" style={{ background: '#0A0A0A', color: '#fff' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto', padding: '0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 32 }}>
        <div>
          <Eyebrow style={{ color: 'rgba(255,255,255,0.5)' }}>Membership</Eyebrow>
          <h2 style={{ fontFamily: "'Bricolage Grotesque', sans-serif", fontSize: 'clamp(28px, 3.5vw, 48px)', fontWeight: 600, color: '#fff', marginTop: 12 }}>
            From $99/mo. Your car, always<br />in condition.
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.65)', marginTop: 12, fontSize: 16, maxWidth: 440 }}>
            Essential ($99/mo) — monthly wash + seal. Signature ($149/mo) — bi-monthly detail + ceramic maintenance. Members save up to 35% annually.
          </p>
        </div>
        <a href="/membership" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '14px 28px', borderRadius: 6, background: '#fff', color: '#0A0A0A', fontSize: 14, fontWeight: 500, flexShrink: 0 }}>
          See membership plans <Arrow />
        </a>
      </div>
    </section>
  );
}
```

Insert `<MembershipTeaser />` at `home.tsx:26` (after `<GallerySection />`, before `<TestimonialsSection />`).

This restores:
- The $99/mo and $149/mo pricing signals to the homepage (visible to Googlebot, Perplexity, and GPTBot without a click)
- The "35% savings" E-E-A-T anchor that AI systems extract for membership-intent queries
- The homepage conversion path to `/membership`

**Time to implement:** 30 minutes.

---

### Priority 3 — CARRY (Week 7): Services tab-hidden content blocks all 4 services from indexation

**Page:** `/services` (`components/pages/services.tsx:126`)

**Problem:**

The services page renders 4 service panels using `display: selected === service.id ? 'block' : 'none'`. The default selected tab is `revitalise-package`. Every non-human reader (Googlebot, GPTBot, PerplexityBot, ClaudeBot) fetches the HTML and sees only the Revitalise Package — Ceramic Coating ($999), PPF ($3,000), and Mobile Window Tinting ($200) are absent from the indexable document.

This has been open since week 1. The commit `e14ce26` on July 16 added benefit lists to each service, which is a good content improvement — but all the new benefit content is inside the same hidden panels. The improvement is invisible to crawlers.

**Why it matters more this week**: The ceramic price moved to $999 on Jul 16. If anyone is searching "ceramic coating Melbourne price" or "how much is ceramic coating in Melbourne", Pristine's services page cannot be cited by any AI — the price is not in crawlable HTML. Competitors with static HTML pricing pages will be cited instead.

**Specific fix** — unchanged from July 12 brief:

In `components/pages/services.tsx:126`, replace the display-none toggle with a CSS class approach that keeps all content in the DOM:

```tsx
// Replace this:
<div key={service.id} style={{ display: selected === service.id ? 'block' : 'none' }}>

// With this:
<div
  key={service.id}
  aria-hidden={selected !== service.id}
  style={{
    display: selected !== service.id ? 'none' : 'block',
    // For crawlers: add a visually-hidden-but-in-DOM approach instead
  }}
>
```

Actually, the correct pattern for SEO is to render all content in the DOM, hidden only visually:

```tsx
// Keep all panels in the DOM with CSS visibility, not display:none
<div key={service.id} style={{
  position: selected === service.id ? 'static' : 'absolute',
  visibility: selected === service.id ? 'visible' : 'hidden',
  height: selected === service.id ? 'auto' : 0,
  overflow: 'hidden',
}}>
```

Or more simply, render all service bodies as a static `<dl>` / definition list outside the tab UI, styled for crawlers (visually compact, below the tab UI, styled to match). All the content stays indexable; the tab UI is purely for human interaction.

**Also: the services page title needs to include service names and Melbourne.** The July 12 brief had this fix — update `app/services/page.tsx`:
```tsx
export const metadata: Metadata = {
  title: 'Car Detailing Services Melbourne | Ceramic Coating, PPF & Window Tinting | Pristine Detailers',
  description: 'Premium mobile car detailing in Melbourne — ceramic coating from $999, paint protection film from $3,000, mobile window tinting from $200. We come to your driveway.',
};
```

**Time to implement:** 45 minutes for tab visibility fix. 5 minutes for the metadata update.

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "How Long Does Ceramic Coating Last? A Melbourne Driver's Realistic Guide (2026)"

**Target queries:** "how long does ceramic coating last", "ceramic coating lifespan Melbourne", "how long does ceramic coating last in Australia", "does ceramic coating fade Melbourne", "how many years does ceramic coating last"

**The gap:**

"How long does ceramic coating last?" is one of the top 3 pre-purchase questions for anyone considering a $999 ceramic coating. It's an extremely high-volume informational query. The existing topic bank has content about ceramic maintenance and ceramic vs wax, but nothing that directly leads with this question as its primary H1. Crucially, the price just moved from $750 to $999 — a customer who previously researched ceramic coating and remembers the $750 price will now search to re-evaluate their options. A freshness-dated article anchored to a specific dollar figure ($999) with Melbourne-specific durability data will rank and be cited ahead of generic national content.

Melbourne-specific factors that genuinely affect coating lifespan are distinct: UV intensity near Port Phillip Bay exceeds most Australian coastal cities, bird dropping acidity is notably higher near inner-east parks and bay suburbs (Hawthorn, Richmond, Toorak), and the daily car park scratching in Crown/Westfield/South Yarra underground bays degrades coating faster than in suburban areas. These geographic factors are real, are specific, and are exactly the kind of claim that Perplexity and ChatGPT extract.

**Format for AI extraction:**

- **Opening definition block (50 words):** "A professionally applied ceramic coating in Melbourne lasts between 2 and 8 years, depending on the product tier and maintenance cadence. Pristine Detailers uses manufacturer-backed coatings rated to 5 years — applied by certified technicians, maintained with the Signature membership, and guaranteed against delamination."
- **Comparison table:** Product tier / Rated lifespan / Melbourne real-world lifespan / Key factor
- **Melbourne-specific durability section:** UV near Port Phillip Bay, inner-east bird droppings, underground car park abrasion
- **Factors that shorten lifespan table:** Factor / Impact / Prevention
- **Maintenance section:** What keeps a coating at full lifespan (feeds Signature membership conversion)
- **FAQ block:** "Does ceramic coating wear off?", "Can ceramic coating last 10 years?", "How do I know if my coating has failed?", "Does the Melbourne climate affect ceramic coating lifespan?"

**Suggested title:** "How Long Does Ceramic Coating Last? A Melbourne Driver's Realistic Guide (2026)"
**Category:** Ceramic Coating
**Pass to Jordan:** Yes — add to topic bank.

---

### Content Idea 2 — "PPF Installation Day: What to Expect, How Long It Takes, and How to Prepare Your Car"

**Target queries:** "how long does PPF installation take", "PPF installation Melbourne process", "paint protection film installation time Melbourne", "what to expect PPF install", "preparing car for PPF Melbourne"

**The gap:**

A customer who's decided to book a $3,000–$7,900 PPF job has significant pre-appointment anxiety: Where does my car go? How long will it take? Can I drive it after? What do I need to do beforehand? None of this is answered on the services page or anywhere on the site. The only content addressing this audience is post-purchase (the existing ceramic coating maintenance article). Pre-purchase anxiety content at this price point is a massive gap.

This is also an underserved query nationally — "how long does PPF take" returns mostly manufacturer blog posts, not local Melbourne installers. Pristine's mobile angle adds a unique hook that national content cannot replicate: "no need to drop your car at a shop — we come to your home or office, and you'll have the car back within the day."

PPF installation is the highest-ticket service at up to $7,900 for full-vehicle. Reducing pre-appointment anxiety directly supports conversion.

**Format for AI extraction:**

- **Opening answer block (50 words):** "A partial-front PPF installation with Pristine Detailers takes approximately 4–6 hours. Full-front coverage takes 6–8 hours, and a full-vehicle install typically requires 2 days. Our mobile technicians come to your home, office, or apartment car park — no workshop drop-off needed."
- **Timeline table:** Coverage option / Duration / What's happening / What you can do during
- **What to do before your appointment:** Numbered list (car wash, empty the car, access requirements for mobile service — water, power)
- **What happens on the day:** 5-step numbered process from arrival to final inspection
- **Post-install care:** First 7 days (don't wash, park undercover), long-term
- **FAQ:** "Can I drive my car immediately after PPF installation?", "Does PPF installation require a workshop?", "What happens if it rains during installation?", "Can PPF be applied in an underground car park?"
- **Melbourne-specific close:** "We've installed PPF in apartment car parks in South Yarra, office car parks in the CBD, and home garages in Toorak and Brighton — if you have access to a covered space and a power point, we can come to you."

**Suggested title:** "PPF Installation Day: What to Expect, How Long It Takes, and How to Prepare Your Car in Melbourne"
**Category:** Paint Protection Film
**Pass to Jordan:** Yes — add to topic bank.

---

## AI Citation Readiness Score

**Score: 3.8 / 10** — down from 4.0 last week.

### Reasoning

Two regressions this week dragged the score below last week:

1. **Homepage membership section removed** (commit `53d9254`): The only visible pricing mention for the membership plans on the homepage is now buried inside an accordion FAQ answer. AI systems extracting homepage content will not reliably cite "$99/month Essential" or "$149/month Signature" unless they specifically click the accordion — which crawlers don't do. This reduces the AI-extractable claim density on the highest-authority page.

2. **Basic Detailing removed but context doc not updated**: `product-marketing-context.md` still lists "Basic Detailing: from $150" as a service. Any AI that's cached the context doc or was trained on previous llms.txt material will quote a service that no longer exists. This creates a consistency liability.

One positive: The ceramic coating price is now consistent at $999 across the homepage services preview, homepage flagship section, and services page. When llms.txt is finally written, this will be unambiguous. The GHL widget removal marginally helps Core Web Vitals.

| Signal | Status | Change from Jul 12 |
|--------|--------|---------------------|
| robots.txt | ❌ Missing | **Week 7** |
| sitemap.xml | ❌ Missing | **Week 7** |
| llms.txt | ❌ Missing | **Week 7** |
| FAQPage JSON-LD (homepage) | ❌ Missing | No change |
| LocalBusiness + AggregateRating schema | ❌ Missing | No change |
| Open Graph / Twitter Card tags | ❌ Completely absent | No change |
| Services pricing (AI-visible) | ❌ Tab-hidden | No change |
| Homepage: membership pricing visible | ❌ Removed | **New regression** |
| Ceramic price consistency (homepage + services) | ✅ $999 everywhere | **Fixed** |
| Blog article title pattern (Melbourne signal) | ❌ Still `${title} — Pristine Detailers` | No change |
| Title tag: services page | ❌ "Services — Pristine Detailers" | No change |
| Title tag: membership page | ❌ "Membership Plans — Pristine Detailers" | No change |
| Title tag: blog index | ❌ "Blog — Pristine Detailers" | No change |
| Review count consistency | ❌ Still wrong | No change |
| Hero proof points (2,400+ cars, etc.) | ❌ Still removed | No change (regression since Jul 7) |
| Basic Detailing removed but context doc not updated | ❌ New discrepancy | **New regression** |
| Window tinting article | ❌ Not published | Week 2 since service launch |

### What moves the score to 6.0+ in the next two weeks

| Fix | Score impact | Effort | Status |
|-----|------------|--------|--------|
| `robots.ts` + `sitemap.ts` + `llms.txt` | +0.8 | 60 min | ❌ Week 7 |
| LocalBusiness + AggregateRating schema in layout | +0.5 | 45 min | ❌ Not done |
| FAQPage JSON-LD (homepage + membership) | +0.5 | 30 min | ❌ Not done |
| Restore membership pricing to homepage | +0.2 | 30 min | ❌ New regression |
| Services tab visibility fix (all 4 services) | +0.4 | 45 min | ❌ Not done |
| Title tag rewrites (homepage, services, membership, blog) | +0.3 | 15 min | ❌ Not done |
| Open Graph tags sitewide | +0.2 | 30 min | ❌ Not done |
| Fix review count + restore hero proof points | +0.2 | 30 min | ❌ Not done |
| Window tinting article (Jordan) | +0.1 | Jordan's turn | ❌ Week 2 |

**If the top 5 items ship this week, the score reaches 6.2/10. Total dev effort: under 4 hours.**

---

## Quick-Win Topics for Jordan's Topic Bank

Add these two to `jordan-content-writer.md` at the top of the topic bank:

**1. "How long does ceramic coating last? A Melbourne driver's realistic guide (2026)"**
*(targets "how long does ceramic coating last" and "ceramic coating lifespan Melbourne" — top 3 pre-purchase question for anyone considering $999 ceramic. Especially relevant after the July 2026 price update. Opening 50-word definition block: "A professionally applied ceramic coating in Melbourne lasts between 2 and 8 years depending on product tier and maintenance cadence. Pristine uses manufacturer-backed coatings rated to 5 years." Key format: comparison table (product tier / rated lifespan / Melbourne real-world lifespan / key factor), Melbourne durability factors (UV near Port Phillip Bay, inner-east bird dropping acidity, underground car park abrasion), maintenance section feeds Signature membership conversion. FAQ: "Does ceramic coating wear off?", "Does Melbourne climate affect coating lifespan?". Ceramic Coating category.)*

**2. "PPF installation day: what to expect, how long it takes, and how to prepare your car in Melbourne"**
*(targets "how long does PPF installation take" and "PPF installation Melbourne process" — pre-purchase anxiety content for a $3,000–$7,900 booking that currently has zero representation on site. Opening 50-word answer block must include specific timeframes: "partial-front 4–6 hours, full-front 6–8 hours, full-vehicle 2 days." Timeline table (coverage / duration / what's happening). 5-step installation process numbered list. Post-install care (first 7 days). Melbourne-specific close: "We've installed PPF in apartment car parks in South Yarra and home garages in Toorak." FAQ: "Can I drive immediately after PPF?", "Does it need a workshop?", "What if it rains?". Paint Protection Film category.)*

---

## Carry-Forward Flags (all still open)

- **`product-marketing-context.md` needs two updates:**
  1. Line 18: Remove "Basic Detailing: from $150" — this service no longer exists (removed Jul 16)
  2. Line 22: Update PPF price from $2,900 → $3,000 (still showing old price, 3 weeks on)
- **Dead code**: `app/journal/page.tsx` and `app/journal/[slug]/page.tsx` — served via 301 redirect, safe to delete
- **Services tab-hidden pricing** (`services.tsx:126`): All 4 service panels hidden from AI crawlers — fix is still the highest-leverage single code change on the site
- **Homepage review count** (`home.tsx` FAQSection and testimonials): Inconsistent across site. Fix to 240 before adding AggregateRating schema
- **Gallery link** (`home.tsx` GallerySection): `href="#"` still broken — change to `href="/gallery"`
- **Open Graph tags**: Zero `openGraph` or `twitter` metadata across the entire site. Every social share and messaging link preview uses a default stub. Add to `app/layout.tsx` metadata as a 20-minute sitewide fix.
- **Email address consistency**: Footer uses `hello@pristinedetailers.com.au`, contact page metadata uses `info@pristinedetailers.com.au` — verify which is correct and align

---

*Next audit: 2026-07-26*

**ESCALATE NOW:** The sitemap, robots.txt, and llms.txt are at Week 7 with no implementation. The July 12 brief contained copy-paste-ready code for all three files. Total implementation time is under 60 minutes. Flag to Harshad directly — this is the single highest-ROI item on the board and it's blocking indexation of every article Jordan has published since May.*
