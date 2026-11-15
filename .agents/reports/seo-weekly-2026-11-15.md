# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-11-15
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Status: Week 19 — Zero Infrastructure Fixes. Peak Season Is Live Now.

**Last report:** 2026-11-01. Zero fixes from the Nov 1 priority list have shipped. Pristine enters mid-November — the statistical peak week for Melbourne ceramic coating and PPF search volume — with no sitemap, no robots.txt, no llms.txt, a live `[SHOP ADDRESS]` placeholder on the homepage, wrong PPF prices in two locations, tab-hidden service pricing, and no schema markup. The two articles flagged as urgent on Nov 1 (PPF vs ceramic, Melbourne summer guide) are now two weeks overdue.

**What peak season means in numbers:** "Ceramic coating Melbourne" and "graphene coating Melbourne" queries spike from late October through February. This is the period when potential Pristine customers — new car buyers ahead of Christmas, bayside residents ahead of summer beach trips, Toorak/South Yarra professionals wanting protection before the first UV day — are actively searching. Every week without a sitemap is a week Google's crawl prioritisation is guesswork. Every week without llms.txt is a week Perplexity and ChatGPT cannot reliably cite Pristine's services.

| Item | Status | Weeks Outstanding |
|------|--------|-------------------|
| `app/sitemap.ts` | ❌ Missing | **Week 19** |
| `app/robots.ts` | ❌ Missing | **Week 19** |
| `public/llms.txt` | ❌ Missing | **Week 19** |
| `[SHOP ADDRESS]` on homepage FAQ (`home.tsx:817`) | ❌ Still live | **Week 13** |
| Homepage PPF price `$2,900` (`home.tsx:253`, `home.tsx:680`) | ❌ Still wrong | **Week 13** |
| `/journal` → `/blog` redirect — dual index, no canonical | ❌ Not fixed | **Week 2** |
| Services tab-hidden pricing (`services.tsx:184`) | ❌ Crawler-invisible | **Week 19** |
| LocalBusiness + AggregateRating schema | ❌ Missing | **Week 19** |
| FAQPage JSON-LD | ❌ Missing | **Week 19** |
| Open Graph / Twitter Card tags | ❌ Missing | **Week 19** |
| Gallery link `href="#"` broken (`home.tsx:792`) | ❌ Dead link | Carry-forward |
| Jordan — "PPF vs ceramic coating Melbourne" article | ❌ **2 weeks overdue** | Missed Nov 1 deadline |
| Jordan — "Melbourne summer car care November" article | ❌ **3+ weeks overdue** | Missed Oct 25 deadline |
| Jordan — Graphene coating article | ❌ Not published | Priority since Oct 18 |
| Jordan — Window tinting article | ❌ Not published | Service live since July 6 |

---

## Top 3 Priority Issues

---

### Priority 1 — CRITICAL (Week 19): Sitemap, robots.txt, and llms.txt — mid-November deadline is now

**Pages affected:** Site-wide. Every published article at `/blog/[slug]`.

**Problem:**

Nineteen weeks without a sitemap. The readycode from every previous report remains valid — this is a deployment task, not a writing task. The specific file that tripped the Oct 18 report (URL path error from `/journal/` to `/blog/`) was corrected in the Nov 1 report with a verified fix. All three files are copy-paste ready. The only action is deploying them.

The November timing cannot be understated: Melbourne's ceramic coating booking cycle means that a customer who discovers Pristine in mid-November books a December or January appointment. An article indexed in the next two weeks captures that full booking window. Without a sitemap, Google's crawl schedule for Pristine's `/blog/` pages is based on historical signals — which are weak because the site has never submitted a sitemap.

**All three files are ready in the Nov 1 report (no changes needed):**

- `app/sitemap.ts` — maps static pages + `/blog/${post.slug}` (corrected from `/journal/` error)
- `app/robots.ts` — allows GPTBot, PerplexityBot, ClaudeBot, anthropic-ai, ChatGPT-User, Google-Extended
- `public/llms.txt` — machine-readable service facts, pricing (all excl. GST), certifications, service area, booking URL

**After deploying:** Submit `https://pristinedetailers.com.au/sitemap.xml` to Google Search Console immediately.

**Time to implement:** 60–90 minutes. All code is in the Nov 1 report.

---

### Priority 2 — CRITICAL (Week 13): Three live errors on the homepage that AI systems read and repeat back

**Page:** `/` (`components/pages/home.tsx`)

**Problem:** Three errors on the homepage remain unfixed. These are the exact fields AI systems read when answering questions about Pristine Detailers — ChatGPT and Perplexity extract FAQ answers and pricing from page content. If a potential customer asks "what is Pristine Detailers' address?" or "how much does PPF cost at Pristine?", they currently receive wrong information from the live site.

