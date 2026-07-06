"use client";

import { useEffect, useState } from "react";
import { getSupabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [profile, setProfile] = useState<any>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      const supabase = getSupabase();
      if (!supabase) return;
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      const { data } = await supabase.from("user_profiles").select("*").eq("id", user.id).single();
      setProfile(data);
      setFirstName(data?.first_name || "");
      setLastName(data?.last_name || "");
    };
    load();
  }, [router]);

  const handleSave = async () => {
    setSaving(true);
    const supabase = getSupabase();
    if (!supabase || !profile) return;
    await supabase.from("user_profiles").update({ first_name: firstName, last_name: lastName }).eq("id", profile.id);
    setSaving(false);
  };

  const handleSignOut = async () => {
    const supabase = getSupabase();
    await supabase?.auth.signOut();
    router.push("/login");
  };

  if (!profile) return <p style={{ textAlign: "center", marginTop: "4rem" }}>Loading...</p>;

  return (
    <div style={{ maxWidth: 400, margin: "4rem auto", padding: "2rem" }}>
      <h1>Your Profile</h1>
      <p>{profile.email}</p>
      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" style={{ width: "100%", padding: "0.75rem", margin: "0.5rem 0", borderRadius: 8, border: "1px solid #ccc" }} />
      <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" style={{ width: "100%", padding: "0.75rem", margin: "0.5rem 0", borderRadius: 8, border: "1px solid #ccc" }} />
      <button onClick={handleSave} disabled={saving} style={{ width: "100%", padding: "0.75rem", borderRadius: 8, background: "#3B82F6", color: "white", border: "none", marginTop: "0.5rem" }}>
        {saving ? "Saving..." : "Save"}
      </button>
      <button onClick={handleSignOut} style={{ width: "100%", padding: "0.75rem", borderRadius: 8, background: "transparent", border: "1px solid #ccc", marginTop: "0.5rem" }}>
        Sign Out
      </button>
    </div>
  );
}
