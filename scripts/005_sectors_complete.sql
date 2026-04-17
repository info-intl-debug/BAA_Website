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

DROP POLICY IF EXISTS "Allow public read access on sectors" ON public.sectors;

CREATE POLICY "Allow public read access on sectors" 
  ON public.sectors 
  FOR SELECT 
  USING (true);

-- Seed sectors data
INSERT INTO public.sectors (name, description, icon_name, order_index) VALUES
('Textiles & Garments', 'Export of high-quality textiles, garments, and apparel products', 'shirt', 0),
('Agricultural Products', 'Fresh and processed agricultural commodities and specialty crops', 'leaf', 1),
('Engineering Goods', 'Precision engineering components, machinery, and industrial equipment', 'wrench', 2),
('Electronics & IT', 'Electronic components, IT hardware, and semiconductor products', 'cpu', 3),
('Handicrafts & Artisans', 'Traditional and contemporary handicraft products and artisanal goods', 'palette', 4),
('Pharmaceuticals', 'Pharmaceutical products, medicines, and healthcare exports', 'pill', 5),
('Spices & Food', 'Premium spices, tea, coffee, and value-added food products', 'spoon', 6),
('Leather & Footwear', 'High-quality leather goods and footwear products', 'shoe', 8)
ON CONFLICT DO NOTHING;
