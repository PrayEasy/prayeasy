"use client";

import { useState, useEffect } from "react";
import { getSupabase, Prayer } from "@/lib/supabase";
import Link from "next/link";
import { 
  BookOpen, 
  Calendar, 
  Filter, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Heart,
  X,
  Loader2,
  Sparkles
} from "lucide-react";

// Theme/emotion options for filtering
const EMOTION_OPTIONS = [
  "All",
  "Sadness",
  "Anxiety",
  "Gratitude",
  "Hope",
  "Frustration",
  "Concern",
  "Overwhelm",
  "Joy",
  "General"
];

// Date range options
const DATE_RANGES = [
  { label: "Last 7 days", value: 7 },
  { label: "Last 30 days", value: 30 },
  { label: "Last 3 months", value: 90 },
  { label: "All time", value: 0 },
];

// Emotion badge colors
const EMOTION_COLORS: Record<string, string> = {
  Sadness: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
  Anxiety: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
  Gratitude: "bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300",
  Hope: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/50 dark:text-cyan-300",
  Frustration: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
  Concern: "bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300",
  Overwhelm: "bg-orange-100 text-orange-700 dark:bg-orange-900/50 dark:text-orange-300",
  Joy: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/50 dark:text-yellow-300",
  General: "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300",
};

export default function PrayerJournalPage() {
  const [prayers, setPrayers] = useState<Prayer[]>([]);
  const [filteredPrayers, setFilteredPrayers] = useState<Prayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmotion, setSelectedEmotion] = useState("All");
  const [selectedDateRange, setSelectedDateRange] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  
  // Expanded cards state
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());

  // Fetch prayers from database
  useEffect(() => {
    async function fetchPrayers() {
      try {
        setLoading(true);
        const supabase = getSupabase();
        
        if (!supabase) {
          setError("Database connection not configured.");
          return;
        }
        
        const { data, error: fetchError } = await supabase
          .from("prayers")
          .select("*")
          .order("created_at", { ascending: false });

        if (fetchError) {
          console.error("Error fetching prayers:", fetchError);
          setError("Failed to load prayers. Please try again.");
          return;
        }

        setPrayers(data || []);
      } catch (err) {
        console.error("Error:", err);
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    }

    fetchPrayers();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = [...prayers];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (prayer) =>
          prayer.prayer_text?.toLowerCase().includes(query) ||
          prayer.response_text?.toLowerCase().includes(query)
      );
    }

    // Emotion filter
    if (selectedEmotion !== "All") {
      result = result.filter(
        (prayer) => prayer.detected_emotion === selectedEmotion
      );
    }

    // Date range filter
    if (selectedDateRange > 0) {
      const cutoffDate = new Date();
      cutoffDate.setDate(cutoffDate.getDate() - selectedDateRange);
      result = result.filter(
        (prayer) => new Date(prayer.created_at) >= cutoffDate
      );
    }

    setFilteredPrayers(result);
  }, [prayers, searchQuery, selectedEmotion, selectedDateRange]);

  // Toggle card expansion
  const toggleCard = (id: string) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedEmotion("All");
    setSelectedDateRange(0);
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Check if any filter is active
  const hasActiveFilters =
    searchQuery.trim() || selectedEmotion !== "All" || selectedDateRange > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-azure-50 via-white to-sapphire-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-azure-600 to-sapphire-600 text-white py-12">
        <div className="section-container">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-8 h-8" />
            <h1 className="text-3xl md:text-4xl font-bold">Prayer Journal</h1>
          </div>
          <p className="text-azure-100 text-lg max-w-2xl">
            Your personal prayer history with Pastor Hope. Reflect on your journey and see how God has been working in your life.
          </p>
        </div>
      </div>

      <div className="section-container py-8">
        {/* Search & Filter Bar */}
        <div className="glass-card p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search your prayers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-slate-700 
                          bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200
                          focus:ring-2 focus:ring-azure-500 focus:border-transparent
                          transition-all duration-200"
              />
            </div>

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200
                        ${showFilters 
                          ? "bg-azure-600 text-white" 
                          : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                        }`}
            >
              <Filter className="w-5 h-5" />
              Filters
              {hasActiveFilters && (
                <span className="bg-azure-500 text-white text-xs px-2 py-0.5 rounded-full">
                  Active
                </span>
              )}
            </button>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Date Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Date Range
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {DATE_RANGES.map((range) => (
                      <button
                        key={range.value}
                        onClick={() => setSelectedDateRange(range.value)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                                  ${selectedDateRange === range.value
                                    ? "bg-azure-600 text-white"
                                    : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                                  }`}
                      >
                        {range.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Emotion Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Heart className="inline w-4 h-4 mr-1" />
                    Theme / Emotion
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {EMOTION_OPTIONS.slice(0, 6).map((emotion) => (
                      <button
                        key={emotion}
                        onClick={() => setSelectedEmotion(emotion)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                                  ${selectedEmotion === emotion
                                    ? "bg-azure-600 text-white"
                                    : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                                  }`}
                      >
                        {emotion}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {EMOTION_OPTIONS.slice(6).map((emotion) => (
                      <button
                        key={emotion}
                        onClick={() => setSelectedEmotion(emotion)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                                  ${selectedEmotion === emotion
                                    ? "bg-azure-600 text-white"
                                    : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                                  }`}
                      >
                        {emotion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-4 flex items-center gap-2 text-azure-600 dark:text-azure-400 
                            hover:text-azure-700 dark:hover:text-azure-300 font-medium transition-colors"
                >
                  <X className="w-4 h-4" />
                  Clear all filters
                </button>
              )}
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-600 dark:text-gray-400">
            {loading ? (
              "Loading..."
            ) : (
              <>
                <span className="font-semibold text-azure-600 dark:text-azure-400">
                  {filteredPrayers.length}
                </span>{" "}
                {filteredPrayers.length === 1 ? "prayer" : "prayers"} found
              </>
            )}
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-azure-600 animate-spin mb-4" />
            <p className="text-gray-600 dark:text-gray-400">Loading your prayers...</p>
          </div>
        ) : error ? (
          <div className="glass-card p-8 text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        ) : filteredPrayers.length === 0 ? (
          <div className="glass-card p-12 text-center">
            <Sparkles className="w-16 h-16 text-azure-400 mx-auto mb-4" />
            {prayers.length === 0 ? (
              <>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Start Your Prayer Journey
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Your prayer journal is empty. Submit your first prayer to begin.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-azure-600 to-sapphire-600 
                            text-white font-semibold rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 
                            transition-all duration-200"
                >
                  <Heart className="w-5 h-5" />
                  Submit Your First Prayer
                </Link>
              </>
            ) : (
              <>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  No Prayers Match Your Filters
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Try adjusting your search or filters to see more prayers.
                </p>
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-azure-100 dark:bg-azure-900/50 
                            text-azure-700 dark:text-azure-300 font-semibold rounded-xl 
                            hover:bg-azure-200 dark:hover:bg-azure-800/50 transition-all duration-200"
                >
                  <X className="w-5 h-5" />
                  Clear Filters
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPrayers.map((prayer) => {
              const isExpanded = expandedCards.has(prayer.id);
              return (
                <div
                  key={prayer.id}
                  className="glass-card overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  {/* Card Header */}
                  <div
                    className="p-4 cursor-pointer"
                    onClick={() => toggleCard(prayer.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(prayer.created_at)}
                          </span>
                          {prayer.detected_emotion && (
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                EMOTION_COLORS[prayer.detected_emotion] || EMOTION_COLORS.General
                              }`}
                            >
                              {prayer.detected_emotion}
                            </span>
                          )}
                        </div>
                        <p
                          className={`text-gray-800 dark:text-gray-200 ${
                            isExpanded ? "" : "line-clamp-2"
                          }`}
                        >
                          {prayer.prayer_text}
                        </p>
                      </div>
                      <button
                        className="flex-shrink-0 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                        aria-label={isExpanded ? "Collapse" : "Expand"}
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expanded Content - Pastor Hope's Response */}
                  {isExpanded && prayer.response_text && (
                    <div className="px-4 pb-4 border-t border-gray-200 dark:border-slate-700 animate-fade-in">
                      <div className="pt-4">
                        <div className="flex items-center gap-2 mb-3">
                          <Sparkles className="w-5 h-5 text-azure-600 dark:text-azure-400" />
                          <h4 className="font-semibold text-azure-700 dark:text-azure-300">
                            Pastor Hope's Response
                          </h4>
                        </div>
                        <div className="bg-gradient-to-br from-azure-50 to-sapphire-50 dark:from-slate-800 dark:to-slate-700 
                                      rounded-xl p-4 prose prose-sm dark:prose-invert max-w-none">
                          {prayer.response_text.split("\n\n").map((paragraph, idx) => (
                            <p
                              key={idx}
                              className={`text-gray-700 dark:text-gray-300 mb-3 last:mb-0 ${
                                paragraph.includes("Pray with me") ||
                                paragraph.includes("I declare")
                                  ? "italic text-azure-700 dark:text-azure-300"
                                  : ""
                              }`}
                            >
                              {paragraph}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
