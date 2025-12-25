'use client';

import { cn } from '../lib/utils';

export interface NavItem {
  icon: string;
  label: string;
  href: string;
  submenu?: NavItem[];
}

export interface SidebarProps {
  navItems?: NavItem[];
  activeHref?: string;
  onNavigate?: (href: string) => void;
  showSettings?: boolean;
  onSettingsClick?: () => void;
}

const defaultNavItems: NavItem[] = [
  {
    icon: 'grid_view',
    label: 'Overview',
    href: '/overview',
  },
  {
    icon: 'chat_bubble',
    label: 'Ask CROW',
    href: '/ask-crow',
  },
  {
    icon: 'timeline',
    label: 'Analysis',
    href: '#',
    submenu: [
      { icon: '', label: 'Interactions', href: '/analysis/interactions' },
      { icon: '', label: 'Patterns', href: '/analysis/patterns' },
    ],
  },
  {
    icon: 'group',
    label: 'Team',
    href: '/team',
  },
];

export function Sidebar({
  navItems = defaultNavItems,
  activeHref = '/overview',
  onNavigate,
  showSettings = true,
  onSettingsClick,
}: SidebarProps) {
  const isActive = (href: string) => activeHref === href;
  const isSubmenuActive = (items: NavItem[] | undefined) =>
    items?.some((item) => activeHref === item.href);

  return (
    <aside className="w-[280px] bg-black border-r border-white/[0.08] flex flex-col py-6 px-4 hidden md:flex shrink-0 relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#100b1a] to-transparent pointer-events-none opacity-50"></div>

      {/* Content */}
      <div className="relative flex flex-col h-full z-10">
        {/* Logo */}
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="w-8 h-8 relative flex items-center justify-center bg-violet-600 rounded-lg shadow-[0_0_15px_rgba(124,58,237,0.5)]">
            <span className="material-symbols-outlined text-white text-[20px]">bolt</span>
          </div>
          <div>
            <span className="font-bold text-lg tracking-wide text-white block leading-none">CROW</span>
            <span className="text-[9px] text-gray-400 font-medium tracking-[0.1em] uppercase block mt-1">
              CLIENT
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 flex-1">
          {navItems.map((item) => (
            <div key={item.label}>
              {item.submenu ? (
                // Expandable menu
                <button
                  className={cn(
                    'w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[14px]',
                    'transition-colors group',
                    isSubmenuActive(item.submenu)
                      ? 'text-white bg-white/[0.08] border border-white/[0.05] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[20px] text-violet-300">
                      {item.icon}
                    </span>
                    {item.label}
                  </div>
                  <span className="material-symbols-outlined text-[18px] text-gray-600">
                    {isSubmenuActive(item.submenu) ? 'expand_less' : 'expand_more'}
                  </span>
                </button>
              ) : (
                // Regular link
                <a
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px]',
                    'transition-colors group',
                    isActive(item.href)
                      ? 'text-white bg-white/[0.08] border border-white/[0.05] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]'
                      : 'text-gray-400 hover:text-white hover:bg-white/[0.05]'
                  )}
                >
                  <span
                    className={cn(
                      'material-symbols-outlined text-[20px]',
                      isActive(item.href) ? 'text-violet-300' : 'text-gray-500 group-hover:text-gray-300'
                    )}
                  >
                    {item.icon}
                  </span>
                  {item.label}
                </a>
              )}

              {/* Submenu items */}
              {item.submenu && (
                <div className="pl-11 space-y-1 pt-1">
                  {item.submenu.map((subitem) => (
                    <a
                      key={subitem.label}
                      href={subitem.href}
                      className={cn(
                        'block px-3 py-1.5 rounded-lg text-[13px] transition-colors relative',
                        isActive(subitem.href)
                          ? 'text-white bg-white/[0.03]'
                          : 'text-gray-500 hover:text-white hover:bg-white/[0.05]'
                      )}
                    >
                      {isActive(subitem.href) && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-violet-500 rounded-full"></span>
                      )}
                      {subitem.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Settings */}
        <div className="mt-auto pt-6 border-t border-white/[0.08]">
          <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-[14px] text-gray-400 hover:text-white hover:bg-white/[0.05] transition-colors group">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[20px] text-gray-500 group-hover:text-gray-300">
                settings
              </span>
              Settings
            </div>
            <span className="material-symbols-outlined text-[18px] text-gray-600">chevron_right</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
