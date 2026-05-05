# Pristine Detailers — Marketing Team

This directory contains AI marketing agents that operate on a schedule to run marketing for Pristine Detailers. Each employee has a defined role, skill set, and daily/weekly cadence.

## The Team

| Name | Role | Skills | Schedule |
|------|------|--------|----------|
| **Jordan** | Content Writer | copywriting, content-strategy | Tue + Fri |
| **Alex** | SEO & Discovery | seo-audit, ai-seo, schema-markup | Monday |
| **Sam** | Social Media | social-content, ad-creative | Mon–Fri daily |
| **Riley** | CRO Analyst | page-cro, copy-editing, form-cro | Wednesday |
| **Morgan** | Growth & Referrals | referral-program, email-sequence, marketing-ideas | Thursday |
| **Taylor** | Paid Media | paid-ads, ad-creative, analytics-tracking | Mon + Thu |
| **Casey** | Email & Retention | email-sequence, churn-prevention | Wednesday |

## How It Works

1. **Agents read** `.agents/product-marketing-context.md` for business context every run
2. **Agents use** the marketing skills in `.agents/skills/` to do their work
3. **Jordan publishes** directly to the website via `POST /api/agent/publish-post`
4. **All others** save output to `.agents/reports/` for human review before use

## Website Publishing

The journal at `/journal` now pulls live from Supabase. Jordan's articles go live immediately. To review before publishing, change `status: "published"` to `status: "draft"` in Jordan's persona file.

## Adding Content to the Live Site

Jordan is the only agent with website write access. To extend publishing to other pages (services, landing pages), add a route in `app/api/agent/` and update the relevant agent's instructions.

## Reports Directory

`.agents/reports/` stores all agent output:
- `seo-weekly-{date}.md` — Alex's weekly audit
- `social-{date}.md` — Sam's daily posts
- `cro-{page}-{date}.md` — Riley's page audits
- `growth-{focus}-{date}.md` — Morgan's growth work
- `ads-{platform}-{date}.md` — Taylor's ad copy
- `email-{focus}-{date}.md` — Casey's email sequences
