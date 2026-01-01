-- =====================================================
-- Karaj Barbari - Complete PostgreSQL Database Schema
-- Compatible with Supabase & Standard PostgreSQL
-- Generated: 2026-01-01
-- =====================================================

-- =====================================================
-- ENUMS (Custom Types)
-- =====================================================

-- نقش‌های کاربری
CREATE TYPE app_role AS ENUM ('admin', 'user');

-- وضعیت رزرو
CREATE TYPE booking_status AS ENUM (
  'pending',      -- در انتظار
  'confirmed',    -- تایید شده
  'in_progress',  -- در حال انجام
  'completed',    -- تکمیل شده
  'cancelled'     -- لغو شده
);

-- نوع خدمات
CREATE TYPE service_type AS ENUM (
  'intercity',    -- اسباب‌کشی بین شهری
  'local',        -- اسباب‌کشی درون شهری
  'furniture',    -- حمل اثاثیه
  'van',          -- وانت بار
  'truck',        -- کامیون
  'packing'       -- بسته‌بندی
);

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- تابع به‌روزرسانی خودکار updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- تابع بررسی نقش کاربر
CREATE OR REPLACE FUNCTION has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1
    FROM user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$ LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public;

-- تابع ایجاد پروفایل برای کاربر جدید
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- =====================================================
-- TABLES
-- =====================================================

-- جدول پروفایل کاربران
CREATE TABLE profiles (
  id UUID PRIMARY KEY,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ایندکس برای پروفایل‌ها
CREATE INDEX idx_profiles_created_at ON profiles(created_at DESC);

-- جدول نقش‌های کاربران
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- یکتایی ترکیب user_id و role
  UNIQUE(user_id, role)
);

-- ایندکس برای نقش‌ها
CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_user_roles_role ON user_roles(role);

-- جدول خدمات
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  features TEXT[],
  price_from INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ایندکس برای خدمات
CREATE INDEX idx_services_is_active ON services(is_active);
CREATE INDEX idx_services_created_at ON services(created_at DESC);

-- جدول رزروها
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  origin TEXT NOT NULL,
  destination TEXT NOT NULL,
  service_type service_type NOT NULL,
  booking_date DATE,
  description TEXT,
  status booking_status DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ایندکس‌های رزرو
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_created_at ON bookings(created_at DESC);
CREATE INDEX idx_bookings_phone ON bookings(phone);
CREATE INDEX idx_bookings_service_type ON bookings(service_type);

-- جدول پیام‌های تماس
CREATE TABLE contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ایندکس‌های پیام تماس
CREATE INDEX idx_contact_messages_is_read ON contact_messages(is_read);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);

-- جدول گالری
CREATE TABLE gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ایندکس‌های گالری
CREATE INDEX idx_gallery_is_active ON gallery(is_active);
CREATE INDEX idx_gallery_category ON gallery(category);
CREATE INDEX idx_gallery_created_at ON gallery(created_at DESC);

-- =====================================================
-- TRIGGERS
-- =====================================================

-- تریگر به‌روزرسانی خودکار updated_at برای profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- تریگر به‌روزرسانی خودکار updated_at برای services
CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- تریگر به‌روزرسانی خودکار updated_at برای bookings
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- For Supabase - Can be removed for standard PostgreSQL
-- =====================================================

-- فعال‌سازی RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

-- سیاست‌های profiles
CREATE POLICY "Users can view their own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- سیاست‌های user_roles
CREATE POLICY "Users can view their own roles" ON user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles" ON user_roles
  FOR ALL USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

-- سیاست‌های services
CREATE POLICY "Services are viewable by everyone" ON services
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Admins can manage services" ON services
  FOR ALL USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

-- سیاست‌های bookings
CREATE POLICY "Anyone can create bookings" ON bookings
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Admins can view all bookings" ON bookings
  FOR SELECT USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update bookings" ON bookings
  FOR UPDATE USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

-- سیاست‌های contact_messages
CREATE POLICY "Anyone can send contact messages" ON contact_messages
  FOR INSERT WITH CHECK (TRUE);

CREATE POLICY "Admins can view contact messages" ON contact_messages
  FOR SELECT USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update contact messages" ON contact_messages
  FOR UPDATE USING (has_role(auth.uid(), 'admin'));

-- سیاست‌های gallery
CREATE POLICY "Gallery is viewable by everyone" ON gallery
  FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Admins can manage gallery" ON gallery
  FOR ALL USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

-- =====================================================
-- SAMPLE DATA (Optional)
-- =====================================================

-- داده‌های نمونه خدمات
INSERT INTO services (title, description, icon, features, price_from, is_active) VALUES
  ('اسباب‌کشی بین شهری', 'حمل اثاثیه منزل به تمام نقاط ایران با بیمه کامل', 'Truck', ARRAY['بیمه کامل محموله', 'بسته‌بندی حرفه‌ای', 'تحویل درب منزل'], 2000000, TRUE),
  ('اسباب‌کشی درون شهری', 'جابجایی سریع و امن در سطح شهر کرج', 'Home', ARRAY['سرویس همان روز', 'کارگر مجرب', 'قیمت مناسب'], 500000, TRUE),
  ('حمل اثاثیه', 'حمل انواع اثاثیه با خودروهای مخصوص', 'Package', ARRAY['خودروهای اختصاصی', 'محافظت کامل', 'زمان‌بندی دقیق'], 300000, TRUE),
  ('وانت بار', 'سرویس وانت بار برای حمل بار سبک', 'Car', ARRAY['حمل فوری', 'قیمت اقتصادی', 'پوشش سراسری'], 150000, TRUE),
  ('کامیون', 'حمل بار سنگین با کامیون', 'Truck', ARRAY['ظرفیت بالا', 'حمل صنعتی', 'تجهیزات ویژه'], 3000000, TRUE),
  ('بسته‌بندی', 'خدمات بسته‌بندی حرفه‌ای اثاثیه', 'Box', ARRAY['مواد استاندارد', 'کارتن‌های مخصوص', 'برچسب‌گذاری'], 100000, TRUE);

-- =====================================================
-- NOTES FOR MIGRATION
-- =====================================================
/*
برای استفاده بدون Supabase:
1. خطوط مربوط به auth.uid() را حذف یا تغییر دهید
2. سیاست‌های RLS را می‌توانید حذف کنید
3. تابع handle_new_user مخصوص Supabase Auth است

برای PostgreSQL استاندارد:
- نیاز به سیستم احراز هویت جداگانه دارید
- می‌توانید از JWT یا Session استفاده کنید
*/
