import { useMemo } from 'react';

export default function SpiderChart({ companions, healthType, size = 280 }) {
  const center = size / 2;
  const radius = (size / 2) - 40; // Leave room for labels
  const levels = 4; // Number of concentric rings

  // Sort companions by their natural order for consistent display
  const orderedCompanions = useMemo(() => {
    const order = ['pip', 'luna', 'ember', 'sage', 'coral', 'brook', 'oak'];
    return order.map(id => companions.find(c => c.id === id)).filter(Boolean);
  }, [companions]);

  const numPoints = orderedCompanions.length;
  const angleStep = (2 * Math.PI) / numPoints;

  // Calculate point positions for a given radius
  const getPoint = (index, r) => {
    const angle = (index * angleStep) - (Math.PI / 2); // Start from top
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle)
    };
  };

  // Generate web lines (from center to each point)
  const webLines = orderedCompanions.map((_, i) => {
    const point = getPoint(i, radius);
    return `M ${center} ${center} L ${point.x} ${point.y}`;
  });

  // Generate concentric rings
  const rings = Array.from({ length: levels }, (_, level) => {
    const r = (radius / levels) * (level + 1);
    const points = orderedCompanions.map((_, i) => getPoint(i, r));
    return points.map(p => `${p.x},${p.y}`).join(' ');
  });

  // Generate data polygon based on scores
  const dataPoints = orderedCompanions.map((companion, i) => {
    const score = companion.score || 50;
    const normalizedScore = Math.max(10, Math.min(100, score)) / 100;
    const r = radius * normalizedScore;
    return getPoint(i, r);
  });
  const dataPolygon = dataPoints.map(p => `${p.x},${p.y}`).join(' ');

  // Get gradient colors from health type
  const gradientColors = useMemo(() => {
    if (!healthType?.gradient) {
      return { start: '#6ee7b7', end: '#14b8a6' };
    }
    // Parse gradient like "from-emerald-400 to-teal-500"
    const colorMap = {
      'emerald': { 400: '#34d399', 500: '#10b981' },
      'teal': { 400: '#2dd4bf', 500: '#14b8a6' },
      'orange': { 400: '#fb923c', 500: '#f97316' },
      'amber': { 400: '#fbbf24', 500: '#f59e0b' },
      'yellow': { 400: '#facc15', 500: '#eab308' },
      'violet': { 400: '#a78bfa', 500: '#8b5cf6' },
      'purple': { 400: '#c084fc', 500: '#a855f7' },
      'pink': { 400: '#f472b6', 500: '#ec4899' },
      'rose': { 400: '#fb7185', 500: '#f43f5e' },
      'cyan': { 400: '#22d3ee', 500: '#06b6d4' },
      'blue': { 400: '#60a5fa', 500: '#3b82f6' }
    };

    const fromMatch = healthType.gradient.match(/from-(\w+)-(\d+)/);
    const toMatch = healthType.gradient.match(/to-(\w+)-(\d+)/);

    const startColor = fromMatch ? colorMap[fromMatch[1]]?.[fromMatch[2]] : '#34d399';
    const endColor = toMatch ? colorMap[toMatch[1]]?.[toMatch[2]] : '#14b8a6';

    return { start: startColor || '#34d399', end: endColor || '#14b8a6' };
  }, [healthType]);

  const gradientId = `spider-gradient-${healthType?.id || 'default'}`;

  return (
    <div className="relative">
      <svg width={size} height={size} className="mx-auto">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientColors.start} stopOpacity="0.8" />
            <stop offset="100%" stopColor={gradientColors.end} stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id={`${gradientId}-stroke`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={gradientColors.start} />
            <stop offset="100%" stopColor={gradientColors.end} />
          </linearGradient>
        </defs>

        {/* Background rings */}
        {rings.map((ring, i) => (
          <polygon
            key={i}
            points={ring}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
            opacity={0.6}
          />
        ))}

        {/* Web lines from center */}
        {webLines.map((path, i) => (
          <path
            key={i}
            d={path}
            stroke="#e5e7eb"
            strokeWidth="1"
            opacity={0.6}
          />
        ))}

        {/* Data polygon with gradient fill */}
        <polygon
          points={dataPolygon}
          fill={`url(#${gradientId})`}
          stroke={`url(#${gradientId}-stroke)`}
          strokeWidth="2"
          className="transition-all duration-700"
        />

        {/* Data points */}
        {dataPoints.map((point, i) => (
          <circle
            key={i}
            cx={point.x}
            cy={point.y}
            r="5"
            fill="white"
            stroke={gradientColors.end}
            strokeWidth="2"
            className="transition-all duration-500"
          />
        ))}

        {/* Labels */}
        {orderedCompanions.map((companion, i) => {
          const labelRadius = radius + 25;
          const point = getPoint(i, labelRadius);
          const score = Math.round(companion.score || 50);

          return (
            <g key={companion.id}>
              {/* Emoji */}
              <text
                x={point.x}
                y={point.y - 8}
                textAnchor="middle"
                fontSize="16"
                className="select-none"
              >
                {companion.emoji}
              </text>
              {/* Domain name */}
              <text
                x={point.x}
                y={point.y + 8}
                textAnchor="middle"
                fontSize="9"
                fill="#6b7280"
                className="select-none"
              >
                {companion.domain.split(' ')[0]}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Legend */}
      <div className="flex justify-center gap-4 mt-2 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-gray-200"></span>
          Needs care
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: gradientColors.end }}></span>
          Strong
        </span>
      </div>
    </div>
  );
}
