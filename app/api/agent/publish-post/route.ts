import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

function isAuthorized(request: NextRequest): boolean {
  const auth = request.headers.get('authorization');
  const secret = process.env.AGENT_API_SECRET;
  if (!secret) return false;
  return auth === `Bearer ${secret}`;
}

export async function POST(request: NextRequest) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Use publishable key — RLS is open for agent writes, route is secured by AGENT_API_SECRET
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Server misconfigured: missing Supabase credentials' }, { status: 500 });
  }

  const body = await request.json();
  const { slug, title, excerpt, body: postBody, category, read_time, agent_name, status = 'published' } = body;

  if (!slug || !title || !excerpt || !category) {
    return NextResponse.json({ error: 'Missing required fields: slug, title, excerpt, category' }, { status: 400 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data, error } = await supabase
    .from('blog_posts')
    .upsert(
      {
        slug,
        title,
        excerpt,
        body: postBody ?? '',
        category,
        read_time: read_time ?? '5 min read',
        agent_name,
        status,
        ...(status === 'published' ? { published_at: new Date().toISOString() } : {}),
      },
      { onConflict: 'slug' },
    )
    .select('id, slug, status')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, post: data });
}
