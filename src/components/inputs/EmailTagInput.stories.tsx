import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { EmailTagInput } from './EmailTagInput';

const meta: Meta<typeof EmailTagInput> = {
  title: 'Inputs/EmailTagInput',
  component: EmailTagInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
An input field for entering multiple email addresses as tags with validation and easy removal.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { EmailTagInput } from '@aspect/ui-kit';
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

export const Empty: Story = {
  render: function Component() {
    const [emails, setEmails] = useState<string[]>([]);
    return <EmailTagInput emails={emails} onEmailsChange={setEmails} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty email input ready for user input.',
      },
    },
  },
};

export const WithEmails: Story = {
  render: function Component() {
    const [emails, setEmails] = useState([
      'john@example.com',
      'jane@example.com',
    ]);
    return <EmailTagInput emails={emails} onEmailsChange={setEmails} />;
  },
  parameters: {
    docs: {
      description: {
        story: 'Email input pre-populated with email addresses.',
      },
    },
  },
};

export const WithError: Story = {
  render: function Component() {
    const [emails, setEmails] = useState<string[]>([]);
    return (
      <EmailTagInput
        emails={emails}
        onEmailsChange={setEmails}
        error="Please add at least one email address"
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Email input displaying an error message.',
      },
    },
  },
};

export const Interactive: Story = {
  render: function Component() {
    const [emails, setEmails] = useState<string[]>(['demo@example.com']);
    const [error, setError] = useState<string>('');

    return (
      <EmailTagInput
        emails={emails}
        onEmailsChange={setEmails}
        error={error}
        onInvalidEmail={email => setError(`Invalid email: ${email}`)}
      />
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example with email validation feedback.',
      },
    },
  },
};
