import type { Meta, StoryObj } from '@storybook/react';
import { GlassPanel } from './GlassPanel';

const meta: Meta<typeof GlassPanel> = {
  title: 'Layout/GlassPanel',
  component: GlassPanel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A glassmorphism container with frosted glass effect and subtle borders.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { GlassPanel } from '@aspect/ui-kit';
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
    children: <div className="p-6 text-white">Glass Panel Content</div>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic glass panel with default light variant.',
      },
    },
  },
};

export const Light: Story = {
  args: {
    variant: 'light',
    children: <div className="p-6 text-white">Light Glass Panel</div>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Light variant with subtle backdrop blur.',
      },
    },
  },
};

export const Heavy: Story = {
  args: {
    variant: 'heavy',
    children: <div className="p-6 text-white">Heavy Glass Panel</div>,
  },
  parameters: {
    docs: {
      description: {
        story: 'Heavy variant with stronger blur and border.',
      },
    },
  },
};

export const WithContent: Story = {
  args: {
    children: (
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-2">Panel Title</h3>
        <p className="text-gray-400 text-sm">
          This is a glassmorphism panel with some content inside.
        </p>
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Panel with structured content including heading and text.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <GlassPanel variant="light">
        <div className="p-6 text-white">Light</div>
      </GlassPanel>
      <GlassPanel variant="heavy">
        <div className="p-6 text-white">Heavy</div>
      </GlassPanel>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Side-by-side comparison of light and heavy variants.',
      },
    },
  },
};
