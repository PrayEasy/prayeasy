# PrayEasy Changelog

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
