"use client";

import { useState } from "react";
import { 
  Heart, 
  BookOpen, 
  Sparkles, 
  Send, 
  Loader2,
  MessageCircle,
  Shield,
  ChevronDown
} from "lucide-react";
import ScriptureLink from "./components/ScriptureLink";
import dynamic from "next/dynamic";

// Dynamic import for CommunityMap (client-side only, no SSR)
const CommunityMap = dynamic(() => import("./components/CommunityMap"), {
  ssr: false,
  loading: () => (
    <div className="glass-card p-6 sm:p-8 h-[600px] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-azure-500 to-ocean-400 flex items-center justify-center animate-pulse">
          <Heart className="w-6 h-6 text-white" />
        </div>
        <p className="text-gray-500 dark:text-gray-400">Loading Community Prayer Map...</p>
      </div>
    </div>
  ),
});

export default function HomePage() {
  const [prayerText, setPrayerText] = useState("");
  const [prayerResponse, setPrayerResponse] = useState<any>(null);
  const [loadingPrayer, setLoadingPrayer] = useState(false);

  // --- Call Pastor Hope API ---
  const handlePraySubmit = async () => {
    if (!prayerText.trim()) return;
    setLoadingPrayer(true);
    setPrayerResponse(null);
    try {
      const res = await fetch("/api/pray", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prayerText }),
      });
      const data = await res.json();
      setPrayerResponse(data);
    } catch (err) {
      setPrayerResponse({ error: "⚠️ Unable to connect to Pastor Hope." });
    } finally {
      setLoadingPrayer(false);
    }
  };

  const scrollToPrayer = () => {
    document.getElementById('prayer-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="animate-fade-in">
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28">
        {/* Background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-azure-400/20 dark:bg-azure-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-aqua-400/20 dark:bg-aqua-600/10 rounded-full blur-3xl" />
        </div>

        <div className="section-container">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-azure-100 dark:bg-azure-900/30 text-azure-700 dark:text-azure-300 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Your Spiritual Companion</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="text-gray-900 dark:text-white">Experience </span>
              <span className="text-gradient dark:text-gradient-dark">God's Presence</span>
              <br />
              <span className="text-gray-900 dark:text-white">Through Prayer</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              <em>"Sword of the Spirit is the Word of God."</em>
              <br className="hidden sm:block" />
              <span className="mt-2 block">
                Share your heart with Pastor Hope and receive compassionate, 
                Scripture-based guidance for your spiritual journey.
              </span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                onClick={scrollToPrayer}
                className="btn-cta flex items-center gap-2 w-full sm:w-auto"
              >
                <Heart className="w-5 h-5" />
                Start Praying Now
              </button>
              <a 
                href="/prayers" 
                className="btn-secondary flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <BookOpen className="w-5 h-5" />
                View My Prayers
              </a>
            </div>

            {/* Scroll indicator */}
            <div className="mt-12 animate-bounce">
              <ChevronDown className="w-6 h-6 mx-auto text-azure-500 dark:text-azure-400" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          FEATURES SECTION
          ============================================ */}
      <section className="py-16 sm:py-20 bg-white/50 dark:bg-slate-800/50">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Pray with <span className="text-gradient dark:text-gradient-dark">Pastor Hope</span>?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Experience a unique blend of compassion, wisdom, and Scripture-based guidance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Feature 1 */}
            <div className="feature-card text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-azure-500 to-ocean-400 flex items-center justify-center shadow-lg shadow-azure-500/30">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Compassionate Response
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Receive warm, pastoral guidance that acknowledges your feelings and meets you where you are.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="feature-card text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-aqua-500 to-azure-400 flex items-center justify-center shadow-lg shadow-aqua-500/30">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Scripture-Based Wisdom
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Every response is grounded in Biblical truth, offering relevant Scripture for your situation.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="feature-card text-center">
              <div className="w-14 h-14 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-cobalt-500 to-azure-500 flex items-center justify-center shadow-lg shadow-cobalt-500/30">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Private & Anonymous
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your prayers are handled with complete pastoral care and anonymity. Share freely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          PRAYER INTERFACE SECTION
          ============================================ */}
      <section id="prayer-section" className="py-16 sm:py-20">
        <div className="section-container">
          {/* Pray with Me Card - Full Width */}
          <div className="glass-card p-6 sm:p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-azure-500 to-ocean-400 flex items-center justify-center shadow-lg shadow-azure-500/30">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Pray with Me
                </h2>
                <p className="text-azure-600 dark:text-azure-400 font-medium">Pastor Hope</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Section */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    What's on your heart today?
                  </label>
                  <textarea
                    className="textarea-field min-h-[140px]"
                    placeholder="Share your prayer request, concerns, or what you're thankful for..."
                    value={prayerText}
                    onChange={(e) => setPrayerText(e.target.value)}
                  />
                </div>

                <button
                  onClick={handlePraySubmit}
                  disabled={loadingPrayer || !prayerText.trim()}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loadingPrayer ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Pastor Hope is praying...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Your Prayer
                    </>
                  )}
                </button>
              </div>

              {/* Response Section */}
              <div>
                {prayerResponse && !prayerResponse.error && (
                  <div className="response-card animate-slide-up h-full">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-azure-200 dark:border-azure-800/30">
                      <Sparkles className="w-5 h-5 text-azure-500" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Pastor Hope's Prayer Response
                      </h3>
                    </div>
                    
                    <div className="space-y-4 text-gray-700 dark:text-gray-200 max-h-[350px] overflow-y-auto pr-2">
                      {prayerResponse.greeting && (
                        <p className="font-semibold text-azure-700 dark:text-azure-300">
                          {prayerResponse.greeting}
                        </p>
                      )}
                      
                      {prayerResponse.acknowledgement && (
                        <p className="leading-relaxed">
                          <ScriptureLink text={prayerResponse.acknowledgement} />
                        </p>
                      )}
                      
                      {prayerResponse.scripture && (
                        <blockquote className="border-l-4 border-azure-500 pl-4 py-2 bg-azure-50/50 dark:bg-azure-900/20 rounded-r-lg italic text-azure-800 dark:text-azure-200">
                          <ScriptureLink text={prayerResponse.scripture} />
                        </blockquote>
                      )}
                      
                      {prayerResponse.pastoral_voice && (
                        <p className="leading-relaxed">
                          <ScriptureLink text={prayerResponse.pastoral_voice} />
                        </p>
                      )}
                      
                      {prayerResponse.prayer && (
                        <div className="p-4 rounded-xl bg-gradient-to-r from-azure-500/10 to-aqua-500/10 dark:from-azure-900/30 dark:to-aqua-900/30 border border-azure-200/50 dark:border-azure-700/30">
                          <p className="text-gray-800 dark:text-gray-100 leading-relaxed">
                            <ScriptureLink text={prayerResponse.prayer} />
                          </p>
                        </div>
                      )}
                      
                      {prayerResponse.declaration && (
                        <p className="font-semibold text-cobalt-600 dark:text-aqua-400">
                          <ScriptureLink text={prayerResponse.declaration} />
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {prayerResponse?.error && (
                  <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400">
                    {prayerResponse.error}
                  </div>
                )}

                {!prayerResponse && (
                  <div className="h-full flex items-center justify-center p-8 rounded-xl border-2 border-dashed border-gray-200 dark:border-slate-700">
                    <div className="text-center">
                      <Sparkles className="w-10 h-10 mx-auto mb-3 text-azure-400 dark:text-azure-500" />
                      <p className="text-gray-500 dark:text-gray-400">
                        Share your prayer and Pastor Hope will respond with Scripture-based encouragement
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Community Prayer Map - Full Width */}
          <CommunityMap onPrayClick={scrollToPrayer} />
        </div>
      </section>

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <section className="py-16 sm:py-20">
        <div className="section-container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-azure-500 via-ocean-400 to-aqua-500 dark:from-azure-600 dark:via-ocean-500 dark:to-aqua-600 p-8 sm:p-12 lg:p-16 text-center">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Begin Your Prayer Journey?
            </h2>
            <p className="text-azure-100 text-lg mb-8 max-w-2xl mx-auto">
              Join countless others who have found peace, guidance, and spiritual growth through prayerful reflection with Pastor Hope.
            </p>
            <button 
              onClick={scrollToPrayer}
              className="px-8 py-4 bg-white text-azure-600 font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Start Praying Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
