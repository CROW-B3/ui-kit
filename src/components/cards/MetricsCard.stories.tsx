import type { Meta, StoryObj } from '@storybook/react';
import { MetricsCard } from './MetricsCard';

const meta: Meta<typeof MetricsCard> = {
  title: 'Cards/MetricsCard',
  component: MetricsCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A compact metrics card displaying a title, value, change indicator, and mini bar chart.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { MetricsCard } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[280px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Total Revenue',
    value: '$12,450',
    change: '+12.5%',
    changeType: 'positive',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic metrics card showing positive growth.',
      },
    },
  },
};

export const Negative: Story = {
  args: {
    title: 'Bounce Rate',
    value: '32%',
    change: '-5.2%',
    changeType: 'negative',
  },
  parameters: {
    docs: {
      description: {
        story: 'Metrics card showing negative change indicator.',
      },
    },
  },
};

export const Neutral: Story = {
  args: {
    title: 'Page Views',
    value: '1,234',
    change: '0%',
    changeType: 'neutral',
  },
  parameters: {
    docs: {
      description: {
        story: 'Metrics card with neutral change indicator.',
      },
    },
  },
};

export const CustomChart: Story = {
  args: {
    title: 'Active Users',
    value: '2,847',
    change: '+8%',
    changeType: 'positive',
    chartData: [10, 30, 25, 45, 60, 40, 80],
    chartColor: 'rose',
  },
  parameters: {
    docs: {
      description: {
        story: 'Metrics card with custom chart data and rose color scheme.',
      },
    },
  },
};

export const MultipleCards: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-[580px]">
      <MetricsCard
        title="Revenue"
        value="$45,231"
        change="+20.1%"
        changeType="positive"
      />
      <MetricsCard
        title="Orders"
        value="1,234"
        change="+15%"
        changeType="positive"
        chartColor="rose"
      />
      <MetricsCard
        title="Customers"
        value="567"
        change="-3%"
        changeType="negative"
      />
      <MetricsCard
        title="Avg Order"
        value="$89"
        change="0%"
        changeType="neutral"
        chartColor="gray"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Dashboard layout with multiple metrics cards.',
      },
    },
  },
};
