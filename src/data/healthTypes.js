// Health MBTI Types - 16 Personality-Based Health Archetypes
// Each type has a critter mascot, narrative description, and personalized insights

export const healthTypes = {
  ISTJ: {
    id: 'ISTJ',
    name: 'The Inspector',
    critter: '🐢',
    tagline: 'Steady steps, lasting progress',
    description: "You, the Turtle, move through your wellness journey with steady, deliberate steps. While others chase the latest trends, you trust in time-tested routines and proven methods. Your health log is meticulous, your schedule unwavering. Like the turtle who wins the race, you know that consistency beats intensity every time.",
    color: 'emerald',
    gradient: 'from-emerald-400 to-teal-500',
    bgLight: 'bg-emerald-50',
    strengths: ['Unwavering discipline that builds lasting habits', 'Meticulous attention to health details', 'Rock-solid commitment to preventive care', 'The patience to see long-term results'],
    habits: ['Morning routines that never waver', 'Detailed health journals and trackers', 'Regular checkups scheduled months ahead', 'Meal prep Sundays, every Sunday'],
    pitfalls: ['The familiar path may keep you from better routes', 'Change feels like chaos, even when it\'s growth', 'Sometimes the body needs spontaneity'],
    traits: ['Steady', 'Reliable', 'Disciplined', 'Traditional'],
    nudge: "Turtle, you value reliability and planning. Schedule your Dalton blood test — a steady, dependable way to monitor your health over time and add concrete data to your meticulous health log.",
    questStyle: 'structured routines and tracking'
  },

  ISFJ: {
    id: 'ISFJ',
    name: 'The Protector',
    critter: '🐨',
    tagline: 'Nurturing yourself and others',
    description: "You, the Koala, embrace wellness with gentle, nurturing energy. Your self-care rituals are warm and comforting—a cozy yoga session, a nourishing meal shared with loved ones. You're the friend everyone turns to for health support, often caring for others before yourself. Your superpower? Making wellness feel like a warm hug.",
    color: 'pink',
    gradient: 'from-pink-400 to-rose-500',
    bgLight: 'bg-pink-50',
    strengths: ['A nurturing touch that makes health feel safe', 'Dependable consistency others can count on', 'Natural ability to support others\' journeys', 'Patience with slow, sustainable progress'],
    habits: ['Gentle yoga in soft morning light', 'Cooking healing meals for loved ones', 'Building wellness support circles', 'Comforting bedtime rituals'],
    pitfalls: ['Your own needs often come last', 'Comfort zones can become cages', 'Sometimes growth requires discomfort'],
    traits: ['Nurturing', 'Gentle', 'Dependable', 'Caring'],
    nudge: "Koala, you nurture everyone around you so beautifully. Protect your own well-being with a Dalton blood test — a gentle, reliable check-in that supports your long-term self-care so you can keep caring for others.",
    questStyle: 'gentle self-care and nurturing'
  },

  INFJ: {
    id: 'INFJ',
    name: 'The Advocate',
    critter: '🦢',
    tagline: 'Wellness with purpose',
    description: "You, the Swan, glide through wellness with grace and purpose. Every health choice connects to something deeper—your values, your mission, your soul's calling. While others count calories, you're contemplating how movement connects mind, body, and spirit. Your wellness journey isn't just about health; it's about becoming who you're meant to be.",
    color: 'violet',
    gradient: 'from-violet-400 to-purple-500',
    bgLight: 'bg-violet-50',
    strengths: ['Profound mind-body-spirit awareness', 'Health goals infused with deep meaning', 'Intuition that knows what you truly need', 'Commitment to holistic transformation'],
    habits: ['Meditation that touches the soul', 'Mindful movement as moving meditation', 'Journaling to decode body wisdom', 'Nutrition as spiritual practice'],
    pitfalls: ['Perfectionism can paralyze progress', 'Overthinking clouds intuition', 'Sometimes a walk is just a walk'],
    traits: ['Purposeful', 'Reflective', 'Holistic', 'Visionary'],
    nudge: "Swan, you pursue holistic wellness with such grace. A Dalton blood test fits seamlessly into your reflective approach — a small but meaningful insight into your body's balance that connects the physical to the purposeful.",
    questStyle: 'mindful and purposeful practices'
  },

  INTJ: {
    id: 'INTJ',
    name: 'The Mastermind',
    critter: '🦉',
    tagline: 'Strategic wellness mastery',
    description: "You, the Owl, approach wellness like a chess grandmaster—always thinking several moves ahead. Your body is a system to be optimized, your health a strategy to be mastered. While others follow trends, you're analyzing research papers and designing personalized protocols. Your wellness journey is a masterpiece of strategic planning.",
    color: 'indigo',
    gradient: 'from-indigo-400 to-blue-500',
    bgLight: 'bg-indigo-50',
    strengths: ['Strategic vision that sees the long game', 'Self-discipline that needs no cheerleader', 'Analytical mind that optimizes everything', 'Independence to forge your own path'],
    habits: ['Biohacking experiments with careful tracking', 'Long-term wellness roadmaps', 'Deep dives into health science', 'Precision-engineered routines'],
    pitfalls: ['Analysis paralysis can stall action', 'Metrics can overshadow joy', 'Even masterminds need human connection'],
    traits: ['Strategic', 'Analytical', 'Independent', 'Optimizing'],
    nudge: "Owl, you think strategically about everything. A Dalton blood test provides key data points to refine your long-term health plan — a calculated step toward mastery of your wellness system.",
    questStyle: 'strategic optimization and data'
  },

  ISTP: {
    id: 'ISTP',
    name: 'The Craftsman',
    critter: '🐱',
    tagline: 'Practical, independent wellness',
    description: "You, the Cat, navigate wellness with cool independence and practical grace. No guru needed—you learn by doing, adjusting, mastering. Your approach is hands-on and efficient: if it works, keep it; if it doesn't, move on. Like a cat always landing on its feet, you adapt to whatever wellness challenges arise.",
    color: 'slate',
    gradient: 'from-slate-400 to-gray-500',
    bgLight: 'bg-slate-50',
    strengths: ['Adaptability that handles any situation', 'Self-reliance that needs no hand-holding', 'Practical solutions over complicated theories', 'Cool composure under pressure'],
    habits: ['Solo runs and solitary strength training', 'DIY home gym setups', 'Learning physical skills through practice', 'Minimalist, efficient routines'],
    pitfalls: ['Tomorrow\'s health can wait... or can it?', 'Lone wolves miss pack wisdom', 'Structure isn\'t always the enemy'],
    traits: ['Practical', 'Independent', 'Adaptable', 'Efficient'],
    nudge: "Cat, you're practical and independent — you like taking things into your own hands. A Dalton blood test is a simple, hands-on way to take control of your personal health insights without any fuss.",
    questStyle: 'practical solo activities'
  },

  ISFP: {
    id: 'ISFP',
    name: 'The Artist',
    critter: '🦌',
    tagline: 'Intuitive, creative wellness',
    description: "You, the Deer, move through wellness with quiet grace and artistic sensitivity. Your body speaks, and you listen—intuition guiding you to what feels right. Health isn't a checklist; it's an ever-changing canvas where movement, nature, and self-expression paint your wellbeing.",
    color: 'teal',
    gradient: 'from-teal-400 to-cyan-500',
    bgLight: 'bg-teal-50',
    strengths: ['Body intuition that knows before the mind does', 'Creative approaches that make wellness art', 'Present-moment awareness others envy', 'Authentic choices true to yourself'],
    habits: ['Forest walks that feed the soul', 'Dance and expressive movement', 'Intuitive eating guided by body wisdom', 'Creative self-care rituals'],
    pitfalls: ['Structure feels like a cage', 'Inspiration is fickle; discipline is not', 'Some health truths require tracking'],
    traits: ['Intuitive', 'Creative', 'Authentic', 'Nature-Loving'],
    nudge: "Deer, you move with such beautiful intuition. Consider a Dalton blood test as a mindful step — a creative way to understand your body's deeper needs and add insight to your artistic wellness journey.",
    questStyle: 'creative and nature-based'
  },

  INFP: {
    id: 'INFP',
    name: 'The Nurturer',
    critter: '🐰',
    tagline: 'Gentle, meaningful wellness',
    description: "You, the Rabbit, hop through your wellness journey with gentle curiosity and deep feeling. Health for you is about emotional harmony and meaningful practices—not punishment or rigid rules. You seek wellness that aligns with your values and nurtures your sensitive soul.",
    color: 'rose',
    gradient: 'from-rose-400 to-pink-500',
    bgLight: 'bg-rose-50',
    strengths: ['Emotional intelligence that guides true wellness', 'Intuition about what your heart needs', 'Values-driven choices that feel authentic', 'Gentle self-compassion on hard days'],
    habits: ['Journaling to process and heal', 'Gentle yoga that honors your pace', 'Community circles of support', 'Mindfulness and stress relief rituals'],
    pitfalls: ['Feelings can derail the best intentions', 'Self-criticism hides behind self-care', 'Some structure is actually freedom'],
    traits: ['Empathetic', 'Gentle', 'Values-Driven', 'Intuitive'],
    nudge: "Rabbit, you value gentle, mindful approaches to everything. A Dalton blood test is an easy, low-stress step to support your emotional and physical well-being — no pressure, just peaceful self-knowledge.",
    questStyle: 'gentle and emotionally meaningful'
  },

  INTP: {
    id: 'INTP',
    name: 'The Thinker',
    critter: '🐙',
    tagline: 'Curious, experimental wellness',
    description: "You, the Octopus, wrap your many curious arms around every wellness theory and experiment. Why does this diet work? What's the mechanism behind that exercise? Your health journey is a fascinating puzzle to solve, full of hypotheses to test and discoveries to make.",
    color: 'purple',
    gradient: 'from-purple-400 to-violet-500',
    bgLight: 'bg-purple-50',
    strengths: ['Endless curiosity that finds better ways', 'Research skills that separate fact from fad', 'Openness to unconventional approaches', 'Analytical mind that solves health puzzles'],
    habits: ['N=1 experiments on yourself', 'Deep research rabbit holes', 'Data tracking and analysis', 'Unconventional protocols that work for you'],
    pitfalls: ['Reading about fitness isn\'t doing fitness', 'Consistency is the ultimate experiment', 'Your body has feelings too'],
    traits: ['Curious', 'Analytical', 'Innovative', 'Experimental'],
    nudge: "Octopus, curiosity drives everything you do. Explore what your body reveals with a Dalton blood test — a data-driven experiment in your personal health research that gives you real numbers to analyze.",
    questStyle: 'research and experimentation'
  },

  ESTP: {
    id: 'ESTP',
    name: 'The Adventurer',
    critter: '🦦',
    tagline: 'Energetic, spontaneous wellness',
    description: "You, the Otter, splash through wellness with infectious energy and spontaneous joy. Why walk when you can run? Why run alone when friends make it fun? Your health journey is an adventure—full of challenges conquered, games played, and experiences collected.",
    color: 'orange',
    gradient: 'from-orange-400 to-amber-500',
    bgLight: 'bg-orange-50',
    strengths: ['Boundless energy that\'s genuinely contagious', 'Adaptability that thrives on variety', 'Love of physical challenges and thrills', 'Social magnetism in group fitness'],
    habits: ['Team sports and group adventures', 'Hiking trails you\'ve never tried', 'Active games with competitive spirit', 'Spontaneous workout decisions'],
    pitfalls: ['Checkups? That\'s future you\'s problem', 'Rest days feel like lost days', 'The body keeps score of skipped recovery'],
    traits: ['Energetic', 'Adventurous', 'Spontaneous', 'Social'],
    nudge: "Otter, you thrive on new experiences! Make your next adventure a quick Dalton blood test — a fast, easy step that adds insight to your energetic lifestyle so you can keep playing at full speed.",
    questStyle: 'active adventures and challenges'
  },

  ESFP: {
    id: 'ESFP',
    name: 'The Performer',
    critter: '🐬',
    tagline: 'Playful, joyful wellness',
    description: "You, the Dolphin, leap through wellness with playful joy and social grace. Exercise should be fun—no, exercise IS fun when you're involved. Dance classes, beach volleyball, laughing through group fitness... your wellness journey looks more like a party than a program.",
    color: 'cyan',
    gradient: 'from-cyan-400 to-blue-500',
    bgLight: 'bg-cyan-50',
    strengths: ['Magical ability to make fitness genuinely fun', 'Natural rhythm and body awareness', 'Adaptability that keeps things fresh', 'Social energy that lifts everyone up'],
    habits: ['Dance classes that feel like celebration', 'Playful workouts with friends', 'Short, fun fitness challenges', 'Active social gatherings'],
    pitfalls: ['Routines are the enemy of fun... but also the friend of results', 'Shiny new workouts can distract from progress', 'Sometimes the party needs a rest day'],
    traits: ['Playful', 'Joyful', 'Social', 'Adaptable'],
    nudge: "Dolphin, you love fun and variety in everything! Treat yourself to a Dalton blood test — a small, playful step that keeps your health in check so you're ready for more adventures and celebrations.",
    questStyle: 'fun social activities'
  },

  ENFP: {
    id: 'ENFP',
    name: 'The Explorer',
    critter: '🦋',
    tagline: 'Creative, inspiring wellness',
    description: "You, the Butterfly, flutter through wellness tasting every flower—new workouts, fresh approaches, meaningful practices. Your journey is colorful and ever-changing, driven by enthusiasm and a search for health that feels inspiring and purposeful.",
    color: 'fuchsia',
    gradient: 'from-fuchsia-400 to-pink-500',
    bgLight: 'bg-fuchsia-50',
    strengths: ['Creative spark that reinvents wellness', 'Enthusiasm that inspires everyone around you', 'Ability to find meaning in movement', 'Openness to try anything once'],
    habits: ['Mindful movement explorations', 'Journaling your wellness discoveries', 'Inspiring others on their journeys', 'Meaningful fitness challenges'],
    pitfalls: ['Starting is easy; finishing is the challenge', 'The next shiny workout calls...', 'Boring basics build beautiful butterflies'],
    traits: ['Creative', 'Enthusiastic', 'Inspiring', 'Exploratory'],
    nudge: "Butterfly, you thrive on meaningful experiences! Add a Dalton blood test to your wellness journey — a reflective, empowering step toward deeper self-understanding that fits your exploratory spirit.",
    questStyle: 'creative exploration and meaning'
  },

  ENTP: {
    id: 'ENTP',
    name: 'The Innovator',
    critter: '🦊',
    tagline: 'Clever, optimizing wellness',
    description: "You, the Fox, outsmart the wellness game with clever hacks and innovative approaches. Why follow the crowd when you can find a better way? Your health journey is full of experiments, optimizations, and probably a few debates about whether that study was actually well-designed.",
    color: 'amber',
    gradient: 'from-amber-400 to-orange-500',
    bgLight: 'bg-amber-50',
    strengths: ['Innovation that finds shortcuts others miss', 'Flexibility to pivot when data demands it', 'Optimization mindset for peak efficiency', 'Willingness to question everything'],
    habits: ['Biohacking nutrition experiments', 'Interval training innovations', 'Testing the latest wellness tech', 'Efficiency-optimized routines'],
    pitfalls: ['The grass is always greener in the next protocol', 'Debating beats doing sometimes', 'Consistency: the unsexy secret of success'],
    traits: ['Innovative', 'Clever', 'Flexible', 'Questioning'],
    nudge: "Fox, you love experimenting and finding better ways! Try a Dalton blood test to see what insights your body can reveal — another clever tool to innovate your health routine with real data.",
    questStyle: 'innovation and optimization'
  },

  ESTJ: {
    id: 'ESTJ',
    name: 'The Planner',
    critter: '🦫',
    tagline: 'Structured, goal-driven wellness',
    description: "You, the Beaver, build your wellness with industrious determination and systematic precision. Dam by dam, habit by habit, you construct a fortress of health. Your meal prep is legendary, your workout schedule unshakeable, your results... inevitable.",
    color: 'stone',
    gradient: 'from-stone-400 to-neutral-500',
    bgLight: 'bg-stone-50',
    strengths: ['Consistency that compounds into excellence', 'Accountability that keeps you honest', 'Goal-orientation that hits every target', 'Systems thinking that builds lasting habits'],
    habits: ['Meal prep rituals, same time every week', 'Workouts scheduled like important meetings', 'Progress tracking dashboards', 'Morning routines executed with precision'],
    pitfalls: ['Rigidity can crack under life\'s chaos', 'The plan is not the goal', 'Sometimes the scenic route is medicine'],
    traits: ['Organized', 'Disciplined', 'Goal-Oriented', 'Systematic'],
    nudge: "Beaver, your strength is structured routines. Schedule your Dalton blood test this week — it's just another way to track and optimize your health metrics with the precision you love.",
    questStyle: 'structured planning and tracking'
  },

  ESFJ: {
    id: 'ESFJ',
    name: 'The Caregiver',
    critter: '🐘',
    tagline: 'Community-driven wellness',
    description: "You, the Elephant, walk your wellness path surrounded by your herd. Health is better together—cooking for loved ones, walking with friends, creating communities of care. Your nurturing spirit lifts everyone's wellness while your memory never forgets a friend's health goal.",
    color: 'red',
    gradient: 'from-red-400 to-rose-500',
    bgLight: 'bg-red-50',
    strengths: ['Community-building that makes health social', 'Nurturing presence that supports everyone', 'Collaborative spirit that multiplies motivation', 'Consistent care for self and others'],
    habits: ['Group fitness with your wellness crew', 'Community walks and healthy gatherings', 'Checking in on friends\' health journeys', 'Cooking and sharing nourishing meals'],
    pitfalls: ['Your own oxygen mask often waits', 'Validation-seeking can exhaust you', 'Sometimes the herd needs you healthy first'],
    traits: ['Nurturing', 'Community-Minded', 'Supportive', 'Social'],
    nudge: "Elephant, you care for everyone around you so beautifully. But your own health matters too! Booking a Dalton blood test is a simple way to ensure you can keep supporting those you love.",
    questStyle: 'social and community activities'
  },

  ENFJ: {
    id: 'ENFJ',
    name: 'The Mentor',
    critter: '🦁',
    tagline: 'Inspiring, leading wellness',
    description: "You, the Lion, lead your pride toward wellness with inspiring roars and organized plans. Your natural charisma turns group fitness into movements, your encouragement transforms others' doubts into determination. You don't just pursue health—you champion it for everyone.",
    color: 'yellow',
    gradient: 'from-yellow-400 to-amber-500',
    bgLight: 'bg-yellow-50',
    strengths: ['Inspirational presence that moves people', 'Organizational skills that rally the group', 'Natural leadership in wellness settings', 'Ability to see and nurture others\' potential'],
    habits: ['Leading group fitness sessions', 'Coaching friends toward their goals', 'Organizing wellness challenges', 'Mentoring others on their health journey'],
    pitfalls: ['The pride\'s health before the lion\'s', 'Helping others can hide from self-help', 'Even leaders need to follow sometimes'],
    traits: ['Inspiring', 'Organized', 'Mentoring', 'Charismatic'],
    nudge: "Lion, you inspire everyone around you! But don't forget yourself. A Dalton blood test is an easy, actionable step to lead by example in proactive wellness — show your pride how it's done.",
    questStyle: 'leadership and group motivation'
  },

  ENTJ: {
    id: 'ENTJ',
    name: 'The Strategist',
    critter: '🦅',
    tagline: 'Ambitious, data-driven wellness',
    description: "You, the Eagle, soar above the wellness landscape with strategic vision and fierce determination. Health is a mission to be conquered, fitness a territory to be claimed. Your ambitious goals have ambitious timelines, your discipline unwavering, your results... non-negotiable.",
    color: 'blue',
    gradient: 'from-blue-400 to-indigo-500',
    bgLight: 'bg-blue-50',
    strengths: ['Ambitious vision that aims for peak performance', 'Disciplined execution that delivers results', 'Strategic thinking that optimizes everything', 'Competitive drive that pushes limits'],
    habits: ['Performance dashboards and metrics', 'Personal best challenges, constantly updated', 'Structured strength and conditioning programs', 'Data-driven nutrition protocols'],
    pitfalls: ['The summit isn\'t everything; the climb matters too', 'Rest is strategy, not weakness', 'Sometimes joy is the best performance enhancer'],
    traits: ['Ambitious', 'Strategic', 'Driven', 'Competitive'],
    nudge: "Eagle, you value measurable outcomes above all. A Dalton blood test gives you concrete data to optimize your wellness strategy — schedule it like a project milestone on your path to peak performance.",
    questStyle: 'strategic performance optimization'
  }
};

