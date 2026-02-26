import { NextResponse } from "next/server";
import OpenAI from "openai";

export const dynamic = "force-dynamic";

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) throw new Error("OPENAI_API_KEY is not configured");
  return new OpenAI({ apiKey });
}

const SYSTEM_PROMPT = `You are a compassionate and deeply knowledgeable biblical scholar and pastor named Pastor Hope.
Provide rich, Spirit-led scripture exploration.

When given a THEME, find 3-4 relevant scripture passages that address that theme.
When given a VERSE REFERENCE, explore that specific passage in depth.

Always respond ONLY as valid JSON with the following structure:
{
  "title": "Short, compelling title for this scripture study (max 10 words)",
  "introduction": "1-2 sentence overview of the theme or passage (warm, pastoral tone)",
  "verses": [
    {
      "reference": "Book Chapter:Verse (always numeric format, e.g. John 3:16)",
      "text": "The actual scripture text (ESV or NIV translation)",
      "insight": "1-2 sentence pastoral insight on why this verse matters for this topic"
    }
  ],
  "deepDive": "3-4 sentences of deeper theological/historical context and application for today's believer",
  "relatedThemes": ["theme1", "theme2", "theme3"],
  "prayerApplication": "A 2-3 sentence prayer prompt applying this scripture to daily life"
}

Rules:
- ALWAYS use NUMERIC Bible references (e.g. Philippians 4:6-7, NOT 'four, verse six')
- Keep verse text accurate to known scripture
- Be warm, pastoral, and Spirit-led in tone
- relatedThemes should be 3-4 single words or short phrases
- Respond with raw JSON only. No markdown, no code blocks.`;

export async function POST(req: Request) {
  const encoder = new TextEncoder();

  try {
    const body = await req.json();
    const { mode, query } = body ?? {};

    if (!query?.trim()) {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json({ error: "OpenAI API key not configured" }, { status: 500 });
    }

    const client = getOpenAIClient();

    const userMessage = mode === "verse"
      ? `Please do a deep dive on this Bible passage: ${query}. Explore the text, context, and application.`
      : `Find and explore scriptures about the theme: "${query}". Provide 3-4 key passages with insights.`;

    const stream = new ReadableStream({
      async start(controller) {
        let buffer = "";
        let partialRead = "";
        try {
          const completion = await client.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: SYSTEM_PROMPT },
              { role: "user", content: userMessage },
            ],
            temperature: 0.75,
            response_format: { type: "json_object" },
            stream: true,
          });

          for await (const chunk of completion) {
            const delta = chunk?.choices?.[0]?.delta?.content ?? "";
            buffer += delta;

            // Stream progress updates
            const progressData = JSON.stringify({ status: "processing", message: "Searching scripture" });
            controller.enqueue(encoder.encode(`data: ${progressData}\n\n`));
          }

          // Parse the complete JSON
          let parsed: object;
          try {
            parsed = JSON.parse(buffer);
          } catch {
            throw new Error("Failed to parse scripture response");
          }

          const finalData = JSON.stringify({ status: "completed", result: parsed });
          controller.enqueue(encoder.encode(`data: ${finalData}\n\n`));
          controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
        } catch (error) {
          const errMessage = error instanceof Error ? error?.message ?? "Unknown error" : "Unknown error";
          const errData = JSON.stringify({ status: "error", message: errMessage });
          controller.enqueue(encoder.encode(`data: ${errData}\n\n`));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });
  } catch (error) {
    console.error("Bible API error:", error);
    return NextResponse.json({ error: "Bible search failed" }, { status: 500 });
  }
}
