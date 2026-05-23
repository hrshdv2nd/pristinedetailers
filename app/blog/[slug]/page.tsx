import { createClient } from '@supabase/supabase-js';
import { notFound } from 'next/navigation';
import { JournalArticle } from '@/components/pages/journal-article';

export const revalidate = 300;

function supabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    console.error('[blog/slug] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY');
    return null;
  }
  return createClient(url, key);
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  try {
    const client = supabase();
    if (!client) return {};
    const { data } = await client
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
    const client = supabase();
    if (!client) notFound();
    const { data: post } = await client
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
