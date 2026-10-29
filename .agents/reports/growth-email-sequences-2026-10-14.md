# Growth Report — Email Sequences
**Date:** 2026-10-14 | **Week:** 2 of 4 | **Focus:** Email Sequences — Spring Edition
**Manager:** Morgan (Growth & Referrals Manager)

---

## Context: What's Changed Since September

The September 9 report built the four core lifecycle emails. This iteration upgrades them for Q4 with two important inputs:

1. **Pristine Circle is live (since July 2026).** The referral program is 90 days in. The post-service email should now hand customers their referral link directly, not just nudge them to "send someone our way." There is a specific mechanic to reference: a complimentary Maintenance Detail for both the referrer and the referred friend.

2. **Spring is Melbourne's highest-visibility quarter.** October is when cars leave garages. Porsche Club runs, Motorclassica, Cars & Coffee, Melbourne Cup week — the social proof value of a Pristine-coated car is at its annual peak. The lifecycle emails should earn that context, not ignore it.

3. **The winter cohort is 30–90 days post-service.** Customers who came in June, July, and August for ceramic, graphene, or PPF are hitting the critical maintenance window. The win-back email should catch them before they let the warranty prep lapse and before summer driving tests the coating.

The loop remains the same:  
**Great job → review → referral → new booking → upgrade → brand ambassador**  
But each email now fires at a moment where seasonal context makes the action more compelling.

---

## Email 1: Post-Booking Confirmation — Spring Edition

**Trigger:** Immediately on booking confirmation  
**Sequence type:** Transactional / onboarding  
**Goal:** Build trust before the car arrives, set precise expectations, eliminate pre-service anxiety  
**Change from September:** Added spring-specific context (what summer does to unprotected paint), a stronger "what to bring" checklist, and a Melbourne Cup / summer event hook to reinforce timing.

---

**Subject:** [Service] booked — here's what happens from here  
**Preview:** Studio prep, what to do before you arrive, and what to watch for after.

---

**Body:**

Hi [First Name],

Your [Service] is locked in for [Appointment Date] at [Time]. Here's exactly what to expect.

---

**Before you arrive**

A few things that make the job better — and that most customers don't know to do:

- **Don't wash the car beforehand.** We start with a full decontamination wash. Any products you've used can interfere with prep, and we need a clean baseline anyway.
- **Remove roof racks, parking passes, and dash cams** if you want them off during the service.
- **Fill up with fuel** — the car will be with us for most of the day and we won't be moving it off-site.
- **If there are stone chips or scratches you already know about**, mention them when you arrive. We'll note them and, if relevant, talk through whether paint correction is worth doing before we coat.

---

**On the day**

After decontamination, the sequence depends on your service:

- **Ceramic or Graphene coating:** Panel inspection → machine polish (if included in your package) → coating application in a controlled studio environment → initial cure. We coat in sequence, not all at once — each panel is given proper flash time.
- **PPF:** Panel-by-panel film application with computer-cut templates → edge wrapping → heat cure. No guesswork on fitment.
- **Add-on coatings (glass, leather, wheel):** Applied in the same session. Ask at drop-off if you want to add one — we'll quote and confirm before we start.

You'll receive an SMS when your car is ready. For ceramic and graphene: the 12–24 hour post-service window is critical — no rain, car wash, or pressure water. We'll confirm care instructions at pickup.

---

**Why the timing matters**

October is when Melbourne cars start getting seen again — Porsche Club runs, beach runs down the Peninsula, summer events. Protection applied now works through the UV-heavy months, not just the quiet ones. You've timed this well.

If anything changes before your appointment, reply here — you'll reach the team directly.

See you [Appointment Date].

[Technician Name]  
Pristine Detailers

---

**CTA Button:** View booking details → [Booking confirmation link]

**Implementation notes:**
- Personalise [Service], [Appointment Date], [Time], [Technician Name] from booking record
- The "timing matters" paragraph should only show for ceramic, graphene, or PPF bookings — suppress for window tinting, which is less season-dependent
- Send time: immediately on booking confirmation
- Estimated read time: ~2 minutes — it earns that time; don't shorten it

---

## Email 2: Post-Service Follow-Up — Pristine Circle Integrated

