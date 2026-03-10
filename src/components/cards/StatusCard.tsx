'use client';

import type { ComponentType } from 'react';
import { cn } from '../../lib/utils';
import { GlassPanel } from '../layout/GlassPanel';

export type StatusType = 'active' | 'inactive' | 'warning' | 'error';

export interface StatusCardProps {
  icon: ComponentType<{ size?: number; className?: string; strokeWidth?: number }>;
  name: string;
  status?: StatusType;
  statusText?: string;
  lastUpdate?: string;
  className?: string;
  iconClassName?: string;
}

const statusColors: Record<StatusType, { dot: string; text: string }> = {
  active: { dot: 'bg-violet-500', text: 'text-gray-200' },
  inactive: { dot: 'bg-gray-500', text: 'text-gray-500' },
  warning: { dot: 'bg-yellow-500', text: 'text-yellow-500' },
  error: { dot: 'bg-rose-500', text: 'text-rose-500' },
};

export function StatusCard({
  icon: Icon,
  name,
  status = 'active',
  statusText = '',
  lastUpdate = '',
  className = '',
  iconClassName = '',
}: StatusCardProps) {
  const statusColor = statusColors[status];

  return (
    <GlassPanel
      variant="heavy"
      className={cn('p-3 sm:p-4 flex items-center gap-3 sm:gap-4', className)}
    >
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-gray-800/50 border border-white/5">
        <Icon
          size={14}
          className={cn('text-gray-400 sm:w-4 sm:h-4 transition-colors', iconClassName)}
          strokeWidth={2}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
          <h4 className="text-xs sm:text-sm font-medium text-gray-200 truncate">
            {name}
          </h4>
          <div
            className={cn(
              'w-1.5 h-1.5 rounded-full flex-shrink-0',
              statusColor.dot,
            )}
          />
        </div>
        {statusText && (
          <p className="text-[9px] sm:text-[10px] uppercase tracking-wider text-gray-500 truncate">
            {statusText}
          </p>
        )}
      </div>

      {lastUpdate && (
        <span className="font-mono text-[10px] sm:text-xs text-gray-600 flex-shrink-0">
          {lastUpdate}
        </span>
      )}
    </GlassPanel>
  );
}
