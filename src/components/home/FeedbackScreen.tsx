import type { AiScenario } from "./types";

type FeedbackScreenProps = {
  onResetLesson: () => void;
  aiScenario: AiScenario | null;
};

export function FeedbackScreen({ 
  onResetLesson, 
  aiScenario 
}: FeedbackScreenProps) 
{
  return (
    <main className="min-h-screen bg-gray-400 p-6">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-gray-200 mb-2">フィードバック</h1>

        <p className="text-gray-600 mb-6">1ルーティンが完了しました。お疲れさまでした。</p>

        <div className="bg-white rounded-2xl p-5 shadow mb-4">
          <h2 className="font-bold text-blue-600 mb-3">
            聞き取りキーワード
          </h2>

          <div className="flex gap-2 mb-3 flex-wrap">
            {aiScenario?.listeningKeywords.map((keyword) => (
              <span
                key={keyword}
                className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm font-bold"
              >
                {keyword}
              </span>
            ))}
          </div>

          <h2 className="font-bold text-blue-600 mb-2">
            現場での意味
          </h2>

          <p className="text-gray-700">
            {aiScenario?.clinicalMeaning}
          </p>
        </div> 

        <div className="space-y-4 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow border-l-4 border-blue-500">
            <p className="text-sm font-bold text-blue-600 mb-2">今日の重要表現</p>
            <p translate="no" className="font-bold text-gray-800 text-lg">
              I’ll be looking after you today.
            </p>
            <p className="text-gray-500 text-sm mt-1">今日、担当しますね。</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow border-l-4 border-green-500">
            <p className="text-sm font-bold text-green-600 mb-2">別の言い方</p>
            <p translate="no" className="font-bold text-gray-800 text-lg">
              I’ll take care of you today.
            </p>
            <p className="text-gray-500 text-sm mt-1">今日お世話しますね。</p>
          </div>
        </div>

        <button
          onClick={onResetLesson}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-4 font-bold transition"
        >
          シチュエーション選択に戻る
        </button>
      </div>
    </main>
  );
}
