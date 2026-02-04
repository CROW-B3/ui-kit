'use client';

import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { FilterDropdown } from './FilterDropdown';
import type { FilterOption } from './FilterDropdown';

export interface ToggleFilterOption {
  label: string;
  value: string;
}

export interface ToggleFilterBarConfig {
  label: string;
  options: FilterOption[];
  onChange?: (value: string) => void;
  hidden?: 'sm' | 'md' | 'lg' | 'xl';
}

export interface ToggleFilterBarProps {
  toggleOptions: ToggleFilterOption[];
  activeToggle: string;
  onToggleChange: (value: string) => void;
  dropdownConfigs?: ToggleFilterBarConfig[];
  onExport?: () => void;
  className?: string;
  showToggleBorder?: boolean;
}

export function ToggleFilterBar({
  toggleOptions,
  activeToggle,
  onToggleChange,
  dropdownConfigs = [],
  onExport,
  className = '',
  showToggleBorder = true,
}: ToggleFilterBarProps) {
  const hiddenMap = {
    sm: 'hidden sm:block',
    md: 'hidden md:block',
    lg: 'hidden lg:block',
    xl: 'hidden xl:block',
  };

  return (
    <div
      className={cn(
        'relative z-50 w-full min-h-[52px] flex items-center gap-2 px-[9px] py-2 rounded-xl',
        className
      )}
      style={{
        background: 'rgba(255, 255, 255, 0.02)',
        outline: '1px rgba(255, 255, 255, 0.06) solid',
        outlineOffset: '-1px',
        backdropFilter: 'blur(6px)',
      }}
    >
      {/* First dropdown (always visible) */}
      {dropdownConfigs.length > 0 && (
        <div className="pr-3 border-r border-white/5 shrink-0">
          <FilterDropdown
            label={dropdownConfigs[0].label}
            options={dropdownConfigs[0].options}
            onChange={dropdownConfigs[0].onChange}
          />
        </div>
      )}

      {/* Toggle buttons */}
      <div
        className="h-[34px] flex items-center gap-0 px-[3px] rounded-lg shrink-0"
        style={{
          background: 'rgba(255, 255, 255, 0.03)',
          outline: '1px rgba(255, 255, 255, 0.10) solid',
          outlineOffset: '-1px',
        }}
      >
        {toggleOptions.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onToggleChange(option.value)}
            className={cn(
              'h-[28px] px-3 flex items-center justify-center rounded-md text-xs font-medium transition-colors',
              activeToggle === option.value
                ? 'text-white'
                : 'text-gray-400 hover:text-gray-300'
            )}
            style={
              activeToggle === option.value
                ? {
                    background: 'rgba(255, 255, 255, 0.08)',
                    boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
                  }
                : undefined
            }
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Additional dropdowns */}
      {dropdownConfigs.slice(1).map((config) => (
        <div
          key={config.label}
          className={cn(
            'shrink-0',
            config.hidden && hiddenMap[config.hidden as keyof typeof hiddenMap]
          )}
        >
          <FilterDropdown
            label={config.label}
            options={config.options}
            onChange={config.onChange}
          />
        </div>
      ))}

      <div className="flex-1 min-w-2" />

      {/* Actions */}
      {onExport && (
        <div className="flex items-center gap-2 pl-2 border-l border-white/5 shrink-0">
          <button
            type="button"
            onClick={onExport}
            className="h-[30px] px-3.5 flex items-center justify-center rounded-lg text-xs font-medium transition-colors hover:bg-white/5"
            style={{
              color: '#D1D5DB',
              outline: '1px rgba(255, 255, 255, 0.10) solid',
              outlineOffset: '-1px',
            }}
          >
            Export
          </button>
        </div>
      )}
    </div>
  );
}