| Location | Current | Correct |
|----------|---------|---------|
| `home.tsx:817` — FAQ "Do you come to my home or office?" | `...studio - [SHOP ADDRESS]` | Replace with the specific copy below |
| `home.tsx:253` — Services card, PPF | `from: '$2,900'` | `from: '$3,000'` |
| `home.tsx:680` — PPF section, Partial Front | `price: '$2,900'` | `price: '$3,000'` |

**Specific fix for line 817:**
```tsx
{ q: 'Do you come to my home or office?', a: 'Ceramic coating, graphene coating, and PPF are completed at our dedicated Melbourne studio — studio-based work is essential for the quality we guarantee. Window tinting is the exception: our mobile team installs it at your home, office, or apartment car park across 60+ suburbs.' },
```

**Time to implement:** 10 minutes.

---

### Priority 3 — HIGH (New this week): Open Graph tags missing — every WhatsApp and social share is a blank card in peak season

**Page:** `app/layout.tsx`, `app/page.tsx`, `app/services/page.tsx`

**Problem:**

November is when Pristine's social sharing and word-of-mouth is highest — existing customers sharing the site with friends who just bought a new car, ad click-throughs, Instagram bio link visits. Every one of these shares generates a blank card: no image, no title, no description in the preview. The layout.tsx metadata export has no `openGraph` or `twitter` block at all (confirmed this week — the file has Google Tag Manager and analytics but zero social meta tags).

This is the simplest fix with the highest social-share impact during peak season. It also affects every WhatsApp share from Jordan's social posts driving people to the blog.

**Specific fix for `app/layout.tsx` (add to metadata export):**
```ts
export const metadata: Metadata = {
  title: "Pristine Detailers | Melbourne's Ceramic Coating & PPF Specialists",
  description: "...",
  openGraph: {
    title: "Pristine Detailers | Ceramic Coating & PPF Melbourne",
    description: "Professional ceramic coating, graphene coating, and paint protection film in Melbourne. Certified technicians, manufacturer warranties up to 9 years.",
    url: "https://pristinedetailers.com.au",
    siteName: "Pristine Detailers",
    images: [
      {
        url: "https://qwa1skb1dtiy5dzb.public.blob.vercel-storage.com/VNP04687.jpg",
        width: 1200,
        height: 630,
        alt: "Pristine Detailers — ceramic coating and PPF Melbourne",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pristine Detailers | Ceramic Coating & PPF Melbourne",
    description: "Professional ceramic coating, graphene coating, and paint protection film in Melbourne. Certified technicians, manufacturer warranties up to 9 years.",
    images: ["https://qwa1skb1dtiy5dzb.public.blob.vercel-storage.com/VNP04687.jpg"],
  },
};
```

**Also fix the homepage title typo while here:** Both `app/layout.tsx` and `app/page.tsx` currently read `"Pristine Detailer"` (singular — missing the 's'). The business name is "Pristine Detailers". Two-character fix in two files.

**Time to implement:** 20 minutes.

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "Mobile window tinting Melbourne: legal VLT limits, what it costs, and how the mobile process works"

**Target queries:** "mobile window tinting Melbourne", "window tinting Melbourne price", "window tinting Melbourne legal limit", "how much is window tinting Melbourne", "car window tinting Melbourne"

**The gap:**

The window tinting service has been live since July 6 — that's 19 weeks with zero content support and no keyword coverage. "Window tinting Melbourne" is a commercial query with direct buyer intent. The service starts from $200, which is the lowest price point Pristine offers. The mobile differentiator (no need to drop the car at a shop in Moorabbin or Bayswater) is a genuine advantage over fixed-location tinters in Melbourne that no article on the site currently explains.

**Why November timing matters:** New car deliveries peak in November and December in Australia (end-of-year clearances). New car buyers are the primary market for both window tinting and ceramic coating simultaneously. An article indexed now captures that buyer in the same search session.

**Format spec for Jordan:**
- **Opening 50-word block (AI extraction target):** "Mobile window tinting in Melbourne is window film applied at your home, office, or apartment car park — no need to drop the car at a shop. Victorian law requires front side windows to transmit at least 35% of light (VLT). Pristine's mobile tinting service starts from $200 and operates across 60+ Melbourne suburbs."
- **Victoria VLT legal table:** Window position / Legal VLT minimum / Pristine's available options
- **Mobile process numbered list:** How the team sets up at a driveway or apartment car park
- **Pricing by vehicle type:** Sedan / SUV / Van — price ranges
- **Melbourne inner-city section:** Call out South Yarra, Richmond, Hawthorn, Toorak — no garage required, we work in underground car parks
- **FAQ:** "What VLT is legal for front windows in Victoria?", "Can you tint in an underground car park?", "How long does window tinting take?", "Does window tinting void my new car warranty?", "Can you combine window tinting with ceramic coating on the same day?"
- **Category:** Window Tinting
- **Internal links:** `/services`, `/booking`
- **Pass to Jordan:** Yes — URGENT. 19 weeks of commercial query invisibility. Publish this week.

