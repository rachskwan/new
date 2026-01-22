import { useState } from 'react';
import { getCommunityPattern } from '../data/communityData';
import { getTypeCompanionMessage } from '../data/healthTypes';
import { BiomarkerList } from './BiomarkerTag';

export default function CompanionPopup({ companion, healthType, onClose, onTryQuest, onExploreBlood }) {
  const [showBloodInfo, setShowBloodInfo] = useState(false);
  const communityPattern = getCommunityPattern(companion.id);

  // Check if this companion resonates with the user's health type
  const isResonantCompanion = healthType?.primaryCompanions?.includes(companion.id);

  // Get a random suggestion from micro-quests
  const randomQuest = companion.microQuests[Math.floor(Math.random() * companion.microQuests.length)];

  // Companion dialogue based on their level and health type
  const getDialogue = () => {
    // Add type-specific prefix for resonant companions
    const typePrefix = isResonantCompanion && healthType
      ? `As a ${healthType.name}, we have a special connection! `
      : '';

    if (companion.level === 'low') {
      return `${typePrefix}Hey there! I've noticed I could use a little extra love lately. ${companion.curiosityNudge?.cta || 'Want to help me out?'}`;
    } else if (companion.level === 'high') {
      return `${typePrefix}I'm feeling great! Thanks for taking such good care of ${companion.domain.toLowerCase()}. Keep it up!`;
    }
    return `${typePrefix}Things are going okay in the ${companion.domain.toLowerCase()} department. Maybe we could make them even better?`;
  };

  // Get type-specific quest suggestion text
  const getQuestSuggestion = () => {
    if (healthType) {
      return getTypeCompanionMessage(healthType.id, companion.name);
    }
    return `${companion.name}'s suggestion for you:`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Popup card */}
      <div className={`relative w-full max-w-sm bg-gradient-to-b ${companion.bgLight} to-white rounded-t-3xl sm:rounded-3xl overflow-hidden animate-slide-up`}>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 text-gray-500 hover:text-gray-700 transition-colors"
        >
          ✕
        </button>

        {/* Header with companion */}
        <div className="pt-6 pb-4 px-6 text-center">
          {/* Animated companion */}
          <div className="relative inline-block mb-3">
            <div className={`w-20 h-20 ${companion.bgLight} border-4 border-white rounded-2xl flex items-center justify-center text-5xl shadow-lg animate-bounce-slow`}>
              {companion.emoji}
            </div>
            {companion.evolution > 0 && (
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center text-xs text-white font-bold border-2 border-white">
                Lv.{companion.evolution}
              </div>
            )}
          </div>

          <h2 className="text-lg font-semibold text-gray-800">
            {companion.name} the {companion.animal}
          </h2>
          <p className="text-sm text-gray-500">{companion.area}</p>

          {/* Status indicator */}
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
              companion.level === 'low'
                ? 'bg-amber-100 text-amber-700'
                : companion.level === 'high'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-gray-100 text-gray-600'
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                companion.level === 'low' ? 'bg-amber-400' :
                companion.level === 'high' ? 'bg-emerald-400' : 'bg-gray-400'
              }`} />
              {companion.level === 'low' ? 'Could use attention' :
               companion.level === 'high' ? 'Doing great!' : 'Steady'}
            </div>

            {/* Resonant companion badge */}
            {isResonantCompanion && healthType && (
              <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${healthType.bgLight} text-gray-700`}>
                <span>{healthType.emoji}</span>
                <span>Resonates with you</span>
              </div>
            )}
          </div>
        </div>

        {/* Speech bubble */}
        <div className="px-6 pb-4">
          <div className="bg-white rounded-xl p-4 relative">
            <div className="absolute -top-2 left-8 w-4 h-4 bg-white transform rotate-45" />
            <p className="text-sm text-gray-700 italic relative z-10">
              "{getDialogue()}"
            </p>
          </div>
        </div>

        {/* Suggestion section */}
        <div className="px-6 pb-4">
          <p className="text-xs text-gray-500 mb-2 font-medium">
            {getQuestSuggestion()}
          </p>
          <button
            onClick={() => onTryQuest()}
            className="w-full bg-white text-left p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{randomQuest.icon}</span>
              <div className="flex-1">
                <p className="text-gray-800 font-medium">{randomQuest.text}</p>
                <p className="text-xs text-gray-500">Tap to add to your quests</p>
              </div>
              <span className="text-gray-400 group-hover:text-gray-600 transition-colors">→</span>
            </div>
          </button>
        </div>

        {/* Community insights */}
        {communityPattern && (
          <div className="px-6 pb-4">
            <div className="bg-gray-50 rounded-xl p-3">
              <p className="text-xs text-gray-500">
                <span className="font-medium">{communityPattern.helpingCount}</span> helping {companion.name} this week are trying:
              </p>
              <p className="text-sm text-gray-700 mt-1">
                {communityPattern.popularActions[0]}
              </p>
            </div>
          </div>
        )}

        {/* Blood test curiosity section */}
        <div className="px-6 pb-6">
          <button
            onClick={() => setShowBloodInfo(!showBloodInfo)}
            className="w-full text-left"
          >
            <div className="bg-gray-100 rounded-xl p-3 hover:bg-gray-150 transition-colors">
              <div className="flex items-center gap-2">
                <span>🔬</span>
                <span className="text-sm text-gray-600 flex-1">
                  {companion.curiosityNudge?.text?.slice(0, 60)}...
                </span>
                <span className="text-gray-400">{showBloodInfo ? '▲' : '▼'}</span>
              </div>
            </div>
          </button>

          {showBloodInfo && (
            <div className="mt-3 bg-white rounded-xl p-4 border border-gray-200">
              <p className="text-sm text-gray-600 mb-3">
                {companion.curiosityNudge?.text}
              </p>
              <p className="text-xs text-gray-400 mb-2">Related markers (hover to learn more):</p>
              <div className="mb-3">
                <BiomarkerList biomarkers={companion.biomarkers?.slice(0, 3)} />
              </div>
              <button
                onClick={onExploreBlood}
                className="text-sm text-gray-700 underline hover:text-gray-900"
              >
                Learn more with Dalton →
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
