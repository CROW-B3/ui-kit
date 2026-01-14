'use client';

import type { GlassPanelProps } from '../dashboard/types';
import { cn } from '../../lib/utils';

export type { GlassPanelProps };

const variantClasses = {
  light: 'bg-white/[0.02] border-white/[0.06] backdrop-blur-sm',
  heavy: 'bg-white/[0.02] border-white/[0.08] backdrop-blur-md',
} as const;

export function GlassPanel({
  children,
  variant = 'light',
  className = '',
}: GlassPanelProps) {
  return (
    <div
      className={cn('rounded-xl border', variantClasses[variant], className)}
    >
      {children}
    </div>
  );
}
