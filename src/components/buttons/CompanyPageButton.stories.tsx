import type { Meta, StoryObj } from '@storybook/react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
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
      <div className="w-[280px]">
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
  args: { platform: 'LinkedIn', icon: <FaLinkedin /> },
  parameters: {
    docs: {
      description: {
        story: 'Button with a platform icon displayed alongside the name.',
      },
    },
  },
};

export const Connected: Story = {
  args: { platform: 'GitHub', icon: <FaGithub />, connected: true },
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
      <CompanyPageButton platform="LinkedIn" icon={<FaLinkedin />} />
      <CompanyPageButton platform="Twitter" icon={<FaTwitter />} connected />
      <CompanyPageButton platform="GitHub" icon={<FaGithub />} />
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
