import type { Meta, StoryObj } from '@storybook/react';
import { SourceIcon } from './SourceIcon';

const meta: Meta<typeof SourceIcon> = {
  title: 'Display/SourceIcon',
  component: SourceIcon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
An icon indicator for data source types (web, cctv, social) with color-coded styling.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { SourceIcon } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Web: Story = {
  args: { source: 'web' },
  parameters: {
    docs: {
      description: {
        story: 'Web source icon in blue.',
      },
    },
  },
};

export const CCTV: Story = {
  args: { source: 'cctv' },
  parameters: {
    docs: {
      description: {
        story: 'CCTV source icon in red.',
      },
    },
  },
};

export const Social: Story = {
  args: { source: 'social' },
  parameters: {
    docs: {
      description: {
        story: 'Social media source icon in purple.',
      },
    },
  },
};

export const AllSources: Story = {
  render: () => (
    <div className="flex gap-4">
      <SourceIcon source="web" />
      <SourceIcon source="cctv" />
      <SourceIcon source="social" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available source types displayed together.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <SourceIcon source="web" size="sm" />
      <SourceIcon source="web" size="md" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Size comparison between small and medium variants.',
      },
    },
  },
};
