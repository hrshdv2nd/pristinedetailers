import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { createClient } from '@supabase/supabase-js';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

const SOCIAL_SYSTEM_PROMPT = `You are Jordan, senior content writer for Pristine Detailers — Melbourne's premium mobile car detailing service.

Your task: generate 3 educational social media slideshow posts for Instagram and Facebook. Each post is published at a different time of day.

Services: ceramic coating, paint protection film (PPF), paint correction, interior detailing, membership plans.
Service area: Greater Melbourne — South East suburbs (Clyde North, Berwick, Cranbourne, Narre Warren, Dandenong) and inner suburbs (Toorak, South Yarra, Brighton).

Each post is a carousel/slideshow format (5–6 slides). Each slide has a punchy headline and 2–3 short bullet points (max 25 words per slide total). Think: educational, scroll-stopping, visually clean.

Rules:
- Australian English
- Educational first, promotional second
- Each post must cover a DIFFERENT detailing topic
- Tone: expert, human, direct — never corporate
- Base topics on the blog articles provided where possible (repurpose content into bite-sized slides)
- Posts are staggered: Post 1 = 8:00am, Post 2 = 12:00pm, Post 3 = 5:00pm AEST

Image bank (pick the most contextually relevant URL for each post):
- Ceramic coating being applied: https://images.unsplash.com/photo-1619767886558-efdc259cde1a?w=1200&q=80
- Glossy black car close-up: https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80
- Paint protection film detail: https://images.unsplash.com/photo-1604754742629-3e5728249d73?w=1200&q=80
- Sports car front angle: https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80
- Car detailing wash: https://images.unsplash.com/photo-1617469767824-e76ad64e9f86?w=1200&q=80
- Interior detailing: https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80
- Polishing machine in use: https://images.unsplash.com/photo-1489824904134-af1a94f0e6e2?w=1200&q=80
- Prestige car in Melbourne: https://images.unsplash.com/photo-1568605117036-5c5edba50dc0?w=1200&q=80

Return ONLY valid JSON — no markdown fences, no commentary:
{
  "posts": [
    {
      "time": "08:00 AEST",
      "topic": "string — short topic label",
      "cover_image_url": "string — URL from image bank",
      "slides": [
        {
          "slide_number": 1,
          "headline": "string — punchy, max 8 words",
          "bullets": ["string", "string", "string"]
        }
      ],
      "instagram_caption": "string — hook line + 3–4 body lines + CTA + 5 hashtags",
      "facebook_caption": "string — 3–5 sentences, community feel, ends with CTA"
    }
  ]
}`;

interface Slide {
  slide_number: number;
  headline: string;
  bullets: string[];
}

interface SocialPost {
  time: string;
  topic: string;
  cover_image_url: string;
  slides: Slide[];
  instagram_caption: string;
  facebook_caption: string;
}

interface PublishResult {
  success: boolean;
  postId?: string;
  error?: string;
}

function isAuthorized(req: NextRequest): boolean {
  const auth = req.headers.get('authorization');
  const secret = process.env.AGENT_API_SECRET;
  const cron = process.env.CRON_SECRET;
  if (!secret) return false;
  if (auth === `Bearer ${secret}`) return true;
  if (cron && auth === `Bearer ${cron}`) return true;
  return false;
}

function supabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, key, { auth: { persistSession: false } });
}

async function getRecentBlogPosts(): Promise<string[]> {
  try {
    const { data } = await supabaseAdmin()
      .from('blog_posts')
      .select('title, excerpt, category')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(12);
    return (data ?? []).map(
      (r: { title: string; excerpt: string; category: string }) =>
        `[${r.category}] ${r.title} — ${r.excerpt}`
    );
  } catch {
    return [];
  }
}

async function publishToFacebook(post: SocialPost): Promise<PublishResult> {
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;
  if (!token || !pageId) {
    return { success: false, error: 'FACEBOOK_PAGE_ACCESS_TOKEN or FACEBOOK_PAGE_ID not set' };
  }

  try {
    const res = await fetch(`https://graph.facebook.com/v19.0/${pageId}/photos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: post.cover_image_url,
        message: post.facebook_caption,
        access_token: token,
      }),
    });
    const data = await res.json() as { id?: string; error?: { message: string } };
    if (data.id) return { success: true, postId: data.id };
    return { success: false, error: data.error?.message ?? 'Unknown Facebook error' };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

async function publishToInstagram(post: SocialPost): Promise<PublishResult> {
  const token = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;
  const igId = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID;
  if (!token || !igId) {
    return { success: false, error: 'FACEBOOK_PAGE_ACCESS_TOKEN or INSTAGRAM_BUSINESS_ACCOUNT_ID not set' };
  }

  try {
    // Step 1: create media container
    const containerRes = await fetch(`https://graph.facebook.com/v19.0/${igId}/media`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        image_url: post.cover_image_url,
        caption: post.instagram_caption,
        access_token: token,
      }),
    });
    const container = await containerRes.json() as { id?: string; error?: { message: string } };
    if (!container.id) {
      return { success: false, error: container.error?.message ?? 'Failed to create Instagram media container' };
    }

    // Step 2: publish container
    const publishRes = await fetch(`https://graph.facebook.com/v19.0/${igId}/media_publish`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        creation_id: container.id,
        access_token: token,
      }),
    });
    const published = await publishRes.json() as { id?: string; error?: { message: string } };
    if (published.id) return { success: true, postId: published.id };
    return { success: false, error: published.error?.message ?? 'Failed to publish Instagram post' };
  } catch (err) {
    return { success: false, error: String(err) };
  }
}

