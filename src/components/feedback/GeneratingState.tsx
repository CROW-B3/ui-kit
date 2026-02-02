'use client';

import Image from 'next/image';

export interface GeneratingStateProps {
  label?: string;
  subtitle?: string;
  showDots?: boolean;
  showOrbitals?: boolean;
  avatarSrc?: string;
  avatarAlt?: string;
  orbitalDurationFast?: number;
  orbitalDurationSlow?: number;
}

function AnimatedDot({ delay }: { delay: string }) {
  return (
    <div
      className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse"
      style={{ animationDelay: delay }}
    />
  );
}

function OrbitalRing({
  duration,
  direction = 'normal',
}: {
  duration: number;
  direction?: 'normal' | 'reverse';
}) {
  return (
    <div
      className="absolute rounded-full border border-purple-500/30 animate-spin"
      style={{
        animationDuration: `${duration}ms`,
        animationDirection: direction,
      }}
    />
  );
}

export function GeneratingState({
  label = 'Processing your request',
  subtitle = 'Processing',
  showDots = true,
  showOrbitals = true,
  avatarSrc = '/favicon.webp',
  avatarAlt = 'Processing',
  orbitalDurationFast = 3000,
  orbitalDurationSlow = 5000,
}: GeneratingStateProps) {
  return (
    <div className="flex justify-start animate-fadeIn">
      <div
        className="border rounded-2xl px-5 py-4 max-w-[85%]"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          borderColor: 'rgba(255, 255, 255, 0.1)',
        }}
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center ring-1 ring-purple-500/40"
              style={{ background: 'rgba(0, 0, 0, 0.6)' }}
            >
              <Image
                src={avatarSrc}
                alt={avatarAlt}
                width={24}
                height={24}
                className="rounded-full animate-pulse"
              />
            </div>

            {showOrbitals && (
              <>
                <OrbitalRing
                  duration={orbitalDurationFast}
                  direction="normal"
                />
                <OrbitalRing
                  duration={orbitalDurationSlow}
                  direction="reverse"
                />
              </>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[13px] font-medium text-white/90">
              {label}
            </span>

            {showDots && (
              <div className="flex items-center gap-2">
                <div className="flex gap-[3px]">
                  <AnimatedDot delay="0ms" />
                  <AnimatedDot delay="200ms" />
                  <AnimatedDot delay="400ms" />
                </div>
                <span className="text-[11px] text-gray-500 uppercase tracking-wider">
                  {subtitle}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
