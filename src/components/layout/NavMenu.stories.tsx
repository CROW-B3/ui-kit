import type { Meta, StoryObj } from '@storybook/react';
import { NavMenu } from './NavMenu';

const meta: Meta<typeof NavMenu> = {
  title: 'Layout/NavMenu',
  component: NavMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A vertical navigation menu with support for nested submenus and collapsible state.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { NavMenu } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="bg-black/30 rounded-lg p-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: 'home' },
  { label: 'Analytics', href: '/analytics', icon: 'chart' },
  {
    label: 'Settings',
    href: '/settings',
    icon: 'settings',
    submenu: [
      { label: 'General', href: '/settings/general', icon: 'settings' },
      { label: 'Security', href: '/settings/security', icon: 'shield' },
      { label: 'Notifications', href: '/settings/notifications', icon: 'bell' },
    ],
  },
];

export const Default: Story = {
  args: {
    items: navItems,
    activeHref: '/dashboard',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic navigation menu with active item.',
      },
    },
  },
};

export const WithSubmenu: Story = {
  args: {
    items: navItems,
    activeHref: '/settings/general',
  },
  parameters: {
    docs: {
      description: {
        story: 'Navigation with expanded submenu and active subitem.',
      },
    },
  },
};

export const Collapsed: Story = {
  args: {
    items: navItems,
    activeHref: '/dashboard',
    isCollapsed: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Collapsed state showing only icons.',
      },
    },
  },
};
