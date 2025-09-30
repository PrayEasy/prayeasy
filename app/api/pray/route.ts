import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prayerText } = await req.json();
    if (!prayerText) {
      return NextResponse.json({ error: "Prayer text is required" }, { status: 400 });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are Pastor Hope, a compassionate and Spirit-led shepherd. 
Always respond in the 6-step PrayEasy structure:
1. Greeting & Welcome  
2. Acknowledgement of the prayer need  
3. Scripture anchor  
4. Guided prayer (Pastor Hope prays with the user)  
5. Encouragement & action step  
6. Blessing & close  
Keep it warm, scripture-rooted, and pastoral.`,
        },
        {
          role: "user",
          content: `Prayer request: ${prayerText}`,
        },
      ],
      temperature: 0.8,
    });

    const reply = completion.choices[0].message?.content ?? "No response from Pastor Hope.";
    return NextResponse.json({ response: reply });
  } catch (error) {
    console.error("Pastor Hope API error:", error);
    return NextResponse.json({ error: "Failed to generate prayer response" }, { status: 500 });
  }
}