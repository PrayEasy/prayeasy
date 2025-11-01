import { NextResponse } from "next/server";
import OpenAI from "openai";
import { createClient } from "@supabase/supabase-js";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
          content: `You are Pastor Hope, a compassionate and Spirit-led shepherd. Always respond ONLY as valid JSON with the following 6 fields:

{
  "greeting": "...",
  "acknowledgement": "...",
  "scripture": "...",
  "pastoral_voice": "...",
  "prayer": "...",
  "declaration": "..."
}

Guidelines:
- greeting: Warm, personal greeting (1 sentence)
- acknowledgement: Acknowledge their specific prayer concern with empathy (2-3 sentences)
- scripture: Include a relevant Bible verse with reference (1-2 verses)
- pastoral_voice: Pastoral encouragement and wisdom (2-3 sentences)
- prayer: A heartfelt prayer addressing their specific need (3-4 sentences)
- declaration: A bold faith declaration (1-2 sentences)

Keep the total response warm, personal, and Spirit-filled. Always return valid JSON only.`,
        },
        {
          role: "user",
          content: prayerText,
        },
      ],
      temperature: 0.8,
      max_tokens: 1000,
    });

    const responseContent = completion.choices[0]?.message?.content;

    if (!responseContent) {
      throw new Error("No response from Pastor Hope");
    }

    let parsedResponse;
    try {
      parsedResponse = JSON.parse(responseContent);
    } catch (parseError) {
      console.error("Failed to parse Pastor Hope response:", parseError);
      throw new Error("Invalid response format from Pastor Hope");
    }

    // Validate all 6 required fields
    const requiredFields = [
      "greeting",
      "acknowledgement",
      "scripture",
      "pastoral_voice",
      "prayer",
      "declaration",
    ];
    const missingFields = requiredFields.filter(
      (field) => !parsedResponse[field]
    );

    if (missingFields.length > 0) {
      console.error("Missing fields:", missingFields);
      throw new Error(
        `Incomplete response from Pastor Hope. Missing: ${missingFields.join(", ")}`
      );
    }

    // Create full response text for database storage
    const fullResponse = `${parsedResponse.greeting}\n\n${parsedResponse.acknowledgement}\n\n${parsedResponse.scripture}\n\n${parsedResponse.pastoral_voice}\n\n${parsedResponse.prayer}\n\n${parsedResponse.declaration}`;

    // Save to Supabase (only if environment variables are available)
    try {
      if (
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      ) {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        );

        const { error } = await supabase.from("prayers").insert({
          prayer_text: prayerText,
          response_text: fullResponse,
        });

        if (error) {
          console.error("Supabase error:", error);
          // Don't throw - we still want to return the prayer response
        }
      }
    } catch (dbError) {
      console.error("Database save error:", dbError);
      // Don't throw - we still want to return the prayer response
    }

    return NextResponse.json({
      response: parsedResponse,
    });
  } catch (error: any) {
    console.error("Pastor Hope API error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate prayer response",
        details: error.message,
      },
      { status: 500 }
    );
  }
}