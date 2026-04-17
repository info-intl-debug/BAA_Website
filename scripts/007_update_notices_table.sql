-- ============================================================================
-- MIGRATION: Add type and form_url columns to notices table
-- ============================================================================

-- Add type column to notices table (knowledge, event, other)
ALTER TABLE public.notices
ADD COLUMN IF NOT EXISTS type VARCHAR(50) DEFAULT 'other';

-- Add form_url column for registration forms
ALTER TABLE public.notices
ADD COLUMN IF NOT EXISTS form_url TEXT;

-- Create index for type filtering
CREATE INDEX IF NOT EXISTS idx_notices_type ON public.notices(type);

-- Update existing records to have appropriate type (if any)
-- Knowledge sessions
UPDATE public.notices 
SET type = 'knowledge'
WHERE title ILIKE '%orientation%' 
   OR title ILIKE '%workshop%' 
   OR title ILIKE '%session%' 
   OR title ILIKE '%training%'
AND type = 'other';

-- Events
UPDATE public.notices 
SET type = 'event'
WHERE title ILIKE '%meeting%' 
   OR title ILIKE '%expo%' 
   OR title ILIKE '%conference%'
   OR title ILIKE '%summit%'
AND type = 'other';

-- Add sample knowledge sessions
INSERT INTO public.notices (title, description, date, type, image, form_url) VALUES
  ('Orientation for New Members', 
   'Orientation session for all new members. Attendance mandatory.', 
   '2025-01-10', 
   'knowledge',
   'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
   'https://forms.gle/example-orientation'),
   
  ('Digital Records & Compliance Session', 
   'Learn the latest compliance workflows for digital export documentation.', 
   '2025-01-20', 
   'knowledge',
   'https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg',
   'https://forms.gle/example-compliance-session'),
   
  ('Import/Export Documentation Workshop', 
   'Interactive workshop on best practices for import/export compliance.', 
   '2025-01-25', 
   'knowledge',
   'https://images.pexels.com/photos/3184370/pexels-photo-3184370.jpeg',
   'https://forms.gle/example-documentation-workshop');

-- Add sample events
INSERT INTO public.notices (title, description, date, type, image, form_url) VALUES
  ('Annual General Meeting 2025', 
   'All members are notified of the AGM for the year 2025 at New Delhi Trade Center.', 
   '2025-02-05', 
   'event',
   'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg',
   NULL),
   
  ('Regional Buyer-Seller Meet', 
   'Connecting buyers and sellers for new partnership opportunities.', 
   '2025-02-12', 
   'event',
   'https://images.pexels.com/photos/3184326/pexels-photo-3184326.jpeg',
   NULL),
   
  ('Trade Expo 2025', 
   'Join the BAA delegation at the upcoming national trade expo.', 
   '2025-02-18', 
   'event',
   'https://images.pexels.com/photos/1181346/pexels-photo-1181346.jpeg',
   NULL);

-- Add sample other notices
INSERT INTO public.notices (title, description, date, type, image, form_url) VALUES
  ('Updated Membership Fee Structure', 
   'The governing body has approved the revised membership fee structure effective from April 2025.', 
   '2025-02-22', 
   'other',
   'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
   NULL),
   
  ('New Trade Policy Guidelines', 
   'Ministry of Commerce released new guidelines for export procedures. All members must review.', 
   '2025-03-01', 
   'other',
   'https://images.pexels.com/photos/1181346/pexels-photo-1181346.jpeg',
   NULL),
   
  ('Call for Nominations — Committee Members', 
   'Nominations are invited for positions in various BAA committees for the term 2025–2027.', 
   '2025-03-10', 
   'other',
   'https://images.pexels.com/photos/3182746/pexels-photo-3182746.jpeg',
   NULL);
