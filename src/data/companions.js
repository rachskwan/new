// 7 Health Domain Companions - Animal Characters
// Each companion represents a health domain - they're allies, not judges

export const companions = {
  pip: {
    id: 'pip',
    name: 'Pip',
    animal: 'Seedling Sprite',
    emoji: '🌱',
    moodEmojis: {
      low: '🥀',      // wilting
      medium: '🌱',   // growing
      high: '🌿'      // thriving
    },
    avatar: '/avatars/pip.svg',
    domain: 'Energy & Vitality',
    color: 'emerald',
    gradient: 'from-emerald-300 to-teal-400',
    bgLight: 'bg-emerald-50',
    description: 'A bright little sprite who notices your spark and vitality',
    blurb: "I pay attention to your spark. How's your energy been flowing?",
    curiosityNudge: {
      text: "Sometimes energy patterns connect to things happening inside your body that you can't always feel.",
      cta: "Curious what your body might be signaling?"
    },
    biomarkers: ['Iron levels', 'B12', 'Thyroid markers', 'Blood glucose'],
    questions: [
      {
        id: 'pip-1',
        text: 'How would you describe your energy levels this week?',
        type: 'slider',
        labels: ['Running on empty', 'Steady', 'Buzzing with energy']
      }
    ],
    microQuests: [
      { text: 'Take a 10-minute walk outside', icon: '🚶' },
      { text: 'Notice when your energy peaks today', icon: '📝' },
      { text: 'Try a 2-minute stretch break', icon: '🧘' }
    ]
  },

  luna: {
    id: 'luna',
    name: 'Luna',
    animal: 'Moon Owl',
    emoji: '🦉',
    moodEmojis: {
      low: '😴',      // sleepy/tired
      medium: '🦉',   // neutral owl
      high: '🌙'      // peaceful moon
    },
    avatar: '/avatars/luna.svg',
    domain: 'Sleep & Rest',
    color: 'indigo',
    gradient: 'from-indigo-300 to-purple-400',
    bgLight: 'bg-indigo-50',
    description: 'A wise owl who watches over your sleep and recovery',
    blurb: 'Rest is where you rebuild. How has your sleep been treating you?',
    curiosityNudge: {
      text: "Sleep quality can be influenced by signals in your body you might not notice during the day.",
      cta: "Wonder what patterns might be affecting your rest?"
    },
    biomarkers: ['Cortisol patterns', 'Melatonin precursors', 'Magnesium', 'Vitamin D'],
    questions: [
      {
        id: 'luna-1',
        text: 'How would you rate your sleep quality this week?',
        type: 'slider',
        labels: ['Rough nights', 'Hit or miss', 'Sleeping well']
      }
    ],
    microQuests: [
      { text: 'No screens 30 min before bed tonight', icon: '📵' },
      { text: 'Try a 5-minute breathing exercise before sleep', icon: '🌬️' },
      { text: 'Notice how you feel when you wake up tomorrow', icon: '☀️' }
    ]
  },

  ember: {
    id: 'ember',
    name: 'Ember',
    animal: 'Fox',
    emoji: '🦊',
    moodEmojis: {
      low: '🦥',      // sloth (sluggish)
      medium: '🦊',   // neutral fox
      high: '🏃'      // running (active)
    },
    avatar: '/avatars/ember.svg',
    domain: 'Movement & Body',
    color: 'orange',
    gradient: 'from-orange-300 to-red-400',
    bgLight: 'bg-orange-50',
    description: 'A playful fox who celebrates how your body wants to move',
    blurb: "Your body loves to move in its own way. How's it been feeling?",
    curiosityNudge: {
      text: "How your body feels during movement can relate to invisible factors like inflammation or muscle recovery markers.",
      cta: "Curious about what's happening beneath the surface?"
    },
    biomarkers: ['Inflammation markers (CRP)', 'Creatine kinase', 'Electrolytes', 'Vitamin D'],
    questions: [
      {
        id: 'ember-1',
        text: 'How much intentional movement did you get this week?',
        type: 'slider',
        labels: ['Very little', 'Some movement', 'Moving regularly']
      }
    ],
    microQuests: [
      { text: 'Do 5 minutes of movement you enjoy', icon: '💃' },
      { text: 'Take the stairs today', icon: '🪜' },
      { text: 'Stretch for 3 minutes', icon: '🙆' }
    ]
  },

  sage: {
    id: 'sage',
    name: 'Sage',
    animal: 'Elephant',
    emoji: '🐘',
    moodEmojis: {
      low: '🌫️',      // foggy
      medium: '🐘',   // neutral elephant
      high: '🧠'      // clear mind
    },
    avatar: '/avatars/sage.svg',
    domain: 'Mind & Focus',
    color: 'violet',
    gradient: 'from-violet-300 to-fuchsia-400',
    bgLight: 'bg-violet-50',
    description: 'A gentle elephant who helps notice your mental clarity and calm',
    blurb: 'Your mind is always working. How clear has it felt lately?',
    curiosityNudge: {
      text: "Mental clarity and focus can be influenced by factors like blood sugar stability and certain nutrient levels.",
      cta: "Want to explore what might be affecting your focus?"
    },
    biomarkers: ['Blood glucose', 'Omega-3 index', 'B vitamins', 'Iron'],
    questions: [
      {
        id: 'sage-1',
        text: 'How would you describe your mental clarity this week?',
        type: 'slider',
        labels: ['Foggy', 'Somewhat clear', 'Sharp and focused']
      }
    ],
    microQuests: [
      { text: 'Take 3 deep breaths right now', icon: '🌬️' },
      { text: 'Write down one thing on your mind', icon: '📝' },
      { text: 'Step outside for 2 minutes', icon: '🌳' }
    ]
  },

  coral: {
    id: 'coral',
    name: 'Coral',
    animal: 'Otter',
    emoji: '🦦',
    moodEmojis: {
      low: '😔',      // sad
      medium: '🦦',   // neutral otter
      high: '😊'      // happy
    },
    avatar: '/avatars/coral.svg',
    domain: 'Mood & Emotions',
    color: 'pink',
    gradient: 'from-pink-300 to-rose-400',
    bgLight: 'bg-pink-50',
    description: "A warm otter who sits with whatever you're feeling",
    blurb: "All feelings are welcome here. How's your heart been?",
    curiosityNudge: {
      text: "Mood patterns can sometimes connect to things like hormone balance, vitamin D, and other signals your body sends.",
      cta: "Curious about the connections?"
    },
    biomarkers: ['Vitamin D', 'Thyroid markers', 'B12', 'Omega-3 fatty acids'],
    questions: [
      {
        id: 'coral-1',
        text: 'How would you describe your overall mood this week?',
        type: 'slider',
        labels: ['Heavy', 'Up and down', 'Mostly good']
      },
      {
        id: 'coral-2',
        text: 'What emotions have been most present?',
        type: 'choice',
        options: ['Anxiety or worry', 'Sadness or low mood', 'Frustration or irritation', 'Content or calm', 'A mix of everything']
      }
    ],
    microQuests: [
      { text: 'Text someone you care about', icon: '💬' },
      { text: "Name 3 things you're grateful for", icon: '🙏' },
      { text: 'Do one small thing that makes you smile', icon: '😊' }
    ]
  },

  brook: {
    id: 'brook',
    name: 'Brook',
    animal: 'Bear',
    emoji: '🐻',
    moodEmojis: {
      low: '🍂',      // dry leaf (malnourished)
      medium: '🐻',   // neutral bear
      high: '🍯'      // honey (well-fed)
    },
    avatar: '/avatars/brook.svg',
    domain: 'Nutrition & Nourishment',
    color: 'cyan',
    gradient: 'from-cyan-300 to-blue-400',
    bgLight: 'bg-cyan-50',
    description: "A friendly bear who notices how you're fueling yourself",
    blurb: 'Food is fuel and comfort. How have you been nourishing yourself?',
    curiosityNudge: {
      text: "How you feel after eating can relate to nutrient absorption, blood sugar patterns, and digestive markers.",
      cta: "Wonder what your body is doing with the fuel you give it?"
    },
    biomarkers: ['Blood glucose', 'HbA1c', 'Liver enzymes', 'Nutrient panel'],
    questions: [
      {
        id: 'brook-1',
        text: 'How would you describe your eating patterns this week?',
        type: 'slider',
        labels: ['Chaotic', 'Inconsistent', 'Pretty regular']
      }
    ],
    microQuests: [
      { text: 'Drink a glass of water right now', icon: '🥤' },
      { text: 'Eat one more vegetable today', icon: '🥗' },
      { text: 'Notice how you feel after your next meal', icon: '🍽️' }
    ]
  },

  oak: {
    id: 'oak',
    name: 'Oak',
    animal: 'Tortoise',
    emoji: '🐢',
    moodEmojis: {
      low: '🌪️',      // storm (stressed)
      medium: '🐢',   // neutral tortoise
      high: '🌳'      // strong tree (resilient)
    },
    avatar: '/avatars/oak.svg',
    domain: 'Stress & Resilience',
    color: 'amber',
    gradient: 'from-amber-300 to-yellow-400',
    bgLight: 'bg-amber-50',
    description: 'A steady tortoise who stands with you through stress',
    blurb: 'Life brings storms. How are you weathering them?',
    curiosityNudge: {
      text: "Stress leaves traces in your body — cortisol patterns, inflammation, and other signals that aren't always obvious.",
      cta: "Curious what stress might be doing beneath the surface?"
    },
    biomarkers: ['Cortisol', 'CRP (inflammation)', 'Blood pressure markers', 'Adrenal function'],
    questions: [
      {
        id: 'oak-1',
        text: 'How stressed have you felt this week?',
        type: 'slider',
        labels: ['Very stressed', 'Moderate stress', 'Pretty calm']
      }
    ],
    microQuests: [
      { text: 'Take 5 slow breaths', icon: '🌬️' },
      { text: 'Step away from screens for 10 minutes', icon: '🚶' },
      { text: "Write down what's weighing on you", icon: '📓' }
    ]
  }
};

export const companionOrder = ['pip', 'luna', 'ember', 'sage', 'coral', 'brook', 'oak'];

export function getCompanion(id) {
  return companions[id];
}

export function getAllCompanions() {
  return companionOrder.map(id => companions[id]);
}

// Get the mood-appropriate emoji for a companion based on their level
export function getMoodEmoji(companion, level) {
  if (!companion?.moodEmojis || !level) {
    return companion?.emoji || '🌱';
  }
  return companion.moodEmojis[level] || companion.emoji;
}
