import type { Meta, StoryObj } from '@storybook/react';
import { PageHeader } from './PageHeader';

const meta: Meta<typeof PageHeader> = {
  title: 'Layout/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
An animated page header with label, title, description, and optional gradient divider.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { PageHeader } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-full max-w-[500px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Welcome',
    description: 'Get started with your dashboard',
    animate: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic page header with title and description.',
      },
    },
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Dashboard',
    title: 'Analytics Overview',
    description: 'Track your metrics and performance',
    animate: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Page header with uppercase label above title.',
      },
    },
  },
};

export const LeftAligned: Story = {
  args: {
    title: 'Settings',
    description: 'Manage your account preferences',
    align: 'left',
    animate: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Left-aligned header for content pages.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <PageHeader
        size="sm"
        title="Small Header"
        description="Compact size"
        animate={false}
      />
      <PageHeader
        size="md"
        title="Medium Header"
        description="Default size"
        animate={false}
      />
      <PageHeader
        size="lg"
        title="Large Header"
        description="Hero size"
        animate={false}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available size options: sm, md, and lg.',
      },
    },
  },
};

export const NoDivider: Story = {
  args: {
    title: 'Simple Header',
    showDivider: false,
    animate: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header without the gradient divider line.',
      },
    },
  },
};
