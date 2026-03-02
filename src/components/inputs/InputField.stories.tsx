import type { Meta, StoryObj } from '@storybook/react';
import { InputField } from './InputField';

const meta: Meta<typeof InputField> = {
  title: 'Inputs/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
An animated input field with optional submit button, perfect for search or chat-style interfaces.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { InputField } from '@aspect/ui-kit';
\`\`\`
      `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-full max-w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: 'Ask anything...' },
  parameters: {
    docs: {
      description: {
        story: 'Default input field with a submit button.',
      },
    },
  },
};

export const WithoutButton: Story = {
  args: { placeholder: 'Type here...', showButton: false },
  parameters: {
    docs: {
      description: {
        story: 'Input field without the submit button.',
      },
    },
  },
};

export const Filled: Story = {
  args: { placeholder: 'Search...', variant: 'filled' },
  parameters: {
    docs: {
      description: {
        story: 'Filled variant with a subtle background.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <InputField size="sm" placeholder="Small" />
      <InputField size="md" placeholder="Medium" />
      <InputField size="lg" placeholder="Large" />
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
  args: { placeholder: 'Disabled input', disabled: true },
  parameters: {
    docs: {
      description: {
        story: 'Disabled input field that cannot be interacted with.',
      },
    },
  },
};

export const ButtonLeft: Story = {
  args: { placeholder: 'Button on left', buttonPosition: 'left' },
  parameters: {
    docs: {
      description: {
        story: 'Input field with the submit button positioned on the left.',
      },
    },
  },
};