export const healthTypeOrder = [
  'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'
];

// Assessment questions - narrative/story-driven style
export const assessmentQuestions = [
  {
    id: 1,
    emoji: '🌅',
    title: 'Morning Energy',
    text: "You wake up early on a Saturday. The sun is shining, and your favorite park is calling. What do you do first?",
    options: [
      { text: "Meet a group of friends for a morning run and coffee afterward", value: "E" },
      { text: "Grab your journal and go for a quiet solo walk or yoga session", value: "I" }
    ],
    axis: 'EI'
  },
  {
    id: 2,
    emoji: '🥬',
    title: 'Meal Planning Adventure',
    text: "You're thinking about what to eat this week. You want your meals to support your energy and wellness.",
    options: [
      { text: "You open your meal-planning app, track calories, and schedule every meal", value: "S" },
      { text: "You wander through the farmers' market and pick whatever inspires you, trusting your intuition", value: "N" }
    ],
    axis: 'SN'
  },
  {
    id: 3,
    emoji: '🧘',
    title: 'Choosing a New Habit',
    text: "A new wellness trend pops up: mindful meditation or a high-intensity training program. How do you decide?",
    options: [
      { text: "You research the science, compare results, and analyze which plan optimizes health", value: "T" },
      { text: "You follow what resonates emotionally or what feels meaningful to your life", value: "F" }
    ],
    axis: 'TF'
  },
  {
    id: 4,
    emoji: '📆',
    title: 'Your Weekly Routine',
    text: "Imagine your week is wide open. How do you fill your time to maintain health?",
    options: [
      { text: "You schedule every workout, meditation session, and sleep time in your calendar", value: "J" },
      { text: "You leave blocks of time open, adapting to how you feel each day", value: "P" }
    ],
    axis: 'JP'
  },
  {
    id: 5,
    emoji: '😰',
    title: 'Stress Response',
    text: "A stressful week hits: deadlines, obligations, and late nights. How do you cope?",
    options: [
      { text: "You channel your energy into a sweaty run, strength training, or a group class", value: "E" },
      { text: "You retreat to your favorite quiet spot, journal, or meditate", value: "I" }
    ],
    axis: 'EI'
  },
  {
    id: 6,
    emoji: '🎯',
    title: 'Guidance Preference',
    text: "A friend recommends a wellness coach. Which approach feels best to you?",
    options: [
      { text: "A coach who gives step-by-step guidance, measurable goals, and data tracking", value: "S" },
      { text: "A coach who inspires you to explore holistic wellness and reflect on your feelings", value: "N" }
    ],
    axis: 'SN'
  },
  {
    id: 7,
    emoji: '🔥',
    title: 'Motivation Source',
    text: "You want to stick to a new healthy habit. What drives you most?",
    options: [
      { text: "Seeing measurable progress, tracking numbers, hitting personal bests", value: "T" },
      { text: "Feeling emotionally balanced, helping others, or being part of a supportive community", value: "F" }
    ],
    axis: 'TF'
  },
  {
    id: 8,
    emoji: '🔄',
    title: 'Habit Flexibility',
    text: "You try to maintain a daily wellness practice. How do you approach it?",
    options: [
      { text: "You create a strict schedule and stick to it no matter what", value: "J" },
      { text: "You adjust based on mood, energy, and what life throws at you", value: "P" }
    ],
    axis: 'JP'
  },
  {
    id: 9,
    emoji: '✨',
    title: 'Trying Something New',
    text: "You walk past a new fitness studio offering a mix of martial arts, dance, and yoga. What do you do?",
    options: [
      { text: "You enroll in the structured classes with clear instructions", value: "SJ" },
      { text: "You sample everything, mixing and matching whatever feels fun", value: "NP" }
    ],
    axis: 'dual1'
  },
  {
    id: 10,
    emoji: '🪨',
    title: 'Biggest Challenge',
    text: "Looking back on your health journey, what has been your hardest obstacle?",
    options: [
      { text: "Staying consistent with plans and routines", value: "SJ" },
      { text: "Overthinking choices, procrastinating, or switching routines frequently", value: "NP" }
    ],
    axis: 'dual2'
  }
];

