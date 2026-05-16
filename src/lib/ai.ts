export async function generateScenario() {
  const response = await fetch("/api/generate", {
    method: "POST",
  });

  const data = await response.json();

  return data;
}