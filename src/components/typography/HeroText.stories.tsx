import type { Meta, StoryObj } from '@storybook/react';
import { HeroText } from './HeroText';

const meta: Meta<typeof HeroText> = {
  title: 'Typography/HeroText',
  component: HeroText,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A large animated hero text component with gradient styling, ideal for landing page headlines.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { HeroText } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="min-h-[600px] w-max flex items-center justify-center bg-[#0a0a0f] p-8">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: 'CROW',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default hero text with the standard purple gradient.',
      },
    },
  },
};

export const CustomGradient: Story = {
  args: {
    text: 'HELLO',
    gradient:
      'linear-gradient(70deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #e94560 100%)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero text with a custom red-to-blue gradient.',
      },
    },
  },
};

export const BlueGradient: Story = {
  args: {
    text: 'BUILD',
    gradient:
      'linear-gradient(70deg, #0c0c1d 0%, #1a1a3e 25%, #2d2d6e 50%, #4a4aae 75%, #6b6bce 100%)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero text with a blue color gradient.',
      },
    },
  },
};

export const GreenGradient: Story = {
  args: {
    text: 'GROW',
    gradient:
      'linear-gradient(70deg, #0d1f0d 0%, #1a3a1a 25%, #2d5a2d 50%, #3d7a3d 75%, #4d9a4d 100%)',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero text with a green color gradient.',
      },
    },
  },
};

export const ShortText: Story = {
  args: {
    text: 'AI',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero text with short two-letter content.',
      },
    },
  },
};

export const LongText: Story = {
  args: {
    text: 'INNOVATION',
  },
  parameters: {
    docs: {
      description: {
        story: 'Hero text demonstrating longer text content.',
      },
    },
  },
};
