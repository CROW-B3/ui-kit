'use client';

import { cn } from '../../lib/utils';

export interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'active';
  className?: string;
}

const tagStyles = {
  default: { background: 'rgba(107, 114, 128, 0.20)', color: '#9CA3AF' },
  active: { background: 'rgba(139, 92, 246, 0.20)', color: '#C4B5FD' },
} as const;

export function Tag({ children, variant = 'default', className }: TagProps) {
  const style = tagStyles[variant];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium',
        className
      )}
      style={style}
    >
      {children}
    </span>
  );
}
