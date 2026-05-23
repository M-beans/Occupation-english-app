type LoadingScreenProps = {
  scenarioTitle: string;
};

export function LoadingScreen({
  scenarioTitle,
}: LoadingScreenProps) {
  return (
    <main className="min-h-screen bg-gray-400 flex items-center justify-center p-6">
      <div className="text-center">
        <div className="text-7xl mb-6">
          👨‍🦳
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">
          Ready to meet your next patient?
        </h1>

        <p className="text-sky-100 mb-8">
          Preparing: {scenarioTitle}
        </p>

        <div className="text-sky-200 text-3xl animate-pulse">
          ● ● ●
        </div>
      </div>
    </main>
  );
}