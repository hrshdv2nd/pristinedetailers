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
-- ============================================================
-- MIGRATION 002 — Core Tables
-- Depends on: 001_extensions_and_types.sql
-- ============================================================

-- ============================================================
-- profiles  (extends auth.users 1:1)
-- ============================================================
CREATE TABLE profiles (
  id          UUID        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role        user_role   NOT NULL DEFAULT 'customer',
  full_name   TEXT        NOT NULL DEFAULT '',
  email       TEXT        UNIQUE NOT NULL,
  phone       TEXT,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- locations  (multi-location support from day one)
-- ============================================================
CREATE TABLE locations (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  address     TEXT,
  city        TEXT,
  state       TEXT,
  postcode    TEXT,
  phone       TEXT,
  is_active   BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- membership_plans
-- ============================================================
CREATE TABLE membership_plans (
  id                     UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  name                   TEXT         NOT NULL,
  price_monthly          NUMERIC(10,2) NOT NULL,
  description            TEXT,
  benefits               JSONB        NOT NULL DEFAULT '[]',
  max_bookings_per_month INTEGER,
  stripe_price_id        TEXT         UNIQUE,
  is_active              BOOLEAN      NOT NULL DEFAULT TRUE,
  display_order          INTEGER      NOT NULL DEFAULT 0,
  created_at             TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ============================================================
-- service_categories
-- ============================================================
CREATE TABLE service_categories (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT        NOT NULL,
  description   TEXT,
  display_order INTEGER     NOT NULL DEFAULT 0
);

-- ============================================================
-- services
-- ============================================================
CREATE TABLE services (
  id                 UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
  setmore_service_id TEXT         UNIQUE,
  category_id        UUID         REFERENCES service_categories(id) ON DELETE SET NULL,
  name               TEXT         NOT NULL,
  description        TEXT,
  base_price         NUMERIC(10,2) NOT NULL,
  duration_minutes   INTEGER      NOT NULL,
  is_active          BOOLEAN      NOT NULL DEFAULT TRUE,
  display_order      INTEGER      NOT NULL DEFAULT 0,
  created_at         TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ============================================================
-- membership_plan_services  (which services are included in a plan)
-- ============================================================
CREATE TABLE membership_plan_services (
  plan_id    UUID REFERENCES membership_plans(id) ON DELETE CASCADE,
  service_id UUID REFERENCES services(id) ON DELETE CASCADE,
  PRIMARY KEY (plan_id, service_id)
);

-- ============================================================
-- customers
-- ============================================================
CREATE TABLE customers (
  id                    UUID             PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id               UUID             UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  membership_status     membership_status NOT NULL DEFAULT 'none',
  membership_plan_id    UUID             REFERENCES membership_plans(id) ON DELETE SET NULL,
  membership_started_at TIMESTAMPTZ,
  membership_renews_at  TIMESTAMPTZ,
  stripe_customer_id    TEXT             UNIQUE,
  total_spent           NUMERIC(10,2)    NOT NULL DEFAULT 0,
  lifetime_visits       INTEGER          NOT NULL DEFAULT 0,
  notes                 TEXT,
  referred_by           UUID             REFERENCES customers(id) ON DELETE SET NULL,
  created_at            TIMESTAMPTZ      NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ      NOT NULL DEFAULT NOW()
);

-- ============================================================
-- vehicles
-- ============================================================
CREATE TABLE vehicles (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id   UUID        NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
  make          TEXT        NOT NULL,
  model         TEXT        NOT NULL,
  year          SMALLINT,
  color         TEXT,
  license_plate TEXT,
  vin           TEXT,
  is_primary    BOOLEAN     NOT NULL DEFAULT FALSE,
  notes         TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- detailers
-- ============================================================
CREATE TABLE detailers (
  id               UUID      PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID      UNIQUE REFERENCES profiles(id) ON DELETE CASCADE,
  setmore_staff_id TEXT      UNIQUE,
  location_id      UUID      REFERENCES locations(id) ON DELETE SET NULL,
  specialties      TEXT[]    NOT NULL DEFAULT '{}',
  is_active        BOOLEAN   NOT NULL DEFAULT TRUE,
  notes            TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- bookings  (core operational table — syncs with Setmore)
-- ============================================================
CREATE TABLE bookings (
  id                    UUID           PRIMARY KEY DEFAULT gen_random_uuid(),
  setmore_booking_id    TEXT           UNIQUE,
  customer_id           UUID           REFERENCES customers(id) ON DELETE SET NULL,
  detailer_id           UUID           REFERENCES detailers(id) ON DELETE SET NULL,
  service_id            UUID           REFERENCES services(id) ON DELETE SET NULL,
  vehicle_id            UUID           REFERENCES vehicles(id) ON DELETE SET NULL,
  location_id           UUID           REFERENCES locations(id) ON DELETE SET NULL,
  status                booking_status NOT NULL DEFAULT 'pending',
  scheduled_start       TIMESTAMPTZ    NOT NULL,
  scheduled_end         TIMESTAMPTZ    NOT NULL,
  price                 NUMERIC(10,2),
  is_membership_booking BOOLEAN        NOT NULL DEFAULT FALSE,
  customer_notes        TEXT,
  internal_notes        TEXT,
  setmore_raw           JSONB,
  synced_at             TIMESTAMPTZ,
  created_at            TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at            TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_bookings_customer    ON bookings(customer_id);
CREATE INDEX idx_bookings_detailer    ON bookings(detailer_id);
CREATE INDEX idx_bookings_status      ON bookings(status);
CREATE INDEX idx_bookings_scheduled   ON bookings(scheduled_start DESC);
CREATE INDEX idx_bookings_setmore_id  ON bookings(setmore_booking_id);

-- ============================================================
-- job_details  (detailer execution record, 1:1 with booking)
-- ============================================================
CREATE TABLE job_details (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id       UUID        UNIQUE NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  checklist        JSONB       NOT NULL DEFAULT '[]',
  before_photos    TEXT[]      NOT NULL DEFAULT '{}',
  after_photos     TEXT[]      NOT NULL DEFAULT '{}',
  issues_found     TEXT,
  completion_notes TEXT,
  started_at       TIMESTAMPTZ,
  completed_at     TIMESTAMPTZ,
  updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- payments
-- ============================================================
CREATE TABLE payments (
  id                 UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id        UUID          NOT NULL REFERENCES customers(id) ON DELETE RESTRICT,
  booking_id         UUID          REFERENCES bookings(id) ON DELETE SET NULL,
  membership_plan_id UUID          REFERENCES membership_plans(id) ON DELETE SET NULL,
  amount             NUMERIC(10,2) NOT NULL,
  currency           TEXT          NOT NULL DEFAULT 'AUD',
  payment_type       payment_type  NOT NULL,
  status             payment_status NOT NULL DEFAULT 'pending',
  stripe_payment_id  TEXT          UNIQUE,
  stripe_invoice_id  TEXT,
  created_at         TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_payments_customer ON payments(customer_id);
CREATE INDEX idx_payments_booking  ON payments(booking_id);

-- ============================================================
-- setmore_sync_log  (observability — every sync run is recorded)
-- ============================================================
CREATE TABLE setmore_sync_log (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  sync_type        TEXT        NOT NULL,
  triggered_by     TEXT,
  started_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at     TIMESTAMPTZ,
  bookings_created INTEGER     NOT NULL DEFAULT 0,
  bookings_updated INTEGER     NOT NULL DEFAULT 0,
  bookings_skipped INTEGER     NOT NULL DEFAULT 0,
  errors           JSONB       NOT NULL DEFAULT '[]',
  status           sync_status NOT NULL DEFAULT 'running'
);

-- ============================================================
-- SEED: default location and service categories
-- ============================================================
INSERT INTO locations (name, city, state, is_active)
VALUES ('Pristine Detailers HQ', 'Melbourne', 'VIC', TRUE);

INSERT INTO service_categories (name, display_order) VALUES
  ('Paint Protection',  1),
  ('Ceramic Coating',   2),
  ('Interior Detailing',3),
  ('Full Detailing',    4),
  ('Maintenance',       5);
-- ============================================================
-- MIGRATION 003 — Functions & Triggers
-- Depends on: 002_core_tables.sql
-- ============================================================

-- ============================================================
-- updated_at auto-stamp (reusable)
-- ============================================================
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_job_details_updated_at
  BEFORE UPDATE ON job_details
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ============================================================
-- Auto-create profile on Supabase Auth user creation
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(
      (NEW.raw_user_meta_data->>'role')::user_role,
      'customer'
    )
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- Auto-create customer row when a customer profile is created
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_customer_profile()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  IF NEW.role = 'customer' THEN
    INSERT INTO customers (user_id)
    VALUES (NEW.id)
    ON CONFLICT (user_id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_customer_profile_created
  AFTER INSERT ON profiles
  FOR EACH ROW EXECUTE FUNCTION handle_new_customer_profile();

-- ============================================================
-- Auto-create job_details shell when a booking is created
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_booking()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO job_details (booking_id, checklist)
  VALUES (
    NEW.id,
    '[
      {"item": "Vehicle inspection & pre-wash documentation", "checked": false},
      {"item": "Rinse & foam pre-wash",                       "checked": false},
      {"item": "Two-bucket hand wash",                        "checked": false},
      {"item": "Clay bar decontamination",                    "checked": false},
      {"item": "Iron & tar removal",                          "checked": false},
      {"item": "Paint thickness measurement",                 "checked": false},
      {"item": "Machine polish / correction",                 "checked": false},
      {"item": "Panel wipe-down (IPA)",                       "checked": false},
      {"item": "Coating / protection application",            "checked": false},
      {"item": "Interior vacuum & wipe-down",                 "checked": false},
      {"item": "Final inspection & customer walkthrough",     "checked": false}
    ]'::jsonb
  )
  ON CONFLICT (booking_id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_booking_created
  AFTER INSERT ON bookings
  FOR EACH ROW EXECUTE FUNCTION handle_new_booking();

-- ============================================================
-- Increment customer lifetime_visits on job completion
-- ============================================================
CREATE OR REPLACE FUNCTION increment_customer_visits(booking_id UUID)
RETURNS VOID LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE
  v_customer_id UUID;
  v_price       NUMERIC;
BEGIN
  SELECT customer_id, price INTO v_customer_id, v_price
  FROM bookings WHERE id = booking_id;

  UPDATE customers
  SET
    lifetime_visits = lifetime_visits + 1,
    total_spent     = total_spent + COALESCE(v_price, 0),
    updated_at      = NOW()
  WHERE id = v_customer_id;
END;
$$;

-- ============================================================
-- Safe role helpers — SECURITY DEFINER to prevent RLS recursion
-- ============================================================
CREATE OR REPLACE FUNCTION get_my_role()
RETURNS user_role LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT role FROM profiles WHERE id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION get_my_customer_id()
RETURNS UUID LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT id FROM customers WHERE user_id = auth.uid();
$$;

CREATE OR REPLACE FUNCTION get_my_detailer_id()
RETURNS UUID LANGUAGE sql STABLE SECURITY DEFINER AS $$
  SELECT id FROM detailers WHERE user_id = auth.uid();
$$;
-- ============================================================
-- MIGRATION 004 — Row Level Security Policies
-- Depends on: 003_functions_and_triggers.sql
-- ============================================================
-- Strategy:
--   • Admins bypass RLS via service_role key in Edge Functions
--   • All anon/authenticated access is constrained by these policies
--   • Policies use SECURITY DEFINER helpers to avoid recursion
-- ============================================================

-- ============================================================
-- profiles
-- ============================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles: read own"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "profiles: update own"
  ON profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles: admin full"
  ON profiles FOR ALL
  USING (get_my_role() = 'admin');

-- Detailers can read basic info of customers in their jobs
CREATE POLICY "profiles: detailer read customer"
  ON profiles FOR SELECT
  USING (
    get_my_role() = 'detailer' AND
    id IN (
      SELECT p.id FROM profiles p
      JOIN customers c ON c.user_id = p.id
      JOIN bookings b  ON b.customer_id = c.id
      WHERE b.detailer_id = get_my_detailer_id()
    )
  );

-- ============================================================
-- locations  (public read)
-- ============================================================
ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "locations: public read"
  ON locations FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "locations: admin full"
  ON locations FOR ALL
  USING (get_my_role() = 'admin');

-- ============================================================
-- service_categories  (public read)
-- ============================================================
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_categories: public read"
  ON service_categories FOR SELECT
  USING (TRUE);

CREATE POLICY "service_categories: admin full"
  ON service_categories FOR ALL
  USING (get_my_role() = 'admin');

-- ============================================================
-- services  (public read)
-- ============================================================
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "services: public read"
  ON services FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "services: admin full"
  ON services FOR ALL
  USING (get_my_role() = 'admin');

-- ============================================================
-- membership_plans  (public read)
-- ============================================================
ALTER TABLE membership_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "membership_plans: public read"
  ON membership_plans FOR SELECT
  USING (is_active = TRUE);

CREATE POLICY "membership_plans: admin full"
  ON membership_plans FOR ALL
  USING (get_my_role() = 'admin');

-- ============================================================
-- membership_plan_services  (public read)
-- ============================================================
ALTER TABLE membership_plan_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "membership_plan_services: public read"
  ON membership_plan_services FOR SELECT
  USING (TRUE);

CREATE POLICY "membership_plan_services: admin full"
  ON membership_plan_services FOR ALL
  USING (get_my_role() = 'admin');

-- ============================================================
-- customers
-- ============================================================
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "customers: read own"
  ON customers FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "customers: update own"
  ON customers FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "customers: admin full"
  ON customers FOR ALL
  USING (get_my_role() = 'admin');

CREATE POLICY "customers: detailer read booked"
  ON customers FOR SELECT
  USING (
    get_my_role() = 'detailer' AND
    id IN (SELECT customer_id FROM bookings WHERE detailer_id = get_my_detailer_id())
  );

-- ============================================================
-- vehicles
-- ============================================================
ALTER TABLE vehicles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "vehicles: customer own"
  ON vehicles FOR ALL
  USING (customer_id = get_my_customer_id());

CREATE POLICY "vehicles: admin full"
  ON vehicles FOR ALL
  USING (get_my_role() = 'admin');

CREATE POLICY "vehicles: detailer read booked"
  ON vehicles FOR SELECT
  USING (
    get_my_role() = 'detailer' AND
    id IN (SELECT vehicle_id FROM bookings WHERE detailer_id = get_my_detailer_id())
  );

-- ============================================================
-- detailers
-- ============================================================
ALTER TABLE detailers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "detailers: read own"
  ON detailers FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "detailers: update own"
  ON detailers FOR UPDATE
  USING (user_id = auth.uid());

CREATE POLICY "detailers: admin full"
  ON detailers FOR ALL
  USING (get_my_role() = 'admin');

-- ============================================================
-- bookings
-- ============================================================
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "bookings: customer own"
  ON bookings FOR SELECT
  USING (customer_id = get_my_customer_id());

CREATE POLICY "bookings: detailer assigned read"
  ON bookings FOR SELECT
  USING (detailer_id = get_my_detailer_id());

CREATE POLICY "bookings: detailer update status"
  ON bookings FOR UPDATE
  USING (detailer_id = get_my_detailer_id())
  WITH CHECK (detailer_id = get_my_detailer_id());

CREATE POLICY "bookings: admin full"
  ON bookings FOR ALL
  USING (get_my_role() = 'admin');

-- ============================================================
-- job_details
-- ============================================================
ALTER TABLE job_details ENABLE ROW LEVEL SECURITY;

CREATE POLICY "job_details: customer read own"
  ON job_details FOR SELECT
  USING (
    booking_id IN (
      SELECT id FROM bookings WHERE customer_id = get_my_customer_id()
    )
  );

CREATE POLICY "job_details: detailer full own"
  ON job_details FOR ALL
  USING (
    booking_id IN (
      SELECT id FROM bookings WHERE detailer_id = get_my_detailer_id()
    )
  );

CREATE POLICY "job_details: admin full"
  ON job_details FOR ALL
  USING (get_my_role() = 'admin');

-- ============================================================
-- payments
-- ============================================================
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "payments: customer own"
  ON payments FOR SELECT
  USING (customer_id = get_my_customer_id());

CREATE POLICY "payments: admin full"
  ON payments FOR ALL
  USING (get_my_role() = 'admin');

-- ============================================================
-- setmore_sync_log  (admin/internal only)
-- ============================================================
ALTER TABLE setmore_sync_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "setmore_sync_log: admin full"
  ON setmore_sync_log FOR ALL
  USING (get_my_role() = 'admin');
