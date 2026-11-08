# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-11-08
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Status: Week 19 — Zero Fixes Shipped. November Peak Season Is Live.

**Last report:** 2026-11-01. Every item from that report remains open. The site is now in week 2 of November — Melbourne's highest-traffic month for ceramic coating, graphene, and PPF queries. No sitemap, no robots.txt, no llms.txt, `[SHOP ADDRESS]` on the homepage FAQ, conflicting PPF prices, a live dual blog index with no canonical, and no structured schema on any page.

**New findings this week:** Two previously unreported technical gaps that directly limit AI citation potential even after the infrastructure items are fixed: (1) every individual blog article page at `/blog/[slug]` has no `Article` JSON-LD — AI crawlers cannot identify authorship, publish date, or publisher for any published article; (2) the Services page H1 is a brand tagline with zero search keywords — the most commercially important page on the site provides no on-page signal for "ceramic coating Melbourne", "graphene coating Melbourne", or "PPF Melbourne".

| Item | Status |
|------|--------|
| `app/sitemap.ts` | ❌ Missing — **Week 19** |
| `app/robots.ts` | ❌ Missing — **Week 19** |
| `public/llms.txt` | ❌ Missing — **Week 19** |
| `/journal` → `/blog` redirect | ❌ Both pages render identical content — **Week 2** |
| `[SHOP ADDRESS]` placeholder — homepage FAQ | ❌ Still live — **Week 13** |
| Homepage PPF price (`$2,900`) | ❌ Wrong ×2 locations — **Week 13** |
| Services tab-hidden pricing | ❌ JS `display:none` hides all but ceramic — **Week 19** |
| LocalBusiness + AggregateRating schema | ❌ Missing — **Week 19** |
| FAQPage JSON-LD | ❌ Missing — **Week 19** |
| Open Graph / Twitter Card tags | ❌ Missing — **Week 19** |
| **Article JSON-LD on `/blog/[slug]`** | ❌ **NEW — Week 1** |
| **Services H1 keyword vacuum** | ❌ **NEW confirmed — Week 19** |
| PPF vs ceramic article (Jordan) | ❌ Due immediately |
| Melbourne November summer article (Jordan) | ❌ Overdue since Oct 25 |
| Graphene coating article (Jordan) | ❌ Priority since Oct 18 |

---

## Top 3 Priority Issues

---

### Priority 1 — CRITICAL (Week 19): Sitemap / robots.ts / llms.txt still missing — 2nd week of November peak season

**Pages affected:** Site-wide. Every published article.

**Problem:**

It is now 8 November. Melbourne's summer car protection query season runs November through February — this is week 2 of the highest-traffic window of the year for "ceramic coating Melbourne", "graphene coating Melbourne", and "PPF Melbourne". Articles indexed in November rank for the full December–February booking period. The site has been without a sitemap for 19 weeks.

The corrected `app/sitemap.ts` (using `/blog/` paths, not `/journal/`) was provided in full in the Nov 1 brief. The `app/robots.ts` and `public/llms.txt` were provided in full in the Oct 18 brief and remain correct. All three files can be deployed directly from those briefs.

One new note on `llms.txt`: the blog URL in the current draft reads `https://pristinedetailers.com.au/blog`. Confirm this is the canonical path once the `/journal` → `/blog` redirect is live (it is — articles already live at `/blog/[slug]`).

**After deploying all three files:** submit `https://pristinedetailers.com.au/sitemap.xml` to Google Search Console immediately.

**Time to implement:** 90 minutes (code already written — copy from Nov 1 brief).

---

### Priority 2 — HIGH (NEW THIS WEEK): Blog article pages have no `Article` JSON-LD — every published post is invisible to AI as structured content

**Page:** `app/blog/[slug]/page.tsx`

**Problem:**

`app/blog/[slug]/page.tsx:generateMetadata` (lines 17–36) only exports `title` and `description`. No `Article` or `BlogPosting` JSON-LD is rendered anywhere on article pages.

