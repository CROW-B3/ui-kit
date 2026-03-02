import type { Meta, StoryObj } from '@storybook/react';
import { SectionHeader } from './SectionHeader';

const meta: Meta<typeof SectionHeader> = {
  title: 'Layout/SectionHeader',
  component: SectionHeader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A section header with title and optional "View all" link for content sections.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { SectionHeader } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-full max-w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { title: 'Recent Activity' },
  parameters: {
    docs: {
      description: {
        story: 'Basic section header with title only.',
      },
    },
  },
};

export const WithViewAll: Story = {
  args: {
    title: 'Notifications',
    viewAllHref: '/notifications',
  },
  parameters: {
    docs: {
      description: {
        story: 'Section header with "View all" link.',
      },
    },
  },
};

export const WithCustomText: Story = {
  args: {
    title: 'Projects',
    viewAllText: 'See all projects',
    viewAllHref: '/projects',
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom link text instead of default "View all".',
      },
    },
  },
};

export const WithCallback: Story = {
  args: {
    title: 'Messages',
    viewAllText: 'View inbox',
    onViewAllClick: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Click handler instead of navigation link.',
      },
    },
  },
};
