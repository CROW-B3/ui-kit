import type { Meta, StoryObj } from '@storybook/react';
import { Mail, Search } from 'lucide-react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Inputs/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A versatile text input component with support for labels, icons, validation errors, and multiple variants.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { Input } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'outline'],
    },
    inputSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    iconPosition: {
      control: 'select',
      options: ['left', 'right'],
    },
  },
  decorators: [
    Story => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default input with placeholder text.',
      },
    },
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'you@example.com',
    type: 'email',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with a label above the field.',
      },
    },
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter password',
    type: 'password',
    error: 'Password must be at least 8 characters',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input displaying a validation error message.',
      },
    },
  },
};

export const WithIcon: Story = {
  args: {
    placeholder: 'Search...',
    icon: <Search className="w-full h-full" />,
    iconPosition: 'left',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with an icon positioned on the left.',
      },
    },
  },
};

export const IconRight: Story = {
  args: {
    placeholder: 'Enter email',
    icon: <Mail className="w-full h-full" />,
    iconPosition: 'right',
  },
  parameters: {
    docs: {
      description: {
        story: 'Input with an icon positioned on the right.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input variant="primary" placeholder="Primary variant" />
      <Input variant="secondary" placeholder="Secondary variant" />
      <Input variant="outline" placeholder="Outline variant" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available style variants: primary, secondary, and outline.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Input inputSize="sm" placeholder="Small input" />
      <Input inputSize="md" placeholder="Medium input" />
      <Input inputSize="lg" placeholder="Large input" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available sizes: small, medium, and large.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled input that cannot be interacted with.',
      },
    },
  },
};
