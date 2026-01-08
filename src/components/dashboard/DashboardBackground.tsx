'use client';

import type { DashboardBackgroundProps } from './types';
import { cn } from '../../lib/utils';

export type { DashboardBackgroundProps };

const DEFAULT_NOISE_TEXTURE = '/textures/noise.png';

export function DashboardBackground({
  variant = 'default',
  noiseTextureSrc = DEFAULT_NOISE_TEXTURE,
  sidebarWidth = 280,
}: DashboardBackgroundProps) {
  if (variant === 'minimal') {
    return (
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#030005]" />
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ '--sidebar-width': `${sidebarWidth}px` } as React.CSSProperties}
    >
      <div className="absolute inset-0 bg-[#030005]" />

      <div
        className={cn(
          'absolute top-0 bottom-0 right-0',
          'bg-gradient-to-l from-[#1E1035] via-[#0A0515] to-transparent',
          'animate-[fadeInHalf_0.6s_cubic-bezier(0.22,1,0.36,1)_forwards] opacity-0'
        )}
        style={{ left: `calc(var(--sidebar-width) + 25%)` }}
      />

      <img
        src={noiseTextureSrc}
        alt=""
        role="presentation"
        className="absolute inset-0 w-full h-full opacity-[0.07] mix-blend-overlay object-cover"
      />

      <div
        className={cn(
          'absolute inset-0',
          'animate-[fadeIn_0.6s_cubic-bezier(0.22,1,0.36,1)_forwards] opacity-0'
        )}
        style={{
          background: `radial-gradient(ellipse 55% 90% at calc(50% + calc(var(--sidebar-width) / 2)) 50%, rgba(3, 0, 5, 0) 0%, rgba(3, 0, 5, 0.50) 100%)`,
        }}
      />

      <div
        className={cn(
          'absolute w-[950px] h-[450px] bottom-0',
          'bg-[rgba(133,78,210,0.45)] blur-[150px]',
          'left-1/2 -translate-x-1/2 translate-y-[85%]',
          'animate-[riseFromBelow_0.7s_cubic-bezier(0.22,1,0.36,1)_forwards]',
          'md:left-[calc(50%+calc(var(--sidebar-width)/2))]'
        )}
      />
    </div>
  );
}
