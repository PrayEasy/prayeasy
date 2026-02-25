import { NextResponse } from "next/server";
import OpenAI from "openai";

// Lazy initialization to avoid build-time errors
function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  return new OpenAI({ apiKey });
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
    return NextResponse.json(parsed);
  } catch (error) {
    console.error("Pastor Hope API error:", error);
    return NextResponse.json(
      { error: "Failed to generate prayer response" },
      { status: 500 }
    );
  }
}