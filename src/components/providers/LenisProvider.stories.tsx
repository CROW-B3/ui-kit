import type { Meta, StoryObj } from '@storybook/react';
import { LenisProvider } from './LenisProvider';

const meta: Meta<typeof LenisProvider> = {
  title: 'Providers/LenisProvider',
  component: LenisProvider,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A provider component that wraps content with Lenis smooth scrolling functionality.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { LenisProvider } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const ScrollContent = () => (
  <div className="p-8">
    <h1 className="text-3xl font-bold text-white mb-8">
      Smooth Scrolling Demo
    </h1>
    {Array.from({ length: 20 }, (_, i) => (
      <div
        key={i}
        className="mb-6 p-6 bg-white/5 rounded-xl border border-white/10"
      >
        <h2 className="text-xl font-semibold text-white mb-2">
          Section {i + 1}
        </h2>
        <p className="text-gray-400">
          This is a content section to demonstrate smooth scrolling behavior.
          Scroll up and down to see the smooth animation effect provided by
          Lenis.
        </p>
      </div>
    ))}
  </div>
);

export const Default: Story = {
  render: () => (
    <LenisProvider>
      <div className="min-h-screen bg-gray-900">
        <ScrollContent />
      </div>
    </LenisProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Default Lenis smooth scrolling with standard configuration.',
      },
    },
  },
};

export const CustomDuration: Story = {
  render: () => (
    <LenisProvider options={{ duration: 1.2 }}>
      <div className="min-h-screen bg-gray-900">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Slower Scroll (1.2s duration)
          </h1>
          <p className="text-gray-400 mb-8">
            This example uses a longer duration for smoother, slower scrolling.
          </p>
        </div>
        <ScrollContent />
      </div>
    </LenisProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Lenis with a longer animation duration for smoother scrolling.',
      },
    },
  },
};

export const FastScroll: Story = {
  render: () => (
    <LenisProvider options={{ duration: 0.3, wheelMultiplier: 2 }}>
      <div className="min-h-screen bg-gray-900">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-white mb-4">
            Fast Scroll (0.3s duration)
          </h1>
          <p className="text-gray-400 mb-8">
            This example uses a shorter duration and higher wheel multiplier for
            faster scrolling.
          </p>
        </div>
        <ScrollContent />
      </div>
    </LenisProvider>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Lenis with faster scroll response and higher wheel sensitivity.',
      },
    },
  },
};
