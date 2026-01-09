"use client";

import { useState } from "react";

export default function PrayEasy() {
  const [prayerText, setPrayerText] = useState("");
  const [prayerResponse, setPrayerResponse] = useState<string | null>(null);
  const [loadingPrayer, setLoadingPrayer] = useState(false);

  const handlePray = async (e: React.FormEvent) => {
    e.preventDefault();
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

      if (res.ok && data.response) {
        // This matches your new API return format exactly
        setPrayerResponse(data.response);
      } else {
        setPrayerResponse("⚠️ Pastor Hope is currently unavailable. Please try again in a moment.");
      }
    } catch (err) {
      console.error("Prayer Error:", err);
      setPrayerResponse("⚠️ Unable to connect to Pastor Hope. Please check your connection.");
    } finally {
      setLoadingPrayer(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#9b6dff] p-4 md:p-8 font-sans">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden border-4 border-white">
        {/* Header */}
        <div className="p-6 bg-white border-b border-gray-100">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl">🔔</span>
            <h1 className="text-3xl font-bold text-gray-800">PrayEasy</h1>
          </div>
          <p className="text-gray-500 italic">Sword of the Spirit is the Word of God.</p>
        </div>

        {/* Prayer Input Section */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Pray with Me (Pastor Hope)</h2>
          <form onSubmit={handlePray} className="space-y-4">
            <textarea
              value={prayerText}
              onChange={(e) => setPrayerText(e.target.value)}
              placeholder="Enter your prayer request here..."
              className="w-full h-40 p-4 border-2 border-gray-200 rounded-lg focus:border-[#9b6dff] focus:ring-2 focus:ring-[#9b6dff] outline-none transition-all text-gray-700 resize-none"
            />
            <button
              type="submit"
              disabled={loadingPrayer || !prayerText.trim()}
              className="w-full md:w-auto px-8 py-3 bg-[#4CAF50] hover:bg-[#45a049] text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
            >
              {loadingPrayer ? "Pastor Hope is praying..." : "Submit Your Prayer"}
            </button>
          </form>

          {/* Response Display Section */}
          <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200 min-h-[200px]">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">
              Pastor Hope's Prayer Response
            </h3>
            
            {loadingPrayer ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#9b6dff]"></div>
              </div>
            ) : prayerResponse ? (
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap animate-fadeIn">
                {prayerResponse}
              </div>
            ) : (
              <p className="text-gray-400 italic">Your response will appear here...</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer / Disclaimer */}
      <div className="max-w-2xl mx-auto mt-6 text-center text-white/80 text-sm">
        <p>© 2024 PrayEasy. All prayers are handled with pastoral care and anonymity.</p>
      </div>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </main>
  );
}