'use client';

import type { NavItem } from './types';
import {
  ChevronDown,
  LayoutGrid,
  MessageSquare,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '../../lib/utils';

export interface NavMenuProps {
  items: NavItem[];
  activeHref: string;
  onNavigate?: (href: string) => void;
}

type IconComponent = typeof LayoutGrid;

const iconComponents: Record<string, IconComponent> = {
  grid_view: LayoutGrid,
  chat_bubble: MessageSquare,
  timeline: TrendingUp,
  group: Users,
} as const;

export function NavMenu({ items, activeHref, onNavigate }: NavMenuProps) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);

  const normalizePath = (path: string) => path.replace(/\/$/, '') || '/';

  const isActive = (href: string) => {
    const normalizedActive = normalizePath(activeHref);
    const normalizedHref = normalizePath(href);
    return normalizedActive === normalizedHref;
  };

  const isSubmenuActive = (subItems?: NavItem[]) =>
    subItems?.some(item => isActive(item.href));
  const isExpanded = (label: string) => expandedMenus.includes(label);

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev =>
      prev.includes(label) ? prev.filter(l => l !== label) : [...prev, label]
    );
  };

  const handleNavigate = (href: string, e: React.MouseEvent) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(href);
    }
  };

  const handleKeyDown = (label: string, e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu(label);
    }
  };

  const renderIcon = (iconName: string, active: boolean) => {
    const IconComponent = iconComponents[iconName];
    if (!IconComponent) return null;
    return (
      <IconComponent
        size={15}
        className={cn(
          'transition-colors',
          active ? 'text-violet-300' : 'text-gray-500'
        )}
        strokeWidth={2}
      />
    );
  };

  return (
    <nav className="w-[247px] ml-4 mt-[99.5px] flex flex-col gap-1">
      {items.map(item => {
        const itemIsActive = item.submenu
          ? isSubmenuActive(item.submenu)
          : isActive(item.href);
        const expanded = item.submenu && isExpanded(item.label);
        const submenuHeight = item.submenu ? item.submenu.length * 35.5 : 0;

        return item.submenu ? (
          <div key={item.label}>
            <button
              type="button"
              onClick={() => toggleMenu(item.label)}
              onKeyDown={e => handleKeyDown(item.label, e)}
              aria-label={`${item.label} menu`}
              aria-expanded={expanded}
              className={cn(
                'w-[247px] h-[41px] relative rounded-lg border-none cursor-pointer',
                'flex items-center pl-3 gap-3 transition-colors duration-150',
                expanded
                  ? 'bg-white/[0.03]'
                  : 'bg-transparent hover:bg-white/[0.04]'
              )}
            >
              <div className="w-5 h-6 flex items-center justify-center shrink-0">
                {renderIcon(item.icon, !!itemIsActive)}
              </div>
              <span
                className={cn(
                  'text-sm font-normal leading-[21px] flex-1 text-left font-[Sora,sans-serif]',
                  itemIsActive ? 'text-white' : 'text-gray-400'
                )}
              >
                {item.label}
              </span>
              <div className="w-[18px] h-[22px] flex items-center justify-center mr-3">
                <ChevronDown
                  size={12}
                  className={cn(
                    'text-gray-600 transition-transform duration-200',
                    expanded && 'rotate-180'
                  )}
                  strokeWidth={2}
                />
              </div>
            </button>
            <div
              className="ml-11 overflow-hidden transition-all duration-250"
              style={{
                maxHeight: expanded ? submenuHeight : 0,
                opacity: expanded ? 1 : 0,
              }}
            >
              {item.submenu.map(subitem => {
                const subActive = isActive(subitem.href);
                return (
                  <a
                    key={subitem.label}
                    href={subitem.href}
                    onClick={e => handleNavigate(subitem.href, e)}
                    className={cn(
                      'w-[203px] h-[35.5px] rounded-lg flex items-center pl-3',
                      'no-underline cursor-pointer transition-colors duration-150',
                      subActive
                        ? 'bg-violet-500/10'
                        : 'bg-transparent hover:bg-white/[0.04]'
                    )}
                  >
                    <span
                      className={cn(
                        'text-[13px] leading-[19.5px] font-[Sora,sans-serif] transition-colors duration-150',
                        subActive
                          ? 'text-violet-300 font-medium'
                          : 'text-gray-500 font-normal'
                      )}
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
            onClick={e => handleNavigate(item.href, e)}
            className={cn(
              'w-[247px] h-[41px] rounded-lg flex items-center pl-3 gap-3',
              'no-underline cursor-pointer transition-all duration-150',
              itemIsActive
                ? 'bg-white/[0.08] shadow-[inset_0px_1px_0px_1px_rgba(255,255,255,0.05)] outline outline-1 outline-white/[0.05] -outline-offset-1'
                : 'bg-transparent hover:bg-white/[0.04]'
            )}
          >
            <div className="w-5 h-6 flex items-center justify-center shrink-0">
              {renderIcon(item.icon, !!itemIsActive)}
            </div>
            <span
              className={cn(
                'text-sm font-normal leading-[21px] font-[Sora,sans-serif]',
                itemIsActive ? 'text-white' : 'text-gray-400'
              )}
            >
              {item.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}
