import type { Meta, StoryObj } from '@storybook/react';
import { OrderSummaryCard } from './OrderSummaryCard';

const meta: Meta<typeof OrderSummaryCard> = {
  title: 'Cards/OrderSummaryCard',
  component: OrderSummaryCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
An animated order summary card displaying line items, subtotal, tax, and total with optional footer.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { OrderSummaryCard } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[340px]">
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
      { label: 'Plan', value: 'Pro Monthly' },
      { label: 'Seats', value: '5 users' },
    ],
    subtotal: { label: 'Subtotal', amount: '$145.00' },
    tax: { label: 'Tax', amount: '$14.50' },
    total: { label: 'Total', amount: '$159.50' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Complete order summary with subtotal, tax, and total.',
      },
    },
  },
};

export const WithChangePlan: Story = {
  args: {
    items: [
      { label: 'Plan', value: 'Enterprise' },
      { label: 'Billing', value: 'Annual' },
    ],
    total: { label: 'Total', amount: '$1,999/year' },
    onChangePlan: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Order summary with change plan action button.',
      },
    },
  },
};

export const WithFooter: Story = {
  args: {
    items: [{ label: 'Item', value: 'Premium Support' }],
    total: { label: 'Total', amount: '$99.00' },
    footer: 'Secure payment powered by Stripe',
  },
  parameters: {
    docs: {
      description: {
        story: 'Order summary with footer text for payment info.',
      },
    },
  },
};

export const CalculatingTax: Story = {
  args: {
    items: [{ label: 'Plan', value: 'Starter' }],
    subtotal: { label: 'Subtotal', amount: '$29.00' },
    tax: { label: 'Tax', amount: 'Calculating...', isCalculating: true },
    total: { label: 'Total', amount: '$29.00+' },
  },
  parameters: {
    docs: {
      description: {
        story: 'Order summary showing tax calculation in progress.',
      },
    },
  },
};
