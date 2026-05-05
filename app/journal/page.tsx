import { createClient } from '@/lib/supabase/server';
import { Journal } from '@/components/pages/journal';

export const metadata = {
  title: 'Journal — Pristine Detailers',
  description: 'Expert guides on ceramic coating, paint protection film, and keeping your car in showroom condition.',
};

export const revalidate = 3600; // revalidate hourly

export default async function Page() {
  const supabase = await createClient();
  const { data: articles } = await supabase
    .from('blog_posts')
    .select('slug, title, excerpt, category, read_time, published_at')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  return <Journal articles={articles ?? []} />;
}
