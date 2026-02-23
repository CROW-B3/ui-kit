import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Sidebar } from './Sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Layout/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A collapsible desktop sidebar with navigation menu, chat history, and user settings.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { Sidebar } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="h-screen flex">
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
  { label: 'Messages', href: '/messages', icon: 'message' },
  {
    label: 'Settings',
    href: '/settings',
    icon: 'settings',
    submenu: [
      { label: 'General', href: '/settings/general', icon: 'settings' },
      { label: 'Security', href: '/settings/security', icon: 'shield' },
    ],
  },
];

export const Default: Story = {
  args: {
    navItems,
    activeHref: '/dashboard',
    logoSrc: '/favicon.webp',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    onLogout: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic sidebar with navigation and user settings.',
      },
    },
  },
};

export const Collapsed: Story = {
  args: {
    navItems,
    activeHref: '/dashboard',
    logoSrc: '/favicon.webp',
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

export const WithChatHistory: Story = {
  args: {
    navItems,
    activeHref: '/ask-crow',
    logoSrc: '/favicon.webp',
    showChatHistory: true,
    chatHistory: [
      { id: '1', title: 'React hooks question' },
      { id: '2', title: 'TypeScript tips' },
    ],
    activeChatId: '1',
    chatHistoryExpanded: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with chat history section visible.',
      },
    },
  },
};

export const Interactive: Story = {
  render: function Component() {
    const [collapsed, setCollapsed] = useState(false);
    const [activeHref, setActiveHref] = useState('/dashboard');
    return (
      <Sidebar
        navItems={navItems}
        activeHref={activeHref}
        onNavigate={setActiveHref}
        logoSrc="/favicon.webp"
        userName="John Doe"
        userEmail="john@example.com"
        isCollapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        onLogout={() => {}}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo with collapse toggle and navigation.',
      },
    },
  },
};
