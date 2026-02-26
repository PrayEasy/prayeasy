"use client";

import { useState, useEffect } from "react";
import { BookOpen, Sun, Sunrise, Heart, Star, Calendar, ChevronLeft, ChevronRight, Sparkles, Cross } from "lucide-react";

// 7 curated daily devotionals cycling by day of year
const DEVOTIONALS = [
  {
    id: 1,
    theme: "Strength",
    title: "Renewed by the Lord",
    emoji: "✨",
    color: "from-azure-500 to-ocean-400",
    accentColor: "azure",
    scripture: {
      reference: "Isaiah 40:31",
      text: "But those who hope in the Lord will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint."
    },
    reflection: "When our own strength runs dry, God's is limitless. The word 'hope' in this passage means a confident, patient expectation — not passive wishfulness. As you wait on the Lord today, trust that He is actively renewing your spirit. Like an eagle catching a thermal updraft, surrender your burdens and let His power carry you higher.",
    prayerPrompt: "Lord, I'm weary from my own striving. I choose to wait on You today. Renew my strength, lift my spirit, and help me walk in Your power and not my own.",
    practicePoint: "Take three deep, intentional breaths today and whisper: 'Lord, I wait on You.'"
  },
  {
    id: 2,
    theme: "Peace",
    title: "The Peace That Transcends",
    emoji: "🕊️",
    color: "from-aqua-500 to-azure-400",
    accentColor: "aqua",
    scripture: {
      reference: "Philippians 4:6-7",
      text: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus."
    },
    reflection: "God's peace doesn't make logical sense — and that is precisely the point. It is a supernatural calm that stands guard over your heart like a soldier at the gate. The path there is prayer and thanksgiving together. Before you name your worry, name your gratitude. This posture shifts the atmosphere of your heart.",
    prayerPrompt: "Father, before I bring my concerns, let me first say thank You. Thank You for breath, for grace, for this moment. Now, here is what troubles me... I trust You with it completely.",
    practicePoint: "Start your prayer today with five things you're genuinely thankful for before making any requests."
  },
  {
    id: 3,
    theme: "Hope",
    title: "A Future and a Hope",
    emoji: "🌅",
    color: "from-ocean-400 to-cobalt-500",
    accentColor: "ocean",
    scripture: {
      reference: "Jeremiah 29:11",
      text: "'For I know the plans I have for you,' declares the Lord, 'plans to prosper you and not to harm you, plans to give you hope and a future.'"
    },
    reflection: "These words were spoken to Israel while they were in exile — in the darkest chapter of their national story. God spoke hope into captivity. Whatever exile you may feel today — in grief, confusion, disappointment — hear the Lord whispering the same over you: I have not abandoned My plans for you. Your current chapter is not the final chapter.",
    prayerPrompt: "Lord, when circumstances look bleak, help me to see with eyes of faith. Remind me that Your plans for me are good, and that You are already writing the next chapter of my story.",
    practicePoint: "Write down one promise from God that you are choosing to stand on today."
  },
  {
    id: 4,
    theme: "Love",
    title: "The Greatest of These",
    emoji: "❤️",
    color: "from-azure-400 to-aqua-500",
    accentColor: "azure",
    scripture: {
      reference: "1 Corinthians 13:4-7",
      text: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud. It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs. Love does not delight in evil but rejoices with the truth. It always protects, always trusts, always hopes, always perseveres."
    },
    reflection: "This famous passage is not just a description of love — it is a description of Jesus Himself. Patient. Kind. Not easily angered. Keeping no record of wrongs. As we read each quality, we see a portrait of Christ. Today, let this passage be both an aspiration and a comfort: the One who loves you perfectly is also the One shaping you to love better.",
    prayerPrompt: "Jesus, thank You for loving me with a love that is patient and kind. Help me to show this same love to those around me today, especially when it is difficult.",
    practicePoint: "Identify one person to show deliberate kindness to today — especially someone who may not deserve it."
  },
  {
    id: 5,
    theme: "Faith",
    title: "The Substance of Things Unseen",
    emoji: "🌟",
    color: "from-cobalt-500 to-azure-500",
    accentColor: "cobalt",
    scripture: {
      reference: "Hebrews 11:1",
      text: "Now faith is confidence in what we hope for and assurance about what we do not see."
    },
    reflection: "Faith is described as 'substance' — it is not a vague feeling but a firm foundation. The Hall of Faith in Hebrews 11 reminds us that every hero of the faith acted before they saw results. Noah built an ark for rain that had never fallen. Abraham left for a land he didn't yet know. Your step of faith today may feel uncertain, but God honors obedience in the unseen.",
    prayerPrompt: "Lord, increase my faith. Where I cannot see the way, let me trust Your footsteps. I choose to take the next step You are calling me toward, even without knowing the full picture.",
    practicePoint: "What is the one 'next step' of faith you've been hesitating on? Take it today, however small."
  },
  {
    id: 6,
    theme: "Grace",
    title: "Not By Works, But By Grace",
    emoji: "🎁",
    color: "from-azure-500 to-cobalt-400",
    accentColor: "azure",
    scripture: {
      reference: "Ephesians 2:8-9",
      text: "For it is by grace you have been saved, through faith — and this is not from yourselves, it is the gift of God — not by works, so that no one can boast."
    },
    reflection: "Grace is the most counter-cultural concept in the universe. Every other system says: earn it, achieve it, deserve it. The Gospel says: receive it. You cannot work hard enough, pray enough, or be good enough — and that is precisely why Jesus came. Rest today in this overwhelming truth: you are fully accepted, not because of what you have done, but because of what He has done.",
    prayerPrompt: "Father, forgive me for the times I've tried to earn what You've freely given. Today I choose to rest in Your grace. I am loved not because I am enough, but because Jesus is enough.",
    practicePoint: "Take five minutes today to sit quietly and receive God's love without doing anything to 'earn' it."
  },
  {
    id: 7,
    theme: "Joy",
    title: "Fullness of Joy in His Presence",
    emoji: "☀️",
    color: "from-ocean-300 to-aqua-500",
    accentColor: "aqua",
    scripture: {
      reference: "Psalm 16:11",
      text: "You make known to me the path of life; you will fill me with joy in your presence, with eternal pleasures at your right hand."
    },
    reflection: "Joy is different from happiness. Happiness is circumstantial — it comes and goes with our situations. Biblical joy is rooted in the unchanging character of God. David wrote this psalm while fleeing danger, yet he was filled with joy in God's presence. Joy is not the absence of difficulty; it is the presence of God in the midst of difficulty. You can be joyful today, not because life is easy, but because God is here.",
    prayerPrompt: "Lord, let Your presence be more real to me today than my circumstances. Fill me with the joy that comes from knowing You — a joy that the world cannot give and cannot take away.",
    practicePoint: "Spend 5 minutes in worship today — a song, a psalm, or simply telling God who He is to you."
  }
];

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function DevotionalsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dateDisplay, setDateDisplay] = useState("");
  const [dayOfWeek, setDayOfWeek] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const now = new Date();
    const dayIdx = now.getDay(); // 0-6
    setCurrentIndex(dayIdx); // Use day of week to pick devotional
    setDayOfWeek(DAY_NAMES[dayIdx] ?? "");
    setDateDisplay(`${MONTH_NAMES[now.getMonth()] ?? ""} ${now.getDate()}, ${now.getFullYear()}`);
  }, []);

  const devotional = DEVOTIONALS[currentIndex] ?? DEVOTIONALS[0];
  const totalDevotionals = DEVOTIONALS.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalDevotionals) % totalDevotionals);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalDevotionals);
  };

  const handleSelectDay = (index: number) => {
    setCurrentIndex(index);
  };

  if (!mounted) {
    return (
      <div className="section-container py-12 animate-fade-in">
        <div className="h-96 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full border-4 border-azure-200 border-t-azure-500 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* ===== HERO HEADER ===== */}
      <section className="relative overflow-hidden py-12 sm:py-16 bg-gradient-to-br from-azure-600 via-ocean-400 to-aqua-500 dark:from-cobalt-900 dark:via-azure-800 dark:to-ocean-900">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        </div>
        <div className="section-container text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-5">
            <Sun className="w-4 h-4" />
            <span>Daily Spiritual Nourishment</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Daily Devotionals
          </h1>
          <p className="text-azure-100 text-lg max-w-2xl mx-auto">
            Begin each day anchored in Scripture — reflection, prayer, and purpose for your spiritual journey.
          </p>
          {dateDisplay && (
            <div className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/20 backdrop-blur-sm">
              <Calendar className="w-4 h-4" />
              <span className="font-semibold">{dayOfWeek}, {dateDisplay}</span>
            </div>
          )}
        </div>
      </section>

      {/* ===== WEEK NAV PILLS ===== */}
      <section className="py-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-md sticky top-[73px] z-40 border-b border-gray-100 dark:border-slate-700">
        <div className="section-container">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide justify-center">
            {DEVOTIONALS.map((dev, idx) => (
              <button
                key={dev.id}
                onClick={() => handleSelectDay(idx)}
                className={`flex-shrink-0 flex flex-col items-center gap-1 px-4 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  currentIndex === idx
                    ? "bg-gradient-to-r from-azure-500 to-ocean-400 text-white shadow-lg shadow-azure-500/30 scale-105"
                    : "text-gray-600 dark:text-gray-400 hover:bg-azure-50 dark:hover:bg-slate-700 hover:text-azure-600"
                }`}
              >
                <span className="text-lg">{dev.emoji}</span>
                <span className="text-xs">{dev.theme}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MAIN DEVOTIONAL CARD ===== */}
      <section className="py-10 sm:py-14">
        <div className="section-container max-w-3xl">
          {/* Navigation arrows */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-azure-50 dark:hover:bg-slate-700 hover:text-azure-600 dark:hover:text-azure-400 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">Previous</span>
            </button>
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
              {currentIndex + 1} of {totalDevotionals}
            </span>
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-azure-50 dark:hover:bg-slate-700 hover:text-azure-600 dark:hover:text-azure-400 transition-all"
            >
              <span className="text-sm font-medium hidden sm:inline">Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Main Card */}
          <div className="glass-card overflow-hidden animate-slide-up">
            {/* Card Header Gradient */}
            <div className={`bg-gradient-to-r ${devotional?.color ?? "from-azure-500 to-ocean-400"} p-6 sm:p-8 text-white`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
                      {devotional?.theme ?? ""}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold mb-1">{devotional?.title ?? ""}</h2>
                  {dateDisplay && currentIndex === new Date().getDay() && (
                    <p className="text-white/80 text-sm">Today's Devotional · {dateDisplay}</p>
                  )}
                </div>
                <span className="text-4xl mt-1">{devotional?.emoji ?? "✨"}</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-8">
              {/* Scripture */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-azure-100 dark:bg-azure-900/30 flex items-center justify-center">
                    <BookOpen className="w-4 h-4 text-azure-600 dark:text-azure-400" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">Today's Scripture</h3>
                </div>
                <blockquote className="border-l-4 border-azure-500 pl-5 py-3 bg-azure-50/60 dark:bg-azure-900/20 rounded-r-xl">
                  <p className="text-gray-800 dark:text-gray-100 italic leading-relaxed text-base sm:text-lg">
                    &ldquo;{devotional?.scripture?.text ?? ""}&rdquo;
                  </p>
                  <footer className="mt-3 text-azure-600 dark:text-azure-400 font-semibold not-italic text-sm">
                    — {devotional?.scripture?.reference ?? ""}
                  </footer>
                </blockquote>
              </div>

              {/* Reflection */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-ocean-100 dark:bg-ocean-900/30 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-ocean-500 dark:text-ocean-400" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">Reflection</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base">
                  {devotional?.reflection ?? ""}
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 dark:border-slate-700" />

              {/* Prayer Prompt */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-aqua-100 dark:bg-aqua-900/30 flex items-center justify-center">
                    <Heart className="w-4 h-4 text-aqua-600 dark:text-aqua-400" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-lg">Prayer Prompt</h3>
                </div>
                <div className="p-5 rounded-2xl bg-gradient-to-r from-azure-50 to-aqua-50 dark:from-azure-900/20 dark:to-aqua-900/20 border border-azure-100 dark:border-azure-800/30">
                  <p className="text-gray-800 dark:text-gray-100 leading-relaxed italic">
                    {devotional?.prayerPrompt ?? ""}
                  </p>
                </div>
              </div>

              {/* Practice Point */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-r from-cobalt-50 to-azure-50 dark:from-cobalt-900/20 dark:to-azure-900/20 border border-cobalt-100 dark:border-cobalt-800/30">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cobalt-500 to-azure-500 flex items-center justify-center shadow-md flex-shrink-0">
                  <Star className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white mb-1">Today's Practice</h4>
                  <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                    {devotional?.practicePoint ?? ""}
                  </p>
                </div>
              </div>

              {/* CTA to pray with Pastor Hope */}
              <div className="text-center pt-2">
                <a
                  href="/#prayer-section"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Heart className="w-5 h-5" />
                  Pray with Pastor Hope
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ALL DEVOTIONALS GRID ===== */}
      <section className="py-10 sm:py-14 bg-white/40 dark:bg-slate-800/40">
        <div className="section-container">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              All <span className="text-gradient dark:text-gradient-dark">Devotionals</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Seven devotionals rotating through each week of your spiritual journey
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {DEVOTIONALS.map((dev, idx) => (
              <button
                key={dev.id}
                onClick={() => {
                  handleSelectDay(idx);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`text-left p-5 rounded-2xl border transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 ${
                  currentIndex === idx
                    ? "bg-gradient-to-br from-azure-50 to-sky-50 dark:from-azure-900/30 dark:to-sky-900/30 border-azure-300 dark:border-azure-700 shadow-md"
                    : "bg-white dark:bg-slate-800 border-gray-100 dark:border-slate-700 hover:border-azure-200 dark:hover:border-azure-700"
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl">{dev.emoji}</span>
                  <div>
                    <span className="text-xs font-semibold text-azure-600 dark:text-azure-400 uppercase tracking-wide">{dev.theme}</span>
                    <h3 className="font-bold text-gray-900 dark:text-white text-sm mt-0.5">{dev.title}</h3>
                  </div>
                </div>
                <p className="text-xs text-azure-600 dark:text-azure-400 font-medium">{dev.scripture.reference}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2 leading-relaxed">
                  &ldquo;{dev.scripture.text.slice(0, 80)}...&rdquo;
                </p>
                {currentIndex === idx && (
                  <span className="mt-2 inline-block text-xs font-semibold text-azure-600 dark:text-azure-400">▶ Currently reading</span>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
