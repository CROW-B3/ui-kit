'use client';

import { Bell, Clock, MapPin } from 'lucide-react';
import { cn } from '../../lib/utils';

export type SeverityLevel = 'high' | 'medium' | 'low';
export type ConfidenceLevel = 'high' | 'medium' | 'low';

export interface PatternCardProps {
  id?: string;
  title: string;
  severity: SeverityLevel;
  affectedStores: string;
  lastSeen: string;
  confidence: ConfidenceLevel;
  onViewDetails?: () => void;
  onViewEvidence?: () => void;
  onCreateAlert?: () => void;
  className?: string;
}

const severityConfig: Record<
  SeverityLevel,
  { label: string; color: string; bg: string; border: string }
> = {
  high: {
    label: 'HIGH',
    color: '#F87171',
    bg: 'rgba(239, 68, 68, 0.10)',
    border: 'rgba(239, 68, 68, 0.20)',
  },
  medium: {
    label: 'MEDIUM',
    color: '#FACC15',
    bg: 'rgba(234, 179, 8, 0.10)',
    border: 'rgba(234, 179, 8, 0.20)',
  },
  low: {
    label: 'LOW',
    color: '#60A5FA',
    bg: 'rgba(59, 130, 246, 0.10)',
    border: 'rgba(59, 130, 246, 0.20)',
  },
};

const confidenceConfig: Record<
  ConfidenceLevel,
  { label: string; color: string; bg: string; border: string }
> = {
  high: {
    label: 'High',
    color: '#C4B5FD',
    bg: 'rgba(139, 92, 246, 0.10)',
    border: 'rgba(139, 92, 246, 0.20)',
  },
  medium: {
    label: 'Medium',
    color: '#D1D5DB',
    bg: 'rgba(255, 255, 255, 0.05)',
    border: 'rgba(255, 255, 255, 0.10)',
  },
  low: {
    label: 'Low',
    color: '#D1D5DB',
    bg: 'rgba(255, 255, 255, 0.05)',
    border: 'rgba(255, 255, 255, 0.10)',
  },
};

export function PatternCard({
  title,
  severity,
  affectedStores,
  lastSeen,
  confidence,
  onViewDetails,
  onViewEvidence,
  onCreateAlert,
  className,
}: PatternCardProps) {
  const severityStyle = severityConfig[severity];
  const confidenceStyle = confidenceConfig[confidence];

  return (
    <div
      className={cn('relative overflow-hidden rounded-xl', className)}
      style={{
        background: 'rgba(10, 5, 20, 0.40)',
        boxShadow: '0px 4px 6px -4px rgba(0, 0, 0, 0.10)',
        outline: '1px rgba(255, 255, 255, 0.08) solid',
        outlineOffset: '-1px',
        backdropFilter: 'blur(8px)',
      }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3
            className="text-base font-semibold leading-6 flex-1"
            style={{ color: 'white' }}
          >
            {title}
          </h3>
          <span
            className="shrink-0 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide"
            style={{
              color: severityStyle.color,
              background: severityStyle.bg,
              outline: `1px ${severityStyle.border} solid`,
              outlineOffset: '-1px',
            }}
          >
            {severityStyle.label}
          </span>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2">
            <MapPin size={16} color="#6B7280" />
            <span className="text-sm leading-5" style={{ color: '#9CA3AF' }}>
              Affected stores: {affectedStores}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock size={16} color="#6B7280" />
            <span className="text-sm leading-5" style={{ color: '#9CA3AF' }}>
              Last seen: {lastSeen}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <span className="text-xs font-medium" style={{ color: '#6B7280' }}>
            Confidence:
          </span>
          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-medium"
            style={{
              color: confidenceStyle.color,
              background: confidenceStyle.bg,
              outline: `1px ${confidenceStyle.border} solid`,
              outlineOffset: '-1px',
            }}
          >
            {confidenceStyle.label}
          </span>
        </div>

        <div
          className="pt-4 flex items-center gap-3"
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}
        >
          <button
            type="button"
            onClick={onViewDetails}
            className="h-[30px] px-3.5 flex items-center justify-center rounded-lg text-xs font-medium text-white transition-colors"
            style={{
              background: '#7C3AED',
              boxShadow: '0px 0px 10px rgba(124, 58, 237, 0.30)',
              outline: '1px #8B5CF6 solid',
              outlineOffset: '-1px',
            }}
          >
            View details
          </button>
          <button
            type="button"
            onClick={onViewEvidence}
            className="h-[30px] px-3.5 flex items-center justify-center rounded-lg text-xs font-medium transition-colors hover:bg-white/5"
            style={{
              color: '#D1D5DB',
              outline: '1px rgba(255, 255, 255, 0.10) solid',
              outlineOffset: '-1px',
            }}
          >
            View evidence
          </button>
          <div className="flex-1" />
          <button
            type="button"
            onClick={onCreateAlert}
            className="h-7 px-3 flex items-center gap-1.5 rounded-lg text-xs font-medium transition-colors hover:bg-white/5"
            style={{ color: '#9CA3AF' }}
          >
            <Bell size={14} color="#9CA3AF" />
            Create alert
          </button>
        </div>
      </div>
    </div>
  );
}
