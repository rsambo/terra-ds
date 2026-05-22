import type { Meta, StoryObj } from '@storybook/react';
import { ChatBubble } from './ChatBubble';

const meta: Meta<typeof ChatBubble> = {
  component: ChatBubble,
  title: 'Conversational/ChatBubble',
};
export default meta;

type Story = StoryObj<typeof ChatBubble>;

export const All: Story = {
  render: () => (
    <div className="flex flex-col gap-md w-full max-w-lg">
      <ChatBubble role="assistant">
        Hello! I am the assistant. My bubble sits on the left and uses the assistant surface tone.
      </ChatBubble>
      <ChatBubble role="user">
        Hi there. I am the user. My bubble sits on the right and uses the user surface tone.
      </ChatBubble>
      <ChatBubble role="assistant">
        Notice how we are distinguished by position and surface tone, not by accent color alone.
      </ChatBubble>
    </div>
  ),
};
