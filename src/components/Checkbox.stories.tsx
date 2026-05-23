import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

const meta: Meta<typeof Checkbox> = {
  component: Checkbox,
  title: 'UI/Checkbox',
};
export default meta;

type Story = StoryObj<typeof Checkbox>;

export const All: Story = {
  render: () => {
    const [checked, setChecked] = useState(true);
    const [unchecked, setUnchecked] = useState(false);
    const [indeterminate, setIndeterminate] = useState<'indeterminate' | boolean>('indeterminate');
    return (
      <div className="flex flex-col gap-md items-start">
        <Checkbox checked={checked} onCheckedChange={setChecked} label="Checked" />
        <Checkbox checked={unchecked} onCheckedChange={setUnchecked} label="Unchecked" />
        <Checkbox checked={indeterminate} onCheckedChange={setIndeterminate} label="Indeterminate" />
        <Checkbox checked={true} onCheckedChange={() => {}} disabled label="Disabled Checked" />
        <Checkbox checked={false} onCheckedChange={() => {}} disabled label="Disabled Unchecked" />
      </div>
    );
  },
};
