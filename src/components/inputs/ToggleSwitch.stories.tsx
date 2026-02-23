import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ToggleSwitch } from './ToggleSwitch';

const meta: Meta<typeof ToggleSwitch> = {
  title: 'Inputs/ToggleSwitch',
  component: ToggleSwitch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A simple toggle switch component for on/off states with size variants.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { ToggleSwitch } from '@aspect/ui-kit';
\`\`\`
      `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'default'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    enabled: false,
    'aria-label': 'Toggle setting',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default toggle switch in off state.',
      },
    },
  },
};

export const Enabled: Story = {
  args: {
    enabled: true,
    'aria-label': 'Toggle setting',
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle switch in on state.',
      },
    },
  },
};

export const Interactive: Story = {
  render: function Component() {
    const [enabled, setEnabled] = useState(false);
    return (
      <div className="flex items-center gap-3">
        <ToggleSwitch
          enabled={enabled}
          onChange={setEnabled}
          aria-label="Toggle notifications"
        />
        <span className="text-sm text-gray-400">
          Notifications {enabled ? 'enabled' : 'disabled'}
        </span>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive toggle with state feedback.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <ToggleSwitch enabled={true} size="sm" aria-label="Small toggle" />
        <span className="text-xs text-gray-400">Small</span>
      </div>
      <div className="flex items-center gap-2">
        <ToggleSwitch
          enabled={true}
          size="default"
          aria-label="Default toggle"
        />
        <span className="text-xs text-gray-400">Default</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Available sizes: small and default.',
      },
    },
  },
};

export const WithLabel: Story = {
  render: function Component() {
    const [enabled, setEnabled] = useState(true);
    return (
      <div className="flex items-center justify-between w-64 p-4 rounded-lg bg-white/5 border border-white/10">
        <div>
          <p className="text-sm text-white">Dark Mode</p>
          <p className="text-xs text-gray-500">Enable dark theme</p>
        </div>
        <ToggleSwitch
          enabled={enabled}
          onChange={setEnabled}
          aria-label="Toggle dark mode"
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Toggle switch used within a settings card.',
      },
    },
  },
};

export const ReadOnly: Story = {
  args: {
    enabled: true,
    'aria-label': 'Read-only toggle',
  },
  parameters: {
    docs: {
      description: {
        story: 'Read-only toggle without onChange handler.',
      },
    },
  },
};
