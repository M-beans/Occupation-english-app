import { scenarios } from "@/data/scenarios";

type ScenarioSelectionScreenProps = {
  onBackToProfile: () => void;
  onStartScenario: (scenarioId: string) => void;
  isStartingScenario: boolean;
};

export function ScenarioSelectionScreen({
  onBackToProfile,
  onStartScenario,
  isStartingScenario,
}: ScenarioSelectionScreenProps) {
  return (
    <main className="min-h-screen bg-gray-400 p-6">
      <div className="mx-auto max-w-md">
        <h1 className="text-3xl font-bold text-blue-600 mb-2">Nurse English App</h1>

        <p className="text-gray-600 mb-6">看護師向けAI英会話トレーニング</p>

        <button onClick={onBackToProfile} className="mb-4 text-sm text-gray-700 hover:text-gray-900 transition">
          ← プロフィールに戻る
        </button>
          {isStartingScenario && (
          <div className="bg-white rounded-2xl p-4 shadow mb-4 text-sky-500 font-bold animate-pulse">
            AI会話を準備中...
          </div>
      )}

        <h2 className="text-xl font-bold text-gray-800 mb-4">
          シチュエーションを選択
        </h2>

        <div className="space-y-4">
          {scenarios.map((item) => (
            <button
              key={item.id}
              onClick={() => onStartScenario(item.id)}
              className="w-full text-left bg-white rounded-3xl p-5 shadow-md hover:shadow-xl transition border border-slate-100"
              disabled={isStartingScenario}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center text-4xl">{item.image}</div>

                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>

                    <span className="text-xs bg-blue-100 text-blue-600 px-3 py-1 rounded-full">{item.level}</span>
                  </div>

                  <p className="text-gray-600 text-sm">{item.description}</p>

                  <p className="text-xs text-gray-400 mt-2">約3分トレーニング</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
