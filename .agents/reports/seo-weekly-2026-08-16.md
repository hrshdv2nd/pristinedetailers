# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-08-16
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Status: Zero SEO Fixes Shipped. Spring Article Deadline in 4 Days.

**What changed since 2026-08-09:**

| Item | Status |
|------|--------|
| `[SHOP ADDRESS]` placeholder in homepage FAQ | 🔴 **Still live** — **Week 4 unfixed** |
| Homepage FAQ membership price ("$150/month") | 🔴 **Still wrong** — Week 4 unfixed |
| Homepage services card Maintenance Detail price ("$150/mo") | 🔴 **Still wrong** — Week 4 unfixed |
| Services page Maintenance Detail price ("$150/mo") | 🔴 **Newly confirmed this audit** — `services.tsx:33` |
| PPF price on homepage (×2 locations) | 🔴 **Still $2,900** — inconsistent with services page ($3,000) |
| Membership pricing on site (Essential $99/mo, Signature $149/mo) | 🔴 **Still invisible** — Week 4 unfixed |
| `app/sitemap.ts` | ❌ Still missing — **WEEK 10** |
| `app/robots.ts` | ❌ Still missing — **WEEK 10** |
| `public/llms.txt` | ❌ Still missing — **WEEK 10** |
| Services tab-hidden pricing (all 5 panels) | ❌ Still invisible to crawlers — **WEEK 10** |
| Open Graph / Twitter Card tags | ❌ Still completely absent |
| FAQPage JSON-LD | ❌ Still missing |
| LocalBusiness + AggregateRating schema | ❌ Still missing |
| Title tags (homepage, services, blog) | ❌ Still keyword-weak |
| Gallery link `href="#"` | ❌ Still broken — `home.tsx:776` |
| Email inconsistency (hello@ vs info@) | ❌ Still unresolved |
| "Spring Car Care" article (Jordan — TIME-SENSITIVE) | 🔴 **Still not published** — **4 DAYS UNTIL DEADLINE (Aug 20)** |
| Window tinting article (Jordan) | ❌ Still not published — **WEEK 6 since service launch** |

**Commits since Aug 9:** Two social posts only. No SEO or pricing fixes shipped.

**New finding this audit:** The `$150/mo` Maintenance Detail price exists in two codebases, not one. `services.tsx:33` confirms the same wrong price is hardcoded into the services page itself (in the tab-selected content, which crawlers cannot see anyway due to `display: selected === service.id ? 'block' : 'none'` at `services.tsx:131`). This means when the tab-hidden content is eventually fixed for crawlers, the price that becomes visible will still be wrong.

---

## Top 3 Priority Issues

---

### Priority 1 — CRITICAL (Week 4): `[SHOP ADDRESS]` placeholder live in production

**Page:** `/` — `components/pages/home.tsx:818`

**Problem:**

A broken template token has been live on the homepage FAQ for four consecutive weeks:

```
'Detailing (full detail, ceramic coating, PPF, interior care) is completed at our studio - [SHOP ADDRESS]. The one exception is window tinting, which our mobile team installs at your home or office.'
```

Every AI crawler (GPTBot, PerplexityBot, ClaudeBot, Googlebot) that fetches this FAQ reads the broken placeholder. Any AI system asked "does Pristine Detailers come to me?" or "where is Pristine Detailers located?" will either extract the broken token or return no answer at all.

More damaging: the FAQ text contradicts the site's own identity. The product-marketing-context.md defines the business as mobile-first — "we come to you." The Melbourne section above the FAQ says "mobile window tinting brought to your driveway, garage, or office car park." The FAQ says the opposite: detailing is done at a studio. This internal contradiction reduces AI confidence in the site for all mobile-service queries — the site's #1 conversion category.

The business is currently invisible for "mobile car detailing Melbourne" queries in AI search because the one page that should confirm mobile delivery explicitly denies it.

**Specific fix** (5 minutes — `home.tsx:818`):
```tsx
{ q: 'Do you come to my home or office?', a: 'Yes — our mobile team comes to you. We need access to a tap and a standard power point within 15 metres, plus space roughly two parking bays wide. We operate across 60+ suburbs in East and South East Melbourne. Window tinting is also installed on-site at your location.' },
```

If the business has genuinely moved to a studio model, fill in the real address and update `product-marketing-context.md` to match. The placeholder cannot remain either way.

**Time to implement:** 5 minutes.

---

### Priority 2 — CRITICAL (Week 4 + New Scope): Wrong pricing in three locations on homepage, wrong pricing confirmed on services page

