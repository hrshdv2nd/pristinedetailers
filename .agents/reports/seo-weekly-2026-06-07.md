# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-06-07
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Status Check: What Changed Since Last Week

**Nothing changed. Five weeks of the same three issues.**

Filesystem confirmed this morning:
- `app/sitemap.ts` — not created
- `app/robots.ts` — not created
- `app/page.tsx` line 1 — still `'use client'`
- `components/pages/journal-article.tsx` line 1 — still `'use client'`
- `public/llms.txt` — not created
- `home.tsx` line 890 gallery link — still `href="#"`
- `home.tsx` line 69 — still "30 reviews"; line 940 — still "39 reviews"
- Blog index title — still `'Blog — Pristine Detailers'`

Jordan has now published articles for 5+ weeks. None of them are guaranteed to be indexed by Google within any reasonable timeframe, and none of them can be cited by ChatGPT, Perplexity, or Claude. The content investment is real; the discovery infrastructure is not.

This week's audit also surfaced a new finding: **cross-page data conflicts on ceramic warranty duration and membership discount rate**. AI engines encountering these conflicts will either refuse to cite the numbers or will confidently cite the wrong figure. This is new and is Priority 3 below.

---

## Top 3 Priority Issues

---

### Priority 1 — CRITICAL (Week 5): No Sitemap or Robots.txt

**Page:** Site-wide

**Problem:**

`app/sitemap.ts` and `app/robots.ts` do not exist. No `public/sitemap.xml` or `public/robots.txt` either. Five consecutive audits. Zero progress.

Jordan is publishing twice a week. Every article at `/blog/[slug]` can only be discovered if Googlebot follows a link from the blog index — a page that itself has no external backlinks pointing to it and no sitemap reference. For a domain in this authority tier, expect 4–8 week indexing delays per article without a sitemap.

The robots.txt absence is the AI citation blocker. GPTBot (ChatGPT), PerplexityBot, ClaudeBot (Claude), and Google-Extended (Gemini / AI Overviews) check `robots.txt` before indexing and citing. Some cautious AI crawlers treat a missing `robots.txt` as a signal to skip non-linked content. There is no guaranteed AI access to any Pristine Detailers content.

**Melbourne queries this blocks:** "ceramic coating Melbourne", "PPF cost Melbourne", "mobile car detailing Melbourne", "paint correction Melbourne", "car detailing membership Melbourne" — every commercial query the journal is written to appear in.

**Specific Fix (30 minutes):**

Create `app/sitemap.ts`:
```ts
import { createClient } from '@supabase/supabase-js';

export default async function sitemap() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );

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
    { url: 'https://pristinedetailers.com.au',            priority: 1.0 },
    { url: 'https://pristinedetailers.com.au/services',   priority: 0.9 },
    { url: 'https://pristinedetailers.com.au/membership', priority: 0.9 },
    { url: 'https://pristinedetailers.com.au/blog',       priority: 0.8 },
    { url: 'https://pristinedetailers.com.au/booking',    priority: 0.8 },
    { url: 'https://pristinedetailers.com.au/gallery',    priority: 0.6 },
    { url: 'https://pristinedetailers.com.au/contact',    priority: 0.5 },
  ].map(p => ({ ...p, changeFrequency: 'monthly' as const }));

  return [...staticPages, ...articles];
}
```

Create `app/robots.ts`:
```ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*',              allow: '/' },
      { userAgent: 'GPTBot',         allow: '/' },
      { userAgent: 'ChatGPT-User',   allow: '/' },
      { userAgent: 'PerplexityBot',  allow: '/' },
      { userAgent: 'ClaudeBot',      allow: '/' },
      { userAgent: 'anthropic-ai',   allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
    sitemap: 'https://pristinedetailers.com.au/sitemap.xml',
  };
}
```

After deploying, submit `https://pristinedetailers.com.au/sitemap.xml` in Google Search Console manually. This is the only step after the code is live.

**Time to implement:** 30 minutes.

---

### Priority 2 — CRITICAL (Week 5): Homepage Is `'use client'` — No Metadata, No FAQ Visible to AI

**Page:** `/` (`app/page.tsx` line 1, `components/pages/home.tsx`)

**Problem:**

`app/page.tsx` opens with `'use client'`. A `'use client'` page route cannot export `metadata`. The homepage title is permanently inherited from the root layout: *"Pristine Detailers — Melbourne's Premium Mobile Detailing"* — fixed, uncontrollable, and missing primary commercial keywords like "mobile car detailing Melbourne", "ceramic coating Melbourne", and "PPF Melbourne".

