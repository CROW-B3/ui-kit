'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { MobileSidebarProps, NavItem } from './types';
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
  onThemeChange,
  onNotificationsChange,
  initialTheme = 'dark',
  initialNotifications = true,
  chatHistory,
  activeChatId,
  chatHistoryExpanded = true,
  onChatClick,
  onChatHistoryToggle,
  onChatRename,
  onChatDelete,
}: MobileSidebarProps) {
  // Show chat history only on Ask CROW page
  const normalizedHref = activeHref?.replace(/\/$/, '') || '';
  const showChatHistory = normalizedHref === '/ask-crow';

  // Lock body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle navigation - close sidebar after navigating
  const handleNavigate = (href: string) => {
    onNavigate?.(href);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 z-[100] md:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Sidebar Panel */}
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-0 top-0 h-full z-[101] md:hidden"
            style={{
              width: 280,
              background: 'black',
              borderRight: '1px rgba(255, 255, 255, 0.08) solid',
            }}
          >
            {/* Gradient overlays */}
            <div
              style={{
                width: 279,
                height: '100%',
                left: 0,
                top: 0,
                position: 'absolute',
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0) 100%)',
                pointerEvents: 'none',
              }}
            />
            <div
              style={{
                width: 279,
                height: 128,
                left: 0,
                top: 0,
                position: 'absolute',
                opacity: 0.50,
                background: 'linear-gradient(180deg, #100B1A 0%, rgba(16, 11, 26, 0) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg z-10 transition-colors hover:bg-white/[0.06]"
              aria-label="Close menu"
            >
              <X size={20} color="#9CA3AF" strokeWidth={2} />
            </button>

            {/* Content */}
            <div className="flex flex-col h-full">
              <SidebarLogo logoSrc={logoSrc} />

              <NavMenu
                items={navItems}
                activeHref={activeHref}
                onNavigate={handleNavigate}
              />

              {/* Chat History Section - only visible on Ask CROW page */}
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
                  initialTheme={initialTheme}
                  initialNotifications={initialNotifications}
                  onThemeChange={onThemeChange}
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
