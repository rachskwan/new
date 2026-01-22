// Mock community data showing anonymized behavioral patterns
// In a real app, this would come from an API with aggregated, anonymized user data

export const communityPatterns = {
  pip: {
    companionId: 'pip',
    helpingCount: 'Many people',
    popularActions: [
      '10-minute morning walk',
      'Tracking energy peaks throughout the day',
      'Short afternoon stretch breaks'
    ],
    funFact: "Pip loves seeing so many friends moving their bodies!",
    trendingQuest: 'Take a 10-minute walk outside'
  },
  luna: {
    companionId: 'luna',
    helpingCount: 'Lots of friends',
    popularActions: [
      'Screen-free time before bed',
      '5-minute breathing exercises',
      'Consistent sleep schedules'
    ],
    funFact: "Luna noticed more people winding down without screens this week!",
    trendingQuest: 'No screens 30 min before bed tonight'
  },
  ember: {
    companionId: 'ember',
    helpingCount: 'A bunch of people',
    popularActions: [
      'Quick morning stretches',
      'Taking stairs instead of elevators',
      'Dance breaks during work'
    ],
    funFact: "Ember is excited — so many friends found joy in movement today!",
    trendingQuest: 'Do 5 minutes of movement you enjoy'
  },
  sage: {
    companionId: 'sage',
    helpingCount: 'Many friends',
    popularActions: [
      'Deep breathing moments',
      'Brain dumps / journaling',
      'Short outdoor breaks'
    ],
    funFact: "Sage noticed more people taking mental clarity breaks this week!",
    trendingQuest: 'Take 3 deep breaths right now'
  },
  coral: {
    companionId: 'coral',
    helpingCount: 'Lots of people',
    popularActions: [
      'Reaching out to loved ones',
      'Gratitude journaling',
      'Small acts of self-care'
    ],
    funFact: "Coral is warmed by all the connection happening!",
    trendingQuest: 'Text someone you care about'
  },
  brook: {
    companionId: 'brook',
    helpingCount: 'Many friends',
    popularActions: [
      'Drinking more water',
      'Adding vegetables to meals',
      'Mindful eating moments'
    ],
    funFact: "Brook sees hydration heroes everywhere this week!",
    trendingQuest: 'Drink a glass of water right now'
  },
  oak: {
    companionId: 'oak',
    helpingCount: 'A lot of people',
    popularActions: [
      'Slow breathing exercises',
      'Screen-free moments',
      'Writing down worries'
    ],
    funFact: "Oak is proud of everyone taking stress breaks!",
    trendingQuest: 'Take 5 slow breaths'
  }
};

// Shareable snapshot templates
export const snapshotStyles = {
  warm: {
    background: 'from-amber-100 to-orange-100',
    accent: 'amber'
  },
  cool: {
    background: 'from-blue-100 to-indigo-100',
    accent: 'indigo'
  },
  nature: {
    background: 'from-emerald-100 to-teal-100',
    accent: 'emerald'
  },
  sunset: {
    background: 'from-rose-100 to-amber-100',
    accent: 'rose'
  }
};

// Community stats (mock)
export const communityStats = {
  totalCheckIns: '12,847',
  activeThisWeek: '3,241',
  questsCompleted: '8,392',
  topCompanion: 'ember' // Most helped this week
};

export function getCommunityPattern(companionId) {
  return communityPatterns[companionId];
}

export function getAllCommunityPatterns() {
  return Object.values(communityPatterns);
}

// Mock global quests - what other anonymous users are working on
// In a real app, this would be fetched from a backend with privacy-safe aggregation
export const globalQuests = [
  { id: 'g1', user: '🌱 Sprout', companionId: 'pip', quest: 'Take a 10-minute walk outside', icon: '🚶', startedAt: '2 hours ago' },
  { id: 'g2', user: '🦋 Butterfly', companionId: 'luna', quest: 'No screens 30 min before bed', icon: '📵', startedAt: '5 hours ago' },
  { id: 'g3', user: '🌊 Wave', companionId: 'brook', quest: 'Drink 8 glasses of water today', icon: '💧', startedAt: '1 hour ago' },
  { id: 'g4', user: '🔥 Spark', companionId: 'ember', quest: 'Do 5 minutes of stretching', icon: '🧘', startedAt: '30 min ago' },
  { id: 'g5', user: '🌙 Dreamer', companionId: 'luna', quest: 'Try a 5-minute breathing exercise', icon: '🌬️', startedAt: '3 hours ago' },
  { id: 'g6', user: '🌸 Blossom', companionId: 'coral', quest: 'Text someone you care about', icon: '💬', startedAt: '1 hour ago' },
  { id: 'g7', user: '🍃 Leaf', companionId: 'sage', quest: 'Write down 3 things you\'re grateful for', icon: '📝', startedAt: '4 hours ago' },
  { id: 'g8', user: '🌻 Sunny', companionId: 'pip', quest: 'Notice when your energy peaks today', icon: '⚡', startedAt: '2 hours ago' },
  { id: 'g9', user: '🐚 Shell', companionId: 'oak', quest: 'Take 5 slow, deep breaths', icon: '🧘', startedAt: '45 min ago' },
  { id: 'g10', user: '🌈 Rainbow', companionId: 'coral', quest: 'Do one small act of self-care', icon: '✨', startedAt: '1 hour ago' },
  { id: 'g11', user: '🦉 Owl', companionId: 'sage', quest: 'Take a 5-min break from screens', icon: '👀', startedAt: '20 min ago' },
  { id: 'g12', user: '🌺 Hibiscus', companionId: 'brook', quest: 'Add an extra vegetable to lunch', icon: '🥗', startedAt: '3 hours ago' },
  { id: 'g13', user: '⭐ Star', companionId: 'ember', quest: 'Take the stairs today', icon: '🚶', startedAt: '6 hours ago' },
  { id: 'g14', user: '🍀 Clover', companionId: 'oak', quest: 'Write down one worry to let go', icon: '📝', startedAt: '2 hours ago' },
  { id: 'g15', user: '🌷 Tulip', companionId: 'pip', quest: 'Get some natural sunlight', icon: '☀️', startedAt: '1 hour ago' },
];

export function getGlobalQuests() {
  return globalQuests;
}

export function getGlobalQuestsByCompanion(companionId) {
  return globalQuests.filter(q => q.companionId === companionId);
}
