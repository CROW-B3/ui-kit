'use client';

import type { ReactNode } from 'react';
import { GlassPanel } from '../layout/GlassPanel';
import { SuggestionChip } from '../inputs/SuggestionChip';
import { cn } from '../../lib/utils';

export interface CTACardProps {
  badge?: string;
  title: string;
  description: string;
  suggestions?: string[];
  onSuggestionClick?: (suggestion: string) => void;
  actionButton: ReactNode;
  className?: string;
  badgeColor?: string;
  gradient?: boolean;
}

export function CTACard({
  badge,
  title,
  description,
  suggestions = [],
  onSuggestionClick,
  actionButton,
  className = '',
  badgeColor = 'text-violet-400',
  gradient = true,
}: CTACardProps) {
  return (
    <GlassPanel variant="heavy" className={cn('p-4 sm:p-6 relative overflow-hidden', className)}>
      {gradient && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, rgba(139, 92, 246, 0.03), transparent)',
          }}
        />
      )}

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6">
        <div className="flex-1 min-w-0">
          {badge && (
            <div className={cn('text-[10px] sm:text-xs font-bold uppercase tracking-wider mb-1.5 sm:mb-2', badgeColor)}>
              {badge}
            </div>
          )}
          <h3 className="text-base sm:text-lg font-semibold text-white mb-1.5 sm:mb-2">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4">
            {description}
          </p>

          {suggestions.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <SuggestionChip
                suggestions={suggestions}
                onSuggestionClick={onSuggestionClick}
              />
              <span className="text-[10px] text-gray-600 hidden sm:inline ml-2">
                View more options.
              </span>
            </div>
          )}
        </div>

        <div className="flex-shrink-0 w-full sm:w-auto">
          {actionButton}
        </div>
      </div>
    </GlassPanel>
  );
}
