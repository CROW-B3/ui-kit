import type { Meta, StoryObj } from '@storybook/react';
import { RunAgentCard } from './RunAgentCard';

const meta: Meta<typeof RunAgentCard> = {
  title: 'Cards/RunAgentCard',
  component: RunAgentCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A card displaying a copyable command with a code block and description text.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { RunAgentCard } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    command: 'npx crow-agent start --token=abc123',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic command card with copy functionality.',
      },
    },
  },
};

export const CustomTitle: Story = {
  args: {
    command: 'docker run -d crow/agent',
    title: 'Docker Command',
    description: 'Run this Docker command to start the agent container.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Command card with custom title and description.',
      },
    },
  },
};

export const LongCommand: Story = {
  args: {
    command:
      'curl -sSL https://install.crow.io | bash -s -- --api-key=sk_live_1234567890abcdef --region=us-east-1',
    title: 'Install Script',
    description:
      'Run this command to install and configure the agent automatically.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Long command with horizontal scroll.',
      },
    },
  },
};
