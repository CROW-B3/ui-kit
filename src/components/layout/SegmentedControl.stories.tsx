import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SegmentedControl } from './SegmentedControl';

const meta: Meta<typeof SegmentedControl> = {
  title: 'Layout/SegmentedControl',
  component: SegmentedControl,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A two-option toggle control for switching between states like billing periods or view modes.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { SegmentedControl } from '@aspect/ui-kit';
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
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { label: 'Monthly', value: 'monthly' },
      { label: 'Yearly', value: 'yearly' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic two-option toggle control.',
      },
    },
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Billing Period',
    options: [
      { label: 'Monthly', value: 'monthly' },
      { label: 'Yearly', value: 'yearly' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Control with uppercase label above.',
      },
    },
  },
};

export const WithDescription: Story = {
  args: {
    label: 'Billing',
    description: 'Save 20% with yearly billing',
    options: [
      { label: 'Monthly', value: 'monthly' },
      { label: 'Yearly', value: 'yearly' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Control with label and helper description.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6 items-center">
      <SegmentedControl
        size="sm"
        options={[
          { label: 'Small', value: 'a' },
          { label: 'Size', value: 'b' },
        ]}
      />
      <SegmentedControl
        size="md"
        options={[
          { label: 'Medium', value: 'a' },
          { label: 'Size', value: 'b' },
        ]}
      />
      <SegmentedControl
        size="lg"
        options={[
          { label: 'Large', value: 'a' },
          { label: 'Size', value: 'b' },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available size options: sm, md, and lg.',
      },
    },
  },
};

export const Interactive: Story = {
  render: function Component() {
    const [value, setValue] = useState<'light' | 'dark'>('dark');
    return (
      <div className="flex flex-col items-center gap-4">
        <SegmentedControl
          label="Theme"
          value={value}
          onChange={setValue}
          options={[
            { label: 'Light', value: 'light' },
            { label: 'Dark', value: 'dark' },
          ]}
        />
        <p className="text-sm text-gray-400">
          Current theme: <span className="text-white">{value}</span>
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled component with state management.',
      },
    },
  },
};

export const ViewToggle: Story = {
  args: {
    options: [
      { label: 'Grid', value: 'grid' },
      { label: 'List', value: 'list' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'View mode toggle for content layouts.',
      },
    },
  },
};
