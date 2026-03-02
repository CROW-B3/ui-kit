import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SearchInput } from './SearchInput';

const meta: Meta<typeof SearchInput> = {
  title: 'Inputs/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A search input with optional voice input button and submit functionality.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { SearchInput } from '@aspect/ui-kit';
\`\`\`
      `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'transparent'],
    },
  },
  decorators: [
    Story => (
      <div className="w-full max-w-[480px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default search input with mic and submit buttons.',
      },
    },
  },
};

export const WithHelperText: Story = {
  args: {
    placeholder: 'Ask me anything...',
    helperText: 'Press Enter to search or click the arrow button',
  },
  parameters: {
    docs: {
      description: {
        story: 'Search input with helper text below the field.',
      },
    },
  },
};

export const WithoutMicButton: Story = {
  args: {
    placeholder: 'Search...',
    showMicButton: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Search input without the voice input button.',
      },
    },
  },
};

export const Transparent: Story = {
  args: {
    placeholder: 'Search...',
    variant: 'transparent',
  },
  parameters: {
    docs: {
      description: {
        story: 'Transparent variant for overlay contexts.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Search disabled...',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled search input that cannot be interacted with.',
      },
    },
  },
};

export const Interactive: Story = {
  render: function Component() {
    const [value, setValue] = useState('');
    const [submitted, setSubmitted] = useState('');

    return (
      <div className="flex flex-col gap-4">
        <SearchInput
          placeholder="Type and press Enter..."
          value={value}
          onChange={setValue}
          onSubmit={val => setSubmitted(val)}
        />
        {submitted && (
          <p className="text-sm text-gray-400">
            You searched for: <span className="text-white">{submitted}</span>
          </p>
        )}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive search with submit feedback.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <SearchInput variant="default" placeholder="Default variant" />
      <SearchInput variant="transparent" placeholder="Transparent variant" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available style variants: default and transparent.',
      },
    },
  },
};
