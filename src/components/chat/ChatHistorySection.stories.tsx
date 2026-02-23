import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ChatHistorySection } from './ChatHistorySection';

const meta: Meta<typeof ChatHistorySection> = {
  title: 'Chat/ChatHistorySection',
  component: ChatHistorySection,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A collapsible chat history section that displays a list of chat items with support for selection, renaming, and deletion.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { ChatHistorySection } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[280px] bg-black/30 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const mockItems = [
  { id: '1', title: 'How to use React hooks?' },
  { id: '2', title: 'Best practices for TypeScript' },
  { id: '3', title: 'CSS Grid vs Flexbox' },
];

export const Default: Story = {
  args: {
    items: mockItems,
    activeItemId: '1',
    isExpanded: true,
    isVisible: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default expanded state with an active item selected.',
      },
    },
  },
};

export const Empty: Story = {
  args: {
    items: [],
    isExpanded: true,
    isVisible: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state when there are no chat history items.',
      },
    },
  },
};

export const Collapsed: Story = {
  args: {
    items: mockItems,
    isExpanded: false,
    isVisible: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Collapsed state with the list hidden.',
      },
    },
  },
};

export const Interactive: Story = {
  render: function Component() {
    const [items, setItems] = useState(mockItems);
    const [activeId, setActiveId] = useState('1');
    const [expanded, setExpanded] = useState(true);

    return (
      <ChatHistorySection
        items={items}
        activeItemId={activeId}
        isExpanded={expanded}
        isVisible={true}
        onItemClick={setActiveId}
        onToggleExpanded={() => setExpanded(!expanded)}
        onRename={(id, newTitle) => {
          setItems(
            items.map(i => (i.id === id ? { ...i, title: newTitle } : i))
          );
        }}
        onDelete={id => {
          setItems(items.filter(i => i.id !== id));
        }}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          'Fully interactive example with selection, rename, and delete functionality.',
      },
    },
  },
};
