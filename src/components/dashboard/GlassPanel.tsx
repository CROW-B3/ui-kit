'use client';

import type { GlassPanelProps } from './types';
import { cn } from '../../lib/utils';

export type { GlassPanelProps };

/**
 * A frosted glass panel component with backdrop blur effect
 * Used to create modern glass-morphism UI elements
 * @param {GlassPanelProps} props - Component props
 * @param {React.ReactNode} props.children - Content to display inside the panel
 * @param {'light' | 'heavy'} [props.variant='light'] - Visual variant of the panel
 * @param {string} [props.className=''] - Additional CSS classes to apply
 * @returns {JSX.Element} The glass panel component
 */
export function GlassPanel({
  children,
  variant = 'light',
  className = '',
}: GlassPanelProps) {
  const baseClasses = 'rounded-xl border';
  const variantClasses =
    variant === 'light'
      ? 'bg-white/[0.02] border-white/[0.06] backdrop-blur-sm'
      : 'bg-white/[0.02] border-white/[0.08] backdrop-blur-md';

  return (
    <div className={cn(baseClasses, variantClasses, className)}>{children}</div>
  );
}
