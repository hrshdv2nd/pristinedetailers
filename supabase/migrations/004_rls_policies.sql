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
