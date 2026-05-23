import { scenarios } from "@/data/scenarios";
import type { AiScenario, Profile, ConversationNode } from "./types";

type ConversationScreenProps = {
  selectedScenario: (typeof scenarios)[number];
  currentNode: ConversationNode;
  profile: Profile;
  isLoading: boolean;
  aiScenario: AiScenario | null;
  onResetLesson: () => void;
  onChoiceSelect: (
    nextNodeId: string,
    selectedReply: string,
    selectedReplyJa: string
  ) => void;
};

export function ConversationScreen({
  selectedScenario,
  currentNode,
  profile,
  isLoading,
  aiScenario,
  onResetLesson,
  onChoiceSelect,
}: ConversationScreenProps) {
  return (
    <main className="min-h-screen bg-gray-400 p-6">
      <div className="mx-auto max-w-md">
        <button onClick={onResetLesson} className="mb-4 text-sm text-gray-800 hover:text-gray-700 transition">
          ← 戻る
        </button>

        <h1 className="text-2xl font-bold text-gray-200 mb-2">{selectedScenario.title}</h1>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-white text-gray-700 text-xs px-3 py-1 rounded-full shadow">👤{profile.name}</span>
          <span className="bg-white text-gray-700 text-xs px-3 py-1 rounded-full shadow">🏥 {profile.department}</span>
          <span className="bg-white text-gray-700 text-xs px-3 py-1 rounded-full shadow">📘 {profile.level}</span>
          <span className="bg-white text-gray-700 text-xs px-3 py-1 rounded-full shadow">💬 {profile.style}</span>
        </div>

        <p className="text-gray-600 mb-6">患者の英語を聞いて、返答を選びましょう。</p>

        <div className="space-y-4 mb-6">
          <div className="flex justify-start">
            <div className="max-w-[85%] bg-white rounded-3xl rounded-tl-md p-5 shadow">
              <p className="text-sm text-blue-600 font-bold mb-2">
                👨‍🦳 AI Patient
              </p>

              {isLoading ? (
                <>
                  <p
                    translate="no"
                      className="text-xl font-bold text-blue-300 animate-pulse mb-2"
                  >
                    ● ● ●
                  </p>

                  <p className="text-blue-300 animate-pulse">
                    ...
                  </p>
                </>
              ) : (
                <>
                  <p
                    translate="no"
                    className="text-xl font-bold text-gray-800 mb-2"
                  >
                    {aiScenario?.patient ?? currentNode.patientText}
                  </p>

                  <p className="text-gray-500">
                    {aiScenario?.patientJa ?? currentNode.patientJa}
                  </p>
                </>
                )}
            </div>
          </div>
        </div>

        <h2 className="text-lg font-bold text-gray-800 mb-3">返答を選択</h2>

        <div className="space-y-3">
          {currentNode.choices.map((choice) => {
            const displayedChoiceText =
              choice.label === "A"
                ? aiScenario?.choiceA ?? choice.text
                : aiScenario?.choiceB ?? choice.text;

            const displayedChoiceJa =
              choice.label === "A"
                ? aiScenario?.choiceAJa ?? choice.ja
                : aiScenario?.choiceBJa ?? choice.ja;

            return (
              <button
                key={choice.label}
                onClick={() =>
                onChoiceSelect(choice.nextNodeId, displayedChoiceText, displayedChoiceJa)
}
                disabled={isLoading}
                className="ml-10 w-[90%] text-left bg-sky-100 rounded-3xl rounded-tr-md p-5 shadow hover:bg-sky-200 transition border border-sky-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <div className="flex items-center justify-end gap-2 mb-2">
                  <span className="text-xs text-gray-500">{choice.type}</span>
                  <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-bold">
                    {choice.label}
                  </span>
                </div>

                <p translate="no" className="font-bold text-gray-800">
                  {isLoading ? "Generating response..." : displayedChoiceText}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {isLoading ? "生成中..." : displayedChoiceJa}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </main>
  );
}