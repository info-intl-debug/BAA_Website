# Dynamic Content Management Guide

## Overview
All sections of the BAA website are fully connected to the Supabase database. When you add new records to the database tables, they automatically appear on the website without any code changes.

## Database Tables & Pages

### 1. **Statistics** (Home Page)
- **Table**: `public.statistics`
- **Columns**: `id`, `value`, `label`, `display_order`, `created_at`
- **Location**: StatsSection on homepage
- **Auto-renders**: Yes - displays statistics in a 4-column grid
- **How to add**: Insert new row with value and label

### 2. **Info Cards** (Home Page)
- **Table**: `public.info_cards`
- **Columns**: `id`, `title`, `description`, `icon`, `link_url`, `link_text`, `display_order`
- **Location**: "What We Offer" section on homepage
- **Auto-renders**: Yes - displays 3 cards with icons and links
- **How to add**: Insert new row; card automatically appears

### 3. **Events** (Home Page)
- **Table**: `public.events`
- **Columns**: `id`, `title`, `description`, `event_date`, `location`, `event_type`, `is_active`, `created_at`
- **Location**: "Upcoming Events" section on homepage
- **Auto-renders**: Yes - displays first 3 active events
- **How to add**: Set `is_active = true`, events appear ordered by date

### 4. **Benefits** (Home Page - Dynamic Benefits Section)
- **Table**: `public.benefits`
- **Columns**: `id`, `title`, `description`, `icon_name`, `created_at`
- **Location**: "Member Benefits" section on homepage
- **Auto-renders**: Yes - displays first 6 benefits in 3-column grid
- **How to add**: Insert new row; card automatically renders with icon

### 5. **Sectors** (Home Page - NEW)
- **Table**: `public.sectors`
- **Columns**: `id`, `name`, `description`, `icon_name`, `order_index`, `created_at`
- **Location**: "Export Sectors" carousel on homepage
- **Auto-renders**: Yes - scrollable carousel with left/right nav
- **How to add**: Insert new row; automatically added to carousel
- **Available icons**: shirt, leaf, wrench, cpu, palette, pill, spoon, shoe

### 6. **Notices** (News → Notice Board)
- **Table**: `public.notices`
- **Columns**: `id`, `title`, `description`, `date`, `image`, `created_at`
- **Location**: /news/notices page
- **Auto-renders**: Yes - displays as image cards in 3-column grid
- **How to add**: Insert new row with date; newest first

### 7. **Media Coverage** (News → Media Coverage)
- **Table**: `public.media_coverage`
- **Columns**: `id`, `title`, `description`, `date`, `image`, `created_at`
- **Location**: /news/media-coverage page
- **Auto-renders**: Yes - displays as cards with images
- **How to add**: Insert new row; auto-renders

### 8. **Jobs** (Jobs Page)
- **Table**: `public.jobs`
- **Columns**: `id`, `title`, `company`, `description`, `location`, `job_type`, `experience`, `salary_range`, `posted_at`, `is_active`, `created_at`
- **Location**: /jobs page
- **Auto-renders**: Yes - displays active jobs in list format
- **How to add**: Set `is_active = true`; appears in list

### 9. **Governing Body** (About → Governing Body)
- **Table**: `public.governing_body`
- **Columns**: `id`, `name`, `designation`, `image_url`, `email`, `display_order`, `created_at`
- **Location**: /about/governing-body page
- **Auto-renders**: Yes - displays as circular photo cards in grid
- **How to add**: Insert new row; card automatically appears

### 10. **Committees** (About → BAA Committees)
- **Table**: `public.committees`
- **Columns**: `id`, `name`, `head`, `email`, `image_url`, `display_order`, `created_at`
- **Location**: /about/committees page
- **Auto-renders**: Yes - displays with circular photos and details
- **How to add**: Insert new row; committee card renders

### 11. **Founding Members** (About → Founding Members)
- **Table**: `public.founding_members`
- **Columns**: `id`, `name`, `year_joined`, `contribution`, `image_url`, `created_at`
- **Location**: /about/founding-members page
- **Auto-renders**: Yes - displays in grid with photos
- **How to add**: Insert new row; auto-renders

## How to Add New Content

### Step 1: Access Supabase Dashboard
1. Go to your Supabase project dashboard
2. Select the appropriate table (see list above)
3. Click "Insert Row" or use the + button

### Step 2: Fill in the Fields
- For images: Use Pexels URLs in format: `https://images.pexels.com/photos/XXXXX/pexels-photo-XXXXX.jpeg`
- For icons: Use available icon names (listed per table above)
- For dates: Use YYYY-MM-DD format
- For active status: Set `is_active = true` to display

### Step 3: Submit
- Click "Save" or "Insert"
- The website will automatically fetch and display the new content
- No code deployment needed!

## Real-Time Updates

All sections use server-side rendering with automatic caching. Updates appear:
- **Instantly** on refresh when accessing the page
- **Within cache period** (default: hourly) for already loaded pages
- **No manual refresh** needed - just add data to database

## Icon Mappings

### Benefits Icons
- briefcase, users, document, globe, network, lightning

### Sectors Icons
- shirt, leaf, wrench, cpu, palette, pill, spoon, shoe

### Info Cards Icons
- users, filetext, briefcase

## Fallback Content

Each section has default content that displays if:
- Table is empty
- Database connection fails
- No records match the filter criteria

This ensures the website always displays something while you build your content library.

## Need Help?

- Check Supabase console for any error messages
- Verify table structure matches schema in `/scripts` folder
- Ensure image URLs are valid and accessible
- Check that enum values match allowed options (like `icon_name`, `is_active`)
