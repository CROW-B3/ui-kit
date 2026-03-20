import type { Meta, StoryObj } from '@storybook/react';
import { PackageManagerSelector } from './PackageManagerSelector';

const meta: Meta<typeof PackageManagerSelector> = {
  title: 'Display/PackageManagerSelector',
  component: PackageManagerSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A toggle selector for choosing between package managers (bun, npm, pnpm, yarn).

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { PackageManagerSelector } from '@aspect/ui-kit';
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
  args: { defaultManager: 'bun' },
  parameters: {
    docs: {
      description: {
        story: 'Default selector with Bun pre-selected.',
      },
    },
  },
};

export const Npm: Story = {
  args: { defaultManager: 'npm' },
  parameters: {
    docs: {
      description: {
        story: 'Selector with npm pre-selected.',
      },
    },
  },
};

export const Pnpm: Story = {
  args: { defaultManager: 'pnpm' },
  parameters: {
    docs: {
      description: {
        story: 'Selector with pnpm pre-selected.',
      },
    },
  },
};

export const Yarn: Story = {
  args: { defaultManager: 'yarn' },
  parameters: {
    docs: {
      description: {
        story: 'Selector with Yarn pre-selected.',
      },
    },
  },
};

export const WithCallback: Story = {
  args: {
    defaultManager: 'bun',
    onChange: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Selector with onChange callback handler.',
      },
    },
  },
};
