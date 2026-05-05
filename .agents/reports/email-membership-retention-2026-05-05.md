# Email Sequence: Membership Retention
**Focus:** Re-engaging members who haven't booked in 45+ days  
**Date written:** 2026-05-05  
**Season:** Autumn / early Winter, Melbourne  
**Skill used:** churn-prevention  

---

## Sequence Overview

| Email | Trigger | Subject line | Tone |
|-------|---------|--------------|------|
| 1 | Day 45 of no booking | "Your car's been quiet on our end" | Warm, personal check-in |
| 2 | Day 52 of no booking | "You're paying for this — just not using it" | Honest, value-focused |
| 3 | Day 60 of no booking | "Last thing: free interior detail if you book this week" | Clear offer, time-limited |

**Audience:** Active members, no booking in 45+ days  
**Send time:** Tuesday or Wednesday, 8:00–9:00am AEST  
**From name:** [Technician first name] at Pristine Detailers (e.g. "Tom at Pristine Detailers")  
**Reply-to:** Direct inbox, not a no-reply address  

---

## Email 1 — Day 45
### Soft Check-In

**Subject:** Your car's been quiet on our end  
**Preview text:** It's been about six weeks — just checking in.

---

Hey [First name],

Noticed it's been a while since we've been out to see your [vehicle — e.g. BMW / Tesla / car].

No chaser here — just wanted to check in. Sometimes life gets busy, sometimes the booking slips. Totally get it.

What I do know is that May in Melbourne isn't kind to paint. The autumn leaves hold moisture against the clear coat. Bird activity is still high before winter sets in. And if you're anywhere near the bay, the salt air doesn't take a break.

If your coating or PPF hasn't had a maintenance wash in 45+ days, it's still doing its job — but it's working harder than it needs to.

When you're ready to book, just reply here and I'll sort it. Or grab a time directly:

**[Book a maintenance wash →]**

No pressure. Just here when you need us.

Tom  
Pristine Detailers  
Mobile: [number]

---

## Email 2 — Day 52
### Value Reminder

**Subject:** You're paying for this — just not using it  
**Preview text:** Your monthly maintenance is sitting unused. Here's what that means.

---

Hey [First name],

Straight up: your membership includes a monthly maintenance wash. It's already paid for. It doesn't roll over.

I'm not saying this to guilt you — I'm saying it because if you've got a ceramic coating or PPF on your car, skipping the maintenance wash isn't just leaving money on the table. It's making the coating work harder than it should.

Here's what your membership covers that you haven't used yet this month:

- **Monthly maintenance wash** — included, at no extra charge
- **Priority scheduling** — we fit around your calendar, not the other way around
- **Member pricing** on any paint correction or additional services you add
- **Exclusive rates** if you want to upgrade to a full ceramic top-up before winter

In winter, the stuff that sits on your paint gets more aggressive — condensation traps contaminants, cold mornings mean more road grime, and if you're taking the car to the Peninsula on weekends, gravel roads are doing real damage to the lower panels.

A maintenance wash right now takes about an hour. We come to you — home, office, wherever works.

**[Book your included maintenance wash →]**

Takes two minutes to lock in a time.

Tom  
Pristine Detailers

---

## Email 3 — Day 60
### Save Offer

**Subject:** Last thing: free interior detail if you book this week  
**Preview text:** One-time offer, closes Sunday.

---

Hey [First name],

I'll keep this short.

You haven't booked in about two months. I don't want to keep nudging you if the membership isn't working for you — that's fair, and you can always reach out if you want to pause or change anything.

But if it's just been a busy stretch and you've been meaning to get back on the schedule, here's a reason to do it this week:

**Book any service before Sunday 10 May and we'll add a full interior detail at no charge.**

That's leather conditioning, vacuum, odour treatment, door jambs — the full interior. Usually $120. Yours free with any booking this week.

May through July is when Melbourne interiors take the most punishment. Damp shoes, cold mornings, the heater running constantly — it all builds up. Now's actually a good time to reset it.

**[Claim your free interior detail →]**

Offer's good until end of Sunday. After that, I'll stop sending these — promise.

Tom  
Pristine Detailers  
Mobile: [number]

P.S. If the membership genuinely isn't the right fit anymore, just reply and let me know. No hard feelings, and I'll sort it for you directly — no forms, no cancel flows.

---

## Notes for Sending

- **Personalisation fields:** [First name], [vehicle make/model if known], [suburb if known]
- **CTA links:** All should go to `/booking` with UTM params `?utm_source=email&utm_medium=retention&utm_campaign=dormant-45d`
- **Email 3 offer expiry:** Set a hard deadline (Sunday of the send week). Do not extend automatically.
- **If member books after Email 1 or 2:** Remove from sequence immediately. Do not send subsequent emails.
- **Plain text versions:** Send alongside HTML. Plain text outperforms designed templates for re-engagement.
- **From name:** Use a real technician's first name + "at Pristine Detailers" — not "The Pristine Team"
- **Unsubscribe:** Standard unsubscribe footer required. Members who unsubscribe should be flagged for manual follow-up before membership lapses.

## Success Metrics to Track

| Metric | Target |
|--------|--------|
| Email 1 open rate | 40%+ (personal subject line) |
| Email 2 click-through | 8–12% |
| Email 3 offer redemption | 15–25% of remaining dormant segment |
| Overall sequence rebook rate | 20–30% of the 45-day dormant cohort |
| Churn prevented (no cancel after sequence) | Track 90-day cohort |
