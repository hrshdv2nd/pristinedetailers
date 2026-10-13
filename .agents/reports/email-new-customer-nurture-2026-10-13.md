# Email Sequence: New Customer Nurture
**Casey — Email & Retention Specialist**
**Date:** 2026-10-13
**Week:** 2 (New Customer Nurture)

---

## Sequence Overview

```
Sequence Name: Post-First-Booking Nurture
Trigger: Customer completes first service (ceramic coating, graphene coating, or PPF)
Goal: Build trust, drive care habit adoption, convert to repeat customer + referral
Length: 4 emails
Timing: Day 1, Day 7, Day 21, Day 45 post-service
Exit Conditions: Customer books a second service OR unsubscribes
```

---

## Email 1: "Your car's in good hands"

```
Send: Day 1 (same evening as service)
Subject: Your [Make] is curing right now
Preview: The coating bonds to your clear coat over the next 24–48 hours. Here's what that means.
```

**Body:**

Hey [First name],

Your car left the studio today. Right now, the coating is in the middle of curing — bonding to your clear coat at a molecular level. It's the most critical window of the whole process.

The one rule for the next 7 days: **don't wash it.** No pressure wash, no automated car wash, no wiping anything off with a cloth. If it rains, let it rain.

A few other things worth knowing:

- Water spots may appear if it rains in the first week. Leave them. They'll come off clean at the 7-day wash.
- If you had PPF installed, the edges may look slightly raised near the cut lines for a few days as the adhesive fully sets. That's normal — it settles out.
- The coating will feel like it's hardening over the next 48–72 hours. You'll notice the water beading get stronger. That's it working.

If anything looks off, reply here. I check messages same day and I'd rather you ask than wonder.

— [Name], Pristine Detailers

```
CTA: [See your full care guide →] → care-guide page / PDF link
```

---

## Email 2: First-Week Care Tips

```
Send: Day 7 (first wash window opens)
Subject: Seven days in — time for the first wash
Preview: The right way to do it, and what to skip permanently.
```

**Body:**

Hey [First name],

Seven days. The coating has fully cured and bonded. You can wash the car now.

Here's how to do it without undoing any of the work:

**Use:**
- pH-neutral car wash shampoo (Meguiar's Gold Class, Chemical Guys Honeydew, or similar)
- A clean microfibre wash mitt — sponge traps grit and drags it
- Two-bucket method if you're washing yourself

**Avoid permanently:**
- Automated car washes with spinning brushes — they put micro-scratches through the coating over time
- Dish soap, degreasers, or spray waxes — they strip the ceramic bond
- Pressure washing PPF edges at close range — keep the nozzle at least 30cm back

**What you should notice:**
Water should bead and sheet off the panel in a way that looks almost cartoonish. If it's just sitting flat on the paint instead of beading up, let me know — that's not right and I want to check it.

For the long term, a proper maintenance wash every 6–8 weeks is what keeps your warranty performing the way it should. Happy to help you set that up if you'd rather not think about it.

— [Name], Pristine Detailers

```
CTA: [Book a maintenance wash →] → booking link
```

---

## Email 3: Three-Week Check-In + Maintenance Pitch

```
Send: Day 21
Subject: Three weeks in — how's the car looking?
Preview: A genuine check-in. Plus one thing that shortens coating life faster than people realise.
```

**Body:**

Hey [First name],

Three weeks on. By now you've done your first wash and you know what the coating feels like in good shape.

Genuinely curious — how's it tracking? Strong water beading? Paint staying cleaner between washes?

If the beading has slowed down noticeably, or you're seeing contamination sitting on the paint that won't rinse off, that's a signal the surface needs a decontamination wash. It's common at this stage on Melbourne roads — especially if you've been through the Inner East or down the Mornington Peninsula where there's more road grime and tree sap.

One thing that shortens coating life faster than most people expect: **bird droppings left on the paint.** The uric acid starts etching through the coating within a few hours in direct sun. If you see one, flick it off with a damp microfibre as soon as you can. Don't scrub — just lift.

We run a **ceramic maintenance service** for cars coated or PPF'd with us — a proper decon wash, coating inspection, and top-up where needed. It's what keeps the coating performing at manufacturer spec for the full warranty period rather than degrading at year 3 or 4.

If that's something you want to lock in, reply here and we'll find a time.

Also — one question: did you get the glass coating or wheel coating added to your booking? If not, worth a conversation. Glass coating makes Melbourne rain almost irrelevant. Wheel coating means your rims stay cleaner after every drive. Both are one-hour add-ons.

— [Name], Pristine Detailers

```
CTA: [Enquire about maintenance →] → enquiry/booking link
Segment note: If add-ons were purchased at time of service, remove the last paragraph.
```

---

## Email 4: Review Ask + Referral Offer

```
Send: Day 45
Subject: One quick favour — and a thank you in advance
Preview: Takes about 2 minutes. Genuinely means a lot for a small business.
```

**Body:**

Hey [First name],

Six weeks since your car came through the studio.

If the coating is doing its job — and I'm confident it is — I have one ask: a Google review.

Not a long one. One or two honest lines about what the service was like is more valuable to us than a polished paragraph. We have 39 reviews right now and every single one comes from a real customer who took 2 minutes. It's what makes someone who's never met us trust us with their Porsche or their Range Rover.

**[Leave a review →]** (takes 2 minutes, genuinely means everything)

And if you know someone who's been putting off getting their car protected — a colleague, someone at the club, a neighbour who just picked up a new car — send them our way.

For every referral who books, we'll give you **$100 off your next service**. Just have them mention your name when they book.

Thanks for trusting us with your car. We look forward to seeing it again.

— [Name], Pristine Detailers

```
CTA: [Leave a Google review →] → Google Maps review link
Secondary CTA: [Book your next service →] → booking link
```

---

## Notes for Implementation

- **Personalisation:** Replace [First name] and [Make] dynamically. If the make is unknown, use "your car."
- **Service variant:** Where copy references "coating or PPF," consider branching:
  - PPF-only customers → adjust Email 2 to emphasise PPF edge care and self-healing
  - Ceramic-only → emphasise hydrophobic performance and decon wash timing
  - Graphene → mention 9-year warranty in Email 3 maintenance pitch
- **Timing:** All sends at 9am Melbourne local time (AEDT/AEST). Tuesday–Thursday preferred.
- **Email 3 add-on paragraph:** Suppress if Glass Coating and Wheel Coating were already purchased.
- **Metrics to watch:** Open rate on Email 1 (benchmark: 55%+), click rate on Email 2 care guide (benchmark: 12%+), review conversion on Email 4 (benchmark: 8–12% of sends).
