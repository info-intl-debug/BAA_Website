-- Seed Site Settings
INSERT INTO site_settings (key, value) VALUES
('site_name', 'Buying Agents Association'),
('site_tagline', 'Empowering the Export Industry Since 1946'),
('contact_email', 'info@buyingagents.org'),
('contact_phone', '+91 11 2341 5678'),
('address', '123 Export House, Connaught Place, New Delhi - 110001'),
('hero_title', 'Buying Agents Association'),
('hero_subtitle', 'Championing Excellence in Export Industry Since 1946'),
('hero_description', 'The premier organization representing buying agents and export professionals across India, fostering trade relationships and industry growth.'),
('hero_image', 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'),
('facebook_url', 'https://facebook.com/buyingagents'),
('twitter_url', 'https://twitter.com/buyingagents'),
('linkedin_url', 'https://linkedin.com/company/buyingagents'),
('instagram_url', 'https://instagram.com/buyingagents')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;

-- Seed Statistics
INSERT INTO statistics (key, label, value) VALUES
('years', 'Years of Legacy', 79),
('members', 'Active Members', 500),
('partners', 'Export Partners', 1000),
('countries', 'Countries Served', 50)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, label = EXCLUDED.label;

-- Seed Info Cards
INSERT INTO info_cards (title, description, icon, sort_order) VALUES
('About Us', 'Learn about our rich history, mission, and the values that drive our association forward.', 'info', 1),
('Membership', 'Join our prestigious community of buying agents and enjoy exclusive benefits and networking opportunities.', 'users', 2),
('News & Updates', 'Stay informed with the latest industry news, policy changes, and association announcements.', 'newspaper', 3),
('Career Opportunities', 'Explore exciting job openings in the export industry from our member companies.', 'briefcase', 4)
ON CONFLICT DO NOTHING;

-- Seed Events
INSERT INTO events (event_title, event_description, event_date, event_location, event_image, is_featured) VALUES
('Annual General Meeting 2025', 'Join us for our flagship annual event bringing together industry leaders and members.', '2025-04-15', 'New Delhi', 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg', true),
('Export Summit 2025', 'A comprehensive summit on the future of Indian exports and global trade partnerships.', '2025-05-20', 'Mumbai', 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg', true),
('Networking Dinner', 'An exclusive networking event for members to connect and collaborate.', '2025-03-28', 'Bangalore', 'https://images.pexels.com/photos/1268558/pexels-photo-1268558.jpeg', false)
ON CONFLICT DO NOTHING;

-- Seed Benefits
INSERT INTO benefits (title, description, icon, sort_order) VALUES
('Industry Advocacy', 'We represent your interests at government and policy levels, ensuring your voice is heard.', 'megaphone', 1),
('Networking Events', 'Connect with industry peers, potential partners, and buyers at our exclusive events.', 'users', 2),
('Training & Development', 'Access workshops, seminars, and certification programs to enhance your skills.', 'graduation-cap', 3),
('Market Intelligence', 'Receive timely reports on market trends, regulations, and export opportunities.', 'chart-line', 4),
('Legal Support', 'Get guidance on trade laws, compliance, and dispute resolution matters.', 'scale', 5),
('Business Matching', 'We connect you with international buyers looking for quality Indian products.', 'handshake', 6)
ON CONFLICT DO NOTHING;

-- Seed About Content
INSERT INTO about_content (section, title, content) VALUES
('history', 'Our Rich History', 'The Buying Agents Association (BAA) was established in 1946, just before India''s independence. Founded by visionary export professionals who recognized the need for a unified voice representing buying agents in the burgeoning export industry. Over nearly eight decades, we have grown from a small group of dedicated traders to become the premier association representing buying agents across India.'),
('mission', 'Our Mission', 'To empower buying agents and export professionals through advocacy, education, and networking, fostering sustainable growth in India''s export industry while maintaining the highest standards of ethics and professionalism.'),
('vision', 'Our Vision', 'To be the most trusted and influential association for buying agents, recognized globally for excellence in trade facilitation and industry leadership.'),
('values', 'Our Core Values', 'Integrity in all dealings, Excellence in service, Collaboration for growth, Innovation in practices, and Commitment to member success form the foundation of everything we do at BAA.')
ON CONFLICT (section) DO UPDATE SET title = EXCLUDED.title, content = EXCLUDED.content;

-- Seed Governing Body
INSERT INTO governing_body (name, designation, photo, role, sort_order) VALUES
('Rajesh Kumar Sharma', 'President', 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg', 'A veteran in the export industry with over 35 years of experience. Leading BAA since 2020.', 1),
('Priya Mehta', 'Vice President', 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg', 'Expert in textile exports with extensive international trade experience spanning 25 years.', 2),
('Amit Agarwal', 'Secretary General', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg', 'Former trade commissioner with deep understanding of export policies and regulations.', 3),
('Sunita Reddy', 'Treasurer', 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg', 'Chartered accountant and financial expert managing association finances since 2018.', 4),
('Vikram Singh', 'Joint Secretary', 'https://images.pexels.com/photos/2128807/pexels-photo-2128807.jpeg', 'Young leader bringing fresh perspectives to traditional trade practices.', 5)
ON CONFLICT DO NOTHING;

-- Seed Committees
INSERT INTO committees (committee_name, head_name, head_photo, email, sort_order) VALUES
('Policy & Advocacy Committee', 'Dr. Anand Verma', 'https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg', 'policy@buyingagents.org', 1),
('Membership & Outreach Committee', 'Neha Kapoor', 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg', 'membership@buyingagents.org', 2),
('Training & Development Committee', 'Prof. Ramesh Iyer', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg', 'training@buyingagents.org', 3),
('Events & Communications Committee', 'Meera Krishnan', 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg', 'events@buyingagents.org', 4),
('Legal & Compliance Committee', 'Adv. Sunil Kumar', 'https://images.pexels.com/photos/2128807/pexels-photo-2128807.jpeg', 'legal@buyingagents.org', 5)
ON CONFLICT DO NOTHING;

-- Seed Founding Members
INSERT INTO founding_members (name, designation, organization, photo, sort_order) VALUES
('Shri Lala Ram Swarup', 'Founding President', 'Swarup Trading Co.', 'https://images.pexels.com/photos/3184611/pexels-photo-3184611.jpeg', 1),
('Shri Govind Das Gupta', 'Founding Vice President', 'GD Exports Pvt Ltd', 'https://images.pexels.com/photos/3184612/pexels-photo-3184612.jpeg', 2),
('Shri Mohammad Yusuf', 'Founding Secretary', 'Yusuf & Sons International', 'https://images.pexels.com/photos/3184613/pexels-photo-3184613.jpeg', 3),
('Shri Tara Chand Jain', 'Founding Treasurer', 'TC Jain Enterprises', 'https://images.pexels.com/photos/3184614/pexels-photo-3184614.jpeg', 4)
ON CONFLICT DO NOTHING;

-- Seed Notices
INSERT INTO notices (title, description, date, image) VALUES
('New Export Policy Guidelines Released', 'The Ministry of Commerce has released new guidelines for export documentation. All members are advised to review and comply with the updated requirements by March 31, 2025.', '2025-01-20', 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg'),
('Membership Renewal Reminder', 'Annual membership renewal is now open. Early bird discount of 10% available until February 28, 2025.', '2025-01-18', 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'),
('Training Workshop on GST Compliance', 'Join our comprehensive workshop on GST compliance for exporters scheduled for February 15, 2025.', '2025-01-15', 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg'),
('Trade Fair Participation Opportunity', 'BAA is organizing a group participation in the International Trade Fair 2025 in Frankfurt. Limited slots available.', '2025-01-13', 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg')
ON CONFLICT DO NOTHING;

-- Seed Media Coverage
INSERT INTO media_coverage (title, summary, external_link, media_image) VALUES
('BAA Advocates for Export Friendly Policies', 'The Buying Agents Association has submitted recommendations to the government for simplifying export procedures and reducing compliance burden.', 'https://economictimes.com', 'https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg'),
('Indian Exports Show Strong Growth', 'Industry body BAA reports 15% growth in exports from member companies in the last quarter.', 'https://business-standard.com', 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg'),
('BAA Annual Conference Draws Global Attention', 'The recently concluded BAA annual conference saw participation from over 50 countries.', 'https://indiatoday.com', 'https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg')
ON CONFLICT DO NOTHING;

-- Seed Jobs
INSERT INTO jobs (job_title, location, description, experience, salary, openings, is_active) VALUES
('Senior Export Manager', 'Mumbai', 'Looking for an experienced export manager to handle international trade operations and client relationships.', '10+ years export experience', '15-25 LPA', 1, true),
('Documentation Executive', 'Delhi', 'Handle all export documentation, LC negotiations, and shipping coordination.', '3-5 years experience', '4-6 LPA', 2, true),
('Quality Control Inspector', 'Bangalore', 'Ensure product quality standards for export shipments and manage QC team.', '5+ years in textile QC', '8-12 LPA', 1, true),
('Freelance Buying Agent', 'Remote', 'Connect with international buyers looking for reliable buying agents in India.', 'Established network required', 'Commission Based', 5, true)
ON CONFLICT DO NOTHING;
