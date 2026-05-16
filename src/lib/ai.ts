export async function generateScenario() {
  return {
    patientText: "I'm a little nervous about this test.",
    patientJa: "この検査、少し緊張しています。",

    choices: [
      {
        label: "A",
        type: "説明する",
        text: "I understand. I'll explain everything step by step.",
        ja: "わかります。一つずつ説明しますね。",
      },

      {
        label: "B",
        type: "相手を確認する",
        text: "I see. Is there anything specific you're worried about?",
        ja: "そうなんですね。特に心配なことはありますか？",
      },
    ],
  };
}