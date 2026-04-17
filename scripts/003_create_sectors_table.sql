-- Create sectors table for dynamic sector cards
CREATE TABLE IF NOT EXISTS public.sectors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon_name TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS for public read access
ALTER TABLE public.sectors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access on sectors" 
  ON public.sectors 
  FOR SELECT 
  USING (true);
