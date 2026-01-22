// Visitor system for forest sharing
// Friends can visit your forest, leave gifts, and react to quests

// Gift options visitors can leave
export const visitorGifts = [
  { id: 'sunflower', emoji: '🌻', name: 'Sunflower', message: 'Bringing sunshine to your day!' },
  { id: 'tulip', emoji: '🌷', name: 'Tulip', message: 'A bloom of support!' },
  { id: 'cherry', emoji: '🌸', name: 'Cherry Blossom', message: 'Beauty in your journey!' },
  { id: 'rose', emoji: '🌹', name: 'Rose', message: 'You are loved!' },
  { id: 'hibiscus', emoji: '🌺', name: 'Hibiscus', message: 'Tropical vibes your way!' },
  { id: 'tree', emoji: '🌳', name: 'Oak Tree', message: 'Growing strong together!' },
  { id: 'evergreen', emoji: '🌲', name: 'Evergreen', message: 'Standing tall with you!' },
  { id: 'palm', emoji: '🌴', name: 'Palm Tree', message: 'Vacation energy!' },
  { id: 'cactus', emoji: '🌵', name: 'Cactus', message: 'Resilient like you!' },
  { id: 'clover', emoji: '🍀', name: 'Four-Leaf Clover', message: 'Sending luck!' },
  { id: 'mushroom', emoji: '🍄', name: 'Mushroom', message: 'Magic vibes!' },
  { id: 'butterfly', emoji: '🦋', name: 'Butterfly', message: 'Transform and soar!' },
];

// Reaction options for quests
export const questReactions = [
  { id: 'cheer', emoji: '📣', label: 'Cheer' },
  { id: 'fire', emoji: '🔥', label: 'On fire!' },
  { id: 'heart', emoji: '❤️', label: 'Love' },
  { id: 'star', emoji: '⭐', label: 'Star' },
  { id: 'muscle', emoji: '💪', label: 'Strong' },
  { id: 'clap', emoji: '👏', label: 'Applause' },
  { id: 'sparkle', emoji: '✨', label: 'Magic' },
  { id: 'rocket', emoji: '🚀', label: 'Go go go!' },
];

// Mock visitors data (simulating what would come from a backend)
export const mockVisitors = [
  {
    id: 'v1',
    name: 'Alex',
    avatar: '🐱',
    visitedAt: '2 hours ago',
    gift: { ...visitorGifts[0], leftAt: '2 hours ago' },
    reactions: [
      { questId: 'active-1', reaction: questReactions[1], timestamp: '1 hour ago' }
    ]
  },
  {
    id: 'v2',
    name: 'Sam',
    avatar: '🐶',
    visitedAt: '1 day ago',
    gift: { ...visitorGifts[5], leftAt: '1 day ago' },
    reactions: [
      { questId: 'active-2', reaction: questReactions[4], timestamp: '1 day ago' }
    ]
  },
  {
    id: 'v3',
    name: 'Jordan',
    avatar: '🦊',
    visitedAt: '3 days ago',
    gift: { ...visitorGifts[9], leftAt: '3 days ago' },
    reactions: []
  },
  {
    id: 'v4',
    name: 'Riley',
    avatar: '🐻',
    visitedAt: '5 days ago',
    gift: { ...visitorGifts[2], leftAt: '5 days ago' },
    reactions: [
      { questId: 'active-1', reaction: questReactions[2], timestamp: '5 days ago' }
    ]
  },
];

// Generate a shareable forest code (in real app, this would be server-generated)
export function generateForestCode(userId) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

// Get shareable link
export function getShareableLink(forestCode) {
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?visit=${forestCode}`;
}

// Get visitors (mock - would be API call in real app)
export function getVisitors() {
  return mockVisitors;
}

// Get visitor gifts as garden elements
export function getVisitorGiftsAsGardenElements(visitors) {
  return visitors.map((visitor, index) => ({
    id: `visitor-gift-${visitor.id}`,
    emoji: visitor.gift.emoji,
    name: visitor.gift.name,
    type: 'visitor-gift',
    visitorName: visitor.name,
    visitorAvatar: visitor.avatar,
    message: visitor.gift.message,
    leftAt: visitor.gift.leftAt,
    // Scatter around the map
    offsetX: (Math.sin(index * 1.5) * 35),
    offsetY: (Math.cos(index * 1.5) * 25),
    companionId: ['pip', 'luna', 'ember', 'sage', 'coral', 'brook', 'oak'][index % 7]
  }));
}

// Get reactions for a specific quest
export function getQuestReactions(questId, visitors) {
  const reactions = [];
  visitors.forEach(visitor => {
    visitor.reactions.forEach(r => {
      if (r.questId === questId) {
        reactions.push({
          ...r,
          visitorName: visitor.name,
          visitorAvatar: visitor.avatar
        });
      }
    });
  });
  return reactions;
}

// Count total reactions on a quest
export function countQuestReactions(questId, visitors) {
  let count = 0;
  visitors.forEach(visitor => {
    visitor.reactions.forEach(r => {
      if (r.questId === questId) count++;
    });
  });
  return count;
}
