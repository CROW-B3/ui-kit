import type { Meta, StoryObj } from '@storybook/react';
import { GradientBackground } from './GradientBackground';

const meta: Meta<typeof GradientBackground> = {
  title: 'Backgrounds/GradientBackground',
  component: GradientBackground,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A radial gradient background element with customizable colors, positioning, and blur for creating ambient lighting effects.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { GradientBackground } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="relative min-h-[500px] w-full bg-black overflow-hidden">
        <Story />
        <div className="relative z-10 flex items-center justify-center min-h-[500px]">
          <h1 className="text-4xl font-bold text-white">Gradient Background</h1>
        </div>
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
        story: 'Default purple gradient positioned at the top.',
      },
    },
  },
};

export const Bottom: Story = {
  args: { position: 'bottom', offset: '-50%' },
  parameters: {
    docs: {
      description: {
        story: 'Gradient positioned at the bottom of the container.',
      },
    },
  },
};

export const CustomColors: Story = {
  args: {
    colors: {
      start: 'rgba(0, 100, 200, 0.9)',
      middle1: 'rgba(0, 80, 180, 0.7)',
      middle2: 'rgba(0, 60, 160, 0.6)',
      middle3: 'rgba(0, 40, 140, 0.4)',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Gradient with custom blue color scheme.',
      },
    },
  },
};
