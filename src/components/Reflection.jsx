import { useState } from 'react';
import { ShareButton } from './ShareSnapshot';

export default function Reflection({ companions, onSave, onStartOver, isLoggedIn }) {
  const [reflection, setReflection] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    const checkIn = {
      date: new Date().toISOString(),
      reflection: reflection
    };
    console.log('Saving check-in:', checkIn);

    // Only show saved screen if logged in (new users will be redirected to auth)
    if (isLoggedIn) {
      setSaved(true);
    }
    if (onSave) onSave(checkIn);
  };

  if (saved) {
    return (
      <div className="min-h-screen bg-amber-50/40 flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-lg w-full text-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
            ✨
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-3">
            Check-in saved
          </h1>
          <p className="text-gray-500 mb-8">
            Nice work taking time to check in with yourself. See you next week!
          </p>

          {/* Share your snapshot */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6 text-left">
            <div className="flex items-start gap-3 mb-4">
              <span className="text-xl">📤</span>
              <div>
                <h3 className="font-medium text-gray-800 mb-1">Share with a friend?</h3>
                <p className="text-sm text-gray-500">
                  Show them your companion crew — no scores or health data, just your snapshot.
                </p>
              </div>
            </div>
            {companions && <ShareButton companions={companions} />}
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6 text-left">
            <h3 className="font-medium text-gray-800 mb-3">What's next?</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex gap-2">
                <span>•</span>
                <span>Try one of your micro-quests this week</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Notice how you feel day-to-day</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Check in again in 7 days to see patterns</span>
              </li>
            </ul>
          </div>

          {/* Dalton soft CTA */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200 mb-8 text-left">
            <div className="flex items-start gap-3">
              <span className="text-xl">🔬</span>
              <div>
                <p className="text-sm text-gray-600 mb-2">
                  Bookmark your check-in and explore your companions' signals whenever you're curious.
                </p>
                <a
                  href="#dalton"
                  onClick={(e) => e.preventDefault()}
                  className="text-sm text-gray-700 underline hover:text-gray-900"
                >
                  Learn about Dalton Personal Blood Test
                </a>
              </div>
            </div>
          </div>

          <button
            onClick={onStartOver}
            className="px-8 py-4 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
          >
            Back to start
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50/40 px-6 py-12">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-sm text-gray-400 mb-2">almost done</p>
          <h1 className="text-2xl font-semibold text-gray-800 mb-3">
            Any reflections?
          </h1>
          <p className="text-gray-500">
            Totally optional — jot down anything on your mind, or just save and go.
          </p>
        </div>

        {/* Reflection input */}
        <div className="bg-white rounded-xl p-6 border border-gray-200 mb-6">
          <textarea
            value={reflection}
            onChange={(e) => setReflection(e.target.value)}
            placeholder="How are you really feeling? Anything you want to remember about this week?"
            className="w-full h-32 resize-none text-gray-700 placeholder-gray-400 focus:outline-none"
          />
        </div>

        {/* Dalton curiosity prompt */}
        <div className="bg-gray-50 rounded-xl p-4 border border-gray-200 mb-6">
          <div className="flex items-start gap-3">
            <span className="text-lg">🔬</span>
            <div>
              <p className="text-sm text-gray-600">
                Your companions noticed patterns this week. Some of these connect to signals in your body
                you can explore further.
              </p>
              <a
                href="#dalton"
                onClick={(e) => e.preventDefault()}
                className="text-sm text-gray-700 underline hover:text-gray-900 mt-2 inline-block"
              >
                Learn about Dalton Personal Blood Test →
              </a>
            </div>
          </div>
        </div>

        {/* Date stamp */}
        <p className="text-center text-sm text-gray-400 mb-6">
          {new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleSave}
            className="w-full px-6 py-4 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
          >
            {isLoggedIn ? 'Save check-in' : 'Save & create your forest'}
          </button>
          <button
            onClick={handleSave}
            className="w-full px-6 py-4 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {isLoggedIn ? 'Skip reflection & save' : 'Skip & create your forest'}
          </button>
        </div>

        {!isLoggedIn && (
          <p className="text-center text-xs text-gray-400 mt-4">
            Create a free account to save your results and track progress over time
          </p>
        )}
      </div>
    </div>
  );
}