The compounding issue: `home.tsx` contains a `FAQSection` (lines 991–1044) with four direct-answer passages that Melbourne buyers type verbatim before booking:

- *"Do you come to my home or office?"*
- *"How long does a ceramic coating application take?"*
- *"Can I combine PPF and ceramic coating?"*
- *"What does the membership include?"*

These are 20–40 word, self-contained answers — exactly the extractable passages that ChatGPT and Perplexity cite in AI answers. But `FAQSection` uses `useState` and renders entirely in the browser. AI crawlers fetching the homepage receive a JavaScript shell. These answers do not exist for any AI engine.

**Melbourne queries this blocks:** "mobile car detailing Melbourne" (primary commercial query), "can you get PPF and ceramic coating together", "how long does ceramic coating take", "car detailing membership Melbourne $79".

**Specific Fix (30 minutes):**

Step 1 — Remove `'use client'` from `app/page.tsx`. Add metadata export. The `'use client'` directive belongs in `components/pages/home.tsx` where `useState` lives — not in the page route.

```tsx
// app/page.tsx — replace the entire file with:
import type { Metadata } from 'next';
import { Home } from '@/components/pages/home';

export const metadata: Metadata = {
  title: 'Mobile Car Detailing Melbourne — Ceramic Coating & PPF | Pristine Detailers',
  description: 'Premium mobile car detailing across Melbourne. Ceramic coating from $750, PPF from $2,900, membership from $79/mo. We come to your driveway — Toorak, Brighton, South Yarra and 60+ suburbs.',
};

export default function Page() {
  return <Home />;
}
```

Step 2 — Add FAQPage JSON-LD to `app/page.tsx`. The four FAQ answers from `home.tsx` are the source material — no new writing required:

```tsx
// Add inside Page() return, before <Home />:
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Do you come to my home or office for car detailing in Melbourne?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — our mobile team comes to you anywhere across Melbourne. We need access to water and power, and a covered or open space roughly the size of two parking bays. Same-day bookings available by phone."
      }
    },
    {
      "@type": "Question",
      "name": "How long does a ceramic coating application take in Melbourne?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A full ceramic coating application including paint correction is typically a full day of work. Brand-new vehicles with no correction needed may take less time. All work is done by certified technicians at your location."
      }
    },
    {
      "@type": "Question",
      "name": "Can I combine PPF and ceramic coating on my car?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — we recommend combining both for maximum protection. PPF goes on first as a physical barrier against stone chips and scratches. Ceramic coating goes on top for a hydrophobic finish, UV resistance, and self-heal enhancement."
      }
    },
    {
      "@type": "Question",
      "name": "What does the Pristine Detailers membership include?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "From $79/month, the Essential membership includes one monthly wash-and-seal detail, priority same-week booking, and 10% off all other services. The Signature membership at $149/month includes bi-monthly detailing, ceramic maintenance, and exclusive add-on pricing."
      }
    }
  ]
};

return (
  <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
    <Home />
  </>
);
```

**Time to implement:** 30 minutes.

---

### Priority 3 — HIGH (New This Week): Cross-Page Data Conflicts — Ceramic Warranty and Membership Discount Are Different on Every Page

**Pages:** `components/pages/home.tsx`, `components/pages/services.tsx`, `components/pages/membership.tsx`

**Problem:**

This week's audit found two active data conflicts across the site that will cause AI engines to either refuse to cite the specific numbers, or confidently cite the wrong figure to Melbourne searchers.

**Conflict 1 — Ceramic coating warranty duration:**
- `home.tsx` ServicesPreview (line 219): blurb says "3 to 5-year paint protection"
- `home.tsx` FlagshipSection (line 386 tier label): "5YR"
- `home.tsx` FlagshipSection (line 349): "lasting up to 5 years"
- `services.tsx` ceramic coating body (line 37): "backed by a manufacturer warranty of up to **8 years**"

The homepage says 5 years; the services page says 8 years. These are not close. A Melbourne buyer who reads both pages — or whose AI assistant queries both — gets contradictory information. AI engines encountering conflicting numbers on the same domain will cite the most conservative figure or skip the statistic entirely.

