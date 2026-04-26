import { createClient, SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2';

let _client: SupabaseClient | null = null;

// Single admin client that bypasses RLS — only used inside Edge Functions
export function getAdminClient(): SupabaseClient {
  if (_client) return _client;
  _client = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    { auth: { persistSession: false } }
  );
  return _client;
}

export function corsHeaders(origin = '*') {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Headers':
      'authorization, x-client-info, apikey, content-type',
  };
}

export function okJson(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
  });
}

export function errJson(message: string, status = 500): Response {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
  });
}
