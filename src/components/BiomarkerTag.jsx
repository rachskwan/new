import { useState } from 'react';
import { getBiomarkerInfo } from '../data/biomarkers';

export default function BiomarkerTag({ name, compact = false }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const info = getBiomarkerInfo(name);

  if (compact) {
    return (
      <div className="relative inline-block">
        <button
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          onClick={() => setShowTooltip(!showTooltip)}
          className="text-xs px-2 py-1 bg-white rounded-full border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all cursor-help"
        >
          {name}
        </button>

        {showTooltip && (
          <BiomarkerTooltip info={info} />
        )}
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        onClick={() => setShowTooltip(!showTooltip)}
        className="text-xs px-2 py-1 bg-gray-100 rounded border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 transition-all cursor-help flex items-center gap-1"
      >
        <span>{info.emoji}</span>
        <span>{name}</span>
      </button>

      {showTooltip && (
        <BiomarkerTooltip info={info} />
      )}
    </div>
  );
}

function BiomarkerTooltip({ info }) {
  return (
    <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 animate-fadeIn">
      <div className="bg-gray-900 text-white rounded-xl p-3 shadow-xl">
        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">{info.emoji}</span>
          <span className="font-medium">{info.name}</span>
        </div>

        {/* Short description */}
        <p className="text-sm text-gray-300 mb-2">
          {info.shortDesc}
        </p>

        {/* Full explanation */}
        <p className="text-xs text-gray-400 leading-relaxed">
          {info.explanation}
        </p>

        {/* Related tags */}
        <div className="flex flex-wrap gap-1 mt-2">
          {info.relatedTo?.slice(0, 3).map((tag, i) => (
            <span
              key={i}
              className="text-xs px-2 py-0.5 bg-gray-800 rounded-full text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
          <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-900" />
        </div>
      </div>
    </div>
  );
}

// Exportable list component for displaying multiple biomarkers
export function BiomarkerList({ biomarkers, compact = false }) {
  return (
    <div className="flex flex-wrap gap-1">
      {biomarkers?.map((marker, i) => (
        <BiomarkerTag key={i} name={marker} compact={compact} />
      ))}
    </div>
  );
}
