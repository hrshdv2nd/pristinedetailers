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
