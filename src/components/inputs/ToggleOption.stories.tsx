import type { Meta, StoryObj } from '@storybook/react';
import { Bell } from 'lucide-react';
import { useState } from 'react';
import { ToggleOption } from './ToggleOption';

const meta: Meta<typeof ToggleOption> = {
  title: 'Inputs/ToggleOption',
  component: ToggleOption,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A toggle switch with label and optional description for boolean settings.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { ToggleOption } from '@aspect/ui-kit';
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
  args: { label: 'Enable feature' },
  parameters: {
    docs: {
      description: {
        story: 'Default toggle option with a label.',
      },
    },
  },
};

export const WithDescription: Story = {
  args: { label: 'Dark Mode', description: 'Use dark theme across the app' },
  parameters: {
    docs: {
      description: {
        story: 'Toggle option with label and description text.',
      },
    },
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Notifications',
    description: 'Receive alerts',
    icon: <Bell size={16} />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle option with an icon next to the label.',
      },
    },
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ToggleOption label="Default" variant="default" defaultChecked />
      <ToggleOption label="Primary" variant="primary" defaultChecked />
      <ToggleOption label="Success" variant="success" defaultChecked />
      <ToggleOption label="Warning" variant="warning" defaultChecked />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Available color variants: default, primary, success, and warning.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ToggleOption label="Small" size="sm" />
      <ToggleOption label="Medium" size="md" />
      <ToggleOption label="Large" size="lg" />
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

export const VerticalLayout: Story = {
  args: {
    label: 'Feature',
    description: 'Toggle this feature',
    layout: 'vertical',
  },
  parameters: {
    docs: {
      description: {
        story: 'Vertical layout with toggle above the label.',
      },
    },
  },
};

export const Disabled: Story = {
  args: { label: 'Disabled option', disabled: true },
  parameters: {
    docs: {
      description: {
        story: 'Disabled toggle that cannot be interacted with.',
      },
    },
  },
};

export const Interactive: Story = {
  render: function Component() {
    const [checked, setChecked] = useState(false);
    return (
      <ToggleOption
        label="Interactive Toggle"
        description={checked ? 'Currently enabled' : 'Currently disabled'}
        checked={checked}
        onChange={setChecked}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled toggle with external state management.',
      },
    },
  },
};
