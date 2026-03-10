import type { Meta, StoryObj } from '@storybook/react';
import { PatternCard } from './PatternCard';

const meta: Meta<typeof PatternCard> = {
  title: 'Cards/PatternCard',
  component: PatternCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A card displaying detected patterns with severity levels, confidence indicators, and action buttons.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { PatternCard } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[420px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Unusual checkout patterns detected',
    severity: 'high',
    affectedStores: '12 stores',
    lastSeen: '2 hours ago',
    confidence: 'high',
  },
  parameters: {
    docs: {
      description: {
        story: 'High severity pattern with high confidence.',
      },
    },
  },
};

export const MediumSeverity: Story = {
  args: {
    title: 'Inventory discrepancy pattern',
    severity: 'medium',
    affectedStores: '5 stores',
    lastSeen: '1 day ago',
    confidence: 'medium',
  },
  parameters: {
    docs: {
      description: {
        story: 'Medium severity pattern with medium confidence.',
      },
    },
  },
};

export const LowSeverity: Story = {
  args: {
    title: 'Minor timing anomalies',
    severity: 'low',
    affectedStores: '2 stores',
    lastSeen: '3 days ago',
    confidence: 'low',
  },
  parameters: {
    docs: {
      description: {
        story: 'Low severity pattern with low confidence.',
      },
    },
  },
};

export const CriticalPattern: Story = {
  args: {
    title: 'Critical security breach pattern',
    severity: 'critical',
    affectedStores: '25 stores',
    lastSeen: '30 minutes ago',
    confidence: 'high',
  },
  parameters: {
    docs: {
      description: {
        story: 'Critical severity pattern requiring immediate attention.',
      },
    },
  },
};
