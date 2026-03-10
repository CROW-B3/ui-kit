'use client';

import type { ReactNode } from 'react';
import { SidePanel } from './SidePanel';

export interface DetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  width?: 'sm' | 'md' | 'lg';
}

export function DetailPanel({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  width = 'lg',
}: DetailPanelProps) {
  return (
    <SidePanel
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      subtitle={subtitle}
      width={width}
    >
      <div className="p-6 space-y-6">
        {children}
      </div>
    </SidePanel>
  );
}

export interface DetailSectionProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  className?: string;
}

export function DetailSection({
  title,
  icon,
  children,
  className = '',
}: DetailSectionProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-3">
        <span style={{ color: '#6B7280' }}>{icon}</span>
        <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#6B7280' }}>
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}
