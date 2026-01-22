import { useState, useEffect } from 'react';
import { getAllCompanions } from '../data/companions';
import CommunityInsights from './CommunityInsights';
import { ShareButton } from './ShareSnapshot';

export default function Dashboard({ responses, healthType, isFirstCheckIn, onViewQuests, onReflect, onExploreBlood, onAddQuest }) {
  const companions = getAllCompanions();
  const [showCommunity, setShowCommunity] = useState(false);
  const [revealStage, setRevealStage] = useState(isFirstCheckIn ? 0 : -1); // -1 = no reveal, 0-3 = reveal stages

  // Animate the reveal for first-time users
  useEffect(() => {
    if (isFirstCheckIn && healthType && revealStage >= 0 && revealStage < 3) {
      const timer = setTimeout(() => {
        setRevealStage(prev => prev + 1);
      }, revealStage === 0 ? 800 : 600);
      return () => clearTimeout(timer);
    }
  }, [isFirstCheckIn, healthType, revealStage]);

  // Calculate scores for each companion based on their answers
  const scores = companions.map(companion => {
    const companionAnswers = Object.entries(responses)
      .filter(([key]) => key.startsWith(companion.id))
      .map(([, value]) => value);

    const avgScore = companionAnswers.reduce((sum, val) => sum + val, 0) / companionAnswers.length;

    return {
      ...companion,
      score: avgScore,
      level: getLevel(avgScore)
    };
  });

  // Sort by score - lowest scores need most attention
  const sorted = [...scores].sort((a, b) => a.score - b.score);
  const needsAttention = sorted.slice(0, 3);
  const supporting = sorted.slice(3);

  const handleTryQuest = (quest, companionId) => {
    if (onAddQuest) {
      onAddQuest(quest, companionId);
    }
    onViewQuests();
  };

  return (
    <div className="min-h-screen bg-amber-50/40 px-6 py-12">
      <div className="max-w-2xl mx-auto">
        {/* First-time Health Type Reveal */}
        {isFirstCheckIn && healthType && revealStage >= 0 && (
          <div className="mb-10">
            <div className={`text-center transition-all duration-700 ${revealStage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
              <p className="text-sm text-gray-400 mb-4">your check-in is complete</p>

              {/* Reveal animation container */}
              <div className={`relative transition-all duration-700 ${revealStage >= 1 ? 'scale-100' : 'scale-90'}`}>
                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-3xl blur-2xl transition-opacity duration-1000 ${revealStage >= 2 ? 'opacity-60' : 'opacity-0'}`}
                  style={{ background: `linear-gradient(135deg, ${healthType.gradient?.includes('emerald') ? '#6ee7b7' : healthType.gradient?.includes('amber') ? '#fcd34d' : healthType.gradient?.includes('violet') ? '#c4b5fd' : healthType.gradient?.includes('rose') ? '#fda4af' : healthType.gradient?.includes('cyan') ? '#67e8f9' : '#fcd34d'} 0%, transparent 70%)` }}
                />

                {/* Card */}
                <div className={`relative bg-gradient-to-br ${healthType.gradient} rounded-3xl p-8 text-white shadow-xl`}>
                  {/* Sparkles */}
                  {revealStage >= 2 && (
                    <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                          style={{
                            left: `${15 + (i * 10)}%`,
                            top: `${20 + (i % 3) * 25}%`,
                            animationDelay: `${i * 150}ms`,
                            animationDuration: '1.5s'
                          }}
                        />
                      ))}
                    </div>
                  )}

                  <p className={`text-white/70 text-sm mb-3 transition-all duration-500 ${revealStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    we discovered your health type...
                  </p>

                  <div className={`transition-all duration-700 delay-300 ${revealStage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <span className="text-6xl mb-4 block">{healthType.emoji}</span>
                    <h1 className="text-3xl font-bold mb-2">{healthType.name}</h1>
                    <p className="text-white/80 italic text-lg">"{healthType.tagline}"</p>
                  </div>

                  <div className={`mt-6 pt-6 border-t border-white/20 transition-all duration-500 delay-500 ${revealStage >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="text-white/90 text-sm leading-relaxed">
                      {healthType.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Skip/Continue hint */}
              <p className={`text-xs text-gray-400 mt-4 transition-opacity duration-500 ${revealStage >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                Scroll down to see what your companions noticed
              </p>
            </div>
          </div>
        )}

        {/* Header - show different version for returning users */}
        <div className="text-center mb-10">
          {!isFirstCheckIn && healthType && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-gray-200 mb-4">
              <span className="text-lg">{healthType.emoji}</span>
              <span className="text-sm text-gray-600">{healthType.name}</span>
            </div>
          )}
          {(!isFirstCheckIn || !healthType) && (
            <p className="text-sm text-gray-400 mb-2">your check-in is complete</p>
          )}
          <h1 className="text-2xl font-semibold text-gray-800 mb-3">
            Here's what your companions noticed
          </h1>
          <p className="text-gray-500">
            This isn't a score — it's a snapshot of where you're at right now.
          </p>
        </div>

        {/* Needs Attention Section */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-gray-600 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            Could use some attention
          </h2>
          <div className="space-y-3">
            {needsAttention.map(companion => (
              <CompanionCard key={companion.id} companion={companion} variant="attention" />
            ))}
          </div>
        </div>

        {/* Community Section Toggle */}
        <button
          onClick={() => setShowCommunity(!showCommunity)}
          className="w-full mb-6"
        >
          <div className="bg-white rounded-xl p-4 border border-gray-200 hover:border-gray-300 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl">👥</span>
                <div className="text-left">
                  <p className="font-medium text-gray-800">You're not alone</p>
                  <p className="text-sm text-gray-500">See what others helping these companions are doing</p>
                </div>
              </div>
              <span className="text-gray-400">{showCommunity ? '▲' : '▼'}</span>
            </div>
          </div>
        </button>

        {/* Community Insights Carousel */}
        {showCommunity && (
          <div className="mb-8">
            <CommunityInsights
              priorityCompanions={needsAttention}
              onTryQuest={handleTryQuest}
            />
          </div>
        )}

        {/* Dalton Curiosity Section */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
              🔬
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-gray-800 mb-2">
                Curious about what's happening inside?
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Your companions show your current experience. Some patterns connect to signals
                in your body that aren't always visible — like nutrient levels, hormones, and
                inflammation markers.
              </p>
              <button
                onClick={onExploreBlood}
                className="text-sm font-medium text-gray-800 underline hover:text-gray-600 transition-colors"
              >
                Explore with Dalton Personal Blood Test →
              </button>
            </div>
          </div>
        </div>

        {/* Supporting Section */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-gray-600 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Supporting you well
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {supporting.map(companion => (
              <CompanionCard key={companion.id} companion={companion} variant="supporting" />
            ))}
          </div>
        </div>

        {/* Insight */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8">
          <p className="text-gray-600 leading-relaxed">
            {generateInsight(needsAttention, supporting)}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onViewQuests}
              className="flex-1 px-6 py-4 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
            >
              See micro-quests
            </button>
            <button
              onClick={onReflect}
              className="flex-1 px-6 py-4 bg-white text-gray-800 font-medium rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
            >
              Save & reflect
            </button>
          </div>

          {/* Share button */}
          <ShareButton companions={sorted} />
        </div>
      </div>
    </div>
  );
}

function CompanionCard({ companion, variant }) {
  const isAttention = variant === 'attention';

  return (
    <div className={`bg-white rounded-xl p-4 border ${isAttention ? 'border-amber-200' : 'border-gray-200'}`}>
      <div className="flex items-start gap-3">
        <div className={`w-12 h-12 ${companion.bgLight} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>
          {companion.emoji}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-800">{companion.name}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${
              companion.level === 'low'
                ? 'bg-amber-100 text-amber-700'
                : companion.level === 'medium'
                ? 'bg-gray-100 text-gray-600'
                : 'bg-emerald-100 text-emerald-700'
            }`}>
              {companion.level === 'low' ? 'Needs care' : companion.level === 'medium' ? 'Okay' : 'Strong'}
            </span>
          </div>
          <p className="text-sm text-gray-500">{companion.animal} · {companion.domain}</p>
        </div>
      </div>
    </div>
  );
}

function getLevel(score) {
  if (score < 35) return 'low';
  if (score < 65) return 'medium';
  return 'high';
}

function generateInsight(needsAttention, supporting) {
  const topNeed = needsAttention[0];
  const topSupport = supporting[supporting.length - 1];

  const insights = [
    `${topNeed?.name} the ${topNeed?.animal} noticed that your ${topNeed?.domain.toLowerCase()} could use some extra care this week.`,
    `On the bright side, ${topSupport?.name} the ${topSupport?.animal} sees that ${topSupport?.domain.toLowerCase()} is going well for you.`,
    `Remember: this is just a moment in time. Small adjustments can make a real difference.`
  ];

  return insights.join(' ');
}
