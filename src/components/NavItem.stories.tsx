import type { Meta, StoryObj } from '@storybook/react';
import { NavItem } from './NavItem';

const meta: Meta<typeof NavItem> = {
  component: NavItem,
  title: 'UI/NavItem',
};
export default meta;

type Story = StoryObj<typeof NavItem>;

export const All: Story = {
  render: () => (
    <div className="flex flex-col gap-xs items-start">
      <NavItem href="#">Default</NavItem>
      <NavItem href="#" active>Active</NavItem>
      <NavItem href="#" className="hover:bg-surface-raised hover:text-on-surface">Hovered</NavItem>
    </div>
  ),
};
