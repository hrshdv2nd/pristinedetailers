-- ============================================================
-- MIGRATION 001 — Extensions & ENUM types
-- Run first. Everything else depends on these types.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================
-- ENUM TYPES
-- ============================================================

CREATE TYPE user_role AS ENUM (
  'customer',
  'detailer',
  'admin'
);

CREATE TYPE booking_status AS ENUM (
  'pending',
  'confirmed',
  'in_progress',
  'completed',
  'cancelled',
  'no_show'
);

CREATE TYPE membership_status AS ENUM (
  'none',
  'active',
  'paused',
  'cancelled'
);

CREATE TYPE payment_type AS ENUM (
  'one_time',
  'subscription',
  'refund'
);

CREATE TYPE payment_status AS ENUM (
  'pending',
  'succeeded',
  'failed',
  'refunded'
);

CREATE TYPE sync_status AS ENUM (
  'running',
  'success',
  'failed'
);
