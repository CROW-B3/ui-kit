'use client';

import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, Bell, Check, Menu } from 'lucide-react';
import type { DateRangeOption, HeaderProps } from './types';

export type { DateRangeOption, HeaderProps };

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: DateRangeOption) => {
    setSelectedRange(option.label);
    setIsOpen(false);
    onDateRangeChange?.(option.value);
  };

  return (
    <header className={`w-full h-16 sticky top-0 flex-shrink-0 z-50 flex items-center ${minimal ? 'justify-between' : 'justify-between'} px-4 sm:px-6 lg:px-8 border-b border-white/[0.06] bg-[rgba(3,0,5,0.85)] backdrop-blur-xl`}>
      {/* Mobile Left Section - Hamburger + Logo */}
      <div className="flex items-center gap-3 md:hidden">
        {onMenuClick && (
          <button
            type="button"
            onClick={onMenuClick}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-white/[0.06]"
            aria-label="Toggle menu"
          >
            <Menu size={20} color="#9CA3AF" strokeWidth={2} />
          </button>
        )}
        {logoSrc && (
          <div className="flex items-center gap-2">
            <img src={logoSrc} alt="Logo" className="w-6 h-6" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-white leading-none">CROW</span>
              <span className="text-[8px] font-medium text-gray-500 tracking-[0.15em] uppercase leading-none">CLIENT</span>
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

      <RightSection
        showNotification={showNotification}
        onNotificationClick={onNotificationClick}
        onAvatarClick={onAvatarClick}
        userInitials={userInitials}
      />
    </header>
  );
}

interface LeftSectionProps {
  orgName: string;
  selectedRange: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  dateRangeOptions: DateRangeOption[];
  handleSelect: (option: DateRangeOption) => void;
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

interface DatePickerDropdownProps {
  selectedRange: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  dropdownRef: React.RefObject<HTMLDivElement | null>;
  dateRangeOptions: DateRangeOption[];
  handleSelect: (option: DateRangeOption) => void;
}

function DatePickerDropdown({
  selectedRange,
  isOpen,
  setIsOpen,
  dropdownRef,
  dateRangeOptions,
  handleSelect,
}: DatePickerDropdownProps) {
  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Select date range"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="h-[30px] px-3 flex items-center gap-2 rounded-full transition-all"
        style={{
          background: isOpen
            ? 'rgba(139, 92, 246, 0.15)'
            : 'rgba(255, 255, 255, 0.03)',
          outline: isOpen
            ? '1px rgba(139, 92, 246, 0.40) solid'
            : '1px rgba(255, 255, 255, 0.10) solid',
          outlineOffset: '-1px',
        }}
      >
        <Calendar
          size={12}
          color={isOpen ? '#A78BFA' : '#9CA3AF'}
          strokeWidth={2}
        />
        <span
          className="text-xs font-medium whitespace-nowrap"
          style={{ color: isOpen ? '#E9D5FF' : '#D1D5DB' }}
        >
          {selectedRange}
        </span>
        <ChevronDown
          size={10}
          color={isOpen ? '#A78BFA' : '#6B7280'}
          strokeWidth={2}
          className="transition-transform"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      <DropdownMenu
        isOpen={isOpen}
        dateRangeOptions={dateRangeOptions}
        selectedRange={selectedRange}
        handleSelect={handleSelect}
      />
    </div>
  );
}

interface DropdownMenuProps {
  isOpen: boolean;
  dateRangeOptions: DateRangeOption[];
  selectedRange: string;
  handleSelect: (option: DateRangeOption) => void;
}

function DropdownMenu({
  isOpen,
  dateRangeOptions,
  selectedRange,
  handleSelect,
}: DropdownMenuProps) {
  return (
    <div
      className="absolute top-[38px] left-0 w-[200px] rounded-xl overflow-hidden z-50"
      style={{
        background: 'rgba(10, 5, 20, 0.98)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow:
          '0px 20px 40px rgba(0, 0, 0, 0.5), 0px 0px 1px rgba(139, 92, 246, 0.3)',
        opacity: isOpen ? 1 : 0,
        transform: isOpen
          ? 'translateY(0) scale(1)'
          : 'translateY(-8px) scale(0.96)',
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div className="px-4 pt-3 pb-2 border-b border-white/[0.06]">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
          Select time range
        </span>
      </div>

      <div role="listbox" aria-label="Date range options" className="p-1.5">
        {dateRangeOptions.map((option) => {
          const isSelected = selectedRange === option.label;
          return (
            <DropdownOption
              key={option.value}
              option={option}
              isSelected={isSelected}
              handleSelect={handleSelect}
            />
          );
        })}
      </div>

      <div
        className="px-4 py-2 border-t border-white/[0.06]"
        style={{
          background:
            'linear-gradient(180deg, transparent 0%, rgba(139, 92, 246, 0.03) 100%)',
        }}
      >
        <span className="text-[10px] text-gray-600">
          Data refreshes every 5 min
        </span>
      </div>
    </div>
  );
}

interface DropdownOptionProps {
  option: DateRangeOption;
  isSelected: boolean;
  handleSelect: (option: DateRangeOption) => void;
}

function DropdownOption({
  option,
  isSelected,
  handleSelect,
}: DropdownOptionProps) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={isSelected}
      onClick={() => handleSelect(option)}
      className="w-full px-3 py-2.5 flex items-center justify-between rounded-lg transition-all hover:bg-white/[0.04]"
      style={{
        background: isSelected ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
      }}
    >
      <span
        className="text-[13px]"
        style={{
          color: isSelected ? '#E9D5FF' : '#D1D5DB',
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {option.label}
      </span>
      {isSelected && <Check size={14} color="#A78BFA" strokeWidth={2.5} />}
    </button>
  );
}

interface RightSectionProps {
  showNotification: boolean;
  onNotificationClick?: () => void;
  onAvatarClick?: () => void;
  userInitials: string;
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
        <Bell size={16} color="#6B7280" strokeWidth={2} />
        {showNotification && (
          <div
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
            style={{
              background: '#8B5CF6',
              border: '1.5px solid rgba(3, 0, 5, 0.9)',
            }}
          />
        )}
      </button>

      <button
        type="button"
        onClick={onAvatarClick}
        aria-label="User menu"
        className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:outline-violet-500/40"
        style={{
          background: 'rgba(76, 29, 149, 0.40)',
          outline: '1px rgba(255, 255, 255, 0.10) solid',
          outlineOffset: '-1px',
        }}
      >
        <span className="text-xs font-semibold text-white">
          {userInitials}
        </span>
      </button>
    </div>
  );
}
