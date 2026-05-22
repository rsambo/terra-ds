import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  component: Button,
  title: 'UI/Button',
};
export default meta;

type Story = StoryObj<typeof Button>;

export const All: Story = {
  render: () => (
    <div className="flex flex-col gap-md items-start">
      <div className="flex gap-sm">
        <Button variant="primary">Primary</Button>
        <Button variant="primary" disabled>Primary Disabled</Button>
      </div>
      <div className="flex gap-sm">
        <Button variant="secondary">Secondary</Button>
        <Button variant="secondary" disabled>Secondary Disabled</Button>
      </div>
      <div className="flex gap-sm">
        <Button variant="ghost">Ghost</Button>
        <Button variant="ghost" disabled>Ghost Disabled</Button>
      </div>
      <div className="flex gap-sm">
        <Button variant="destructive">Destructive</Button>
        <Button variant="destructive" disabled>Destructive Disabled</Button>
      </div>
    </div>
  ),
};
