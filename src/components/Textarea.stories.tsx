import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta: Meta<typeof Textarea> = {
  component: Textarea,
  title: 'UI/Textarea',
};
export default meta;

type Story = StoryObj<typeof Textarea>;

export const All: Story = {
  render: () => (
    <div className="flex flex-col gap-md items-start w-80">
      <Textarea placeholder="Default textarea" />
      <Textarea placeholder="Focused (click to see)" autoFocus />
      <Textarea placeholder="Error state" error />
      <p className="font-body-sm text-error">This field is required.</p>
      <Textarea placeholder="Disabled" disabled />
    </div>
  ),
};
