import { getAllCompanions } from '../data/companions';

export default function Onboarding({ onBegin }) {
  const companions = getAllCompanions();

  return (
    <div className="min-h-screen bg-amber-50/40 flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-400 mb-2">meet your companions</p>
          <h1 className="text-2xl font-semibold text-gray-800 mb-3">
            Each one represents a health domain
          </h1>
          <p className="text-gray-500">
            They'll ask how you're doing in their area. Answer honestly — there are no wrong answers.
          </p>
        </div>

        {/* Companion grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
          {companions.map((c) => (
            <div
              key={c.id}
              className="bg-white rounded-xl p-4 border border-gray-200 hover:border-gray-300 transition-colors"
            >
              <div className={`w-14 h-14 ${c.bgLight} rounded-xl flex items-center justify-center text-3xl mb-3`}>
                {c.emoji}
              </div>
              <h3 className="font-medium text-gray-800">{c.name}</h3>
              <p className="text-xs text-gray-400 mb-1">{c.animal}</p>
              <p className="text-xs text-gray-500">{c.domain}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
          <h3 className="font-medium text-gray-800 mb-4">How this works</h3>
          <div className="space-y-3 text-sm text-gray-600">
            <div className="flex gap-3">
              <span className="text-gray-400">1.</span>
              <span>Each companion asks a few questions about their domain</span>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-400">2.</span>
              <span>You'll see which companions are supporting you most right now</span>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-400">3.</span>
              <span>Get optional micro-quests to try (no pressure)</span>
            </div>
            <div className="flex gap-3">
              <span className="text-gray-400">4.</span>
              <span>Check in again next week to notice patterns</span>
            </div>
          </div>
        </div>

        {/* Dalton seed - subtle */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-8">
          <p className="text-sm text-gray-500 text-center">
            Each companion represents a part of your body and habits.
            Later, you can explore what's happening beneath the surface — if you're curious!
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={onBegin}
            className="px-8 py-4 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
          >
            Begin check-in
          </button>
          <p className="mt-4 text-xs text-gray-400">Takes about 5 minutes</p>
        </div>
      </div>
    </div>
  );
}
