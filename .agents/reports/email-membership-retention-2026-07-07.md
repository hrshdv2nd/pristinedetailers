# Email Sequence: Membership Retention
**Focus:** Re-engage members who haven't booked in 45+ days  
**Date written:** 2026-07-07  
**Melbourne season:** Deep Winter (July)  
**Skill used:** churn-prevention  

---

## Context

These three emails target active members on a Pristine Detailers subscription who haven't booked in 45+ days. They're still being charged. They're not using it. The goal is to pull them back before they question why they're paying for something they're not booking.

July is the coldest, wettest point of the Melbourne winter. Frosts are common in the inner east and bayside suburbs. Road grime is at its worst — brake dust, iron fallout, and salt spray compound over weeks. Interiors collect moisture from wet coats and boots. These aren't manufactured reasons to book — they're real, and they're specific to right now.

This sequence uses that reality without being heavy-handed. Email 1 checks in lightly. Email 2 makes the cost of inaction concrete. Email 3 offers something worth coming back for.

Suppress the sequence if a booking is made at any point. Escalate to a human if Email 3 triggers a reply about cancelling or pausing.

---

## Email 1 — Day 45: Soft Check-In

**Subject:** Your car's been doing it alone for a while  
**Preview text:** A quick check-in from the Pristine team  
**Send time:** Tuesday or Wednesday, 8:30am AEST  
**Tone:** Warm, human, zero pressure — like a text from someone who noticed

---

Hey [First Name],

It's been about six weeks since your last booking. Just wanted to check in.

July's been a rough month for paint. The frosts we've had across [suburb area] in the past few weeks leave a film on the car surface — water droplets that freeze and thaw overnight, carrying whatever's in the air with them. On a coated car it's not catastrophic, but it's the kind of thing that builds quietly.

Your membership's ready when you are. A maintenance wash takes about 90 minutes and we come to you — same result, no logistics.

[Book a session →]

If anything's changed on your end — new address, new car, or you've just had a busy patch — hit reply and we'll sort it out from there.

Tom  
Pristine Detailers  

---

**Notes:**
- [First Name] from CRM; "Tom" = consistent sender name across all three emails
- "suburb area" can be populated dynamically from member's recorded suburb if available (e.g. "across Brighton," "across the inner east")
- CTA links to /booking pre-filtered to maintenance wash
- Keep sender address a real inbox — replies should reach a human

---

## Email 2 — Day 52: Value Reminder

**Subject:** Eight weeks in — here's what you haven't used yet  
**Preview text:** What's sitting in your membership right now  
**Send time:** Tuesday or Wednesday, 8:30am AEST  
**Tone:** Direct, informative, still human — making the abstract concrete

---

Hey [First Name],

You're at about eight weeks since your last detail. I want to be practical with you for a second.

Your [Essential / Signature] membership has been running this whole time. Here's what's sitting in it right now, unused:

**Essential members:**
- Two monthly maintenance washes (already covered — July's and last month's)
- Priority booking access (we hold slots for members before they open to the public)

**Signature members:**
- One bi-monthly full detail (overdue)
- Ceramic maintenance top-up (keeps your coating performing through winter)
- Exclusive add-on pricing — 30–35% off extras including interior treatments, paint decontamination, and tyre dressing

That's not small. Particularly the ceramic maintenance — without it, the hydrophobic layer weakens gradually. The coating still works, but it works less efficiently. Water doesn't bead the same way. Contaminants sit longer. By the time you notice it in how the car looks, you're a correction session away from a reset rather than a maintenance wash.

Mid-winter is actually a good time to get this done — the car's been through the worst of the road grime, and a detail now means it stays clean longer going into August.

If you'd like to get something in the calendar, I've got availability mid-week and Saturday mornings.

[See available times →]

Tom  
Pristine Detailers  

---

**Notes:**
- Pull membership tier from CRM to show the correct bullet list — don't show both
- "Two monthly maintenance washes" is an example — adjust based on actual months since last booking if data is available
- The ceramic maintenance paragraph is doing double duty: educating and creating mild urgency without manufacturing a false deadline
- No discount in this email — value education first, offer in Email 3
- "Saturday mornings" reflects real availability; confirm with ops before sending

---

## Email 3 — Day 60: Save Offer

**Subject:** Still here. Free iron decontamination if you book this week.  
**Preview text:** The offer's real, the reason is real — here's what's going on  
**Send time:** Tuesday, 8:30am AEST  
**Tone:** Direct, honest, personal — no campaign-speak

---

Hey [First Name],

Two months since your last booking. I'm going to keep this short.

Your membership is still active and I'd like to keep it that way — but only if it's actually useful to you. So let me make the next booking worth your while.

**Book any service before [DATE: 21st July] and I'll add a free iron decontamination treatment.**

If you haven't had this done before: iron fallout is brake dust and industrial particles that bond to your paint and wheels over time. You can't always see it, but in winter it accumulates fast — Melbourne traffic, wet roads, slow freeway braking. Left long enough it starts to pit clear coat. An iron decontamination dissolves it chemically without touching the paint. Takes about 20 minutes and it's something we'd normally charge $80–100 for.

It's a genuinely useful thing to do right now. That's the reason I'm offering it.

[Claim the free iron decon →]  
*(Book by 21st July. Service can be scheduled within 30 days. One per active membership.)*

If the membership isn't working for you — the timing's off, you've changed cars, or you'd rather pause than cancel — just reply here and we'll work out the best option. No hold music, no ticket system. I'll reply.

Tom  
Pristine Detailers  
[phone number]

---

**Notes:**
- [DATE] = 21st July — confirm this populates dynamically at send time, not hardcoded
- Iron decontamination is the save offer this month — it's distinct from the June offer (interior detail) and is winter-specific and technically credible
- The explanation of *why* iron fallout matters is doing the trust work — members on good cars will understand and appreciate the specificity
- "I'll reply" requires this email to route to a real inbox
- If a member replies asking to cancel or pause: route immediately to a human, do not automate the response
- Track: open rate, click rate on CTA, bookings within 7 days. Booking = save. No action after Email 3 = review membership status; consider a personal call for members 6+ months tenure or Signature tier

---

## Sequence Summary

| Email | Day | Subject | Core angle |
|-------|-----|---------|------------|
| 1 | Day 45 | Your car's been doing it alone for a while | Soft check-in, July frost framing |
| 2 | Day 52 | Eight weeks in — here's what you haven't used yet | Unused membership value, ceramic maintenance education |
| 3 | Day 60 | Still here. Free iron decontamination if you book this week. | Concrete save offer, honest framing |

**Suppression:** Cancel sequence if booking made at any point.  
**Escalation:** Human handoff if Email 3 triggers a reply about cancelling or pausing.  
**Post-sequence:** No booking after Email 3 → review membership status; personal call for Signature members or 6+ month tenure.  

---

## Seasonal Note — Deep Winter Frame (July)

July is Melbourne's coldest month and the toughest on cars. Overnight frosts (inner east, Bayside, Mornington Peninsula), persistent road spray, heavy brake dust accumulation, and interiors collecting moisture from wet gear. The key thing that separates July from June in the copy: iron fallout and frost damage are legitimate, specific reasons to book *right now* — not generic "winter's tough" filler. Members on quality European and Japanese vehicles know what these things are. Treating them like they know their car builds trust and makes the emails land differently than generic re-engagement campaigns.

The save offer (iron decontamination) is deliberately different from the June save offer (interior detail). Avoid repeating offers back-to-back — members who received the June sequence will notice, and repeating offers looks like a template, not a person.