**Pages:** `/` (`home.tsx:235`, `home.tsx:237`, `home.tsx:663`, `home.tsx:821`) and `/services` (`services.tsx:33`)

**Problem:**

**Newly confirmed this audit:** The wrong Maintenance Detail price (`$150/mo`) is hardcoded in `services.tsx:33` as well as the homepage. Previous audits only flagged the homepage. This means when the tab-hidden content fix is eventually shipped, the first price a crawler reads on the services page will still be incorrect.

Full pricing error inventory across the site:

| File | Line | Current value | Correct value |
|------|------|--------------|---------------|
| `home.tsx` | 235 | `$150/mo` (Maintenance Detail card) | `$99/mo` (Essential) |
| `home.tsx` | 821 | `$150/month` (FAQ membership answer) | Neither tier costs $150/month |
| `home.tsx` | 237 | `$2,900` (PPF services card) | `$3,000` |
| `home.tsx` | 663 | `$2,900` (PPF section — Partial Front) | `$3,000` |
| `services.tsx` | 33 | `$150/mo` (Maintenance Detail in service selector) | `$99/mo` |

The membership pricing (Essential $99/mo, Signature $149/mo) is invisible on the entire site — not on `/`, not on `/services`, not on a `/membership` page. The homepage FAQ actively misinforms AI systems that membership costs $150/month. The services page tab-hidden Maintenance Detail says $150/mo. The `/membership` URL redirects to `/services`, where neither membership tier is listed.

**Melbourne searches currently failing:**
- "mobile car detailing membership Melbourne" → no page with accurate pricing
- "Pristine Detailers membership cost" → AI extracts $150/month from FAQ (wrong)
- "car detailing subscription Melbourne" → zero relevant content
- "paint protection film price Melbourne" → AI extracts $2,900 from homepage, $3,000 from services — conflicting

**Specific fixes:**

**Step 1 — Homepage services card** (`home.tsx:235`, 2 minutes):
```tsx
{ tag: '01', title: 'Maintenance Detail', blurb: 'Monthly wash-and-seal, included with Essential membership.', from: '$99', priceSuffix: '/mo', badge: 'Membership', href: '/services', image: '/images/20250525_093249.jpg' },
```

**Step 2 — Homepage FAQ membership answer** (`home.tsx:821`, 3 minutes):
```tsx
{ q: 'What does the membership include?', a: 'Essential ($99/mo) covers a monthly wash-and-seal detail and priority booking. Signature ($149/mo) adds a bi-monthly full detail, ceramic maintenance, and exclusive add-on pricing. Members save up to 35% annually.' },
```

**Step 3 — Homepage PPF prices** (`home.tsx:237` and `home.tsx:663`, 5 minutes):
Change both `$2,900` instances to `$3,000`.

**Step 4 — Services page Maintenance Detail price** (`services.tsx:33`, 2 minutes):
```tsx
price: '$99/mo',
```

**Step 5 — Add visible membership section to `/services`** (30 minutes):
Add a static, always-visible membership pricing block below the service selector in `services.tsx`. Must render as plain HTML — not inside the `selected === service.id` tab conditional. Copy-ready template from the July 26 and August 9 briefs is unchanged; reproduce it here on request.

**Time to implement:** 42 minutes total.

---

### Priority 3 — CRITICAL (Week 10, Final Escalation): No sitemap.ts, robots.ts, or llms.txt

**Page:** Site-wide (`app/`)

**Problem:**

Ten consecutive weeks flagged. Copy-paste-ready code provided in five consecutive briefs (July 12, July 19, July 26, August 9, and now). Zero implementation.

The compounding cost this week is acute:

1. **Spring article deadline is August 20 — 4 days away.** Jordan's topic bank flags it TIME-SENSITIVE. If the article is published without a sitemap, it will take 4–8 weeks to be discovered organically — placing indexation in late September or October, after Melbourne's spring search volume has already peaked. A sitemap gets it submitted to Google Search Console the day it publishes.

2. **Window tinting has been live for 6 weeks with zero content.** When Jordan's article finally ships, same problem: no sitemap means no fast indexation.

3. **The `llms.txt` absence is now compounded by Week 4 membership pricing invisibility.** AI systems have no machine-readable source for Essential ($99/mo) or Signature ($149/mo). The FAQ actively misleads with $150/month.

All three files have been copy-paste-ready since July 12. They are reproduced below.

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

