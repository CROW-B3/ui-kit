import type { Meta, StoryObj } from '@storybook/react';
import { CheckoutSummary } from './CheckoutSummary';

const meta: Meta<typeof CheckoutSummary> = {
  title: 'Cards/CheckoutSummary',
  component: CheckoutSummary,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A checkout summary bar displaying line items, totals, and action buttons for e-commerce flows.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { CheckoutSummary } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[800px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'Plan', value: 'Pro' },
      { label: 'Seats', value: '5' },
    ],
    total: { amount: '$99', period: 'mo' },
    primaryAction: { text: 'Checkout' },
    position: 'static',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic checkout summary with plan details and a checkout button.',
      },
    },
  },
};

export const WithHighlight: Story = {
  args: {
    items: [
      { label: 'Plan', value: 'Enterprise', highlightValue: true },
      { label: 'Billing', value: 'Annual' },
      { label: 'Discount', value: '20%', highlightValue: true },
    ],
    total: { amount: '$499', period: 'year' },
    primaryAction: { text: 'Subscribe Now' },
    position: 'static',
  },
  parameters: {
    docs: {
      description: {
        story: 'Checkout summary with highlighted values for emphasis.',
      },
    },
  },
};

export const Glass: Story = {
  args: {
    items: [{ label: 'Items', value: '3' }],
    total: { amount: '$150' },
    variant: 'glass',
    position: 'static',
  },
  parameters: {
    docs: {
      description: {
        story: 'Glass variant with frosted backdrop effect.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <CheckoutSummary
        size="sm"
        items={[{ label: 'Plan', value: 'Basic' }]}
        total={{ amount: '$9' }}
        position="static"
      />
      <CheckoutSummary
        size="md"
        items={[{ label: 'Plan', value: 'Pro' }]}
        total={{ amount: '$29' }}
        position="static"
      />
      <CheckoutSummary
        size="lg"
        items={[{ label: 'Plan', value: 'Team' }]}
        total={{ amount: '$99' }}
        position="static"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Comparison of small, medium, and large size variants.',
      },
    },
  },
};
