import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from './StatusBadge';

const meta: Meta<typeof StatusBadge> = {
  title: 'Display/StatusBadge',
  component: StatusBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A badge component for displaying status labels with semantic color variants.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { StatusBadge } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'positive',
        'negative',
        'warning',
        'neutral',
        'info',
        'high',
        'medium',
        'low',
      ],
    },
    size: {
      control: 'select',
      options: ['default', 'sm'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Status',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default neutral status badge.',
      },
    },
  },
};

export const Positive: Story = {
  args: {
    children: 'Active',
    variant: 'positive',
  },
  parameters: {
    docs: {
      description: {
        story: 'Positive variant for success or active states.',
      },
    },
  },
};

export const Negative: Story = {
  args: {
    children: 'Failed',
    variant: 'negative',
  },
  parameters: {
    docs: {
      description: {
        story: 'Negative variant for error or failed states.',
      },
    },
  },
};

export const Warning: Story = {
  args: {
    children: 'Pending',
    variant: 'warning',
  },
  parameters: {
    docs: {
      description: {
        story: 'Warning variant for pending or caution states.',
      },
    },
  },
};

export const Info: Story = {
  args: {
    children: 'Info',
    variant: 'info',
  },
  parameters: {
    docs: {
      description: {
        story: 'Info variant for informational messages.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StatusBadge variant="positive">Active</StatusBadge>
      <StatusBadge variant="negative">Failed</StatusBadge>
      <StatusBadge variant="warning">Pending</StatusBadge>
      <StatusBadge variant="neutral">Neutral</StatusBadge>
      <StatusBadge variant="info">Info</StatusBadge>
      <StatusBadge variant="high">High</StatusBadge>
      <StatusBadge variant="medium">Medium</StatusBadge>
      <StatusBadge variant="low">Low</StatusBadge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available color variants displayed together.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <StatusBadge variant="positive" size="sm">
        Small
      </StatusBadge>
      <StatusBadge variant="positive" size="default">
        Default
      </StatusBadge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Size comparison between small and default variants.',
      },
    },
  },
};

export const Uppercase: Story = {
  args: {
    children: 'Active',
    variant: 'positive',
    uppercase: true,
    tracking: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Badge with uppercase text and wider letter spacing.',
      },
    },
  },
};

export const PriorityLevels: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <StatusBadge variant="high" uppercase tracking>
          High Priority
        </StatusBadge>
        <span className="text-xs text-gray-400">Urgent tasks</span>
      </div>
      <div className="flex items-center gap-2">
        <StatusBadge variant="medium" uppercase tracking>
          Medium Priority
        </StatusBadge>
        <span className="text-xs text-gray-400">Normal tasks</span>
      </div>
      <div className="flex items-center gap-2">
        <StatusBadge variant="low" uppercase tracking>
          Low Priority
        </StatusBadge>
        <span className="text-xs text-gray-400">Can wait</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Priority level badges for task management interfaces.',
      },
    },
  },
};