**Trigger:** 24 hours after job marked complete in CRM  
**Sequence type:** Post-purchase / retention  
**Goal:** Google review capture + Pristine Circle referral activation  
**Change from September:** The September version ended with a soft referral nudge ("the kind of cars we work on tend to know each other"). This version formally hands the customer their Pristine Circle referral link with a specific offer. The October 7 referral report confirmed the program is live and the Maintenance Detail reward is the currency.

---

**Subject:** How's the [Car Make] coming up?  
**Preview:** The coating's cured. Two quick things from us — one favour, one for your network.

---

**Body:**

Hi [First Name],

It's been 24 hours since your [Service] on the [Car Make].

The coating is fully cured now. If you haven't seen the water behaviour yet — try a hose or wait for Melbourne rain. The sheeting effect isn't a wax. It's the bond.

---

**One favour, if the finish landed right:**

A Google review takes about 60 seconds and it's genuinely useful. Most people searching for a studio they can trust with a [Car Make] will read three reviews before deciding. Yours is the kind of voice that makes the difference.

[→ Leave a Google Review]

If anything isn't right — reply here before you post anything. Our warranty covers it and we'll fix it. That offer is always open.

---

**Your Pristine Circle referral link:**

You're now part of Pristine Circle. When someone you know books using your link, they receive a complimentary Maintenance Detail on their first visit — and so do you, on us.

[Referral link: "Get Your Link"]

The kind of person worth sending it to: owns a car they care about, has been thinking about sorting the paint before summer, would value a recommendation from someone who's already been in.

Spring is the right moment. Your car is going to get attention this season — this gives you something useful to say when someone asks about it.

---

Thanks again for trusting us with the [Car Make].

[Technician Name]  
Pristine Detailers

*P.S. First wash after coating: hand wash only, clean microfibre mitt, no automated car washes for the first 30 days.*

---

**CTA Button (primary):** Leave a Google Review → [Google Review link]  
**CTA Button (secondary):** Get Your Referral Link → [Pristine Circle referral link, personalised]

**Implementation notes:**
- Personalise [Car Make], [Service], [Technician Name]
- The referral link should be pre-populated with the customer's unique referral code — they should not need to create an account to share it
- The "warranty covers it" line must always appear before the review ask — not after
- Send time: T+24h post job completion, not before (coating cure window needs to close first)
- Do not send an additional review request at any point — one ask, done

---

## Email 3: 30-Day Win-Back — Winter Cohort Edition

**Trigger:** 30 days since last completed booking, no new booking in CRM  
**Sequence type:** Re-engagement  
**Goal:** Reactivate winter cohort customers; position maintenance booking and add-ons before summer  
**Change from September:** The September version was general. In October, the relevant cohort is customers who came in June, July, or August — 60–120 days post-service. They're heading into summer with a coating applied in winter conditions and need a maintenance check before the UV-heavy months hit. The email should name this specifically.

---

**Subject:** Your winter coating — what to check before summer  
**Preview:** Melbourne UV is nothing like June. Here's what matters before December.

---

**Body:**

Hi [First Name],

It's been about [X weeks/months] since your [Service] at Pristine. Quick check-in with something useful.

Your coating was applied in [Month] — which means it bonded under cooler Melbourne conditions. That's not a problem, but it is worth knowing: the first serious UV exposure is coming. October through March is when Melbourne paint protection is actually tested.

---

**Three things to check before summer:**

**1. The water behaviour test**  
Rinse the car with a hose and watch each panel. You should see uniform sheeting — water running off in sheets, not beading and sitting. If any panel is behaving differently to the others, that's worth knowing about. Take a photo and reply here. Our warranty covers it.

**2. Wheels — especially if you park outside**  
Brake dust bonds to wheel surfaces over time. An iron decontamination spray every 3–6 months keeps it clean. If you don't have one, reply and we'll tell you exactly what to get.

**3. Annual maintenance coating — don't skip this**  
Manufacturer warranties for Ceramic Pro and Gtechniq require an annual maintenance coating to stay valid. If you're heading toward the 12-month mark, book it before the December rush — November slots are filling now. The service takes 2–3 hours and keeps the warranty intact.

---

**If you didn't add glass or wheel coating in [Month]:**

