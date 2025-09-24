import React from 'react';

export function StitchLine({
  className = 'absolute',
  width = 240,
  height = 2,
  opacity = 0.45
}: {
  className?: string;
  width?: number;
  height?: number;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden
      width={width}
      height={height}
      className={className}
      viewBox={`0 0 ${width} ${height}`}
      fill='none'
    >
      <line
        x1='0'
        y1={height / 2}
        x2={width}
        y2={height / 2}
        stroke='var(--mist-300)'
        strokeOpacity={opacity}
        strokeWidth='2'
        strokeLinecap='round'
        strokeDasharray='6 8'
      />
    </svg>
  );
}

export function StitchCircle({
  className = 'absolute',
  size = 180,
  opacity = 0.35
}: {
  className?: string;
  size?: number;
  opacity?: number;
}) {
  return (
    <svg
      aria-hidden
      width={size}
      height={size}
      className={className}
      viewBox={`0 0 ${size} ${size}`}
      fill='none'
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 2}
        stroke='var(--mist-300)'
        strokeOpacity={opacity}
        strokeWidth='2'
        strokeLinecap='round'
        strokeDasharray='6 10'
      />
    </svg>
  );
}