import type { Meta, StoryObj } from '@storybook/react';
import { FilterDropdown } from './FilterDropdown';

const meta: Meta<typeof FilterDropdown> = {
  title: 'Inputs/FilterDropdown',
  component: FilterDropdown,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A dropdown component for filtering data with keyboard navigation and portal-based positioning.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { FilterDropdown } from '@aspect/ui-kit';
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
    label: 'Status',
    options: [
      { label: 'All', value: 'all' },
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Default filter dropdown with status options.',
      },
    },
  },
};

export const WithBorder: Story = {
  args: {
    label: 'Category',
    options: [
      { label: 'All Categories', value: 'all' },
      { label: 'Electronics', value: 'electronics' },
      { label: 'Clothing', value: 'clothing' },
    ],
    showBorder: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter dropdown with a right border separator.',
      },
    },
  },
};

export const DateRange: Story = {
  args: {
    label: 'Date Range',
    options: [
      { label: 'Today', value: 'today' },
      { label: 'This Week', value: 'week' },
      { label: 'This Month', value: 'month' },
      { label: 'This Year', value: 'year' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Filter dropdown for selecting date ranges.',
      },
    },
  },
};
