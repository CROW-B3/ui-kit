import type { Meta, StoryObj } from '@storybook/react';
import { GeneratingState } from './GeneratingState';

const meta: Meta<typeof GeneratingState> = {
  title: 'Feedback/GeneratingState',
  component: GeneratingState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
An animated loading indicator that displays a processing state with optional orbital rings and pulsing dots.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { GeneratingState } from '@aspect/ui-kit';
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
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Default generating state with all visual elements enabled.',
      },
    },
  },
};

export const CustomLabel: Story = {
  args: {
    label: 'Analyzing your data',
    subtitle: 'Analyzing',
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom label and subtitle text for different loading contexts.',
      },
    },
  },
};

export const NoDots: Story = {
  args: {
    label: 'Loading content',
    showDots: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Generating state without the animated dots indicator.',
      },
    },
  },
};

export const NoOrbitals: Story = {
  args: {
    label: 'Fetching results',
    showOrbitals: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Generating state without the orbital ring animations.',
      },
    },
  },
};

export const Minimal: Story = {
  args: {
    label: 'Please wait',
    showDots: false,
    showOrbitals: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal generating state with only the avatar and label.',
      },
    },
  },
};
