import { useState } from 'react';
import { getAllCompanions } from '../data/companions';
import BiomarkerTag from './BiomarkerTag';

export default function BloodLayerCards({ responses, onBack, onContinue }) {
  const companions = getAllCompanions();
  const [currentCard, setCurrentCard] = useState(0);

  // Get companions sorted by score (lowest first - needs most attention)
  const scores = companions.map(companion => {
    const companionAnswers = Object.entries(responses)
      .filter(([key]) => key.startsWith(companion.id))
      .map(([, value]) => value);
    const avgScore = companionAnswers.reduce((sum, val) => sum + val, 0) / companionAnswers.length;
    return { ...companion, score: avgScore };
  }).sort((a, b) => a.score - b.score);

  const priorityCompanions = scores.slice(0, 4);
  const companion = priorityCompanions[currentCard];

  const handleNext = () => {
    if (currentCard < priorityCompanions.length - 1) {
      setCurrentCard(currentCard + 1);
    } else {
      onContinue();
    }
  };

  const handlePrev = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50/40 px-6 py-12">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-400 mb-2">optional exploration</p>
          <h1 className="text-2xl font-semibold text-gray-800 mb-3">
            Curious about what your body is signaling?
          </h1>
          <p className="text-gray-500">
            Your companions notice patterns on the surface. Some connect to signals beneath.
          </p>
        </div>

        {/* Card indicators */}
        <div className="flex justify-center gap-2 mb-6">
          {priorityCompanions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentCard(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                i === currentCard ? 'bg-gray-800' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Blood Layer Card */}
        <div className={`${companion.bgLight} rounded-2xl p-6 border border-gray-200 mb-6`}>
          {/* Companion header */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-4xl shadow-sm">
              {companion.emoji}
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">{companion.name} the {companion.animal}</h2>
              <p className="text-sm text-gray-600">{companion.domain}</p>
            </div>
          </div>

          {/* Domain insight */}
          <p className="text-gray-700 mb-6">
            {companion.curiosityNudge.text}
          </p>

          {/* Biomarkers */}
          <div className="bg-white rounded-xl p-4 mb-6">
            <p className="text-xs text-gray-400 mb-3 uppercase tracking-wide">
              Related blood markers (hover to learn more)
            </p>
            <div className="flex flex-wrap gap-2">
              {companion.biomarkers.map((marker, i) => (
                <BiomarkerTag key={i} name={marker} />
              ))}
            </div>
          </div>

          {/* Educational note */}
          <p className="text-xs text-gray-500 italic">
            This is educational information only — not medical advice. Blood markers can provide
            additional context for patterns you notice in daily life.
          </p>
        </div>

        {/* Dalton CTA */}
        <div className="bg-white rounded-xl p-5 border border-gray-200 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
              🔬
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-1">Dalton Personal Blood Test</h3>
              <p className="text-sm text-gray-600 mb-3">
                Explore what your body is signaling with an at-home blood test. Educational insights,
                no diagnosis — just curiosity.
              </p>
              <a
                href="#dalton"
                onClick={(e) => e.preventDefault()}
                className="text-sm font-medium text-gray-800 underline hover:text-gray-600"
              >
                Learn more about Dalton →
              </a>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={currentCard === 0 ? onBack : handlePrev}
            className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
          >
            {currentCard === 0 ? 'Back' : 'Previous'}
          </button>
          <span className="text-sm text-gray-400">
            {currentCard + 1} of {priorityCompanions.length}
          </span>
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
          >
            {currentCard < priorityCompanions.length - 1 ? 'Next' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
}
