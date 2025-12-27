'use client';

import type { NavItem, SidebarProps } from './types';
import { SidebarLogo } from './SidebarLogo';
import { NavMenu } from './NavMenu';
import { SettingsDropup } from './SettingsDropup';

export type { NavItem, SidebarProps };

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

export function Sidebar({
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
}: SidebarProps) {
  return (
    <aside
      style={{
        width: 280,
        height: '100%',
        position: 'relative',
        background: 'black',
        overflow: 'hidden',
        borderRight: '1px rgba(255, 255, 255, 0.08) solid',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
      className="hidden md:flex"
    >
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

      <SidebarLogo logoSrc={logoSrc} />

      <NavMenu
        items={navItems}
        activeHref={activeHref}
        onNavigate={onNavigate}
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
    </aside>
  );
}
