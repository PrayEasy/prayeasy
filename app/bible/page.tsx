"use client";

import { useState, useRef } from "react";
import { Search, BookOpen, Sparkles, Loader2, ChevronRight, Hash, Tag, RefreshCw, BookMarked } from "lucide-react";

const THEME_SUGGESTIONS = [
  { label: "Hope", emoji: "🌅" },
  { label: "Peace", emoji: "🕊️" },
  { label: "Strength", emoji: "💪" },
  { label: "Healing", emoji: "✨" },
  { label: "Forgiveness", emoji: "🤍" },
  { label: "Love", emoji: "❤️" },
  { label: "Courage", emoji: "🦁" },
  { label: "Wisdom", emoji: "📖" },
  { label: "Gratitude", emoji: "🙏" },
  { label: "Faith", emoji: "⭐" },
  { label: "Grace", emoji: "🎁" },
  { label: "Perseverance", emoji: "🏔️" },
];

const BIBLE_BOOKS = [
  "Genesis", "Exodus", "Leviticus", "Numbers", "Deuteronomy",
  "Joshua", "Judges", "Ruth", "1 Samuel", "2 Samuel",
  "1 Kings", "2 Kings", "1 Chronicles", "2 Chronicles", "Ezra",
  "Nehemiah", "Esther", "Job", "Psalms", "Proverbs",
  "Ecclesiastes", "Song of Solomon", "Isaiah", "Jeremiah", "Lamentations",
  "Ezekiel", "Daniel", "Hosea", "Joel", "Amos",
  "Obadiah", "Jonah", "Micah", "Nahum", "Habakkuk",
  "Zephaniah", "Haggai", "Zechariah", "Malachi",
  "Matthew", "Mark", "Luke", "John", "Acts",
  "Romans", "1 Corinthians", "2 Corinthians", "Galatians", "Ephesians",
  "Philippians", "Colossians", "1 Thessalonians", "2 Thessalonians",
  "1 Timothy", "2 Timothy", "Titus", "Philemon", "Hebrews",
  "James", "1 Peter", "2 Peter", "1 John", "2 John",
  "3 John", "Jude", "Revelation"
];

type SearchMode = "theme" | "verse";

interface BibleResult {
  title: string;
  introduction: string;
  verses: {
    reference: string;
    text: string;
    insight: string;
  }[];
  deepDive: string;
  relatedThemes: string[];
  prayerApplication: string;
}

