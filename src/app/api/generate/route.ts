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
      patientJa: { type: "string" },
      choiceA: { type: "string" },
      choiceAJa: { type: "string" },
      choiceB: { type: "string" },
      choiceBJa: { type: "string" },
      patientName: {  type: "string",},

      listeningKeywords: {
        type: "array",
        items: {
          type: "string",
        },
      } ,

      clinicalMeaning: {
        type: "string",
      },

      alternativePhrase: {
        type: "string",
      },

      alternativePhraseJa: {
        type: "string",
      },
    },
    required: [
      "patient",
      "patientJa",
      "choiceA",
      "choiceAJa",
      "choiceB",
      "choiceBJa",
      "listeningKeywords",
      "clinicalMeaning",
      "alternativePhrase",
      "alternativePhraseJa",
      "patientName",
    ],
  },
} as const;

function parseScenario(content: string | null): AiScenario | null {
  if (!content) return null;

  try {
    const parsed = JSON.parse(content) as unknown;

    if (!parsed || typeof parsed !== "object") return null;

    const scenario = parsed as Record<string, unknown>;

    if (
      typeof scenario.patientName !== "string" ||
      typeof scenario.patient !== "string" ||
      typeof scenario.patientJa !== "string" ||
      typeof scenario.choiceA !== "string" ||
      typeof scenario.choiceAJa !== "string" ||
      typeof scenario.choiceB !== "string" ||
      typeof scenario.choiceBJa !== "string" ||
      typeof scenario.alternativePhrase !== "string" ||
      typeof scenario.alternativePhraseJa !== "string" ||

      !Array.isArray(scenario.listeningKeywords) ||
      scenario.listeningKeywords.some((item) => typeof item !== "string") ||
      typeof scenario.clinicalMeaning !== "string"
    ) {
      return null;
    }

    return {
      patientName: scenario.patientName,
      patient: scenario.patient,
      choiceA: scenario.choiceA,
      choiceB: scenario.choiceB,
      patientJa: scenario.patientJa,
      choiceAJa: scenario.choiceAJa,
      choiceBJa: scenario.choiceBJa,

      listeningKeywords: scenario.listeningKeywords,
      clinicalMeaning: scenario.clinicalMeaning,
      alternativePhrase: scenario.alternativePhrase,
      alternativePhraseJa: scenario.alternativePhraseJa,
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
            `You are an AI for a nurse English conversation app.
              Generate natural patient or family speech for a hospital situation.
            The patient line should NOT sound like a textbook sentence.
            Use natural spoken English with mild emotion.

            Include 1 or 2 of the following when appropriate:
            - Uh...
            - Oh...
            - Ah...
            - short pauses (...)
            - slight self-correction
            - small laugh like "haha" only when natural

            The emotion should match the situation:
            - anxious
            - pain
            - confused
            - relieved
            - embarrassed

            Do not overuse fillers.
            choiceA must be nurse explanation/guidance.
            choiceB must be nurse checking/question.`  
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

            Conversation history:
${JSON.stringify(
  conversationContext?.conversationHistory ?? [],
  null,
  2
)}

${scenarioTitle}

Instruction:

Instruction:
If previous patient message and selected nurse reply exist, continue the conversation. Do not restart from the first greeting.
- Continue naturally from the conversation history
- Do not restart the conversation
- Keep consistency with previous turns
- Continue naturally from the conversation history.
- Do not restart the conversation.
- Do not ask again for information already covered.
- Keep consistency with previous nurse instructions.

${scenarioTitle}

Requirements:
- natural spoken English
- A2-B1 level
- nurse conversation
- choiceA = explanation/guide style nurse reaction
- choiceB = checking/question style nurse reaction
- patient must be a patient or patient's family member voice
- Generate a natural patient first name when appropriate
- Use common English-speaking names
- Do not use the nurse's name as the patient name
- Patients and family members should introduce themselves naturally if needed, but do not force an introduction in every scenario.
- If the nurse already knows the patient, avoid repeated self-introductions.
- patient must not include nurse speech
- Do not use the user's name as the patient name.
- The user's name is the nurse's name.
- Continue logically from the selected nurse reply.
- Do not contradict the selected nurse reply.
- If the nurse told the patient to stay seated, the next patient message should respond to that instruction.
- keep each line concise for quick mobile selection
- listeningKeywords must contain exactly 2 important words or short phrases from the patient message
- listeningKeywords should help nurses understand the situation quickly
- clinicalMeaning should explain the clinical situation briefly in Japanese
- alternativePhrase must be a rephrased version of either choiceA or choiceB
- alternativePhrase must keep the same meaning as the nurse reply choices
- alternativePhrase must not introduce a new action, new instruction, or new topic
- alternativePhrase should be shorter and easier to say than the original choice
- alternativePhraseJa should be a natural Japanese translation of alternativePhrase
- Do not repeat the same question that the nurse already asked.
- If the nurse asked about food, time, pain, or symptoms, the next patient message should answer that question.
- The patient message should add one new detail, not ask the same thing again.
- Do not make choiceA and choiceB ask the exact same question as the previous nurse reply.

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
