'use client';

import type { MetricItem } from '../../lib/types';
import { cn } from '../../lib/utils';

export interface MetricsGridProps {
  metrics: MetricItem[];
  className?: string;
  columns?: 2 | 3 | 4;
}

export function MetricsGrid({
  metrics,
  className = '',
  columns = 2,
}: MetricsGridProps) {
  const colsClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
  }[columns];

  return (
    <div className={cn(`grid ${colsClass} gap-3`, className)}>
      {metrics.map((metric, idx) => (
        <MetricGridItem key={idx} metric={metric} />
      ))}
    </div>
  );
}

interface MetricGridItemProps {
  metric: MetricItem;
}

function MetricGridItem({ metric }: MetricGridItemProps) {
  return (
    <div
      className="p-3 rounded-lg"
      style={{
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
      }}
    >
      <p className="text-xs mb-1" style={{ color: '#6B7280' }}>
        {metric.label}
      </p>
      <div className="flex items-baseline gap-2">
        <span className="text-lg font-semibold" style={{ color: '#F3F4F6' }}>
          {metric.value}
        </span>
        {metric.change && (
          <span
            className="text-xs font-medium"
            style={{
              color:
                metric.changeType === 'positive'
                  ? '#4ADE80'
                  : metric.changeType === 'negative'
                    ? '#F87171'
                    : '#9CA3AF',
            }}
          >
            {metric.change}
          </span>
        )}
      </div>
    </div>
  );
}
