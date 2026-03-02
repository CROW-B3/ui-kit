import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '../inputs/Input';
import { FormSection } from './FormSection';

const meta: Meta<typeof FormSection> = {
  title: 'Layout/FormSection',
  component: FormSection,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
An animated container for grouping form fields with a title label.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { FormSection } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-full max-w-[360px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Account Details',
    children: (
      <>
        <Input label="Email" placeholder="you@example.com" />
        <Input label="Password" placeholder="Enter password" type="password" />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic form section with title and input fields.',
      },
    },
  },
};

export const BillingSection: Story = {
  args: {
    title: 'Billing Information',
    children: (
      <>
        <Input label="Card Number" placeholder="4242 4242 4242 4242" />
        <div className="flex gap-4">
          <Input label="Expiry" placeholder="MM/YY" />
          <Input label="CVC" placeholder="123" />
        </div>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Form section for billing with side-by-side fields.',
      },
    },
  },
};

export const MultipleSections: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      <FormSection title="Personal Info">
        <Input label="Name" placeholder="John Doe" />
      </FormSection>
      <FormSection title="Contact" delay={0.2}>
        <Input label="Email" placeholder="john@example.com" />
      </FormSection>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Multiple sections with staggered animation delays.',
      },
    },
  },
};