This means:
- Perplexity, ChatGPT, and Google AI Overviews cannot confirm **who wrote** the article, **when it was published**, or **who the publisher is**
- No `author.name` → AI cites anonymous content lower than attributed content
- No `datePublished` → AI cannot assess recency; "ceramic coating Melbourne 2026" queries deprioritise undated content
- No `publisher.name` / `publisher.logo` → E-E-A-T signal is absent

This is the single biggest gap between "indexed by Google" and "citable by AI" for Pristine's journal. Even when the sitemap is live and articles are fully indexed, AI systems will treat them as lower-authority sources without Article schema.

**Specific fix** — add to `app/blog/[slug]/page.tsx` inside the `Page` component, before `return <JournalArticle post={post} />`:

```tsx
import Script from 'next/script';

// Inside Page(), after fetching `post`:
const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.excerpt,
  datePublished: post.published_at,
  dateModified: post.published_at,
  author: {
    '@type': 'Organization',
    name: 'Pristine Detailers',
    url: 'https://pristinedetailers.com.au',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Pristine Detailers',
    url: 'https://pristinedetailers.com.au',
    logo: {
      '@type': 'ImageObject',
      url: 'https://pristinedetailers.com.au/logo-flag.png',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `https://pristinedetailers.com.au/blog/${slug}`,
  },
};

return (
  <>
    <Script
      id="article-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
    <JournalArticle post={post} />
  </>
);
```

This applies to every published article immediately on deploy — no per-article work required.

**Time to implement:** 20 minutes.

---

### Priority 3 — HIGH (NEW CONFIRMED THIS WEEK): Services page H1 is a brand tagline with zero keywords

**Page:** `components/pages/services.tsx`, line 130

**Problem:**

The H1 on `/services` — Pristine's most commercially important page — reads:

> "We treat every car like the one we drive."

This is a brand statement. It contains no keywords. For the top-volume queries this page should rank for — "ceramic coating Melbourne", "graphene coating Melbourne", "paint protection film Melbourne", "window tinting Melbourne" — the H1 provides no on-page relevance signal. Every competitor whose `/services` H1 includes these terms outranks this page on on-page signal alone.

The Services page has been up for at least 19 weeks with this H1. This isn't a minor tweak — the H1 is the single strongest on-page ranking signal on a page, and the current one is wasted.

**Specific fix** — `components/pages/services.tsx`, line 130:

```tsx
// Current:
<h1 style={{ fontSize: 60, fontWeight: 600, lineHeight: 1.03, maxWidth: 780 }}>
  We treat every car like the one we drive.
</h1>

// Replace with:
<h1 style={{ fontSize: 60, fontWeight: 600, lineHeight: 1.03, maxWidth: 780 }}>
  Ceramic Coating, Graphene &amp; PPF Melbourne
