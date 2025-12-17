'use client';

export interface GradientBackgroundProps {
  position?: 'top' | 'bottom';
  offset?: string;
  width?: string;
  height?: string;
  colors?: {
    start: string;
    middle1: string;
    middle2: string;
    middle3: string;
  };
  blur?: string;
  className?: string;
}

export function GradientBackground({
  position = 'top',
  offset = '-70%',
  width = '130%',
  height = '100vh',
  colors = {
    start: 'rgba(60, 40, 100, 0.9)',
    middle1: 'rgba(50, 30, 80, 0.7)',
    middle2: 'rgba(40, 20, 70, 0.6)',
    middle3: 'rgba(30, 15, 50, 0.4)',
  },
  blur = '60px',
  className = '',
}: GradientBackgroundProps) {
  const background = `radial-gradient(circle at center, ${colors.start}, ${colors.middle1} 25%, ${colors.middle2} 45%, ${colors.middle3} 65%, transparent 80%)`;

  return (
    <div
      className={`absolute left-1/2 -translate-x-1/2 pointer-events-none ${className}`}
      style={{
        [position]: offset,
        width,
        height,
        background,
        filter: `blur(${blur})`,
      }}
    />
  );
}
