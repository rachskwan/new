import { useState } from 'react';

export default function MapShareCard({ companions, user, onClose }) {
  const [copied, setCopied] = useState(false);
  const [style, setStyle] = useState('forest');

  const styles = {
    forest: {
      bg: 'bg-gradient-to-br from-emerald-100 via-green-50 to-teal-100',
      accent: 'text-emerald-800',
      title: 'My Companion Forest'
    },
    sunset: {
      bg: 'bg-gradient-to-br from-orange-100 via-amber-50 to-rose-100',
      accent: 'text-orange-800',
      title: 'My Wellness Journey'
    },
    night: {
      bg: 'bg-gradient-to-br from-indigo-100 via-purple-50 to-violet-100',
      accent: 'text-indigo-800',
      title: 'My Inner World'
    }
  };

  const currentStyle = styles[style];

  // Get top 3 companions by need
  const topCompanions = companions?.slice(0, 3) || [];
  const otherCompanions = companions?.slice(3) || [];

  const handleShare = async () => {
    const shareText = `${user?.name ? `${user.name}'s` : 'My'} companion crew: ${companions?.map(c => `${c.emoji} ${c.name}`).join(', ')} - Check in with your own companions!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: currentStyle.title,
          text: shareText,
        });
      } catch (err) {
        // User cancelled
      }
    } else {
      navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-sm w-full overflow-hidden shadow-xl animate-slideUp">
        {/* Style picker */}
        <div className="p-4 border-b border-gray-100">
          <p className="text-sm text-gray-500 mb-3">Choose a style:</p>
          <div className="flex gap-2">
            {Object.entries(styles).map(([key, s]) => (
              <button
                key={key}
                onClick={() => setStyle(key)}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                  style === key
                    ? `${s.bg} ${s.accent} ring-2 ring-offset-1 ring-gray-300`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Preview card */}
        <div className={`${currentStyle.bg} p-6`}>
          {/* Header */}
          <div className="text-center mb-4">
            <h3 className={`font-semibold ${currentStyle.accent}`}>
              {user?.name ? `${user.name}'s` : 'My'} Companion Forest
            </h3>
            <p className="text-xs text-gray-500 mt-1">Weekly check-in snapshot</p>
          </div>

          {/* Map visualization */}
          <div className="relative h-40 mb-4 rounded-xl bg-white/40 overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0">
              <div className="absolute top-4 right-4 w-8 h-8 bg-yellow-200 rounded-full blur-sm opacity-60" />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-emerald-200/30 to-transparent" />
            </div>

            {/* Companions positioned */}
            {topCompanions.map((companion, i) => {
              const positions = [
                { left: '20%', top: '25%' },
                { left: '50%', top: '45%' },
                { left: '75%', top: '30%' }
              ];
              const pos = positions[i] || { left: '50%', top: '50%' };

              return (
                <div
                  key={companion.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all"
                  style={{ left: pos.left, top: pos.top }}
                >
                  <div className={`w-12 h-12 ${companion.bgLight} rounded-xl flex items-center justify-center text-2xl border-2 border-white shadow-md`}>
                    {companion.emoji}
                  </div>
                  <p className="text-center text-xs text-gray-600 mt-1 font-medium">{companion.name}</p>
                </div>
              );
            })}

            {/* Other companions smaller at bottom */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {otherCompanions.map(companion => (
                <div
                  key={companion.id}
                  className={`w-8 h-8 ${companion.bgLight} rounded-lg flex items-center justify-center text-lg border border-white shadow-sm`}
                >
                  {companion.emoji}
                </div>
              ))}
            </div>
          </div>

          {/* Companion names */}
          <div className="text-center">
            <p className="text-xs text-gray-500">
              {companions?.map(c => c.name).join(' · ')}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 bg-white border-t border-gray-100">
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleShare}
              className="flex-1 py-3 px-4 rounded-xl bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors"
            >
              {copied ? 'Copied!' : 'Share'}
            </button>
          </div>
          <p className="text-xs text-gray-400 text-center mt-3">
            No health data is shared - just your companions
          </p>
        </div>
      </div>
    </div>
  );
}
