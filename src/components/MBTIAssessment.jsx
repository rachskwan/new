import { useState } from 'react';
import { assessmentQuestions, calculateHealthType } from '../data/healthTypes';

export default function MBTIAssessment({ onComplete, onBack }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [showIntro, setShowIntro] = useState(true);

  const question = assessmentQuestions[currentQuestion];
  const progress = ((currentQuestion) / assessmentQuestions.length) * 100;

  const handleAnswer = (optionValue) => {
    if (isAnimating) return;

    setIsAnimating(true);

    // Update answers
    const newAnswers = { ...answers, [question.id]: optionValue };
    setAnswers(newAnswers);

    // Update scores based on the selected option
    const newScores = { ...scores };

    if (question.axis === 'dual1' || question.axis === 'dual2') {
      // Dual-axis questions (SJ or NP)
      if (optionValue === 'SJ') {
        newScores.S += 1;
        newScores.J += 1;
      } else if (optionValue === 'NP') {
        newScores.N += 1;
        newScores.P += 1;
      }
    } else {
      // Single axis questions
      newScores[optionValue] = (newScores[optionValue] || 0) + 1;
    }
    setScores(newScores);

    // Move to next question or complete
    setTimeout(() => {
      if (currentQuestion < assessmentQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Calculate final type
        const typeResult = calculateHealthType({ scores: newScores });
        onComplete(typeResult);
      }
      setIsAnimating(false);
    }, 400);
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      // Remove the answer for this question
      const newAnswers = { ...answers };
      delete newAnswers[assessmentQuestions[currentQuestion - 1].id];
      setAnswers(newAnswers);
    } else if (showIntro === false) {
      setShowIntro(true);
    } else {
      onBack?.();
    }
  };

  // Intro screen
  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-violet-50 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-lg w-full text-center">
          {/* Animated critters */}
          <div className="flex justify-center gap-4 mb-8 text-4xl">
            <span className="animate-bounce" style={{ animationDelay: '0ms' }}>🐢</span>
            <span className="animate-bounce" style={{ animationDelay: '100ms' }}>🦋</span>
            <span className="animate-bounce" style={{ animationDelay: '200ms' }}>🦊</span>
            <span className="animate-bounce" style={{ animationDelay: '300ms' }}>🦉</span>
            <span className="animate-bounce" style={{ animationDelay: '400ms' }}>🐰</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Discover Your Health Type
          </h1>

          <p className="text-gray-600 mb-6 leading-relaxed">
            Answer 10 short questions about how you approach wellness.
            There are no right or wrong answers — just be yourself!
          </p>

          <div className="bg-white/60 rounded-2xl p-6 mb-8 backdrop-blur-sm">
            <p className="text-sm text-gray-500 mb-4">You'll discover:</p>
            <div className="flex flex-wrap justify-center gap-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm">Your health archetype</span>
              <span className="px-3 py-1 bg-violet-100 text-violet-700 rounded-full text-sm">Your critter guide</span>
              <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm">Your strengths</span>
              <span className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm">Personalized tips</span>
            </div>
          </div>

          <button
            onClick={() => setShowIntro(false)}
            className="px-8 py-4 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-all transform hover:scale-105 shadow-lg"
          >
            Begin the Journey
          </button>

          <p className="mt-4 text-xs text-gray-400">Takes about 3 minutes</p>

          {onBack && (
            <button
              onClick={onBack}
              className="mt-6 text-sm text-gray-500 hover:text-gray-700"
            >
              ← Go back
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-rose-50 to-violet-50 flex flex-col px-6 py-8">
      {/* Header */}
      <div className="max-w-lg mx-auto w-full">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={handleBack}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Back
          </button>
          <span className="text-sm text-gray-400">
            {currentQuestion + 1} of {assessmentQuestions.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-2 bg-gray-200/60 rounded-full mb-8 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-400 to-rose-400 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="flex-1 flex items-center justify-center">
        <div
          className={`max-w-lg w-full transition-all duration-300 ${
            isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
          }`}
        >
          {/* Question emoji and title */}
          <div className="text-center mb-6">
            <span className="text-5xl mb-4 block">{question.emoji}</span>
            <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
              {question.title}
            </h2>
          </div>

          {/* Question text */}
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-lg">
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              {question.text}
            </p>
          </div>

          {/* Answer options */}
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option.value)}
                disabled={isAnimating}
                className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-200 ${
                  answers[question.id] === option.value
                    ? 'border-violet-400 bg-violet-50'
                    : 'border-gray-200 bg-white hover:border-violet-300 hover:bg-violet-50/50'
                } ${isAnimating ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-md hover:scale-[1.02]'}`}
              >
                <span className="text-gray-700">{option.text}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="text-center mt-8 opacity-50">
        <div className="flex justify-center gap-2">
          {assessmentQuestions.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index < currentQuestion
                  ? 'bg-violet-400'
                  : index === currentQuestion
                  ? 'bg-violet-400 animate-pulse'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