function buildReport(posts: SocialPost[], date: string): string {
  const lines: string[] = [
    `# Jordan — Daily Social Posts`,
    `**Date:** ${date}  `,
    `**Agent:** Jordan (Content Writer)  `,
    `**Platforms:** Instagram, Facebook  `,
    `**Format:** Educational slideshow carousel`,
    '',
  ];

  for (const post of posts) {
    lines.push('---', '', `## 🕐 ${post.time} — ${post.topic}`, '');
    lines.push(`**Cover image:** \`${post.cover_image_url}\``, '');
    lines.push('### Slideshow Script', '');
    for (const slide of post.slides) {
      lines.push(`**Slide ${slide.slide_number}: ${slide.headline}**`);
      for (const b of slide.bullets) lines.push(`- ${b}`);
      lines.push('');
    }
    lines.push('### Instagram Caption', '```', post.instagram_caption, '```', '');
    lines.push('### Facebook Caption', '```', post.facebook_caption, '```', '');
  }

  return lines.join('\n');
}

export async function POST(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing ANTHROPIC_API_KEY' }, { status: 500 });
  }

  const today = new Date().toISOString().split('T')[0];
  const recentPosts = await getRecentBlogPosts();

  const userMessage = [
    recentPosts.length > 0
      ? `Recent blog articles on the Pristine Detailers journal (use these as source material for slide content):\n${recentPosts.map(t => `- ${t}`).join('\n')}`
      : 'No existing blog articles — draw from general detailing knowledge.',
    `Generate 3 educational Instagram and Facebook slideshow posts for ${today}.`,
  ].join('\n\n');

  const anthropic = new Anthropic({ apiKey });

  let raw: string;
  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: SOCIAL_SYSTEM_PROMPT,
      messages: [{ role: 'user', content: userMessage }],
    });
    raw = (message.content[0] as { type: string; text: string }).text;
  } catch (err) {
    console.error('[jordan/social] Claude error:', err);
    return NextResponse.json({ error: 'Claude generation failed' }, { status: 502 });
  }

  let result: { posts: SocialPost[] };
  try {
    const cleaned = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
    result = JSON.parse(cleaned);
  } catch (err) {
    console.error('[jordan/social] JSON parse error:', err, '\nRaw:', raw);
    return NextResponse.json({ error: 'Failed to parse Claude response as JSON' }, { status: 500 });
  }

  // Publish to both platforms for each post
  const publishResults = await Promise.all(
    result.posts.map(async (post) => {
      const [facebook, instagram] = await Promise.all([
        publishToFacebook(post),
        publishToInstagram(post),
      ]);
      return { topic: post.topic, time: post.time, facebook, instagram };
    })
  );

  // Save daily report
  const report = buildReport(result.posts, today);
  const reportPath = path.join(process.cwd(), '.agents', 'reports', `jordan-social-${today}.md`);
  try {
    await mkdir(path.dirname(reportPath), { recursive: true });
    await writeFile(reportPath, report, 'utf8');
  } catch (err) {
    console.warn('[jordan/social] Could not save report file:', err);
  }

  const fbConfigured = !!(process.env.FACEBOOK_PAGE_ACCESS_TOKEN && process.env.FACEBOOK_PAGE_ID);
  const igConfigured = !!(process.env.FACEBOOK_PAGE_ACCESS_TOKEN && process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID);

  return NextResponse.json({
    success: true,
    date: today,
    posts_generated: result.posts.length,
    publishing_status: {
      facebook: fbConfigured ? 'attempted' : 'skipped — add FACEBOOK_PAGE_ACCESS_TOKEN + FACEBOOK_PAGE_ID env vars',
      instagram: igConfigured ? 'attempted' : 'skipped — add FACEBOOK_PAGE_ACCESS_TOKEN + INSTAGRAM_BUSINESS_ACCOUNT_ID env vars',
    },
    results: publishResults,
    report_saved_to: `.agents/reports/jordan-social-${today}.md`,
  });
}

// Vercel cron hits GET
export async function GET(req: NextRequest) {
  return POST(req);
}
