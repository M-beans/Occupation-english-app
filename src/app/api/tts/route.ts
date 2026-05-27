import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const emotionVoiceInstructions = {
  neutral: "Speak naturally and clearly.",
  anxious: "Speak gently and a little nervous. Use short pauses.",
  pain: "Speak softly like a patient in pain. Add natural pauses.",
  relieved: "Speak calmly and sound relieved.",
  confused: "Sound unsure and slightly confused. Pause naturally.",
  embarrassed: "Sound a little shy and soft. A small laugh is okay.",
};

type Emotion = keyof typeof emotionVoiceInstructions;

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const text = body.text as string;
    const emotion = (body.emotion ?? "neutral") as Emotion;

    if (!text) {
      return NextResponse.json(
        { error: "Text is required" },
        { status: 400 }
      );
    }

    const instructions =
      emotionVoiceInstructions[emotion] ??
      emotionVoiceInstructions.neutral;

    const mp3 = await openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "marin",
      input: text,
      instructions,
    });

    const audioBuffer = Buffer.from(await mp3.arrayBuffer());

    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
      },
    });
  } catch (error) {
    console.error("TTS error:", error);

    return NextResponse.json(
      { error: "Failed to generate speech" },
      { status: 500 }
    );
  }
}