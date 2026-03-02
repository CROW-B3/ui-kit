import type { Meta, StoryObj } from '@storybook/react';
import { SyncStatusCard } from './SyncStatusCard';

const meta: Meta<typeof SyncStatusCard> = {
  title: 'Cards/SyncStatusCard',
  component: SyncStatusCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A compact status card displaying sync state, last sync time, and mention count.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { SyncStatusCard } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-full max-w-[280px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Ready: Story = {
  args: { status: 'ready', lastSync: '2 min ago', mentions: 1284 },
  parameters: {
    docs: {
      description: {
        story: 'Ready state with violet indicator.',
      },
    },
  },
};

export const Syncing: Story = {
  args: { status: 'syncing', lastSync: 'Just now', mentions: 1290 },
  parameters: {
    docs: {
      description: {
        story: 'Syncing state with blue indicator.',
      },
    },
  },
};

export const Error: Story = {
  args: { status: 'error', lastSync: '5 min ago', mentions: 1280 },
  parameters: {
    docs: {
      description: {
        story: 'Error state with red indicator.',
      },
    },
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <SyncStatusCard status="ready" lastSync="2 min ago" mentions={1284} />
      <SyncStatusCard status="syncing" lastSync="Just now" mentions={1290} />
      <SyncStatusCard status="error" lastSync="5 min ago" mentions={1280} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All three sync status states displayed together.',
      },
    },
  },
};
