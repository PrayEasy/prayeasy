import { NextResponse } from "next/server";
import OpenAI from "openai";
import { supabase } from "@/lib/supabase";

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
      response_format: { type: "json_object" },
    });

    const message = completion.choices[0].message?.content;

    if (!message) {
      return NextResponse.json(
        { error: "No response from Pastor Hope" },
        { status: 500 }
      );
    }

    const parsed = JSON.parse(message);

    // Save to Supabase database
    try {
      const responseText = `${parsed.greeting}\n\n${parsed.acknowledgement}\n\n${parsed.scripture}\n\n${parsed.pastoral_voice}\n\n${parsed.prayer}\n\n${parsed.declaration}`;
      
      await supabase.from('prayers').insert({
        prayer_text: prayerText,
        response_text: responseText
      });
    } catch (dbError) {
      console.error('Database save failed:', dbError);
      // Continue anyway - user still gets their response
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