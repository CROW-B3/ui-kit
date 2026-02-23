import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { MobileSidebar } from './MobileSidebar';

const meta: Meta<typeof MobileSidebar> = {
  title: 'Layout/MobileSidebar',
  component: MobileSidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A slide-out mobile navigation sidebar with navigation menu, chat history, and settings.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { MobileSidebar } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="min-h-[600px] relative">
        <style>{`
          /* Force mobile sidebar to be visible in Storybook on all screen sizes */
          .md\\:hidden {
            display: block !important;
          }
        `}</style>
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

const chatHistory = [
  { id: '1', title: 'React hooks question' },
  { id: '2', title: 'TypeScript best practices' },
  { id: '3', title: 'CSS Grid layout help' },
];

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
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
        story: 'Basic mobile sidebar with navigation and settings.',
      },
    },
  },
};

export const WithChatHistory: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    navItems,
    activeHref: '/ask-crow',
    logoSrc: '/favicon.webp',
    chatHistory,
    activeChatId: '1',
    chatHistoryExpanded: true,
    userName: 'John Doe',
    userEmail: 'john@example.com',
    onLogout: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar with chat history section visible.',
      },
    },
  },
};

export const NoSettings: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    navItems,
    activeHref: '/dashboard',
    logoSrc: '/favicon.webp',
    showSettings: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Sidebar without the settings dropup section.',
      },
    },
  },
};

export const Interactive: Story = {
  render: function Component() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeHref, setActiveHref] = useState('/dashboard');

    const handleNavigate = (href: string) => {
      setActiveHref(href);
      setIsOpen(false);
    };

    return (
      <div className="h-[600px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-6">
        <div className="flex flex-col gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="w-fit px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg font-medium transition-colors shadow-lg"
          >
            Open Menu
          </button>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-1">Current page:</p>
            <p className="text-lg font-semibold text-white">{activeHref}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-2">Available pages:</p>
            <ul className="space-y-1 text-sm text-gray-300">
              {navItems.map(item => (
                <li key={item.href}>
                  • {item.label} ({item.href})
                </li>
              ))}
            </ul>
          </div>
        </div>
        <MobileSidebar
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          navItems={navItems}
          activeHref={activeHref}
          onNavigate={handleNavigate}
          logoSrc="/favicon.webp"
          userName="John Doe"
          userEmail="john@example.com"
          onLogout={() => {
            setIsOpen(false);
          }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo with open/close and navigation.',
      },
    },
  },
};
