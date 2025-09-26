"use client";

import { useState } from "react";

interface InsightResponse {
  query: string;
  results: {
    verses: { Reference: string; Theme: string }[];
    sermons: { title: string }[];
    bibleApi: { Reference: string }[];
  };
}

export default function HomePage() {
  // === Prayer States ===
  const [prayer, setPrayer] = useState("");
  const [hopeResponse, setHopeResponse] = useState<string | null>(null);
  const [prayerLoading, setPrayerLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const emotions = [
    "Anxious","Hopeful","Grateful","Sad","Joyful","Confused",
    "Peaceful","Worried","Excited","Discouraged","Blessed",
    "Overwhelmed","Content","Fearful","Thankful",
  ];
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);

  // === Insights States ===
  const [query, setQuery] = useState("");
  const [data, setData] = useState<InsightResponse | null>(null);
  const [loading, setLoading] = useState(false);

  // Prayer submit handler
  async function handlePrayerSubmit() {
    if (!prayer) return;
    setPrayerLoading(true);
    setHopeResponse(null);
    setSaved(false);
    try {
      const res = await fetch("/api/prayers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prayer, emotions: selectedEmotions }),
      });
      const json = await res.json();
      setHopeResponse(json.response || "No response received.");
    } catch (err) {
      console.error(err);
      setHopeResponse("⚠️ Error contacting Pastor Hope.");
    } finally {
      setPrayerLoading(false);
    }
  }

  // Placeholder: Save to Journal feature
  function handleSaveResponse() {
    // For demo we just fake-save
    setSaved(true);
    setTimeout(() => setSaved(false), 3000); // auto-hide after 3s
  }

  // Insights search handler
  async function handleInsightsSearch() {
    if (!query) return;
    setLoading(true);
    setData(null);

    try {
      const res = await fetch(`/api/insights?q=${query}`);
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Toggle emotion selection
  function toggleEmotion(emotion: string) {
    setSelectedEmotions((prev) =>
      prev.includes(emotion) ? prev.filter((e) => e !== emotion) : [...prev, emotion]
    );
  }

  return (
    <main style={{ fontFamily: "sans-serif", lineHeight: 1.6 }}>
      {/* Hero Section */}
      <section style={{ textAlign: "center", padding: "4rem 2rem", background: "linear-gradient(135deg,#4f46e5,#9333ea)", color: "white" }}>
        <h1 style={{ fontSize: "2.5rem", fontWeight: "bold" }}>Your AI‑Powered Prayer Companion</h1>
        <p style={{ marginTop: "1rem", fontSize: "1.2rem" }}>
          Experience personalized spiritual guidance with Pastor Hope, your AI spiritual guide.
        </p>
        <button
          onClick={() => window.scrollTo({ top: 800, behavior: "smooth" })}
          style={{
            marginTop: "2rem",
            padding: "0.75rem 2rem",
            fontSize: "1rem",
            backgroundColor: "white",
            color: "#4f46e5",
            border: "none",
            borderRadius: "6px",
            fontWeight: "600",
          }}
        >
          Start Your Prayer Journey
        </button>
      </section>

      {/* Prayer Section */}
      <section style={{ display: "flex", gap: "2rem", padding: "3rem 2rem", justifyContent: "center" }}>
        {/* Left column - Share Your Prayer */}
        <div style={{ flex: 1, maxWidth: "500px", background: "#fff", padding: "2rem", borderRadius: "12px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>🙏 Share Your Prayer</h2>
          <textarea
            value={prayer}
            onChange={(e) => setPrayer(e.target.value)}
            placeholder="What's on your heart today?"
            rows={5}
            style={{ width: "100%", padding: "1rem", borderRadius: "8px", border: "1px solid #ddd", marginBottom: "1rem" }}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
            {emotions.map((emotion) => (
              <button
                key={emotion}
                type="button"
                onClick={() => toggleEmotion(emotion)}
                style={{
                  padding: "0.4rem 0.8rem",
                  borderRadius: "9999px",
                  border: selectedEmotions.includes(emotion) ? "2px solid #4f46e5" : "1px solid #ccc",
                  background: selectedEmotions.includes(emotion) ? "#EEF2FF" : "white",
                  cursor: "pointer",
                }}
              >
                {emotion}
              </button>
            ))}
          </div>
          <button
            onClick={handlePrayerSubmit}
            style={{
              width: "100%",
              padding: "0.75rem",
              background: "linear-gradient(90deg,#4f46e5,#9333ea)",
              color: "white",
              border: "none",
              borderRadius: "8px",
              fontWeight: "600",
              cursor: "pointer",
            }}
          >
            {prayerLoading ? "Praying..." : "Send to Pastor Hope"}
          </button>
        </div>

        {/* Right column - Pastor Hope response */}
        <div style={{ flex: 1, maxWidth: "500px", background: "#fff", padding: "2rem", borderRadius: "12px", minHeight: "300px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>🌟 Pastor Hope</h2>
          {!hopeResponse && <p>Pastor Hope is waiting to provide personalized guidance...</p>}
          {hopeResponse && (
            <>
              <div style={{ whiteSpace: "pre-wrap", background: "#F9FAFB", padding: "1rem", borderRadius: "8px", marginBottom:"1rem" }}>
                {hopeResponse}
              </div>
              <button
                onClick={handleSaveResponse}
                style={{
                  padding: "0.5rem 1rem",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontWeight: "600",
                  cursor: "pointer"
                }}
              >
                💾 Save to Journal
              </button>
              {saved && <p style={{ marginTop: "0.5rem", color: "green" }}>✅ Saved to Journal (coming soon!)</p>}
            </>
          )}
        </div>
      </section>

      {/* Insights Explorer Section */}
      <section style={{ padding: "3rem 2rem", background: "#F3F4F6" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: "bold", textAlign: "center", marginBottom: "1.5rem" }}>
          🔍 Explore Biblical Insights
        </h2>
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try a theme: fear, hope, joy..."
            style={{ padding: "0.5rem", border: "1px solid #ccc", borderRadius: "6px", width: "250px", marginRight: "0.5rem" }}
          />
          <button
            onClick={handleInsightsSearch}
            style={{
              padding: "0.5rem 1rem",
              background: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "6px",
              fontWeight: "600",
            }}
          >
            Get Insights
          </button>
        </div>
        {loading && <p style={{ textAlign: "center" }}>⏳ Gathering insights...</p>}
        {data && (
          <div style={{ maxWidth: "700px", margin: "2rem auto", background: "white", padding: "2rem", borderRadius: "12px" }}>
            <h3>Results for: <span style={{ color: "#2563eb" }}>{data.query}</span></h3>

            <h4>📖 Verses</h4>
            {data.results.verses.length > 0 ? (
              <ul>
                {data.results.verses.map((v, idx) => (
                  <li key={idx}><b>{v.Reference}</b> ({v.Theme})</li>
                ))}
              </ul>
            ) : (
              <p>No direct verse match.</p>
            )}

            <h4>🎤 Sermons</h4>
            {data.results.sermons.length > 0 ? (
              <ul>
                {data.results.sermons.map((s, idx) => (
                  <li key={idx}>{s.title}</li>
                ))}
              </ul>
            ) : (
              <p>No sermon matches found.</p>
            )}

            <h4>📚 Bible API</h4>
            <ul>
              {data.results.bibleApi.map((b, idx) => (
                <li key={idx}><b>{b.Reference}</b></li>
              ))}
            </ul>
          </div>
        )}
      </section>

      {/* Footer / Community Placeholder */}
      <footer style={{ textAlign: "center", padding: "2rem", background: "#111827", color: "white" }}>
        <p>🚧 Faith Community features coming soon (Prayer Circles, Live Events, AI Moderation)</p>
        <p style={{ marginTop: "1rem", fontSize: "0.9rem", color: "#9CA3AF" }}>
          PrayEasy • Connecting hearts to heaven through technology and faith
        </p>
      </footer>
    </main>
  );
}