'use client';

import type { NavItem, SidebarProps } from './types';
import { ChatHistorySection } from './ChatHistorySection';
import { DEFAULT_NAV_ITEMS } from './constants/navigation';
import { NavMenu } from './NavMenu';
import { SettingsDropup } from './SettingsDropup';
import { SidebarLogo } from './SidebarLogo';
import { normalizePath } from './utils/pathUtils';

export type { NavItem, SidebarProps };

const isAskCrowPage = (href: string) => normalizePath(href) === '/ask-crow';

export function Sidebar({
  navItems = DEFAULT_NAV_ITEMS,
  activeHref = '/',
  onNavigate,
  showSettings = true,
  logoSrc = '/logo.webp',
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
  showChatHistory = false,
}: SidebarProps) {
  const displayChatHistory = showChatHistory || isAskCrowPage(activeHref);

  return (
    <aside className="w-[280px] h-full relative bg-black overflow-hidden border-r border-white/[0.08] shrink-0 hidden md:flex md:flex-col">
      <div className="w-[279px] h-full absolute left-0 top-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
      <div className="w-[279px] h-32 absolute left-0 top-0 opacity-50 bg-gradient-to-b from-[#100B1A] to-transparent pointer-events-none" />

      <SidebarLogo logoSrc={logoSrc} />

      <NavMenu
        items={navItems}
        activeHref={activeHref}
        onNavigate={onNavigate}
      />

      <ChatHistorySection
        items={chatHistory}
        activeItemId={activeChatId}
        isExpanded={chatHistoryExpanded}
        isVisible={displayChatHistory}
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
    </aside>
  );
}
