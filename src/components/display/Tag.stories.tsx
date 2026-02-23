import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from './Tag';

const meta: Meta<typeof Tag> = {
  title: 'Display/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A small label component for categorization or highlighting content.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { Tag } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'active'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Tag',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default gray tag variant.',
      },
    },
  },
};

export const Active: Story = {
  args: {
    children: 'Active Tag',
    variant: 'active',
  },
  parameters: {
    docs: {
      description: {
        story: 'Active violet tag variant for highlighted items.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Tag variant="default">Default</Tag>
      <Tag variant="active">Active</Tag>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of both tag variants.',
      },
    },
  },
};

export const MultipleTags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Tag>React</Tag>
      <Tag>TypeScript</Tag>
      <Tag variant="active">Featured</Tag>
      <Tag>Tailwind</Tag>
      <Tag>UI Kit</Tag>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple tags in a wrapping layout for categorization.',
      },
    },
  },
};

export const InContext: Story = {
  render: () => (
    <div className="p-4 rounded-lg bg-white/5 border border-white/10 flex items-center gap-3">
      <div className="flex-1">
        <p className="text-sm text-white">Component Library</p>
        <p className="text-xs text-gray-500">
          A collection of React components
        </p>
      </div>
      <div className="flex gap-1">
        <Tag variant="active">New</Tag>
        <Tag>v2.0</Tag>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tags used within a card component context.',
      },
    },
  },
};
