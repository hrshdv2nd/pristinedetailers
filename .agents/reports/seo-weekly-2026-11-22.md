# SEO Weekly Brief — Pristine Detailers
**Week of:** 2026-11-22  
**Prepared by:** Alex (SEO & Discovery Manager)

---

## Status: Week 20 — Peak Booking Window Is Open. Zero Fixes Shipped.

**Last report:** 2026-11-15. Zero fixes from that report have shipped. Zero fixes from any report since Week 1 have shipped on the infrastructure items. We are now in Week 20.

**What Week 20 means:** December is 8 days away. Melbourne ceramic coating and PPF bookings operate on a 4–6 week lead time. Customers booking a December appointment are searching **right now**, this weekend, the first week of November. A customer who discovers Pristine today and books before December 1 has a slot that fills their car before Christmas. Without a sitemap, those blog articles Google hasn't yet prioritised for crawling remain uncrawled. Without llms.txt, Perplexity and ChatGPT cannot reliably cite Pristine's pricing, services, or studio details when answering "ceramic coating Melbourne December" or "PPF Melbourne before Christmas". Without fixing the `[SHOP ADDRESS]` placeholder, every AI system that answers questions about Pristine Detailers is reading and repeating a broken FAQ.

The window for capturing Melbourne's summer and Christmas booking surge is **not December** — it is November, and it is happening now.

| Item | Status | Weeks Outstanding |
|------|--------|-------------------|
| `app/sitemap.ts` | ❌ Missing | **Week 20** |
| `app/robots.ts` | ❌ Missing | **Week 20** |
| `public/llms.txt` | ❌ Missing | **Week 20** |
| `[SHOP ADDRESS]` on homepage FAQ (`home.tsx:817`) | ❌ Still live | **Week 14** |
| Homepage PPF price `$2,900` (`home.tsx:253`) | ❌ Still wrong | **Week 14** |
| Homepage PPF price `$2,900` (`home.tsx:680`) | ❌ Still wrong | **Week 14** |
| Open Graph / Twitter Card tags (`app/layout.tsx`) | ❌ Missing | **Week 20** |
| "Pristine Detailer" title typo (`app/layout.tsx:7`) | ❌ Missing the 's' | **Week 20** |
| Services tab-hidden pricing (`services.tsx:184`) | ❌ Crawler-invisible | **Week 20** |
| LocalBusiness + AggregateRating schema | ❌ Missing | **Week 20** |
| FAQPage JSON-LD | ❌ Missing | **Week 20** |
| `/journal` → `/blog` redirect — dual index, no canonical | ❌ Not fixed | **Week 3** |
| Blog page title `app/blog/page.tsx`: "Blog - Pristine Detailers" | ❌ Weak SEO title | **Week 20** |
| Jordan — "PPF vs ceramic coating Melbourne" article | ❌ **3 weeks overdue** | Missed Nov 1 |
| Jordan — "Ceramic coating for new cars in Melbourne" article | ❌ Not published | Added Nov 15 |
| Jordan — "Mobile window tinting Melbourne" article | ❌ Not published | **Week 20 — service live July 6** |
| Jordan — "Graphene coating Melbourne" article | ❌ Not published | Priority since Oct 18 |
| Jordan — "Melbourne summer car care" article | ❌ **4+ weeks overdue** | Missed Oct 25 |

---

## Top 3 Priority Issues

---

### Priority 1 — CRITICAL (Week 20): Deploy sitemap, robots.txt, and llms.txt this weekend

**Pages affected:** Site-wide. Every article at `/blog/[slug]`.

**Problem:**

Week 20. The code from the Nov 1 report requires no changes. These are three files. The deployment task is 90 minutes. The November-to-December window is the single highest-ROI week of the year for deploying them.

A sitemap tells Google which pages to prioritise. Without it, Pristine's blog articles compete for crawl budget with every other page on a site Google has never seen a sitemap for — meaning the "PPF vs ceramic coating Melbourne", "graphene coating Melbourne", and "window tinting Melbourne" articles Jordan is about to publish won't be indexed in time for December searches.

A robots.txt that explicitly allows GPTBot, PerplexityBot, ClaudeBot, anthropic-ai, and ChatGPT-User is the minimum signal AI search systems check before deciding whether to cite a page. Without it, Perplexity and ChatGPT follow a permissive default — but they deprioritise sites with no explicit AI-bot policy in favour of those that actively invite citation.

