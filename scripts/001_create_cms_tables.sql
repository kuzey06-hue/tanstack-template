-- Admin kullanıcıları tablosu
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Sayfalar tablosu
CREATE TABLE IF NOT EXISTS public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content JSONB DEFAULT '{}',
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  og_image TEXT,
  is_published BOOLEAN DEFAULT false,
  created_by UUID REFERENCES public.admin_users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Menüler tablosu
CREATE TABLE IF NOT EXISTS public.menus (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL, -- 'header', 'footer', 'mobile'
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Menü öğeleri tablosu
CREATE TABLE IF NOT EXISTS public.menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_id UUID NOT NULL REFERENCES public.menus(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.menu_items(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  target TEXT DEFAULT '_self',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Medya dosyaları tablosu
CREATE TABLE IF NOT EXISTS public.media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  alt_text TEXT,
  caption TEXT,
  uploaded_by UUID REFERENCES public.admin_users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ürünler tablosu
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  content JSONB DEFAULT '{}',
  category TEXT,
  featured_image TEXT,
  gallery JSONB DEFAULT '[]',
  specifications JSONB DEFAULT '[]',
  meta_title TEXT,
  meta_description TEXT,
  meta_keywords TEXT,
  is_published BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_by UUID REFERENCES public.admin_users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site ayarları tablosu
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS politikaları
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

-- Admin kullanıcıları için politikalar
CREATE POLICY "admin_users_select" ON public.admin_users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "admin_users_update" ON public.admin_users FOR UPDATE USING (auth.uid() = id);

-- Sayfalar için politikalar (sadece admin kullanıcılar)
CREATE POLICY "pages_select" ON public.pages FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);
CREATE POLICY "pages_insert" ON public.pages FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);
CREATE POLICY "pages_update" ON public.pages FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);
CREATE POLICY "pages_delete" ON public.pages FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND role = 'admin')
);

-- Menüler için politikalar
CREATE POLICY "menus_select" ON public.menus FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);
CREATE POLICY "menus_insert" ON public.menus FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);
CREATE POLICY "menus_update" ON public.menus FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);
CREATE POLICY "menus_delete" ON public.menus FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND role = 'admin')
);

-- Menü öğeleri için politikalar
CREATE POLICY "menu_items_select" ON public.menu_items FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);
CREATE POLICY "menu_items_insert" ON public.menu_items FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);
CREATE POLICY "menu_items_update" ON public.menu_items FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);
CREATE POLICY "menu_items_delete" ON public.menu_items FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);

-- Medya için politikalar
CREATE POLICY "media_select" ON public.media FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);
CREATE POLICY "media_insert" ON public.media FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);
CREATE POLICY "media_delete" ON public.media FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);

-- Ürünler için politikalar
CREATE POLICY "products_select" ON public.products FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);
CREATE POLICY "products_insert" ON public.products FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);
CREATE POLICY "products_update" ON public.products FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);
CREATE POLICY "products_delete" ON public.products FOR DELETE USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND role = 'admin')
);

-- Site ayarları için politikalar
CREATE POLICY "site_settings_select" ON public.site_settings FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid())
);
CREATE POLICY "site_settings_insert" ON public.site_settings FOR INSERT WITH CHECK (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND role = 'admin')
);
CREATE POLICY "site_settings_update" ON public.site_settings FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.admin_users WHERE id = auth.uid() AND role = 'admin')
);

-- Varsayılan menüleri ekle
INSERT INTO public.menus (name, location) VALUES 
  ('Ana Menü', 'header'),
  ('Alt Menü', 'footer'),
  ('Mobil Menü', 'mobile')
ON CONFLICT DO NOTHING;

-- Varsayılan site ayarlarını ekle
INSERT INTO public.site_settings (key, value) VALUES 
  ('site_title', '"ModulerStand"'),
  ('site_description', '"Modüler Fuar Standları ve LED Işıklı Kutular"'),
  ('contact_phone', '"0531 571 33 33"'),
  ('contact_email', '"info@modulerstand.com.tr"'),
  ('contact_address', '"Zübeyde Hanım Mah., Kazım Karabekir cad. No:91/80 Altındağ / Ankara"'),
  ('social_facebook', '""'),
  ('social_instagram', '""'),
  ('social_twitter', '""'),
  ('social_linkedin', '""')
ON CONFLICT (key) DO NOTHING;

-- Public select politikaları (yayınlanmış içerikler için)
CREATE POLICY "pages_public_select" ON public.pages FOR SELECT USING (is_published = true);
CREATE POLICY "products_public_select" ON public.products FOR SELECT USING (is_published = true);
CREATE POLICY "menus_public_select" ON public.menus FOR SELECT USING (true);
CREATE POLICY "menu_items_public_select" ON public.menu_items FOR SELECT USING (is_active = true);
CREATE POLICY "site_settings_public_select" ON public.site_settings FOR SELECT USING (true);
