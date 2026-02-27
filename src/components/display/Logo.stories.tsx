import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from './Logo';

const crowLogo = '/favicon.webp';

const meta: Meta<typeof Logo> = {
  title: 'Display/Logo',
  component: Logo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A logo component with optional text and configurable size, position, and entrance animations.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { Logo } from '@aspect/ui-kit';
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
  args: { src: crowLogo, alt: 'Logo' },
  parameters: {
    docs: {
      description: {
        story: 'Default logo with slide-in animation.',
      },
    },
  },
};

export const WithText: Story = {
  args: { src: crowLogo, alt: 'Logo', text: 'CROW' },
  parameters: {
    docs: {
      description: {
        story: 'Logo with accompanying text label.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-6">
      <Logo src={crowLogo} alt="Small" size="sm" disableAnimation />
      <Logo src={crowLogo} alt="Medium" size="md" disableAnimation />
      <Logo src={crowLogo} alt="Large" size="lg" disableAnimation />
      <Logo src={crowLogo} alt="XL" size="xl" disableAnimation />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available size variants from small to extra-large.',
      },
    },
  },
};

export const NoAnimation: Story = {
  args: { src: crowLogo, alt: 'Logo', disableAnimation: true },
  parameters: {
    docs: {
      description: {
        story: 'Logo with entrance animation disabled.',
      },
    },
  },
};
