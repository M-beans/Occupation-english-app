import { AiScenario, Profile } from "@/components/home/types";

type GenerateScenarioApiResponse = {
  success: boolean;
  scenario?: AiScenario;
  error?: string;
};

const fallbackScenario: AiScenario = {
  patient: "I’m sorry, could you help me?",
  patientJa: "すみません、助けていただけますか？",
  choiceA: "Of course. I’ll help you.",
  choiceAJa: "もちろんです。お手伝いします。",
  choiceB: "Sure. What seems to be the problem?",
  choiceBJa: "はい。何が起きているか教えてください。",
  listeningKeywords: ["help", "problem"],
  clinicalMeaning: "患者が支援を求めている状態です。",
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
    typeof candidate.clinicalMeaning === "string"
  );
}

export async function generateScenario(
  profile: Profile,
  scenarioTitle: string,
  conversationContext?: {
    previousPatient: string;
    selectedReply: string;
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
