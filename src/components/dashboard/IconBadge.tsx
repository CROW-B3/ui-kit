'use client';

import type { VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import { cva } from 'class-variance-authority';
import {
  Bell,
  Home,
  LayoutGrid,
  MessageSquare,
  Search,
  Settings,
  TrendingUp,
  Users,
} from 'lucide-react';
import { cn } from '../../lib/utils';

const iconBadgeVariants = cva(
  'w-8 h-8 rounded-lg flex items-center justify-center border',
  {
    variants: {
      variant: {
        gray: 'bg-gray-800/50 border-white/5',
        violet:
          'bg-violet-600 border-violet-500/50 shadow-[0_0_15px_rgba(124,58,237,0.5)]',
        blue: 'bg-blue-600/20 border-blue-500/20',
        emerald: 'bg-emerald-600/20 border-emerald-500/20',
        rose: 'bg-rose-600/20 border-rose-500/20',
      },
    },
    defaultVariants: {
      variant: 'gray',
    },
  }
);

const iconMap: Record<string, LucideIcon> = {
  grid_view: LayoutGrid,
  chat_bubble: MessageSquare,
  timeline: TrendingUp,
  group: Users,
  settings: Settings,
  notifications: Bell,
  search: Search,
  home: Home,
};

export interface IconBadgeProps extends VariantProps<typeof iconBadgeVariants> {
  icon: string;
  className?: string;
  iconClassName?: string;
}

export function IconBadge({
  icon,
  variant = 'gray',
  className = '',
  iconClassName = '',
}: IconBadgeProps) {
  const IconComponent = iconMap[icon];

  return (
    <div className={cn(iconBadgeVariants({ variant }), className)}>
      {IconComponent ? (
        <IconComponent
          size={18}
          className={cn(
            variant === 'gray' ? 'text-gray-400' : 'text-white',
            iconClassName
          )}
          strokeWidth={2}
        />
      ) : (
        <span
          className={cn(
            'text-[18px]',
            variant === 'gray' ? 'text-gray-400' : 'text-white',
            iconClassName
          )}
        >
          {icon}
        </span>
      )}
    </div>
  );
}
