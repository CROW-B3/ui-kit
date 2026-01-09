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

/**
 * A status indicator component that displays system status with a colored dot
 * Shows predefined labels for each status or custom labels
 * @param {StatusIndicatorProps} props - Component props
 * @param {'active' | 'inactive' | 'processing'} [props.status='active'] - Status type
 * @param {string} [props.label] - Custom label text (overrides default)
 * @param {string} [props.className] - Additional CSS classes
 * @returns {JSX.Element} The status indicator component
 */
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
        'backdrop-blur-sm bg-violet-500/10 border border-violet-500/20',
        className
      )}
    >
      <div className={cn('w-1.5 h-1.5 rounded-full', config.dotColor)} />
      <span
        className={cn(
          'text-[10px] font-bold uppercase tracking-[1px] leading-[15px]',
          config.textColor
        )}
      >
        {displayLabel}
      </span>
    </div>
  );
}
