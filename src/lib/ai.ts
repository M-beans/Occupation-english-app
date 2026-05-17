export async function generateScenario(
  profile: any,
  scenarioTitle: string,
  conversationContext?: any
) {
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

  const parsed = JSON.parse(data.message);

  return parsed;
}