Your window for a discounted add-on is still open for one more week:

- **Glass Coating — $150:** Repels water, reduces glare, makes the windscreen significantly easier to clean in summer downpours and insect season.
- **Wheel Coating — $200:** Ceramic protection against brake dust and road grime. Particularly relevant if you drive regularly on Melbourne roads or do any track time in summer.

[→ Book a maintenance session or add-on]

If everything is performing well, that's the coating doing its job. No action needed.

[Name]  
Pristine Detailers

---

**CTA Button:** Book a maintenance session → [Booking link]

**Implementation notes:**
- Trigger: 30 days post-service, no new booking in CRM. For October, also run as a manual campaign targeting June–August service records with no follow-up booking.
- Personalise [Month] from service date (e.g., "July") — not a vague "a few months ago"
- If the customer's last service was PPF only: replace the maintenance coating paragraph with PPF summer care language (inspect edges quarterly, avoid high-pressure wash directed at film edges, a graphene coating on top remains an option)
- The "one more week" deadline on add-ons should be real — don't use a rolling deadline. If implementation requires it, set a genuine 7-day window from send date.
- Do not follow up this email with more than one additional message. If no response in 14 days: a single one-liner ("We're here when the car's ready.") and then leave them alone.

---

## Email 4: Upgrade Nudge — Spring / Q4 Edition

**Trigger:** Customer completes their 2nd booking with Pristine Detailers  
**Sequence type:** Retention / upsell  
**Goal:** Move loyal customers toward the full-stack (PPF + graphene, or ceramic → graphene upgrade), using spring timing as the hook  
**Change from September:** The September version focused on technical differentiation (molecular bonding, heat dissipation). This version opens with social visibility — the real motivator in Q4 — before going into the technical case. The "you've been in twice" hook is the same, but the spring framing makes the timing feel urgent without manufactured pressure.

---

**Subject:** You've been in twice — here's what most people do next  
**Preview:** Spring is when Pristine cars get seen. Here's the honest recommendation.

---

**Body:**

Hi [First Name],

You've been in twice. That puts you in a specific group at Pristine — the customers who've seen what proper protection does and come back for more.

Here's what most people in your position end up asking us, and the straight answer to each.

---

**"My car is getting a lot of attention this spring. What's the next level?"**

If you're on ceramic coating, the upgrade is graphene.

The difference isn't marketing language. Graphene has a denser molecular bond than ceramic — it dissipates heat better (relevant when your car sits in a Toorak driveway or a Bayside car park in 35-degree heat), resists light scratches more effectively, and produces a noticeably slicker self-cleaning finish. Water doesn't just bead — it sheets.

Ceramic coating stays good for years. Graphene is the version you get when you want the best available, and you know it'll last.

**Graphene from $999.** Your paint prep history is already on file — we know your car's surface.

---

**"I've got coating, but I keep worrying about stone chips on the freeway."**

Ceramic and graphene protect against UV, chemical contamination, and water. They don't stop physical impact.

PPF does. Paint Protection Film is a self-healing polyurethane layer over your most exposed panels — bonnet, front bumper, mirrors, A-pillars. Stone chips, road debris, and car park door dings hit the film, not the clear coat.

The correct stack is: **PPF first, coating on top.** The film handles physical impact; the coating handles UV, water, and contamination. They're complementary, not competing.

This is the setup customers with serious cars — GT3s, M3s, M-AMGs — end up with. It's what we'd recommend for any car worth protecting long-term.

**PPF from $3,000.** If you want to talk through which panels make sense for your specific car and how you drive it, that's exactly what a studio consultation is for.

---

This isn't a "buy more" email. It's what I'd walk through with a friend who asked.

Spring is when Pristine cars get seen most. If there's a gap in your protection setup, now is the time to close it — before Melbourne summer and before November slots fill.

Reply here, or book a consult and we'll go through your car specifically.

[Name]  
Pristine Detailers

---

**CTA Button:** Book a consult → [Booking/contact link]

**Implementation notes:**
- Trigger: fire 3–5 days after customer's 2nd completed booking is marked in CRM
- Pull [Car] and service history to conditionalise the copy:
  - Already has graphene → suppress the graphene upgrade block, focus entirely on PPF
  - Already has PPF + coating → suppress both blocks, send "you've got the full stack" variant (see below)
  - Already has PPF but no coating → lead with coating-on-top as the logical next step
