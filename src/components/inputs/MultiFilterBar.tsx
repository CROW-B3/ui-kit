'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { cn } from '../../lib/utils';
import { FilterDropdown } from './FilterDropdown';
import { Tag } from '../display/Tag';
import type { FilterOption } from './FilterDropdown';

export interface FilterConfig {
  label: string;
  options: FilterOption[];
  onChange?: (value: string) => void;
  showBorder?: boolean;
}

export interface MultiFilterBarProps {
  filters: FilterConfig[];
  activeTags?: string[];
  onTagRemove?: (tag: string) => void;
  onAddTag?: () => void;
  onSearch?: (query: string) => void;
  onSaveView?: () => void;
  onExport?: () => void;
  className?: string;
  searchPlaceholder?: string;
  showSearch?: boolean;
  showActions?: boolean;
}

export function MultiFilterBar({
  filters,
  activeTags = [],
  onTagRemove,
  onAddTag,
  onSearch,
  onSaveView,
  onExport,
  className = '',
  searchPlaceholder = 'Search...',
  showSearch = true,
  showActions = true,
}: MultiFilterBarProps) {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchValue);
  };

  return (
    <div
      className={cn(
        'relative z-20 w-full flex flex-col md:flex-row md:items-center gap-2 px-3 md:px-[9px] py-3 md:py-0 md:h-[52px] rounded-xl',
        className
      )}
      style={{
        background: 'rgba(255, 255, 255, 0.02)',
        outline: '1px rgba(255, 255, 255, 0.06) solid',
        outlineOffset: '-1px',
        backdropFilter: 'blur(6px)',
      }}
    >
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-2 md:items-center w-full md:w-auto">
        {filters.map((filter, idx) => (
          <FilterDropdown
            key={filter.label}
            label={filter.label}
            options={filter.options}
            onChange={filter.onChange}
            showBorder={filter.showBorder || idx === 0}
          />
        ))}
      </div>

      {/* Tags Section */}
      {activeTags.length > 0 && (
        <div
          className="flex items-center gap-1.5 px-[9px] py-2 md:py-0 md:h-[29px] rounded-lg w-full md:w-auto"
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            outline: '1px rgba(255, 255, 255, 0.10) solid',
            outlineOffset: '-1px',
          }}
        >
          {activeTags.map((tag) => (
            <div key={tag} className="flex items-center gap-1">
              <Tag variant="active">{tag}</Tag>
              {onTagRemove && (
                <button
                  type="button"
                  onClick={() => onTagRemove(tag)}
                  className="text-gray-600 hover:text-gray-400 transition-colors"
                >
                  ×
                </button>
              )}
            </div>
          ))}
          {onAddTag && (
            <button
              type="button"
              onClick={onAddTag}
              className="flex items-center text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              <Plus size={12} className="mr-0.5" />
              Tag
            </button>
          )}
        </div>
      )}

      <div className="hidden md:flex flex-1" />

      {/* Search and Actions */}
      {(showSearch || showActions) && (
        <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto md:items-center">
          {showSearch && (
            <form onSubmit={handleSearchSubmit} className="relative flex-1 md:flex-initial">
              <div
                className="w-full md:w-[256px] h-[34px] flex items-center rounded-lg overflow-hidden"
                style={{
                  background: 'rgba(0, 0, 0, 0.20)',
                  outline: '1px rgba(255, 255, 255, 0.10) solid',
                  outlineOffset: '-1px',
                }}
              >
                <div className="pl-3 flex items-center justify-center">
                  <Search size={12} color="#6B7280" />
                </div>
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="flex-1 h-full px-2.5 bg-transparent text-sm text-gray-200 placeholder:text-gray-500 focus:outline-none"
                />
              </div>
            </form>
          )}

          {showActions && (onSaveView || onExport) && (
            <div className="flex items-center gap-2 md:pl-2 md:border-l md:border-white/5 w-full md:w-auto">
              {onSaveView && (
                <ActionButton onClick={onSaveView}>Save View</ActionButton>
              )}
              {onExport && (
                <ActionButton onClick={onExport}>Export</ActionButton>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface ActionButtonProps {
  onClick: () => void;
  children: ReactNode;
}

function ActionButton({ onClick, children }: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 md:flex-initial h-[30px] px-3 flex items-center justify-center md:justify-start rounded-lg transition-colors hover:bg-white/5"
      style={{
        outline: '1px rgba(255, 255, 255, 0.10) solid',
        outlineOffset: '-1px',
      }}
    >
      <span className="text-xs md:text-xs text-gray-400 font-medium">{children}</span>
    </button>
  );
}