llms.txt gives AI systems a machine-readable fact sheet: studio-based for coating/PPF, mobile for window tinting, prices (excl. GST), certification (Ceramic Pro, Gtechniq), 60+ suburbs, 2,400+ cars protected, 4.9 stars. When a customer asks ChatGPT "how much does ceramic coating cost in Melbourne?", a site with llms.txt is the one the model cites with pricing.

**All three files are ready in the Nov 1 report (no changes needed from that version):**

- `app/sitemap.ts` — static pages + `/blog/${post.slug}` (corrected from `/journal/` error in prior version)
- `app/robots.ts` — allows GPTBot, PerplexityBot, ClaudeBot, anthropic-ai, ChatGPT-User, Google-Extended
- `public/llms.txt` — studio address, service menu with prices, certification, service area, booking URL

**After deploying:** Submit `https://pristinedetailers.com.au/sitemap.xml` to Google Search Console that same day.

**Time to implement:** 90 minutes. Code is in the Nov 1 report, unmodified.

---

### Priority 2 — CRITICAL (Week 14): Three live homepage errors that AI systems read and repeat to customers

**Page:** `/` (`components/pages/home.tsx`)

**Problem:**

Three errors remain live on the homepage. AI systems — ChatGPT, Perplexity, Claude — extract FAQ answers and pricing directly from page content when answering queries about Pristine Detailers. A customer asking "what is Pristine Detailers' address?" currently receives "[SHOP ADDRESS]" in the answer. A customer asking "how much is PPF at Pristine?" currently receives "$2,900" (wrong — the correct price is $3,000, updated July 2026). These are not hypothetical — they are live extraction errors.

| Location | Current | Correct |
|----------|---------|---------|
| `home.tsx:817` — FAQ "Do you come to my home or office?" | `...studio - [SHOP ADDRESS]` | Replace with the specific copy below |
| `home.tsx:253` — Services card, PPF price | `from: '$2,900'` | `from: '$3,000'` |
| `home.tsx:680` — PPF section, Partial Front | `price: '$2,900'` | `price: '$3,000'` |

**Specific fix for `home.tsx:817`:**
```tsx
{ q: 'Do you come to my home or office?', a: 'Ceramic coating, graphene coating, and PPF are completed at our dedicated Melbourne studio — studio-based work is essential for the quality we guarantee. Window tinting is the exception: our mobile team installs it at your home, office, or apartment car park across 60+ suburbs.' },
```

**Time to implement:** 10 minutes.

---

### Priority 3 — HIGH (Week 20): Open Graph tags and "Pristine Detailer" title typo — now a December-critical fix

**Pages:** `app/layout.tsx`, `app/page.tsx`

**Problem:**

November is peak social sharing season for Pristine's services — existing customers sharing with friends who just bought a car, ad click-throughs, Instagram bio link visits, WhatsApp group shares from Jordan's social posts. Every one of these shares generates a blank card: no image, no title, no description. The title that does appear is "Pristine Detailer" — singular, missing the 's'. That is the brand name the site is presenting to every new visitor arriving via social share.

`app/layout.tsx` has zero `openGraph` or `twitter` block (confirmed: the metadata export ends at `description`). `app/page.tsx` title field also reads "Pristine Detailer" (line 5).

**Fix for `app/layout.tsx` metadata export — add after the existing `description` field:**
```ts
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
```

**Also fix the title string in both files simultaneously:**
- `app/layout.tsx:7`: `"Pristine Detailer | Melbourne's Paint Protection Specialists"` → `"Pristine Detailers | Ceramic Coating, Graphene & PPF Melbourne"`
- `app/page.tsx:5`: `"Pristine Detailer | Melbourne's Paint Protection Specialists"` → `"Pristine Detailers | Ceramic Coating, Graphene & PPF Melbourne"`

**Time to implement:** 20 minutes.

---

## 2 New Content Ideas Based on Keyword Gaps

---

### Content Idea 1 — "Ceramic coating and window tinting on the same day in Melbourne: how the booking works"

**Target queries:** "ceramic coating and window tinting same day Melbourne", "can I get ceramic coating and window tint together Melbourne", "how to book ceramic coating and window tinting Melbourne", "bundle ceramic coating window tinting Melbourne"

