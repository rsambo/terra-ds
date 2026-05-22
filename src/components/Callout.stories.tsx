import type { Meta, StoryObj } from '@storybook/react';
import { Callout } from './Callout';

const meta: Meta<typeof Callout> = {
  component: Callout,
  title: 'Content/Callout',
};
export default meta;

type Story = StoryObj<typeof Callout>;

export const All: Story = {
  render: () => (
    <div className="max-w-prose">
      <Callout>
        This is a callout. It sits on a raised content surface with muted text color,
        drawing attention without shouting.
      </Callout>
    </div>
  ),
};
