// Runs the portal migration SQL against the live Supabase project
// Uses the service role key which has full database access
import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = 'https://fsgntfoxiloruupihaeo.supabase.co';
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

const sql = readFileSync(join(__dirname, '../supabase/migrations/20260504040324_add_portal_tables.sql'), 'utf8');

// Split on statement boundaries and run each one
const statements = sql
  .split(/;(?=\s*(?:--|\/\*|$|\n\s*\n|\ncreate|\nalter|\ndo|\ndrop|\ninsert|\ngrant))/i)
  .map(s => s.trim())
  .filter(s => s.length > 0 && !s.startsWith('--'));

console.log(`Running ${statements.length} SQL statements...\n`);

for (let i = 0; i < statements.length; i++) {
  const stmt = statements[i];
  const preview = stmt.slice(0, 80).replace(/\n/g, ' ');
  process.stdout.write(`[${i + 1}/${statements.length}] ${preview}... `);

  const { error } = await supabase.rpc('exec_sql', { sql: stmt }).single().catch(() => ({ error: { message: 'rpc not available' } }));

  if (error) {
    // Try via the query path
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
      method: 'POST',
      headers: {
        apikey: SERVICE_ROLE_KEY,
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sql: stmt }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.log(`❌ ${body.slice(0, 120)}`);
    } else {
      console.log('✓');
    }
  } else {
    console.log('✓');
  }
}

console.log('\nDone.');
