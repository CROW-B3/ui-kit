import type { Meta, StoryObj } from '@storybook/react';
import { LinkGroup } from './LinkGroup';

const meta: Meta<typeof LinkGroup> = {
  title: 'Layout/LinkGroup',
  component: LinkGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A horizontal group of navigation links with customizable dividers and spacing.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { LinkGroup } from '@aspect/ui-kit';
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
  args: {
    links: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic link group with dot dividers.',
      },
    },
  },
};

export const LineDivider: Story = {
  args: {
    links: [
      { label: 'Terms', href: '/terms' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Cookies', href: '/cookies' },
    ],
    divider: 'line',
  },
  parameters: {
    docs: {
      description: {
        story: 'Link group with vertical line dividers.',
      },
    },
  },
};

export const NoDivider: Story = {
  args: {
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Docs', href: '/docs' },
    ],
    divider: 'none',
    spacing: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Link group without dividers and large spacing.',
      },
    },
  },
};

export const Variants: Story = {
  args: {
    links: [
      { label: 'Primary', href: '#', variant: 'primary' },
      { label: 'Secondary', href: '#', variant: 'secondary' },
      { label: 'Muted', href: '#', variant: 'muted' },
    ],
  },
  parameters: {
    docs: {
      description: {
        story: 'Different link color variants in one group.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <LinkGroup
        size="xs"
        links={[
          { label: 'XS Link', href: '#' },
          { label: 'Another', href: '#' },
        ]}
      />
      <LinkGroup
        size="sm"
        links={[
          { label: 'SM Link', href: '#' },
          { label: 'Another', href: '#' },
        ]}
      />
      <LinkGroup
        size="md"
        links={[
          { label: 'MD Link', href: '#' },
          { label: 'Another', href: '#' },
        ]}
      />
      <LinkGroup
        size="lg"
        links={[
          { label: 'LG Link', href: '#' },
          { label: 'Another', href: '#' },
        ]}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available size options from xs to lg.',
      },
    },
  },
};
