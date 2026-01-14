'use client';

import type { DateRangeOption, HeaderProps } from './types';
import { Bell, Calendar, Check, ChevronDown, Menu } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';

export type { DateRangeOption, HeaderProps };
interface LeftSectionProps {
  orgName: string;
  selectedRange: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  dateRangeOptions: DateRangeOption[];
  handleSelect: (option: DateRangeOption) => void;
}

interface DatePickerDropdownProps {
  selectedRange: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  dateRangeOptions: DateRangeOption[];
  handleSelect: (option: DateRangeOption) => void;
}

interface DropdownMenuProps {
  isOpen: boolean;
  dateRangeOptions: DateRangeOption[];
  selectedRange: string;
  handleSelect: (option: DateRangeOption) => void;
  focusedIndex: number;
  optionRefs: React.RefObject<(HTMLButtonElement | null)[]>;
}

interface DropdownOptionProps {
  option: DateRangeOption;
  isSelected: boolean;
  isFocused: boolean;
  handleSelect: (option: DateRangeOption) => void;
  index: number;
}

interface RightSectionProps {
  showNotification: boolean;
  onNotificationClick?: () => void;
  onAvatarClick?: () => void;
  userInitials: string;
}

const DropdownOption = React.forwardRef<HTMLButtonElement, DropdownOptionProps>(
  ({ option, isSelected, isFocused, handleSelect, index }, ref) => (
    <button
      ref={ref}
      type="button"
      role="option"
      id={`option-${index}`}
      aria-selected={isSelected}
      onClick={() => handleSelect(option)}
      className={cn(
        'w-full px-3 py-2.5 flex items-center justify-between rounded-lg transition-all',
        isSelected && 'bg-violet-500/15',
        isFocused && !isSelected && 'bg-white/[0.04]',
        !isSelected && !isFocused && 'hover:bg-white/[0.04]'
      )}
    >
      <span
        className={cn(
          'text-[13px]',
          isSelected ? 'text-violet-200 font-medium' : 'text-gray-300 font-normal'
        )}
      >
        {option.label}
      </span>
      {isSelected && (
        <Check size={14} className="text-violet-400" strokeWidth={2.5} />
      )}
    </button>
  )
);

DropdownOption.displayName = 'DropdownOption';

const defaultDateRangeOptions: DateRangeOption[] = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Last 7 days', value: 'last_7_days' },
  { label: 'Last 14 days', value: 'last_14_days' },
  { label: 'Last 30 days', value: 'last_30_days' },
  { label: 'This month', value: 'this_month' },
  { label: 'Last month', value: 'last_month' },
  { label: 'This quarter', value: 'this_quarter' },
];

const useClickOutsideDropdown = (
  dropdownRef: React.RefObject<HTMLDivElement | null>,
  isOpen: boolean,
  onClose: () => void
) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose, dropdownRef]);
};

export function Header({
  orgName = 'Global Retail Ops',
  dateRange = 'Last 7 days',
  onDateRangeChange,
  dateRangeOptions = defaultDateRangeOptions,
  userInitials = 'SJ',
  showNotification = true,
  onNotificationClick,
  onAvatarClick,
  minimal = false,
  onMenuClick,
  logoSrc,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(dateRange);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks-extra/no-direct-set-state-in-use-effect
  useEffect(() => {
    setSelectedRange(dateRange);
  }, [dateRange]);

  useClickOutsideDropdown(dropdownRef, isOpen, () => setIsOpen(false));

  const handleSelect = (option: DateRangeOption) => {
    setSelectedRange(option.label);
    setIsOpen(false);
    onDateRangeChange?.(option.value);
  };

  return (
    <header className="w-full h-16 sticky top-0 flex-shrink-0 z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 border-b border-white/[0.06] bg-[rgba(3,0,5,0.85)] backdrop-blur-xl">
      <div className="flex items-center gap-3 md:hidden">
        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-white/[0.06]"
            aria-label="Toggle menu"
          >
            <Menu size={20} className="text-gray-400" strokeWidth={2} />
          </button>
        )}
        {logoSrc && (
          <div className="flex items-center gap-2">
            <img src={logoSrc} alt="CROW Client logo" className="w-6 h-6" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white leading-none">
                CROW
              </span>
              <span className="text-[8px] font-medium text-gray-500 tracking-[0.15em] uppercase leading-none">
                CLIENT
              </span>
            </div>
          </div>
        )}
      </div>

      {!minimal && (
        <LeftSection
          orgName={orgName}
          selectedRange={selectedRange}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          dropdownRef={dropdownRef}
          dateRangeOptions={dateRangeOptions}
          handleSelect={handleSelect}
        />
      )}

      {minimal && <div className="hidden md:block flex-1" />}

      <RightSection
        showNotification={showNotification}
        onNotificationClick={onNotificationClick}
        onAvatarClick={onAvatarClick}
        userInitials={userInitials}
      />
    </header>
  );
}

