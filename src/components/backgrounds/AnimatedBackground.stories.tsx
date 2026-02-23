import type { Meta, StoryObj } from '@storybook/react';
import { AnimatedBackground } from './AnimatedBackground';

const meta: Meta<typeof AnimatedBackground> = {
  title: 'Backgrounds/AnimatedBackground',
  component: AnimatedBackground,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A decorative background component with animated drifting glow effects and optional scroll-based vertical fade.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { AnimatedBackground } from '@aspect/ui-kit';
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
          <h1 className="text-4xl font-bold text-white">
            Content Over Background
          </h1>
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
        story: 'Default animated background with purple glow effects.',
      },
    },
  },
};

export const CustomColors: Story = {
  args: {
    primaryGlowColor: '#00ff88',
    secondaryGlowColor: '#ffffff',
    tertiaryGlowColor: '#88ffcc',
  },
  parameters: {
    docs: {
      description: {
        story: 'Animated background with custom green glow colors.',
      },
    },
  },
};

export const WithVerticalFade: Story = {
  args: { enableVerticalFade: true, fadeIntensity: 0.7 },
  parameters: {
    docs: {
      description: {
        story: 'Background with scroll-responsive vertical fade overlay.',
      },
    },
  },
};
