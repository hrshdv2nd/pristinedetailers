import { createClient } from '@/lib/supabase/server';
import { Journal } from '@/components/pages/journal';

export const metadata = {
  title: 'Blog — Pristine Detailers',
  description: 'Expert guides on ceramic coating, paint protection film, and keeping your car in showroom condition.',
};

export const revalidate = 3600;

export default async function Page() {
  let articles: {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    read_time: string;
    published_at: string | null;
  }[] = [];

  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('blog_posts')
      .select('slug, title, excerpt, category, read_time, published_at')
      .eq('status', 'published')
      .order('published_at', { ascending: false });
    articles = data ?? [];
  } catch {
    // Supabase unavailable — render with empty list
  }

  return <Journal articles={articles} />;
}
