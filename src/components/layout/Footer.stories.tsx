import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
  title: 'Layout/Footer',
  component: Footer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A customizable footer component with invite links and terms sections.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { Footer } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Basic footer with invite and terms sections.',
      },
    },
  },
};

export const CustomLinks: Story = {
  args: {
    termsLinks: [
      { text: 'Terms of Service', href: '/terms' },
      { text: 'Privacy Policy', href: '/privacy' },
      { text: 'Cookie Policy', href: '/cookies' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Footer with custom terms links configuration.',
      },
    },
  },
};

export const NoInvite: Story = {
  args: { showInviteSection: false },
  parameters: {
    docs: {
      description: {
        story: 'Footer without the invite section.',
      },
    },
  },
};

export const Horizontal: Story = {
  args: { layout: 'horizontal' },
  parameters: {
    docs: {
      description: {
        story: 'Horizontal layout with elements in a row.',
      },
    },
  },
};

export const LeftAligned: Story = {
  args: { align: 'left' },
  parameters: {
    docs: {
      description: {
        story: 'Left-aligned footer content.',
      },
    },
  },
};

export const WithCustomContent: Story = {
  args: {
    children: (
      <p className="text-xs text-gray-500">
        © 2024 Company. All rights reserved.
      </p>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Footer with custom children content like copyright.',
      },
    },
  },
};
