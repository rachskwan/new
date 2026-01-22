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
      },
      {
        id: 'pip-2',
        text: 'When do you feel most alive during the day?',
        type: 'choice',
        options: ['Early morning', 'Mid-morning', 'Afternoon', 'Evening', 'It varies a lot']
      },
      {
        id: 'pip-3',
        text: 'Have you noticed any energy crashes this week?',
        type: 'choice',
        options: ['No crashes', 'One or two dips', 'Daily crashes', 'Constant low energy']
      },
      {
        id: 'pip-4',
        text: 'How refreshed do you feel after sleeping?',
        type: 'slider',
        labels: ['Still exhausted', 'Okay', 'Fully recharged']
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
      },
      {
        id: 'luna-2',
        text: 'What time do you usually fall asleep?',
        type: 'choice',
        options: ['Before 10pm', '10pm - 11pm', '11pm - midnight', 'After midnight', "It's all over the place"]
      },
      {
        id: 'luna-3',
        text: 'Do you wake up during the night?',
        type: 'choice',
        options: ['Rarely', 'Once usually', 'Multiple times', 'Almost every hour']
      },
      {
        id: 'luna-4',
        text: "How's your wind-down routine?",
        type: 'choice',
        options: ['I have a good routine', 'Sometimes I wind down', "I just crash when I'm tired", 'What routine?']
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
      },
      {
        id: 'ember-2',
        text: 'What kind of movement feels good to you right now?',
        type: 'choice',
        options: ['Gentle (walking, stretching)', 'Moderate (hiking, swimming)', 'Intense (running, weights)', "I'm not sure what I need"]
      },
      {
        id: 'ember-3',
        text: 'How does your body feel overall?',
        type: 'slider',
        labels: ['Tight and stuck', 'A bit stiff', 'Loose and mobile']
      },
      {
        id: 'ember-4',
        text: 'Any aches or pains showing up?',
        type: 'choice',
        options: ['Nothing notable', 'A few minor things', 'Something persistent', 'Multiple areas bothering me']
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
      },
      {
        id: 'sage-2',
        text: "How's your ability to concentrate?",
        type: 'choice',
        options: ['Easily distracted', 'Can focus for short bursts', 'Pretty good focus', 'Deep concentration when needed']
      },
      {
        id: 'sage-3',
        text: 'How much mental load are you carrying?',
        type: 'slider',
        labels: ['Overwhelmed', 'Managing', 'Light and clear']
      },
      {
        id: 'sage-4',
        text: 'Have you had moments of calm this week?',
        type: 'choice',
        options: ['Rarely or never', 'A few moments', 'Most days', 'Yes, I make time for it']
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
      },
      {
        id: 'coral-3',
        text: 'How connected do you feel to people you care about?',
        type: 'slider',
        labels: ['Disconnected', 'Somewhat connected', 'Very connected']
      },
      {
        id: 'coral-4',
        text: 'Have you had moments of joy or laughter this week?',
        type: 'choice',
        options: ['Not really', 'One or two moments', 'Several times', 'Every day']
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
      },
      {
        id: 'brook-2',
        text: 'How much water are you drinking?',
        type: 'choice',
        options: ['Barely any', 'A few glasses', 'Decent amount', 'Well hydrated']
      },
      {
        id: 'brook-3',
        text: 'How do you feel after eating?',
        type: 'choice',
        options: ['Heavy or bloated', 'Sometimes uncomfortable', 'Usually fine', 'Energized and satisfied']
      },
      {
        id: 'brook-4',
        text: 'Are you eating mostly real food or convenience food?',
        type: 'slider',
        labels: ['Mostly packaged/fast food', 'Mixed', 'Mostly whole foods']
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
      },
      {
        id: 'oak-2',
        text: "What's your main source of stress right now?",
        type: 'choice',
        options: ['Work/school', 'Relationships', 'Health concerns', 'Money/finances', 'General overwhelm', 'Nothing major']
      },
      {
        id: 'oak-3',
        text: 'Do you have ways to decompress?',
        type: 'choice',
        options: ['Not really', 'Sometimes I remember to', 'I have a few go-tos', 'Yes, I practice regularly']
      },
      {
        id: 'oak-4',
        text: 'How quickly do you recover from stressful moments?',
        type: 'slider',
        labels: ['They linger for days', 'Takes a while', 'I bounce back fairly quickly']
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
