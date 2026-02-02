'use client';

import { StatusBadge } from '../display/StatusBadge';
import { GlassPanel } from '../layout/GlassPanel';
import { CHART_COLORS } from '../../lib/constants/gradients';

export interface MetricsCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral' | 'info';
  chartData?: readonly number[];
  chartColor?: 'violet' | 'rose' | 'gray';
}

const DEFAULT_CHART_DATA = [25, 50, 35, 70, 100] as const;

interface MiniChartProps {
  chartData: readonly number[];
  maxValue: number;
  barColor: { bg: string; shadow: string };
}

function MiniChart({ chartData, maxValue, barColor }: MiniChartProps) {
  return (
    <div className="flex items-end gap-[2px]">
      {chartData.map((value, index) => {
        const isLast = index === chartData.length - 1;
        const height = Math.max((value / maxValue) * 20, 3);

        return (
          <div
            key={`bar-${index}-${value}`}
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

export function MetricsCard({
  title,
  value,
  change,
  changeType,
  chartData = DEFAULT_CHART_DATA,
  chartColor = 'violet',
}: MetricsCardProps) {
  const safeChartData = chartData.length > 0 ? chartData : DEFAULT_CHART_DATA;
  const maxValue = Math.max(...safeChartData);
  const barColor = CHART_COLORS[chartColor];

  return (
    <GlassPanel variant="light" className="relative overflow-hidden">
      <div className="p-4 sm:p-5 min-h-[100px] sm:min-h-[109px] flex flex-col">
        <div className="flex items-start justify-between gap-2 mb-auto">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-400">
            {title}
          </span>
          <StatusBadge variant={changeType}>{change}</StatusBadge>
        </div>

        <div className="flex items-end justify-between mt-4">
          <span className="text-xl sm:text-2xl font-bold text-white">
            {value}
          </span>
          <MiniChart
            chartData={safeChartData}
            maxValue={maxValue}
            barColor={barColor}
          />
        </div>
      </div>
    </GlassPanel>
  );
}
