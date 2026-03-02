import type { Meta, StoryObj } from '@storybook/react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import { CompanyPageButton } from './CompanyPageButton';

const meta: Meta<typeof CompanyPageButton> = {
  title: 'Buttons/CompanyPageButton',
  component: CompanyPageButton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A button for linking to company social media pages with platform icons and connection status.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { CompanyPageButton } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-full max-w-[280px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { platform: 'LinkedIn' },
  parameters: {
    docs: {
      description: {
        story: 'Basic button with platform name only.',
      },
    },
  },
};

export const WithIcon: Story = {
  args: { platform: 'LinkedIn', icon: <Linkedin /> },
  parameters: {
    docs: {
      description: {
        story: 'Button with a platform icon displayed alongside the name.',
      },
    },
  },
};

export const Connected: Story = {
  args: { platform: 'GitHub', icon: <Github />, connected: true },
  parameters: {
    docs: {
      description: {
        story: 'Button showing an active connection state with violet styling.',
      },
    },
  },
};

export const AllPlatforms: Story = {
  render: () => (
    <div className="flex flex-col gap-2">
      <CompanyPageButton platform="LinkedIn" icon={<Linkedin />} />
      <CompanyPageButton platform="Twitter" icon={<Twitter />} connected />
      <CompanyPageButton platform="GitHub" icon={<Github />} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Multiple platform buttons displayed together with mixed connection states.',
      },
    },
  },
};
