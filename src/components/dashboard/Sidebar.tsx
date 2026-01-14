'use client';

import type { NavItem, SidebarProps } from './types';
import { ChatHistorySection } from './ChatHistorySection';
import { DEFAULT_NAV_ITEMS } from './constants/navigation';
import { NavMenu } from './NavMenu';
import { SettingsDropup } from './SettingsDropup';
import { SidebarLogo } from './SidebarLogo';
import { normalizePath } from './utils/pathUtils';
import { cn } from '../../lib/utils';

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
  isCollapsed = false,
  onToggleCollapse,
}: SidebarProps) {
  const displayChatHistory = showChatHistory || isAskCrowPage(activeHref);

  return (
    <aside
      className={cn(
        'h-full relative bg-black overflow-hidden border-r border-white/[0.08] shrink-0 hidden md:flex md:flex-col',
        'transition-[width] duration-300',
        isCollapsed ? 'w-[80px]' : 'w-[280px]'
      )}
    >
      <div
        className={cn(
          'h-full absolute left-0 top-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none transition-[width] duration-300',
          isCollapsed ? 'w-[79px]' : 'w-[279px]'
        )}
      />
      <div
        className={cn(
          'h-32 absolute left-0 top-0 opacity-50 bg-gradient-to-b from-[#100B1A] to-transparent pointer-events-none transition-[width] duration-300',
          isCollapsed ? 'w-[79px]' : 'w-[279px]'
        )}
      />

      <div
        className={cn(
          'relative z-10 pt-3 h-[60px] flex items-center transition-all duration-300',
          isCollapsed ? 'px-1.5 justify-center' : 'px-3'
        )}
      >
        <SidebarLogo logoSrc={logoSrc} isCollapsed={isCollapsed} onToggleCollapse={onToggleCollapse} />
      </div>

      <NavMenu
        items={navItems}
        activeHref={activeHref}
        onNavigate={onNavigate}
        isCollapsed={isCollapsed}
        onRequestExpand={onToggleCollapse}
      />

      {!isCollapsed && (
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
      )}

      {showSettings && (
        <SettingsDropup
          userName={userName}
          userEmail={userEmail}
          initialNotifications={initialNotifications}
          onNotificationsChange={onNotificationsChange}
          onLogout={onLogout}
          isCollapsed={isCollapsed}
        />
      )}
    </aside>
  );
}