// Calculate health type based on assessment responses
export function calculateHealthType(responses, companionScores = null) {
  // If we have direct MBTI scores from assessment
  if (responses && responses.scores) {
    const { E, I, S, N, T, F, J, P } = responses.scores;
    let type = '';
    type += E >= I ? 'E' : 'I';
    type += S >= N ? 'S' : 'N';
    type += T >= F ? 'T' : 'F';
    type += J >= P ? 'J' : 'P';

    return {
      primary: healthTypes[type],
      type: type,
      scores: responses.scores
    };
  }

  // Legacy: Calculate from companion scores if no direct assessment
  if (companionScores && companionScores.length > 0) {
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    companionScores.forEach(companion => {
      const score = companion.score || 50;

      switch (companion.id) {
        case 'pip': // Energy
          if (score > 60) { scores.E += 2; scores.N += 1; }
          else if (score < 40) { scores.I += 2; scores.S += 1; }
          break;
        case 'luna': // Sleep
          if (score > 60) { scores.I += 2; scores.J += 1; }
          else if (score < 40) { scores.E += 1; scores.P += 1; }
          break;
        case 'ember': // Movement
          if (score > 60) { scores.E += 2; scores.S += 1; }
          else if (score < 40) { scores.I += 1; scores.N += 1; }
          break;
        case 'sage': // Mind/Focus
          if (score > 60) { scores.T += 2; scores.J += 1; }
          else if (score < 40) { scores.F += 1; scores.P += 1; }
          break;
        case 'coral': // Mood
          if (score > 60) { scores.F += 2; scores.E += 1; }
          else if (score < 40) { scores.T += 1; scores.I += 1; }
          break;
        case 'brook': // Nutrition
          if (score > 60) { scores.S += 2; scores.J += 1; }
          else if (score < 40) { scores.N += 1; scores.P += 1; }
          break;
        case 'oak': // Stress
          if (score > 60) { scores.J += 2; scores.I += 1; }
          else if (score < 40) { scores.P += 1; scores.E += 1; }
          break;
      }
    });

    let type = '';
    type += scores.E >= scores.I ? 'E' : 'I';
    type += scores.S >= scores.N ? 'S' : 'N';
    type += scores.T >= scores.F ? 'T' : 'F';
    type += scores.J >= scores.P ? 'J' : 'P';

    return {
      primary: healthTypes[type],
      type: type,
      scores
    };
  }

  // Default fallback
  return {
    primary: healthTypes['ISFJ'],
    type: 'ISFJ',
    scores: { E: 0, I: 1, S: 1, N: 0, T: 0, F: 1, J: 1, P: 0 }
  };
}

