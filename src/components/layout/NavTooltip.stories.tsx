import type { Meta, StoryObj } from '@storybook/react';
import { House, Settings, User } from 'lucide-react';
import { NavTooltip } from './NavTooltip';

const meta: Meta<typeof NavTooltip> = {
  title: 'Layout/NavTooltip',
  component: NavTooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A tooltip component for navigation items with configurable position and delay.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { NavTooltip } from '@aspect/ui-kit';
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
  args: {
    content: 'Home',
    children: (
      <button className="p-3 rounded-lg bg-white/5 hover:bg-white/10">
        <House className="w-5 h-5 text-gray-400" />
      </button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic tooltip appearing on hover.',
      },
    },
  },
};

export const Positions: Story = {
  render: () => (
    <div className="flex gap-8">
      <NavTooltip content="Right" side="right">
        <button className="p-3 rounded-lg bg-white/5">
          <House className="w-5 h-5 text-gray-400" />
        </button>
      </NavTooltip>
      <NavTooltip content="Bottom" side="bottom">
        <button className="p-3 rounded-lg bg-white/5">
          <Settings className="w-5 h-5 text-gray-400" />
        </button>
      </NavTooltip>
      <NavTooltip content="Top" side="top">
        <button className="p-3 rounded-lg bg-white/5">
          <User className="w-5 h-5 text-gray-400" />
        </button>
      </NavTooltip>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different tooltip positions: right, bottom, top.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    content: 'This wont show',
    enabled: false,
    children: (
      <button className="p-3 rounded-lg bg-white/5">
        <House className="w-5 h-5 text-gray-400" />
      </button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Tooltip disabled - no popup on hover.',
      },
    },
  },
};
