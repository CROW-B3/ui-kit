import type { Meta, StoryObj } from '@storybook/react';
import { TipCard } from './TipCard';

const meta: Meta<typeof TipCard> = {
  title: 'Cards/TipCard',
  component: TipCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A subtle tip card with a lightbulb icon for displaying helpful hints and suggestions.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { TipCard } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="max-w-md">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Pro tip: You can use keyboard shortcuts to navigate faster.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic tip card with short message.',
      },
    },
  },
};

export const LongContent: Story = {
  args: {
    children:
      'Did you know? You can customize your dashboard by dragging and dropping widgets. This allows you to create a personalized workspace that fits your workflow.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Tip card with longer multi-line content.',
      },
    },
  },
};

export const MultipleTips: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <TipCard>Use Cmd+K to open the command palette</TipCard>
      <TipCard>Double-click to edit inline</TipCard>
      <TipCard>Drag items to reorder them</TipCard>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple tip cards stacked vertically.',
      },
    },
  },
};
