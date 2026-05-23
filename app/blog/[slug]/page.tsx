import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import { JournalArticle } from '@/components/pages/journal-article';

export const revalidate = 3600;

function supabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const { data } = await supabase()
      .from('blog_posts')
      .select('title, excerpt')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();
    if (!data) return {};
    return {
      title: `${data.title} — Pristine Detailers`,
      description: data.excerpt,
    };
  } catch {
    return {};
  }
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const { data: post } = await supabase()
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();
    if (!post) notFound();
    return <JournalArticle post={post} />;
  } catch {
    notFound();
  }
}
