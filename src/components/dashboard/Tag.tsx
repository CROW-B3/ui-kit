'use client';

import { cn } from '../../lib/utils';

export interface TagProps {
  children: React.ReactNode;
  variant?: 'default' | 'active';
  className?: string;
}

export function Tag({ children, variant = 'default', className }: TagProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium',
        className
      )}
      style={
        variant === 'active'
          ? { background: 'rgba(139, 92, 246, 0.20)', color: '#C4B5FD' }
          : { background: 'rgba(107, 114, 128, 0.20)', color: '#9CA3AF' }
      }
    >
      {children}
    </span>
  );
}
