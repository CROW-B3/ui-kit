'use client';

import type { DashboardBackgroundProps } from './types';

export type { DashboardBackgroundProps };

const gradientStyles = {
  primary:
    'radial-gradient(ellipse 80% 70% at 85% 50%, rgba(30, 16, 53, 0.8) 0%, rgba(10, 5, 21, 0.4) 50%, transparent 100%)',
  vignette: (sidebarWidth: number) =>
    `radial-gradient(ellipse 55% 90% at calc(50% + calc(${sidebarWidth}px / 2)) 50%, rgba(3, 0, 5, 0) 0%, rgba(3, 0, 5, 0.50) 100%)`,
  purpleGlow: (sidebarWidth: number) =>
    `radial-gradient(ellipse 60% 50% at calc(50% + calc(${sidebarWidth}px / 2)) 100%, rgba(133, 78, 210, 0.5) 0%, rgba(133, 78, 210, 0.3) 25%, rgba(133, 78, 210, 0.1) 50%, transparent 70%)`,
};

function MinimalBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 bg-[#030005]" />
    </div>
  );
}

function DefaultBackground({
  noiseTextureSrc,
  sidebarWidth,
}: {
  noiseTextureSrc?: string;
  sidebarWidth: number;
}) {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ '--sidebar-width': `${sidebarWidth}px` } as React.CSSProperties}
    >
      <div className="absolute inset-0 bg-[#030005]" />
      <div
        className="absolute top-0 bottom-0 left-0 right-0 opacity-50"
        style={{ background: gradientStyles.primary }}
      />
      {noiseTextureSrc && (
        <img
          src={noiseTextureSrc}
          alt=""
          role="presentation"
          className="absolute inset-0 w-full h-full opacity-[0.07] mix-blend-overlay object-cover"
        />
      )}
      <div
        className="absolute inset-0 opacity-40"
        style={{ background: gradientStyles.vignette(sidebarWidth) }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[800px] pointer-events-none"
        style={{ background: gradientStyles.purpleGlow(sidebarWidth) }}
      />
    </div>
  );
}

export function DashboardBackground({
  variant = 'default',
  noiseTextureSrc,
  sidebarWidth = 280,
}: DashboardBackgroundProps) {
  if (variant === 'minimal') {
    return <MinimalBackground />;
  }

  return (
    <DefaultBackground
      noiseTextureSrc={noiseTextureSrc}
      sidebarWidth={sidebarWidth}
    />
  );
}
