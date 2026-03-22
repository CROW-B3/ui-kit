import type { Meta, StoryObj } from '@storybook/react';
import { SettingsDropup } from './SettingsDropup';

const meta: Meta<typeof SettingsDropup> = {
  title: 'Inputs/SettingsDropup',
  component: SettingsDropup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A settings menu that opens upward with user info, notification toggle, and logout option.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { SettingsDropup } from '@aspect/ui-kit';
\`\`\`
      `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="relative w-[280px] h-[200px] bg-black/30 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userName: 'John Doe',
    userEmail: 'john@example.com',
    onLogout: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Default settings dropup with user info and logout.',
      },
    },
  },
};

export const Collapsed: Story = {
  args: {
    userName: 'User',
    userEmail: 'user@example.com',
    isCollapsed: true,
    onLogout: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Collapsed mode for narrow sidebar layouts.',
      },
    },
  },
};

export const NoLogout: Story = {
  args: {
    userName: 'Admin',
    userEmail: 'admin@example.com',
  },
  parameters: {
    docs: {
      description: {
        story: 'Settings dropup without the logout button.',
      },
    },
  },
};
