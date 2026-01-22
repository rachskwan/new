import { useState } from 'react';
import { getAllCompanions } from '../data/companions';
import { BiomarkerList } from './BiomarkerTag';

// Available icons for custom quests
const questIcons = ['✨', '🚶', '💧', '🧘', '🌙', '🥗', '💬', '📝', '🌳', '🎯', '💪', '🎨', '📚', '🎵', '☕'];

export default function MicroQuests({ responses, onBack, onFinish }) {
  const companions = getAllCompanions();
  const [selectedQuests, setSelectedQuests] = useState([]);
  const [expandedLearning, setExpandedLearning] = useState(null);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customQuests, setCustomQuests] = useState([]);
  const [customQuestText, setCustomQuestText] = useState('');
  const [customQuestIcon, setCustomQuestIcon] = useState('✨');
  const [customQuestCompanion, setCustomQuestCompanion] = useState('');

  // Get companions that need attention (lower scores)
  const scores = companions.map(companion => {
    const companionAnswers = Object.entries(responses)
      .filter(([key]) => key.startsWith(companion.id))
      .map(([, value]) => value);
    const avgScore = companionAnswers.reduce((sum, val) => sum + val, 0) / companionAnswers.length;
    return { ...companion, score: avgScore };
  }).sort((a, b) => a.score - b.score);

  // Show quests from top 3 companions needing attention
  const priorityCompanions = scores.slice(0, 3);

  const toggleQuest = (companionId, questIndex) => {
    const key = `${companionId}-${questIndex}`;
    setSelectedQuests(prev =>
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const toggleLearning = (companionId) => {
    setExpandedLearning(expandedLearning === companionId ? null : companionId);
  };

  const handleAddCustomQuest = () => {
    if (!customQuestText.trim() || !customQuestCompanion) return;

    const newQuest = {
      id: `custom-${Date.now()}`,
      companionId: customQuestCompanion,
      text: customQuestText.trim(),
      icon: customQuestIcon,
      isCustom: true
    };

    setCustomQuests(prev => [...prev, newQuest]);
    setSelectedQuests(prev => [...prev, newQuest.id]);

    // Reset form
    setCustomQuestText('');
    setCustomQuestIcon('✨');
    setCustomQuestCompanion('');
    setShowCustomForm(false);
  };

  const removeCustomQuest = (questId) => {
    setCustomQuests(prev => prev.filter(q => q.id !== questId));
    setSelectedQuests(prev => prev.filter(id => id !== questId));
  };

  // Combine selected regular quests with custom quests for finishing
  const handleFinish = () => {
    // Pass both regular quest keys and custom quest objects
    onFinish(selectedQuests, customQuests);
  };

  return (
    <div className="min-h-screen bg-amber-50/40 px-6 py-12">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-400 mb-2">optional</p>
          <h1 className="text-2xl font-semibold text-gray-800 mb-3">
            Micro-quests from your companions
          </h1>
          <p className="text-gray-500">
            Small actions suggested by your companions. Pick any that feel doable — or skip them entirely.
          </p>
        </div>

        {/* Create Your Own Quest Button */}
        <div className="mb-6">
          {!showCustomForm ? (
            <button
              onClick={() => setShowCustomForm(true)}
              className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center gap-2"
            >
              <span className="text-xl">+</span>
              <span>Create your own micro-quest</span>
            </button>
          ) : (
            <div className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-800">Create your own quest</h3>
                <button
                  onClick={() => setShowCustomForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              {/* Quest text input */}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-1">What do you want to try?</label>
                <input
                  type="text"
                  value={customQuestText}
                  onChange={(e) => setCustomQuestText(e.target.value)}
                  placeholder="e.g., Read for 15 minutes before bed"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:border-gray-400 focus:outline-none"
                  maxLength={100}
                />
              </div>

              {/* Icon picker */}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">Pick an icon</label>
                <div className="flex flex-wrap gap-2">
                  {questIcons.map(icon => (
                    <button
                      key={icon}
                      onClick={() => setCustomQuestIcon(icon)}
                      className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl transition-all ${
                        customQuestIcon === icon
                          ? 'bg-gray-800 scale-110'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Companion selector */}
              <div className="mb-4">
                <label className="block text-sm text-gray-600 mb-2">Which companion should track this?</label>
                <div className="grid grid-cols-4 gap-2">
                  {companions.map(c => (
                    <button
                      key={c.id}
                      onClick={() => setCustomQuestCompanion(c.id)}
                      className={`p-2 rounded-lg flex flex-col items-center gap-1 transition-all ${
                        customQuestCompanion === c.id
                          ? `${c.bgLight} ring-2 ring-gray-400`
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-xl">{c.emoji}</span>
                      <span className="text-xs text-gray-600">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Add button */}
              <button
                onClick={handleAddCustomQuest}
                disabled={!customQuestText.trim() || !customQuestCompanion}
                className={`w-full py-3 rounded-xl font-medium transition-colors ${
                  customQuestText.trim() && customQuestCompanion
                    ? 'bg-gray-900 text-white hover:bg-gray-800'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Add quest
              </button>
            </div>
          )}
        </div>

        {/* Custom quests display */}
        {customQuests.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-600 mb-3 flex items-center gap-2">
              <span>✨</span> Your custom quests
            </h3>
            <div className="space-y-2">
              {customQuests.map(quest => {
                const companion = companions.find(c => c.id === quest.companionId);
                return (
                  <div
                    key={quest.id}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-800 ${companion?.bgLight || 'bg-gray-50'}`}
                  >
                    <span className="text-xl">{quest.icon}</span>
                    <div className="flex-1">
                      <p className="text-gray-800">{quest.text}</p>
                      <p className="text-xs text-gray-500">with {companion?.name}</p>
                    </div>
                    <button
                      onClick={() => removeCustomQuest(quest.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Quests by companion */}
        <div className="space-y-6 mb-8">
          {priorityCompanions.map(companion => (
            <div key={companion.id} className="bg-white rounded-xl p-5 border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 ${companion.bgLight} rounded-xl flex items-center justify-center text-2xl`}>
                  {companion.emoji}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{companion.name}'s suggestions</h3>
                  <p className="text-xs text-gray-500">{companion.animal} · {companion.domain}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {companion.microQuests.map((quest, i) => {
                  const key = `${companion.id}-${i}`;
                  const isSelected = selectedQuests.includes(key);

                  return (
                    <button
                      key={i}
                      onClick={() => toggleQuest(companion.id, i)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-left transition-colors ${
                        isSelected
                          ? 'border-gray-800 bg-gray-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-xl">{quest.icon}</span>
                      <span className="flex-1 text-gray-700">{quest.text}</span>
                      {isSelected && (
                        <span className="text-gray-800">✓</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Learning Extension */}
              <button
                onClick={() => toggleLearning(companion.id)}
                className="w-full text-left"
              >
                <div className={`${companion.bgLight} rounded-lg p-3 hover:opacity-80 transition-opacity`}>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>🔬</span>
                    <span>Some signals for {companion.domain.toLowerCase()} are subtle.</span>
                    <span className="text-gray-400 ml-auto">
                      {expandedLearning === companion.id ? '▲' : '▼'}
                    </span>
                  </div>
                </div>
              </button>

              {expandedLearning === companion.id && (
                <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm text-gray-600 mb-3">
                    {companion.curiosityNudge.text}
                  </p>
                  <p className="text-xs text-gray-400 mb-2">Related biomarkers (hover to learn more):</p>
                  <div className="mb-3">
                    <BiomarkerList biomarkers={companion.biomarkers.slice(0, 3)} />
                  </div>
                  <a
                    href="#dalton"
                    onClick={(e) => e.preventDefault()}
                    className="text-sm text-gray-700 underline hover:text-gray-900"
                  >
                    Learn more with Dalton
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Selected count */}
        {(selectedQuests.length > 0 || customQuests.length > 0) && (
          <p className="text-center text-sm text-gray-500 mb-6">
            {selectedQuests.length + customQuests.length} quest{(selectedQuests.length + customQuests.length) !== 1 ? 's' : ''} selected
            {customQuests.length > 0 && ` (${customQuests.length} custom)`}
          </p>
        )}

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onBack}
            className="flex-1 px-6 py-4 bg-white text-gray-800 font-medium rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
          >
            Back to dashboard
          </button>
          <button
            onClick={handleFinish}
            className="flex-1 px-6 py-4 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
          >
            {selectedQuests.length > 0 || customQuests.length > 0 ? 'Accept quests' : 'Skip for now'}
          </button>
        </div>
      </div>
    </div>
  );
}
