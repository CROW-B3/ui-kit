import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta: Meta<typeof Divider> = {
  title: 'Layout/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A visual separator component that divides content with optional text labels.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { Divider } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
    },
    variant: {
      control: 'select',
      options: ['default', 'light', 'dark'],
    },
  },
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
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Basic horizontal divider without text.',
      },
    },
  },
};

export const WithText: Story = {
  args: {
    text: 'or',
  },
  parameters: {
    docs: {
      description: {
        story: 'Divider with centered text label.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <Divider variant="default" text="Default" />
      <Divider variant="light" text="Light" />
      <Divider variant="dark" text="Dark" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available color variants: default, light, and dark.',
      },
    },
  },
};

export const Vertical: Story = {
  decorators: [
    Story => (
      <div className="h-[200px] flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
  args: {
    orientation: 'vertical',
  },
  parameters: {
    docs: {
      description: {
        story: 'Vertical orientation for side-by-side layouts.',
      },
    },
  },
};

export const VerticalWithText: Story = {
  decorators: [
    Story => (
      <div className="h-[200px] flex items-center justify-center">
        <Story />
      </div>
    ),
  ],
  args: {
    orientation: 'vertical',
    text: 'OR',
  },
  parameters: {
    docs: {
      description: {
        story: 'Vertical divider with rotated text label.',
      },
    },
  },
};

export const InForm: Story = {
  render: () => (
    <div className="flex flex-col gap-4 w-full">
      <button className="w-full py-2 px-4 rounded-full bg-white text-black text-sm font-medium">
        Continue with Google
      </button>
      <Divider text="or continue with" />
      <button className="w-full py-2 px-4 rounded-full border border-white/20 text-white text-sm">
        Email
      </button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common usage pattern in authentication forms.',
      },
    },
  },
};
