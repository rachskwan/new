// Simple auth utilities for demo purposes
// In production, this would connect to a real backend

const AUTH_KEYS = {
  CURRENT_USER: 'health-companions-user',
  USERS_DB: 'health-companions-users'
};

// Get all registered users (demo "database")
function getUsersDb() {
  try {
    const data = localStorage.getItem(AUTH_KEYS.USERS_DB);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

// Save users database
function saveUsersDb(users) {
  localStorage.setItem(AUTH_KEYS.USERS_DB, JSON.stringify(users));
}

// Create a new user account
export function createAccount(email, name) {
  const users = getUsersDb();
  const normalizedEmail = email.toLowerCase().trim();

  if (users[normalizedEmail]) {
    return { success: false, error: 'An account with this email already exists' };
  }

  const newUser = {
    id: `user_${Date.now()}`,
    email: normalizedEmail,
    name: name.trim(),
    createdAt: new Date().toISOString(),
    checkInHistory: [],
    companionScores: null,
    completedQuests: [],
    activeQuests: [],
    settings: {
      notifications: true
    }
  };

  users[normalizedEmail] = newUser;
  saveUsersDb(users);

  // Auto login after signup
  setCurrentUser(newUser);

  return { success: true, user: newUser };
}

// Login with email
export function login(email) {
  const users = getUsersDb();
  const normalizedEmail = email.toLowerCase().trim();
  const user = users[normalizedEmail];

  if (!user) {
    return { success: false, error: 'No account found with this email' };
  }

  setCurrentUser(user);
  return { success: true, user };
}

// Logout
export function logout() {
  localStorage.removeItem(AUTH_KEYS.CURRENT_USER);
}

// Get current logged in user
export function getCurrentUser() {
  try {
    const data = localStorage.getItem(AUTH_KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

// Set current user (internal)
function setCurrentUser(user) {
  localStorage.setItem(AUTH_KEYS.CURRENT_USER, JSON.stringify(user));
}

// Update user data
export function updateUser(updates) {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;

  const users = getUsersDb();
  const updatedUser = {
    ...currentUser,
    ...updates,
    updatedAt: new Date().toISOString()
  };

  users[currentUser.email] = updatedUser;
  saveUsersDb(users);
  setCurrentUser(updatedUser);

  return updatedUser;
}

// Save check-in for current user
export function saveUserCheckIn(checkInData) {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;

  const newCheckIn = {
    id: Date.now(),
    date: new Date().toISOString(),
    ...checkInData
  };

  const history = [...(currentUser.checkInHistory || []), newCheckIn];
  // Keep last 52 check-ins
  const trimmedHistory = history.slice(-52);

  return updateUser({
    checkInHistory: trimmedHistory,
    companionScores: checkInData.companionScores,
    activeQuests: checkInData.activeQuests || currentUser.activeQuests || [],
    healthType: checkInData.healthType || currentUser.healthType || null,
    lastCheckIn: new Date().toISOString()
  });
}

// Update active quests for current user
export function updateActiveQuests(quests) {
  return updateUser({ activeQuests: quests });
}

// Update garden elements for current user
export function updateGardenElements(elements) {
  return updateUser({ gardenElements: elements });
}

// Get user's check-in history
export function getUserCheckInHistory() {
  const user = getCurrentUser();
  return user?.checkInHistory || [];
}

// Get user's companion scores
export function getUserCompanionScores() {
  const user = getCurrentUser();
  return user?.companionScores || null;
}

// Save completed quest for user
export function saveUserQuest(questId, companionId) {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;

  const quests = [...(currentUser.completedQuests || []), {
    questId,
    companionId,
    completedAt: new Date().toISOString()
  }];

  return updateUser({ completedQuests: quests });
}

// Check if email exists (for "check your forest" flow)
export function checkEmailExists(email) {
  const users = getUsersDb();
  return !!users[email.toLowerCase().trim()];
}

// Get user stats
export function getUserStats() {
  const user = getCurrentUser();
  if (!user) return null;

  const checkIns = user.checkInHistory?.length || 0;
  const quests = user.completedQuests?.length || 0;

  // Calculate streak
  let streak = 0;
  if (user.checkInHistory?.length > 0) {
    const oneWeek = 7 * 24 * 60 * 60 * 1000;
    const sorted = [...user.checkInHistory].sort((a, b) =>
      new Date(b.date) - new Date(a.date)
    );

    streak = 1;
    for (let i = 0; i < sorted.length - 1; i++) {
      const current = new Date(sorted[i].date);
      const next = new Date(sorted[i + 1].date);
      if (current - next <= oneWeek * 1.5) {
        streak++;
      } else {
        break;
      }
    }
  }

  return {
    checkIns,
    quests,
    streak,
    memberSince: user.createdAt
  };
}
