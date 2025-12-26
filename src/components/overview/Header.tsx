'use client';

import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, Bell, Check } from 'lucide-react';
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
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(dateRange);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
    <header
      style={{
        width: '100%',
        height: 64,
        position: 'sticky',
        top: 0,
        flexShrink: 0,
        zIndex: 50,
        background: 'rgba(3, 0, 5, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      {/* Org name */}
      <div
        style={{
          left: 32,
          top: 22,
          position: 'absolute',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          color: 'white',
          fontSize: 14,
          fontFamily: 'Sora',
          fontWeight: 500,
          lineHeight: '20px',
          letterSpacing: 0.35,
        }}
      >
        {orgName}
      </div>

      {/* Divider */}
      <div
        style={{
          width: 1,
          height: 16,
          left: 176,
          top: 24,
          position: 'absolute',
          background: 'rgba(255, 255, 255, 0.10)',
        }}
      />

      {/* Date picker with dropdown */}
      <div
        ref={dropdownRef}
        style={{
          position: 'absolute',
          left: 201,
          top: 17,
        }}
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Select date range"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          style={{
            width: 138.81,
            height: 30,
            position: 'relative',
            background: isOpen ? 'rgba(139, 92, 246, 0.15)' : 'rgba(255, 255, 255, 0.03)',
            borderRadius: 9999,
            outline: isOpen ? '1px rgba(139, 92, 246, 0.40) solid' : '1px rgba(255, 255, 255, 0.10) solid',
            outlineOffset: '-1px',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
        >
          {/* Calendar icon */}
          <div
            style={{
              width: 16,
              height: 20,
              left: 13,
              top: 5,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Calendar size={12} color={isOpen ? '#A78BFA' : '#9CA3AF'} strokeWidth={2} />
          </div>

          {/* Date text */}
          <div
            style={{
              left: 37,
              top: 7,
              position: 'absolute',
              textAlign: 'center',
              justifyContent: 'center',
              display: 'flex',
              flexDirection: 'column',
              color: isOpen ? '#E9D5FF' : '#D1D5DB',
              fontSize: 12,
              fontFamily: 'Sora',
              fontWeight: 500,
              lineHeight: '16px',
              transition: 'color 0.15s ease',
            }}
          >
            {selectedRange}
          </div>

          {/* Expand icon */}
          <div
            style={{
              width: 16,
              height: 20,
              left: 109.81,
              top: 5,
              position: 'absolute',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.2s ease',
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          >
            <ChevronDown size={10} color={isOpen ? '#A78BFA' : '#6B7280'} strokeWidth={2} />
          </div>
        </button>

        {/* Dropdown menu */}
        <div
          style={{
            position: 'absolute',
            top: 38,
            left: 0,
            width: 200,
            background: 'rgba(10, 5, 20, 0.98)',
            backdropFilter: 'blur(20px)',
            borderRadius: 12,
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0px 20px 40px rgba(0, 0, 0, 0.5), 0px 0px 1px rgba(139, 92, 246, 0.3)',
            overflow: 'hidden',
            opacity: isOpen ? 1 : 0,
            transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(-8px) scale(0.96)',
            pointerEvents: isOpen ? 'auto' : 'none',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 100,
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: '12px 16px 8px',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <span
              style={{
                color: '#6B7280',
                fontSize: 10,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}
            >
              Select time range
            </span>
          </div>

          {/* Options */}
          <div style={{ padding: '6px' }}>
            {dateRangeOptions.map((option) => {
              const isSelected = selectedRange === option.label;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleSelect(option)}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: isSelected ? 'rgba(139, 92, 246, 0.15)' : 'transparent',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    transition: 'all 0.12s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.background = 'transparent';
                    }
                  }}
                >
                  <span
                    style={{
                      color: isSelected ? '#E9D5FF' : '#D1D5DB',
                      fontSize: 13,
                      fontWeight: isSelected ? 500 : 400,
                      fontFamily: 'Sora',
                    }}
                  >
                    {option.label}
                  </span>
                  {isSelected && (
                    <Check size={14} color="#A78BFA" strokeWidth={2.5} />
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer with subtle gradient */}
          <div
            style={{
              padding: '8px 16px 12px',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              background: 'linear-gradient(180deg, transparent 0%, rgba(139, 92, 246, 0.03) 100%)',
            }}
          >
            <span
              style={{
                color: '#4B5563',
                fontSize: 10,
                fontFamily: 'Sora',
              }}
            >
              Data refreshes every 5 min
            </span>
          </div>
        </div>
      </div>

      {/* Right side icons container */}
      <div
        style={{
          position: 'absolute',
          right: 32,
          top: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        {/* Bell */}
        <button
          type="button"
          onClick={onNotificationClick}
          aria-label={showNotification ? 'View notifications (new)' : 'View notifications'}
          style={{
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            borderRadius: 8,
            position: 'relative',
            transition: 'background 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
          }}
        >
          <Bell size={16} color="#6B7280" strokeWidth={2} />
          {showNotification && (
            <div
              style={{
                width: 6,
                height: 6,
                position: 'absolute',
                top: 6,
                right: 6,
                background: '#8B5CF6',
                borderRadius: 9999,
                border: '1.5px solid rgba(3, 0, 5, 0.9)',
              }}
            />
          )}
        </button>

        {/* Avatar */}
        <button
          type="button"
          onClick={onAvatarClick}
          aria-label="User menu"
          style={{
            width: 32,
            height: 32,
            background: 'rgba(76, 29, 149, 0.40)',
            overflow: 'hidden',
            borderRadius: 9999,
            outline: '1px rgba(255, 255, 255, 0.10) solid',
            outlineOffset: '-1px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: 'none',
            cursor: 'pointer',
            transition: 'all 0.15s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.outline = '1px rgba(139, 92, 246, 0.40) solid';
            e.currentTarget.style.background = 'rgba(76, 29, 149, 0.60)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.outline = '1px rgba(255, 255, 255, 0.10) solid';
            e.currentTarget.style.background = 'rgba(76, 29, 149, 0.40)';
          }}
        >
          <span
            style={{
              color: 'white',
              fontSize: 12,
              fontFamily: 'Sora',
              fontWeight: 600,
              lineHeight: '16px',
            }}
          >
            {userInitials}
          </span>
        </button>
      </div>
    </header>
  );
}