// Get type-specific quest suggestions based on questStyle
export function getTypeQuestSuggestions(typeId) {
  const type = healthTypes[typeId];
  if (!type) return [];

  const suggestionsByStyle = {
    'structured routines and tracking': [
      'Log your meals and energy levels today',
      'Set a consistent wake-up time for the week',
      'Schedule your workouts like appointments'
    ],
    'gentle self-care and nurturing': [
      'Prepare a nourishing meal for yourself',
      'Take a warm bath or do gentle stretching',
      'Reach out to check on a friend\'s wellness'
    ],
    'mindful and purposeful practices': [
      'Try 10 minutes of meditation',
      'Journal about what wellness means to you',
      'Practice mindful eating at one meal'
    ],
    'strategic optimization and data': [
      'Track a new health metric this week',
      'Research one wellness topic deeply',
      'Optimize your sleep schedule'
    ],
    'practical solo activities': [
      'Try a new solo workout',
      'Build or improve your home gym setup',
      'Master a new physical skill'
    ],
    'creative and nature-based': [
      'Take a walk in nature without your phone',
      'Try a creative movement practice',
      'Listen to what your body craves today'
    ],
    'gentle and emotionally meaningful': [
      'Write in your gratitude journal',
      'Do yoga that honors how you feel',
      'Connect with your wellness community'
    ],
    'research and experimentation': [
      'Try an N=1 experiment on yourself',
      'Research a health question you have',
      'Test a new wellness approach'
    ],
    'active adventures and challenges': [
      'Try a new adventure activity',
      'Challenge a friend to a fitness goal',
      'Explore somewhere new while moving'
    ],
    'fun social activities': [
      'Join a dance or group fitness class',
      'Organize an active hangout with friends',
      'Make your workout playful today'
    ],
    'creative exploration and meaning': [
      'Try a wellness practice you\'ve never done',
      'Journal about your health journey',
      'Inspire someone else\'s wellness'
    ],
    'innovation and optimization': [
      'Hack your routine for efficiency',
      'Try the latest wellness tech or app',
      'Experiment with a new approach'
    ],
    'structured planning and tracking': [
      'Plan and prep your meals for the week',
      'Create a workout schedule',
      'Track your progress metrics'
    ],
    'social and community activities': [
      'Organize a group walk or workout',
      'Cook a healthy meal for others',
      'Check in on a friend\'s health goals'
    ],
    'leadership and group motivation': [
      'Lead a group fitness activity',
      'Mentor someone on their journey',
      'Organize a wellness challenge'
    ],
    'strategic performance optimization': [
      'Set ambitious health goals',
      'Analyze your performance data',
      'Create a strategic wellness plan'
    ]
  };

  return suggestionsByStyle[type.questStyle] || [
    'Take a mindful walk today',
    'Drink an extra glass of water',
    'Get to bed 30 minutes earlier'
  ];
}

