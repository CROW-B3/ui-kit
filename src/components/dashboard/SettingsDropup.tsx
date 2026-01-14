'use client';

import { Bell, BellOff, ChevronUp, LogOut, Settings, User } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { ToggleSwitch } from '../inputs/ToggleSwitch';

export interface SettingsDropupProps {
  userName?: string;
  userEmail?: string;
  initialNotifications?: boolean;
  onNotificationsChange?: (enabled: boolean) => void;
  onLogout?: () => void;
  isCollapsed?: boolean;
}

export function SettingsDropup({
  userName = 'User',
  userEmail = 'user@example.com',
  initialNotifications = true,
  onNotificationsChange,
  onLogout,
  isCollapsed = false,
}: SettingsDropupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const notificationsItemRef = useRef<HTMLDivElement>(null);
  const logoutItemRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const focusableItemCount = 1 + (onLogout ? 1 : 0);

  const handleSettingsKeyDown = (e: React.KeyboardEvent) => {
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
        triggerRef.current?.focus();
        break;
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex(prev => (prev < focusableItemCount - 1 ? prev + 1 : 0));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex(prev => (prev > 0 ? prev - 1 : focusableItemCount - 1));
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setFocusedIndex(focusableItemCount - 1);
        break;
      case 'Tab':
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
    }
  };

  useEffect(() => {
    if (isOpen && focusedIndex >= 0) {
      if (focusedIndex === 0) {
        notificationsItemRef.current?.focus();
      } else if (focusedIndex === 1 && onLogout) {
        logoutItemRef.current?.focus();
      }
    }
  }, [focusedIndex, isOpen, onLogout]);

  const handleNotificationsToggle = () => {
    const newValue = !notifications;
    setNotifications(newValue);
    onNotificationsChange?.(newValue);
  };

  return (
    <div ref={ref} className={cn('absolute bottom-6 transition-all duration-300', isCollapsed ? 'w-[56px] left-3' : 'w-[247px] left-4')}>
      <div
        role="menu"
        className={cn(
          'absolute bottom-[52px] w-[247px]',
          'bg-[rgba(10,5,20,0.98)] backdrop-blur-[20px] rounded-xl',
          'border border-white/[0.08] shadow-[0px_-8px_32px_rgba(0,0,0,0.4)]',
          'overflow-hidden z-50 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]',
          isCollapsed ? 'left-[-95px]' : 'left-0',
          isOpen
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-2 scale-[0.96] pointer-events-none'
        )}
      >
        <div className="p-3 px-3 border-b border-white/[0.06] flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-violet-500/20 flex items-center justify-center border border-violet-500/30 shrink-0">
            <User size={18} className="text-violet-400" strokeWidth={1.5} />
          </div>
          <div className="overflow-hidden">
            <div className="text-white text-[13px] font-medium font-[Sora,sans-serif] truncate">
              {userName}
            </div>
            <div className="text-gray-500 text-[11px] font-[Sora,sans-serif] truncate">
              {userEmail}
            </div>
          </div>
        </div>

        <div className="p-1.5">
          <div
            ref={notificationsItemRef}
            role="menuitem"
            tabIndex={focusedIndex === 0 && isOpen ? 0 : -1}
            onClick={handleNotificationsToggle}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNotificationsToggle();
              } else {
                handleSettingsKeyDown(e as React.KeyboardEvent);
              }
            }}
            className={cn(
              'w-full py-2.5 px-2 flex items-center justify-between rounded-lg transition-colors cursor-pointer',
              focusedIndex === 0 && isOpen
                ? 'bg-white/[0.06]'
                : 'hover:bg-white/[0.04]'
            )}
          >
            <div className="flex items-center gap-2.5">
              {notifications ? (
                <Bell size={15} className="text-emerald-500" strokeWidth={2} />
              ) : (
                <BellOff size={15} className="text-gray-500" strokeWidth={2} />
              )}
              <span className="text-gray-300 text-[13px] font-[Sora,sans-serif]">
                Notifications
              </span>
            </div>
            <ToggleSwitch
              enabled={notifications}
              size="sm"
              aria-label="Toggle notifications"
            />
          </div>
        </div>

        {onLogout && (
          <div className="p-1.5 border-t border-white/[0.06]">
            <button
              ref={logoutItemRef}
              type="button"
              role="menuitem"
              tabIndex={focusedIndex === 1 && isOpen ? 0 : -1}
              onClick={onLogout}
              onKeyDown={handleSettingsKeyDown}
              className={cn(
                'w-full py-2.5 px-2 flex items-center gap-2.5 bg-transparent border-none rounded-lg cursor-pointer transition-colors',
                focusedIndex === 1 && isOpen
                  ? 'bg-red-500/10'
                  : 'hover:bg-red-500/10'
              )}
            >
              <LogOut size={15} className="text-red-500" strokeWidth={2} />
              <span className="text-red-500 text-[13px] font-[Sora,sans-serif]">
                Sign out
              </span>
            </button>
          </div>
        )}
      </div>

      <div className={cn('border-t border-white/[0.08] transition-all duration-300', isCollapsed ? 'pt-2' : 'pt-3')}>
        <button
          ref={triggerRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          onKeyDown={handleSettingsKeyDown}
          aria-label="Open settings"
          aria-expanded={isOpen}
          aria-haspopup="menu"
          className={cn(
            'h-[41px] rounded-lg border-none cursor-pointer transition-all duration-300',
            'flex items-center gap-3',
            isCollapsed ? 'w-[56px] justify-center pl-0' : 'w-[247px] pl-3',
            isOpen ? 'bg-white/[0.06]' : 'bg-transparent hover:bg-white/[0.04]'
          )}
        >
          <div className="w-5 h-6 flex items-center justify-center">
            <Settings
              size={15}
              className={cn(isOpen ? 'text-violet-400' : 'text-gray-500')}
              strokeWidth={2}
            />
          </div>
          {!isCollapsed && (
            <>
              <span
                className={cn(
                  'text-sm font-normal leading-[21px] font-[Sora,sans-serif] flex-1 text-left transition-opacity duration-200',
                  isOpen ? 'text-white' : 'text-gray-400'
                )}
              >
                Settings
              </span>
              <div className="w-[18px] h-[22px] flex items-center justify-center mr-3">
                <ChevronUp
                  size={12}
                  className={cn(
                    'transition-transform duration-200',
                    isOpen ? 'text-violet-400 rotate-180' : 'text-gray-600'
                  )}
                  strokeWidth={2}
                />
              </div>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
