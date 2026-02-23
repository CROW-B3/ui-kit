import type { Meta, StoryObj } from '@storybook/react';
import { DashboardBackground } from './DashboardBackground';

const meta: Meta<typeof DashboardBackground> = {
  title: 'Backgrounds/DashboardBackground',
  component: DashboardBackground,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A fixed background component for dashboard layouts with purple glow effects, vignette overlay, and optional noise texture.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { DashboardBackground } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="relative min-h-[500px] w-full">
        <Story />
        <div className="relative z-10 flex items-center justify-center min-h-[500px]">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { variant: 'default', sidebarWidth: 280 },
  parameters: {
    docs: {
      description: {
        story:
          'Default dashboard background with purple glow and vignette effects.',
      },
    },
  },
};

export const Minimal: Story = {
  args: { variant: 'minimal' },
  parameters: {
    docs: {
      description: {
        story: 'Minimal variant with a solid dark background only.',
      },
    },
  },
};

export const NarrowSidebar: Story = {
  args: { sidebarWidth: 64 },
  parameters: {
    docs: {
      description: {
        story: 'Background adjusted for a narrow collapsed sidebar.',
      },
    },
  },
};