**Fix for Conflict 1:** Resolve to one number across all pages and hold it. If 8 years is accurate (manufacturer warranty), update `home.tsx` FlagshipSection to match. If 5 years is the guaranteed customer-facing figure, update `services.tsx` line 37. The product marketing context says "3–8 year protection" — pick the marketable number (5 years for coating, 8 years with manufacturer backing if applicable) and use it consistently.

**Conflict 2 — Membership discount percentage:**
- `home.tsx` MembershipTeaser (line 812): "15% off coatings"
- `home.tsx` FAQSection (line 997): "10% off all our other services"
- `membership.tsx` member benefit card (line 67): "Signature members save up to **35%** on bookings annually"

Three different discount figures on the same site: 10%, 15%, and 35%. No AI engine will confidently cite any of these — and a buyer who sees all three won't know what the actual benefit is.

**Fix for Conflict 2:** Audit the actual membership tier benefits and establish a single source of truth. Suggested: Essential plan = "10% off all services"; Signature plan = "up to 35% savings annually." Update all three surfaces (`home.tsx` lines 812 and 997, `membership.tsx` line 67, and the FAQ in `home.tsx` and `membership.tsx`) to use the same figures tied to the correct plan tier.

**Why this is an AI citation blocker specifically:** Princeton GEO research shows that statistics and specific numbers increase AI citation rate by +37%. But conflicting numbers on the same domain have the opposite effect — AI engines learn to avoid citing specific claims from domains where stated facts contradict each other. Fixing data consistency is a prerequisite for AggregateRating schema and any numerical claims to perform in AI answers.

**Time to implement:** 20 minutes for an audit + find-replace across the three component files.

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "How Often Should You Wash Your Car in Melbourne? A Seasonal Guide"

**Target queries:** "how often should I wash my car Melbourne", "car wash frequency Melbourne", "how often detail car Australia", "how often ceramic coating maintenance"

**The gap:** Melbourne car owners search this question constantly — especially after buying a new vehicle or getting a ceramic coating installed. None of Jordan's published articles and none of the journal topic bank addresses this directly. The closest existing content is "How to wash a car that has a ceramic coating" (in Jordan's base list), but that is a how-to, not a frequency guide.

This query sits at the top of the funnel and terminates naturally in a membership pitch: if you need your car washed every 4–6 weeks, a $79/month membership that includes a monthly wash-and-seal is the obvious answer.

**Why this is AI-citable:** The answer format is perfectly extractable — it's essentially a schedule table, which AI systems quote directly. A Melbourne-specific frequency guide that accounts for the city's UV intensity, autumn bird dropping season (especially in Toorak and Brighton near river/bay), and the winter road salt period on coastal suburbs earns geographic relevance signals.

**Format for AI extraction:**
- Lead paragraph (40–60 words): "In Melbourne, most cars need a wash every 4–6 weeks. Cars parked outdoors in Inner East or Bayside suburbs need washing every 2–4 weeks during autumn, when bird droppings are most acidic. A ceramic coating doesn't change the frequency — it changes how easy each wash is."
- Seasonal table: Season / Recommended frequency / Primary threat / Why
- "What happens if you leave it too long" — Melbourne-specific: UV from Port Phillip Bay ambient reflection, jacaranda and eucalyptus sap seasons
- "Does a ceramic coating mean I need to wash less often?" — AI-citable Q&A block
- Membership CTA: naturally positioned at the end — "If you're washing monthly, a Pristine membership covers it."

**Suggested title:** "How Often Should You Wash Your Car in Melbourne? A Seasonal Frequency Guide"
**Category:** Detailing
**Pass to Jordan:** Yes — add to topic bank.

---

### Content Idea 2 — "Paint Protection for New Cars in Melbourne: What to Do in the First 30 Days"

**Target queries:** "paint protection new car Melbourne", "ceramic coating new car Melbourne", "PPF new car Melbourne", "should I get ceramic coating on new car", "new car paint protection worth it Melbourne"

**The gap:** New car buyers are the highest-converting segment in the entire detailing market — they have budget, they're emotionally invested in the vehicle, and they're actively looking for protection options in the first weeks after purchase. No article in Jordan's current topic bank addresses this buyer specifically, and no existing page on the site speaks to the new-car purchase moment.

This query has a natural urgency driver: the earlier after delivery a ceramic coating or PPF is applied, the less paint prep (and therefore cost) is involved. Melbourne's Eastern Freeway and EastLink also generate stone chip exposure from day one, making the "first 30 days" framing genuinely useful rather than manufactured.

