import type { Meta, StoryObj } from '@storybook/react';
import { Building, Crown, Zap } from 'lucide-react';
import { PricingCard } from './PricingCard';

const meta: Meta<typeof PricingCard> = {
  title: 'Cards/PricingCard',
  component: PricingCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
An animated pricing card with icon, category, features list, and optional popular badge.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { PricingCard } from '@aspect/ui-kit';
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
  decorators: [
    Story => (
      <div className="w-full max-w-[320px]">
        <Story />
      </div>
    ),
  ],
  args: {
    icon: <Zap className="w-5 h-5 text-violet-400" />,
    category: 'Starter',
    title: 'Basic',
    description: 'Perfect for getting started',
    price: 9,
    features: [
      { label: '5 Projects', included: true },
      { label: '10GB Storage', included: true },
      { label: 'API Access', included: false },
    ],
    animated: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic pricing card with icon and features checklist.',
      },
    },
  },
};

export const Popular: Story = {
  decorators: [
    Story => (
      <div className="w-full max-w-[320px]">
        <Story />
      </div>
    ),
  ],
  args: {
    icon: <Crown className="w-5 h-5 text-violet-400" />,
    category: 'Professional',
    title: 'Pro',
    description: 'Best for growing teams',
    price: 29,
    isPopular: true,
    features: [
      { label: 'Unlimited Projects', included: true },
      { label: '100GB Storage', included: true },
      { label: 'API Access', included: true },
      { label: 'Priority Support', included: true },
    ],
    buttonText: 'Get Started',
    animated: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Popular plan with badge and action button.',
      },
    },
  },
};

export const Enterprise: Story = {
  decorators: [
    Story => (
      <div className="w-full max-w-[320px]">
        <Story />
      </div>
    ),
  ],
  args: {
    icon: <Building className="w-5 h-5 text-emerald-400" />,
    category: 'Enterprise',
    title: 'Business',
    description: 'For large organizations',
    price: 'Custom',
    period: '',
    accentColor: '#10B981',
    features: [
      { label: 'Everything in Pro', included: true },
      { label: 'Dedicated Support', included: true },
      { label: 'SLA Guarantee', included: true },
      { label: 'Custom Integrations', included: true },
    ],
    buttonText: 'Contact Sales',
    animated: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Enterprise plan with custom pricing and green accent.',
      },
    },
  },
};

export const PricingGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-[900px]">
      <PricingCard
        icon={<Zap className="w-5 h-5 text-gray-400" />}
        category="Starter"
        title="Free"
        description="For individuals"
        price={0}
        features={[
          { label: '1 Project', included: true },
          { label: '1GB Storage', included: true },
          { label: 'Community Support', included: true },
        ]}
        animated={false}
      />
      <PricingCard
        icon={<Crown className="w-5 h-5 text-violet-400" />}
        category="Professional"
        title="Pro"
        description="For teams"
        price={29}
        isPopular
        features={[
          { label: 'Unlimited Projects', included: true },
          { label: '100GB Storage', included: true },
          { label: 'Priority Support', included: true },
        ]}
        buttonText="Start Free Trial"
        animated={false}
      />
      <PricingCard
        icon={<Building className="w-5 h-5 text-emerald-400" />}
        category="Enterprise"
        title="Business"
        description="For organizations"
        price="Custom"
        period=""
        accentColor="#10B981"
        features={[
          { label: 'Everything in Pro', included: true },
          { label: 'Dedicated Support', included: true },
          { label: 'Custom SLA', included: true },
        ]}
        buttonText="Contact Sales"
        animated={false}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Complete pricing page layout with three plan tiers.',
      },
    },
  },
};
