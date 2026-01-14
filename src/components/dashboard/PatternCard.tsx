'use client';

import type { ConfidenceLevel, SeverityLevel } from './types';
import { Bell, Clock, MapPin } from 'lucide-react';
import { cn } from '../../lib/utils';
import { CONFIDENCE_CONFIG, SEVERITY_CONFIG } from './constants';

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

interface DetailItemProps {
  icon: typeof MapPin;
  label: string;
  value: string;
}

function DetailItem({ icon: Icon, label, value }: DetailItemProps) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={16} color="#6B7280" />
      <span className="text-sm leading-5" style={{ color: '#9CA3AF' }}>
        {label}: {value}
      </span>
    </div>
  );
}

interface ActionButtonProps {
  onClick?: () => void;
  isSecondary?: boolean;
  showIcon?: boolean;
  children: React.ReactNode;
}

function ActionButton({
  onClick,
  isSecondary = false,
  showIcon = false,
  children,
}: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center justify-center rounded-lg text-xs font-medium transition-colors',
        isSecondary ? 'h-[30px] px-3.5 hover:bg-white/5' : 'h-[30px] px-3.5',
        !isSecondary && showIcon && 'gap-1.5 h-7 px-3'
      )}
      style={
        !isSecondary
          ? {
              background: '#7C3AED',
              boxShadow: '0px 0px 10px rgba(124, 58, 237, 0.30)',
              outline: '1px #8B5CF6 solid',
              outlineOffset: '-1px',
              color: 'white',
            }
          : {
              color: '#D1D5DB',
              outline: '1px rgba(255, 255, 255, 0.10) solid',
              outlineOffset: '-1px',
            }
      }
    >
      {children}
    </button>
  );
}

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
  const severityStyle = SEVERITY_CONFIG[severity];
  const confidenceStyle = CONFIDENCE_CONFIG[confidence];

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
          <h3 className="text-base font-semibold leading-6 flex-1 text-white">
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
          <DetailItem
            icon={MapPin}
            label="Affected stores"
            value={affectedStores}
          />
          <DetailItem icon={Clock} label="Last seen" value={lastSeen} />
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
          <ActionButton onClick={onViewDetails}>View details</ActionButton>
          <ActionButton onClick={onViewEvidence} isSecondary>
            View evidence
          </ActionButton>
          <div className="flex-1" />
          <ActionButton onClick={onCreateAlert} isSecondary showIcon>
            <Bell size={14} color="#9CA3AF" />
            Create alert
          </ActionButton>
        </div>
      </div>
    </div>
  );
}