**The gap:**

This query represents a specific customer segment Pristine already has: the customer who wants maximum protection from one engagement — coating the paint AND tinting the glass — and is asking whether they can combine the services. It has zero site coverage. The answer (window tinting is mobile, so it *can* be sequenced across two days — tinting on day one at home, ceramic at the studio on day two) is genuinely useful and answers the specific objection that stops this customer from booking two services.

The article also creates a natural upsell: a customer who was going to book only ceramic coating discovers this article and realises the mobile window tinting service exists and can be booked alongside.

**Why it's new this week:** We're now entering the peak summer booking period where customers are more likely to book multiple services at once — Christmas present to themselves, new car protection before the holiday road trip. This combinatorial query spikes in November-December.

**Format spec for Jordan:**
- **Opening 50-word block (AI extraction target):** "Yes — Pristine Detailers offers ceramic coating and window tinting as a combined booking in Melbourne. The sequence: mobile window tinting is installed at your home or office (typically 2–3 hours), then the car is dropped at our studio for ceramic or graphene coating the following day. Combined starting price: $750 ceramic + $200 window tint."
- **Why the sequence matters:** window tint first (glass is part of the car surface we're bonding to), ceramic second (coating goes over the glass too if adding glass coating add-on)
- **Services table:** Window Tinting ($200 from, mobile) / Ceramic ($750 from, studio) / Graphene ($999 from, studio) / Combined from $950
- **Melbourne suburb section:** How mobile tinting covers your South Yarra apartment or Toorak driveway while the studio handles the coating
- **FAQ:** "Can you do ceramic coating and window tinting on the same day?", "Does ceramic coating go over window tint?", "Can I add glass coating if I'm also getting window tint?", "How do I book both services together?", "How long does the combined booking take?"
- **Category:** Window Tinting (or general service)
- **Internal links:** `/services`, `/booking`
- **Pass to Jordan:** Yes — publish this week. Enters the Christmas booking window and adds window tinting upsell pathway for ceramic customers.

---

### Content Idea 2 — "Car protection as a Christmas gift in Melbourne: ceramic coating, graphene, and PPF as a present for a car enthusiast"

**Target queries:** "ceramic coating Christmas gift Melbourne", "car detailing gift Melbourne", "car protection gift voucher Melbourne", "Christmas gift for car enthusiast Melbourne", "gift ceramic coating Melbourne"

**The gap:**

December is the one month in the year when the buyer of a service and the recipient are different people. The person searching "ceramic coating Christmas gift Melbourne" is not a car owner — they're a partner, parent, or friend of one. This buyer persona is completely absent from every article and page on the site. The gift article creates a category-defining piece Pristine can own outright — no other Melbourne coating studio is writing for the gift buyer.

This article also unlocks a secondary conversion path: gift bookings (someone booking on behalf of another person), which Pristine's booking system supports but which no content currently drives.

**Why it's new this week:** November 22 — there are exactly 33 days until Christmas. Gift articles index fastest (they're evergreen but time-sensitive) and need to be live by the first week of December to capture December 1–20 gift research. If Jordan publishes this in the next 7 days it can still be indexed in time.

