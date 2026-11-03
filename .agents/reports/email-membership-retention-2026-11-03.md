# Email Sequence: Membership Retention
**Focus:** Re-engage members who haven't booked in 45+ days  
**Date written:** 2026-11-03  
**Melbourne season:** Spring (November — heading into summer)  
**Skill used:** churn-prevention  

---

## Context

These three emails target active members who haven't booked since mid-September or earlier. They're still on the membership. They haven't come in through the season change.

November is a specific moment in Melbourne for cars. It's the last window before the real heat of summer arrives, and it comes with its own set of problems: bird nesting season is at its peak across the inner east and bayside suburbs — magpies, mynas, currawongs, and rosellas are nesting hard until January, and their droppings are more acidic than people realise. UV index in Melbourne hits 10–12 on clear November days. Pollen is coating every surface. These aren't invented reasons to book — they're real and they're happening right now to every car sitting on a driveway in Brighton or Hawthorn.

The sequence checks in lightly, makes the summer risk concrete, then offers something worth coming back for — a free UV glass coating (normally $150), which is seasonally earned and genuinely useful before December UV peaks.

Suppress the sequence if a booking is made at any point. Route replies about cancellation or pausing to a human immediately.

---

## Email 1 — Day 45: Soft Check-In

**Subject:** We haven't seen your car in a while  
**Preview text:** A quick one from the Pristine team  
**Send time:** Tuesday or Wednesday, 8:30am AEDT  
**Tone:** Warm, brief, human — zero pressure

---

Hey [First Name],

It's been about six weeks since your last booking. Wanted to drop a quick note.

November's a rough time to leave a car sitting unattended. The birds are nesting — if you're in [suburb area], you'll know the magpies and mynas are in full swing right now. Their droppings are more acidic than a standard bird dropping and they work faster on paint in warm weather. UV is also climbing — we've been hitting index 10+ on clear days, and that's the kind of sustained exposure that starts to test a coating's performance if it hasn't been maintained.

Your membership's ready when you are. A maintenance session takes about 90 minutes and we come to you.

[Book a session →]

If anything's changed — new car, new address, been a hectic couple of months — just hit reply and we'll figure out the best option from there.

Tom  
Pristine Detailers

---

**Notes:**
- [First Name] from CRM; Tom = consistent sender name across all three emails
- "suburb area" populates dynamically from member's recorded suburb if available
- CTA links to /booking pre-filtered to maintenance wash
- Keep sender address a real inbox — replies reach a human

---

## Email 2 — Day 52: Value Reminder

**Subject:** Seven weeks of membership you haven't used  
**Preview text:** Here's what's sitting in your plan right now  
**Send time:** Tuesday or Wednesday, 8:30am AEDT  
**Tone:** Direct, practical, informative — not a lecture, just the facts

---

Hey [First Name],

You're at about seven weeks since your last session. I want to be straight with you about what that means for your membership.

Your [Essential / Signature] plan has been running this whole time. Here's what's sitting unused:

**Essential members:**
- Two monthly maintenance washes (already covered — September's and October's)
- Priority booking access (we hold slots for members before they open to the public)

**Signature members:**
- One bi-monthly full detail (overdue by a month)
- Ceramic or graphene maintenance top-up (keeps the hydrophobic layer performing into summer)
- Add-on pricing — 30–35% off extras including paint decontamination, interior treatments, and glass coating

The maintenance top-up is the one worth talking about. November is exactly when it matters. Your coating's been through the last months — road grime, pollen, and whatever winter left behind — and it's about to face a Melbourne summer. UV index 10–12, three months of sustained heat, and the kind of dry bird activity that leaves marks faster in warm weather.

A maintained coating handles all of that. An undermaintained one doesn't fail dramatically — it just works at 70% instead of 100%. Water doesn't bead quite right. Contaminants sit a bit longer. You don't notice immediately, but by February you're looking at a correction job instead of a quick top-up.

Right now is the ideal window — before December fills up and before summer UV is at its worst.

[Check available times →]

Tom  
Pristine Detailers

---

