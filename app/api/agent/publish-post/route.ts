import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Temporary diagnostic — remove after confirming env vars
export async function GET() {
  const vars = ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY', 'SUPABASE_SERVICE_ROLE_KEY', 'AGENT_API_SECRET'];
  return NextResponse.json(Object.fromEntries(vars.map(k => [k, !!process.env[k]])));
}

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
  // Use service role key (available in runtime); RLS is open for agent writes
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

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
