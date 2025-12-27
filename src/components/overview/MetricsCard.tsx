'use client';

import { GlassPanel } from './GlassPanel';
import { StatusBadge } from './StatusBadge';

export interface MetricsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral' | 'info';
  chartData?: readonly number[];
  chartColor?: 'violet' | 'rose' | 'gray';
}

const chartColors = {
  violet: {
    bg: '#8B5CF6',
    shadow: '0px 0px 8px rgba(124, 58, 237, 0.50)',
  },
  rose: {
    bg: '#F43F5E',
    shadow: '0px 0px 8px rgba(244, 63, 94, 0.50)',
  },
  gray: {
    bg: '#6B7280',
    shadow: 'none',
  },
};

const DEFAULT_CHART_DATA = [25, 50, 35, 70, 100] as const;

export function MetricsCard({
  title,
  value,
  change,
  changeType,
  chartData = DEFAULT_CHART_DATA,
  chartColor = 'violet',
}: MetricsCardProps) {
  const maxValue = Math.max(...chartData);
  const barColor = chartColors[chartColor];

  return (
    <GlassPanel variant="light" className="relative overflow-hidden">
      <div className="p-4 sm:p-5 min-h-[100px] sm:min-h-[109px] flex flex-col">
        {/* Top row: Title and Badge */}
        <div className="flex items-start justify-between gap-2 mb-auto">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400">
            {title}
          </span>
          <StatusBadge variant={changeType}>{change}</StatusBadge>
        </div>

        {/* Bottom row: Value and Chart */}
        <div className="flex items-end justify-between mt-4">
          <span className="text-xl sm:text-2xl font-bold text-white">
            {value}
          </span>

          <MiniChart
            chartData={chartData}
            maxValue={maxValue}
            barColor={barColor}
          />
        </div>
      </div>
    </GlassPanel>
  );
}

interface MiniChartProps {
  chartData: readonly number[];
  maxValue: number;
  barColor: { bg: string; shadow: string };
}

function MiniChart({ chartData, maxValue, barColor }: MiniChartProps) {
  return (
    <div className="flex items-end gap-[2px]">
      {chartData.map((val, index) => {
        const isLast = index === chartData.length - 1;
        const height = Math.max((val / maxValue) * 20, 3);

        return (
          <div
            key={`bar-${index}-${val}`}
            style={{
              width: '12px',
              height: `${height}px`,
              borderRadius: '2px 2px 0 0',
              background: isLast ? barColor.bg : '#374151',
              boxShadow: isLast ? barColor.shadow : 'none',
              opacity: isLast ? 1 : 0.5,
            }}
          />
        );
      })}
    </div>
  );
}
