'use client';

import type { SettingsModalProps } from './types';
import { Bell, BellOff, Globe, LogOut, User, X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/utils';
import { ToggleSwitch } from './ToggleSwitch';

export type { SettingsModalProps };

export function SettingsModal({
  isOpen,
  onClose,
  userEmail = 'user@example.com',
  userName = 'User',
  onLogout,
  onNotificationsChange,
  initialNotifications = true,
}: SettingsModalProps) {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
      modalRef.current?.focus();
    }
  }, [isOpen]);

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

  const handleClose = useCallback(() => {
    setIsClosing(true);
    closeTimeoutRef.current = setTimeout(() => {
      onClose();
    }, 200);
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  const handleNotificationsToggle = () => {
    const newValue = !notifications;
    setNotifications(newValue);
    onNotificationsChange?.(newValue);
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        role="presentation"
        aria-hidden="true"
        onClick={handleClose}
        className={cn(
          'fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] transition-opacity duration-200',
          isClosing ? 'opacity-0' : 'opacity-100'
        )}
      />

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-modal-title"
        tabIndex={-1}
        className={cn(
          'fixed top-1/2 left-1/2 w-[400px] max-w-[90vw] z-[101]',
          'bg-[rgba(10,5,20,0.98)] backdrop-blur-[20px] rounded-2xl',
          'border border-white/[0.08]',
          'shadow-[0px_24px_48px_rgba(0,0,0,0.5),0px_0px_1px_rgba(139,92,246,0.3)]',
          'transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]',
          isClosing
            ? 'opacity-0 -translate-x-1/2 -translate-y-1/2 scale-95'
            : 'opacity-100 -translate-x-1/2 -translate-y-1/2 scale-100'
        )}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.06]">
          <h2
            id="settings-modal-title"
            className="text-white text-lg font-semibold font-[Sora,sans-serif] m-0"
          >
            Settings
          </h2>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close settings"
            className="w-8 h-8 flex items-center justify-center bg-transparent border-none rounded-lg cursor-pointer transition-colors hover:bg-white/[0.06]"
          >
            <X size={18} className="text-gray-500" strokeWidth={2} />
          </button>
        </div>

        <div className="px-6 py-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-violet-500/20 flex items-center justify-center border border-violet-500/30">
              <User size={24} className="text-violet-400" strokeWidth={1.5} />
            </div>
            <div>
              <div className="text-white text-sm font-medium font-[Sora,sans-serif]">
                {userName}
              </div>
              <div className="text-gray-500 text-xs font-[Sora,sans-serif] mt-0.5">
                {userEmail}
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 px-4">
          <button
            type="button"
            onClick={handleNotificationsToggle}
            className="w-full px-3 py-3.5 flex items-center justify-between bg-transparent border-none rounded-[10px] cursor-pointer transition-colors hover:bg-white/[0.04]"
          >
            <div className="flex items-center gap-3">
              {notifications ? (
                <Bell size={18} className="text-emerald-500" strokeWidth={2} />
              ) : (
                <BellOff size={18} className="text-gray-500" strokeWidth={2} />
              )}
              <span className="text-gray-300 text-sm font-[Sora,sans-serif]">
                Notifications
              </span>
            </div>
            <ToggleSwitch
              enabled={notifications}
              onChange={handleNotificationsToggle}
              aria-label="Toggle notifications"
            />
          </button>

          <button
            type="button"
            disabled
            aria-disabled="true"
            className="w-full px-3 py-3.5 flex items-center justify-between bg-transparent border-none rounded-[10px] cursor-not-allowed opacity-60"
          >
            <div className="flex items-center gap-3">
              <Globe size={18} className="text-gray-500" strokeWidth={2} />
              <span className="text-gray-300 text-sm font-[Sora,sans-serif]">
                Language
              </span>
            </div>
            <div className="text-gray-500 text-[13px] font-[Sora,sans-serif]">
              English
            </div>
          </button>
        </div>

        {onLogout && (
          <div className="px-4 pt-3 pb-5 border-t border-white/[0.06]">
            <button
              type="button"
              onClick={onLogout}
              className="w-full p-3 flex items-center justify-center gap-2 bg-red-500/10 border border-red-500/20 rounded-[10px] cursor-pointer transition-all hover:bg-red-500/15 hover:border-red-500/30"
            >
              <LogOut size={16} className="text-red-500" strokeWidth={2} />
              <span className="text-red-500 text-sm font-medium font-[Sora,sans-serif]">
                Sign out
              </span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}
