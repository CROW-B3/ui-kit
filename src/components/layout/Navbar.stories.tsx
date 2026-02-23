import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../buttons/Button';
import { Navbar, NavLink } from './Navbar';

const meta: Meta<typeof Navbar> = {
  title: 'Layout/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A responsive navigation bar with logo, center content, and right content areas.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { Navbar, NavLink } from '@aspect/ui-kit';
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
    logo: { text: 'CROW', src: '/favicon.webp' },
    animate: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic navbar with logo only.',
      },
    },
  },
};

export const WithRightContent: Story = {
  args: {
    logo: { text: 'CROW', src: '/favicon.webp' },
    rightContent: (
      <>
        <NavLink href="/docs" variant="ghost">
          Docs
        </NavLink>
        <NavLink href="/pricing" variant="ghost">
          Pricing
        </NavLink>
        <Button variant="outline" size="sm">
          Get Started
        </Button>
      </>
    ),
    animate: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Navbar with navigation links and CTA button.',
      },
    },
  },
};

export const Centered: Story = {
  args: {
    variant: 'centered',
    logo: { text: 'CROW', src: '/favicon.webp' },
    centerContent: (
      <>
        <NavLink href="/features" variant="ghost">
          Features
        </NavLink>
        <NavLink href="/pricing" variant="ghost">
          Pricing
        </NavLink>
        <NavLink href="/docs" variant="ghost">
          Docs
        </NavLink>
      </>
    ),
    rightContent: (
      <Button variant="outline" size="sm">
        Sign In
      </Button>
    ),
    animate: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Centered variant with navigation in the middle.',
      },
    },
  },
};

export const Animated: Story = {
  args: {
    logo: { text: 'CROW', src: '/favicon.webp' },
    rightContent: (
      <Button variant="outline" size="sm">
        Start
      </Button>
    ),
    animate: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Navbar with entrance animations enabled.',
      },
    },
  },
};
