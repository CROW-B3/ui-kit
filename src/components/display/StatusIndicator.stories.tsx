import type { Meta, StoryObj } from '@storybook/react';
import { StatusIndicator } from './StatusIndicator';

const meta: Meta<typeof StatusIndicator> = {
  title: 'Display/StatusIndicator',
  component: StatusIndicator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A pill-shaped indicator showing system status with a colored dot and label.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { StatusIndicator } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: { status: 'active' },
  parameters: {
    docs: {
      description: {
        story: 'Active status with violet indicator dot.',
      },
    },
  },
};

export const Inactive: Story = {
  args: { status: 'inactive' },
  parameters: {
    docs: {
      description: {
        story: 'Inactive status with gray indicator dot.',
      },
    },
  },
};

export const Processing: Story = {
  args: { status: 'processing' },
  parameters: {
    docs: {
      description: {
        story: 'Processing status with amber indicator dot.',
      },
    },
  },
};

export const CustomLabel: Story = {
  args: { status: 'active', label: 'Connected' },
  parameters: {
    docs: {
      description: {
        story: 'Active status with a custom label override.',
      },
    },
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <StatusIndicator status="active" />
      <StatusIndicator status="inactive" />
      <StatusIndicator status="processing" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available status types displayed together.',
      },
    },
  },
};
