"use client";

import { useState } from "react";
import { scenarios } from "@/data/scenarios";

export default function Home() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(
    null
  );
  const [currentNodeId, setCurrentNodeId] = useState<string | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const selectedScenario = scenarios.find(
    (scenario) => scenario.id === selectedScenarioId
  );

  const currentNode =
    selectedScenario && currentNodeId
      ? selectedScenario.nodes[currentNodeId as keyof typeof selectedScenario.nodes]
      : null;

  function startScenario(scenarioId: string) {
    const scenario = scenarios.find((item) => item.id === scenarioId);

    if (!scenario) return;

    setSelectedScenarioId(scenario.id);
    setCurrentNodeId(scenario.startNodeId);
    setIsFinished(false);
  }

  function handleChoice(nextNodeId: string) {
    if (nextNodeId === "END") {
      setIsFinished(true);
      return;
    }

    setCurrentNodeId(nextNodeId);
  }

  function resetLesson() {
    setSelectedScenarioId(null);
    setCurrentNodeId(null);
    setIsFinished(false);
  }

  if (selectedScenario && isFinished) {
    return (
      <main className="min-h-screen bg-slate-100 p-6">
        <div className="mx-auto max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            フィードバック
          </h1>

          <p className="text-gray-600 mb-6">
            1ルーティンが完了しました。お疲れさまでした。
          </p>

          <div className="bg-white rounded-2xl p-5 shadow mb-4">
            <h2 className="font-bold text-blue-600 mb-2">今回のポイント</h2>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>患者に安心感を与える返答ができました。</li>
              <li>短く、やさしい英語で対応できています。</li>
              <li>次は発音と返答スピードを確認しましょう。</li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow mb-6">
            <h2 className="font-bold text-green-600 mb-2">復習フレーズ</h2>
            <p translate="no" className="font-bold text-gray-800">
              I’ll be looking after you until 5 PM.
            </p>
            <p className="text-gray-500 text-sm">
              午後5時まで担当しますね。
            </p>
          </div>

          <button
            onClick={resetLesson}
            className="w-full bg-blue-600 text-white rounded-xl p-4 font-bold"
          >
            シチュエーション選択に戻る
          </button>
        </div>
      </main>
    );
  }

  if (selectedScenario && currentNode) {
    return (
      <main className="min-h-screen bg-slate-100 p-6">
        <div className="mx-auto max-w-md">
          <button onClick={resetLesson} className="mb-4 text-blue-600">
            ← 戻る
          </button>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {selectedScenario.title}
          </h1>

          <p className="text-gray-600 mb-6">
            患者の英語を聞いて、返答を選びましょう。
          </p>

          <div className="bg-white rounded-2xl p-5 shadow mb-6">
            <p className="text-sm text-blue-600 font-bold mb-2">
              AI Patient
            </p>

            <p
              translate="no"
              className="text-xl font-bold text-gray-800 mb-2"
            >
              {currentNode.patientText}
            </p>

            <p className="text-gray-500">{currentNode.patientJa}</p>
          </div>

          <h2 className="text-lg font-bold text-gray-800 mb-3">
            返答を選択
          </h2>

          <div className="space-y-3">
            {currentNode.choices.map((choice) => (
              <button
                key={choice.label}
                onClick={() => handleChoice(choice.nextNodeId)}
                className="w-full text-left bg-white rounded-xl p-4 shadow hover:bg-blue-50 transition"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-bold">
                    {choice.label}
                  </span>
                  <span className="text-xs text-gray-500">{choice.type}</span>
                </div>

                <p translate="no" className="font-bold text-gray-800">
                  {choice.text}
                </p>

                <p className="text-sm text-gray-500 mt-1">{choice.ja}</p>
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">
          Nurse English App
        </h1>

        <p className="text-gray-600 mb-6">
          看護師向けAI英会話トレーニング
        </p>

        <h2 className="text-xl font-bold text-gray-800 mb-4">
          シチュエーションを選択
        </h2>

        <div className="space-y-4">
          {scenarios.map((item) => (
            <button
              key={item.id}
              onClick={() => startScenario(item.id)}
              className="w-full text-left bg-white rounded-2xl p-5 shadow hover:shadow-md transition"
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-gray-800">
                  {item.title}
                </h3>

                <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                  {item.level}
                </span>
              </div>

              <p className="text-gray-600 text-sm">{item.description}</p>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}