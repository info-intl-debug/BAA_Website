-- BAA Website Database Schema - Fully Implemented

-- ============================================================================
-- TABLE DEFINITIONS (Created and verified in Supabase)
-- ============================================================================

-- 1. STATISTICS TABLE
CREATE TABLE public.statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  value TEXT NOT NULL,
  label TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 2. INFO CARDS TABLE
CREATE TABLE public.info_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  link_url TEXT,
  link_text TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 3. EVENTS TABLE
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  location TEXT,
  event_type TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 4. BENEFITS TABLE
CREATE TABLE public.benefits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 5. SECTORS TABLE (NEW)
CREATE TABLE public.sectors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 6. NOTICES TABLE
CREATE TABLE public.notices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  image TEXT,
  type VARCHAR(50) DEFAULT 'other',  -- 'knowledge', 'event', or 'other'
  form_url TEXT,  -- Registration form link for knowledge sessions
  created_at TIMESTAMP DEFAULT NOW()
);

-- 7. MEDIA COVERAGE TABLE
CREATE TABLE public.media_coverage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  image TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 8. JOBS TABLE
CREATE TABLE public.jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  description TEXT,
  location TEXT,
  job_type TEXT,
  experience TEXT,
  salary_range TEXT,
  posted_at DATE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 9. GOVERNING BODY TABLE
CREATE TABLE public.governing_body (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  designation TEXT NOT NULL,
  image_url TEXT,
  email TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 10. COMMITTEES TABLE
CREATE TABLE public.committees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  head TEXT,
  email TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 11. FOUNDING MEMBERS TABLE
CREATE TABLE public.founding_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  year_joined INTEGER,
  contribution TEXT,
  image_url TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- 12. ABOUT CONTENT TABLE
CREATE TABLE public.about_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT,
  content TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) - Public Read Access for All Tables
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.info_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_coverage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.governing_body ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.committees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.founding_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;

-- Create public read policies for all tables
CREATE POLICY "Allow public read on statistics" ON public.statistics FOR SELECT USING (true);
CREATE POLICY "Allow public read on info_cards" ON public.info_cards FOR SELECT USING (true);
CREATE POLICY "Allow public read on events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Allow public read on benefits" ON public.benefits FOR SELECT USING (true);
CREATE POLICY "Allow public read on sectors" ON public.sectors FOR SELECT USING (true);
CREATE POLICY "Allow public read on notices" ON public.notices FOR SELECT USING (true);
CREATE POLICY "Allow public read on media_coverage" ON public.media_coverage FOR SELECT USING (true);
CREATE POLICY "Allow public read on jobs" ON public.jobs FOR SELECT USING (true);
CREATE POLICY "Allow public read on governing_body" ON public.governing_body FOR SELECT USING (true);
CREATE POLICY "Allow public read on committees" ON public.committees FOR SELECT USING (true);
CREATE POLICY "Allow public read on founding_members" ON public.founding_members FOR SELECT USING (true);
CREATE POLICY "Allow public read on about_content" ON public.about_content FOR SELECT USING (true);

-- ============================================================================
-- INDEXES (For optimal query performance)
-- ============================================================================

CREATE INDEX idx_statistics_display_order ON public.statistics(display_order);
CREATE INDEX idx_info_cards_display_order ON public.info_cards(display_order);
CREATE INDEX idx_events_event_date ON public.events(event_date);
CREATE INDEX idx_events_is_active ON public.events(is_active);
CREATE INDEX idx_sectors_order_index ON public.sectors(order_index);
CREATE INDEX idx_notices_date ON public.notices(date);
CREATE INDEX idx_notices_type ON public.notices(type);
CREATE INDEX idx_media_coverage_date ON public.media_coverage(date);
CREATE INDEX idx_jobs_is_active ON public.jobs(is_active);
CREATE INDEX idx_jobs_posted_at ON public.jobs(posted_at);
CREATE INDEX idx_governing_body_display_order ON public.governing_body(display_order);
CREATE INDEX idx_committees_display_order ON public.committees(display_order);

-- ============================================================================
-- CURRENT DATA STATUS
-- ============================================================================

-- Statistics: 6 records (75+ years, 500+ members, 50+ countries, 1000+ events)
-- Info Cards: 3 records (About Us, Notices, Jobs)
-- Events: 3 records (AGM, Export Summit, Networking)
-- Benefits: 6 records (Industry Advocacy, Networking, Training, etc.)
-- Sectors: 8 records ⭐ NEW (Textiles, Agriculture, Engineering, etc.)
-- Notices: 9 records ⭐ UPDATED (3 knowledge sessions, 3 events, 3 other notices with type & form_url)
-- Media Coverage: 3 records (Press articles)
-- Jobs: 6 records (Career opportunities)
-- Governing Body: 16 records (Leadership team)
-- Committees: 7 records (Working committees)
-- Founding Members: 9 records (Historical members)
-- About Content: 1 record (Organization history)

-- ============================================================================
-- TO ADD NEW CONTENT
-- ============================================================================

-- Example: Add a new sector
-- INSERT INTO public.sectors (name, description, icon_name, order_index)
-- VALUES ('New Sector', 'Description here', 'icon_name', 10);

-- Example: Add a knowledge session notice with registration form
-- INSERT INTO public.notices (title, description, date, image, type, form_url)
-- VALUES ('Session Title', 'Description', NOW()::date, 'https://images...', 'knowledge', 'https://forms.gle/...');

-- Example: Add an event notice
-- INSERT INTO public.notices (title, description, date, image, type, form_url)
-- VALUES ('Event Title', 'Description', NOW()::date, 'https://images...', 'event', NULL);

-- Example: Add other notices
-- INSERT INTO public.notices (title, description, date, image, type)
-- VALUES ('Notice Title', 'Description', NOW()::date, 'https://images...', 'other');

-- All new records automatically appear on the website!
