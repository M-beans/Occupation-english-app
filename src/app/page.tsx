"use client";

import { useState } from "react";
import { scenarios } from "@/data/scenarios";

export default function Home() {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string | null>(null);
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
      <main className="min-h-screen bg-gray-400 p-6">
        <div className="mx-auto max-w-md">
          <h1 className="text-2xl font-bold text-gray-200 mb-2">
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

          <div className="space-y-4 mb-6">
            <div className="bg-white rounded-2xl p-5 shadow border-l-4 border-blue-500">
              <p className="text-sm font-bold text-blue-600 mb-2">
                今日の重要表現
              </p>
              <p translate="no" className="font-bold text-gray-800 text-lg">
                I’ll be looking after you today.
              </p>
              <p className="text-gray-500 text-sm mt-1">
                今日、担当しますね。
              </p>
            </div>

            <div className="bg-white rounded-2xl p-5 shadow border-l-4 border-green-500">
              <p className="text-sm font-bold text-green-600 mb-2">
                別の言い方
              </p>
              <p translate="no" className="font-bold text-gray-800 text-lg">
                I’ll take care of you today.
              </p>
              <p className="text-gray-500 text-sm mt-1">
                今日お世話しますね。
              </p>
            </div>
          </div>

          <button
            onClick={resetLesson}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-4 font-bold transition"
          >
            シチュエーション選択に戻る
          </button>
        </div>
      </main>
    );
  }

  if (selectedScenario && currentNode) {
    return (
      <main className="min-h-screen bg-gray-400 p-6">
        <div className="mx-auto max-w-md">
          <button onClick={resetLesson} className="mb-4 text-sm text-gray-800S hover:text-gray-700 transition">
            ← 戻る
          </button>

          <h1 className="text-2xl font-bold text-gray-200 mb-2">
            {selectedScenario.title}
          </h1>

          <p className="text-gray-600 mb-6">
            患者の英語を聞いて、返答を選びましょう。
          </p>

          <div className="space-y-4 mb-6">

  {/* AI Patient */}
  <div className="flex justify-start">
    <div className="max-w-[85%] bg-white rounded-3xl rounded-tl-md p-5 shadow">
      <p className="text-sm text-blue-600 font-bold mb-2">
        👨‍🦳 AI Patient
      </p>

      <p
        translate="no"
        className="text-xl font-bold text-gray-800 mb-2"
      >
        {currentNode.patientText}
      </p>

      <p className="text-gray-500">
        {currentNode.patientJa}
      </p>
    </div>
  </div>

  </div>

          <h2 className="text-lg font-bold text-gray-800 mb-3">
            返答を選択
          </h2>

          <div className="space-y-3">
            {currentNode.choices.map((choice) => (
              <button
                key={choice.label}
                onClick={() => handleChoice(choice.nextNodeId)}
                className="ml-10 w-[90%] text-left bg-sky-100 rounded-3xl rounded-tr-md p-5 shadow hover:bg-sky-200 transition border border-sky-200"
              >
                <div className="flex items-center justify-end gap-2 mb-2">
                  <span className="text-xs text-gray-500">{choice.type}</span>
                  <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-bold">
                    {choice.label}
                  </span>
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
    <main className="min-h-screen bg-gray-400 p-6">
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
              className="w-full text-left bg-white rounded-3xl p-5 shadow-md hover:shadow-xl transition border border-slate-100"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-4xl">
                  {item.image}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800">
                      {item.title}
                    </h3>

                    <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                      {item.level}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm">{item.description}</p>

                  <p className="text-xs text-gray-400 mt-2">
                    約3分トレーニング
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}