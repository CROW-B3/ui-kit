import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { SidebarLogo } from './SidebarLogo';

const meta: Meta<typeof SidebarLogo> = {
  title: 'Layout/SidebarLogo',
  component: SidebarLogo,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A sidebar logo component with title, subtitle, and collapsible toggle button.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { SidebarLogo } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[260px] bg-black/30 p-4 rounded-lg">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    logoSrc: '/favicon.webp',
    title: 'CROW',
    subtitle: 'CLIENT',
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic logo with title and subtitle.',
      },
    },
  },
};

export const Collapsed: Story = {
  args: {
    logoSrc: '/favicon.webp',
    title: 'CROW',
    subtitle: 'CLIENT',
    isCollapsed: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Collapsed state showing only the logo.',
      },
    },
  },
};

export const Interactive: Story = {
  render: function Component() {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div
        style={{ width: collapsed ? '80px' : '260px' }}
        className="transition-all"
      >
        <SidebarLogo
          logoSrc="/favicon.webp"
          title="CROW"
          subtitle="CLIENT"
          isCollapsed={collapsed}
          onToggleCollapse={() => setCollapsed(!collapsed)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo with collapse toggle.',
      },
    },
  },
};

export const CustomBranding: Story = {
  args: {
    logoSrc: '/favicon.webp',
    title: 'ACME',
    subtitle: 'DASHBOARD',
  },
  parameters: {
    docs: {
      description: {
        story: 'Custom branding with different title and subtitle.',
      },
    },
  },
};
