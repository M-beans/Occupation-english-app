import { AiScenario, Profile } from "@/components/home/types";

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

  const data = await response.json();

  try {
    return JSON.parse(data.message);
  } catch (error) {
    console.error("JSON parse error:", error);
    console.error("AI raw message:", data.message);

    return {
      patient: "I’m sorry, could you help me?",
      choiceA: "Of course. I’ll help you.",
      choiceB: "Sure. What seems to be the problem?",
    };
  }
}
