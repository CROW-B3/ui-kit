import type { Meta, StoryObj } from '@storybook/react';
import { SuggestionChip } from './SuggestionChip';

const meta: Meta<typeof SuggestionChip> = {
  title: 'Inputs/SuggestionChip',
  component: SuggestionChip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A collection of clickable suggestion chips for quick actions or search suggestions.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { SuggestionChip } from '@aspect/ui-kit';
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
    suggestions: ['React', 'TypeScript', 'Tailwind CSS'],
    onSuggestionClick: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Default suggestion chips with click handler.',
      },
    },
  },
};

export const SearchSuggestions: Story = {
  args: {
    suggestions: ['How to use hooks?', 'State management', 'Performance tips'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Search-style suggestions for a query input.',
      },
    },
  },
};

export const QuickActions: Story = {
  args: {
    suggestions: ['Create new', 'Import data', 'Export report'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Quick action chips for common tasks.',
      },
    },
  },
};

export const Many: Story = {
  args: {
    suggestions: ['JavaScript', 'Python', 'Go', 'Rust', 'Ruby', 'Java', 'C++'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Multiple chips that wrap to new lines.',
      },
    },
  },
};
