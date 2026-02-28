import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

// NOTE: Occasional JSON parsing errors from OpenAI API have been observed
// during testing but do not interfere with data capture. Monitor if this becomes frequent.

// Lazy initialization to avoid build-time errors
function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  return new OpenAI({ apiKey });
}

// Initialize Supabase client
function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

// Expanded emotion detection for database logging
// Maps to 29 valid emotions - "Faith" is the default fallback (NOT "General")
function detectEmotion(input: string): string {
  const lower = input.toLowerCase();
  
  // Sadness / Grief / Loneliness
  if (lower.includes("sad") || lower.includes("lonely") || lower.includes("depressed") || lower.includes("grief") || lower.includes("loss") || lower.includes("crying") || lower.includes("tears")) return "Sadness";
  
  // Anxiety / Fear / Worry
  if (lower.includes("worried") || lower.includes("anxious") || lower.includes("afraid") || lower.includes("fear") || lower.includes("stress") || lower.includes("nervous") || lower.includes("panic")) return "Anxiety";
  
  // Gratitude / Thankfulness
  if (lower.includes("thank") || lower.includes("grateful") || lower.includes("blessed") || lower.includes("appreciate") || lower.includes("praise")) return "Gratitude";
  
  // Hope / Trust
  if (lower.includes("hope") || lower.includes("trust") || lower.includes("believe") || lower.includes("waiting on god") || lower.includes("looking forward")) return "Hope";
  
  // Frustration / Anger
  if (lower.includes("angry") || lower.includes("frustrated") || lower.includes("upset") || lower.includes("annoyed") || lower.includes("can't seem to") || lower.includes("unanswered")) return "Frustration";
  
  // Concern / Health / Healing
  if (lower.includes("pain") || lower.includes("hurt") || lower.includes("sick") || lower.includes("ill") || lower.includes("heal") || lower.includes("surgery") || lower.includes("hospital") || lower.includes("doctor") || lower.includes("medical") || lower.includes("health")) return "Concern";
  
  // Overwhelm / Exhaustion
  if (lower.includes("overwhelm") || lower.includes("tired") || lower.includes("exhaust") || lower.includes("too much") || lower.includes("struggling") || lower.includes("burden")) return "Overwhelm";
  
  // Joy / Celebration
  if (lower.includes("joy") || lower.includes("happy") || lower.includes("celebrate") || lower.includes("excited") || lower.includes("wonderful")) return "Joy";
  
  // Love / Family / Relationships
  if (lower.includes("love") || lower.includes("family") || lower.includes("marriage") || lower.includes("husband") || lower.includes("wife") || lower.includes("child") || lower.includes("relationship")) return "Love";
  
  // Guidance / Direction
  if (lower.includes("guide") || lower.includes("direction") || lower.includes("decision") || lower.includes("wisdom") || lower.includes("path") || lower.includes("way")) return "Guidance";
  
  // Provision / Financial
  if (lower.includes("job") || lower.includes("money") || lower.includes("financial") || lower.includes("provide") || lower.includes("provision") || lower.includes("work")) return "Provision";
  
  // Peace / Rest
  if (lower.includes("peace") || lower.includes("calm") || lower.includes("rest") || lower.includes("quiet") || lower.includes("still")) return "Peace";
  
  // Strength / Courage
  if (lower.includes("strength") || lower.includes("strong") || lower.includes("courage") || lower.includes("power") || lower.includes("endure")) return "Strength";
  
  // Default to "Faith" - a valid emotion representing general prayer/spiritual connection
  // NOTE: "General" was removed as it's not one of the 29 valid emotions
  return "Faith";
}

export async function POST(req: Request) {
  try {
    const { prayerText } = await req.json();

    // Check for API key at runtime
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key is not configured. Please set OPENAI_API_KEY environment variable." },
        { status: 500 }
      );
    }

    const client = getOpenAIClient();

    if (!prayerText) {
      return NextResponse.json(
        { error: "Prayer text is required" },
        { status: 400 }
      );
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are Pastor Hope, a compassionate and Spirit-led shepherd. 
Always respond ONLY as valid JSON with the following 6 fields:

{
  "greeting": "...",
  "acknowledgement": "...",
  "scripture": "...",
  "pastoral_voice": "...",
  "prayer": "...",
  "declaration": "..."
}

⚠️ Important:
- DO NOT include numbers, step labels, or bullet points in the content. 
- DO NOT insert words like "Step 1, Greeting" inside the text. 
- Each field must be warm, natural, pastoral, Spirit-led.
- The "prayer" field MUST **start with the words: 'Pray with me...'** to invite the user into prayer.
- ALWAYS use NUMERIC format for Bible references (e.g., "Philippians 4:6-7", "John 3:16", "1 Corinthians 13:4-7"). NEVER spell out chapter or verse numbers (e.g., do NOT write "four, verse six and seven").`,
        },
        {
          role: "user",
          content: `Prayer request: ${prayerText}`,
        },
      ],
      temperature: 0.8,
      response_format: { type: "json_object" }, // enforce valid JSON
    });

    const message = completion.choices[0].message?.content;

    if (!message) {
      return NextResponse.json(
        { error: "No response from Pastor Hope" },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(message);

    // SAVE TO SUPABASE DATABASE - with comprehensive error logging
    try {
      const supabase = getSupabaseClient();
      
      if (!supabase) {
        // CRITICAL: Log when Supabase client is null - this could cause data loss!
        console.error("CRITICAL: Supabase client is NULL - prayer will NOT be saved!");
        console.error("Check environment variables: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY");
        console.error("Prayer text (first 100 chars):", prayerText.substring(0, 100));
      } else {
        // Combine the pastoral fields for database storage
        const fullResponseText = [
          parsed.greeting,
          parsed.acknowledgement,
          parsed.scripture,
          parsed.pastoral_voice,
          parsed.prayer,
          parsed.declaration
        ].filter(Boolean).join("\n\n");

        const detectedEmotion = detectEmotion(prayerText);
        
        console.log("Attempting to save prayer to database...");
        console.log("Detected emotion:", detectedEmotion);
        console.log("Prayer text length:", prayerText.length, "chars");

        const { data, error: dbError } = await supabase.from("prayers").insert([
          {
            prayer_text: prayerText,
            response_text: fullResponseText,
            detected_emotion: detectedEmotion,
          },
        ]).select();

        if (dbError) {
          console.error("CRITICAL: Supabase Insert Error:", dbError);
          console.error("Error code:", dbError.code);
          console.error("Error message:", dbError.message);
          console.error("Error details:", dbError.details);
          console.error("Error hint:", dbError.hint);
          console.error("Prayer text (first 100 chars):", prayerText.substring(0, 100));
        } else {
          console.log("✅ Prayer saved to database successfully!");
          console.log("Inserted record ID:", data?.[0]?.id || "unknown");
          console.log("Emotion:", detectedEmotion);
        }
      }
    } catch (dbError) {
      console.error("CRITICAL: Database connection error:", dbError);
      console.error("Error type:", typeof dbError);
      console.error("Error stack:", dbError instanceof Error ? dbError.stack : "N/A");
      console.error("Prayer text (first 100 chars):", prayerText.substring(0, 100));
      // Don't fail the request if database save fails
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Pastor Hope API error:", error);
    return NextResponse.json(
      { error: "Failed to generate prayer response" },
      { status: 500 }
    );
  }
}