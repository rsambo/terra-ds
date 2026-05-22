import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta: Meta<typeof Input> = {
  component: Input,
  title: 'UI/Input',
};
export default meta;

type Story = StoryObj<typeof Input>;

export const All: Story = {
  render: () => (
    <div className="flex flex-col gap-md items-start w-80">
      <Input placeholder="Default input" />
      <Input placeholder="Focused (click to see)" autoFocus />
      <Input placeholder="Error state" error />
      <Input placeholder="Disabled" disabled />
    </div>
  ),
};
