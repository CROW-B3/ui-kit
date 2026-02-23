import type { Meta, StoryObj } from '@storybook/react';
import { TypewriterText } from './TypewriterText';

const meta: Meta<typeof TypewriterText> = {
  title: 'Typography/TypewriterText',
  component: TypewriterText,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A typewriter-style text component that animates text character by character with a blinking cursor.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { TypewriterText } from '@aspect/ui-kit';
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
  args: { text: 'Hello World' },
  parameters: {
    docs: {
      description: {
        story: 'Default typewriter animation with greeting text.',
      },
    },
  },
};

export const Loading: Story = {
  args: { text: 'Loading...' },
  parameters: {
    docs: {
      description: {
        story: 'Typewriter text used as a loading indicator.',
      },
    },
  },
};

export const Status: Story = {
  args: { text: 'System Online' },
  parameters: {
    docs: {
      description: {
        story: 'Typewriter text displaying a system status message.',
      },
    },
  },
};
