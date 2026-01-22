// Playful Health Types - Fun archetypes based on quiz patterns
// These are descriptive and entertaining, not diagnostic

export const healthTypes = {
  calmNavigator: {
    id: 'calmNavigator',
    name: 'The Calm Navigator',
    emoji: '🌿',
    tagline: 'Steady seas, clear skies',
    description: 'You handle life\'s waves with grace. Reflective and grounded, you find peace in routine and mindful moments.',
    color: 'emerald',
    gradient: 'from-emerald-400 to-teal-500',
    bgLight: 'bg-emerald-50',
    // Companions that resonate with this type
    primaryCompanions: ['luna', 'coral', 'oak'],
    // Traits that contribute to this type
    traits: ['lowStress', 'goodSleep', 'emotionalBalance', 'mindfulness'],
    // Type-specific encouragement
    encouragement: 'Your calm energy is a superpower. Keep nurturing those peaceful moments.',
    // Micro-quest suggestions
    questStyle: 'mindfulness and reflection'
  },

  energeticExplorer: {
    id: 'energeticExplorer',
    name: 'The Energetic Explorer',
    emoji: '⚡',
    tagline: 'Always moving, always curious',
    description: 'You\'ve got spark! High energy and curiosity drive you to try new things and stay active.',
    color: 'orange',
    gradient: 'from-orange-400 to-amber-500',
    bgLight: 'bg-orange-50',
    primaryCompanions: ['ember', 'pip', 'brook'],
    traits: ['highEnergy', 'activeMovement', 'curiosity', 'variety'],
    encouragement: 'Your energy is contagious! Channel it into adventures that light you up.',
    questStyle: 'movement and exploration'
  },

  cozyPlanner: {
    id: 'cozyPlanner',
    name: 'The Cozy Planner',
    emoji: '🐚',
    tagline: 'Slow and steady wins the race',
    description: 'You appreciate the comfort of consistency. Mindful habits and cozy routines are your jam.',
    color: 'amber',
    gradient: 'from-amber-400 to-yellow-500',
    bgLight: 'bg-amber-50',
    primaryCompanions: ['oak', 'brook', 'luna'],
    traits: ['consistency', 'routine', 'selfCare', 'patience'],
    encouragement: 'Your steady approach builds lasting change. Small steps, big impact.',
    questStyle: 'gentle routines and self-care'
  },

  curiousAlchemist: {
    id: 'curiousAlchemist',
    name: 'The Curious Alchemist',
    emoji: '🔮',
    tagline: 'Turning knowledge into gold',
    description: 'You love learning and experimenting! Always exploring new ideas to optimize your wellbeing.',
    color: 'violet',
    gradient: 'from-violet-400 to-purple-500',
    bgLight: 'bg-violet-50',
    primaryCompanions: ['sage', 'pip', 'ember'],
    traits: ['learning', 'experimenting', 'analyzing', 'optimizing'],
    encouragement: 'Your curiosity is a gift. Keep experimenting and discovering what works for you.',
    questStyle: 'learning and experimentation'
  },

  socialConnector: {
    id: 'socialConnector',
    name: 'The Social Connector',
    emoji: '🌈',
    tagline: 'Together is better',
    description: 'You thrive on connection! Community, friends, and shared experiences fuel your wellbeing.',
    color: 'pink',
    gradient: 'from-pink-400 to-rose-500',
    bgLight: 'bg-pink-50',
    primaryCompanions: ['coral', 'ember', 'pip'],
    traits: ['social', 'community', 'sharing', 'connection'],
    encouragement: 'Your connections lift everyone up. Keep spreading that positive energy!',
    questStyle: 'social activities and sharing'
  },

  balancedBuilder: {
    id: 'balancedBuilder',
    name: 'The Balanced Builder',
    emoji: '🧩',
    tagline: 'A little of everything',
    description: 'You\'re adaptable and well-rounded! You balance activity and rest, trying a bit of everything.',
    color: 'cyan',
    gradient: 'from-cyan-400 to-blue-500',
    bgLight: 'bg-cyan-50',
    primaryCompanions: ['brook', 'sage', 'coral'],
    traits: ['balance', 'adaptability', 'variety', 'moderation'],
    encouragement: 'Your balance is beautiful. Keep mixing things up and staying flexible.',
    questStyle: 'varied activities and balance'
  }
};

export const healthTypeOrder = [
  'calmNavigator',
  'energeticExplorer',
  'cozyPlanner',
  'curiousAlchemist',
  'socialConnector',
  'balancedBuilder'
];