**Why this is AI-citable and high-converting:** "Should I get ceramic coating on my new car?" is one of the most common questions on Australian car forums. An article with a direct expert answer earns AI citations for this query — and immediately positions Pristine as the Melbourne service provider to call. The buyer intent at this query is as high as it gets.

**Format for AI extraction:**
- Direct answer in paragraph 1 (40–60 words): "New cars should have paint protection applied within the first 30–60 days of delivery. The factory paint is in its cleanest state and requires minimal preparation — which reduces both the time and cost of the job. Waiting means contaminants, bird drops, and stone chips may already require correction before protection can be applied."
- "What protection does a new car's factory paint actually have?" — definition block
- "PPF vs ceramic for a new car: which first?" — comparison table (AI cites tables at ~33%)
- "The Melbourne new car threat list" — stone chips (Eastern Freeway, Eastlink), UV near Port Phillip, car park scratches in South Yarra/CBD
- FAQ block: "Can I wax my new car before getting ceramic?" / "How soon after delivery?" / "Will the dealership package do the same job?"
- "What Pristine recommends for new car owners" — specific service path

**Suggested title:** "Paint Protection for New Cars in Melbourne: What to Do in the First 30 Days After Delivery"
**Category:** Ceramic Coating (or Paint Protection Film — either works)
**Pass to Jordan:** Yes — add to topic bank.

---

## AI Citation Readiness Score

**Score: 3.5 / 10** — Week 5 unchanged.

This score has not moved since 2026-05-24. It cannot move without code changes. The table below is exact — every row is a specific file and a specific fix.

| Signal | Current Status | File / Location | Effort |
|--------|---------------|-----------------|--------|
| `robots.txt` — AI bot access | **Missing** | Create `app/robots.ts` | 15 min |
| `sitemap.xml` — content discovery | **Missing** | Create `app/sitemap.ts` | 15 min |
| Homepage `metadata` export | **Blocked** (`'use client'` in `app/page.tsx` line 1) | Remove directive, add export | 20 min |
| Homepage FAQPage JSON-LD | **Missing** | Add to `app/page.tsx` | 20 min |
| `JournalArticle` server-rendered | **Blocked** (`'use client'` in `journal-article.tsx` line 1) | Delete that one line | 10 min |
| Article `BlogPosting` schema | **Missing** | Add to `app/blog/[slug]/page.tsx` | 30 min |
| Services page `metadata` | **Missing** | `app/services/page.tsx` has no metadata export | 10 min |
| Membership page `metadata` | **Missing** | `app/membership/page.tsx` has no metadata export | 10 min |
| `LocalBusiness` JSON-LD in layout | **Missing** | Add to `app/layout.tsx` | 45 min |
| `AggregateRating` schema | **Blocked** (review count wrong + data conflict) | Fix data first, then add | 30 min |
| Data consistency (warranty + discount) | **Conflicting** — NEW this week | Fix across `home.tsx`, `services.tsx`, `membership.tsx` | 20 min |
| Review count consistency | **Wrong** (30 / 39 / 240 — three figures on site) | `home.tsx` lines 69, 940 | 10 min |
| Blog index title | **Generic** (`'Blog — Pristine Detailers'`) | `app/blog/page.tsx` line 4 | 5 min |
| Article title pattern missing "Melbourne" | **Missing** | `app/blog/[slug]/page.tsx` line 30 | 5 min |
| Gallery link broken (`href="#"`) | **Broken** | `home.tsx` line 890 | 1 min |
| `public/llms.txt` | **Missing** | New file in `public/` | 20 min |

**Total time to close everything above: approximately 4.5 hours.**

### Score model — what each fix is worth:

| Fix | Score impact |
|-----|-------------|
| `robots.ts` + `sitemap.ts` | +0.5 |
| Homepage server component + metadata | +0.5 |
| Homepage FAQPage JSON-LD | +0.5 |
| `journal-article.tsx` remove `'use client'` + Article schema | +0.8 |
| Services + membership metadata (10 min each) | +0.3 |
| Data consistency fix (prerequisite for schema) | +0.2 |
| `LocalBusiness` + `AggregateRating` in layout | +0.7 |
| Review count fix | +0.1 |
| Blog title + article title "Melbourne" | +0.1 |
| `llms.txt` in `public/` | +0.3 |

**Projected score if all implemented this week: 7.5/10.**

### What 7.5/10 unlocks for Melbourne searches