function LeftSection({
  orgName,
  selectedRange,
  isOpen,
  setIsOpen,
  dropdownRef,
  dateRangeOptions,
  handleSelect,
}: LeftSectionProps) {
  return (
    <div className="hidden md:flex items-center gap-3 sm:gap-6 min-w-0">
      <span className="text-sm font-medium text-white tracking-wide hidden sm:block truncate max-w-[140px] lg:max-w-none">
        {orgName}
      </span>

      <div className="hidden sm:block w-px h-4 bg-white/10" />

      <DatePickerDropdown
        selectedRange={selectedRange}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        dropdownRef={dropdownRef}
        dateRangeOptions={dateRangeOptions}
        handleSelect={handleSelect}
      />
    </div>
  );
}

const handleDropdownKeyDown = (
  e: React.KeyboardEvent,
  isOpen: boolean,
  focusedIndex: number,
  dateRangeOptions: DateRangeOption[],
  setIsOpen: (open: boolean) => void,
  setFocusedIndex: (index: number) => void,
  handleSelect: (option: DateRangeOption) => void
) => {
  if (!isOpen) {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault();
      setIsOpen(true);
      setFocusedIndex(0);
    }
    return;
  }

  switch (e.key) {
    case 'Escape':
      e.preventDefault();
      setIsOpen(false);
      setFocusedIndex(-1);
      break;
    case 'ArrowDown':
      e.preventDefault();
      setFocusedIndex(
        focusedIndex < dateRangeOptions.length - 1 ? focusedIndex + 1 : 0
      );
      break;
    case 'ArrowUp':
      e.preventDefault();
      setFocusedIndex(
        focusedIndex > 0 ? focusedIndex - 1 : dateRangeOptions.length - 1
      );
      break;
    case 'Home':
      e.preventDefault();
      setFocusedIndex(0);
      break;
    case 'End':
      e.preventDefault();
      setFocusedIndex(dateRangeOptions.length - 1);
      break;
    case 'Enter':
    case ' ':
      e.preventDefault();
      if (focusedIndex >= 0 && focusedIndex < dateRangeOptions.length) {
        handleSelect(dateRangeOptions[focusedIndex]);
        setFocusedIndex(-1);
      }
      break;
    case 'Tab':
      setIsOpen(false);
      setFocusedIndex(-1);
      break;
  }
};