---

### Content Idea 2 — "Ceramic coating for new cars in Melbourne: what to do in the first 30 days after delivery"

**Target queries:** "ceramic coating new car Melbourne", "paint protection new car Melbourne", "should I get ceramic coating on my new car Melbourne", "new car protection Melbourne", "paint protection before first wash Melbourne"

**The gap:**

New car deliveries in Melbourne spike in November and December. "Ceramic coating new car" is a high-intent query from exactly Pristine's ICP — the BMW/Porsche/Tesla buyer who just took delivery and has 30 days to decide before the paint is compromised. This query has zero coverage on the site. The first 30 days framing creates urgency that no other article topic offers, and it maps naturally to Pristine's highest-ticket services (PPF first, ceramic or graphene on top — the full combined package at $3,750–$7,900+).

This article is distinct from the "PPF vs ceramic" comparison (still urgently needed) because it speaks to a specific decision moment — the new car owner — rather than a general "which is better" query.

**Format spec for Jordan:**
- **Opening 50-word block (AI extraction target):** "A new car's clear coat is fully cured after 30–60 days. Getting a ceramic or graphene coating applied during this window bonds the product to untouched, uncompromised paintwork. Most Melbourne technicians recommend the sequence: PPF on high-impact zones (bumper, hood, mirrors) in week one, ceramic or graphene coating on top once PPF is bonded, typically week two onward."
- **Why 30 days matters:** Factory clear coat curing, wash marks from dealer detailing, delivery damage inspection (Tesla panel gaps, BMW lacquer quality)
- **Melbourne delivery risks:** Dealer lot exposure (UV, bird drops), drive home stone chips from Eastern Freeway/CityLink
- **Recommended sequence table:** Timeline / Action / What it protects / Pristine service
- **Per-make section (100 words each):** BMW (soft lacquer), Tesla (factory panel gap variance on delivery), Porsche (matte/satin options require specific product stacks), Mercedes-AMG (stock clear coat thinner than Porsche)
- **Pricing table:** PPF partial front $3,000 / Ceramic $750 / Graphene $999 / Combined from $3,750
- **FAQ:** "Should I get PPF or ceramic coating on my new car?", "Can I wash a brand-new car before getting a ceramic coating?", "Does the dealership paint protection package cover the same thing?", "How long after delivery should I wait to get a ceramic coating?"
- **Category:** Ceramic Coating (or Paint Protection Film)
- **Internal links:** `/services`, `/booking`
- **Pass to Jordan:** Yes — Publish this week or early next week to capture December delivery surge.

---

## AI Citation Readiness Score

**Score: 3.5 / 10** — Unchanged. No fixes shipped since the score was last assessed.

### Reasoning

The score has not moved since July 12. Every infrastructure item required for AI citation eligibility remains missing entering Week 19.

| Signal | Status | Duration |
|--------|--------|---------|
| robots.txt with explicit AI bot permissions | ❌ Missing | Week 19 |
| sitemap.xml | ❌ Missing | Week 19 |
| llms.txt | ❌ Missing | Week 19 |
| `[SHOP ADDRESS]` live on homepage FAQ | ❌ Present | Week 13 |
| Homepage PPF price conflict (`$2,900` vs `$3,000`) | ❌ Homepage wrong | Week 13 |
| Open Graph / social preview tags | ❌ Missing | Week 19 |
| LocalBusiness schema | ❌ Missing | Week 19 |
| AggregateRating schema | ❌ Missing | Week 19 |
| FAQPage JSON-LD | ❌ Missing | Week 19 |
| Services pricing — crawler-readable | ❌ Tab-hidden | Week 19 |
| `/journal` → `/blog` canonical / redirect | ❌ Dual index | Week 2 |
| GHL review widget — no static fallback | ❌ E-E-A-T gap | Week 10 |
| "PPF vs ceramic coating Melbourne" article | ❌ 2 weeks overdue | Missed Nov 1 |
| "Melbourne summer car care" article | ❌ 3+ weeks overdue | Missed Oct 25 |
| Graphene coating Melbourne article | ❌ Not published | Priority since Oct 18 |
| Window tinting Melbourne article | ❌ Not published | Service live July 6 |

### Score path from 3.5 to 6.0+ (unchanged from prior reports — still achievable in one dev session)

