import { useState } from 'react';
import { getAllCompanions, getMoodEmoji } from '../data/companions';
import CompanionPopup from './CompanionPopup';
import { communityStats, getGlobalQuests } from '../data/communityData';
import MapShareCard from './MapShareCard';

// Map positions for each companion - creates a forest/nature scene
const mapPositions = {
  pip: { x: 15, y: 25, area: 'Sunrise Meadow', bgClass: 'from-emerald-200 to-teal-100' },
  luna: { x: 75, y: 15, area: 'Moonlit Grove', bgClass: 'from-indigo-200 to-purple-100' },
  ember: { x: 50, y: 45, area: 'Sunny Hilltop', bgClass: 'from-orange-200 to-amber-100' },
  sage: { x: 25, y: 65, area: 'Wisdom Woods', bgClass: 'from-violet-200 to-fuchsia-100' },
  coral: { x: 80, y: 55, area: 'Friendship Falls', bgClass: 'from-pink-200 to-rose-100' },
  brook: { x: 45, y: 75, area: 'Nourishment Pond', bgClass: 'from-cyan-200 to-blue-100' },
  oak: { x: 10, y: 85, area: 'Resilience Ridge', bgClass: 'from-amber-200 to-yellow-100' }
};

export default function CompanionMap({
  companionScores,
  checkInHistory,
  user,
  activeQuests = [],
  healthType,
  gardenElements = [],
  onStartCheckIn,
  onViewQuests,
  onExploreBlood,
  onLogout,
  onCompleteQuest,
  onRemoveQuest,
  onAddCustomQuest
}) {
  const [selectedCompanion, setSelectedCompanion] = useState(null);
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMapShare, setShowMapShare] = useState(false);
  const [showTypeCard, setShowTypeCard] = useState(false);
  const [questFilter, setQuestFilter] = useState('all'); // 'all', 'active', 'completed'
  const [showAddQuest, setShowAddQuest] = useState(false);
  const [showGlobalView, setShowGlobalView] = useState(false);
  const [selectedGlobalQuest, setSelectedGlobalQuest] = useState(null);
  const companions = getAllCompanions();
  const globalQuests = getGlobalQuests();

  // Group global quests by companion
  const globalQuestsByCompanion = globalQuests.reduce((acc, quest) => {
    if (!acc[quest.companionId]) acc[quest.companionId] = [];
    acc[quest.companionId].push(quest);
    return acc;
  }, {});

  // Group quests by companion
  const questsByCompanion = activeQuests.reduce((acc, quest) => {
    if (!acc[quest.companionId]) acc[quest.companionId] = [];
    acc[quest.companionId].push(quest);
    return acc;
  }, {});

  // Filter quests based on current filter
  const filteredQuests = activeQuests.filter(q => {
    if (questFilter === 'all') return true;
    return q.status === questFilter;
  });

  const activeCount = activeQuests.filter(q => q.status === 'active').length;
  const completedCount = activeQuests.filter(q => q.status === 'completed').length;

  // Merge scores with companion data
  const enrichedCompanions = companions.map(c => {
    const scoreData = companionScores?.find(s => s.id === c.id);
    const position = mapPositions[c.id];
    const evolution = getEvolutionLevel(c.id, checkInHistory);

    return {
      ...c,
      ...position,
      score: scoreData?.score ?? 50,
      level: scoreData?.level ?? 'medium',
      evolution
    };
  });

  // Sort so main companions (lower scores) appear more prominent
  const sortedByNeed = [...enrichedCompanions].sort((a, b) => a.score - b.score);
  const mainCompanions = sortedByNeed.slice(0, 3).map(c => c.id);

  const handleCompanionClick = (companion) => {
    setSelectedCompanion(companion);
  };

  // Calculate user stats
  const totalCheckIns = checkInHistory?.length || 0;
  const hasCompletedCheckIn = totalCheckIns > 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-emerald-50/30 to-cyan-50/30 relative overflow-hidden">
      {/* Sky / ambient elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Sun */}
        <div className="absolute top-8 right-12 w-16 h-16 bg-gradient-to-br from-yellow-200 to-amber-300 rounded-full blur-sm opacity-60" />
        {/* Clouds */}
        <div className="absolute top-16 left-1/4 w-24 h-8 bg-white/40 rounded-full blur-md" />
        <div className="absolute top-24 right-1/3 w-32 h-10 bg-white/30 rounded-full blur-lg" />
      </div>

      {/* Header with user info */}
      <div className="relative z-10 px-6 pt-6 pb-4">
        <div className="max-w-2xl mx-auto">
          {/* Top bar with user */}
          <div className="flex items-center justify-between mb-4">
            <div>
              {user && (
                <p className="text-sm text-gray-500">
                  Welcome back, <span className="font-medium text-gray-700">{user.name}</span>
                </p>
              )}
            </div>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 border border-gray-200 hover:border-gray-300 transition-colors"
              >
                {user?.name?.[0]?.toUpperCase() || '👤'}
              </button>

              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-lg border border-gray-200 z-20 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-medium text-gray-800 truncate">{user?.name}</p>
                      <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                    </div>
                    <div className="p-2">
                      <div className="px-3 py-2 text-sm text-gray-600">
                        <span className="font-medium">{totalCheckIns}</span> check-in{totalCheckIns !== 1 ? 's' : ''}
                      </div>
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onLogout();
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl font-semibold text-gray-800 mb-2">
              {user?.name ? `${user.name}'s Forest` : 'Your Companion World'}
            </h1>

            {/* Health Type Badge */}
            {healthType && hasCompletedCheckIn && (
              <button
                onClick={() => setShowTypeCard(true)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${healthType.bgLight} border border-gray-200 hover:border-gray-300 transition-all hover:scale-105 mb-2`}
              >
                <span className="text-lg">{healthType.emoji}</span>
                <span className="text-sm font-medium text-gray-700">{healthType.name}</span>
                <span className="text-xs text-gray-400">Tap to learn more</span>
              </button>
            )}

            <p className="text-sm text-gray-500">
              {hasCompletedCheckIn
                ? healthType ? healthType.tagline : 'Tap a companion to see suggestions and explore'
                : 'Complete your first check-in to see your companions come alive'}
            </p>
            {totalCheckIns > 0 && (
              <p className="text-xs text-gray-400 mt-1">
                {totalCheckIns} check-in{totalCheckIns !== 1 ? 's' : ''} completed
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Map Area */}
      <div className="relative mx-auto max-w-2xl h-[55vh] min-h-[380px]">
        {/* Ground / terrain elements */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-emerald-100/50 to-transparent" />

        {/* Path connecting companions */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
          <path
            d="M 15% 25% Q 30% 35% 50% 45% T 80% 55%"
            fill="none"
            stroke="#9ca3af"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <path
            d="M 50% 45% Q 35% 60% 25% 65% T 10% 85%"
            fill="none"
            stroke="#9ca3af"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
          <path
            d="M 50% 45% Q 50% 60% 45% 75%"
            fill="none"
            stroke="#9ca3af"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        </svg>

        {/* Companions */}
        {enrichedCompanions.map((companion) => {
          const isMain = mainCompanions.includes(companion.id);
          const glowIntensity = companion.level === 'low' ? 'shadow-amber-300' :
                               companion.level === 'high' ? 'shadow-emerald-300' : 'shadow-gray-200';

          return (
            <button
              key={companion.id}
              onClick={() => handleCompanionClick(companion)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 focus:outline-none group"
              style={{ left: `${companion.x}%`, top: `${companion.y}%` }}
            >
              {/* Glow effect */}
              <div className={`absolute inset-0 rounded-full blur-xl opacity-50 transition-opacity ${
                isMain ? 'bg-amber-200 scale-150' : 'bg-gray-200 scale-125'
              } group-hover:opacity-75`} />

              {/* Area label */}
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs text-gray-500 bg-white/80 px-2 py-0.5 rounded-full">
                  {companion.area}
                </span>
              </div>

              {/* Companion avatar */}
              <div className={`relative ${isMain ? 'w-16 h-16 text-3xl' : 'w-12 h-12 text-2xl'}
                ${companion.bgLight} rounded-2xl flex items-center justify-center
                border-2 border-white shadow-lg ${glowIntensity}
                ${hasCompletedCheckIn ? 'animate-bounce-slow' : 'opacity-70'}`}
                style={{ animationDelay: `${companion.x * 10}ms` }}
              >
                {hasCompletedCheckIn ? getMoodEmoji(companion, companion.level) : companion.emoji}

                {/* Evolution badge */}
                {companion.evolution > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-400 rounded-full flex items-center justify-center text-xs text-white font-bold border-2 border-white">
                    {companion.evolution}
                  </div>
                )}

                {/* Needs attention indicator */}
                {companion.level === 'low' && hasCompletedCheckIn && (
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
                )}
              </div>

              {/* Name label */}
              <p className={`mt-1 text-center font-medium ${isMain ? 'text-gray-800' : 'text-gray-600'} text-xs`}>
                {companion.name}
              </p>

              {/* Quest icons near companion */}
              {questsByCompanion[companion.id]?.length > 0 && (
                <div className="absolute -right-2 top-0 flex flex-col gap-1">
                  {questsByCompanion[companion.id]
                    .filter(q => questFilter === 'all' || q.status === questFilter)
                    .slice(0, 3)
                    .map((quest, i) => (
                    <button
                      key={quest.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedQuest(quest);
                      }}
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-sm border-2 border-white shadow-md transition-all hover:scale-110 ${
                        quest.status === 'completed'
                          ? 'bg-emerald-100 opacity-60'
                          : 'bg-white animate-glow-pulse'
                      }`}
                      style={{ animationDelay: `${i * 200}ms` }}
                    >
                      {quest.status === 'completed' ? '✓' : quest.icon}
                    </button>
                  ))}
                  {questsByCompanion[companion.id].length > 3 && (
                    <span className="text-xs text-gray-500 text-center">
                      +{questsByCompanion[companion.id].length - 3}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}

        {/* Garden elements - nature that grew from completed quests */}
        {gardenElements.map((element, i) => {
          const pos = mapPositions[element.companionId];
          if (!pos) return null;

          return (
            <div
              key={element.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-grow-in"
              style={{
                left: `${Math.min(95, Math.max(5, pos.x + element.offsetX))}%`,
                top: `${Math.min(95, Math.max(5, pos.y + element.offsetY))}%`,
                animationDelay: `${i * 100}ms`,
                zIndex: 5
              }}
              title={`${element.name} - from: ${element.questText}`}
            >
              <span className="text-2xl drop-shadow-sm hover:scale-125 transition-transform cursor-default">
                {element.emoji}
              </span>
            </div>
          );
        })}

        {/* Garden count badge */}
        {gardenElements.length > 0 && (
          <div className="absolute top-4 right-4 bg-white/90 rounded-xl px-3 py-2 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-lg">🌸</span>
              <div>
                <p className="text-xs font-medium text-gray-800">{gardenElements.length} growing</p>
                <p className="text-xs text-gray-500">in your garden</p>
              </div>
            </div>
          </div>
        )}

        {/* Global view toggle */}
        {hasCompletedCheckIn && (
          <button
            onClick={() => setShowGlobalView(!showGlobalView)}
            className={`absolute bottom-4 right-4 rounded-full px-4 py-2 flex items-center gap-2 shadow-sm border transition-all hover:scale-105 ${
              showGlobalView
                ? 'bg-indigo-500 text-white border-indigo-600'
                : 'bg-white/90 hover:bg-white border-gray-200'
            }`}
          >
            <div className="flex -space-x-1">
              <div className={`w-2 h-2 rounded-full animate-pulse ${showGlobalView ? 'bg-white' : 'bg-emerald-400'}`} />
              <div className={`w-2 h-2 rounded-full animate-pulse ${showGlobalView ? 'bg-white/80' : 'bg-blue-400'}`} style={{ animationDelay: '200ms' }} />
              <div className={`w-2 h-2 rounded-full animate-pulse ${showGlobalView ? 'bg-white/60' : 'bg-purple-400'}`} style={{ animationDelay: '400ms' }} />
            </div>
            <span className="text-xs">{showGlobalView ? 'Hide global' : `${communityStats.activeThisWeek} exploring`}</span>
          </button>
        )}

        {/* Global quests floating on map */}
        {showGlobalView && (
          <div className="absolute inset-0 pointer-events-none">
            {globalQuests.slice(0, 8).map((quest, i) => {
              const companion = companions.find(c => c.id === quest.companionId);
              const pos = mapPositions[quest.companionId];
              // Offset each quest slightly from the companion position
              const offsetX = ((i % 3) - 1) * 12;
              const offsetY = (Math.floor(i / 3) - 1) * 8;

              return (
                <button
                  key={quest.id}
                  onClick={() => setSelectedGlobalQuest(quest)}
                  className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 animate-float"
                  style={{
                    left: `${Math.min(90, Math.max(10, pos.x + offsetX))}%`,
                    top: `${Math.min(90, Math.max(10, pos.y + offsetY))}%`,
                    animationDelay: `${i * 200}ms`
                  }}
                >
                  <div className="bg-white/95 rounded-lg px-2 py-1 shadow-md border border-indigo-200 hover:border-indigo-400 hover:scale-105 transition-all">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs">{quest.icon}</span>
                      <span className="text-xs text-gray-600 max-w-[80px] truncate">{quest.user}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Share map button */}
        {hasCompletedCheckIn && (
          <button
            onClick={() => setShowMapShare(true)}
            className="absolute bottom-4 left-4 bg-white/90 hover:bg-white rounded-full px-4 py-2 flex items-center gap-2 shadow-sm border border-gray-200 transition-all hover:scale-105"
          >
            <span className="text-sm">Share forest</span>
          </button>
        )}

        {/* Quick add quest button */}
        {hasCompletedCheckIn && (
          <button
            onClick={() => setShowAddQuest(true)}
            className="absolute bottom-16 left-4 w-12 h-12 bg-amber-400 hover:bg-amber-500 rounded-full flex items-center justify-center text-2xl text-white shadow-lg border-2 border-white transition-all hover:scale-110"
            title="Add a quest"
          >
            +
          </button>
        )}

        {/* Quest filter legend */}
        {activeQuests.length > 0 && (
          <div className="absolute top-4 left-4 bg-white/90 rounded-xl p-2 shadow-sm border border-gray-200">
            <p className="text-xs text-gray-500 mb-2 px-1">Quests</p>
            <div className="flex gap-1">
              <button
                onClick={() => setQuestFilter('all')}
                className={`px-2 py-1 text-xs rounded-lg transition-colors ${
                  questFilter === 'all' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All ({activeQuests.length})
              </button>
              <button
                onClick={() => setQuestFilter('active')}
                className={`px-2 py-1 text-xs rounded-lg transition-colors ${
                  questFilter === 'active' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Active ({activeCount})
              </button>
              <button
                onClick={() => setQuestFilter('completed')}
                className={`px-2 py-1 text-xs rounded-lg transition-colors ${
                  questFilter === 'completed' ? 'bg-emerald-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Done ({completedCount})
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom actions */}
      <div className="relative z-10 px-6 pb-8">
        <div className="max-w-md mx-auto space-y-3">
          <button
            onClick={onStartCheckIn}
            className="w-full px-6 py-4 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
          >
            {hasCompletedCheckIn ? 'Start weekly check-in' : 'Start your first check-in'}
          </button>

          {hasCompletedCheckIn && (
            <div className="flex gap-3">
              <button
                onClick={onViewQuests}
                className="flex-1 px-4 py-3 bg-white text-gray-700 text-sm font-medium rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
              >
                View quests
              </button>
              <button
                onClick={onExploreBlood}
                className="flex-1 px-4 py-3 bg-white text-gray-700 text-sm font-medium rounded-xl border border-gray-200 hover:border-gray-300 transition-colors flex items-center justify-center gap-2"
              >
                <span>🔬</span> Explore deeper
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Companion popup */}
      {selectedCompanion && hasCompletedCheckIn && (
        <CompanionPopup
          companion={selectedCompanion}
          healthType={healthType}
          onClose={() => setSelectedCompanion(null)}
          onTryQuest={onViewQuests}
          onExploreBlood={onExploreBlood}
        />
      )}

      {/* Map share modal */}
      {showMapShare && (
        <MapShareCard
          companions={enrichedCompanions}
          user={user}
          onClose={() => setShowMapShare(false)}
        />
      )}

      {/* Quest popup */}
      {selectedQuest && (
        <QuestPopup
          quest={selectedQuest}
          companion={enrichedCompanions.find(c => c.id === selectedQuest.companionId)}
          onClose={() => setSelectedQuest(null)}
          onComplete={() => {
            onCompleteQuest?.(selectedQuest.id);
            setSelectedQuest(null);
          }}
          onRemove={() => {
            onRemoveQuest?.(selectedQuest.id);
            setSelectedQuest(null);
          }}
        />
      )}

      {/* Health Type Card */}
      {showTypeCard && healthType && (
        <HealthTypeCard
          healthType={healthType}
          companions={enrichedCompanions}
          user={user}
          onClose={() => setShowTypeCard(false)}
        />
      )}

      {/* Quick Add Quest Modal */}
      {showAddQuest && (
        <QuickAddQuestModal
          companions={enrichedCompanions}
          onClose={() => setShowAddQuest(false)}
          onAdd={(quest) => {
            onAddCustomQuest?.(quest);
            setShowAddQuest(false);
          }}
        />
      )}

      {/* Global Quest Popup */}
      {selectedGlobalQuest && (
        <GlobalQuestPopup
          quest={selectedGlobalQuest}
          companion={companions.find(c => c.id === selectedGlobalQuest.companionId)}
          onClose={() => setSelectedGlobalQuest(null)}
          onTryIt={() => {
            // Add this quest to user's active quests
            onAddCustomQuest?.({
              id: `inspired-${Date.now()}`,
              companionId: selectedGlobalQuest.companionId,
              text: selectedGlobalQuest.quest,
              icon: selectedGlobalQuest.icon,
              status: 'active',
              addedAt: new Date().toISOString(),
              isCustom: true,
              inspiredBy: selectedGlobalQuest.user
            });
            setSelectedGlobalQuest(null);
            setShowGlobalView(false);
          }}
        />
      )}
    </div>
  );
}

// Health Type Card component
function HealthTypeCard({ healthType, companions, user, onClose }) {
  const [copied, setCopied] = useState(false);

  const primaryCompanions = companions.filter(c =>
    healthType.primaryCompanions?.includes(c.id)
  );

  const handleShare = async () => {
    const shareText = `I'm ${healthType.emoji} ${healthType.name}! "${healthType.tagline}" - What's your health type?`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `I'm ${healthType.name}!`,
          text: shareText,
        });
      } catch (err) {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fadeIn">
      <div
        className="absolute inset-0"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl max-w-sm w-full shadow-xl animate-slideUp overflow-hidden">
        {/* Header with gradient */}
        <div className={`bg-gradient-to-br ${healthType.gradient} p-6 text-white`}>
          <div className="text-center">
            <span className="text-5xl mb-3 block">{healthType.emoji}</span>
            <h2 className="text-2xl font-bold mb-1">{healthType.name}</h2>
            <p className="text-white/80 italic">"{healthType.tagline}"</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <p className="text-gray-600 mb-4">{healthType.description}</p>

          {/* Primary companions */}
          <div className="mb-4">
            <p className="text-xs text-gray-400 mb-2">Your resonant companions:</p>
            <div className="flex gap-2">
              {primaryCompanions.map(companion => (
                <div
                  key={companion.id}
                  className={`flex items-center gap-2 px-3 py-2 ${companion.bgLight} rounded-lg`}
                >
                  <span className="text-xl">{companion.emoji}</span>
                  <span className="text-sm text-gray-700">{companion.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Encouragement */}
          <div className={`${healthType.bgLight} rounded-lg p-4 mb-4`}>
            <p className="text-sm text-gray-700 italic">
              "{healthType.encouragement}"
            </p>
          </div>

          {/* Quest style hint */}
          <p className="text-xs text-gray-500 mb-4">
            Your quests focus on: <span className="font-medium">{healthType.questStyle}</span>
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleShare}
              className={`flex-1 py-3 px-4 bg-gradient-to-r ${healthType.gradient} text-white font-medium rounded-xl hover:opacity-90 transition-opacity`}
            >
              {copied ? 'Copied!' : 'Share type'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Quest popup component
function QuestPopup({ quest, companion, onClose, onComplete, onRemove }) {
  const [showConfetti, setShowConfetti] = useState(false);

  const handleComplete = () => {
    setShowConfetti(true);
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 bg-black/30 animate-fadeIn">
      <div
        className="absolute inset-0"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl max-w-sm w-full shadow-xl animate-slideUp overflow-hidden">
        {/* Confetti animation */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  backgroundColor: ['#fbbf24', '#34d399', '#60a5fa', '#f472b6', '#a78bfa'][i % 5],
                  animationDelay: `${Math.random() * 0.5}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Header with companion */}
        <div className={`${companion?.bgLight || 'bg-gray-100'} p-4`}>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl shadow-sm">
              {companion?.emoji}
            </div>
            <div>
              <p className="text-xs text-gray-500">Quest from</p>
              <p className="font-medium text-gray-800">{companion?.name} the {companion?.animal}</p>
            </div>
          </div>
        </div>

        {/* Quest content */}
        <div className="p-5">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl">{quest.icon}</span>
            <div>
              <p className="text-gray-800 font-medium">{quest.text}</p>
              <p className="text-xs text-gray-400 mt-1">
                Added {new Date(quest.addedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Status badge */}
          <div className="mb-4">
            {quest.status === 'completed' ? (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-100 text-emerald-700 text-sm rounded-full">
                <span>✓</span> Completed
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded-full animate-pulse">
                <span>✨</span> In progress
              </span>
            )}
          </div>

          {/* Companion encouragement */}
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <p className="text-sm text-gray-600 italic">
              "{companion?.name} believes in you! Small steps lead to big changes."
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {quest.status === 'active' ? (
              <>
                <button
                  onClick={handleComplete}
                  className="flex-1 py-3 px-4 bg-emerald-500 text-white font-medium rounded-xl hover:bg-emerald-600 transition-colors"
                >
                  Mark as done
                </button>
                <button
                  onClick={onRemove}
                  className="py-3 px-4 text-gray-500 hover:text-red-500 transition-colors"
                >
                  Remove
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={onRemove}
                  className="py-3 px-4 text-gray-500 hover:text-red-500 transition-colors"
                >
                  Clear
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Calculate evolution level based on check-in history
function getEvolutionLevel(companionId, history) {
  if (!history || history.length === 0) return 0;

  // Count how many times this companion was "helped" (had quests completed)
  let helpCount = 0;
  history.forEach(checkIn => {
    if (checkIn.selectedQuests?.some(q => q.startsWith(companionId))) {
      helpCount++;
    }
  });

  // Also count based on check-in streak
  const streakBonus = Math.floor(history.length / 3);

  return Math.min(helpCount + streakBonus, 5); // Max level 5
}

// Quick add quest modal
const questIcons = ['✨', '🚶', '💧', '🧘', '🌙', '🥗', '💬', '📝', '🌳', '🎯', '💪', '🎨', '📚', '🎵', '☕'];

function QuickAddQuestModal({ companions, onClose, onAdd }) {
  const [questText, setQuestText] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('✨');
  const [selectedCompanion, setSelectedCompanion] = useState('');

  const handleAdd = () => {
    if (!questText.trim() || !selectedCompanion) return;

    const companion = companions.find(c => c.id === selectedCompanion);
    onAdd({
      id: `custom-${Date.now()}`,
      companionId: selectedCompanion,
      text: questText.trim(),
      icon: selectedIcon,
      status: 'active',
      addedAt: new Date().toISOString(),
      isCustom: true
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 animate-fadeIn">
      <div
        className="absolute inset-0"
        onClick={onClose}
      />
      <div className="relative w-full max-w-sm bg-white rounded-t-2xl sm:rounded-2xl shadow-xl animate-slideUp overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 px-5 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">Create a Quest</h3>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/50 text-gray-500 transition-colors"
            >
              ✕
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-1">Add a personal goal to your map</p>
        </div>

        <div className="p-5 space-y-4">
          {/* Quest text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">What do you want to try?</label>
            <input
              type="text"
              value={questText}
              onChange={(e) => setQuestText(e.target.value)}
              placeholder="e.g., Take a 10-minute walk after lunch"
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-100 transition-all"
              maxLength={100}
            />
          </div>

          {/* Icon picker */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Pick an icon</label>
            <div className="flex flex-wrap gap-2">
              {questIcons.map(icon => (
                <button
                  key={icon}
                  onClick={() => setSelectedIcon(icon)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
                    selectedIcon === icon
                      ? 'bg-amber-400 text-white scale-110 shadow-md'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          {/* Companion selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Which companion will track this?</label>
            <div className="grid grid-cols-4 gap-2">
              {companions.map(c => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCompanion(c.id)}
                  className={`p-2 rounded-xl flex flex-col items-center gap-1 transition-all ${
                    selectedCompanion === c.id
                      ? `${c.bgLight} ring-2 ring-amber-400 scale-105`
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{c.emoji}</span>
                  <span className="text-xs text-gray-600 truncate w-full text-center">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Add button */}
          <button
            onClick={handleAdd}
            disabled={!questText.trim() || !selectedCompanion}
            className={`w-full py-4 rounded-xl font-medium transition-all ${
              questText.trim() && selectedCompanion
                ? 'bg-amber-400 text-white hover:bg-amber-500 shadow-md'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Add to map
          </button>
        </div>
      </div>
    </div>
  );
}

// Global quest popup - shows what others are working on
function GlobalQuestPopup({ quest, companion, onClose, onTryIt }) {
  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/30 animate-fadeIn">
      <div
        className="absolute inset-0"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl max-w-sm w-full shadow-xl animate-slideUp overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{quest.icon}</span>
              <div>
                <p className="font-medium text-gray-800">{quest.user}</p>
                <p className="text-xs text-gray-500">is working on this quest</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/50 text-gray-500 transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Quest content */}
        <div className="p-5">
          {/* Quest text */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <p className="text-gray-800 font-medium">{quest.quest}</p>
            <p className="text-xs text-gray-400 mt-2">Started {quest.startedAt}</p>
          </div>

          {/* Companion info */}
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-10 h-10 ${companion?.bgLight || 'bg-gray-100'} rounded-xl flex items-center justify-center text-xl`}>
              {companion?.emoji}
            </div>
            <div>
              <p className="text-sm text-gray-600">Quest for</p>
              <p className="font-medium text-gray-800">{companion?.name} · {companion?.domain}</p>
            </div>
          </div>

          {/* Inspiration message */}
          <div className="bg-indigo-50 rounded-lg p-3 mb-4">
            <p className="text-sm text-indigo-700">
              Get inspired! Try this quest yourself and join {quest.user} on their wellness journey.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
            >
              Maybe later
            </button>
            <button
              onClick={onTryIt}
              className="flex-1 py-3 px-4 bg-indigo-500 text-white font-medium rounded-xl hover:bg-indigo-600 transition-colors"
            >
              Try this quest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
