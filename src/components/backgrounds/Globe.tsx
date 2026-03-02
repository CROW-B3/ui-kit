'use client';

import { lazy, Suspense, useEffect, useState } from 'react';

export interface GlobePoint {
  label: string;
  icon: React.ReactNode;
  location: [number, number];
}

export interface GlobeProps {
  points?: GlobePoint[];
  size?: number;
}

const GlobeRenderer = lazy(() => import('./GlobeRenderer'));

function useResponsiveSize(requested: number): number {
  const [size, setSize] = useState(() =>
    typeof window !== 'undefined'
      ? Math.min(requested, window.innerWidth - 32)
      : requested
  );

  useEffect(() => {
    const update = () => setSize(Math.min(requested, window.innerWidth - 32));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [requested]);

  return size;
}

function GlobeLoader({ size }: { size: number }) {
  return (
    <div
      className="flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <div className="relative">
        <div
          className="rounded-full border-2 border-white/20 animate-pulse"
          style={{ width: size * 0.6, height: size * 0.6 }}
        />
        <div
          className="absolute inset-0 rounded-full border-t-2 border-blue-500/50 animate-spin"
          style={{ width: size * 0.6, height: size * 0.6 }}
        />
      </div>
    </div>
  );
}

export function Globe({ points = [], size = 600 }: GlobeProps) {
  const responsiveSize = useResponsiveSize(size);

  return (
    <Suspense fallback={<GlobeLoader size={responsiveSize} />}>
      <GlobeRenderer points={points} size={responsiveSize} />
    </Suspense>
  );
}
