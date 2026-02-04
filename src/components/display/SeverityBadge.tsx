'use client';

import type { SeverityLevel } from '../../lib/types';
import { SEVERITY_CONFIG } from '../../lib/constants';
import { cn } from '../../lib/utils';

export interface SeverityBadgeProps {
  severity: SeverityLevel;
  className?: string;
  uppercase?: boolean;
  tracking?: boolean;
}

export function SeverityBadge({
  severity,
  className = '',
  uppercase = false,
  tracking = false,
}: SeverityBadgeProps) {
  const config = SEVERITY_CONFIG[severity];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 rounded-lg font-medium text-xs',
        uppercase && 'uppercase',
        tracking && 'tracking-wider',
        className
      )}
      style={{
        color: config.color,
        background: config.bg,
        border: `1px solid ${config.border}`,
      }}
    >
      {config.label}
    </span>
  );
}