**Format spec for Jordan:**
- **Opening 50-word block (AI extraction target):** "Ceramic coating, graphene coating, and paint protection film from Pristine Detailers are available as Christmas gifts for car enthusiasts in Melbourne. Book on behalf of the recipient via pristinedetailers.com.au/booking — services start from $200 (window tinting), $750 (ceramic coating), $999 (graphene), and $3,000 (PPF). Gift recipient drops the car at our Melbourne studio."
- **Why it's a better gift than cash:** permanence, visible result, something the recipient wouldn't necessarily spend their own money on
- **Gift tier table:** Under $500 (window tinting $200, glass coating $150, wheel coating $200, leather ceramic $250) / Mid-range $750–$999 (ceramic or graphene) / Premium $3,000+ (PPF partial front)
- **Who it's for section:** The BMW driver who parks outside, the Tesla owner who hasn't protected the paint yet, the new car owner who got the dealer package (and why that's not the same thing)
- **How to book as a gift:** Walk through the booking link with "gift for recipient" framing; note that the recipient's car make/model is needed at booking
- **Melbourne-specific close:** "If the car's in Toorak or Brighton, our studio is 15 minutes away. If they want window tinting, our mobile team will come to their home."
- **FAQ:** "Can I buy a ceramic coating as a gift?", "Does the recipient need to do anything to book?", "What information do I need to book a ceramic coating for someone else?", "Is there a gift voucher option?", "What's the best ceramic coating gift for a BMW owner?"
- **Category:** Ceramic Coating (or Melbourne)
- **Internal links:** `/services`, `/booking`
- **Pass to Jordan:** Yes — URGENT. Publish before December 1 to capture December gift search window. Time-sensitive: indexes faster if live before December 1.

---

## AI Citation Readiness Score

**Score: 3.5 / 10** — Unchanged. No infrastructure fixes have shipped since the last score assessment (July 2026).

### Reasoning

The score has remained at 3.5 for 15 consecutive weeks. Every item that would move it is in the hands of a developer, not in the hands of this audit. The table below is unchanged from the Nov 15 report because nothing on the site has changed.

| Signal | Status | Duration |
|--------|--------|---------|
| robots.txt with explicit AI bot permissions | ❌ Missing | Week 20 |
| sitemap.xml submitted to Google Search Console | ❌ Missing | Week 20 |
| llms.txt with structured service facts | ❌ Missing | Week 20 |
| `[SHOP ADDRESS]` live on homepage FAQ | ❌ Present | Week 14 |
| Homepage PPF price conflict (`$2,900` vs `$3,000`) | ❌ Homepage wrong | Week 14 |
| Open Graph / social preview tags | ❌ Missing | Week 20 |
| "Pristine Detailer" title typo | ❌ Present | Week 20 |
| LocalBusiness schema | ❌ Missing | Week 20 |
| AggregateRating schema | ❌ Missing | Week 20 |
| FAQPage JSON-LD | ❌ Missing | Week 20 |
| Services pricing — crawler-readable | ❌ Tab-hidden | Week 20 |
| `/journal` → `/blog` canonical / redirect | ❌ Dual index | Week 3 |
| GHL review widget — no static fallback | ❌ E-E-A-T gap | Week 11 |
| "PPF vs ceramic coating Melbourne" article | ❌ 3 weeks overdue | Missed Nov 1 |
| "Melbourne summer car care" article | ❌ 4+ weeks overdue | Missed Oct 25 |
| Graphene coating Melbourne article | ❌ Not published | Priority since Oct 18 |
| Window tinting Melbourne article | ❌ Not published | Service live July 6 — Week 20 |
| "Ceramic coating for new cars" article | ❌ Not published | Added Nov 15 |

### Score path from 3.5 to 6.5+ (achievable in one dev session, same as prior reports)

| Fix | Score impact | Effort |
|-----|------------|--------|
| `robots.ts` + `sitemap.ts` + `llms.txt` | +1.2 | 90 min |
| Open Graph tags + title typo fix | +0.3 | 20 min |
| Fix `[SHOP ADDRESS]` + PPF price (×2) | +0.3 | 10 min |
| `/journal` → `/blog` redirect | +0.1 | 5 min |
| FAQPage JSON-LD on homepage | +0.3 | 20 min |
| Restore static testimonials + AggregateRating schema | +0.7 | 45 min |
| Blog page meta title fix (`app/blog/page.tsx`) | +0.1 | 2 min |

**Combined: ~3.5 hours dev. Score outcome: 6.5/10. At 6.0+, Pristine is citable by Perplexity and ChatGPT for "ceramic coating Melbourne" and "graphene coating Melbourne" in December and January — the two highest-volume months of the year for these queries.**

---

## Quick-Win Topics — Added to Jordan's Topic Bank

**Two new topics added to `jordan-content-writer.md` above the existing "PPF vs ceramic coating" entry:**

**1. "Ceramic coating and window tinting on the same day in Melbourne: how the booking works"**
*(added by Alex 2026-11-22 — NEW. Targets "ceramic coating and window tinting same day Melbourne" and bundled booking queries. Zero site coverage. The answer requires explaining the mobile-then-studio sequence (tinting day 1 at home, ceramic day 2 at studio). Creates a window tinting upsell pathway for ceramic coating customers who didn't know the mobile service exists. Opening 50-word AI block: "Yes — Pristine Detailers offers ceramic coating and window tinting as a combined booking in Melbourne. The sequence: mobile window tinting is installed at your home or office (typically 2–3 hours), then the car is dropped at our studio for ceramic or graphene coating the following day. Combined starting price: $750 ceramic + $200 window tint." Services table: Window Tinting ($200 from, mobile) / Ceramic ($750 from, studio) / Graphene ($999 from, studio). Melbourne suburb section: South Yarra/Toorak/Brighton — mobile tinting to your apartment, studio coating same week. FAQ: "Can you do ceramic coating and window tinting on the same day?", "Does ceramic coating go over window tint?", "Can I add glass coating if I'm also getting window tint?", "How do I book both services together?". Window Tinting or Ceramic Coating category. Publish this week.)*

**2. "Car protection as a Christmas gift in Melbourne: ceramic coating, graphene, and PPF as a present"**
*(added by Alex 2026-11-22 — URGENT. Targets "ceramic coating Christmas gift Melbourne", "car detailing gift Melbourne", "Christmas gift for car enthusiast Melbourne". Zero site coverage. Only Melbourne coating studio to target the gift buyer persona (partner/parent/friend of car owner, not the car owner). Publish before December 1 — 33 days to Christmas and gift search queries peak December 1–15. Opening 50-word AI block: "Ceramic coating, graphene coating, and paint protection film from Pristine Detailers are available as Christmas gifts for car enthusiasts in Melbourne. Book on behalf of the recipient via pristinedetailers.com.au/booking — services start from $200 (window tinting), $750 (ceramic coating), $999 (graphene), and $3,000 (PPF). Gift recipient drops the car at our Melbourne studio." Gift tier table: Under $500 (window tinting, glass coating, leather ceramic) / Mid-range $750–$999 (ceramic/graphene) / Premium $3,000+ (PPF). Who it's for section (the BMW driver parked outside, the Tesla owner with no factory protection). How to book as a gift walk-through. FAQ: "Can I buy a ceramic coating as a gift?", "What information do I need to book for someone else?", "Is there a gift voucher option?". Ceramic Coating or Melbourne category. PUBLISH BEFORE DECEMBER 1.)*

---

## Carry-Forward Flags (unchanged from Nov 15 — none have been actioned)

- **Services page title** (`app/services/page.tsx`): "Services - Pristine Detailers" → "Ceramic Coating, Graphene & PPF Melbourne | Pristine Detailers". 2 minutes.
- **Blog page title** (`app/blog/page.tsx`): "Blog - Pristine Detailers" → "Melbourne Car Paint Protection: Expert Guides | Pristine Detailers". 2 minutes.
- **Gallery link broken** (`home.tsx:792`): `href="#"` → `href="/gallery"`. Dead internal link.
- **Footer ABN placeholder**: "ABN 00 000 000 000" is not a real ABN. Confirm and update before adding LocalBusiness schema (a schema validator will flag a fake ABN; Pristine's real ABN must be provided).
- **Services tab-hidden pricing** (`services.tsx:184`): `display: selected === service.id ? 'block' : 'none'` hides all graphene, leather ceramic, glass, wheel, and window tinting pricing from every crawler. Week 20 without a fix.
- **GHL review widget — no static fallback**: The `/about/reviews` page renders entirely via JavaScript widget. No crawler-readable review content. E-E-A-T and AI citation gap.
- **Membership page** (`/membership` redirects to `/services`): AI systems answering "Pristine Detailers membership" return nothing — the page doesn't exist as crawlable content.
- **PPF vs ceramic coating Melbourne** article: 3 weeks late. Highest-priority Jordan article for organic and AI search.
- **Melbourne summer car care** article: 4+ weeks late. December urgency is live.
- **Graphene coating Melbourne** article: 5 weeks late. Highest AI citation potential keyword with zero site coverage.
- **Window tinting Melbourne** article: 20 weeks since service launched. Zero commercial keyword coverage.

---

*Next audit: 2026-11-29*

**ESCALATE — Harshad:** It is November 22. Christmas is 33 days away. Melbourne customers are booking December and January ceramic coating and PPF appointments this week. The sitemap, robots.txt, and llms.txt task (90 minutes, code ready since Week 1) means the difference between Google indexing new articles before Christmas or after. The homepage fixes (10 minutes) mean the difference between AI tools citing the correct PPF price and address vs a placeholder and a price that's been wrong for 14 weeks. These two tasks together are 100 minutes of dev work. The December peak booking window does not wait.*
