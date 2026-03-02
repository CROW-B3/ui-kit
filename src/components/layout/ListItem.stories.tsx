import type { Meta, StoryObj } from '@storybook/react';
import { ListItem } from './ListItem';

const meta: Meta<typeof ListItem> = {
  title: 'Layout/ListItem',
  component: ListItem,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A clickable list item with optional chevron indicator and highlight state.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { ListItem } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-full max-w-[320px] bg-black/30 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <p className="text-sm text-white">List Item Title</p>
        <p className="text-xs text-gray-500">Description text</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic list item with title and description.',
      },
    },
  },
};

export const WithChevron: Story = {
  args: {
    showChevron: true,
    children: (
      <div>
        <p className="text-sm text-white">Clickable Item</p>
        <p className="text-xs text-gray-500">Click to see more</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'List item with chevron indicator on hover.',
      },
    },
  },
};

export const Highlighted: Story = {
  args: {
    highlighted: true,
    children: (
      <div>
        <p className="text-sm text-white">Selected Item</p>
        <p className="text-xs text-gray-500">Currently active</p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Highlighted state with violet accent border.',
      },
    },
  },
};

export const List: Story = {
  render: () => (
    <div>
      <ListItem showChevron>
        <p className="text-sm text-white">First Item</p>
      </ListItem>
      <ListItem highlighted showChevron>
        <p className="text-sm text-white">Active Item</p>
      </ListItem>
      <ListItem showChevron>
        <p className="text-sm text-white">Third Item</p>
      </ListItem>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple items showing active selection state.',
      },
    },
  },
};
