type FeedbackScreenProps = {
  onResetLesson: () => void;
};

export function FeedbackScreen({ onResetLesson }: FeedbackScreenProps) {
  return (
    <main className="min-h-screen bg-gray-400 p-6">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-gray-200 mb-2">フィードバック</h1>

        <p className="text-gray-600 mb-6">1ルーティンが完了しました。お疲れさまでした。</p>

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
