"use client";

import { useState } from "react";
import { getSupabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    const supabase = getSupabase();
    if (!supabase) {
      setStatus("error");
      return;
    }
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: "https://prayeasy.onrender.com/profile" },
    });
    setStatus(error ? "error" : "sent");
  };

  return (
    <div style={{ maxWidth: 400, margin: "4rem auto", padding: "2rem", textAlign: "center" }}>
      <h1>🙏 PrayEasy Beta Sign-In</h1>
      <p>Enter your email — we'll send you a magic link, no password needed.</p>
      <form onSubmit={handleSignIn}>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          style={{ width: "100%", padding: "0.75rem", margin: "1rem 0", borderRadius: 8, border: "1px solid #ccc" }}
        />
        <button type="submit" disabled={status === "sending"} style={{ width: "100%", padding: "0.75rem", borderRadius: 8, background: "#3B82F6", color: "white", border: "none" }}>
          {status === "sending" ? "Sending..." : "Send Magic Link"}
        </button>
      </form>
      {status === "sent" && <p style={{ color: "green" }}>Check your email for the sign-in link!</p>}
      {status === "error" && <p style={{ color: "red" }}>Something went wrong — try again.</p>}
    </div>
  );
}
