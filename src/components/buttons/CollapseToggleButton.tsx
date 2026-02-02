'use client';

import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import React from 'react';
import { cn } from '../../lib/utils';

interface CollapseToggleButtonProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export function CollapseToggleButton({ isCollapsed, onToggle }: CollapseToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      aria-expanded={!isCollapsed}
      className="w-6 h-6 flex items-center justify-center rounded-md border border-white/[0.08] transition-all duration-200"
    >
      {isCollapsed ? (
        <PanelLeftOpen size={16} className="text-gray-400" strokeWidth={2} />
      ) : (
        <PanelLeftClose size={16} className="text-gray-400" strokeWidth={2} />
      )}
    </button>
  );
}
