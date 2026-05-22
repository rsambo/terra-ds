import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { ContentPage } from './ContentPage';
import { ChatBubble } from './ChatBubble';

const meta: Meta = {
  title: 'Surfaces',
};
export default meta;

type Story = StoryObj;

export const AllRegisters: Story = {
  render: () => (
    <div className="flex flex-col gap-xl">
      <div>
        <h2 className="font-heading-sm text-on-surface mb-sm">UI Chrome</h2>
        <Card className="max-w-sm">
          <p className="font-body-md text-on-surface">This card sits on a UI surface register. The background is the cooler cream used for controls and tools.</p>
        </Card>
      </div>

      <div>
        <h2 className="font-heading-sm text-on-surface mb-sm">Content Canvas</h2>
        <ContentPage className="border border-border rounded-lg">
          <p className="font-content-body-md text-on-content">This is the content register. The warmest cream in the system, built for sustained reading.</p>
        </ContentPage>
      </div>

      <div className="max-w-lg">
        <h2 className="font-heading-sm text-on-surface mb-sm">Conversational</h2>
        <div className="flex flex-col gap-md bg-surface p-md rounded-lg">
          <ChatBubble role="assistant">Assistant message on the conversational surface.</ChatBubble>
          <ChatBubble role="user">User message on a slightly different conversational tone.</ChatBubble>
        </div>
      </div>
    </div>
  ),
};