function DatePickerDropdown({
  selectedRange,
  isOpen,
  setIsOpen,
  dropdownRef,
  dateRangeOptions,
  handleSelect,
}: DatePickerDropdownProps) {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (focusedIndex >= 0 && focusedIndex < optionRefs.current.length) {
      optionRefs.current[focusedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [focusedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    handleDropdownKeyDown(
      e,
      isOpen,
      focusedIndex,
      dateRangeOptions,
      setIsOpen,
      setFocusedIndex,
      handleSelect
    );
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-label="Select date range"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={cn(
          'h-[30px] px-3 flex items-center gap-2 rounded-full transition-all',
          isOpen
            ? 'bg-violet-500/15 outline outline-1 outline-violet-500/40 -outline-offset-1'
            : 'bg-white/[0.03] outline outline-1 outline-white/10 -outline-offset-1'
        )}
      >
        <Calendar
          size={12}
          className={cn(isOpen ? 'text-violet-400' : 'text-gray-400')}
          strokeWidth={2}
        />
        <span
          className={cn(
            'text-xs font-medium whitespace-nowrap',
            isOpen ? 'text-violet-200' : 'text-gray-300'
          )}
        >
          {selectedRange}
        </span>
        <ChevronDown
          size={10}
          className={cn(
            'transition-transform duration-200',
            isOpen ? 'text-violet-400 rotate-180' : 'text-gray-500'
          )}
          strokeWidth={2}
        />
      </button>

      <DropdownMenu
        isOpen={isOpen}
        dateRangeOptions={dateRangeOptions}
        selectedRange={selectedRange}
        handleSelect={handleSelect}
        focusedIndex={focusedIndex}
        optionRefs={optionRefs}
      />
    </div>
  );
}

function DropdownMenu({
  isOpen,
  dateRangeOptions,
  selectedRange,
  handleSelect,
  focusedIndex,
  optionRefs,
}: DropdownMenuProps) {
  return (
    <div
      role="listbox"
      aria-label="Date range options"
      aria-activedescendant={
        focusedIndex >= 0 ? `option-${focusedIndex}` : undefined
      }
      className={cn(
        'absolute top-[38px] left-0 w-[200px] rounded-xl overflow-hidden z-50',
        'bg-[rgba(10,5,20,0.98)] backdrop-blur-[20px]',
        'border border-white/[0.08]',
        'shadow-[0px_20px_40px_rgba(0,0,0,0.5),0px_0px_1px_rgba(139,92,246,0.3)]',
        'transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]',
        isOpen
          ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
          : 'opacity-0 -translate-y-2 scale-[0.96] pointer-events-none'
      )}
    >
      <div className="px-4 pt-3 pb-2 border-b border-white/[0.06]">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
          Select time range
        </span>
      </div>

      <div className="p-1.5">
        {dateRangeOptions.map((option, index) => {
          const isSelected = selectedRange === option.label;
          const isFocused = focusedIndex === index;
          return (
            <DropdownOption
              key={option.value}
              option={option}
              isSelected={isSelected}
              isFocused={isFocused}
              handleSelect={handleSelect}
              index={index}
              ref={el => {
                if (optionRefs.current) {
                  optionRefs.current[index] = el;
                }
              }}
            />
          );
        })}
      </div>

      <div className="px-4 py-2 border-t border-white/[0.06] bg-gradient-to-b from-transparent to-violet-500/[0.03]">
        <span className="text-[10px] text-gray-600">
          Data refreshes every 5 min
        </span>
      </div>
    </div>
  );
}

function RightSection({
  showNotification,
  onNotificationClick,
  onAvatarClick,
  userInitials,
}: RightSectionProps) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onNotificationClick}
        aria-label={
          showNotification ? 'View notifications (new)' : 'View notifications'
        }
        className="w-8 h-8 flex items-center justify-center rounded-lg relative transition-colors hover:bg-white/[0.06]"
      >
        <Bell size={16} className="text-gray-500" strokeWidth={2} />
        {showNotification && (
          <div className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-violet-500 border-[1.5px] border-[rgba(3,0,5,0.9)]" />
        )}
      </button>

      <button
        type="button"
        onClick={onAvatarClick}
        aria-label="User menu"
        className="w-8 h-8 rounded-full flex items-center justify-center bg-violet-900/40 outline outline-1 outline-white/10 -outline-offset-1 transition-all hover:outline-violet-500/40"
      >
        <span className="text-xs font-semibold text-white">{userInitials}</span>
      </button>
    </div>
  );
}
