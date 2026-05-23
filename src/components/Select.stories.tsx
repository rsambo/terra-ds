import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select, SelectItem } from './Select';

const meta: Meta<typeof Select> = {
  component: Select,
  title: 'UI/Select',
};
export default meta;

type Story = StoryObj<typeof Select>;

export const All: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div className="flex flex-col gap-md items-start w-64">
        <Select value={value} onValueChange={setValue} placeholder="Choose a model…">
          <SelectItem value="gpt-4">GPT-4</SelectItem>
          <SelectItem value="claude">Claude</SelectItem>
          <SelectItem value="gemini">Gemini</SelectItem>
          <SelectItem value="llama">Llama</SelectItem>
          <SelectItem value="mistral">Mistral</SelectItem>
        </Select>
        <Select placeholder="Disabled" disabled>
          <SelectItem value="a">Option A</SelectItem>
        </Select>
      </div>
    );
  },
};
