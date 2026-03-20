import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CollapseToggleButton } from './CollapseToggleButton';

const meta: Meta<typeof CollapseToggleButton> = {
  title: 'Buttons/CollapseToggleButton',
  component: CollapseToggleButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A toggle button for expanding and collapsing sidebars with animated panel icons.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { CollapseToggleButton } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Expanded: Story = {
  args: { isCollapsed: false, onToggle: () => {} },
  parameters: {
    docs: {
      description: {
        story: 'The button in its expanded state, showing the collapse icon.',
      },
    },
  },
};

export const Collapsed: Story = {
  args: { isCollapsed: true, onToggle: () => {} },
  parameters: {
    docs: {
      description: {
        story: 'The button in its collapsed state, showing the expand icon.',
      },
    },
  },
};

export const Interactive: Story = {
  render: function Component() {
    const [isCollapsed, setIsCollapsed] = useState(false);
    return (
      <div className="flex items-center gap-4">
        <CollapseToggleButton
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed(!isCollapsed)}
        />
        <span className="text-sm text-gray-400">
          {isCollapsed ? 'Collapsed' : 'Expanded'}
        </span>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Interactive demo showing the toggle behavior with state management.',
      },
    },
  },
};
