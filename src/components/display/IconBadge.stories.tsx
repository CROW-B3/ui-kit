import type { Meta, StoryObj } from '@storybook/react';
import { IconBadge } from './IconBadge';

const meta: Meta<typeof IconBadge> = {
  title: 'Display/IconBadge',
  component: IconBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A styled badge container for displaying icons with color variants.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { IconBadge } from '@aspect/ui-kit';
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
  args: { icon: 'settings' },
  parameters: {
    docs: {
      description: {
        story: 'Default gray variant badge.',
      },
    },
  },
};

export const Violet: Story = {
  args: { icon: 'star', variant: 'violet' },
  parameters: {
    docs: {
      description: {
        story: 'Violet variant with glow effect.',
      },
    },
  },
};

export const Blue: Story = {
  args: { icon: 'info', variant: 'blue' },
  parameters: {
    docs: {
      description: {
        story: 'Blue variant for informational icons.',
      },
    },
  },
};

export const Emerald: Story = {
  args: { icon: 'check', variant: 'emerald' },
  parameters: {
    docs: {
      description: {
        story: 'Emerald variant for success states.',
      },
    },
  },
};

export const Rose: Story = {
  args: { icon: 'alert', variant: 'rose' },
  parameters: {
    docs: {
      description: {
        story: 'Rose variant for warning or error states.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex gap-3">
      <IconBadge icon="⚙️" variant="gray" />
      <IconBadge icon="⭐" variant="violet" />
      <IconBadge icon="ℹ️" variant="blue" />
      <IconBadge icon="✓" variant="emerald" />
      <IconBadge icon="!" variant="rose" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available color variants displayed together.',
      },
    },
  },
};
