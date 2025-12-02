'use client';

interface AnimatedBackgroundProps {
  backgroundColor?: string;
  primaryGlowColor?: string;
  secondaryGlowColor?: string;
  tertiaryGlowColor?: string;
  primaryGlowOpacity?: number;
}

export function AnimatedBackground({
  backgroundColor = '#000000',
  primaryGlowColor = '#854ED2',
  secondaryGlowColor = '#ffffffbd',
  tertiaryGlowColor = '#e0c8ffbe',
  primaryGlowOpacity = 0.5,
}: AnimatedBackgroundProps) {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -10,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: backgroundColor,
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '60%',
          left: '100%',
          transform: 'translate(-50%, -50%)',
          width: '1700px',
          height: '900px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${primaryGlowColor} 0%, transparent 70%)`,
          opacity: primaryGlowOpacity,
          filter: 'blur(40px)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          top: '60%',
          left: '100%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '400px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${secondaryGlowColor} 0%, ${tertiaryGlowColor} 40%, transparent 65%)`,
          filter: 'blur(80px)',
        }}
      />
    </div>
  );
}
