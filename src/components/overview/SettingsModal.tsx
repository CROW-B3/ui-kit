'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Moon, Sun, Bell, BellOff, Globe, User, LogOut } from 'lucide-react';
import type { SettingsModalProps } from './types';

export type { SettingsModalProps };

export function SettingsModal({
  isOpen,
  onClose,
  userEmail = 'user@example.com',
  userName = 'User',
  onLogout,
  onThemeChange,
  onNotificationsChange,
  initialTheme = 'dark',
  initialNotifications = true,
}: SettingsModalProps) {
  const [theme, setTheme] = useState(initialTheme);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  useEffect(() => {
    setTheme(initialTheme);
  }, [initialTheme]);

  useEffect(() => {
    setNotifications(initialNotifications);
  }, [initialNotifications]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    closeTimeoutRef.current = setTimeout(() => {
      onClose();
    }, 200);
  };

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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        role="presentation"
        aria-hidden="true"
        onClick={handleClose}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 100,
          opacity: isClosing ? 0 : 1,
          transition: 'opacity 0.2s ease',
        }}
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-modal-title"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: isClosing
            ? 'translate(-50%, -50%) scale(0.95)'
            : 'translate(-50%, -50%) scale(1)',
          width: 400,
          maxWidth: '90vw',
          background: 'rgba(10, 5, 20, 0.98)',
          backdropFilter: 'blur(20px)',
          borderRadius: 16,
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0px 24px 48px rgba(0, 0, 0, 0.5), 0px 0px 1px rgba(139, 92, 246, 0.3)',
          zIndex: 101,
          opacity: isClosing ? 0 : 1,
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <h2
            id="settings-modal-title"
            style={{
              color: 'white',
              fontSize: 18,
              fontWeight: 600,
              fontFamily: 'Sora, sans-serif',
              margin: 0,
            }}
          >
            Settings
          </h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close settings"
            style={{
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <X size={18} color="#6B7280" strokeWidth={2} />
          </button>
        </div>

        {/* User section */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 9999,
                background: 'rgba(139, 92, 246, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(139, 92, 246, 0.3)',
              }}
            >
              <User size={24} color="#A78BFA" strokeWidth={1.5} />
            </div>
            <div>
              <div
                style={{
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 500,
                  fontFamily: 'Sora, sans-serif',
                }}
              >
                {userName}
              </div>
              <div
                style={{
                  color: '#6B7280',
                  fontSize: 12,
                  fontFamily: 'Sora, sans-serif',
                  marginTop: 2,
                }}
              >
                {userEmail}
              </div>
            </div>
          </div>
        </div>

        {/* Settings options */}
        <div style={{ padding: '12px 16px' }}>
          {/* Theme toggle */}
          <button
            type="button"
            onClick={handleThemeToggle}
            style={{
              width: '100%',
              padding: '14px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'transparent',
              border: 'none',
              borderRadius: 10,
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {theme === 'dark' ? (
                <Moon size={18} color="#A78BFA" strokeWidth={2} />
              ) : (
                <Sun size={18} color="#FBBF24" strokeWidth={2} />
              )}
              <span
                style={{
                  color: '#D1D5DB',
                  fontSize: 14,
                  fontFamily: 'Sora, sans-serif',
                }}
              >
                Theme
              </span>
            </div>
            <div
              style={{
                padding: '4px 10px',
                background: 'rgba(139, 92, 246, 0.15)',
                borderRadius: 6,
                color: '#C4B5FD',
                fontSize: 12,
                fontWeight: 500,
                fontFamily: 'Sora, sans-serif',
              }}
            >
              {theme === 'dark' ? 'Dark' : 'Light'}
            </div>
          </button>

          {/* Notifications toggle */}
          <button
            type="button"
            onClick={handleNotificationsToggle}
            style={{
              width: '100%',
              padding: '14px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'transparent',
              border: 'none',
              borderRadius: 10,
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {notifications ? (
                <Bell size={18} color="#10B981" strokeWidth={2} />
              ) : (
                <BellOff size={18} color="#6B7280" strokeWidth={2} />
              )}
              <span
                style={{
                  color: '#D1D5DB',
                  fontSize: 14,
                  fontFamily: 'Sora, sans-serif',
                }}
              >
                Notifications
              </span>
            </div>
            {/* Toggle switch */}
            <div
              style={{
                width: 44,
                height: 24,
                borderRadius: 12,
                background: notifications ? 'rgba(16, 185, 129, 0.3)' : 'rgba(107, 114, 128, 0.3)',
                padding: 2,
                transition: 'background 0.2s ease',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 10,
                  background: notifications ? '#10B981' : '#4B5563',
                  transition: 'all 0.2s ease',
                  transform: notifications ? 'translateX(20px)' : 'translateX(0)',
                }}
              />
            </div>
          </button>

          {/* Language */}
          <button
            type="button"
            disabled
            aria-disabled="true"
            style={{
              width: '100%',
              padding: '14px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'transparent',
              border: 'none',
              borderRadius: 10,
              cursor: 'not-allowed',
              opacity: 0.6,
              transition: 'background 0.15s ease',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Globe size={18} color="#6B7280" strokeWidth={2} />
              <span
                style={{
                  color: '#D1D5DB',
                  fontSize: 14,
                  fontFamily: 'Sora, sans-serif',
                }}
              >
                Language
              </span>
            </div>
            <div
              style={{
                color: '#6B7280',
                fontSize: 13,
                fontFamily: 'Sora, sans-serif',
              }}
            >
              English
            </div>
          </button>
        </div>

        {/* Logout button */}
        {onLogout && (
          <div
            style={{
              padding: '12px 16px 20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            }}
          >
            <button
              type="button"
              onClick={onLogout}
              style={{
                width: '100%',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: 10,
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.15)';
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.2)';
              }}
            >
              <LogOut size={16} color="#EF4444" strokeWidth={2} />
              <span
                style={{
                  color: '#EF4444',
                  fontSize: 14,
                  fontWeight: 500,
                  fontFamily: 'Sora, sans-serif',
                }}
              >
                Sign out
              </span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