**FINAL ESCALATION — Week 10:** Harshad, this is the tenth consecutive week. The spring article's searchability depends on this being live before Aug 20. These three files are copy-paste code that requires no design decisions. If the concern is developer time, these can be shipped by anyone with Next.js write access in one hour.

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "Ceramic coating warranty Melbourne: what your 8-year guarantee covers, what voids it, and how to claim"

**Target queries:** "ceramic coating warranty Melbourne", "what does ceramic coating warranty cover", "does ceramic coating have a warranty Australia", "ceramic coating warranty claim Melbourne", "how long is ceramic coating warranty"

**The gap:**

Pristine's homepage and services page both promote "manufacturer warranty up to 8 years" as a key differentiator — it appears in the hero, in the ceramic coating service description (`services.tsx:53`), and in the product-marketing-context.md proof points. Yet there is zero content anywhere on the site that explains what that warranty actually covers, what voids it, or how a customer would claim it.

For a $999+ service, "8-year warranty" is the most frequently cited trust signal in the buying decision — and the most frequently misunderstood. Melbourne car owners searching "ceramic coating warranty Melbourne" are in the final pre-booking phase. They want to know:
- Does the warranty cover swirl marks? (No — only coating delamination)
- Does going through an auto-wash void it? (Often yes)
- Does the Signature membership maintain the warranty? (Relevant conversion angle)
- How do I actually make a claim if the coating fails?

An article that answers these questions factually builds E-E-A-T, reduces buyer anxiety at the highest ticket service level, and positions Pristine as the transparent operator in a category where most competitors are vague.

**Format for AI extraction:**
- **Opening 50-word answer block:** "Ceramic coatings applied by Pristine Detailers carry a manufacturer warranty of 3–8 years depending on product tier. The warranty covers coating adhesion failure and loss of hydrophobic properties under normal use. It does not cover paint damage, swirl marks, or failure caused by machine washing. Claims are managed directly through Pristine."
- **Coverage table:** What's covered / What's not covered / Common misconceptions
- **What voids the warranty:** Machine washes, incorrect products, neglecting annual maintenance (feeds Signature membership conversion)
- **How to claim:** Step-by-step process with contact details
- **FAQ:** "Does the Signature membership keep my coating warranty valid?", "Can I wash my coated car at a drive-through?", "What if the coating peels within the warranty period?", "Do I need to service my coating every year?"

**Suggested title:** "Ceramic Coating Warranty in Melbourne: What Your 8-Year Guarantee Covers and What Voids It"
**Category:** Ceramic Coating
**Pass to Jordan:** Yes — add to topic bank. High-confidence AI citation candidate (trust/legal content type, specific numbers, FAQ block, brand differentiator).

---

### Content Idea 2 — "Bayside car detailing: how salt air from Port Phillip Bay damages your paint year-round"

**Target queries:** "car detailing Brighton Melbourne", "bayside car detailing", "salt air car paint Melbourne", "car detailing Sandringham", "car detailing Mordialloc", "car detailing Mornington Peninsula", "how does salt air damage car paint"

**The gap:**

The product-marketing-context.md explicitly calls out Bayside (Brighton, Sandringham, Mentone, Mordialloc) and the Mornington Peninsula as primary service areas, and specifically names "Bayside salt air near Port Phillip Bay" as a Melbourne paint threat. The topic bank has general suburb content ("Mobile car detailing in Toorak, Brighton & South Yarra") but nothing that specifically targets the Bayside salt-air mechanism — the reason Bayside drivers need a higher maintenance cadence than inner-east residents.

Salt air from Port Phillip Bay causes accelerated bonding of road grime and oxidation on unprotected clear coat — particularly visible on cars parked in driveways within 2km of the bay. Brighton, Sandringham, Hampton, and Mordialloc residents who park outside deal with this year-round, not just in summer. This is a hyper-local angle no competitor is currently covering and it maps directly to the ICP (Bayside residents, professional income, premium cars).

**Format for AI extraction:**
- **Opening 50-word answer block:** "Salt air from Port Phillip Bay accelerates paint oxidation and contamination bonding on cars in Brighton, Sandringham, Hampton, and Mordialloc. Cars parked within 2km of the bay need washing every 3–4 weeks — twice the frequency of inner-east Melbourne — and benefit most from a ceramic coating that repels salt-water deposits."
- **Suburb risk table:** Suburb / Distance from bay / Recommended wash frequency / Recommended protection
- **Salt air damage mechanism:** What it does to clear coat, why ceramic prevents it, why PPF protects chips
- **Service recommendation:** Essential membership (monthly wash-and-seal) is the correct maintenance cadence for Bayside residents
- **Mornington Peninsula extension:** Same issue applies on coastal drives (Nepean Highway) and beach-side parking
- **FAQ:** "Does living near Port Phillip Bay damage my car paint?", "How often should I wash my car in Brighton?", "Does ceramic coating help with salt air?", "Can you service cars in Mornington Peninsula?"

