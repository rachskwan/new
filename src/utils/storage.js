// Local storage utilities for check-in history and evolution tracking

const STORAGE_KEYS = {
  CHECK_IN_HISTORY: 'health-companions-history',
  LAST_SCORES: 'health-companions-scores',
  COMPLETED_QUESTS: 'health-companions-quests',
  USER_PREFS: 'health-companions-prefs'
};

// Save a completed check-in
export function saveCheckIn(checkIn) {
  const history = getCheckInHistory();
  const newEntry = {
    id: Date.now(),
    date: new Date().toISOString(),
    ...checkIn
  };
  history.push(newEntry);

  // Keep last 52 check-ins (1 year of weekly check-ins)
  const trimmed = history.slice(-52);
  localStorage.setItem(STORAGE_KEYS.CHECK_IN_HISTORY, JSON.stringify(trimmed));

  return newEntry;
}

// Get all check-in history
export function getCheckInHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.CHECK_IN_HISTORY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// Save latest companion scores
export function saveCompanionScores(scores) {
  localStorage.setItem(STORAGE_KEYS.LAST_SCORES, JSON.stringify({
    scores,
    updatedAt: new Date().toISOString()
  }));
}

// Get latest companion scores
export function getCompanionScores() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.LAST_SCORES);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

// Mark a quest as completed
export function completeQuest(questId, companionId) {
  const quests = getCompletedQuests();
  quests.push({
    questId,
    companionId,
    completedAt: new Date().toISOString()
  });
  localStorage.setItem(STORAGE_KEYS.COMPLETED_QUESTS, JSON.stringify(quests));
}

// Get completed quests
export function getCompletedQuests() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.COMPLETED_QUESTS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

// Get quests completed for a specific companion
export function getCompanionQuestCount(companionId) {
  const quests = getCompletedQuests();
  return quests.filter(q => q.companionId === companionId).length;
}

// Calculate companion evolution level
export function getCompanionEvolution(companionId) {
  const questCount = getCompanionQuestCount(companionId);
  const checkIns = getCheckInHistory().length;
  const streakBonus = Math.floor(checkIns / 3);

  // Evolution levels: 0-5
  return Math.min(questCount + streakBonus, 5);
}

// Get all companion evolutions
export function getAllCompanionEvolutions() {
  const companionIds = ['pip', 'luna', 'ember', 'sage', 'coral', 'brook', 'oak'];
  const evolutions = {};

  companionIds.forEach(id => {
    evolutions[id] = getCompanionEvolution(id);
  });

  return evolutions;
}

// Get check-in streak (consecutive weeks)
export function getCheckInStreak() {
  const history = getCheckInHistory();
  if (history.length === 0) return 0;

  let streak = 1;
  const oneWeek = 7 * 24 * 60 * 60 * 1000;

  for (let i = history.length - 1; i > 0; i--) {
    const current = new Date(history[i].date);
    const previous = new Date(history[i - 1].date);
    const diff = current - previous;

    if (diff <= oneWeek * 1.5) { // Allow some flexibility
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

// Clear all data (for testing/reset)
export function clearAllData() {
  Object.values(STORAGE_KEYS).forEach(key => {
    localStorage.removeItem(key);
  });
}
