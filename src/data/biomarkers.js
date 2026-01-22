// Biomarker glossary with explanations for hover tooltips
// Each biomarker has a simple, friendly explanation

export const biomarkerGlossary = {
  // Energy & Vitality (Pip)
  'Iron levels': {
    name: 'Iron levels',
    emoji: '🔴',
    shortDesc: 'Helps carry oxygen in your blood',
    explanation: 'Iron is essential for making hemoglobin, which carries oxygen throughout your body. Low iron can lead to fatigue and weakness.',
    relatedTo: ['Energy', 'Fatigue', 'Oxygen transport']
  },
  'B12': {
    name: 'Vitamin B12',
    emoji: '💊',
    shortDesc: 'Supports nerve function and energy',
    explanation: 'B12 helps keep your nerve cells healthy and is needed to make DNA and red blood cells. Low levels can cause tiredness and weakness.',
    relatedTo: ['Energy', 'Nerve health', 'Red blood cells']
  },
  'Thyroid markers': {
    name: 'Thyroid markers',
    emoji: '🦋',
    shortDesc: 'Controls your metabolism speed',
    explanation: 'Your thyroid produces hormones that regulate how fast your body uses energy. Imbalances can cause fatigue, weight changes, and mood shifts.',
    relatedTo: ['Metabolism', 'Energy', 'Weight', 'Mood']
  },
  'Blood glucose': {
    name: 'Blood glucose',
    emoji: '🍬',
    shortDesc: 'Your body\'s main energy source',
    explanation: 'Glucose is sugar in your blood that cells use for energy. Keeping levels stable helps maintain steady energy throughout the day.',
    relatedTo: ['Energy', 'Blood sugar', 'Metabolism']
  },

  // Sleep & Rest (Luna)
  'Cortisol patterns': {
    name: 'Cortisol patterns',
    emoji: '📈',
    shortDesc: 'Your stress and wake-sleep hormone',
    explanation: 'Cortisol naturally rises in the morning to help you wake up and drops at night. Disrupted patterns can affect sleep quality and stress levels.',
    relatedTo: ['Sleep', 'Stress', 'Energy rhythm']
  },
  'Melatonin precursors': {
    name: 'Melatonin precursors',
    emoji: '🌙',
    shortDesc: 'Building blocks for sleep hormone',
    explanation: 'Your body makes melatonin from nutrients like tryptophan and B vitamins. These precursors help regulate your sleep-wake cycle.',
    relatedTo: ['Sleep', 'Circadian rhythm', 'Rest']
  },
  'Magnesium': {
    name: 'Magnesium',
    emoji: '✨',
    shortDesc: 'Calms nerves and supports relaxation',
    explanation: 'Magnesium helps regulate neurotransmitters that calm the nervous system. It supports muscle relaxation and quality sleep.',
    relatedTo: ['Sleep', 'Relaxation', 'Muscle function']
  },
  'Vitamin D': {
    name: 'Vitamin D',
    emoji: '☀️',
    shortDesc: 'The sunshine vitamin',
    explanation: 'Vitamin D affects mood, immune function, and sleep quality. Your body makes it from sunlight, but many people have low levels.',
    relatedTo: ['Mood', 'Immune system', 'Sleep', 'Bones']
  },

  // Movement & Body (Ember)
  'Inflammatory markers': {
    name: 'Inflammatory markers',
    emoji: '🔥',
    shortDesc: 'Signs of inflammation in your body',
    explanation: 'Markers like CRP show inflammation levels. Some inflammation is normal, but chronic inflammation can affect how your body feels and recovers.',
    relatedTo: ['Recovery', 'Joint health', 'Overall wellness']
  },
  'Muscle enzymes': {
    name: 'Muscle enzymes',
    emoji: '💪',
    shortDesc: 'Signals of muscle activity and recovery',
    explanation: 'Enzymes like CK are released when muscles work hard or recover. They can show how your body responds to physical activity.',
    relatedTo: ['Exercise recovery', 'Muscle health', 'Physical activity']
  },
  'Electrolytes': {
    name: 'Electrolytes',
    emoji: '⚡',
    shortDesc: 'Minerals that keep you balanced',
    explanation: 'Sodium, potassium, and other electrolytes help muscles contract, nerves fire, and maintain hydration. Balance is key for physical performance.',
    relatedTo: ['Hydration', 'Muscle function', 'Energy']
  },
  'Lactate': {
    name: 'Lactate',
    emoji: '🏃',
    shortDesc: 'Byproduct of intense exercise',
    explanation: 'When muscles work hard without enough oxygen, they produce lactate. It\'s actually a fuel source, not just a cause of soreness.',
    relatedTo: ['Exercise intensity', 'Recovery', 'Fitness']
  },

  // Mind & Mood (Sage)
  'Serotonin precursors': {
    name: 'Serotonin precursors',
    emoji: '🧠',
    shortDesc: 'Building blocks for your mood molecule',
    explanation: 'Your body makes serotonin from amino acids like tryptophan. Adequate precursors support mood stability and emotional well-being.',
    relatedTo: ['Mood', 'Emotional balance', 'Well-being']
  },
  'B vitamins': {
    name: 'B vitamins',
    emoji: '🌈',
    shortDesc: 'Brain and energy supporters',
    explanation: 'B vitamins (B6, B9, B12) are crucial for brain function, mood regulation, and converting food into energy.',
    relatedTo: ['Brain health', 'Energy', 'Mood']
  },
  'Omega-3 levels': {
    name: 'Omega-3 levels',
    emoji: '🐟',
    shortDesc: 'Essential fats for brain health',
    explanation: 'Omega-3 fatty acids support brain cell structure and reduce inflammation. They\'re linked to mood and cognitive function.',
    relatedTo: ['Brain health', 'Mood', 'Inflammation']
  },
  'Blood sugar stability': {
    name: 'Blood sugar stability',
    emoji: '📊',
    shortDesc: 'How steady your energy stays',
    explanation: 'Stable blood sugar means fewer energy crashes and mood swings. Large spikes and drops can affect how you feel mentally.',
    relatedTo: ['Energy', 'Mood stability', 'Focus']
  },

  // Connection & Community (Coral)
  'Oxytocin markers': {
    name: 'Oxytocin markers',
    emoji: '💕',
    shortDesc: 'The bonding and connection hormone',
    explanation: 'Often called the "love hormone," oxytocin is released during social bonding, hugging, and positive interactions with others.',
    relatedTo: ['Social connection', 'Trust', 'Bonding']
  },
  'Immune function': {
    name: 'Immune function',
    emoji: '🛡️',
    shortDesc: 'Your body\'s defense system',
    explanation: 'Social connection actually supports immune health! Loneliness can weaken immunity, while strong relationships can strengthen it.',
    relatedTo: ['Health', 'Wellness', 'Resistance to illness']
  },
  'Heart rate variability': {
    name: 'Heart rate variability',
    emoji: '💓',
    shortDesc: 'How adaptable your heart rhythm is',
    explanation: 'HRV measures variation in time between heartbeats. Higher HRV often indicates better stress resilience and emotional regulation.',
    relatedTo: ['Stress resilience', 'Emotional health', 'Recovery']
  },

  // Nourishment (Brook)
  'Nutrient absorption markers': {
    name: 'Nutrient absorption markers',
    emoji: '🌿',
    shortDesc: 'How well you absorb what you eat',
    explanation: 'These show how effectively your gut absorbs nutrients from food. Good absorption means your body gets what it needs from your diet.',
    relatedTo: ['Digestion', 'Nutrition', 'Gut health']
  },
  'Gut health indicators': {
    name: 'Gut health indicators',
    emoji: '🦠',
    shortDesc: 'Signs of digestive wellness',
    explanation: 'Markers that reflect your gut microbiome health and digestive function. A healthy gut affects mood, immunity, and energy.',
    relatedTo: ['Digestion', 'Microbiome', 'Overall health']
  },
  'Hydration status': {
    name: 'Hydration status',
    emoji: '💧',
    shortDesc: 'How well-hydrated you are',
    explanation: 'Proper hydration affects every system in your body. Even mild dehydration can impact energy, focus, and physical performance.',
    relatedTo: ['Energy', 'Focus', 'Physical performance']
  },
  'Metabolic markers': {
    name: 'Metabolic markers',
    emoji: '🔄',
    shortDesc: 'How your body processes nutrients',
    explanation: 'These show how efficiently your body converts food into energy and building blocks for cells.',
    relatedTo: ['Energy', 'Weight', 'Nutrition']
  },

  // Resilience (Oak)
  'Stress hormones': {
    name: 'Stress hormones',
    emoji: '⚖️',
    shortDesc: 'Your body\'s stress response signals',
    explanation: 'Hormones like cortisol and adrenaline help you respond to challenges. Chronic elevation can affect health and recovery.',
    relatedTo: ['Stress', 'Recovery', 'Adaptation']
  },
  'Recovery markers': {
    name: 'Recovery markers',
    emoji: '🔋',
    shortDesc: 'Signs of how well you bounce back',
    explanation: 'These indicate how well your body recovers from stress, exercise, and daily demands. Good recovery supports long-term resilience.',
    relatedTo: ['Recovery', 'Adaptation', 'Wellness']
  },
  'Antioxidant levels': {
    name: 'Antioxidant levels',
    emoji: '🍇',
    shortDesc: 'Protection against cellular stress',
    explanation: 'Antioxidants protect cells from damage caused by free radicals. They support overall health and help your body handle stress.',
    relatedTo: ['Cellular health', 'Aging', 'Protection']
  },
  'Inflammation balance': {
    name: 'Inflammation balance',
    emoji: '🌡️',
    shortDesc: 'The right amount of inflammation',
    explanation: 'Some inflammation helps healing, but chronic inflammation can cause problems. Balance is key for long-term health.',
    relatedTo: ['Recovery', 'Health', 'Chronic conditions']
  }
};

// Helper function to get biomarker info
export function getBiomarkerInfo(name) {
  return biomarkerGlossary[name] || {
    name,
    emoji: '🔬',
    shortDesc: 'A health marker',
    explanation: 'This biomarker provides insights into your health.',
    relatedTo: ['Health']
  };
}
