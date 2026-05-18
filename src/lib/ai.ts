import { AiScenario, Profile } from "@/components/home/types";

type GenerateScenarioApiResponse = {
  success: boolean;
  scenario?: AiScenario;
  error?: string;
};

const fallbackScenario: AiScenario = {
  patient: "I’m sorry, could you help me?",
  choiceA: "Of course. I’ll help you.",
  choiceB: "Sure. What seems to be the problem?",
};

function isAiScenario(value: unknown): value is AiScenario {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Record<string, unknown>;

  return (
    typeof candidate.patient === "string" &&
    typeof candidate.choiceA === "string" &&
    typeof candidate.choiceB === "string"
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
