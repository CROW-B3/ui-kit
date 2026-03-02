import type { Meta, StoryObj } from '@storybook/react';
import { InvitationDetailsCard } from './InvitationDetailsCard';

const meta: Meta<typeof InvitationDetailsCard> = {
  title: 'Cards/InvitationDetailsCard',
  component: InvitationDetailsCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A card displaying invitation details with label-value pairs and optional badge styling.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { InvitationDetailsCard } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-full max-w-[360px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fields: [
      { label: 'Organization', value: 'Acme Corp' },
      { label: 'Role', value: 'Developer', variant: 'badge' },
      { label: 'Invited by', value: 'admin@acme.com' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic invitation details with organization, role badge, and inviter.',
      },
    },
  },
};

export const WithBadge: Story = {
  args: {
    fields: [
      { label: 'Team', value: 'Engineering' },
      { label: 'Access Level', value: 'Admin', variant: 'badge' },
      { label: 'Expires', value: '7 days' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          'Invitation details with admin access level badge and expiration.',
      },
    },
  },
};

export const SingleField: Story = {
  args: {
    fields: [{ label: 'Invitation Code', value: 'ABC123XYZ' }],
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal card with a single field.',
      },
    },
  },
};
