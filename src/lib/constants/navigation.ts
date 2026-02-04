import type { NavItem } from '../types';

export const DEFAULT_NAV_ITEMS: NavItem[] = [
  {
    icon: 'grid_view',
    label: 'Overview',
    href: '/',
  },
  {
    icon: 'chat_bubble',
    label: 'Ask CROW',
    href: '/ask-crow',
  },
  {
    icon: 'package',
    label: 'Products',
    href: '/products',
  },
  {
    icon: 'timeline',
    label: 'Analysis',
    href: '#',
    submenu: [
      {
        icon: '',
        label: 'Interactions',
        href: '/analysis/interactions',
      },
      {
        icon: '',
        label: 'Patterns',
        href: '/analysis/patterns',
      },
    ],
  },
  {
    icon: 'group',
    label: 'Team',
    href: '/team',
  },
];