export function getHealthType(id) {
  return healthTypes[id];
}

export function getAllHealthTypes() {
  return healthTypeOrder.map(id => healthTypes[id]);
}

// Get a type-specific message for companion interactions
export function getTypeCompanionMessage(typeId, companionName) {
  const type = healthTypes[typeId];
  if (!type) return `${companionName}'s suggestion for you:`;

  const messages = {
    ISTJ: `As the steady Turtle, ${companionName} has a reliable suggestion:`,
    ISFJ: `As the nurturing Koala, ${companionName} offers this gentle idea:`,
    INFJ: `As the graceful Swan, ${companionName} shares something meaningful:`,
    INTJ: `As the strategic Owl, ${companionName} suggests this optimization:`,
    ISTP: `As the independent Cat, ${companionName} has a practical tip:`,
    ISFP: `As the intuitive Deer, ${companionName} invites you to try:`,
    INFP: `As the gentle Rabbit, ${companionName} softly suggests:`,
    INTP: `As the curious Octopus, ${companionName} proposes an experiment:`,
    ESTP: `As the energetic Otter, ${companionName} has an adventure for you:`,
    ESFP: `As the playful Dolphin, ${companionName} says let's have fun with:`,
    ENFP: `As the creative Butterfly, ${companionName} inspires you to try:`,
    ENTP: `As the clever Fox, ${companionName} has an innovative idea:`,
    ESTJ: `As the industrious Beaver, ${companionName} schedules this for you:`,
    ESFJ: `As the caring Elephant, ${companionName} suggests doing together:`,
    ENFJ: `As the inspiring Lion, ${companionName} leads with this:`,
    ENTJ: `As the ambitious Eagle, ${companionName} challenges you to:`
  };

  return messages[typeId] || `${companionName}'s suggestion for you:`;
}
