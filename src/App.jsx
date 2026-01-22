import { useState, useEffect } from 'react';
import './index.css';
import { getAllCompanions } from './data/companions';
import { calculateHealthType } from './data/healthTypes';
import { getVisitors, generateForestCode, getVisitorGiftsAsGardenElements } from './data/visitors';
import {
  getCurrentUser,
  logout,
  saveUserCheckIn,
  getUserCheckInHistory,
  getUserCompanionScores,
  getUserStats,
  updateActiveQuests,
  updateGardenElements
} from './utils/auth';

// Components
import Landing from './components/Landing';
import AuthScreen from './components/AuthScreen';
import Onboarding from './components/Onboarding';
import DomainCheckIn from './components/DomainCheckIn';
import Dashboard from './components/Dashboard';
import MicroQuests from './components/MicroQuests';
import BloodLayerCards from './components/BloodLayerCards';
import Reflection from './components/Reflection';
import CompanionMap from './components/CompanionMap';

// Screen flow:
// New user: Landing → Onboarding → Check-ins → Dashboard → Reflection → Auth (signup to save) → Map
// Return user: Landing → Auth (login) → Map → Onboarding → Check-ins → Dashboard → Reflection → Map

function App() {
  const [screen, setScreen] = useState('landing');
  const [currentCompanionIndex, setCurrentCompanionIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [selectedQuests, setSelectedQuests] = useState([]);
  const [sortedCompanions, setSortedCompanions] = useState([]);
  const [checkInHistory, setCheckInHistory] = useState([]);
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState('signup');
  const [pendingCheckIn, setPendingCheckIn] = useState(null);
  const [activeQuests, setActiveQuests] = useState([]); // {id, companionId, text, icon, status: 'active'|'completed', addedAt}
  const [healthType, setHealthType] = useState(null); // User's playful health type
  const [gardenElements, setGardenElements] = useState([]); // Nature elements that grow when quests complete
  const [visitors, setVisitors] = useState([]); // Friends who visited the forest
  const [forestCode, setForestCode] = useState(''); // Shareable code for forest

  const companions = getAllCompanions();
  const currentCompanion = companions[currentCompanionIndex];

  // Check for existing session on mount
  useEffect(() => {
    const existingUser = getCurrentUser();
    if (existingUser) {
      setUser(existingUser);
      loadUserData(existingUser);
      setScreen('map');
    }
  }, []);

  // Load user's saved data
  const loadUserData = (userData) => {
    const history = userData.checkInHistory || [];
    const scores = userData.companionScores || [];
    const quests = userData.activeQuests || [];
    const savedType = userData.healthType || null;
    const garden = userData.gardenElements || [];

    setCheckInHistory(history);
    setActiveQuests(quests);
    setHealthType(savedType);
    setGardenElements(garden);

    // Load visitors (mock data for now)
    setVisitors(getVisitors());

    // Generate or load forest code
    const code = userData.forestCode || generateForestCode(userData.id);
    setForestCode(code);

    if (scores.length > 0) {
      setSortedCompanions(scores);
      // Recalculate type if not saved
      if (!savedType && scores.length > 0) {
        const typeResult = calculateHealthType(null, scores);
        setHealthType(typeResult.primary);
      }
    }
  };

  // Handle successful auth
  const handleAuthSuccess = (userData) => {
    setUser(userData);
    loadUserData(userData);

    // If there's pending check-in data (new user just finished quiz), save it
    if (pendingCheckIn) {
      const checkInData = {
        responses: pendingCheckIn.responses,
        selectedQuests: pendingCheckIn.selectedQuests,
        companionScores: pendingCheckIn.companionScores,
        activeQuests: pendingCheckIn.activeQuests,
        healthType: pendingCheckIn.healthType,
        ...pendingCheckIn.reflection
      };
      const updatedUser = saveUserCheckIn(checkInData);
      if (updatedUser) {
        setUser(updatedUser);
        setCheckInHistory(updatedUser.checkInHistory || []);
        setActiveQuests(updatedUser.activeQuests || pendingCheckIn.activeQuests || []);
        setHealthType(pendingCheckIn.healthType);
      }
      setPendingCheckIn(null);
      setScreen('map');
    } else if (userData.checkInHistory?.length > 0) {
      // Returning user with history - go to map
      setScreen('map');
    } else {
      // Returning user with no history (edge case) - go to onboarding
      setScreen('onboarding');
    }
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    setUser(null);
    setCheckInHistory([]);
    setSortedCompanions([]);
    setResponses({});
    setSelectedQuests([]);
    setScreen('landing');
  };

  // Landing handlers
  const handleStartNew = () => {
    // Go straight to quiz - signup happens at save
    setScreen('onboarding');
  };

  const handleCheckForest = () => {
    setAuthMode('login');
    setScreen('auth');
  };

  // Check-in flow
  const handleBeginCheckIn = () => {
    setCurrentCompanionIndex(0);
    setResponses({});
    setScreen('checkin');
  };

  const handleCompanionComplete = (companionAnswers) => {
    const newResponses = { ...responses, ...companionAnswers };
    setResponses(newResponses);

    if (currentCompanionIndex < companions.length - 1) {
      setCurrentCompanionIndex(currentCompanionIndex + 1);
    } else {
      // Calculate and store sorted companions
      const scores = companions.map(companion => {
        const answers = Object.entries(newResponses)
          .filter(([key]) => key.startsWith(companion.id))
          .map(([, value]) => typeof value === 'number' ? value : 50);
        const avgScore = answers.length > 0
          ? answers.reduce((sum, val) => sum + val, 0) / answers.length
          : 50;
        const safeScore = isNaN(avgScore) ? 50 : avgScore;
        return {
          ...companion,
          score: safeScore,
          level: getLevel(safeScore)
        };
      });

      const sorted = [...scores].sort((a, b) => a.score - b.score);
      setSortedCompanions(sorted);

      // Calculate health type based on responses
      const typeResult = calculateHealthType(newResponses, scores);
      setHealthType(typeResult.primary);

      setScreen('dashboard');
    }
  };

  const handleBackFromCompanion = () => {
    if (currentCompanionIndex > 0) {
      setCurrentCompanionIndex(currentCompanionIndex - 1);
    } else {
      setScreen('onboarding');
    }
  };

  // Navigation handlers
  const handleViewQuests = () => setScreen('quests');
  const handleExploreBlood = () => setScreen('blood-layer');
  const handleReflect = () => setScreen('reflection');

  const handleAddQuest = (quest, companionId) => {
    setSelectedQuests(prev => [...prev, `${companionId}-community`]);

    // Also add to active quests for map display
    const newQuest = {
      id: `${companionId}-${Date.now()}`,
      companionId,
      text: quest,
      icon: getQuestIcon(quest),
      status: 'active',
      addedAt: new Date().toISOString()
    };
    setActiveQuests(prev => {
      // Don't add duplicate quests
      if (prev.some(q => q.text === quest && q.companionId === companionId)) {
        return prev;
      }
      return [...prev, newQuest];
    });
  };

  // Nature elements that can grow when quests are completed
  const natureElements = [
    { emoji: '🌸', name: 'Cherry Blossom', type: 'flower' },
    { emoji: '🌺', name: 'Hibiscus', type: 'flower' },
    { emoji: '🌻', name: 'Sunflower', type: 'flower' },
    { emoji: '🌷', name: 'Tulip', type: 'flower' },
    { emoji: '🌹', name: 'Rose', type: 'flower' },
    { emoji: '💐', name: 'Bouquet', type: 'flower' },
    { emoji: '🪻', name: 'Hyacinth', type: 'flower' },
    { emoji: '🌼', name: 'Daisy', type: 'flower' },
    { emoji: '🌱', name: 'Seedling', type: 'plant' },
    { emoji: '🌿', name: 'Herb', type: 'plant' },
    { emoji: '☘️', name: 'Clover', type: 'plant' },
    { emoji: '🍀', name: 'Four Leaf Clover', type: 'plant' },
    { emoji: '🌲', name: 'Pine Tree', type: 'tree' },
    { emoji: '🌳', name: 'Tree', type: 'tree' },
    { emoji: '🌴', name: 'Palm Tree', type: 'tree' },
    { emoji: '🎋', name: 'Bamboo', type: 'tree' },
    { emoji: '🍄', name: 'Mushroom', type: 'fungi' },
    { emoji: '🦋', name: 'Butterfly', type: 'creature' },
    { emoji: '🐝', name: 'Bee', type: 'creature' },
    { emoji: '🐞', name: 'Ladybug', type: 'creature' },
  ];

  // Complete a quest
  const handleCompleteQuest = (questId) => {
    const quest = activeQuests.find(q => q.id === questId);
    const updatedQuests = activeQuests.map(q =>
      q.id === questId ? { ...q, status: 'completed', completedAt: new Date().toISOString() } : q
    );
    setActiveQuests(updatedQuests);

    // Add a nature element to the garden!
    if (quest) {
      const randomElement = natureElements[Math.floor(Math.random() * natureElements.length)];
      const newGardenElement = {
        id: `garden-${Date.now()}`,
        ...randomElement,
        companionId: quest.companionId,
        questText: quest.text,
        plantedAt: new Date().toISOString(),
        // Random position offset from companion
        offsetX: (Math.random() - 0.5) * 30,
        offsetY: (Math.random() - 0.5) * 20,
      };

      setGardenElements(prev => {
        const updated = [...prev, newGardenElement];
        // Persist to user storage
        if (user) {
          updateGardenElements(updated);
        }
        return updated;
      });
    }

    // Persist quests to user storage
    if (user) {
      updateActiveQuests(updatedQuests);
    }
  };

  // Remove a quest
  const handleRemoveQuest = (questId) => {
    const updatedQuests = activeQuests.filter(q => q.id !== questId);
    setActiveQuests(updatedQuests);
    // Persist to user storage
    if (user) {
      updateActiveQuests(updatedQuests);
    }
  };

  // Add a custom quest from the map
  const handleAddCustomQuest = (quest) => {
    setActiveQuests(prev => {
      // Don't add duplicates
      if (prev.some(q => q.text === quest.text && q.companionId === quest.companionId)) {
        return prev;
      }
      const updatedQuests = [...prev, quest];
      // Persist to user storage
      if (user) {
        updateActiveQuests(updatedQuests);
      }
      return updatedQuests;
    });
  };

  const handleQuestsFinish = (quests, customQuests = []) => {
    setSelectedQuests(quests);

    // Convert selected quest keys to activeQuests format for map display
    const newActiveQuests = quests
      .filter(questKey => !questKey.startsWith('custom-')) // Skip custom quest IDs
      .map(questKey => {
        const [companionId, questIndex] = questKey.split('-');
        const companion = companions.find(c => c.id === companionId);
        const quest = companion?.microQuests?.[parseInt(questIndex)];

        if (!companion || !quest) return null;

        return {
          id: `${companionId}-${Date.now()}-${questIndex}`,
          companionId,
          text: quest.text,
          icon: quest.icon,
          status: 'active',
          addedAt: new Date().toISOString()
        };
      }).filter(Boolean);

    // Add custom quests to activeQuests
    const customActiveQuests = customQuests.map(quest => ({
      id: quest.id,
      companionId: quest.companionId,
      text: quest.text,
      icon: quest.icon,
      status: 'active',
      addedAt: new Date().toISOString(),
      isCustom: true
    }));

    // Combine and add to activeQuests (avoid duplicates)
    const allNewQuests = [...newActiveQuests, ...customActiveQuests];
    setActiveQuests(prev => {
      const existingTexts = prev.map(q => `${q.companionId}-${q.text}`);
      const uniqueNew = allNewQuests.filter(q => !existingTexts.includes(`${q.companionId}-${q.text}`));
      return [...prev, ...uniqueNew];
    });

    setScreen('reflection');
  };

  const handleBloodLayerContinue = () => setScreen('reflection');

  // Save check-in
  const handleSave = (checkIn) => {
    const checkInData = {
      responses,
      selectedQuests,
      companionScores: sortedCompanions,
      activeQuests,
      healthType,
      ...checkIn
    };

    if (user) {
      // User is logged in - save directly
      const updatedUser = saveUserCheckIn(checkInData);
      if (updatedUser) {
        setUser(updatedUser);
        setCheckInHistory(updatedUser.checkInHistory || []);
        // Update activeQuests from saved data
        setActiveQuests(updatedUser.activeQuests || activeQuests);
      }
      console.log('Check-in saved:', checkInData);
    } else {
      // User not logged in - store pending data and trigger signup
      setPendingCheckIn({
        responses,
        selectedQuests,
        companionScores: sortedCompanions,
        activeQuests,
        healthType,
        reflection: checkIn
      });
      setAuthMode('signup');
      setScreen('auth');
      return; // Don't go to map yet
    }
  };

  // Return to map
  const handleGoToMap = () => {
    setScreen('map');
    setCurrentCompanionIndex(0);
    setResponses({});
    setSelectedQuests([]);
  };

  return (
    <div className="font-sans">
      {screen === 'landing' && (
        <Landing
          onStart={handleStartNew}
          onCheckForest={handleCheckForest}
        />
      )}

      {screen === 'auth' && (
        <AuthScreen
          mode={authMode}
          onSuccess={handleAuthSuccess}
          onBack={pendingCheckIn ? () => setScreen('reflection') : () => setScreen('landing')}
          fromQuiz={!!pendingCheckIn}
        />
      )}

      {screen === 'map' && (
        <CompanionMap
          companionScores={sortedCompanions}
          checkInHistory={checkInHistory}
          user={user}
          activeQuests={activeQuests}
          healthType={healthType}
          gardenElements={gardenElements}
          visitors={visitors}
          forestCode={forestCode}
          onStartCheckIn={() => setScreen('onboarding')}
          onViewQuests={handleViewQuests}
          onExploreBlood={handleExploreBlood}
          onLogout={handleLogout}
          onCompleteQuest={handleCompleteQuest}
          onRemoveQuest={handleRemoveQuest}
          onAddCustomQuest={handleAddCustomQuest}
        />
      )}

      {screen === 'onboarding' && (
        <Onboarding onBegin={handleBeginCheckIn} />
      )}

      {screen === 'checkin' && currentCompanion && (
        <DomainCheckIn
          companion={currentCompanion}
          currentIndex={currentCompanionIndex}
          totalCompanions={companions.length}
          onComplete={handleCompanionComplete}
          onBack={handleBackFromCompanion}
        />
      )}

      {screen === 'dashboard' && (
        <Dashboard
          responses={responses}
          healthType={healthType}
          isFirstCheckIn={checkInHistory.length === 0}
          onViewQuests={handleViewQuests}
          onExploreBlood={handleExploreBlood}
          onReflect={handleReflect}
          onAddQuest={handleAddQuest}
        />
      )}

      {screen === 'quests' && (
        <MicroQuests
          responses={responses}
          onBack={() => setScreen('dashboard')}
          onFinish={handleQuestsFinish}
        />
      )}

      {screen === 'blood-layer' && (
        <BloodLayerCards
          responses={responses}
          onBack={() => setScreen('dashboard')}
          onContinue={handleBloodLayerContinue}
        />
      )}

      {screen === 'reflection' && (
        <Reflection
          companions={sortedCompanions}
          onSave={handleSave}
          onStartOver={handleGoToMap}
          isLoggedIn={!!user}
        />
      )}
    </div>
  );
}

function getLevel(score) {
  if (score < 35) return 'low';
  if (score < 65) return 'medium';
  return 'high';
}

// Get an icon for a quest based on keywords
function getQuestIcon(questText) {
  const text = questText.toLowerCase();
  if (text.includes('walk') || text.includes('step')) return '🚶';
  if (text.includes('water') || text.includes('drink')) return '💧';
  if (text.includes('breath') || text.includes('meditation')) return '🧘';
  if (text.includes('sleep') || text.includes('bed')) return '🌙';
  if (text.includes('stretch')) return '🙆';
  if (text.includes('vegetable') || text.includes('food') || text.includes('eat')) return '🥗';
  if (text.includes('friend') || text.includes('text') || text.includes('call')) return '💬';
  if (text.includes('grateful') || text.includes('journal')) return '📝';
  if (text.includes('screen') || text.includes('phone')) return '📵';
  if (text.includes('outside') || text.includes('nature')) return '🌳';
  return '✨';
}

export default App;
