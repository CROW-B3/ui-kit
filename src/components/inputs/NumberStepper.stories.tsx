import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { NumberStepper } from './NumberStepper';

const meta: Meta<typeof NumberStepper> = {
  title: 'Inputs/NumberStepper',
  component: NumberStepper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A numeric input with increment and decrement buttons for adjusting values within a range.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { NumberStepper } from '@aspect/ui-kit';
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
  args: { defaultValue: 1 },
  parameters: {
    docs: {
      description: {
        story: 'Default number stepper with increment and decrement buttons.',
      },
    },
  },
};

export const WithLabel: Story = {
  args: { label: 'Quantity', defaultValue: 5 },
  parameters: {
    docs: {
      description: {
        story: 'Number stepper with a label above the control.',
      },
    },
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Items',
    description: 'Max 10 items per order',
    defaultValue: 1,
    max: 10,
  },
  parameters: {
    docs: {
      description: {
        story: 'Number stepper with label and helper description text.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-6">
      <NumberStepper size="sm" label="Small" defaultValue={1} />
      <NumberStepper size="md" label="Medium" defaultValue={1} />
      <NumberStepper size="lg" label="Large" defaultValue={1} />
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

export const CustomFormat: Story = {
  args: {
    label: 'Price',
    defaultValue: 10,
    step: 5,
    formatDisplay: value => `$${value}`,
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom display format using the formatDisplay prop.',
      },
    },
  },
};

export const Interactive: Story = {
  render: function Component() {
    const [value, setValue] = useState(5);
    return (
      <div className="flex flex-col items-center gap-4">
        <NumberStepper
          label="Count"
          value={value}
          onChange={setValue}
          min={0}
          max={20}
        />
        <p className="text-sm text-gray-400">Value: {value}</p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled number stepper with external state management.',
      },
    },
  },
};
