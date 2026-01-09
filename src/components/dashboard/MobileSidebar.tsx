'use client';

import type { MobileSidebarProps, NavItem } from './types';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { ChatHistorySection } from './ChatHistorySection';
import { NavMenu } from './NavMenu';
import { SettingsDropup } from './SettingsDropup';
import { SidebarLogo } from './SidebarLogo';

export type { MobileSidebarProps };

const defaultNavItems: NavItem[] = [
  { icon: 'grid_view', label: 'Overview', href: '/' },
  { icon: 'chat_bubble', label: 'Ask CROW', href: '/ask-crow' },
  {
    icon: 'timeline',
    label: 'Analysis',
    href: '#',
    submenu: [
      { icon: '', label: 'Interactions', href: '/analysis/interactions' },
      { icon: '', label: 'Patterns', href: '/analysis/patterns' },
    ],
  },
  { icon: 'group', label: 'Team', href: '/team' },
];

export function MobileSidebar({
  isOpen,
  onClose,
  navItems = defaultNavItems,
  activeHref = '/',
  onNavigate,
  showSettings = true,
  logoSrc = '/favicon.png',
  userName = 'User',
  userEmail = 'user@example.com',
  onLogout,
  onNotificationsChange,
  initialNotifications = true,
  chatHistory,
  activeChatId,
  chatHistoryExpanded = true,
  onChatClick,
  onChatHistoryToggle,
  onChatRename,
  onChatDelete,
}: MobileSidebarProps) {
  // Show chat history when on Ask CROW page
  const normalizedHref = activeHref?.replace(/\/$/, '') || '';
  const showChatHistory = normalizedHref === '/ask-crow';

  // Lock body scroll and handle Escape key when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEscapeKey = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Handle navigation - close sidebar after navigating
  const handleNavigate = (href: string) => {
    onNavigate?.(href);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 z-[100] md:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 h-full w-[280px] bg-black border-r border-white/[0.08] z-[101] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div
              className="absolute inset-0 w-[279px] h-full pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0) 100%)',
              }}
            />
            <div
              className="absolute left-0 top-0 w-[279px] h-32 opacity-50 pointer-events-none"
              style={{
                background:
                  'linear-gradient(180deg, #100B1A 0%, rgba(16, 11, 26, 0) 100%)',
              }}
            />

            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg z-10 transition-colors hover:bg-white/[0.06]"
              aria-label="Close menu"
            >
              <X size={20} color="#9CA3AF" strokeWidth={2} />
            </button>

            <div className="flex flex-col h-full">
              <SidebarLogo logoSrc={logoSrc} />

              <NavMenu
                items={navItems}
                activeHref={activeHref}
                onNavigate={handleNavigate}
              />

              <ChatHistorySection
                items={chatHistory}
                activeItemId={activeChatId}
                isExpanded={chatHistoryExpanded}
                isVisible={showChatHistory}
                onItemClick={onChatClick}
                onToggleExpanded={onChatHistoryToggle}
                onRename={onChatRename}
                onDelete={onChatDelete}
              />

              {showSettings && (
                <SettingsDropup
                  userName={userName}
                  userEmail={userEmail}
                  initialNotifications={initialNotifications}
                  onNotificationsChange={onNotificationsChange}
                  onLogout={onLogout}
                />
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
