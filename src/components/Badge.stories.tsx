import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const meta: Meta<typeof Badge> = {
  component: Badge,
  title: 'UI/Badge',
};
export default meta;

type Story = StoryObj<typeof Badge>;

export const All: Story = {
  render: () => (
    <div className="flex gap-sm">
      <Badge>Default</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="error">Error</Badge>
    </div>
  ),
};
