import type { Meta, StoryObj } from '@storybook/react';
import { ApiKeyInput } from './ApiKeyInput';

const meta: Meta<typeof ApiKeyInput> = {
  title: 'Inputs/ApiKeyInput',
  component: ApiKeyInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A secure input field for displaying and managing API keys with reveal/hide and copy-to-clipboard functionality.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { ApiKeyInput } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-full max-w-[320px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { apiKey: 'sk-1234567890abcdefghijklmnop' },
  parameters: {
    docs: {
      description: {
        story: 'Default API key input with standard label and masked value.',
      },
    },
  },
};

export const CustomLabel: Story = {
  args: { apiKey: 'pk_test_abc123xyz789', label: 'Stripe API Key' },
  parameters: {
    docs: {
      description: {
        story: 'API key input with a custom label for specific services.',
      },
    },
  },
};

export const ShortKey: Story = {
  args: { apiKey: 'abc123', label: 'Short Key' },
  parameters: {
    docs: {
      description: {
        story: 'API key input with a shorter key value.',
      },
    },
  },
};
