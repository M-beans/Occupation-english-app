import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST() {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-5.2",
      messages: [
        {
          role: "system",
          content:
            "You are an AI for a nurse English conversation app.",
        },
        {
          role: "user",
          content:
            "Create one patient message and two nurse reply choices for A2 level.",
        },
      ],
    });

    return Response.json({
      success: true,
      message: response.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);

    return Response.json({
      success: false,
      error: "AI generation failed",
    });
  }
}