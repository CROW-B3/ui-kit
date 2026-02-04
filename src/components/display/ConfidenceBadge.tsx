'use client';

import type { ConfidenceLevel } from '../../lib/types';
import { CONFIDENCE_CONFIG } from '../../lib/constants';
import { cn } from '../../lib/utils';

export interface ConfidenceBadgeProps {
  confidence: number;
  confidenceLevel: ConfidenceLevel;
  className?: string;
  showLabel?: boolean;
  showPercentage?: boolean;
}

export function ConfidenceBadge({
  confidence,
  confidenceLevel,
  className = '',
  showLabel = true,
  showPercentage = true,
}: ConfidenceBadgeProps) {
  const confidenceStyle = CONFIDENCE_CONFIG[confidenceLevel];
  const percentage = Math.round(confidence * 100);

  return (
    <div
      className={cn(
        'p-4 rounded-xl',
        className
      )}
      style={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#6B7280' }}>
          Confidence Score
        </span>
        {showLabel && (
          <span
            className="text-sm font-semibold px-2.5 py-1 rounded-lg"
            style={{
              color: confidenceStyle.color,
              background: confidenceStyle.bg,
              border: `1px solid ${confidenceStyle.border}`,
            }}
          >
            {confidenceStyle.label}
          </span>
        )}
      </div>
      <div className="flex items-end gap-3">
        {showPercentage && (
          <span className="text-3xl font-bold" style={{ color: confidenceStyle.color }}>
            {percentage}%
          </span>
        )}
        <div className="flex-1 h-2 rounded-full overflow-hidden mb-2" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{ width: `${percentage}%`, background: confidenceStyle.color }}
          />
        </div>
      </div>
    </div>
  );
}
