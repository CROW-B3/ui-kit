'use client';

import type { GlassPanelProps } from './types';
import { cn } from '../../lib/utils';

export type { GlassPanelProps };

export function GlassPanel({
  children,
  variant = 'light',
  className = '',
}: GlassPanelProps) {
  const baseClasses = 'rounded-xl border';
  const variantClasses =
    variant === 'light'
      ? 'bg-white/[0.02] border-white/[0.06] backdrop-blur-sm'
      : 'border-white/[0.06] bg-white/[0.01]';

  return (
    <div className={cn(baseClasses, variantClasses, className)}>{children}</div>
  );
}
