import type { Meta, StoryObj } from '@storybook/react';
import { DropdownMenu, DropdownMenuItem, DropdownMenuSeparator } from './DropdownMenu';
import { Button } from './Button';

const meta: Meta<typeof DropdownMenu> = {
  component: DropdownMenu,
  title: 'UI/DropdownMenu',
};
export default meta;

type Story = StoryObj<typeof DropdownMenu>;

export const All: Story = {
  render: () => (
    <DropdownMenu trigger={<Button variant="ghost">Open Menu</Button>}>
      <DropdownMenuItem>Edit</DropdownMenuItem>
      <DropdownMenuItem>Duplicate</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem destructive>Delete</DropdownMenuItem>
      <DropdownMenuItem disabled>Archive</DropdownMenuItem>
    </DropdownMenu>
  ),
};
