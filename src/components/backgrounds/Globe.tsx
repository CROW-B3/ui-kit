'use client';

import { lazy, Suspense } from 'react';
import { BiCctv } from 'react-icons/bi';
import { BsGlobe2 } from 'react-icons/bs';
import { HiOutlineShare } from 'react-icons/hi';

export interface GlobePoint {
  label: string;
  icon: React.ReactNode;
  location: [number, number];
}

export interface GlobeProps {
  points?: GlobePoint[];
  size?: number;
}

const DEFAULT_POINTS: GlobePoint[] = [
  {
    label: 'Internet',
    icon: <BsGlobe2 className="text-3xl" />,
    location: [20, 0] as [number, number],
  },
  {
    label: 'CCTV',
    icon: <BiCctv className="text-3xl" />,
    location: [0, -60] as [number, number],
  },
  {
    label: 'Social Media',
    icon: <HiOutlineShare className="text-3xl" />,
    location: [-10, 50] as [number, number],
  },
];

const GlobeRenderer = lazy(() => import('./GlobeRenderer'));

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

export function Globe({ points = DEFAULT_POINTS, size = 600 }: GlobeProps) {
  return (
    <Suspense fallback={<GlobeLoader size={size} />}>
      <GlobeRenderer points={points} size={size} />
    </Suspense>
  );
}
