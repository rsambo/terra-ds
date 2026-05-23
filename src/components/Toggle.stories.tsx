import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toggle } from './Toggle';

const meta: Meta<typeof Toggle> = {
  component: Toggle,
  title: 'UI/Toggle',
};
export default meta;

type Story = StoryObj<typeof Toggle>;

export const All: Story = {
  render: () => {
    const [on, setOn] = useState(true);
    const [off, setOff] = useState(false);
    return (
      <div className="flex flex-col gap-md items-start">
        <Toggle checked={on} onCheckedChange={setOn} label="Enabled On" />
        <Toggle checked={off} onCheckedChange={setOff} label="Enabled Off" />
        <Toggle checked={true} onCheckedChange={() => {}} disabled label="Disabled On" />
        <Toggle checked={false} onCheckedChange={() => {}} disabled label="Disabled Off" />
        <Toggle checked={on} onCheckedChange={setOn} />
      </div>
    );
  },
};