export default function BiblePage() {
  const [searchMode, setSearchMode] = useState<SearchMode>("theme");
  const [themeQuery, setThemeQuery] = useState("");
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState("");
  const [verse, setVerse] = useState("");
  const [result, setResult] = useState<BibleResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [streamProgress, setStreamProgress] = useState(0);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleThemeSearch = async (queryOverride?: string) => {
    const query = queryOverride ?? themeQuery;
    if (!query?.trim()) return;
    setLoading(true);
    setResult(null);
    setError("");
    setStreamProgress(0);
    try {
      const res = await fetch("/api/bible", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "theme", query: query.trim() }),
      });
      if (!res.ok) throw new Error("Search failed");
      await handleStreamResponse(res);
    } catch (err) {
      setError("Unable to search scripture. Please try again.");
    } finally {
      setLoading(false);
      setStreamProgress(0);
      setTimeout(() => resultRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  };

  const handleVerseSearch = async () => {
    if (!book?.trim() || !chapter?.trim()) return;
    setLoading(true);
    setResult(null);
    setError("");
    setStreamProgress(0);
    try {
      const reference = verse?.trim()
        ? `${book} ${chapter}:${verse}`
        : `${book} ${chapter}`;
      const res = await fetch("/api/bible", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "verse", query: reference }),
      });
      if (!res.ok) throw new Error("Lookup failed");
      await handleStreamResponse(res);
    } catch (err) {
      setError("Unable to look up this passage. Please try again.");
    } finally {
      setLoading(false);
      setStreamProgress(0);
      setTimeout(() => resultRef?.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    }
  };

  const handleStreamResponse = async (res: Response) => {
    const reader = res.body?.getReader();
    if (!reader) throw new Error("No response stream");
    const decoder = new TextDecoder();
    let partialRead = "";
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      partialRead += decoder.decode(value, { stream: true });
      const lines = partialRead.split("\n");
      partialRead = lines.pop() ?? "";
      for (const line of lines) {
        if (line.startsWith("data: ")) {
          const data = line.slice(6);
          if (data === "[DONE]") return;
          try {
            const parsed = JSON.parse(data);
            if (parsed.status === "processing") {
              setStreamProgress((prev) => Math.min(prev + 3, 90));
            } else if (parsed.status === "completed" && parsed.result) {
              setResult(parsed.result);
              return;
            } else if (parsed.status === "error") {
              throw new Error(parsed.message ?? "Search failed");
            }
          } catch {
            // skip
          }
        }
      }
    }
  };

  const handleRelatedTheme = (theme: string) => {
    setSearchMode("theme");
    setThemeQuery(theme);
    handleThemeSearch(theme);
  };

  return (
    <div className="animate-fade-in">
      {/* ===== HERO HEADER ===== */}
      <section className="relative overflow-hidden py-12 sm:py-16 bg-gradient-to-br from-cobalt-600 via-azure-500 to-ocean-400 dark:from-cobalt-900 dark:via-cobalt-800 dark:to-azure-900">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        </div>
        <div className="section-container text-center text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium mb-5">
            <BookMarked className="w-4 h-4" />
            <span>Powered by Pastor Hope AI</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Bible Deep Dive
          </h1>
          <p className="text-azure-100 text-lg max-w-2xl mx-auto">
            Search by theme, explore passages, and uncover deep scriptural insights — illuminated by the Spirit.
          </p>
        </div>
      </section>

      {/* ===== SEARCH INTERFACE ===== */}
      <section className="py-10 sm:py-14">
        <div className="section-container max-w-3xl">
          {/* Mode Toggle */}
          <div className="flex items-center gap-1 p-1.5 rounded-2xl bg-gray-100 dark:bg-slate-800 mb-8 max-w-xs mx-auto">
            <button
              onClick={() => setSearchMode("theme")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                searchMode === "theme"
                  ? "bg-gradient-to-r from-azure-500 to-ocean-400 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-azure-600"
              }`}
            >
              <Tag className="w-4 h-4" />
              By Theme
            </button>
            <button
              onClick={() => setSearchMode("verse")}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                searchMode === "verse"
                  ? "bg-gradient-to-r from-azure-500 to-ocean-400 text-white shadow-md"
                  : "text-gray-600 dark:text-gray-400 hover:text-azure-600"
              }`}
            >
              <Hash className="w-4 h-4" />
              By Verse
            </button>
          </div>

          {/* Theme Search */}
          {searchMode === "theme" && (
            <div className="glass-card p-6 sm:p-8 animate-slide-up">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-azure-500 to-ocean-400 flex items-center justify-center shadow-lg shadow-azure-500/30">
                  <Search className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Theme Search</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Find scriptures on any spiritual topic</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    className="input-field pl-12"
                    placeholder={`e.g. "overcoming fear", "God's promises", "healing"`}
                    value={themeQuery}
                    onChange={(e) => setThemeQuery(e?.target?.value ?? "")}
                    onKeyDown={(e) => e.key === "Enter" && handleThemeSearch()}
                  />
                </div>
                <button
                  onClick={() => handleThemeSearch()}
                  disabled={loading || !themeQuery?.trim()}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" />Searching Scripture...</>
                  ) : (
                    <><Sparkles className="w-5 h-5" />Deep Dive</>  
                  )}
                </button>
              </div>
              {/* Theme Pills */}
              <div className="mt-6 pt-5 border-t border-gray-100 dark:border-slate-700">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Popular themes:</p>
                <div className="flex flex-wrap gap-2">
                  {THEME_SUGGESTIONS.map((t) => (
                    <button
                      key={t.label}
                      onClick={() => {
                        setThemeQuery(t.label);
                        handleThemeSearch(t.label);
                      }}
                      className="px-3 py-1.5 text-sm rounded-xl bg-azure-50 dark:bg-azure-900/30 text-azure-700 dark:text-azure-300 hover:bg-azure-100 dark:hover:bg-azure-800/40 transition-colors flex items-center gap-1"
                    >
                      <span>{t.emoji}</span> {t.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Verse Lookup */}
          {searchMode === "verse" && (
            <div className="glass-card p-6 sm:p-8 animate-slide-up">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cobalt-500 to-azure-500 flex items-center justify-center shadow-lg shadow-cobalt-500/30">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Verse Lookup</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Explore any book, chapter, or verse</p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Book</label>
                  <select
                    className="input-field"
                    value={book}
                    onChange={(e) => setBook(e?.target?.value ?? "")}
                  >
                    <option value="">Select a book...</option>
                    {BIBLE_BOOKS.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Chapter</label>
                    <input
                      type="number"
                      min="1"
                      className="input-field"
                      placeholder="e.g. 3"
                      value={chapter}
                      onChange={(e) => setChapter(e?.target?.value ?? "")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Verse <span className="text-gray-400 font-normal">(optional)</span></label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="e.g. 16 or 1-5"
                      value={verse}
                      onChange={(e) => setVerse(e?.target?.value ?? "")}
                    />
                  </div>
                </div>
                <button
                  onClick={handleVerseSearch}
                  disabled={loading || !book?.trim() || !chapter?.trim()}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" />Loading Passage...</>
                  ) : (
                    <><BookOpen className="w-5 h-5" />Explore Passage</>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="mt-8 glass-card p-8 text-center animate-fade-in">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-azure-50 dark:bg-azure-900/30 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-azure-500 animate-pulse" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Searching Scripture...</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">Pastor Hope is illuminating the Word for you</p>
              <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2 max-w-xs mx-auto">
                <div
                  className="bg-gradient-to-r from-azure-500 to-aqua-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${streamProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="mt-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 flex items-center gap-3">
              <RefreshCw className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </section>

      {/* ===== RESULTS SECTION ===== */}
      {result && !loading && (
        <section ref={resultRef} className="pb-14 sm:pb-20">
          <div className="section-container max-w-3xl">
            <div className="glass-card overflow-hidden animate-slide-up">
              {/* Result Header */}
              <div className="bg-gradient-to-r from-cobalt-600 to-azure-500 dark:from-cobalt-800 dark:to-azure-700 p-6 sm:p-8 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <BookMarked className="w-6 h-6" />
                  <h2 className="text-xl sm:text-2xl font-bold">{result?.title ?? "Scripture Study"}</h2>
                </div>
                {result?.introduction && (
                  <p className="text-azure-100 mt-2 leading-relaxed">{result.introduction}</p>
                )}
              </div>

              <div className="p-6 sm:p-8 space-y-8">
                {/* Scripture Verses */}
                {(result?.verses?.length ?? 0) > 0 && (
                  <div>
                    <h3 className="flex items-center gap-2 font-bold text-gray-900 dark:text-white text-lg mb-5">
                      <BookOpen className="w-5 h-5 text-azure-500" />
                      Key Scriptures
                    </h3>
                    <div className="space-y-5">
                      {(result?.verses ?? []).map((v, idx) => (
                        <div key={idx} className="rounded-2xl border border-gray-100 dark:border-slate-700 overflow-hidden">
                          <div className="px-5 py-3 bg-azure-50 dark:bg-azure-900/20 border-b border-azure-100 dark:border-azure-800/30">
                            <span className="font-bold text-azure-700 dark:text-azure-300 text-sm">{v?.reference ?? ""}</span>
                          </div>
                          <div className="p-5">
                            <p className="text-gray-800 dark:text-gray-100 italic leading-relaxed mb-3">
                              &ldquo;{v?.text ?? ""}&rdquo;
                            </p>
                            {v?.insight && (
                              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed border-l-2 border-azure-300 dark:border-azure-700 pl-3">
                                {v.insight}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Divider */}
                <div className="border-t border-gray-100 dark:border-slate-700" />

                {/* Deep Dive */}
                {result?.deepDive && (
                  <div>
                    <h3 className="flex items-center gap-2 font-bold text-gray-900 dark:text-white text-lg mb-4">
                      <Sparkles className="w-5 h-5 text-aqua-500" />
                      Deep Dive
                    </h3>
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-azure-50 to-sky-50 dark:from-azure-900/20 dark:to-sky-900/20 border border-azure-100 dark:border-azure-800/30">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
                        {result.deepDive}
                      </p>
                    </div>
                  </div>
                )}

                {/* Prayer Application */}
                {result?.prayerApplication && (
                  <div>
                    <h3 className="flex items-center gap-2 font-bold text-gray-900 dark:text-white text-lg mb-4">
                      <span className="text-xl">🙏</span>
                      Prayer Application
                    </h3>
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-azure-50 to-aqua-50 dark:from-azure-900/20 dark:to-aqua-900/20 border border-azure-100 dark:border-azure-800/30">
                      <p className="text-gray-800 dark:text-gray-100 italic leading-relaxed">
                        {result.prayerApplication}
                      </p>
                    </div>
                  </div>
                )}

                {/* Related Themes */}
                {(result?.relatedThemes?.length ?? 0) > 0 && (
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3">Explore Related Themes</h3>
                    <div className="flex flex-wrap gap-2">
                      {(result?.relatedThemes ?? []).map((theme, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleRelatedTheme(theme)}
                          className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm bg-azure-50 dark:bg-azure-900/30 text-azure-700 dark:text-azure-300 hover:bg-azure-100 dark:hover:bg-azure-800/40 transition-colors font-medium border border-azure-100 dark:border-azure-800/30"
                        >
                          {theme}
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href="/#prayer-section"
                    className="btn-primary flex items-center justify-center gap-2"
                  >
                    <span>🙏</span>
                    Pray with Pastor Hope
                  </a>
                  <a
                    href="/devotionals"
                    className="btn-secondary flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    Today's Devotional
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
