'use client';

import { useState, useRef, useEffect } from 'react';
import {
  LayoutGrid,
  MessageSquare,
  TrendingUp,
  Users,
  Settings,
  ChevronDown,
  ChevronUp,
  Moon,
  Sun,
  Bell,
  BellOff,
  LogOut,
  User,
} from 'lucide-react';
import type { NavItem, SidebarProps } from './types';

export type { NavItem, SidebarProps };

const defaultNavItems: NavItem[] = [
  { icon: 'grid_view', label: 'Overview', href: '/overview' },
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

// Icon component mapping
const iconComponents: Record<string, typeof LayoutGrid> = {
  grid_view: LayoutGrid,
  chat_bubble: MessageSquare,
  timeline: TrendingUp,
  group: Users,
  settings: Settings,
};

export function Sidebar({
  navItems = defaultNavItems,
  activeHref = '/overview',
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
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [theme, setTheme] = useState(initialTheme);
  const [notifications, setNotifications] = useState(initialNotifications);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setSettingsOpen(false);
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

  const isActive = (href: string) => activeHref === href;
  const isSubmenuActive = (items?: NavItem[]) =>
    items?.some((item) => activeHref === item.href);
  const isExpanded = (label: string) => expandedMenus.includes(label);

  const toggleMenu = (label: string) => {
    setExpandedMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const handleNavigate = (href: string) => {
    if (onNavigate) onNavigate(href);
  };

  const renderIcon = (iconName: string, active: boolean) => {
    const IconComponent = iconComponents[iconName];
    if (!IconComponent) return null;
    return (
      <IconComponent
        size={15}
        color={active ? '#C4B5FD' : '#6B7280'}
        strokeWidth={2}
      />
    );
  };

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
      {/* Gradient overlay - full height: linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0) 100%) */}
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
      {/* Gradient overlay - top 128px: opacity 0.50, linear-gradient(180deg, #100B1A 0%, rgba(16,11,26,0) 100%) */}
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

      {/* Logo section: 117.43x60, left: 24, top: 11.75 */}
      <div
        style={{
          width: 117.43,
          height: 60,
          left: 24,
          top: 11.75,
          position: 'absolute',
        }}
      >
        {/* Logo image: 58x60, left: 0, top: 0 */}
        <img
          src={logoSrc}
          alt="CROW Logo"
          style={{
            width: 58,
            height: 60,
            left: 0,
            top: 0,
            position: 'absolute',
            objectFit: 'contain',
          }}
        />
        {/* CROW: left: 58, top: 14, white, 18px, 700, line-height 18, letter-spacing 0.45 */}
        <div
          style={{
            left: 58,
            top: 14,
            position: 'absolute',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            color: 'white',
            fontSize: 18,
            fontFamily: 'Sora',
            fontWeight: 700,
            lineHeight: '18px',
            letterSpacing: 0.45,
          }}
        >
          CROW
        </div>
        {/* CLIENT: left: 58, top: 36, #9CA3AF, 9px, 500, uppercase, line-height 13.50, letter-spacing 0.90 */}
        <div
          style={{
            left: 58,
            top: 36,
            position: 'absolute',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
            color: '#9CA3AF',
            fontSize: 9,
            fontFamily: 'Sora',
            fontWeight: 500,
            textTransform: 'uppercase',
            lineHeight: '13.5px',
            letterSpacing: 0.90,
          }}
        >
          CLIENT
        </div>
      </div>

      {/* Navigation container: left: 16, top: 99.50, width: 247, flow layout */}
      <nav
        style={{
          width: 247,
          marginLeft: 16,
          marginTop: 99.50,
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        {navItems.map((item) => {
          const itemIsActive = item.submenu ? isSubmenuActive(item.submenu) : isActive(item.href);
          const expanded = item.submenu && isExpanded(item.label);
          const submenuHeight = item.submenu ? item.submenu.length * 35.5 : 0;

          return item.submenu ? (
            <div key={item.label}>
              {/* Nav item with submenu: 247x41, borderRadius: 8 */}
              <button
                type="button"
                onClick={() => toggleMenu(item.label)}
                aria-label={`${item.label} menu`}
                aria-expanded={expanded}
                style={{
                  width: 247,
                  height: 41,
                  position: 'relative',
                  borderRadius: 8,
                  background: expanded ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  paddingLeft: 12,
                  gap: 12,
                  transition: 'background 0.15s ease',
                }}
                onMouseEnter={(e) => {
                  if (!expanded) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                }}
                onMouseLeave={(e) => {
                  if (!expanded) e.currentTarget.style.background = 'transparent';
                }}
              >
                {/* Icon */}
                <div style={{ width: 20, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {renderIcon(item.icon, !!itemIsActive)}
                </div>
                {/* Label */}
                <span
                  style={{
                    color: itemIsActive ? 'white' : '#9CA3AF',
                    fontSize: 14,
                    fontFamily: 'Sora',
                    fontWeight: 400,
                    lineHeight: '21px',
                    flex: 1,
                    textAlign: 'left',
                  }}
                >
                  {item.label}
                </span>
                {/* Expand icon */}
                <div style={{ width: 18, height: 22, display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 12, transition: 'transform 0.2s ease' }}>
                  <ChevronDown
                    size={12}
                    color="#4B5563"
                    strokeWidth={2}
                    style={{
                      transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                    }}
                  />
                </div>
              </button>
              {/* Submenu container with smooth height transition */}
              <div
                style={{
                  marginLeft: 44,
                  overflow: 'hidden',
                  maxHeight: expanded ? submenuHeight : 0,
                  opacity: expanded ? 1 : 0,
                  transition: 'max-height 0.25s ease, opacity 0.2s ease',
                }}
              >
                {item.submenu.map((subitem) => {
                  const subActive = isActive(subitem.href);
                  return (
                    <a
                      key={subitem.label}
                      href={subitem.href}
                      onClick={(e) => { if (onNavigate) { e.preventDefault(); handleNavigate(subitem.href); } }}
                      style={{
                        width: 203,
                        height: 35.50,
                        borderRadius: 8,
                        display: 'flex',
                        alignItems: 'center',
                        paddingLeft: 12,
                        textDecoration: 'none',
                        cursor: 'pointer',
                        transition: 'background 0.15s ease',
                        background: subActive ? 'rgba(139, 92, 246, 0.10)' : 'transparent',
                      }}
                      onMouseEnter={(e) => {
                        if (!subActive) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                      }}
                      onMouseLeave={(e) => {
                        if (!subActive) e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <span
                        style={{
                          color: subActive ? '#C4B5FD' : '#6B7280',
                          fontSize: 13,
                          fontFamily: 'Sora',
                          fontWeight: subActive ? 500 : 400,
                          lineHeight: '19.5px',
                          transition: 'color 0.15s ease',
                        }}
                      >
                        {subitem.label}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Regular nav item */
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => { if (onNavigate) { e.preventDefault(); handleNavigate(item.href); } }}
              style={{
                width: 247,
                height: 41,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 12,
                gap: 12,
                textDecoration: 'none',
                transition: 'all 0.15s ease',
                cursor: 'pointer',
                ...(itemIsActive ? {
                  background: 'rgba(255, 255, 255, 0.08)',
                  boxShadow: '0px 1px 0px 1px rgba(255, 255, 255, 0.05) inset',
                  outline: '1px rgba(255, 255, 255, 0.05) solid',
                  outlineOffset: '-1px',
                } : {
                  background: 'transparent',
                }),
              }}
              onMouseEnter={(e) => {
                if (!itemIsActive) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
              }}
              onMouseLeave={(e) => {
                if (!itemIsActive) e.currentTarget.style.background = 'transparent';
              }}
            >
              {/* Icon */}
              <div style={{ width: 20, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {renderIcon(item.icon, !!itemIsActive)}
              </div>
              {/* Label */}
              <span
                style={{
                  color: itemIsActive ? 'white' : '#9CA3AF',
                  fontSize: 14,
                  fontFamily: 'Sora',
                  fontWeight: 400,
                  lineHeight: '21px',
                }}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>

      {/* Settings section with drop-up menu */}
      {showSettings && (
        <div
          ref={settingsRef}
          style={{
            width: 247,
            left: 16,
            bottom: 24,
            position: 'absolute',
          }}
        >
          {/* Drop-up menu */}
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
              opacity: settingsOpen ? 1 : 0,
              transform: settingsOpen ? 'translateY(0) scale(1)' : 'translateY(8px) scale(0.96)',
              pointerEvents: settingsOpen ? 'auto' : 'none',
              transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
              zIndex: 50,
            }}
          >
            {/* User info */}
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

            {/* Settings options */}
            <div style={{ padding: '6px' }}>
              {/* Theme toggle */}
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

              {/* Notifications toggle */}
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
                <div
                  style={{
                    width: 36,
                    height: 20,
                    borderRadius: 10,
                    background: notifications ? 'rgba(16, 185, 129, 0.3)' : 'rgba(107, 114, 128, 0.3)',
                    padding: 2,
                    transition: 'background 0.2s ease',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      width: 16,
                      height: 16,
                      borderRadius: 8,
                      background: notifications ? '#10B981' : '#4B5563',
                      transition: 'all 0.2s ease',
                      transform: notifications ? 'translateX(16px)' : 'translateX(0)',
                    }}
                  />
                </div>
              </button>
            </div>

            {/* Sign out */}
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

          {/* Settings button */}
          <div style={{ borderTop: '1px rgba(255, 255, 255, 0.08) solid', paddingTop: 12 }}>
            <button
              type="button"
              onClick={() => setSettingsOpen(!settingsOpen)}
              aria-label="Open settings"
              aria-expanded={settingsOpen}
              style={{
                width: 247,
                height: 41,
                borderRadius: 8,
                background: settingsOpen ? 'rgba(255, 255, 255, 0.06)' : 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'background 0.15s ease',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 12,
                gap: 12,
              }}
              onMouseEnter={(e) => {
                if (!settingsOpen) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
              }}
              onMouseLeave={(e) => {
                if (!settingsOpen) e.currentTarget.style.background = 'transparent';
              }}
            >
              <div style={{ width: 20, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Settings size={15} color={settingsOpen ? '#A78BFA' : '#6B7280'} strokeWidth={2} />
              </div>
              <span
                style={{
                  color: settingsOpen ? 'white' : '#9CA3AF',
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
                  color={settingsOpen ? '#A78BFA' : '#4B5563'}
                  strokeWidth={2}
                  style={{
                    transform: settingsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                  }}
                />
              </div>
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
