import { useState } from 'react';
import { getAllCompanions } from '../data/companions';
import CommunityInsights from './CommunityInsights';
import { ShareButton } from './ShareSnapshot';

export default function Dashboard({ responses, onViewQuests, onReflect, onExploreBlood, onAddQuest }) {
  const companions = getAllCompanions();
  const [showCommunity, setShowCommunity] = useState(false);

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
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sm text-gray-400 mb-2">your check-in is complete</p>
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
