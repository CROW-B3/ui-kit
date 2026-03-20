import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Inputs/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A customizable checkbox component with support for multiple sizes, variants, and optional labels.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { Checkbox } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default checkbox with a label.',
      },
    },
  },
};

export const Checked: Story = {
  args: {
    label: 'I agree to the privacy policy',
    defaultChecked: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Checkbox in checked state by default.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox size="sm" label="Small checkbox" />
      <Checkbox size="md" label="Medium checkbox" />
      <Checkbox size="lg" label="Large checkbox" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available checkbox sizes: small, medium, and large.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox variant="primary" label="Primary variant" defaultChecked />
      <Checkbox variant="secondary" label="Secondary variant" defaultChecked />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Primary and secondary color variants.',
      },
    },
  },
};

export const WithoutLabel: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Checkbox without a label for icon-only usage.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled checkbox that cannot be interacted with.',
      },
    },
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked checkbox',
    disabled: true,
    defaultChecked: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled checkbox in checked state.',
      },
    },
  },
};
