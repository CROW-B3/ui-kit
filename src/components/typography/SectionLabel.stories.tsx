import type { Meta, StoryObj } from '@storybook/react';
import { SectionLabel } from './SectionLabel';

const meta: Meta<typeof SectionLabel> = {
  title: 'Typography/SectionLabel',
  component: SectionLabel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A monospace section label with optional fade-in animation, styled with brackets for a technical aesthetic.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { SectionLabel } from '@aspect/ui-kit';
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
  args: { label: 'Features' },
  parameters: {
    docs: {
      description: {
        story: 'Default section label with fade-in animation.',
      },
    },
  },
};

export const NoAnimation: Story = {
  args: { label: 'About Us', animate: false },
  parameters: {
    docs: {
      description: {
        story: 'Section label without animation for static rendering.',
      },
    },
  },
};

export const Multiple: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <SectionLabel label="Introduction" />
      <SectionLabel label="Features" />
      <SectionLabel label="Pricing" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple section labels demonstrating consistent styling.',
      },
    },
  },
};