- The "full stack" variant for customers who have both: a shorter email acknowledging they've done it right, positioning annual maintenance and add-ons (glass, wheel, leather) as the next layer
- Tone check: "walk through with a friend" must feel earned, not scripted. Read the whole email aloud before sending to verify it lands as confident recommendation, not sales pitch.

---

## Sequence Overview

```
Sequence: Pristine Detailers — Lifecycle Email Stack (Q4 Edition)
Version: October 2026 (Spring / Pristine Circle integrated)

TRIGGER                    EMAIL                               TIMING
─────────────────────────────────────────────────────────────────────
Booking confirmed     →    Email 1: Pre-service prep          Immediate
Job completed         →    Email 2: Review + referral         T+24h
30 days, no rebook    →    Email 3: Win-back (winter cohort)  T+30d
2nd booking done      →    Email 4: Upgrade nudge             T+3–5d post 2nd booking

Exit conditions:
- Email 2: If customer has left a review AND referred a friend → remove from win-back trigger
- Email 3: If customer books within 30 days → sequence exits, no win-back
- Email 4: If customer already has both PPF and graphene → send "full stack" variant, not upgrade nudge
```

---

## Metrics Plan

| Email | Primary metric | October target | Secondary |
|-------|---------------|----------------|-----------|
| Booking confirmation | Open rate | >65% (transactional) | Reply rate (questions before service) |
| Post-service follow-up | Google Review click | >18% | Referral link clicks |
| 30-day win-back | Rebook rate | >10% (winter cohort) | Add-on attach rate |
| Upgrade nudge | Consult booking rate | >8% | Reply rate (self-qualifying) |

**A/B tests to run in October:**

| Email | Test | Variant A | Variant B |
|-------|------|-----------|-----------|
| Email 2 | Subject line | "How's the [Car Make] coming up?" | "Your [Service] has cured — one check and two things from us" |
| Email 3 | Opening hook | Winter cohort / UV angle | Warranty deadline angle ("don't let your warranty lapse before summer") |
| Email 4 | Lead paragraph | Social visibility ("your car is getting attention") | Technical ("here's what ceramic doesn't protect against") |

---

## The Loop — October Edition

```
SPRING SERVICE BOOKED
  ↓
Email 1 fires: Trust built before a panel is touched
  ↓
Job completed — coating or PPF on a car that'll be out all summer
  ↓
Email 2 fires: Google review captured + Pristine Circle link sent
  ↓
Review published online → new Melbourne customer finds Pristine
  ↓
Referral link shared at Cars & Coffee / Porsche Club / Motorclassica
  ↓
Friend books → both get Maintenance Detail (Pristine Circle reward)
  ↓
New customer's 2nd booking triggers Email 4: upgrade nudge
  ↓
Customer upgrades to graphene / adds PPF before summer
  ↓
Full-stack car is photographed at a summer event → organic content
  ↓
Customer qualifies for Ambassador tier → refers at 2–3× normal rate
  ↓
Loop restarts through next summer season

Email 3 catches anyone who falls out of the loop at any point.
```

The seasonal amplifier: a referral made in October from a freshly coated car produces a customer who protects their car for summer, attends events through February/March, and becomes a referral source in their own right. The compounding is strongest when we activate it in spring.

---

## What's Different This Week vs September

| Area | September | October |
|------|-----------|---------|
| Referral mechanic | Soft nudge ("send them our way") | Formal Pristine Circle link + Maintenance Detail offer |
| Seasonal hook | Evergreen | Spring-specific (UV, visibility, Melbourne Cup week, Peninsula runs) |
| Win-back angle | General 30-day check | Winter cohort targeting (June–August customers heading into UV season) |
| Upgrade framing | Technical differentiation | Social visibility first, technical second |
| Metrics | Benchmark targets | October-specific targets + A/B test plan |

---

*Report by Morgan (Growth & Referrals Manager) — Week 2, October 2026*  
*Next week (Week 3): Community & Word of Mouth — Melbourne car communities, Facebook groups, partnership angles for Q4*
