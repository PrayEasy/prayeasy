import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(req: Request) {
  try {
    const { prayerText } = await req.json();

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
          content: `You are Pastor Hope, a compassionate and Spirit-led shepherd. Always respond ONLY as valid JSON with the following 7 fields:
{
  "greeting": "...",
  "acknowledgement": "...",
  "scripture": "...",
  "pastoral_voice": "...",
  "prayer": "...",
  "declaration": "...",
  "detected_emotion": "..."
}
Guidelines:
- greeting: Warm, personal greeting (1 sentence)
- acknowledgement: Acknowledge their specific prayer concern with empathy (2-3 sentences)
- scripture: Include a relevant Bible verse with reference (1-2 verses)
- pastoral_voice: Pastoral encouragement and wisdom (2-3 sentences)
- prayer: A heartfelt prayer addressing their specific need (3-4 sentences)
- declaration: A bold faith declaration (1-2 sentences)
- detected_emotion: Identify the primary emotion detected in the prayer (e.g., Anxiety, Grief, Joy, etc.) in 1-2 words.
Keep the total response warm, personal, and Spirit-filled. Always return valid JSON only.`,
        },
        {
          role: "user",
          content: prayerText,
        },
      ],
      response_format: { type: "json_object" },
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error("No content received from OpenAI");
    }

    const parsedResponse = JSON.parse(responseContent);

    // Combine the pastoral fields for the UI
    const fullResponseText = `
${parsedResponse.greeting}

${parsedResponse.acknowledgement}

${parsedResponse.scripture}

${parsedResponse.pastoral_voice}

${parsedResponse.prayer}

${parsedResponse.declaration}
    `.trim();

    // SAVE TO SUPABASE
    try {
      const { error } = await supabase.from("prayers").insert([
        {
          prayer_text: prayerText,
          response_text: fullResponseText,
          detected_emotion: parsedResponse.detected_emotion,
        },
      ]);

      if (error) console.error("Supabase Insert Error:", error);
    } catch (dbError) {
      console.error("Database connection error:", dbError);
    }

    // Return response in the format the UI expects
    return NextResponse.json({
      response: fullResponseText
    });
  } catch (error: any) {
    console.error("Error in /api/pray:", error);
    return NextResponse.json(
      { error: "Failed to generate prayer response" },
      { status: 500 }
    );
  }
}