**Suggested title:** "Bayside Car Detailing: How Salt Air from Port Phillip Bay Damages Your Paint (and How to Stop It)"
**Category:** Detailing / Melbourne
**Pass to Jordan:** Yes — add to topic bank. Geographic entity density (Brighton, Sandringham, Hampton, Mordialloc, Port Phillip Bay, Mornington Peninsula) earns local AI citation for suburb-specific queries. High-converting ICP match.

---

## AI Citation Readiness Score

**Score: 3.5 / 10** — unchanged from July 26. No material fixes shipped.

### Reasoning

No SEO or pricing fixes were deployed since the August 9 audit. The PPF services page price remains the only positive fix this cycle (corrected to $3,000, July 28) — but the homepage still shows $2,900 in two places, actively contradicting the correct services page price.

One new finding compounds the membership pricing problem: `services.tsx:33` contains `$150/mo` for the Maintenance Detail — the same wrong price as the homepage card. When the tab-hidden content is eventually made crawler-visible, the price that becomes indexable will still be incorrect.

**Full signal scorecard:**

| Signal | Status | Change from Aug 9 |
|--------|--------|---------------------|
| `app/robots.ts` | ❌ Missing | **Week 10** |
| `app/sitemap.ts` | ❌ Missing | **Week 10** |
| `public/llms.txt` | ❌ Missing | **Week 10** |
| `[SHOP ADDRESS]` placeholder in FAQ | ❌ Live in production | **Week 4** |
| Membership pricing on site | ❌ Completely absent | **Week 4** |
| Homepage FAQ membership price ("$150/month") | ❌ Wrong | **Week 4** |
| Homepage services card Maintenance Detail ("$150/mo") | ❌ Wrong | **Week 4** |
| Services page Maintenance Detail price | ❌ Wrong ($150/mo) | **Newly confirmed this audit** |
| PPF price — services page | ✅ $3,000 | Fixed Jul 28 |
| PPF price — homepage (×2) | ❌ $2,900 (inconsistent) | Unfixed |
| FAQPage JSON-LD | ❌ Missing | No change |
| LocalBusiness + AggregateRating schema | ❌ Missing | No change |
| Open Graph / Twitter Card tags | ❌ Completely absent | No change |
| Services tab-hidden content | ❌ 4 of 5 panels invisible to crawlers | **Week 10** |
| Title tag: homepage | ❌ No mobile/service keywords | No change |
| Title tag: services page | ❌ "Services - Pristine Detailers" | No change |
| Title tag: journal index | ❌ "Journal - Pristine Detailers" | No change |
| Gallery link `href="#"` | ❌ Broken — `home.tsx:776` | No change |
| Email inconsistency (hello@ vs info@) | ❌ Unresolved | No change |
| Spring article (Jordan) | ❌ Not published — 4 days to deadline | TIME-CRITICAL |
| Window tinting article (Jordan) | ❌ Not published — Week 6 | Escalating |

### What moves the score to 6.0+ this week

| Fix | Score impact | Effort |
|-----|------------|--------|
| Fix `[SHOP ADDRESS]` placeholder | +0.3 | 5 min |
| Fix all wrong prices (home + services) + add membership to services page | +0.4 | 42 min |
| `robots.ts` + `sitemap.ts` + `llms.txt` | +0.8 | 60 min |
| LocalBusiness + AggregateRating schema | +0.5 | 45 min |
| Services tab-hidden content fix | +0.4 | 45 min |
| Title tag rewrites (homepage, services, blog) | +0.3 | 15 min |
| FAQPage JSON-LD | +0.3 | 20 min |

**Three hours of dev time gets the score to 6.0/10. Without those three fixes (placeholder + pricing + sitemap set), the score stays at 3.5/10 regardless of how many articles Jordan publishes.**

---

## Quick-Win Topics for Jordan's Topic Bank

Two new topics added below. The urgent action this week is **not a new topic** — it's shipping the spring article already in the bank before the August 20 deadline.

**URGENT — Spring article deadline is August 20 (4 days). If it isn't published by Monday, the September indexation window closes.**