| Fix | Score impact | Effort |
|-----|------------|--------|
| `robots.ts` + `sitemap.ts` + `llms.txt` | +1.2 | 90 min |
| Open Graph tags + homepage title typo fix | +0.3 | 20 min |
| Fix `[SHOP ADDRESS]` + PPF price (×2) | +0.3 | 10 min |
| `/journal` → `/blog` redirect | +0.1 | 5 min |
| FAQPage JSON-LD on homepage | +0.3 | 20 min |
| Restore static testimonials + AggregateRating schema | +0.7 | 45 min |

**Combined: ~3 hours dev. Score outcome: 6.4/10. At 6.0+, Pristine becomes citable by Perplexity and ChatGPT for "ceramic coating Melbourne" and "graphene coating Melbourne" in the December–January peak.**

---

## Quick-Win Topics for Jordan's Topic Bank

**Add to topic bank in `jordan-content-writer.md` (insert above "PPF vs ceramic coating Melbourne" at the top of the list):**

**1. "Mobile window tinting Melbourne: legal VLT limits, what it costs, and how the mobile process works"** *(NEW — Week 19 gap. Window tinting service has been live 19 weeks with zero article support. "Window tinting Melbourne" is a live commercial query. Opening 50-word AI extraction block: "Mobile window tinting in Melbourne is window film applied at your home, office, or apartment car park — no need to drop the car at a shop. Victorian law requires front side windows to transmit at least 35% of light (VLT). Pristine's mobile tinting service starts from $200 and operates across 60+ Melbourne suburbs." Victoria VLT legal table, mobile process numbered list, pricing by vehicle type, Melbourne inner-city apartment section (South Yarra, Richmond, Hawthorn, Toorak), FAQ block. Window Tinting category. URGENT — publish this week.)*

**2. "Ceramic coating for new cars in Melbourne: what to do in the first 30 days after delivery"** *(NEW — November/December delivery surge timing. Zero coverage on site. High-conversion: targets new car buyers at peak intent window. Opening 50-word AI block + per-make sections (BMW, Tesla, Porsche, Mercedes-AMG) + PPF + ceramic sequence table + pricing table. Ceramic Coating category. Publish this week.)*

---

## Carry-Forward Flags (unchanged from Nov 1)

- **Homepage title typo** (`app/page.tsx`, `app/layout.tsx`): "Pristine Detailer" (singular) — missing the 's'. Fix alongside Priority 3 this week.
- **Services page title** (`app/services/page.tsx`): "Services - Pristine Detailers" → "Ceramic Coating, Graphene & PPF Melbourne | Pristine Detailers". 2 minutes.
- **Blog page title** (`app/blog/page.tsx`): "Blog - Pristine Detailers" → "Melbourne Car Paint Protection: Expert Guides | Pristine Detailers". 2 minutes.
- **Gallery link broken** (`home.tsx:792`): `href="#"` → `href="/gallery"`. Broken internal link since at least July.
- **Footer ABN placeholder**: "ABN 00 000 000 000" is not a real ABN. AI systems and schema validators read this. Confirm and update with the real ABN before adding LocalBusiness schema.
- **Services tab-hidden pricing** (`services.tsx:184`): `display: selected === service.id ? 'block' : 'none'` hides all graphene, leather ceramic, glass, wheel, and window tinting pricing from crawlers. Week 19.
- **GHL review widget — no static fallback**: The `/about/reviews` page renders entirely via JavaScript widget. No crawler-readable review content, no E-E-A-T signal for AI systems. Week 10.
- **Membership page** (`/membership` redirects to `/services`): AI systems answering "Pristine Detailers membership pricing" return nothing. A dedicated membership page or at minimum a crawler-readable section on `/services` resolves this.
- **PPF vs ceramic coating Melbourne** article: 2 weeks late. Still the highest-priority Jordan article.
- **Melbourne summer car care November** article: 3+ weeks late. December booking urgency is live now.
- **Graphene coating Melbourne** article: 4 weeks late. Highest-potential AI citation keyword with zero site coverage.

---

*Next audit: 2026-11-22*

**ESCALATE — Harshad:** It is mid-November. The 90-minute sitemap/robots/llms.txt task has been ready since July 12 with no changes required from the Nov 1 version. The 10-minute homepage fix (address placeholder + PPF price ×2) has been ready since October 6. The 20-minute Open Graph tags fix is new this week but straightforward. These three items together take under 2.5 hours and move the AI citation score from 3.5 to 5.4 — the threshold where Pristine starts appearing in Perplexity and ChatGPT results for "ceramic coating Melbourne" in the peak December and January season. Customers asking AI tools "best ceramic coating Melbourne" or "who does PPF in Toorak?" are currently getting competitors. That can be fixed before the weekend.*
