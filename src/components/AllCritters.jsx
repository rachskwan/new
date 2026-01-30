import { useState } from 'react';
import { healthTypes, healthTypeOrder } from '../data/healthTypes';

// Define compatibility/synergy between types
const compatibility = {
  // Analysts work well together
  INTJ: ['INTP', 'ENTJ', 'ENTP'],
  INTP: ['INTJ', 'ENTP', 'INFP'],
  ENTJ: ['INTJ', 'ESTJ', 'ENFJ'],
  ENTP: ['INTP', 'ENFP', 'INTJ'],
  // Diplomats connect emotionally
  INFJ: ['INFP', 'ENFJ', 'INTJ'],
  INFP: ['INFJ', 'ENFP', 'ISFP'],
  ENFJ: ['INFJ', 'ENFP', 'ESFJ'],
  ENFP: ['INFP', 'ENFJ', 'ENTP'],
  // Sentinels support each other
  ISTJ: ['ISFJ', 'ESTJ', 'INTJ'],
  ISFJ: ['ISTJ', 'ESFJ', 'INFJ'],
  ESTJ: ['ISTJ', 'ENTJ', 'ESFJ'],
  ESFJ: ['ISFJ', 'ESTJ', 'ENFJ'],
  // Explorers adventure together
  ISTP: ['ESTP', 'ISFP', 'INTP'],
  ISFP: ['INFP', 'ESFP', 'ISTP'],
  ESTP: ['ISTP', 'ESFP', 'ENTP'],
  ESFP: ['ISFP', 'ESTP', 'ENFP'],
};

// Group types by temperament
const temperaments = [
  {
    name: 'Analysts',
    description: 'Strategic, logical, and innovative',
    types: ['INTJ', 'INTP', 'ENTJ', 'ENTP'],
    color: 'violet'
  },
  {
    name: 'Diplomats',
    description: 'Empathetic, idealistic, and harmonious',
    types: ['INFJ', 'INFP', 'ENFJ', 'ENFP'],
    color: 'rose'
  },
  {
    name: 'Sentinels',
    description: 'Practical, reliable, and organized',
    types: ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'],
    color: 'emerald'
  },
  {
    name: 'Explorers',
    description: 'Spontaneous, energetic, and adaptable',
    types: ['ISTP', 'ISFP', 'ESTP', 'ESFP'],
    color: 'amber'
  }
];

