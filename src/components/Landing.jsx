import { getAllCompanions } from '../data/companions';

export default function Landing({ onStart, onCheckForest, onLogin }) {
  const companions = getAllCompanions();

  return (
    <div className="min-h-screen bg-amber-50/40 flex flex-col items-center justify-center px-6 py-12">
      {/* Floating companions in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {companions.map((c, i) => (
          <div
            key={c.id}
            className="absolute text-4xl opacity-20 animate-pulse"
            style={{
              top: `${15 + (i * 12)}%`,
              left: `${10 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.3}s`
            }}
          >
            {c.emoji}
          </div>
        ))}
      </div>

      <div className="relative max-w-lg text-center">
        {/* Header */}
        <p className="text-sm text-gray-400 mb-4">~ a gentle weekly practice ~</p>

        <h1 className="text-3xl font-semibold text-gray-800 mb-3">
          Your Health Check-In
        </h1>

        <p className="text-xl text-gray-500 mb-6">
          A snapshot, not a test
        </p>

        {/* Description */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          Meet your companion crew for this week. They're here to notice how you're doing
          across different parts of your wellbeing — no scores, no judgment, just gentle reflection.
        </p>

        {/* Companion preview */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {companions.map((c) => (
            <div
              key={c.id}
              className={`w-14 h-14 ${c.bgLight} rounded-xl flex items-center justify-center text-2xl border border-gray-200 hover:scale-105 transition-transform`}
              title={`${c.name} the ${c.animal}`}
            >
              {c.emoji}
            </div>
          ))}
        </div>

        {/* Companion names */}
        <p className="text-sm text-gray-400 mb-8">
          {companions.map((c, i) => (
            <span key={c.id}>
              {c.name}
              {i < companions.length - 1 ? ' · ' : ''}
            </span>
          ))}
        </p>

        {/* CTAs */}
        <div className="space-y-3">
          <button
            onClick={onStart}
            className="w-full px-8 py-4 bg-gray-900 text-white text-lg font-medium rounded-xl hover:bg-gray-800 transition-colors"
          >
            Start your first check-in
          </button>

          {/* Return user CTA */}
          <button
            onClick={onCheckForest}
            className="w-full px-8 py-4 bg-emerald-50 text-emerald-800 font-medium rounded-xl border border-emerald-200 hover:bg-emerald-100 transition-colors flex items-center justify-center gap-2"
          >
            <span>🌲</span>
            Check your forest
          </button>
        </div>

        {/* Disclaimer */}
        <p className="mt-8 text-xs text-gray-400 max-w-sm mx-auto">
          This reflects habits & experiences — it's not medical advice.
          Just a space for self-reflection.
        </p>
      </div>
    </div>
  );
}