// Calculate health type based on quiz responses and companion scores
export function calculateHealthType(responses, companionScores) {
  const scores = {
    calmNavigator: 0,
    energeticExplorer: 0,
    cozyPlanner: 0,
    curiousAlchemist: 0,
    socialConnector: 0,
    balancedBuilder: 0
  };

  // Analyze responses by companion domain
  if (companionScores && companionScores.length > 0) {
    companionScores.forEach(companion => {
      const score = companion.score || 50;
      const level = companion.level || 'medium';

      switch (companion.id) {
        case 'pip': // Energy
          if (score > 60) {
            scores.energeticExplorer += 3;
            scores.curiousAlchemist += 1;
          } else if (score < 40) {
            scores.cozyPlanner += 2;
            scores.calmNavigator += 1;
          }
          break;

        case 'luna': // Sleep
          if (score > 60) {
            scores.calmNavigator += 3;
            scores.cozyPlanner += 2;
          } else if (score < 40) {
            scores.energeticExplorer += 1;
          }
          break;

        case 'ember': // Movement
          if (score > 60) {
            scores.energeticExplorer += 3;
            scores.balancedBuilder += 1;
          } else if (score < 40) {
            scores.cozyPlanner += 2;
          }
          break;

        case 'sage': // Mind/Focus
          if (score > 60) {
            scores.curiousAlchemist += 3;
            scores.calmNavigator += 2;
          } else if (score < 40) {
            scores.socialConnector += 1;
          }
          break;

        case 'coral': // Mood/Emotions
          if (score > 60) {
            scores.socialConnector += 3;
            scores.calmNavigator += 2;
          } else if (score < 40) {
            scores.cozyPlanner += 1;
          }
          break;

        case 'brook': // Nutrition
          if (score > 60) {
            scores.balancedBuilder += 3;
            scores.cozyPlanner += 2;
          } else if (score < 40) {
            scores.energeticExplorer += 1;
          }
          break;

        case 'oak': // Stress
          if (score > 60) {
            scores.calmNavigator += 3;
            scores.balancedBuilder += 2;
          } else if (score < 40) {
            scores.curiousAlchemist += 1;
          }
          break;
      }
    });
  }

  // Analyze specific response patterns
  if (responses) {
    // Check for variety in answers (indicates curiosity/exploration)
    const uniqueValues = new Set(Object.values(responses)).size;
    if (uniqueValues > 10) {
      scores.curiousAlchemist += 2;
      scores.energeticExplorer += 1;
    }

    // Check for consistency (similar answers = routine-oriented)
    const values = Object.values(responses).filter(v => typeof v === 'number');
    if (values.length > 0) {
      const avg = values.reduce((a, b) => a + b, 0) / values.length;
      const variance = values.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / values.length;

      if (variance < 200) {
        scores.cozyPlanner += 2;
        scores.balancedBuilder += 2;
      }
    }
  }

  // Find the highest scoring type
  let maxScore = 0;
  let primaryType = 'balancedBuilder';
  let secondaryType = null;

  Object.entries(scores).forEach(([type, score]) => {
    if (score > maxScore) {
      secondaryType = primaryType;
      maxScore = score;
      primaryType = type;
    }
  });

  // If scores are very close, user is balanced
  const sortedScores = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  if (sortedScores[0][1] - sortedScores[1][1] < 2) {
    primaryType = 'balancedBuilder';
  }

  return {
    primary: healthTypes[primaryType],
    secondary: secondaryType ? healthTypes[secondaryType] : null,
    scores
  };
}

// Get type-specific quest suggestions
export function getTypeQuestSuggestions(typeId) {
  const suggestions = {
    calmNavigator: [
      'Try 5 minutes of gentle breathing',
      'Take a mindful walk without your phone',
      'Write down 3 things you\'re grateful for'
    ],
    energeticExplorer: [
      'Try a new type of movement today',
      'Explore somewhere you\'ve never been',
      'Challenge yourself to 10 minutes of activity'
    ],
    cozyPlanner: [
      'Set up a cozy evening routine',
      'Prepare a nourishing meal with care',
      'Create a small self-care ritual'
    ],
    curiousAlchemist: [
      'Research a health topic that interests you',
      'Try tracking a new metric for a week',
      'Experiment with a new healthy habit'
    ],
    socialConnector: [
      'Reach out to a friend you haven\'t talked to',
      'Share a healthy meal with someone',
      'Join a group activity or class'
    ],
    balancedBuilder: [
      'Mix up your routine with something new',
      'Balance activity with rest today',
      'Try a little bit of everything this week'
    ]
  };

  return suggestions[typeId] || suggestions.balancedBuilder;
}

// Get type-specific companion message
export function getTypeCompanionMessage(typeId, companionName) {
  const messages = {
    calmNavigator: `As a Calm Navigator, ${companionName} thinks you'll love a peaceful moment today.`,
    energeticExplorer: `Your Energetic Explorer spirit has ${companionName} excited for adventure!`,
    cozyPlanner: `${companionName} has a cozy suggestion perfect for your Planner soul.`,
    curiousAlchemist: `${companionName} found something fascinating for your Curious Alchemist mind!`,
    socialConnector: `${companionName} knows you're a Social Connector - share this with a friend!`,
    balancedBuilder: `${companionName} appreciates your Balanced Builder approach - try a bit of everything!`
  };

  return messages[typeId] || `${companionName} has a suggestion for you!`;
}

export function getHealthType(id) {
  return healthTypes[id];
}

export function getAllHealthTypes() {
  return healthTypeOrder.map(id => healthTypes[id]);
}
