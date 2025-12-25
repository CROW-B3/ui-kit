'use client';

import { cn } from '../lib/utils';

export interface GlassPanelProps {
  children: React.ReactNode;
  variant?: 'light' | 'heavy';
  className?: string;
}

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
    <div className={cn(baseClasses, variantClasses, className)}>
      {children}
    </div>
  );
}
