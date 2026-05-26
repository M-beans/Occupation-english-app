import { AiScenario, Profile } from "@/components/home/types";

type GenerateScenarioApiResponse = {
  success: boolean;
  scenario?: AiScenario;
  error?: string;
};

const fallbackScenario: AiScenario = {
  patientName: "Patient",
  patient: "I’m sorry, could you help me?",
  patientJa: "すみません、助けていただけますか？",
  choiceA: "Of course. I’ll help you.",
  choiceAJa: "もちろんです。お手伝いします。",
  choiceB: "Sure. What seems to be the problem?",
  choiceBJa: "はい。何が起きているか教えてください。",
  listeningKeywords: ["help", "problem"],
  clinicalMeaning: "患者が支援を求めている状態です。",
  alternativePhrase: "I’ll take care of you today.",
  alternativePhraseJa: "今日、担当しますね。",

};

function isAiScenario(value: unknown): value is AiScenario {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.patient === "string" &&
    typeof candidate.patientJa === "string" &&
    typeof candidate.choiceA === "string" &&
    typeof candidate.choiceAJa === "string" &&
    typeof candidate.choiceB === "string" &&
    typeof candidate.choiceBJa === "string" &&
    Array.isArray(candidate.listeningKeywords) &&
    candidate.listeningKeywords.every((item) => typeof item === "string") &&
    typeof candidate.clinicalMeaning === "string" &&
    typeof candidate.alternativePhrase === "string" &&
    typeof candidate.alternativePhraseJa === "string"
  );
}

  export const emotionVoiceInstructions = {
    neutral:
      "Speak naturally and clearly.",

    anxious:
      "Speak gently and a little nervous. Use short pauses.",

    pain:
      "Speak softly like a patient in pain. Add natural pauses.",

    relieved:
      "Speak calmly and sound relieved.",

    confused:
      "Sound unsure and slightly confused. Pause naturally.",

    embarrassed:
      "Sound a little shy and soft. A small laugh is okay."
  };

  export async function generateScenario(
    profile: Profile,
    scenarioTitle: string,
    conversationContext?: {
      conversationHistory: {
        role: "patient" | "nurse";
        text: string;
      }[];
    }
  ): Promise<AiScenario> {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      profile,
      scenarioTitle,
      conversationContext,
    }),
  });

  const data = (await response.json()) as GenerateScenarioApiResponse;

  if (!response.ok || !data.success || !isAiScenario(data.scenario)) {
    console.error("AI scenario response error:", data.error ?? "invalid scenario");
    return fallbackScenario;
  }

  return data.scenario;
}
