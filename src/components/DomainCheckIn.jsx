import { useState } from 'react';

export default function DomainCheckIn({ companion, onComplete, onBack, currentIndex, totalCompanions }) {
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = companion.questions;
  const question = questions[currentQuestion];
  const progress = ((currentIndex * questions.length + currentQuestion) / (totalCompanions * questions.length)) * 100;

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(answers);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (onBack) {
      onBack();
    }
  };

  const canProceed = answers[question.id] !== undefined;

  return (
    <div className="min-h-screen bg-amber-50/40 flex flex-col">
      {/* Progress bar */}
      <div className="h-1 bg-gray-200">
        <div
          className="h-full bg-gray-800 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="max-w-lg w-full">
          {/* Companion header */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 ${companion.bgLight} rounded-2xl flex items-center justify-center text-4xl border-2 border-white shadow-sm`}>
              {companion.emoji}
            </div>
            <div>
              <h2 className="font-semibold text-gray-800 text-lg">{companion.name} the {companion.animal}</h2>
              <p className="text-sm text-gray-500">{companion.domain}</p>
            </div>
          </div>

          {/* Companion blurb (first question only) */}
          {currentQuestion === 0 && (
            <p className="text-gray-600 mb-6 italic border-l-2 border-gray-200 pl-4">"{companion.blurb}"</p>
          )}

          {/* Question */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 mb-4">
            <p className="text-sm text-gray-400 mb-2">
              Question {currentQuestion + 1} of {questions.length}
            </p>
            <h3 className="text-lg font-medium text-gray-800 mb-6">
              {question.text}
            </h3>

            {question.type === 'slider' && (
              <SliderQuestion
                question={question}
                value={answers[question.id]}
                onChange={(val) => handleAnswer(question.id, val)}
              />
            )}

            {question.type === 'choice' && (
              <ChoiceQuestion
                question={question}
                value={answers[question.id]}
                onChange={(val) => handleAnswer(question.id, val)}
              />
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <button
              onClick={handlePrev}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={!canProceed}
              className={`px-8 py-3 rounded-xl font-medium transition-colors ${
                canProceed
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentQuestion < questions.length - 1 ? 'Next' : 'Continue'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SliderQuestion({ question, value, onChange }) {
  const sliderValue = value ?? 50;

  return (
    <div>
      <input
        type="range"
        min="0"
        max="100"
        value={sliderValue}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-gray-800"
      />
      <div className="flex justify-between mt-3 text-sm text-gray-500">
        {question.labels.map((label, i) => (
          <span key={i} className={i === 1 ? 'text-center' : i === 2 ? 'text-right' : ''}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function ChoiceQuestion({ question, value, onChange }) {
  return (
    <div className="space-y-2">
      {question.options.map((option, i) => (
        <button
          key={i}
          onClick={() => onChange(i)}
          className={`w-full text-left px-4 py-3 rounded-lg border transition-colors ${
            value === i
              ? 'border-gray-800 bg-gray-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <span className="text-gray-700">{option}</span>
        </button>
      ))}
    </div>
  );
}