export default function AllCritters({ userType, onClose }) {
  const [selectedType, setSelectedType] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'temperaments'

  const allTypes = healthTypeOrder.map(id => healthTypes[id]);
  const userCompatible = userType ? compatibility[userType.id] || [] : [];

  const handleTypeClick = (type) => {
    setSelectedType(selectedType?.id === type.id ? null : type);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-t-3xl px-6 pt-6 pb-4 sticky top-0 z-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-800">All Critter Types</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>

            {/* User's type badge */}
            {userType && (
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${userType.gradient} text-white mb-4`}>
                <span className="text-lg">{userType.critter}</span>
                <span className="text-sm font-medium">You are {userType.name}</span>
              </div>
            )}

            {/* View mode toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Types
              </button>
              <button
                onClick={() => setViewMode('temperaments')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'temperaments'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                By Temperament
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="bg-white rounded-b-3xl px-6 pb-6">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
                {allTypes.map((type) => {
                  const isUser = userType?.id === type.id;
                  const isCompatible = userCompatible.includes(type.id);

                  return (
                    <button
                      key={type.id}
                      onClick={() => handleTypeClick(type)}
                      className={`relative p-4 rounded-2xl border-2 transition-all hover:scale-105 text-left ${
                        isUser
                          ? `border-${type.color}-400 bg-gradient-to-br ${type.gradient} text-white`
                          : selectedType?.id === type.id
                          ? `border-gray-400 ${type.bgLight}`
                          : isCompatible
                          ? `border-emerald-300 bg-emerald-50 hover:border-emerald-400`
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      {isUser && (
                        <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-white text-gray-600 text-xs rounded-full shadow">
                          You!
                        </span>
                      )}
                      {isCompatible && !isUser && (
                        <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-emerald-500 text-white text-xs rounded-full shadow">
                          Match
                        </span>
                      )}
                      <span className="text-3xl block mb-2">{type.critter}</span>
                      <p className={`font-medium text-sm ${isUser ? 'text-white' : 'text-gray-800'}`}>
                        {type.name}
                      </p>
                      <p className={`text-xs ${isUser ? 'text-white/80' : 'text-gray-500'}`}>
                        {type.id}
                      </p>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="space-y-6 pt-4">
                {temperaments.map((temp) => (
                  <div key={temp.name}>
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className={`font-semibold text-${temp.color}-700`}>{temp.name}</h3>
                      <span className="text-sm text-gray-400">— {temp.description}</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {temp.types.map((typeId) => {
                        const type = healthTypes[typeId];
                        const isUser = userType?.id === type.id;
                        const isCompatible = userCompatible.includes(type.id);

                        return (
                          <button
                            key={type.id}
                            onClick={() => handleTypeClick(type)}
                            className={`relative p-4 rounded-2xl border-2 transition-all hover:scale-105 text-left ${
                              isUser
                                ? `border-${type.color}-400 bg-gradient-to-br ${type.gradient} text-white`
                                : selectedType?.id === type.id
                                ? `border-gray-400 ${type.bgLight}`
                                : isCompatible
                                ? `border-emerald-300 bg-emerald-50`
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            {isUser && (
                              <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-white text-gray-600 text-xs rounded-full shadow">
                                You!
                              </span>
                            )}
                            {isCompatible && !isUser && (
                              <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-emerald-500 text-white text-xs rounded-full shadow">
                                Match
                              </span>
                            )}
                            <span className="text-3xl block mb-2">{type.critter}</span>
                            <p className={`font-medium text-sm ${isUser ? 'text-white' : 'text-gray-800'}`}>
                              {type.name}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Selected type detail */}
            {selectedType && (
              <div className={`mt-6 p-6 rounded-2xl bg-gradient-to-br ${selectedType.bgLight} border border-gray-200`}>
                <div className="flex items-start gap-4">
                  <span className="text-5xl">{selectedType.critter}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold text-gray-800">{selectedType.name}</h3>
                      <span className="text-sm text-gray-400">{selectedType.id}</span>
                      {userType?.id === selectedType.id && (
                        <span className="px-2 py-0.5 bg-gray-900 text-white text-xs rounded-full">This is you!</span>
                      )}
                    </div>
                    <p className="text-gray-600 italic mb-3">"{selectedType.tagline}"</p>
                    <p className="text-sm text-gray-600 leading-relaxed mb-4">
                      {selectedType.description}
                    </p>

                    {/* Traits */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedType.traits.map((trait, i) => (
                        <span key={i} className="px-3 py-1 bg-white/80 rounded-full text-sm text-gray-600">
                          {trait}
                        </span>
                      ))}
                    </div>

                    {/* Strengths */}
                    <div className="bg-white/60 rounded-xl p-4">
                      <h4 className="font-medium text-gray-700 mb-2">Strengths</h4>
                      <ul className="space-y-1">
                        {selectedType.strengths.slice(0, 3).map((strength, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-emerald-500">✓</span>
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Compatibility with user */}
                    {userType && userType.id !== selectedType.id && (
                      <div className="mt-4 p-3 rounded-xl bg-white/60">
                        {userCompatible.includes(selectedType.id) ? (
                          <p className="text-sm text-emerald-700 flex items-center gap-2">
                            <span>🤝</span>
                            <span>Great wellness match! You two could motivate each other well.</span>
                          </p>
                        ) : (
                          <p className="text-sm text-gray-500 flex items-center gap-2">
                            <span>💫</span>
                            <span>Different approaches can bring fresh perspectives to wellness!</span>
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Legend */}
            {userType && (
              <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-gradient-to-r from-violet-400 to-rose-400"></span>
                  <span>Your type</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                  <span>Good wellness match</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