- **FAQPage schema → Google FAQ rich results** for "mobile car detailing Melbourne" and "ceramic coating Melbourne" — estimated +15–25% click-through rate from standard blue-link results
- **robots.txt AI bots** → Perplexity, ChatGPT, and Claude can now index and cite all journal articles
- **Article schema on blog posts** → AI engines can attribute and correctly cite Pristine articles — estimated +30–40% citation rate on non-Google AI engines
- **Sitemap** → All published and future articles indexed within days, not weeks
- **LocalBusiness + AggregateRating** → Google Business knowledge panel and rich snippets for branded searches

---

## Quick-Win Topics Added to Jordan's Topic Bank

The following two topics should be added to the topic bank in `jordan-content-writer.md`:

**1. "How Often Should You Wash Your Car in Melbourne? A Seasonal Frequency Guide"**
*(Added by Alex — high-volume informational query unserved by any existing content; seasonal table format perfect for AI extraction; natural membership conversion path at end of article. Detailing category.)*

*Note for Jordan: lead with a direct one-sentence answer that includes a specific number ("In Melbourne, most cars need washing every 4–6 weeks — or every 2–4 weeks during autumn near Bayside and Inner East suburbs"). That sentence is what AI engines extract. Build a seasonal frequency table before any explanatory copy. End with membership as the natural conclusion, not a sales pitch.*

**2. "Paint Protection for New Cars in Melbourne: What to Do in the First 30 Days After Delivery"**
*(Added by Alex — targets new car buyer segment at peak conversion intent, immediately after vehicle purchase. "Should I get ceramic on my new car?" is one of the most-searched detailing questions in Australian car forums. Comparison table (PPF vs ceramic for new car) earns AI citation at ~33%. Ceramic Coating or Paint Protection Film category.)*

*Note for Jordan: open with a direct expert answer in paragraph 1 — "New cars should have paint protection applied within 30–60 days of delivery." That sentence answers the primary intent query and is what AI engines cite. Include Melbourne-specific threats (stone chips: Eastern Freeway and Eastlink, UV near Port Phillip Bay, bird drops in inner east suburbs). End with a clear recommendation: start with PPF on high-impact zones, add ceramic coating on top.*

---

## Carry-Forward Secondary Flags (Not Yet Escalated to Priority)

These are not new — they are repeat items from previous briefs that have not been actioned:

- **`journal-article.tsx` `'use client'` removal** (`components/pages/journal-article.tsx` line 1): Delete one line. All article body content is currently invisible to AI crawlers. Every article Jordan publishes is uncitable. This is 10 minutes of work and has been open for 2 weeks.
- **Services page metadata missing** (`app/services/page.tsx`): No `metadata` export. The h1 says "We treat every car like the one we drive" — zero keyword signals. `title: 'Car Detailing Services Melbourne — Ceramic Coating, PPF & Detailing | Pristine Detailers'` takes 5 minutes to add.
- **Membership page metadata missing** (`app/membership/page.tsx`): Same. `title: 'Car Detailing Membership Melbourne — From $79/mo | Pristine Detailers'` takes 5 minutes.
- **Blog index title generic** (`app/blog/page.tsx` line 4): `'Blog — Pristine Detailers'` → `'Car Detailing Blog Melbourne | Ceramic Coating & PPF Guides | Pristine Detailers'`. One-line change.
- **Article title pattern missing Melbourne** (`app/blog/[slug]/page.tsx` line 30): `${data.title} — Pristine Detailers` → `${data.title} | Melbourne | Pristine Detailers`. One-line change.
- **Gallery link broken** (`home.tsx` line 890): `href="#"` → `href="/gallery"`. One-line change, 30 seconds.
- **Review count wrong** (`home.tsx` lines 69 and 940): "30 reviews" and "39 reviews" should both read "240 reviews" per the reviews page. Required before AggregateRating schema can be added.
- **`app/journal/page.tsx` is dead code**: The `/journal` → `/blog` redirect in `next.config.mjs` means this file is never served. Can be deleted.
- **`public/llms.txt` missing**: 20 minutes to create a plain-text service summary for AI agents. Immediate AI discoverability improvement at zero dev cost.

---

*Next audit: 2026-06-14. Priority escalation: sitemap + robots.txt (Priority 1, Week 6 if still open) and homepage `'use client'` (Priority 2, Week 6 if still open) should now be treated as deployment blockers and raised with the full team — not as open recommendations. The `journal-article.tsx` one-line fix (10 minutes, every article Jordan publishes is affected) should be a same-day action item.*
