import type { Meta, StoryObj } from '@storybook/react';
import { LuCheck } from 'react-icons/lu';
import { PlanCard } from './PlanCard';

const meta: Meta<typeof PlanCard> = {
  title: 'Cards/PlanCard',
  component: PlanCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A flexible pricing plan card with header, pricing, specs, features, and action buttons.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { PlanCard } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    header: {
      title: 'Starter',
      description: 'For individuals getting started',
    },
    price: { amount: '$9', period: 'mo' },
    features: [
      { icon: <LuCheck />, text: '5 Projects' },
      { icon: <LuCheck />, text: '10GB Storage' },
      { icon: <LuCheck />, text: 'Basic Support' },
    ],
    footer: { buttons: [{ text: 'Get Started', variant: 'outline' }] },
    animated: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic starter plan card with features list.',
      },
    },
  },
};

export const Recommended: Story = {
  args: {
    header: { title: 'Pro', description: 'For growing teams' },
    price: { amount: '$29', period: 'mo' },
    recommended: true,
    features: [
      { icon: <LuCheck />, text: 'Unlimited Projects', variant: 'highlighted' },
      { icon: <LuCheck />, text: '100GB Storage' },
      { icon: <LuCheck />, text: 'Priority Support' },
    ],
    footer: { buttons: [{ text: 'Start Free Trial', variant: 'primary' }] },
    animated: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Recommended plan with badge and primary action button.',
      },
    },
  },
};

export const WithSpecs: Story = {
  args: {
    header: {
      badge: 'ENTERPRISE',
      title: 'Business',
      description: 'For large organizations',
    },
    price: { amount: '$99', period: 'mo' },
    specs: [
      { label: 'API Calls', value: 'Unlimited', highlighted: true },
      { label: 'Team Members', value: 'Unlimited' },
    ],
    features: [
      { icon: <LuCheck />, text: 'Everything in Pro' },
      { icon: <LuCheck />, text: 'SSO Integration' },
    ],
    footer: { buttons: [{ text: 'Contact Sales', variant: 'secondary' }] },
    animated: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Enterprise plan with specs section and badge.',
      },
    },
  },
};

export const WithCheckbox: Story = {
  args: {
    header: { title: 'Basic', description: 'Essential features' },
    price: { amount: '$0', period: 'mo' },
    showCheckbox: true,
    selected: true,
    features: [
      { icon: <LuCheck />, text: '1 Project' },
      { icon: <LuCheck />, text: '1GB Storage', variant: 'disabled' },
    ],
    animated: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Selectable plan card with checkbox for plan comparison.',
      },
    },
  },
};
