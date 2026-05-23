import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from './Button';

const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: 'UI/Tooltip',
};
export default meta;

type Story = StoryObj<typeof Tooltip>;

export const All: Story = {
  render: () => (
    <div className="flex gap-md items-center justify-center p-xl">
      <Tooltip content="Appears above" side="top">
        <Button variant="ghost">Top</Button>
      </Tooltip>
      <Tooltip content="Appears to the right" side="right">
        <Button variant="ghost">Right</Button>
      </Tooltip>
      <Tooltip content="Appears below" side="bottom">
        <Button variant="ghost">Bottom</Button>
      </Tooltip>
      <Tooltip content="Appears to the left" side="left">
        <Button variant="ghost">Left</Button>
      </Tooltip>
    </div>
  ),
};
