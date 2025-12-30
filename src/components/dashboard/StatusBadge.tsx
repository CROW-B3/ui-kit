'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva('inline-flex items-center rounded font-medium', {
  variants: {
    variant: {
      positive: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
      negative: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
      warning: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
      neutral: 'bg-gray-500/10 text-gray-400 border border-gray-500/20',
      info: 'bg-violet-500/10 text-violet-300 border border-violet-500/20',
      high: 'bg-violet-500/20 text-violet-300 border border-violet-500/20',
      medium: 'bg-violet-500/10 text-violet-400 border border-violet-500/10',
      low: 'bg-gray-500/10 text-gray-400 border border-gray-500/10',
    },
    size: {
      default: 'px-2 py-0.5 text-[10px]',
      sm: 'px-1.5 py-0.5 text-[9px]',
    },
  },
  defaultVariants: {
    variant: 'neutral',
    size: 'default',
  },
});

export interface StatusBadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
  className?: string;
  uppercase?: boolean;
  tracking?: boolean;
}

export function StatusBadge({
  children,
  variant = 'neutral',
  size = 'default',
  className = '',
  uppercase = false,
  tracking = false,
}: StatusBadgeProps) {
  return (
    <span
      className={cn(
        badgeVariants({ variant, size }),
        uppercase && 'uppercase',
        tracking && 'tracking-wider',
        className
      )}
    >
      {children}
    </span>
  );
}
