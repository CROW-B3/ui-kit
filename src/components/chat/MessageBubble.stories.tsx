import type { Meta, StoryObj } from '@storybook/react';
import { MessageBubble } from './MessageBubble';

const meta: Meta<typeof MessageBubble> = {
  title: 'Chat/MessageBubble',
  component: MessageBubble,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
A styled message bubble component for displaying user and assistant messages in a chat interface with optional copy functionality.

## Installation

\`\`\`bash
npm install @aspect/ui-kit
\`\`\`

## Import

\`\`\`tsx
import { MessageBubble } from '@aspect/ui-kit';
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div className="w-full max-w-[500px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const UserMessage: Story = {
  args: {
    content: 'Hello, how can I help you today?',
    role: 'user',
  },
  parameters: {
    docs: {
      description: {
        story:
          'A message bubble styled for user messages with purple gradient.',
      },
    },
  },
};

export const AssistantMessage: Story = {
  args: {
    content:
      'I can help you with a variety of tasks. What would you like to know?',
    role: 'assistant',
    assistantLabel: 'CROW AI',
  },
  parameters: {
    docs: {
      description: {
        story:
          'A message bubble styled for assistant responses with label header.',
      },
    },
  },
};

export const WithCopy: Story = {
  args: {
    content: 'This message can be copied.',
    role: 'assistant',
    onCopy: () => {},
  },
  parameters: {
    docs: {
      description: {
        story: 'Message with copy button that appears on hover.',
      },
    },
  },
};

export const Conversation: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <MessageBubble content="What is the weather like today?" role="user" />
      <MessageBubble
        content="I don't have access to real-time weather data, but I can help you find a weather service or API to get that information."
        role="assistant"
        assistantLabel="AI"
      />
      <MessageBubble content="Thanks! Can you recommend one?" role="user" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of a multi-message conversation flow.',
      },
    },
  },
};

export const LongMessage: Story = {
  args: {
    content:
      'This is a longer message that demonstrates how the message bubble handles multiple lines of text. It should wrap properly and maintain good readability for the user. The bubble should expand to accommodate the content while staying within the maximum width constraint.',
    role: 'assistant',
  },
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates text wrapping behavior for longer messages.',
      },
    },
  },
};
