'use client';

import { cn } from '../../lib/utils';

export interface StatusIndicatorProps {
  status?: 'active' | 'inactive' | 'processing';
  label?: string;
  className?: string;
}

const statusConfig = {
  active: {
    dotColor: 'bg-violet-400',
    textColor: 'text-violet-300',
    label: 'System Active',
  },
  inactive: {
    dotColor: 'bg-gray-500',
    textColor: 'text-gray-400',
    label: 'System Offline',
  },
  processing: {
    dotColor: 'bg-amber-400',
    textColor: 'text-amber-300',
    label: 'Processing',
  },
} as const;

export function StatusIndicator({
  status = 'active',
  label,
  className,
}: StatusIndicatorProps) {
  const config = statusConfig[status];
  const displayLabel = label ?? config.label;

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-4 py-1.5 rounded-full',
        'backdrop-blur-sm',
        className
      )}
      style={{
        background: 'rgba(139, 92, 246, 0.10)',
        border: '1px solid rgba(139, 92, 246, 0.20)',
      }}
    >
      <div className={cn('w-1.5 h-1.5 rounded-full', config.dotColor)} />
      <span
        className={cn(
          'text-[10px] font-bold uppercase',
          config.textColor
        )}
        style={{ letterSpacing: '1px', lineHeight: '15px' }}
      >
        {displayLabel}
      </span>
    </div>
  );
}
