import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

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

// Simple emotion detection for database logging
function detectEmotion(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("sad") || lower.includes("lonely") || lower.includes("depressed") || lower.includes("grief") || lower.includes("loss")) return "Sadness";
  if (lower.includes("worried") || lower.includes("anxious") || lower.includes("afraid") || lower.includes("fear") || lower.includes("stress")) return "Anxiety";
  if (lower.includes("thank") || lower.includes("grateful") || lower.includes("blessed")) return "Gratitude";
  if (lower.includes("hope") || lower.includes("trust") || lower.includes("faith")) return "Hope";
  if (lower.includes("angry") || lower.includes("frustrated") || lower.includes("upset")) return "Frustration";
  if (lower.includes("pain") || lower.includes("hurt") || lower.includes("sick") || lower.includes("ill") || lower.includes("heal")) return "Concern";
  if (lower.includes("overwhelm") || lower.includes("tired") || lower.includes("exhaust")) return "Overwhelm";
  if (lower.includes("joy") || lower.includes("happy") || lower.includes("celebrate")) return "Joy";
  return "General";
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
- The "prayer" field MUST **start with the words: 'Pray with me...'** to invite the user into prayer.`,
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

    // SAVE TO SUPABASE DATABASE
    try {
      const supabase = getSupabaseClient();
      if (supabase) {
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

        const { error: dbError } = await supabase.from("prayers").insert([
          {
            prayer_text: prayerText,
            response_text: fullResponseText,
            detected_emotion: detectedEmotion,
          },
        ]);

        if (dbError) {
          console.error("Supabase Insert Error:", dbError);
        } else {
          console.log("Prayer saved to database successfully");
        }
      }
    } catch (dbError) {
      console.error("Database connection error:", dbError);
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