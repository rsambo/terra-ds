import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta: Meta<typeof Card> = {
  component: Card,
  title: 'Composition/Card',
};
export default meta;

type Story = StoryObj<typeof Card>;

export const All: Story = {
  render: () => (
    <div className="flex flex-col gap-md items-start">
      <Card>
        <h3 className="font-heading-sm text-on-surface">Static Card</h3>
        <p className="font-body-md text-on-surface-muted mt-xs">This card does not respond to hover.</p>
      </Card>
      <Card interactive>
        <h3 className="font-heading-sm text-on-surface">Interactive Card</h3>
        <p className="font-body-md text-on-surface-muted mt-xs">Hover over this card to see the elevation change.</p>
      </Card>
    </div>
  ),
};
