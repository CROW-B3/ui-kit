import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock } from './CodeBlock';

const meta: Meta<typeof CodeBlock> = {
  title: 'Display/CodeBlock',
  component: CodeBlock,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A syntax-highlighted code block with copy-to-clipboard functionality.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { CodeBlock } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-[500px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    code: `const greeting = "Hello, World!";
console.log(greeting);`,
    language: 'typescript',
  },
  parameters: {
    docs: {
      description: {
        story: 'Default code block with TypeScript syntax highlighting.',
      },
    },
  },
};

export const JavaScript: Story = {
  args: {
    code: `function sum(a, b) {
  return a + b;
}

const result = sum(1, 2);`,
    language: 'javascript',
  },
  parameters: {
    docs: {
      description: {
        story: 'Code block with JavaScript syntax highlighting.',
      },
    },
  },
};

export const Python: Story = {
  args: {
    code: `def hello(name):
    return f"Hello, {name}!"

print(hello("World"))`,
    language: 'python',
  },
  parameters: {
    docs: {
      description: {
        story: 'Code block with Python syntax highlighting.',
      },
    },
  },
};

export const NoCopy: Story = {
  args: {
    code: 'npm install @crow/ui-kit',
    language: 'bash',
    showCopy: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Code block with the copy button hidden.',
      },
    },
  },
};

export const JSON: Story = {
  args: {
    code: `{
  "name": "ui-kit",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0"
  }
}`,
    language: 'json',
  },
  parameters: {
    docs: {
      description: {
        story: 'Code block with JSON syntax highlighting.',
      },
    },
  },
};
