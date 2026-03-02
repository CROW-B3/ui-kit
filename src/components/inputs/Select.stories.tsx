import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta: Meta<typeof Select> = {
  title: 'Inputs/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A custom dropdown select component with keyboard navigation, type-ahead search, and accessibility support.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { Select } from '@aspect/ui-kit';
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
    selectSize: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
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

const defaultOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
];

const countryOptions = [
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
];

export const Default: Story = {
  args: {
    options: defaultOptions,
    placeholder: 'Select an option...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default select dropdown with placeholder.',
      },
    },
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select with a label above the dropdown.',
      },
    },
  },
};

export const WithDefaultValue: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    defaultValue: 'uk',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select with a pre-selected default value.',
      },
    },
  },
};

export const WithError: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country...',
    error: 'Please select a country',
  },
  parameters: {
    docs: {
      description: {
        story: 'Select displaying a validation error message.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Select
        variant="primary"
        options={defaultOptions}
        placeholder="Primary variant"
      />
      <Select
        variant="secondary"
        options={defaultOptions}
        placeholder="Secondary variant"
      />
      <Select
        variant="outline"
        options={defaultOptions}
        placeholder="Outline variant"
      />
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
      <Select
        selectSize="sm"
        options={defaultOptions}
        placeholder="Small select"
      />
      <Select
        selectSize="md"
        options={defaultOptions}
        placeholder="Medium select"
      />
      <Select
        selectSize="lg"
        options={defaultOptions}
        placeholder="Large select"
      />
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
