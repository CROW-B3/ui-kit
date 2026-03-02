import type { Meta, StoryObj } from '@storybook/react';
import { PendingInviteCard } from './PendingInviteCard';

const meta: Meta<typeof PendingInviteCard> = {
  title: 'Cards/PendingInviteCard',
  component: PendingInviteCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A card displaying pending team invitations with user info, status badges, and permission tags.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { PendingInviteCard } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-full max-w-[420px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Pending: Story = {
  args: {
    invite: {
      id: '1',
      email: 'john@example.com',
      initials: 'JD',
      status: 'pending',
      permissions: { interactions: true, patterns: true },
    },
    onResend: () => {},
    onRevoke: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Pending invite with resend and revoke actions.',
      },
    },
  },
};

export const Accepted: Story = {
  args: {
    invite: {
      id: '2',
      email: 'jane@example.com',
      initials: 'JS',
      status: 'accepted',
      permissions: { teamManagement: true },
    },
    onResend: () => {},
    onRevoke: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Accepted invite showing green status badge.',
      },
    },
  },
};

export const Expired: Story = {
  args: {
    invite: {
      id: '3',
      email: 'expired@example.com',
      initials: 'EX',
      status: 'expired',
      permissions: { interactions: true },
    },
    onResend: () => {},
    onRevoke: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Expired invite showing red status badge.',
      },
    },
  },
};

export const WithChatPermissions: Story = {
  args: {
    invite: {
      id: '4',
      email: 'user@example.com',
      initials: 'US',
      status: 'pending',
      permissions: {
        chat: { components: ['Analytics', 'Reports'], lookbackWindow: '30d' },
        apiKeys: { scopes: ['read', 'write'] },
      },
    },
    onResend: () => {},
    onRevoke: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Invite with detailed chat and API key permissions.',
      },
    },
  },
};
