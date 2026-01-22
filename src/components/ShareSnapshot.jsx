import { useState } from 'react';

export default function ShareSnapshot({ companions, onClose }) {
  const [copied, setCopied] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('warm');

  const styles = {
    warm: 'from-amber-100 to-orange-100',
    cool: 'from-blue-100 to-indigo-100',
    nature: 'from-emerald-100 to-teal-100',
    sunset: 'from-rose-100 to-amber-100'
  };

  const mainCompanions = companions.slice(0, 3);
  const supportingCompanions = companions.slice(3);

  const handleCopyLink = () => {
    // In a real app, this would generate a unique shareable link
    navigator.clipboard.writeText('https://healthcompanions.app/share/abc123');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async (platform) => {
    const text = `Check out my health companions this week! ${mainCompanions.map(c => c.emoji).join(' ')}`;
    const url = 'https://healthcompanions.app/share/abc123';

    if (platform === 'native' && navigator.share) {
      try {
        await navigator.share({ title: 'My Health Companions', text, url });
      } catch (e) {
        console.log('Share cancelled');
      }
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Share your snapshot</h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        {/* Preview Card */}
        <div className="p-4">
          <div className={`bg-gradient-to-br ${styles[selectedStyle]} rounded-xl p-6 mb-4`}>
            {/* Card header */}
            <p className="text-xs text-gray-500 mb-2">my companions this week</p>
            <h3 className="font-semibold text-gray-800 mb-4">Health Check-In</h3>

            {/* Main companions */}
            <div className="flex gap-3 mb-4">
              {mainCompanions.map((c, i) => (
                <div key={c.id} className="flex-1 bg-white/80 rounded-lg p-3 text-center">
                  <div className="text-3xl mb-1">{c.emoji}</div>
                  <p className="text-xs font-medium text-gray-700">{c.name}</p>
                  <p className="text-xs text-gray-500">{c.animal}</p>
                </div>
              ))}
            </div>

            {/* Supporting */}
            <p className="text-xs text-gray-500 mb-2">also supporting me:</p>
            <div className="flex gap-2">
              {supportingCompanions.map(c => (
                <div
                  key={c.id}
                  className="w-10 h-10 bg-white/60 rounded-lg flex items-center justify-center text-xl"
                  title={`${c.name} the ${c.animal}`}
                >
                  {c.emoji}
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-4 pt-4 border-t border-white/30">
              <p className="text-xs text-gray-500 text-center">
                healthcompanions.app
              </p>
            </div>
          </div>

          {/* Style picker */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">Choose a style:</p>
            <div className="flex gap-2">
              {Object.entries(styles).map(([name, gradient]) => (
                <button
                  key={name}
                  onClick={() => setSelectedStyle(name)}
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} border-2 transition-all ${
                    selectedStyle === name ? 'border-gray-800 scale-110' : 'border-transparent'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Privacy note */}
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <p className="text-xs text-gray-500">
              This snapshot shows your companions — not scores or health data.
              Sharing is always optional.
            </p>
          </div>
        </div>

        {/* Share actions */}
        <div className="p-4 border-t border-gray-100 space-y-3">
          {/* Native share (if available) */}
          {navigator.share && (
            <button
              onClick={() => handleShare('native')}
              className="w-full py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-colors"
            >
              Share
            </button>
          )}

          {/* Copy link */}
          <button
            onClick={handleCopyLink}
            className="w-full py-3 bg-white text-gray-800 font-medium rounded-xl border border-gray-200 hover:border-gray-300 transition-colors"
          >
            {copied ? 'Copied!' : 'Copy link'}
          </button>

          {/* Social buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => handleShare('twitter')}
              className="flex-1 py-3 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors"
            >
              Share on X
            </button>
            <button
              onClick={handleCopyLink}
              className="flex-1 py-3 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors"
            >
              Download image
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Mini share button for embedding
export function ShareButton({ companions, variant = 'default' }) {
  const [showModal, setShowModal] = useState(false);

  if (variant === 'compact') {
    return (
      <>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors"
        >
          <span>📤</span>
          Share
        </button>
        {showModal && (
          <ShareSnapshot companions={companions} onClose={() => setShowModal(false)} />
        )}
      </>
    );
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors"
      >
        <span>📤</span>
        Share snapshot
      </button>
      {showModal && (
        <ShareSnapshot companions={companions} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
