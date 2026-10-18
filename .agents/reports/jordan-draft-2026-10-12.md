# Jordan Draft — 2026-10-12

**Status:** Publish failed (proxy/network restriction) — manual publish required  
**Endpoint:** `POST https://pristinedetailers.com.au/api/agent/publish-post`  
**Auth:** `Bearer [see .env or team credentials]`

---

## Article JSON Payload

```json
{
  "slug": "mobile-window-tinting-melbourne",
  "title": "Mobile Window Tinting Melbourne: Legal Limits, How It Works, and Pricing from $200",
  "excerpt": "Victoria's window tinting laws explained, plus how mobile installation works at your home or apartment car park — no Moorabbin dropoff needed.",
  "category": "Detailing",
  "read_time": "5 min read",
  "agent_name": "Jordan",
  "status": "published"
}
```

---

## Full Article Body (Markdown)

Mobile window tinting in Melbourne means a certified technician installs UV and heat-blocking film directly at your home, office, or apartment car park — no workshop, no Moorabbin dropoff. Film is cut and fitted to your vehicle's exact glass dimensions, sealed and cured on-site. Service takes 2–4 hours depending on the number of windows.

![Prestige car in Melbourne city](https://images.unsplash.com/photo-1568605117036-5c5edba50dc0?w=1200&q=80)

## What's Legal in Victoria

Victoria has specific VLT (Visible Light Transmission) limits. VLT measures what percentage of visible light passes through the film combined with your factory glass. Higher percentage = lighter tint. Lower percentage = darker.

| Window | Legal VLT Minimum | Notes |
|--------|-------------------|-------|
| Front windscreen | 75% VLT | Tint strips above AS1 line only |
| Front side windows | 35% VLT | Includes driver and passenger windows |
| Rear side windows | No minimum | Can go as dark as you want |
| Rear windscreen | No minimum | Can go as dark as you want |

The front side window limit (35% VLT) is the one most Melbourne drivers get wrong. Most factory glass sits around 75–80% VLT. A medium-darkness film on front sides gets you down to around 35–40% — which is fine. Anything darker on front side windows is illegal and will fail a roadworthy.

If you're buying a car with existing tint, always check what was applied before. We can measure and certify what's already on your glass.

## How Mobile Tinting Works

No workshop required. Here's what happens when we come to you:

1. **Booking confirmation** — you nominate your location (driveway, undercover car park, office building). We confirm access needs: a flat, clean surface and enough light to work accurately.
2. **Pre-tint clean** — every window is cleaned and decontaminated before film touches the glass. Debris under the film causes bubbling. This step is not skippable.
3. **Film cutting** — film is precision-cut to match your vehicle's exact glass dimensions using a digital template database. No freehand guessing.
4. **Installation** — film is applied wet, squeegeed flat, and sealed at the edges. A heated air gun removes moisture during the cure phase.
5. **Inspection** — we check every edge and corner for lifting before we pack up. If anything's off, it gets fixed on the spot.
6. **Cure period** — film takes 3–5 days to fully cure. During that time, don't wind the windows down. Minor haze is normal and clears as the adhesive sets.

![Car being prepped for coating](https://images.unsplash.com/photo-1617469767824-e76ad64e9f86?w=1200&q=80)

## Melbourne Window Tinting Prices

| Vehicle Type | Starting Price |
|--------------|----------------|
| Sedan (rear 3 windows) | $200 |
| Sedan (full vehicle) | $350 |
| SUV / Wagon (rear 3 windows) | $250 |
| SUV / Wagon (full vehicle) | $420 |
| Ute / Commercial (cab windows) | $220 |

Prices include installation, materials, and a removal certificate. Film brands vary — we use window films with a warranty on de-metalisation (colour fade) and delamination. Ask about specific film grades when you book.

## No Garage? No Problem.

The most common question from inner-city Melbourne drivers: *do I need a garage or a specific setup?*

You don't. We've installed window tinting in underground car parks in South Yarra, apartment building car parks in Richmond and Prahran, uncovered driveways in Hawthorn, and street-side in Toorak. What matters is:

- **A reasonably flat surface** — so the vehicle stays stable during installation
- **Enough ambient light** — we bring portable lighting for darker spaces
- **No high-pressure water nearby** — keep sprinklers away from the area during install

You don't need to be present the entire time. Most customers drop the car and come back at the end.

![Prestige car in Melbourne city](https://images.unsplash.com/photo-1568605117036-5c5edba50dc0?w=1200&q=80)

## Frequently Asked Questions

**How long does window tinting take?**
Rear 3 windows: roughly 90 minutes. Full vehicle: 2.5–4 hours. Time varies by vehicle shape — complex curved rear windscreens take longer.

**Can you tint windows in an underground car park?**
Yes. We work in underground car parks regularly across Melbourne's CBD fringe suburbs. We bring portable lighting. The main requirement is enough clearance to move around the vehicle — usually fine in standard bay sizes.

**Does window tinting void my car warranty?**
No. Window tinting is a post-manufacture addition and does not affect your vehicle's mechanical warranty under Australian Consumer Law. Your service history and insurance are unaffected.

**What VLT is legal in Victoria for front windows?**
Front side windows must remain at 35% VLT or above. Front windscreen tinting is restricted to the area above the AS1 line only. Rear windows have no VLT minimum.

**Can I wind my windows down straight after tinting?**
No. Keep all tinted windows fully up for a minimum of 3 days — 5 days is safer. Winding down too early breaks the seal at the bottom edge before the adhesive cures, which causes permanent lifting.

---

Mobile window tinting is the one Pristine service we bring to you. Everything else — ceramic coating, graphene, PPF — is done in our studio for quality control reasons. Window tinting is different: it installs cleanly in a controlled site environment, and coming to your location saves you the round-trip.

To book, visit [pristinedetailers.com.au](https://pristinedetailers.com.au) or enquire directly for a quote on your vehicle and location.

---

## To Publish Manually

```bash
curl -s -X POST https://pristinedetailers.com.au/api/agent/publish-post \
  -H 'Authorization: Bearer [AGENT_API_TOKEN]' \
  -H 'Content-Type: application/json' \
  -d @/tmp/article.json
```
