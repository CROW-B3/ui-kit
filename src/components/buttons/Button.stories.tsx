import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Buttons/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A versatile button component with multiple variants, sizes, and optional arrow icon.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { Button } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'solid', 'outline', 'ghost'],
      description: 'Visual style variant of the button',
      table: {
        defaultValue: { summary: 'outline' },
      },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the button',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    showArrow: {
      control: 'boolean',
      description: 'Show an arrow icon after the button text',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
    href: {
      control: 'text',
      description: 'If provided, renders as an anchor tag',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Make the button full width',
      table: {
        defaultValue: { summary: 'false' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story:
          'The primary variant has a gradient background with glow effect. Use for main CTAs.',
      },
    },
  },
};

export const Solid: Story = {
  args: {
    children: 'Solid Button',
    variant: 'solid',
  },
  parameters: {
    docs: {
      description: {
        story: 'Solid purple button for secondary actions.',
      },
    },
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Button',
    variant: 'outline',
  },
  parameters: {
    docs: {
      description: {
        story: 'Outline variant with subtle border. Default variant.',
      },
    },
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost Button',
    variant: 'ghost',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Ghost variant with minimal styling. Great for tertiary actions.',
      },
    },
  },
};

export const WithArrow: Story = {
  args: {
    children: 'Learn More',
    variant: 'primary',
    showArrow: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Adding `showArrow` displays an arrow icon after the text. Useful for navigation CTAs.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available sizes: `sm`, `md`, `lg`, `xl`. Default is `md`.',
      },
    },
  },
};

export const AsLink: Story = {
  args: {
    children: 'Visit Website',
    href: 'https://example.com',
    showArrow: true,
    variant: 'primary',
  },
  parameters: {
    docs: {
      description: {
        story:
          'When `href` is provided, the button renders as an anchor tag. External links automatically get `target="_blank"` and `rel="noopener noreferrer"`.',
      },
    },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Button variant="primary">Primary</Button>
        <Button variant="solid">Solid</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All button variants side by side for comparison.',
      },
    },
  },
};
