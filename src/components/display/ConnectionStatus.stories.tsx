import type { Meta, StoryObj } from '@storybook/react';
import { ConnectionStatus } from './ConnectionStatus';

const meta: Meta<typeof ConnectionStatus> = {
  title: 'Display/ConnectionStatus',
  component: ConnectionStatus,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Displays connection health metrics including heartbeat and active streams count.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { ConnectionStatus } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default state showing placeholder values.',
      },
    },
  },
};

export const Connected: Story = {
  args: { isConnected: true },
  parameters: {
    docs: {
      description: {
        story: 'Connected state with active heartbeat and streams.',
      },
    },
  },
};

export const CustomValues: Story = {
  args: { heartbeat: '120ms', streams: '5' },
  parameters: {
    docs: {
      description: {
        story: 'Custom heartbeat and stream count values.',
      },
    },
  },
};

export const Disconnected: Story = {
  args: { isConnected: false },
  parameters: {
    docs: {
      description: {
        story: 'Disconnected state showing inactive indicators.',
      },
    },
  },
};
