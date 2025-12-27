'use client';

import { useState, useRef, useEffect } from 'react';
import { Settings, ChevronUp, Moon, Sun, Bell, BellOff, LogOut, User } from 'lucide-react';
import { ToggleSwitch } from './ToggleSwitch';

export interface SettingsDropupProps {
  userName?: string;
  userEmail?: string;
  initialTheme?: 'dark' | 'light';
  initialNotifications?: boolean;
  onThemeChange?: (theme: 'dark' | 'light') => void;
  onNotificationsChange?: (enabled: boolean) => void;
  onLogout?: () => void;
}

export function SettingsDropup({
  userName = 'User',
  userEmail = 'user@example.com',
  initialTheme = 'dark',
  initialNotifications = true,
  onThemeChange,
  onNotificationsChange,
  onLogout,
}: SettingsDropupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(initialTheme);
  const [notifications, setNotifications] = useState(initialNotifications);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    onThemeChange?.(newTheme);
  };

  const handleNotificationsToggle = () => {
    const newValue = !notifications;
    setNotifications(newValue);
    onNotificationsChange?.(newValue);
  };

  return (
    <div
      ref={ref}
      style={{
        width: 247,
        left: 16,
        bottom: 24,
        position: 'absolute',
      }}
    >
      <div
        style={{
          position: 'absolute',
          bottom: 52,
          left: 0,
          width: 247,
          background: 'rgba(10, 5, 20, 0.98)',
          backdropFilter: 'blur(20px)',
          borderRadius: 12,
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0px -8px 32px rgba(0, 0, 0, 0.4)',
          overflow: 'hidden',
          opacity: isOpen ? 1 : 0,
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.96)',
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          zIndex: 50,
        }}
      >
        <div
          style={{
            padding: '14px 12px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 9999,
              background: 'rgba(139, 92, 246, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(139, 92, 246, 0.3)',
              flexShrink: 0,
            }}
          >
            <User size={18} color="#A78BFA" strokeWidth={1.5} />
          </div>
          <div style={{ overflow: 'hidden' }}>
            <div
              style={{
                color: 'white',
                fontSize: 13,
                fontWeight: 500,
                fontFamily: 'Sora',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {userName}
            </div>
            <div
              style={{
                color: '#6B7280',
                fontSize: 11,
                fontFamily: 'Sora',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {userEmail}
            </div>
          </div>
        </div>

        <div style={{ padding: '6px' }}>
          <button
            type="button"
            onClick={handleThemeToggle}
            style={{
              width: '100%',
              padding: '10px 8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'transparent',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {theme === 'dark' ? (
                <Moon size={15} color="#A78BFA" strokeWidth={2} />
              ) : (
                <Sun size={15} color="#FBBF24" strokeWidth={2} />
              )}
              <span style={{ color: '#D1D5DB', fontSize: 13, fontFamily: 'Sora' }}>
                Theme
              </span>
            </div>
            <div
              style={{
                padding: '3px 8px',
                background: 'rgba(139, 92, 246, 0.15)',
                borderRadius: 5,
                color: '#C4B5FD',
                fontSize: 11,
                fontWeight: 500,
                fontFamily: 'Sora',
              }}
            >
              {theme === 'dark' ? 'Dark' : 'Light'}
            </div>
          </button>

          <button
            type="button"
            onClick={handleNotificationsToggle}
            style={{
              width: '100%',
              padding: '10px 8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'transparent',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {notifications ? (
                <Bell size={15} color="#10B981" strokeWidth={2} />
              ) : (
                <BellOff size={15} color="#6B7280" strokeWidth={2} />
              )}
              <span style={{ color: '#D1D5DB', fontSize: 13, fontFamily: 'Sora' }}>
                Notifications
              </span>
            </div>
            <ToggleSwitch enabled={notifications} size="sm" />
          </button>
        </div>

        {onLogout && (
          <div
            style={{
              padding: '6px',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <button
              type="button"
              onClick={onLogout}
              style={{
                width: '100%',
                padding: '10px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: 'transparent',
                border: 'none',
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              <LogOut size={15} color="#EF4444" strokeWidth={2} />
              <span style={{ color: '#EF4444', fontSize: 13, fontFamily: 'Sora' }}>
                Sign out
              </span>
            </button>
          </div>
        )}
      </div>

      <div style={{ borderTop: '1px rgba(255, 255, 255, 0.08) solid', paddingTop: 12 }}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open settings"
          aria-expanded={isOpen}
          style={{
            width: 247,
            height: 41,
            borderRadius: 8,
            background: isOpen ? 'rgba(255, 255, 255, 0.06)' : 'transparent',
            border: 'none',
            cursor: 'pointer',
            transition: 'background 0.15s ease',
            display: 'flex',
            alignItems: 'center',
            paddingLeft: 12,
            gap: 12,
          }}
          onMouseEnter={(e) => {
            if (!isOpen) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
          }}
          onMouseLeave={(e) => {
            if (!isOpen) e.currentTarget.style.background = 'transparent';
          }}
        >
          <div style={{ width: 20, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Settings size={15} color={isOpen ? '#A78BFA' : '#6B7280'} strokeWidth={2} />
          </div>
          <span
            style={{
              color: isOpen ? 'white' : '#9CA3AF',
              fontSize: 14,
              fontFamily: 'Sora',
              fontWeight: 400,
              lineHeight: '21px',
              flex: 1,
              textAlign: 'left',
            }}
          >
            Settings
          </span>
          <div style={{ width: 18, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
            <ChevronUp
              size={12}
              color={isOpen ? '#A78BFA' : '#4B5563'}
              strokeWidth={2}
              style={{
                transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.2s ease',
              }}
            />
          </div>
        </button>
      </div>
    </div>
  );
}
