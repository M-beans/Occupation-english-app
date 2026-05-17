import { Profile } from "./types";

type SetupScreenProps = {
  profile: Profile;
  onProfileChange: (profile: Profile) => void;
  onCompleteSetup: () => void;
};

export function SetupScreen({
  profile,
  onProfileChange,
  onCompleteSetup,
}: SetupScreenProps) {
  return (
    <main className="min-h-screen bg-gray-400 p-6">
      <div className="mx-auto max-w-md">
        <h1 className="text-3xl font-bold text-blue-700 mb-2">Nurse English App</h1>

        <p className="text-gray-700 mb-6">まずは学習プロフィールを設定しましょう。</p>

        <div className="bg-white rounded-3xl p-6 shadow space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">名前 (ニックネーム可)</label>
            <input
              value={profile.name}
              onChange={(e) => onProfileChange({ ...profile, name: e.target.value })}
              className="w-full rounded-xl border border-gray-300 p-3"
              placeholder="例：Yuki"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">診療科</label>
            <select
              value={profile.department}
              onChange={(e) => onProfileChange({ ...profile, department: e.target.value })}
              className="w-full rounded-xl border border-gray-300 p-3"
            >
              <option>循環器科</option>
              <option>小児科</option>
              <option>救急</option>
              <option>内科</option>
              <option>外科</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">英語レベル (CEFR)</label>
            <select
              value={profile.level}
              onChange={(e) => onProfileChange({ ...profile, level: e.target.value })}
              className="w-full rounded-xl border border-gray-300 p-3"
            >
              <option>A2</option>
              <option>B1</option>
              <option>B2</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">会話スタイル</label>
            <select
              value={profile.style}
              onChange={(e) => onProfileChange({ ...profile, style: e.target.value })}
              className="w-full rounded-xl border border-gray-300 p-3"
            >
              <option>Work</option>
              <option>Casual</option>
            </select>
          </div>

          <button
            onClick={onCompleteSetup}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-4 font-bold transition"
          >
            次へ
          </button>
        </div>
      </div>
    </main>
  );
}
