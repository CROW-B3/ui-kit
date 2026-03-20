import type { Meta, StoryObj } from '@storybook/react';
import { Subtitle } from './Subtitle';

const meta: Meta<typeof Subtitle> = {
  title: 'Typography/Subtitle',
  component: Subtitle,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
An animated subtitle text component with fade-in effect, designed for secondary text beneath hero sections.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { Subtitle } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="max-w-2xl">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'A powerful platform for building modern applications with ease.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default subtitle with standard content length.',
      },
    },
  },
};

export const LongText: Story = {
  args: {
    children:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Subtitle with longer paragraph text demonstrating text wrapping.',
      },
    },
  },
};
