'use client';

import type { DashboardBackgroundProps } from './types';

export type { DashboardBackgroundProps };

const DEFAULT_NOISE_TEXTURE = 'https://api.builder.io/api/v1/image/assets/TEMP/01cf5743ccbc8becbbc870a231ecce44d240df94?width=3840';

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
      {/* Layer 1: Deep black base - 1920x1200, #030005 */}
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          left: 0,
          top: 0,
          background: '#030005',
        }}
      />

      {/* Layer 2: Right-side gradient - 1152px wide, starts at 768px from left, opacity 0.60 */}
      {/* linear-gradient(270deg, #1E1035 0%, #0A0515 50%, rgba(10, 5, 21, 0) 100%) */}
      <div
        style={{
          width: 1152,
          height: '100%',
          left: 768,
          top: 0,
          position: 'absolute',
          opacity: 0.60,
          background: 'linear-gradient(270deg, #1E1035 0%, #0A0515 50%, rgba(10, 5, 21, 0) 100%)',
        }}
      />

      {/* Layer 3: Noise texture overlay - opacity 0.07, mixBlendMode overlay */}
      <img
        src={noiseTextureSrc}
        alt=""
        role="presentation"
        style={{
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
          position: 'absolute',
          opacity: 0.07,
          mixBlendMode: 'overlay',
          objectFit: 'cover',
        }}
      />

      {/* Layer 4: Radial vignette - ellipse 58.96% 94.34% at 50% 50% */}
      <div
        style={{
          width: '100%',
          height: '100%',
          left: 0,
          top: 0,
          position: 'absolute',
          background: 'radial-gradient(ellipse 58.96% 94.34% at 50.00% 50.00%, rgba(3, 0, 5, 0) 0%, rgba(3, 0, 5, 0.40) 100%)',
        }}
      />

      {/* Layer 5: Violet blur orb - 1238x1133, left: 471, top: 1047, rgba(133, 78, 210, 0.50), blur(250px) */}
      <div
        style={{
          width: 1238,
          height: 1133,
          left: 471,
          top: 1047,
          position: 'absolute',
          background: 'rgba(133, 78, 210, 0.50)',
          filter: 'blur(250px)',
        }}
      />
    </div>
  );
}
