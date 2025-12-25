'use client';

import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const iconBadgeVariants = cva(
  'w-8 h-8 rounded flex items-center justify-center border',
  {
    variants: {
      variant: {
        blue: 'bg-blue-500/10 border-blue-500/20',
        red: 'bg-red-500/10 border-red-500/20',
        violet: 'bg-violet-500/10 border-violet-500/20',
        emerald: 'bg-emerald-500/10 border-emerald-500/20',
        gray: 'bg-gray-800/50 border-white/5',
      },
    },
    defaultVariants: {
      variant: 'gray',
    },
  }
);

export interface IconBadgeProps extends VariantProps<typeof iconBadgeVariants> {
  icon: string; // Material Symbols icon name
  className?: string;
  iconClassName?: string;
}

export function IconBadge({
  icon,
  variant = 'gray',
  className = '',
  iconClassName = '',
}: IconBadgeProps) {
  const colorMap: Record<string, string> = {
    blue: 'text-blue-400',
    red: 'text-red-400',
    violet: 'text-violet-400',
    emerald: 'text-emerald-400',
    gray: 'text-gray-400',
  };

  return (
    <div className={cn(iconBadgeVariants({ variant }), className)}>
      <span
        className={cn(
          'material-symbols-outlined text-[18px]',
          colorMap[variant as string],
          iconClassName
        )}
      >
        {icon}
      </span>
    </div>
  );
}
