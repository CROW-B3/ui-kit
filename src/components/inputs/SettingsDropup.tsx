'use client';

import { Bell, BellOff, ChevronUp, LogOut, Settings, User, Key, Code, Webhook } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { ToggleSwitch } from '../inputs/ToggleSwitch';

export interface SettingsDropupProps {
  userName?: string;
  userEmail?: string;
  initialNotifications?: boolean;
  onNotificationsChange?: (enabled: boolean) => void;
  onLogout?: () => void;
  onProfileClick?: () => void;
  isCollapsed?: boolean;
}

export function SettingsDropup({
  userName = 'User',
  userEmail = 'user@example.com',
  initialNotifications = true,
  onNotificationsChange,
  onLogout,
  onProfileClick,
  isCollapsed = false,
}: SettingsDropupProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const ref = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const profileItemRef = useRef<HTMLButtonElement>(null);
  const notificationsItemRef = useRef<HTMLButtonElement>(null);
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

  const focusableItemCount = 1 + 1 + 1 + (onLogout ? 1 : 0); // API Keys + Integration + Webhooks + Logout

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
        profileItemRef.current?.focus();
      } else if (focusedIndex === 1) {
        notificationsItemRef.current?.focus();
      } else if (focusedIndex === 3 && onLogout) {
        logoutItemRef.current?.focus();
      }
    }
  }, [focusedIndex, isOpen]);

  const handleNotificationsToggle = () => {
    const newValue = !notifications;
    setNotifications(newValue);
    onNotificationsChange?.(newValue);
  };

  return (
    <div ref={ref} className={cn('absolute bottom-6 transition-all duration-300', isCollapsed ? 'w-[56px] left-3' : 'w-[260px] left-4')}>
      <div
        role="menu"
        className={cn(
          'absolute bottom-[52px] w-[247px]',
          'bg-[rgba(10,5,20,0.98)] backdrop-blur-[20px] rounded-[8px_8px_0px_0px]',
          'border border-[#2e293a] shadow-[0px_-8px_32px_rgba(0,0,0,0.4)]',
          'overflow-hidden z-50 transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]',
          isCollapsed ? 'left-[-110px]' : 'left-0',
          isOpen
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-2 scale-[0.96] pointer-events-none'
        )}
      >
        <div className="h-[61px] flex items-center gap-3 px-4 border-b border-[#2e293a]">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-violet-600 to-purple-600 flex items-center justify-center border border-violet-400/40 flex-shrink-0">
            <User size={20} className="text-white" strokeWidth={1.5} />
          </div>
          <div className="overflow-hidden">
            <div className="text-white text-[14px] font-medium font-[Sora,sans-serif] truncate">
              {userName}
            </div>
            <div className="text-gray-400 text-[12px] font-[Sora,sans-serif] truncate">
              {userEmail}
            </div>
          </div>
        </div>

        {/* Menu Items */}
        {/* API Keys */}
        <div className="h-[48px] flex items-center px-4 border-b-2 border-[#1f1b29] hover:bg-white/[0.02] transition-colors">
          <button
            ref={profileItemRef}
            type="button"
            role="menuitem"
            tabIndex={focusedIndex === 0 && isOpen ? 0 : -1}
            onClick={() => {
              router.push('/api-keys');
              setIsOpen(false);
            }}
            onKeyDown={handleSettingsKeyDown}
            className="w-full h-full flex items-center gap-3"
          >
            <Key size={22} className="text-violet-400 flex-shrink-0" strokeWidth={1.5} />
            <span className="text-white text-[14px] font-medium font-[Sora,sans-serif]">
              API Keys
            </span>
          </button>
        </div>

        {/* Integration */}
        <div className="h-[48px] flex items-center px-4 border-b-2 border-[#1f1b29] hover:bg-white/[0.02] transition-colors">
          <button
            ref={notificationsItemRef}
            type="button"
            role="menuitem"
            tabIndex={focusedIndex === 1 && isOpen ? 0 : -1}
            onClick={() => {
              router.push('/integration');
              setIsOpen(false);
            }}
            onKeyDown={handleSettingsKeyDown}
            className="w-full h-full flex items-center gap-3"
          >
            <Code size={22} className="text-emerald-400 flex-shrink-0" strokeWidth={1.5} />
            <span className="text-white text-[14px] font-medium font-[Sora,sans-serif]">
              Integration
            </span>
          </button>
        </div>

        {/* Webhooks */}
        <div className="h-[48px] flex items-center px-4 border-b-2 border-[#201c29] hover:bg-white/[0.02] transition-colors">
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              router.push('/webhooks');
              setIsOpen(false);
            }}
            className="w-full h-full flex items-center gap-3"
          >
            <Webhook size={22} className="text-amber-400 flex-shrink-0" strokeWidth={1.5} />
            <span className="text-white text-[14px] font-medium font-[Sora,sans-serif]">
              Webhooks
            </span>
          </button>
        </div>

        {/* Logout */}
        {onLogout && (
          <div className="h-[48px] flex items-center px-4 border-b-2 border-[#201c29] hover:bg-white/[0.02] transition-colors rounded-b-xl">
            <button
              ref={logoutItemRef}
              type="button"
              role="menuitem"
              tabIndex={focusedIndex === 3 && isOpen ? 0 : -1}
              onClick={onLogout}
              onKeyDown={handleSettingsKeyDown}
              className="w-full h-full flex items-center gap-3"
            >
              <LogOut size={22} className="text-[#f52b35] flex-shrink-0" strokeWidth={1.5} />
              <span className="text-[#f52b35] text-[14px] font-medium font-[Sora,sans-serif]">
                Logout
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
            isCollapsed ? 'w-[56px] justify-center pl-0' : 'w-[260px] pl-3',
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
