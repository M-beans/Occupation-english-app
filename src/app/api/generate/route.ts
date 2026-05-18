import OpenAI from "openai";
import type { AiScenario } from "@/components/home/types";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const scenarioJsonSchema = {
  name: "nurse_conversation_scenario",
  strict: true,
  schema: {
    type: "object",
    additionalProperties: false,
    properties: {
      patient: { type: "string" },
      choiceA: { type: "string" },
      choiceB: { type: "string" },
    },
    required: ["patient", "choiceA", "choiceB"],
  },
} as const;

function parseScenario(content: string | null): AiScenario | null {
  if (!content) return null;

  try {
    const parsed = JSON.parse(content) as unknown;

    if (!parsed || typeof parsed !== "object") return null;

    const scenario = parsed as Record<string, unknown>;

    if (
      typeof scenario.patient !== "string" ||
      typeof scenario.choiceA !== "string" ||
      typeof scenario.choiceB !== "string"
    ) {
      return null;
    }

    return {
      patient: scenario.patient,
      choiceA: scenario.choiceA,
      choiceB: scenario.choiceB,
    };
  } catch (error) {
    console.error("Structured output parse failed:", error);
    return null;
  }
}

export async function POST(req: Request) {
  try {
    const { profile, scenarioTitle, conversationContext } = await req.json();

    const response = await client.chat.completions.create({
      model: "gpt-5.2",
      response_format: {
        type: "json_schema",
        json_schema: scenarioJsonSchema,
      },
      messages: [
        {
          role: "system",
          content:
            "You are an AI for a nurse English conversation app. Generate only patient/family lines for patient. choiceA must be nurse explanation/guidance. choiceB must be nurse checking/question.",
        },
        {
          role: "user",
          content: `
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
- choiceA = explanation/guide style nurse reaction
- choiceB = checking/question style nurse reaction
- patient must be a patient or patient's family member voice
- patient must not include nurse speech
- keep each line concise for quick mobile selection
`,
        },
      ],
    });

    const scenario = parseScenario(response.choices[0].message.content);

    if (!scenario) {
      return Response.json(
        {
          success: false,
          error: "Failed to parse scenario",
        },
        { status: 502 }
      );
    }

    return Response.json({
      success: true,
      scenario,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        error: "AI generation failed",
      },
      { status: 500 }
    );
  }
}
