#!/usr/bin/env bash
# BAA Website - Quick Reference Card

cat << 'EOF'

╔═══════════════════════════════════════════════════════════════════════════╗
║                  BAA WEBSITE - FULLY DYNAMIC & LIVE                       ║
║           All Content Connected to Supabase Database                      ║
╚═══════════════════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────────────────┐
│  🎯 HOMEPAGE SECTIONS                                                   │
├─────────────────────────────────────────────────────────────────────────┤
│  Statistics        → Supabase: statistics table (6 records)             │
│  Info Cards        → Supabase: info_cards table (3 cards)               │
│  Events            → Supabase: events table (3 upcoming)                │
│  Member Benefits   → Supabase: benefits table (first 6)                 │
│  Export Sectors    → Supabase: sectors table (NEW - carousel)           │
│  Call-to-Action    → Static text                                        │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  📄 PAGES & DATABASE CONNECTIONS                                        │
├─────────────────────────────────────────────────────────────────────────┤
│  /              → Home (Stats + Events + Benefits + Sectors)            │
│  /about         → About content + sidebar nav                           │
│  /about/gb      → Governing Body members (16 from DB)                   │
│  /about/committees → Committees (7 from DB)                             │
│  /about/founders   → Founding Members (9 from DB)                       │
│  /news/notices     → Notice Board (6+ from DB, image cards)             │
│  /news/media       → Media Coverage (3+ from DB)                        │
│  /jobs             → Job Listings (6+ from DB, active only)             │
│  /membership       → 2-tier membership info (no prices)                 │
│  /contact          → Contact form                                       │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  🚀 TO ADD NEW CONTENT (3 SIMPLE STEPS)                                 │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  1️⃣  Open Supabase Dashboard → Select Table → Click Insert Row         │
│                                                                          │
│  2️⃣  Fill in fields:                                                   │
│      • Images: https://images.pexels.com/photos/XXXXX/pexels-...jpeg    │
│      • Icons: (see icon list per section)                              │
│      • Dates: YYYY-MM-DD format                                        │
│      • Active: Set is_active = true                                    │
│                                                                          │
│  3️⃣  Click Save → Website auto-updates with new content ✨             │
│                                                                          │
│  ⚡ ZERO CODE CHANGES NEEDED - AUTOMATIC!                              │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  📋 DATABASE TABLES                                                      │
├──────────────────────────────┬──────────────┬──────────────────────────┤
│ Table Name                   │ Records      │ Auto-renders?            │
├──────────────────────────────┼──────────────┼──────────────────────────┤
│ statistics                   │ 6            │ ✅ Yes (Homepage)        │
│ info_cards                   │ 3            │ ✅ Yes (Homepage)        │
│ events                       │ 3            │ ✅ Yes (Homepage)        │
│ benefits                     │ 6            │ ✅ Yes (Homepage)        │
│ sectors                      │ 8            │ ✅ Yes (NEW - Carousel)  │
│ notices                      │ 6            │ ✅ Yes (Card grid)       │
│ media_coverage               │ 3            │ ✅ Yes (Card grid)       │
│ jobs                         │ 6            │ ✅ Yes (List view)       │
│ governing_body               │ 16           │ ✅ Yes (Photo grid)      │
│ committees                   │ 7            │ ✅ Yes (Photo grid)      │
│ founding_members             │ 9            │ ✅ Yes (Photo grid)      │
│ about_content                │ 1            │ ✅ Yes (Text content)    │
└──────────────────────────────┴──────────────┴──────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  🎨 DESIGN COLORS                                                        │
├─────────────────────────────────────────────────────────────────────────┤
│  Primary Text      → #1a1a1a (dark black)                              │
│  Accent/Buttons    → #E8520A (orange)                                  │
│  Muted Text        → #444444 (gray)                                    │
│  Footer Background → #1a1a1a (dark, ready for images)                 │
│  Borders           → #e5e5e5 (light gray)                              │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  🔧 TECHNICAL DETAILS                                                    │
├─────────────────────────────────────────────────────────────────────────┤
│  Framework        → Next.js 15 with App Router                         │
│  Database         → Supabase PostgreSQL                                │
│  Auth             → Supabase native auth (integrated)                  │
│  UI Components    → shadcn/ui with Tailwind CSS                        │
│  RLS Policies     → Public read access for all tables                  │
│  Caching          → Server-side rendering (automatic)                 │
│  Deployment       → Ready for Vercel                                   │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  💡 EXAMPLES                                                             │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  Add New Sector:                                                        │
│    INSERT INTO sectors (name, description, icon_name, order_index)    │
│    VALUES ('Spices & Tea', 'Premium export grade...', 'spoon', 9)     │
│                                                                          │
│  Add New Job:                                                           │
│    INSERT INTO jobs (title, company, location, is_active...)          │
│    VALUES ('Export Manager', 'Company XYZ', 'Mumbai', true)           │
│                                                                          │
│  Add New Notice:                                                        │
│    INSERT INTO notices (title, description, date, image)              │
│    VALUES ('New Update', 'Details...', '2026-03-16', 'URL')           │
│                                                                          │
│  See: scripts/006_example_queries.sql for more                        │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────┐
│  📞 SUPPORT                                                              │
├─────────────────────────────────────────────────────────────────────────┤
│  Supabase Dashboard → https://supabase.com                             │
│  Database Schema    → /scripts/001_create_tables.sql                   │
│  Content Guide      → /DYNAMIC_CONTENT_GUIDE.md                        │
│  Implementation     → /IMPLEMENTATION_COMPLETE.md                      │
│  Example Queries    → /scripts/006_example_queries.sql                 │
└─────────────────────────────────────────────────────────────────────────┘

EOF
