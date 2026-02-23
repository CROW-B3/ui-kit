import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TagInput } from './TagInput';

const meta: Meta<typeof TagInput> = {
  title: 'Inputs/TagInput',
  component: TagInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A text input for adding and removing tags with keyboard support.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { TagInput } from '@aspect/ui-kit';
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
  render: function Component() {
    const [tags, setTags] = useState<string[]>([]);
    return (
      <TagInput
        label="Tags"
        placeholder="Add a tag..."
        tags={tags}
        onTagsChange={setTags}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty tag input ready for user input.',
      },
    },
  },
};

export const WithTags: Story = {
  render: function Component() {
    const [tags, setTags] = useState(['React', 'TypeScript', 'Tailwind']);
    return (
      <TagInput
        label="Technologies"
        placeholder="Add more..."
        tags={tags}
        onTagsChange={setTags}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Tag input with pre-existing tags.',
      },
    },
  },
};

export const WithHelpText: Story = {
  render: function Component() {
    const [tags, setTags] = useState(['Design']);
    return (
      <TagInput
        label="Skills"
        placeholder="Type and press Enter"
        tags={tags}
        onTagsChange={setTags}
        helpText="Press Enter to add a new tag"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Tag input with helper text instructions.',
      },
    },
  },
};