**New to topic bank this week:**

**1. "Ceramic Coating Warranty in Melbourne: What Your 8-Year Guarantee Covers and What Voids It"** *(added by Alex 2026-08-16 — targets "ceramic coating warranty Melbourne", "what does ceramic coating warranty cover", "does ceramic coating have a warranty Australia". The site promotes "up to 8-year manufacturer warranty" as a key differentiator but has zero content explaining it. Opening 50-word answer block: "Ceramic coatings applied by Pristine Detailers carry a manufacturer warranty of 3–8 years depending on product tier. The warranty covers coating adhesion failure and loss of hydrophobic properties under normal use. It does not cover paint damage, swirl marks, or failure caused by machine washing." Coverage table: what's covered / what's not / common misconceptions. What voids the warranty section: machine washes, incorrect products, skipping annual maintenance (natural Signature membership conversion — the membership maintains warranty compliance). How to claim: step-by-step with contact details. FAQ: "Does the Signature membership keep my coating warranty valid?", "Can I wash my coated car at a drive-through?", "What if the coating peels within the warranty period?". Ceramic Coating category.)*

**2. "Bayside Car Detailing: How Salt Air from Port Phillip Bay Damages Your Paint Year-Round"** *(added by Alex 2026-08-16 — targets "car detailing Brighton Melbourne", "bayside car detailing", "salt air car paint Melbourne", "car detailing Sandringham", "car detailing Mornington Peninsula". Brighton, Sandringham, Hampton, and Mordialloc are primary ICP suburbs named in product-marketing-context.md. Salt air from Port Phillip Bay is explicitly called out as a Melbourne expertise differentiator. Opening 50-word answer block: "Salt air from Port Phillip Bay accelerates paint oxidation on cars in Brighton, Sandringham, Hampton, and Mordialloc. Cars parked within 2km of the bay need washing every 3–4 weeks — twice the frequency of inner-east Melbourne — and benefit most from a ceramic coating that repels salt-water deposits." Suburb risk table: suburb / distance from bay / recommended wash frequency / recommended protection. Salt-air damage mechanism: what it does to clear coat, why ceramic prevents it, why PPF protects against chips. Extend to Mornington Peninsula (coastal drives on Nepean Highway, beach-side parking). Natural conversion to Essential membership ($99/mo monthly wash-and-seal is the correct Bayside maintenance cadence). FAQ: "Does living near Port Phillip Bay damage car paint?", "How often should I wash my car in Brighton?", "Does ceramic coating help with salt air?", "Can you service cars on the Mornington Peninsula?". Detailing / Melbourne category.)*

---

## Carry-Forward Flags (all still open)

- **Spring article (Jordan):** 4 days to August 20 deadline. Sitemap must be live BEFORE the article is published to trigger fast Google indexation.
- **`product-marketing-context.md` needs updates:**
  - Line 18: Remove "Basic Detailing: from $150" — service no longer exists
  - Line 22: Update PPF price from $2,900 → $3,000
- **Gallery link** (`home.tsx:776`): `href="#"` → `href="/gallery"`. 2 minutes.
- **Email consistency**: Footer uses `hello@pristinedetailers.com.au`, contact page metadata uses `info@pristinedetailers.com.au` — confirm the correct address and align sitewide.
- **Open Graph tags**: Add to `app/layout.tsx`. Every social share and WhatsApp link preview currently renders a generic stub. 20-minute fix.
- **Title tags**: Homepage: "Mobile Car Detailing Melbourne | Ceramic Coating & PPF | Pristine Detailers". Services: "Car Detailing Services Melbourne | Ceramic Coating, PPF & Window Tinting | Pristine Detailers". Journal: "Car Detailing Journal Melbourne | Pristine Detailers".
- **Services tab-hidden content** (`services.tsx:131`): `display: selected === service.id ? 'block' : 'none'` hides 4 of 5 service panels from all crawlers. Week 10.
- **Window tinting article (Jordan)**: Week 6. Mobile window tinting service launched July 6. Zero content. No sitemap to index it when published.

---

*Next audit: 2026-08-23*

**ESCALATE — Harshad:** Four weeks of the same `[SHOP ADDRESS]` placeholder on a mobile-first business. Ten weeks of no sitemap, robots, or llms.txt. The spring article deadline is Monday. The window tinting service is 6 weeks old with no article. The fix list is the same fix list. The briefs have included copy-paste-ready code since July 12. Combined implementation time for the three highest-impact fixes: under 2 hours.*
