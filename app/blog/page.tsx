import { createClient } from '@supabase/supabase-js';
import { Journal } from '@/components/pages/journal';

export const metadata = {
  title: 'Blog — Pristine Detailers',
  description: 'Expert guides on ceramic coating, paint protection film, and keeping your car in showroom condition.',
};

export const revalidate = 300;

export default async function Page() {
  let articles: {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    read_time: string;
    published_at: string | null;
  }[] = [];

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    console.error('[blog] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY');
    return <Journal articles={[]} />;
  }

  try {
    const supabase = createClient(url, key);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('slug, title, excerpt, category, read_time, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });
    if (error) console.error('[blog] Supabase query error:', error.message);
    articles = data ?? [];
  } catch (err) {
    console.error('[blog] Supabase fetch failed:', err);
  }

  return <Journal articles={articles} />;
}
