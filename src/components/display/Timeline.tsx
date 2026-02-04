'use client';

import { cn } from '../../lib/utils';

export interface TimelineEvent {
  id: string;
  type: string;
  label: string;
  description?: string;
  timestamp?: string;
  color?: string;
}

export interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
  dotSize?: 'sm' | 'md' | 'lg';
}

const dotSizeMap = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
};

const colorMap: Record<string, string> = {
  created: 'bg-blue-500',
  updated: 'bg-purple-500',
  resolved: 'bg-green-500',
  failed: 'bg-rose-500',
  warning: 'bg-yellow-500',
  info: 'bg-cyan-500',
  default: 'bg-gray-500',
};

export function Timeline({
  events,
  className = '',
  dotSize = 'md',
}: TimelineProps) {
  const getDotColor = (type: string): string => {
    return colorMap[type.toLowerCase()] || colorMap.default;
  };

  return (
    <div className={cn('space-y-6', className)}>
      {events.map((event, index) => (
        <div key={event.id} className="flex gap-4">
          {/* Timeline dot and line */}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'rounded-full',
                dotSizeMap[dotSize],
                getDotColor(event.color || event.type),
              )}
            />
            {index < events.length - 1 && (
              <div
                className="w-0.5 flex-1 my-2"
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  minHeight: '24px',
                }}
              />
            )}
          </div>

          {/* Event content */}
          <div className="flex-1 pt-1">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-medium text-sm" style={{ color: '#E5E7EB' }}>
                  {event.label}
                </p>
                {event.description && (
                  <p className="text-xs mt-1" style={{ color: '#6B7280' }}>
                    {event.description}
                  </p>
                )}
              </div>
              {event.timestamp && (
                <span className="text-xs whitespace-nowrap" style={{ color: '#6B7280' }}>
                  {event.timestamp}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
