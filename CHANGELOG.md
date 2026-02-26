# PrayEasy Changelog

## [v3.0] - February 26, 2026

### 🗺️ Community Prayer Map & Prayer Journal Release

This version adds global community features and personal prayer history tracking.

### ✨ Phase 1: Community Prayer Map
- **Interactive World Map**: Leaflet.js-powered global prayer map replacing Insights Explorer
- **100 Simulated Prayers**: Realistic faith-based prayers across 50+ global cities
- **Filter System**: 
  - Type tabs (All, Prayer Requests, Praise Reports)
  - Time range filters (24h, 7d, 30d)
  - 10 theme filters (Healing, Peace, Hope, Faith, Provision, Strength, Guidance, Gratitude, Family, Health)
- **Marker System**: Blue gradient pins for prayers, green for praise reports
- **Pin Interactions**: Click to see anonymized prayer snippets with "Pray for this person" option
- **Floating Action Button**: Quick access to submit new prayers

### 📔 Phase 2: Prayer Journal
- **Personal Prayer History**: View all submitted prayers chronologically
- **Emotion Badges**: Visual indicators showing detected emotions for each prayer
- **Collapsible Responses**: Expandable Pastor Hope responses
- **Advanced Filtering**:
  - Date range (7d, 30d, 90d, all time)
  - Emotion/theme filter
  - Search functionality
- **Navigation Integration**: Added to Header and Footer

### 🐛 Bug Fixes
- Fixed TileLayer URL for proper map marker rendering (changed from broken Wikipedia URL to OpenStreetMap tiles)

### 📍 Deployment
- **Live URL**: https://prayeasy.onrender.com
- **GitHub**: https://github.com/PrayEasy/prayeasy

---

To revert to v3.0: `git checkout v3.0`

---

## [v2.0] - February 25, 2026

### 🎉 Investor-Ready MVP Release

This version locks the complete P1 + P2 feature set, ready for investor demonstrations.

### ✨ P1 Features - UI/UX Redesign
- **Blue Gradient Design**: Professional color palette (Azure, Sky, Ocean Breeze, Aqua, Cobalt)
- **Responsive Layout**: Optimized for mobile, tablet, and desktop
- **Dark Mode**: System preference detection with manual toggle
- **Modern Components**: Redesigned Header and Footer
- **Landing Page**: Fresh, inviting prayer interface

### 📖 P2 Features - Devotionals & Bible Deep Dive
- **Daily Devotionals**: 7 curated daily devotionals with themes, scriptures, reflections, and prayers
- **Bible Deep Dive**: Scripture search by theme or verse reference
- **Clickable Scriptures**: Pastor Hope responses include clickable Bible references
- **Navigation**: Full integration in Header and Footer

### 🤖 Core Features
- **Pastor Hope AI**: Emotion-detecting pastoral responses
- **7 Emotion Categories**: Sadness, Anxiety, Gratitude, Hope, Confusion, Anger, Overwhelm
- **Structured Responses**: Greeting, acknowledgment, scripture, reflection, prayer, blessing
- **Database Integration**: Supabase PostgreSQL for prayer storage
- **Scripture Insights**: Theme-based scripture explorer

### 🛠️ Technical Stack
- Next.js 14 (App Router)
- TypeScript + Tailwind CSS
- Supabase PostgreSQL
- OpenAI GPT-4o-mini
- Deployed on Render

### 🐛 Bug Fixes
- Numeric Bible reference format (e.g., "Philippians 4:6-7" instead of "four, verse six")
- Database saving functionality restored

### 📍 Deployment
- **Live URL**: https://prayeasy.onrender.com
- **GitHub**: https://github.com/PrayEasy/prayeasy

---

## [v1.0] - Initial Release
- Basic prayer submission
- Pastor Hope AI integration
- Simple UI

---

To revert to v2.0: `git checkout v2.0`
