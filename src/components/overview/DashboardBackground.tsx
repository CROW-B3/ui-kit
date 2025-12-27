'use client';

import type { DashboardBackgroundProps } from './types';

export type { DashboardBackgroundProps };

const DEFAULT_NOISE_TEXTURE = 'https://api.builder.io/api/v1/image/assets/TEMP/01cf5743ccbc8becbbc870a231ecce44d240df94?width=3840';

// Sidebar width for centering calculations
const SIDEBAR_WIDTH = 280;

export function DashboardBackground({
  variant = 'default',
  noiseTextureSrc = DEFAULT_NOISE_TEXTURE,
}: DashboardBackgroundProps) {
  if (variant === 'minimal') {
    return (
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', inset: 0, background: '#030005' }} />
      </div>
    );
  }

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {/* Responsive styles and animations for blob centering */}
      {/* Content area center = 50% + (SIDEBAR_WIDTH / 2) = 50% + 140px */}
      <style>
        {`
          @keyframes riseFromBelow {
            0% {
              opacity: 0;
              transform: translate(-50%, 100%);
            }
            100% {
              opacity: 1;
              transform: translate(-50%, 85%);
            }
          }

          @keyframes fadeInHalf {
            0% { opacity: 0; }
            100% { opacity: 0.5; }
          }

          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }

          .dashboard-bg-blob {
            left: 50%;
            transform: translate(-50%, 85%);
            animation: riseFromBelow 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          }

          .dashboard-bg-gradient {
            animation: fadeInHalf 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
            opacity: 0;
          }

          .dashboard-bg-vignette {
            animation: fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
            opacity: 0;
          }

          @media (min-width: 768px) {
            .dashboard-bg-blob {
              left: calc(50% + ${SIDEBAR_WIDTH / 2}px);
            }
          }
        `}
      </style>

      {/* Layer 1: Deep black base */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#030005',
        }}
      />

      {/* Layer 2: Right-side gradient - starts after sidebar area, extends to right edge */}
      <div
        className="dashboard-bg-gradient"
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: `calc(${SIDEBAR_WIDTH}px + 25%)`,
          background: 'linear-gradient(270deg, #1E1035 0%, #0A0515 50%, rgba(10, 5, 21, 0) 100%)',
        }}
      />

      {/* Layer 3: Noise texture overlay */}
      <img
        src={noiseTextureSrc}
        alt=""
        role="presentation"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          opacity: 0.07,
          mixBlendMode: 'overlay',
          objectFit: 'cover',
        }}
      />

      {/* Layer 4: Radial vignette - centered in content area on desktop */}
      <div
        className="dashboard-bg-vignette"
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(ellipse 55% 90% at calc(50% + ${SIDEBAR_WIDTH / 2}px) 50%, rgba(3, 0, 5, 0) 0%, rgba(3, 0, 5, 0.50) 100%)`,
        }}
      />

      {/* Layer 5: Violet blur orb - centered in content area (excluding sidebar) */}
      <div
        className="dashboard-bg-blob"
        style={{
          position: 'absolute',
          width: 950,
          height: 450,
          bottom: 0,
          background: 'rgba(133, 78, 210, 0.45)',
          filter: 'blur(150px)',
        }}
      />
    </div>
  );
}
