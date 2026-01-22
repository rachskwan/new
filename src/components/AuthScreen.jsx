import { useState } from 'react';
import { createAccount, login, checkEmailExists } from '../utils/auth';
import { getAllCompanions } from '../data/companions';

export default function AuthScreen({ mode = 'login', onSuccess, onBack, fromQuiz = false }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentMode, setCurrentMode] = useState(mode);

  const companions = getAllCompanions();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Basic validation
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email');
      setIsLoading(false);
      return;
    }

    if (currentMode === 'signup' && !name.trim()) {
      setError('Please enter your name');
      setIsLoading(false);
      return;
    }

    // Simulate network delay for realism
    await new Promise(resolve => setTimeout(resolve, 500));

    if (currentMode === 'signup') {
      const result = createAccount(email, name);
      if (result.success) {
        onSuccess(result.user);
      } else {
        setError(result.error);
      }
    } else {
      const result = login(email);
      if (result.success) {
        onSuccess(result.user);
      } else {
        setError(result.error);
      }
    }

    setIsLoading(false);
  };

  const toggleMode = () => {
    setCurrentMode(currentMode === 'login' ? 'signup' : 'login');
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-emerald-50/30 to-cyan-50/30 flex flex-col items-center justify-center px-6 py-12">
      {/* Floating companions */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {companions.slice(0, 4).map((c, i) => (
          <div
            key={c.id}
            className="absolute text-3xl opacity-15 animate-float"
            style={{
              top: `${20 + (i * 20)}%`,
              left: `${15 + (i % 2) * 60}%`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            {c.emoji}
          </div>
        ))}
      </div>

      <div className="relative w-full max-w-sm">
        {/* Back button */}
        {onBack && (
          <button
            onClick={onBack}
            className="mb-6 text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1"
          >
            {fromQuiz ? '← Back to reflection' : '← Back'}
          </button>
        )}

        {/* Header */}
        <div className="text-center mb-8">
          {currentMode === 'login' ? (
            <>
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                🌲
              </div>
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                Welcome back!
              </h1>
              <p className="text-gray-500">
                Enter your email to check on your companions
              </p>
            </>
          ) : fromQuiz ? (
            <>
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                🌱
              </div>
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                Save your results
              </h1>
              <p className="text-gray-500">
                Create a free account to keep your companions and track progress
              </p>
            </>
          ) : (
            <>
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                ✨
              </div>
              <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                Create your forest
              </h1>
              <p className="text-gray-500">
                Start your companion journey
              </p>
            </>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {currentMode === 'signup' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="What should we call you?"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-gray-400 focus:outline-none transition-colors"
            />
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-4 rounded-xl font-medium transition-colors ${
              isLoading
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-900 text-white hover:bg-gray-800'
            }`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {currentMode === 'login' ? 'Finding your forest...' : fromQuiz ? 'Saving your results...' : 'Creating your forest...'}
              </span>
            ) : (
              currentMode === 'login' ? 'Check my forest' : fromQuiz ? 'Save my results' : 'Create my forest'
            )}
          </button>
        </form>

        {/* Toggle mode */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            {currentMode === 'login' ? (
              <>
                New here?{' '}
                <button
                  onClick={toggleMode}
                  className="text-gray-800 font-medium underline hover:text-gray-600"
                >
                  Create an account
                </button>
              </>
            ) : (
              <>
                Already have a forest?{' '}
                <button
                  onClick={toggleMode}
                  className="text-gray-800 font-medium underline hover:text-gray-600"
                >
                  Log in
                </button>
              </>
            )}
          </p>
        </div>

        {/* Privacy note */}
        <p className="mt-8 text-xs text-gray-400 text-center">
          We only use your email to save your progress.
          <br />
          No spam, no sharing — just companions.
        </p>
      </div>
    </div>
  );
}
