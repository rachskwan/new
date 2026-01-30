export default function Onboarding({ onBegin }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-violet-50 flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-lg w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center gap-3 mb-6 text-4xl">
            <span className="animate-bounce" style={{ animationDelay: '0ms' }}>🐢</span>
            <span className="animate-bounce" style={{ animationDelay: '100ms' }}>🦋</span>
            <span className="animate-bounce" style={{ animationDelay: '200ms' }}>🦊</span>
            <span className="animate-bounce" style={{ animationDelay: '300ms' }}>🦉</span>
            <span className="animate-bounce" style={{ animationDelay: '400ms' }}>🐰</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Discover Your Health Type
          </h1>
          <p className="text-gray-500 text-lg">
            Answer 10 fun questions to find your wellness critter and personal health style.
          </p>
        </div>

        {/* What you'll discover */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-sm">
          <p className="text-sm text-gray-500 mb-4 text-center">You'll discover:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm">Your health archetype</span>
            <span className="px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm">Your critter guide</span>
            <span className="px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm">Your strengths</span>
            <span className="px-4 py-2 bg-rose-100 text-rose-700 rounded-full text-sm">Personalized tips</span>
          </div>
        </div>

        {/* Dalton seed - subtle */}
        <div className="bg-white/50 rounded-xl p-4 border border-gray-100 mb-8">
          <p className="text-sm text-gray-500 text-center">
            Your results can help you understand what's happening beneath the surface — if you're curious!
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={onBegin}
            className="px-8 py-4 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg"
          >
            Start the Quiz
          </button>
          <p className="mt-4 text-xs text-gray-400">Takes about 3 minutes</p>
        </div>
      </div>
    </div>
  );
}
