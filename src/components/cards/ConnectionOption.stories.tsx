import type { Meta, StoryObj } from '@storybook/react';
import { LuCloud, LuDatabase, LuGitBranch } from 'react-icons/lu';
import { ConnectionOption } from './ConnectionOption';

const meta: Meta<typeof ConnectionOption> = {
  title: 'Cards/ConnectionOption',
  component: ConnectionOption,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A clickable option row for displaying connection or integration status with animated transitions.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { ConnectionOption } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[400px] bg-black/50 rounded-xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const NotStarted: Story = {
  args: {
    icon: <LuCloud size={18} />,
    title: 'Cloud Storage',
    description: 'Connect your cloud storage provider',
    status: 'not_started',
  },
  parameters: {
    docs: {
      description: {
        story: 'Connection option in not started state.',
      },
    },
  },
};

export const InProgress: Story = {
  args: {
    icon: <LuDatabase size={18} />,
    title: 'Database',
    description: 'Setting up database connection',
    status: 'in_progress',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Connection option showing in progress state with yellow indicator.',
      },
    },
  },
};

export const Connected: Story = {
  args: {
    icon: <LuGitBranch size={18} />,
    title: 'Version Control',
    description: 'Git repository connected',
    status: 'connected',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Connection option showing connected state with green indicator.',
      },
    },
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-col">
      <ConnectionOption
        icon={<LuCloud size={18} />}
        title="Cloud Storage"
        description="Not configured yet"
        status="not_started"
      />
      <ConnectionOption
        icon={<LuDatabase size={18} />}
        title="Database"
        description="Connecting..."
        status="in_progress"
      />
      <ConnectionOption
        icon={<LuGitBranch size={18} />}
        title="GitHub"
        description="Repository linked"
        status="connected"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All three connection status states displayed together.',
      },
    },
  },
};
