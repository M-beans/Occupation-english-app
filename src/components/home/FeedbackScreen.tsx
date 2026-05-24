import type { AiScenario } from "./types";

type FeedbackScreenProps = {
  onResetLesson: () => void;
  aiScenario: AiScenario | null;
  firstSelectedReply: string;
  firstSelectedReplyJa: string;
};

export function FeedbackScreen({ 
  onResetLesson, 
  aiScenario,
  firstSelectedReply,
  firstSelectedReplyJa 
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
              {firstSelectedReply || "No phrase selected."}
            </p>
            <p className="text-gray-500 text-sm mt-1">{firstSelectedReplyJa || "日本語訳はありません。"}</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow border-l-4 border-green-500">
            <p className="text-sm font-bold text-green-600 mb-2">別の言い方</p>
            <p translate="no" className="font-bold text-gray-800 text-lg">
              {aiScenario?.alternativePhrase}
            </p>
            <p className="text-gray-500 text-sm mt-1">{aiScenario?.alternativePhraseJa || "日本語訳はありません。"}</p>
          </div>
        </div>

        <a
          href="https://forms.gle/9N5w8SHTs9tvAK4J6"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-white border border-blue-300 text-blue-600 rounded-xl p-4 font-bold text-center mb-4 hover:bg-blue-50 transition"
        >
          β版アンケートに答える（約3分）
        </a>

        <a
          href="https://あなたのLPのURL"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-white border border-slate-300 text-slate-700 rounded-xl p-4 font-bold text-center mb-4 hover:bg-slate-50 transition"
        >
          公式ページに戻る
        </a>
        
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