**Notes:**
- Pull membership tier from CRM — show only the relevant bullet list
- "September's and October's" is illustrative — adjust to actual months if data available
- The UV/summer framing is real: Melbourne's UV index climbs sharply November through January
- No offer in this email — value education first; save the incentive for Email 3
- "December fills up" should only be used if ops confirms genuine booking pressure heading into December

---

## Email 3 — Day 60: Save Offer

**Subject:** Two months out. Free glass coating if you book this week.  
**Preview text:** The offer's real, here's the reason behind it  
**Send time:** Tuesday, 8:30am AEDT  
**Tone:** Direct, honest, personal — no campaign language

---

Hey [First Name],

Two months since your last booking. I'll keep this short.

Your membership is still active and I'd like it to stay that way — but only if it's actually useful to you. So I want to make the next booking worth showing up for.

**Book any service before [DATE: 17th November] and I'll include a free UV glass coating on your windscreen.**

Here's what that actually means: your windscreen takes more UV than any other surface on the car. Glass coating bonds to the glass surface and creates a hydrophobic layer that also blocks a significant portion of UV transmission into the cabin. It makes rain bead and clear at speed — wiper blades last longer, visibility's clearer. It's something we'd normally charge $150 for and it lasts 12–18 months.

The reason I'm offering it in November specifically: Melbourne UV starts spiking this month and doesn't drop until March. If your windscreen isn't coated heading into summer, it's the most exposed surface you've got, and it stays that way until autumn.

It's a genuinely useful thing to do right now, on a car worth protecting.

[Claim the free glass coating →]  
*(Book by 17th November. Service can be scheduled within 30 days. One per active membership.)*

If the membership isn't working — timing's off, you've changed cars, or you'd rather pause — just reply here. No hold music, no ticket system. I'll get back to you directly.

Tom  
Pristine Detailers  
[phone number]

---

**Notes:**
- [DATE] = 17th November — confirm this populates dynamically at send time, not hardcoded
- Glass coating is the save offer for this sequence — different from July's iron decontamination and June's interior detail; it's the first time we've offered this as a retention incentive
- The UV / windscreen angle is technically accurate: glass coating reduces UV transmission and improves hydrophobicity; members with European and performance cars will recognise this as genuinely useful
- "I'll get back to you directly" requires this inbox to route to a real human
- If a member replies asking to cancel or pause: immediate human handoff — do not automate the response
- Track: open rate, click rate, bookings within 7 days of send. Booking = save. No action after Email 3 = review membership status; consider a personal call for Signature members or members with 6+ months tenure

---

## Sequence Summary

| Email | Day | Subject | Core angle |
|-------|-----|---------|------------|
| 1 | Day 45 | We haven't seen your car in a while | Soft check-in, bird nesting + UV November framing |
| 2 | Day 52 | Seven weeks of membership you haven't used | Unused membership value, pre-summer coating condition |
| 3 | Day 60 | Two months out. Free glass coating if you book this week. | Save offer: UV glass coating ($150 value), seasonal framing |

**Suppression:** Cancel sequence immediately if booking is made at any point.  
**Escalation:** Human handoff if Email 3 triggers a reply about cancelling or pausing.  
**Post-sequence:** No booking after Email 3 → review membership status; personal call for Signature members or 6+ month tenure.

---

## Seasonal Note — Spring / Pre-Summer Frame (November)

November is the transition point in Melbourne. Winter's done, summer's about to start, and cars that haven't been detailed since September are carrying pollen, bird acid, and mild surface oxidation into the highest UV months of the year. The bird nesting angle is specific: magpies, mynas, and currawongs are nesting in inner east and bayside suburbs right now, and their droppings are genuinely more corrosive than off-season bird dropping — they carry more uric acid in nesting season and they hit warm paint surfaces that accelerate etching.

The save offer (UV glass coating) is distinct from recent retention offers:
- June: interior detail
- July: iron decontamination
- November: UV glass coating

That rotation keeps the sequences from feeling templated. A member who received the June or July sequence will notice a new, seasonally earned offer rather than a reused incentive.

Pre-summer is also a natural booking window — people are starting to plan December, cars are coming out for the warmer months, and there's genuine motivation to get a car in good condition before January holidays and Mornington Peninsula drives. The sequence can lean on that reality without overstating it.
