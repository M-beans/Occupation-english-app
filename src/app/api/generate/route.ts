import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { profile, scenarioTitle, conversationContext } = await req.json();

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

          content: `
Return JSON only.

{
  "patient": "...",
  "choiceA": "...",
  "choiceB": "..."
}

User profile:
Name: ${profile.name}
Department: ${profile.department}
English level: ${profile.level}
Style: ${profile.style}

Scenario:
Previous patient message:
${conversationContext?.previousPatient ?? "None"}

Selected nurse reply:
${conversationContext?.selectedReply ?? "None"}

Instruction:
If previous patient message and selected nurse reply exist, continue the conversation. Do not restart from the first greeting.

${scenarioTitle}

Requirements:
- natural spoken English
- A2-B1 level
- nurse conversation
- choiceA = explanation style
- choiceB = checking/question style
`,
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