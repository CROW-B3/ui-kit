import type { Meta, StoryObj } from '@storybook/react';
import { Bell, Mail, Shield } from 'lucide-react';
import { useState } from 'react';
import { PermissionToggle } from './PermissionToggle';

const meta: Meta<typeof PermissionToggle> = {
  title: 'Inputs/PermissionToggle',
  component: PermissionToggle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A toggle component for enabling or disabling permissions with an icon, title, and description.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { PermissionToggle } from '@aspect/ui-kit';
\`\`\`
      `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-full max-w-[320px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    icon: <Bell size={16} />,
    title: 'Notifications',
    description: 'Receive push notifications',
    enabled: false,
    onToggle: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Default permission toggle in disabled state.',
      },
    },
  },
};

export const Enabled: Story = {
  args: {
    icon: <Mail size={16} />,
    title: 'Email Updates',
    description: 'Get weekly email updates',
    enabled: true,
    onToggle: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Permission toggle in enabled state.',
      },
    },
  },
};

export const Highlighted: Story = {
  args: {
    icon: <Shield size={16} />,
    title: 'Two-Factor Auth',
    description: 'Enhanced security for your account',
    enabled: true,
    onToggle: () => {},
    highlighted: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Highlighted toggle for important permissions.',
      },
    },
  },
};

export const Interactive: Story = {
  render: function Component() {
    const [enabled, setEnabled] = useState(false);
    return (
      <PermissionToggle
        icon={<Bell size={16} />}
        title="Notifications"
        description="Click to toggle"
        enabled={enabled}
        onToggle={setEnabled}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive toggle with state management.',
      },
    },
  },
};

export const Multiple: Story = {
  render: function Component() {
    const [notifications, setNotifications] = useState(true);
    const [emails, setEmails] = useState(false);
    const [security, setSecurity] = useState(true);
    return (
      <div className="flex flex-col gap-2">
        <PermissionToggle
          icon={<Bell size={16} />}
          title="Notifications"
          description="Push notifications"
          enabled={notifications}
          onToggle={setNotifications}
        />
        <PermissionToggle
          icon={<Mail size={16} />}
          title="Emails"
          description="Weekly updates"
          enabled={emails}
          onToggle={setEmails}
        />
        <PermissionToggle
          icon={<Shield size={16} />}
          title="2FA"
          description="Two-factor auth"
          enabled={security}
          onToggle={setSecurity}
          highlighted
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple permission toggles in a settings list.',
      },
    },
  },
};
