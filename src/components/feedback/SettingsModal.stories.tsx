import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SettingsModal } from './SettingsModal';

const meta: Meta<typeof SettingsModal> = {
  title: 'Feedback/SettingsModal',
  component: SettingsModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A modal dialog for user settings with user profile display, notification toggle, and logout functionality.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { SettingsModal } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="min-h-[500px] w-full max-w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    userName: 'John Doe',
    userEmail: 'john@example.com',
    onLogout: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Default settings modal with all features enabled.',
      },
    },
  },
};

export const WithNotificationsOn: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    userName: 'Jane Smith',
    userEmail: 'jane@example.com',
    initialNotifications: true,
    onNotificationsChange: () => {},
    onLogout: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Settings modal with notifications toggle enabled by default.',
      },
    },
  },
};

export const WithNotificationsOff: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    userName: 'Bob Wilson',
    userEmail: 'bob@example.com',
    initialNotifications: false,
    onNotificationsChange: () => {},
    onLogout: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Settings modal with notifications toggle disabled by default.',
      },
    },
  },
};

export const NoLogout: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    userName: 'Admin User',
    userEmail: 'admin@example.com',
  },
  parameters: {
    docs: {
      description: {
        story: 'Settings modal without the logout button.',
      },
    },
  },
};

export const Interactive: Story = {
  render: function Component() {
    const [isOpen, setIsOpen] = useState(true);
    const [notifications, setNotifications] = useState(true);

    return (
      <div>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-violet-600 text-white rounded-lg"
        >
          Open Settings
        </button>
        <SettingsModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          userName="Interactive User"
          userEmail="interactive@example.com"
          initialNotifications={notifications}
          onNotificationsChange={setNotifications}
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
        story:
          'Fully interactive example with open/close and notification toggle functionality.',
      },
    },
  },
};