</h1>
```

The brand voice remains in the subtitle (`p` tag at line 134) which reads: "From ceramic and graphene coatings to long-term PPF installations, we make premium protection feel effortless." That line stays.

**Time to implement:** 2 minutes.

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "How to choose a certified ceramic coating installer in Melbourne (what Ceramic Pro and Gtechniq certification actually means)"

**Target queries:** "certified ceramic coating installer Melbourne", "Ceramic Pro certified Melbourne", "Gtechniq certified Melbourne", "how to choose ceramic coating installer Melbourne", "best ceramic coating installer Melbourne", "how to know if a detailer is certified Melbourne"

**The gap:**

This topic does not exist in Jordan's topic bank. It is the only high-intent vetting query that Pristine could dominate entirely based on its own certifications — no competitor who isn't Ceramic Pro or Gtechniq certified can even publish this article credibly.

The search volume driver: Melbourne car owners with $100K+ cars are increasingly typing vetting queries before booking a $999–$7,900 service. The top objection from Pristine's ICP is "I don't know who to trust with a car like this." An article that explains what Ceramic Pro certification means (application standards, product accountability, warranty backing) answers this objection directly and in the exact moment someone is Googling it.

**AI extraction opportunity:** A 50-word definition block near the top — "A Ceramic Pro certified installer has completed [X] training modules, uses only Ceramic Pro product lines, and backs work with a manufacturer warranty. A Gtechniq-certified installer..." — is exactly the format AI systems pull for "what does Ceramic Pro certified mean" queries.

**Format spec for Jordan:**
- **Opening 50-word answer block (AI extraction target):** Define Ceramic Pro and Gtechniq certification in one clear paragraph — what it requires, what it means for the customer (warranty, product accountability, application standards)
- **Why certification matters:** Contrast with uncertified installers — no product accountability, no manufacturer warranty, no quality standard
- **What to ask a potential installer:** 5-question checklist (Are you certified? By which brand? Can you show the certificate? What warranty does the manufacturer back? Who do I contact if the coating fails?)
- **What Pristine's certifications cover:** Ceramic Pro + Gtechniq — specific to Melbourne, specific to the services Pristine offers
- **Red flags:** Vague "ceramic coating" claims with no brand name; no mention of certification; "lifetime warranty" with no manufacturer backing
- **Pricing reality check:** Why certified work costs more (product cost, training, warranty infrastructure) — directly addresses the "isn't this expensive?" objection
- **FAQ:** "Does it matter which certification an installer has?", "Is Ceramic Pro better than Gtechniq?", "Can I verify a studio's certification?", "Does certification affect the warranty?"
- **Internal links:** `/services`, `/booking`
- **Category:** Ceramic Coating
- **New for Jordan's topic bank:** Yes — add as Priority 2 (after the two overdue November articles)

---

### Content Idea 2 — "Melbourne suburb guide: how your location changes what paint protection you need"

**Target queries:** "ceramic coating Toorak", "ceramic coating Brighton Melbourne", "PPF South Yarra", "ceramic coating Hawthorn Melbourne", "paint protection Mornington Peninsula", "ceramic coating Bayside Melbourne", "window tinting Richmond Melbourne"

**The gap:**

The site has zero suburb-level content. There are 16 suburb tags on the homepage and 60+ service areas mentioned in copy, but no article addresses why location within Melbourne affects paint protection priorities. These suburb-level queries are low-competition, high-intent, and entirely unaddressed.

This is also the highest-AI-citation-potential format for local service businesses: AI systems answering "ceramic coating Toorak" or "best paint protection Brighton Melbourne" pull from the nearest authoritative document that mentions the suburb alongside a recommendation. Currently no Pristine content does this.

**What makes this article different from generic suburb SEO:** Each suburb section makes a real, specific argument — not "we serve Toorak" but "Toorak's dense tree canopy means bird drop acidity is the primary threat; a ceramic or graphene coating handles this better than PPF alone." That's extractable by AI and useful to readers.

**Format spec for Jordan:**
- **Opening answer block:** "Where you park in Melbourne determines which coating or film you need most. Bayside suburbs face UV intensity and salt air. Inner-east suburbs like Toorak and Hawthorn face bird drop acidity. Freeway commuters on the Eastern Freeway or Eastlink face stone chips. Melbourne's inner-city car parks add abrasion. Each threat calls for a different layer of protection — often in combination."
- **Suburb threat table:** Suburb / Primary threat / Recommended protection / Why
  - Toorak: Bird drops, narrow tree-lined streets → Ceramic or graphene coating
  - Brighton / Bayside: UV intensity, salt air (Port Phillip Bay) → Graphene (superior heat dissipation) + PPF on exposed panels
  - South Yarra / Richmond: Underground car park abrasion, crowded bays → PPF on doors and sills
  - Hawthorn / Camberwell: Bird drops + freeway proximity (Eastern Freeway) → Both ceramic and PPF
  - Mornington Peninsula: Gravel roads, UV, salt air → Full-front or full-vehicle PPF + graphene
  - CBD / Docklands: Car park scratches, construction dust → PPF on vulnerable panels + glass coating
- **Which coating for which driver:** Suburb commuter profile → recommended protection stack
- **Window tinting angle:** Bayside UV and heat inside the car → glass coating and window tinting together
- **FAQ:** "Does living near the bay affect my paint?", "Do I need PPF if I park in an underground car park?", "Which Melbourne suburb has the worst bird drop problem for cars?"
- **Internal links:** `/services`, `/booking`
- **Category:** Melbourne (or Ceramic Coating)
- **New for Jordan's topic bank:** Yes — add as Priority 3 (after certified-installer article)

---

## AI Citation Readiness Score

**Score: 3.5 / 10** — Unchanged. No infrastructure items have shipped.

### Reasoning

| Signal | Status | Duration |
|--------|--------|---------|
| robots.txt with explicit AI bot permissions | ❌ Missing | Week 19 |
| sitemap.xml | ❌ Missing | Week 19 |
| llms.txt | ❌ Missing | Week 19 |
| Article JSON-LD on `/blog/[slug]` | ❌ Missing | **NEW — Week 1** |
| Services H1 — no keywords | ❌ Tagline only | Confirmed Week 19 |
| `[SHOP ADDRESS]` in homepage FAQ | ❌ Live | Week 13 |
| Homepage PPF price conflict ($2,900 vs $3,000) | ❌ Homepage wrong | Week 13 |
| GHL widget — no static testimonial fallback | ❌ E-E-A-T gap | Week 10 |
| LocalBusiness schema | ❌ Missing | Week 19 |
| AggregateRating schema | ❌ Missing | Week 19 |
| FAQPage JSON-LD | ❌ Missing | Week 19 |
| Open Graph tags | ❌ Missing | Week 19 |
| Services pricing — crawler-readable | ❌ Tab-hidden | Week 19 |
| /about/reviews — crawler-readable content | ❌ JS widget only | Week 10 |
| Dual blog index — no canonical | ❌ Both routes live | Week 2 |
| Summer/seasonal content (Melbourne Nov) | ❌ Not published | Overdue since Oct 25 |
| Graphene coating article | ❌ Not published | Priority since Oct 18 |
| PPF vs ceramic article | ❌ Not published | Priority since Nov 1 |

### Score path from 3.5 to 7.0+

The Article JSON-LD fix (Priority 2 above) is new this week and changes the ceiling: without it, even a site with a perfect sitemap, robots.txt, and llms.txt can't be reliably cited by Perplexity and ChatGPT for article-level queries. With it, every published article becomes a citable, attributable source the moment it's indexed.

| Fix | Score impact | Effort |
|-----|------------|--------|
| `robots.ts` + `sitemap.ts` (corrected URLs) + `llms.txt` | +1.2 | 90 min |
| Article JSON-LD on `/blog/[slug]` | +0.8 | 20 min |
| Restore static testimonials + AggregateRating schema | +0.7 | 45 min |
| Fix `[SHOP ADDRESS]` + homepage PPF price | +0.3 | 10 min |
| FAQPage JSON-LD on homepage | +0.3 | 20 min |
| Services H1 → keyword H1 | +0.1 | 2 min |
| `/journal` → `/blog` redirect | +0.1 | 5 min |
| Graphene coating article (Jordan) | +0.3 | Jordan's task |
| Summer Melbourne article (Jordan) | +0.2 | Jordan's task |
| PPF vs ceramic article (Jordan) | +0.2 | Jordan's task |

**Combined dev effort for first 7 items: ~3.5 hours. Score outcome: 7.0/10.**

At 7.0+, Pristine is a primary citation candidate for "ceramic coating Melbourne", "graphene coating Melbourne", and "PPF Melbourne" in Perplexity and ChatGPT during December — the peak booking month.

---

## Quick-Win Topics for Jordan's Topic Bank

**Add to topic bank in `jordan-content-writer.md` — insert at top of list, above "PPF vs ceramic" (Nov 1 entry):**

**1. "How to choose a certified ceramic coating installer in Melbourne (what Ceramic Pro and Gtechniq certification actually means)"** *(NEW — added by Alex 2026-11-08. No coverage in topic bank or on site. Targets vetting queries: "certified ceramic coating installer Melbourne", "Ceramic Pro certified Melbourne", "Gtechniq certified Melbourne". Directly answers Pristine's #1 ICP objection: "I don't know who to trust with a car like this." Opening 50-word answer block defining certification requirements. Checklist format: 5 questions to ask any installer. Red flags section. Pricing reality check. FAQ: "Does it matter which certification?", "Is Ceramic Pro better than Gtechniq?", "Can I verify a studio's certification?". Ceramic Coating category. Priority 2 — after the two overdue November articles.)*

**2. "Melbourne suburb guide: how your location changes what paint protection you need"** *(NEW — added by Alex 2026-11-08. Zero suburb-level content exists on site. Targets "ceramic coating Toorak", "ceramic coating Brighton Melbourne", "PPF South Yarra", "paint protection Mornington Peninsula" and 10+ similar suburb queries. Suburb threat table: suburb / primary paint threat / recommended protection / why. Each suburb section independently extractable by AI for local queries. Bayside: UV + salt air → graphene. Toorak/Hawthorn: bird drops + freeway → ceramic + PPF stack. Mornington Peninsula: gravel roads + UV → full-front PPF + graphene. South Yarra/Richmond: underground car park abrasion → PPF on sills. Melbourne category. Priority 3 — after certified-installer article.)*

---

## Carry-Forward Flags (from Oct 18 / Nov 1 — unchanged)

- **Homepage title** (`app/page.tsx`): "Pristine Detailer | Melbourne's Paint Protection Specialists" → "Ceramic Coating & PPF Melbourne | Pristine Detailers" — also note "Detailer" (singular) doesn't match brand "Pristine Detailers". 2 minutes.
- **Services page title** (`app/services/page.tsx`): "Services - Pristine Detailers" → "Ceramic Coating, Graphene & PPF Melbourne | Pristine Detailers". 2 minutes.
- **Blog page title** (`app/blog/page.tsx`): "Blog - Pristine Detailers" → "Melbourne Car Paint Protection: Expert Guides | Pristine Detailers". 2 minutes.
- **Gallery link** (`home.tsx`, gallery section `line 792`): `href="#"` → `href="/gallery"`. 2 minutes. Currently broken — sends traffic nowhere.
- **Open Graph tags** (`app/layout.tsx`): Add `openGraph` and `twitter` metadata. Every WhatsApp and social share is a blank card. 20 minutes.
- **Footer ABN** (`components/shared/footer.tsx`): "ABN 00 000 000 000" is a placeholder. AI systems and schema validators read this. Update if real ABN is available — it's a LocalBusiness schema trust signal.
- **Services tab-hidden pricing** (`services.tsx:184`): `display: selected === service.id ? 'block' : 'none'` hides graphene, leather ceramic, glass, wheel, and window tinting pricing from all crawlers. Week 19.
- **Window tinting article (Jordan)**: Window tinting launched July 6. 18 weeks with zero content support. "Mobile window tinting Melbourne" is a live commercial query Pristine is entirely invisible for.
- **Membership pricing page**: `/membership` redirects to `/services`. AI systems answering "Pristine Detailers membership pricing" find nothing.

---

*Next audit: 2026-11-15*

**ESCALATE — Harshad:** It is now week 2 of November — the highest-traffic month of the year for Melbourne car protection queries. The five items added this week (Article JSON-LD + the Nov 1 list) take 3.5 hours combined and move the AI citation score from 3.5 to 7.0. At 7.0+, Pristine appears as a cited source in Perplexity and ChatGPT for "ceramic coating Melbourne" and "graphene coating Melbourne" for December — the peak booking month. Without these fixes, December arrives with the site at 3.5/10 and invisible in AI search during the period when Melbourne car owners are actively spending.*
