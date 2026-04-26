-- ============================================================
-- MIGRATION 005 — Realtime & Cron
-- Depends on: 004_rls_policies.sql
-- ============================================================

-- ============================================================
-- Enable Realtime on tables that need live updates
-- ============================================================
ALTER PUBLICATION supabase_realtime ADD TABLE bookings;
ALTER PUBLICATION supabase_realtime ADD TABLE job_details;

-- ============================================================
-- Cron: Setmore incremental sync every 15 minutes
-- Cron: Setmore full nightly sync at 2 AM AEST (16:00 UTC)
--
-- IMPORTANT: Replace <PROJECT_REF> and <SERVICE_ROLE_KEY>
-- with your actual values before running this migration.
-- ============================================================

SELECT cron.schedule(
  'setmore-incremental-sync',
  '*/15 * * * *',
  $$
    SELECT net.http_post(
      url     := 'https://fsgntfoxiloruupihaeo.supabase.co/functions/v1/sync-setmore',
      headers := jsonb_build_object(
        'Content-Type',  'application/json',
        'Authorization', 'Bearer <SERVICE_ROLE_KEY>'
      ),
      body    := '{"syncType": "incremental"}'::jsonb
    );
  $$
);

SELECT cron.schedule(
  'setmore-nightly-full-sync',
  '0 16 * * *',
  $$
    SELECT net.http_post(
      url     := 'https://fsgntfoxiloruupihaeo.supabase.co/functions/v1/sync-setmore',
      headers := jsonb_build_object(
        'Content-Type',  'application/json',
        'Authorization', 'Bearer <SERVICE_ROLE_KEY>'
      ),
      body    := '{"syncType": "full_historical"}'::jsonb
    );
  $$
);
