import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../buttons/Button';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  title: 'Cards/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A feature card component with animated hover effects, flexible border options, and support for icons and buttons.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { Card } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    border: {
      control: 'select',
      options: [
        'all',
        'top',
        'bottom',
        'left',
        'right',
        'top-bottom',
        'left-right',
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right',
        'none',
      ],
      description: 'Border configuration',
      table: {
        defaultValue: { summary: 'none' },
      },
    },
    layout: {
      control: 'select',
      options: ['feature', 'documentation'],
      description:
        'Card layout style. Feature places icon below description, documentation places it above.',
      table: {
        defaultValue: { summary: 'feature' },
      },
    },
    contentAlign: {
      control: 'select',
      options: ['left', 'center'],
      description: 'Text alignment for title and description',
      table: {
        defaultValue: { summary: 'left' },
      },
    },
    title: {
      control: 'text',
      description: 'Card title',
    },
    description: {
      control: 'text',
      description: 'Card description text',
    },
    index: {
      control: 'number',
      description: 'Animation delay index (multiply by 0.2s)',
    },
  },
  decorators: [
    Story => (
      <div className="w-full max-w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'Feature Card',
    description:
      'This is a description of the feature. It explains what the feature does and why it is useful.',
    index: 0,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic card with title and description. Hover to see the animated corner squares effect.',
      },
    },
  },
};

export const WithIcon: Story = {
  args: {
    title: 'Analytics',
    description:
      'Track your performance metrics and gain insights into your data.',
    index: 0,
    border: 'all',
    icon: (
      <svg
        className="w-12 h-12 text-violet-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Card with an icon. In `feature` layout, the icon appears below the description.',
      },
    },
  },
};

export const WithButton: Story = {
  args: {
    title: 'Get Started',
    description:
      'Begin your journey with our platform and unlock powerful features.',
    index: 0,
    border: 'all',
    button: (
      <Button variant="outline" size="sm">
        Start Now
      </Button>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: 'Card with a call-to-action button at the bottom.',
      },
    },
  },
};

export const DocumentationLayout: Story = {
  args: {
    title: 'Documentation',
    description:
      'Comprehensive guides and API references to help you integrate quickly.',
    index: 0,
    layout: 'documentation',
    contentAlign: 'center',
    border: 'all',
    icon: (
      <svg
        className="w-10 h-10 text-violet-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        />
      </svg>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Documentation layout places the icon above the title with centered alignment. Ideal for info cards.',
      },
    },
  },
};

export const CenteredContent: Story = {
  args: {
    title: 'Centered Card',
    description:
      'A card with centered content alignment for a different visual style.',
    index: 0,
    contentAlign: 'center',
    border: 'all',
  },
  parameters: {
    docs: {
      description: {
        story: 'Use `contentAlign="center"` to center the text content.',
      },
    },
  },
};

export const BorderVariants: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-[600px]">
      <Card
        title="All Borders"
        description="Border on all sides"
        index={0}
        border="all"
      />
      <Card
        title="Top Border"
        description="Border on top only"
        index={1}
        border="top"
      />
      <Card
        title="Left-Right"
        description="Border on left and right"
        index={2}
        border="left-right"
      />
      <Card
        title="No Border"
        description="No border at all"
        index={3}
        border="none"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Various border configurations. Use `border` prop to control which sides have borders.',
      },
    },
  },
};
