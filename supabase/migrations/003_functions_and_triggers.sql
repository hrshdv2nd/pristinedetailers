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
