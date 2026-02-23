import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../buttons/Button';
import { SidePanel } from './SidePanel';

const meta: Meta<typeof SidePanel> = {
  title: 'Layout/SidePanel',
  component: SidePanel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A slide-in side panel with focus trap, backdrop, and configurable width options.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { SidePanel } from '@aspect/ui-kit';
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
  render: function Component() {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <>
        <div className="p-8">
          <Button onClick={() => setIsOpen(true)}>Open Panel</Button>
        </div>
        <SidePanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Panel Title"
          subtitle="Panel subtitle description"
        >
          <div className="p-6">
            <p className="text-gray-300">Panel content goes here</p>
          </div>
        </SidePanel>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic side panel with title and subtitle.',
      },
    },
  },
};

export const Widths: Story = {
  render: function Component() {
    const [isOpen, setIsOpen] = useState(false);
    const [width, setWidth] = useState<'sm' | 'md' | 'lg'>('md');
    return (
      <>
        <div className="p-8 flex gap-4">
          <Button
            onClick={() => {
              setWidth('sm');
              setIsOpen(true);
            }}
          >
            Small
          </Button>
          <Button
            onClick={() => {
              setWidth('md');
              setIsOpen(true);
            }}
          >
            Medium
          </Button>
          <Button
            onClick={() => {
              setWidth('lg');
              setIsOpen(true);
            }}
          >
            Large
          </Button>
        </div>
        <SidePanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={`${width.toUpperCase()} Panel`}
          width={width}
        >
          <div className="p-6">
            <p className="text-gray-300">This is a {width} width panel</p>
          </div>
        </SidePanel>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Different width options: sm, md, and lg.',
      },
    },
  },
};

export const NoBackdrop: Story = {
  render: function Component() {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <>
        <div className="p-8">
          <Button onClick={() => setIsOpen(true)}>Open Panel</Button>
        </div>
        <SidePanel
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="No Backdrop"
          showBackdrop={false}
        >
          <div className="p-6">
            <p className="text-gray-300">This panel has no backdrop</p>
          </div>
        </SidePanel>
      </>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Panel without backdrop overlay.',
      },
    },
  },
};
