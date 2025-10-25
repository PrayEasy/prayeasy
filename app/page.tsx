"use client";

import { useState } from "react";

export default function HomePage() {
  const [prayerText, setPrayerText] = useState("");
  const [prayerResponse, setPrayerResponse] = useState<any>(null);
  const [loadingPrayer, setLoadingPrayer] = useState(false);

  const [theme, setTheme] = useState("");
  const [insightResult, setInsightResult] = useState<string | null>(null);
  const [loadingInsight, setLoadingInsight] = useState(false);

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
      setPrayerResponse(data); // full JSON object now
    } catch (err) {
      setPrayerResponse({ error: "⚠️ Unable to connect to Pastor Hope." });
    } finally {
      setLoadingPrayer(false);
    }
  };

  // --- Call Insights API ---
  const handleInsightSearch = async () => {
    if (!theme.trim()) return;
    setLoadingInsight(true);
    setInsightResult(null);
    try {
      const res = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ theme }),
      });
      const data = await res.json();
      setInsightResult(data.response);
    } catch (err) {
      setInsightResult("⚠️ Error: Unable to fetch insights.");
    } finally {
      setLoadingInsight(false);
    }
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "2rem", background: "linear-gradient(to bottom, #7C3AED, #A78BFA)", minHeight: "100vh" }}>
      <h1>🙏 PrayEasy</h1>
      <p>
        <i>Sword of the Spirit is the Word of God.</i>
      </p>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          marginTop: "2rem",
          alignItems: "flex-start",
        }}
      >
        {/* --- LEFT PANEL: Pray with Me --- */}
        <div
          style={{
            flex: 1,
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "#fff",
          }}
        >
          <h2>Pray with Me (Pastor Hope)</h2>
          <textarea
            style={{
              width: "100%",
              height: "100px",
              marginBottom: "1rem",
              padding: "0.5rem",
            }}
            placeholder="What’s on your heart?"
            value={prayerText}
            onChange={(e) => setPrayerText(e.target.value)}
          />
          <button
            onClick={handlePraySubmit}
            disabled={loadingPrayer}
            style={{
              padding: "0.5rem 1rem",
              background: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {loadingPrayer ? "Pastor Hope is praying..." : "Submit Your Prayer"}
          </button>

          {prayerResponse && !prayerResponse.error && (
            <div
              style={{
                marginTop: "1rem",
                background: "#f9f9f9",
                padding: "1rem",
                borderRadius: "6px",
                border: "1px solid #eee",
              }}
            >
              <h3>Pastor Hope’s Prayer Response</h3>
              <p><strong>{prayerResponse.greeting}</strong></p>
              <p>{prayerResponse.acknowledgement}</p>
              <p><em>{prayerResponse.scripture}</em></p>
              <p>{prayerResponse.pastoral_voice}</p>
              <p>{prayerResponse.prayer}</p>
              <p><strong>{prayerResponse.declaration}</strong></p>
            </div>
          )}

          {prayerResponse?.error && (
            <p style={{ color: "red" }}>{prayerResponse.error}</p>
          )}
        </div>

        {/* --- RIGHT PANEL: Insights Explorer --- */}
        <div
          style={{
            flex: 1,
            padding: "1rem",
            border: "1px solid #ddd",
            borderRadius: "8px",
            background: "#fff",
          }}
        >
          <h2>Insights Explorer</h2>
          <input
            type="text"
            placeholder='Enter theme (e.g. "forgiveness", "healing")'
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={{
              width: "100%",
              marginBottom: "1rem",
              padding: "0.5rem",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
          <button
            onClick={handleInsightSearch}
            disabled={loadingInsight}
            style={{
              padding: "0.5rem 1rem",
              background: "#2196F3",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            {loadingInsight ? "Searching..." : "Search Insights"}
          </button>

          {insightResult && (
            <div
              style={{
                marginTop: "1rem",
                whiteSpace: "pre-line",
                background: "#f9f9f9",
                padding: "1rem",
                borderRadius: "6px",
                border: "1px solid #eee",
              }}
            >
              {insightResult}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}