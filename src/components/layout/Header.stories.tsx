import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Layout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A dashboard header with organization name, date range picker, notifications, and user avatar.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { Header } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="min-h-[200px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orgName: 'Acme Corp',
    dateRange: 'Last 7 days',
    userInitials: 'JD',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic header with organization name and date picker.',
      },
    },
  },
};

export const WithNotification: Story = {
  args: {
    orgName: 'Tech Startup',
    dateRange: 'Today',
    userInitials: 'AB',
    showNotification: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with notification badge indicator.',
      },
    },
  },
};

export const NoNotification: Story = {
  args: {
    orgName: 'Enterprise Inc',
    dateRange: 'Last 30 days',
    userInitials: 'XY',
    showNotification: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header without notification indicator.',
      },
    },
  },
};

export const Minimal: Story = {
  args: {
    minimal: true,
    userInitials: 'MN',
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal header without left section content.',
      },
    },
  },
};

export const CustomDateRange: Story = {
  args: {
    orgName: 'Analytics Co',
    dateRange: 'This quarter',
    userInitials: 'QR',
    dateRangeOptions: [
      { label: 'Today', value: 'today' },
      { label: 'This week', value: 'this_week' },
      { label: 'This month', value: 'this_month' },
      { label: 'This quarter', value: 'this_quarter' },
      { label: 'This year', value: 'this_year' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with custom date range options.',
      },
    },
  },
};
