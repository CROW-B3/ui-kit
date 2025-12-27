'use client';

import { useState } from 'react';
import { LayoutGrid, MessageSquare, TrendingUp, Users, ChevronDown } from 'lucide-react';
import type { NavItem } from './types';

export interface NavMenuProps {
  items: NavItem[];
  activeHref: string;
  onNavigate?: (href: string) => void;
}

const iconComponents: Record<string, typeof LayoutGrid> = {
  grid_view: LayoutGrid,
  chat_bubble: MessageSquare,
  timeline: TrendingUp,
  group: Users,
};

export function NavMenu({ items, activeHref, onNavigate }: NavMenuProps) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const isActive = (href: string) => activeHref === href;
  const isSubmenuActive = (subItems?: NavItem[]) =>
    subItems?.some((item) => activeHref === item.href);
  const isExpanded = (label: string) => expandedMenus.includes(label);

  const toggleMenu = (label: string) => {
    setExpandedMenus((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const handleNavigate = (href: string, e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
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
      {items.map((item) => {
        const itemIsActive = item.submenu ? isSubmenuActive(item.submenu) : isActive(item.href);
        const expanded = item.submenu && isExpanded(item.label);
        const submenuHeight = item.submenu ? item.submenu.length * 35.5 : 0;

        return item.submenu ? (
          <div key={item.label}>
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
              <div style={{ width: 20, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {renderIcon(item.icon, !!itemIsActive)}
              </div>
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
                    onClick={(e) => handleNavigate(subitem.href, e)}
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
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavigate(item.href, e)}
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
            <div style={{ width: 20, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {renderIcon(item.icon, !!itemIsActive)}
            </div>
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
  );
}
