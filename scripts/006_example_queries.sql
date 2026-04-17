-- Quick SQL Examples to Add Test Data

-- 1. ADD MORE SECTORS
INSERT INTO public.sectors (name, description, icon_name, order_index) VALUES
('Metals & Minerals', 'High-quality metals, ores, and mineral products', 'wrench', 9),
('Gems & Jewelry', 'Precious gems, jewelry, and precious metal items', 'palette', 10)
ON CONFLICT DO NOTHING;

-- 2. ADD MORE BENEFITS
INSERT INTO public.benefits (title, description, icon_name) VALUES
('Dispute Resolution', 'Professional mediation and arbitration services', 'briefcase'),
('Trade Finance Support', 'Guidance on export financing and credit facilities', 'briefcase')
ON CONFLICT DO NOTHING;

-- 3. ADD A NEW NOTICE
INSERT INTO public.notices (title, description, date, image) VALUES
('Export Documentation Workshop', 'Learn digital export documentation procedures', NOW()::date, 'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg');

-- 4. ADD A NEW JOB
INSERT INTO public.jobs (title, company, description, location, job_type, experience, salary_range, posted_at, is_active) VALUES
('Marketing Manager', 'BAA Inc.', 'Lead marketing initiatives for BAA', 'Mumbai', 'Full-time', '5+ years', '12-16 LPA', NOW(), true);

-- 5. ADD A NEW EVENT
INSERT INTO public.events (title, description, event_date, location, event_type, is_active) VALUES
('Trade Networking Lunch', 'Informal networking session with export professionals', '2026-04-15', 'Mumbai', 'Networking', true);

-- 6. ADD A NEW COMMITTEE MEMBER
INSERT INTO public.committees (name, head, email, image_url, display_order) VALUES
('Communications Committee', 'Priya Singh', 'communications@baa.org.in', 'https://images.pexels.com/photos/3807517/pexels-photo-3807517.jpeg', 8);

-- 7. ADD A NEW GOVERNING BODY MEMBER
INSERT INTO public.governing_body (name, designation, image_url, email, display_order) VALUES
('Dr. Sharma Kumar', 'Advisor', 'https://images.pexels.com/photos/2220297/pexels-photo-2220297.jpeg', 'advisor@baa.org.in', 17);

-- 8. ADD A NEW FOUNDING MEMBER
INSERT INTO public.founding_members (name, year_joined, contribution, image_url) VALUES
('Mr. Vikram Singh Tomar', 1946, 'Founder Member - Infrastructure Development', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg');

-- 9. ADD MEDIA COVERAGE
INSERT INTO public.media_coverage (title, description, date, image) VALUES
('BAA Recognition in Export Excellence Report', 'The Buying Agents Association recognized for outstanding contributions to export industry', '2026-03-01', 'https://images.pexels.com/photos/3921517/pexels-photo-3921517.jpeg');

-- 10. UPDATE EXISTING SECTORS (Change order)
UPDATE public.sectors SET order_index = 0 WHERE name = 'Textiles & Garments';
UPDATE public.sectors SET order_index = 1 WHERE name = 'Agricultural Products';

-- 11. DEACTIVATE A JOB (Hide from listings)
UPDATE public.jobs SET is_active = false WHERE id = '1';

-- 12. CHECK ALL SECTORS (View current data)
SELECT id, name, icon_name, order_index FROM public.sectors ORDER BY order_index;

-- 13. COUNT RECORDS IN EACH TABLE
SELECT 
  'statistics' as table_name, COUNT(*) as record_count FROM public.statistics
UNION ALL SELECT 'benefits', COUNT(*) FROM public.benefits
UNION ALL SELECT 'sectors', COUNT(*) FROM public.sectors
UNION ALL SELECT 'events', COUNT(*) FROM public.events
UNION ALL SELECT 'notices', COUNT(*) FROM public.notices
UNION ALL SELECT 'jobs', COUNT(*) FROM public.jobs
UNION ALL SELECT 'committees', COUNT(*) FROM public.committees
UNION ALL SELECT 'governing_body', COUNT(*) FROM public.governing_body;
