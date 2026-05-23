import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Card } from './Card';
import { ContentPage } from './ContentPage';
import { ChatBubble } from './ChatBubble';
import { Toggle } from './Toggle';
import { Checkbox } from './Checkbox';
import { Select, SelectItem } from './Select';
import { ContentBody } from './ContentBody';
import { CodeBlock } from './CodeBlock';

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

      <WaveAComposition />
      <WaveBComposition />
    </div>
  ),
};

function WaveAComposition() {
  const [toggle, setToggle] = useState(true);
  const [checked, setChecked] = useState(true);
  const [model, setModel] = useState('claude');
  return (
    <div>
      <h2 className="font-heading-sm text-on-surface mb-sm">Wave A — Settings Panel</h2>
      <Card className="max-w-sm">
        <div className="flex flex-col gap-md">
          <Toggle checked={toggle} onCheckedChange={setToggle} label="Enable AI suggestions" />
          <Checkbox checked={checked} onCheckedChange={setChecked} label="Auto-save notes" />
          <Select value={model} onValueChange={setModel} placeholder="Choose model">
            <SelectItem value="gpt-4">GPT-4</SelectItem>
            <SelectItem value="claude">Claude</SelectItem>
            <SelectItem value="gemini">Gemini</SelectItem>
          </Select>
        </div>
      </Card>
    </div>
  );
}

function WaveBComposition() {
  return (
    <div>
      <h2 className="font-heading-sm text-on-surface mb-sm">Wave B — Content + Code</h2>
      <ContentPage className="border border-border rounded-lg">
        <ContentBody size="lg">
          The assistant returned a function that calculates warm shadow opacity based on surface luminance.
        </ContentBody>
        <CodeBlock language="ts">
{`function shadowOpacity(luminance: number): number {
  const base = 0.06;
  const scale = 1 - luminance;
  return Math.min(base + scale * 0.1, 0.14);
}`}
        </CodeBlock>
      </ContentPage>
    </div>
  );
}
