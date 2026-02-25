# 🙏 PrayEasy v2.0

**Your Digital Prayer Journey with Pastor Hope**

PrayEasy is a compassionate prayer companion application featuring Pastor Hope, an AI spiritual guide that provides Scripture-based responses to your prayers.

## ✨ Features

- **Pray with Pastor Hope**: Share your heart and receive personalized, pastoral responses
- **Scripture-Based Wisdom**: Every response is grounded in Biblical truth
- **Insights Explorer**: Search for verses and sermons by theme/emotion
- **Dark Mode**: Beautiful light and dark themes with system preference detection
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Privacy Focused**: Your prayers are handled with complete pastoral care and anonymity

## 🎨 Design

PrayEasy v2.0 features a new blue gradient color palette:
- **Azure** (#007FFF) - Primary brand color
- **Sky** (#87CEEB) - Light accents
- **Ocean Breeze** (#4A90E2) - Interactive elements
- **Aqua** (#00CED1) - Highlights
- **Cobalt** (#0047AB) - Deep accents

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd prayeasy
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file from the example:
```bash
cp env.example .env.local
```

4. Add your OpenAI API key to `.env.local`:
```
OPENAI_API_KEY=your-openai-api-key-here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | OpenAI API key for Pastor Hope AI | Yes |
| `DATABASE_URL` | PostgreSQL connection string (Supabase) | For database features |

## 📦 Deployment (Render)

1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Set environment variables in Render dashboard:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `DATABASE_URL`: Your Supabase database URL (optional)
4. Deploy!

Or use the `render.yaml` configuration file for automatic setup.

## 🛠 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: OpenAI GPT-4o-mini
- **Database**: PostgreSQL (Supabase) with Prisma
- **Icons**: Lucide React

## 📁 Project Structure

```
prayeasy/
├── app/
│   ├── api/
│   │   ├── insights/    # Scripture search API
│   │   └── pray/        # Pastor Hope API
│   ├── components/      # Reusable UI components
│   ├── prayers/         # Prayer journal pages
│   ├── globals.css      # Global styles
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── lib/
│   ├── adaptiveEngine.ts # Emotion-based responses
│   └── db.ts            # Database connection
├── prisma/
│   └── schema.prisma    # Database schema
├── sermonInsights.ts    # Sermon matching logic
└── tailwind.config.js   # Tailwind configuration
```

## 🔒 Protected Systems (DO NOT MODIFY)

The following files contain proprietary Pastor Hope AI logic and should NOT be modified:
- `sermonInsights.ts`
- `lib/adaptiveEngine.ts`
- `app/api/pray/route.ts` (OpenAI prompts section)

## 📝 License

Private - All rights reserved.

---

*"Sword of the Spirit is the Word of God."*
