import { useState } from 'react';
import { getCompanion } from '../data/companions';
import { getCommunityPattern, communityStats } from '../data/communityData';

export default function CommunityInsights({ priorityCompanions, onTryQuest }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [addedQuests, setAddedQuests] = useState([]);
  const [showAddedFeedback, setShowAddedFeedback] = useState(null);

  // Show community patterns for the user's priority companions
  const patterns = priorityCompanions.map(c => ({
    companion: c,
    pattern: getCommunityPattern(c.id)
  }));

  const current = patterns[currentIndex];

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? patterns.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === patterns.length - 1 ? 0 : prev + 1));
  };

  const handleAddQuest = (action, companionId) => {
    const questKey = `${companionId}-${action}`;
    if (addedQuests.includes(questKey)) return;

    setAddedQuests(prev => [...prev, questKey]);
    setShowAddedFeedback(questKey);

    // Show feedback briefly
    setTimeout(() => setShowAddedFeedback(null), 2000);

    if (onTryQuest) {
      onTryQuest(action, companionId);
    }
  };

  if (!current) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-gray-800">You're not alone</h3>
            <p className="text-sm text-gray-500">See what others are doing</p>
          </div>
          <div className="text-xs text-gray-400">
            {communityStats.activeThisWeek} active this week
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div className={`${current.companion.bgLight} p-5`}>
        {/* Companion header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">
            {current.companion.emoji}
          </div>
          <div>
            <h4 className="font-medium text-gray-800">{current.companion.name} the {current.companion.animal}</h4>
            <p className="text-sm text-gray-600">{current.pattern.helpingCount} helping this week</p>
          </div>
        </div>

        {/* Fun fact speech bubble */}
        <div className="bg-white rounded-lg p-3 mb-4 relative">
          <div className="absolute -top-2 left-6 w-4 h-4 bg-white transform rotate-45"></div>
          <p className="text-sm text-gray-600 italic relative z-10">
            "{current.pattern.funFact}"
          </p>
        </div>

        {/* Popular actions - tappable */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">What friends are trying (tap to add):</p>
          <div className="space-y-2">
            {current.pattern.popularActions.map((action, i) => {
              const questKey = `${current.companion.id}-${action}`;
              const isAdded = addedQuests.includes(questKey);
              const justAdded = showAddedFeedback === questKey;

              return (
                <button
                  key={i}
                  onClick={() => handleAddQuest(action, current.companion.id)}
                  disabled={isAdded}
                  className={`w-full text-left flex items-center gap-2 text-sm px-3 py-2 rounded-lg transition-all ${
                    isAdded
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-white/50 text-gray-700 hover:bg-white active:scale-98'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs transition-all ${
                    isAdded ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {isAdded ? '✓' : '+'}
                  </span>
                  <span className="flex-1">{action}</span>
                  {justAdded && (
                    <span className="text-xs text-emerald-600 animate-pulse">Added!</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Try this CTA */}
        {(() => {
          const trendingKey = `${current.companion.id}-${current.pattern.trendingQuest}`;
          const isTrendingAdded = addedQuests.includes(trendingKey);
          return (
            <button
              onClick={() => handleAddQuest(current.pattern.trendingQuest, current.companion.id)}
              disabled={isTrendingAdded}
              className={`w-full text-sm font-medium py-3 px-4 rounded-lg border transition-all ${
                isTrendingAdded
                  ? 'bg-emerald-100 border-emerald-200 text-emerald-700'
                  : 'bg-white text-gray-800 border-gray-200 hover:border-gray-300'
              }`}
            >
              {isTrendingAdded ? (
                <span className="flex items-center justify-center gap-2">
                  <span>✓</span> Added to your quests!
                </span>
              ) : (
                <span>Try this too: {current.pattern.trendingQuest}</span>
              )}
            </button>
          );
        })()}
      </div>

      {/* Navigation */}
      <div className="px-5 py-3 flex items-center justify-between bg-gray-50">
        <button
          onClick={handlePrev}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          ← Prev
        </button>

        {/* Dots */}
        <div className="flex gap-1.5">
          {patterns.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentIndex ? 'bg-gray-800' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          Next →
        </button>
      </div>
    </div>
  );
}

// Compact version for embedding in other screens
export function CommunityInsightCard({ companion }) {
  const pattern = getCommunityPattern(companion.id);

  if (!pattern) return null;

  return (
    <div className={`${companion.bgLight} rounded-lg p-4`}>
      <div className="flex items-start gap-3">
        <span className="text-2xl">{companion.emoji}</span>
        <div>
          <p className="text-sm text-gray-700 mb-1">
            {pattern.helpingCount} helping {companion.name} this week tried:
          </p>
          <ul className="text-xs text-gray-600 space-y-1">
            {pattern.popularActions.slice(0, 2).map((action, i) => (
              <li key={i}>• {action}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
