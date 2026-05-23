import type { Meta, StoryObj } from '@storybook/react';
import { useState, useEffect } from 'react';
import { CommandMenu, CommandMenuSection, CommandMenuItem } from './CommandMenu';
import { Button } from './Button';

const meta: Meta<typeof CommandMenu> = {
  component: CommandMenu,
  title: 'Structure/CommandMenu',
};
export default meta;

type Story = StoryObj<typeof CommandMenu>;

function CommandMenuWrapper({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);
  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>Open Command Menu (Cmd+K)</Button>
      <CommandMenu open={open} onOpenChange={setOpen}>
        {children}
      </CommandMenu>
    </>
  );
}

export const WithResults: Story = {
  render: () => (
    <CommandMenuWrapper>
      <CommandMenuSection label="Navigation">
        <CommandMenuItem onSelect={() => {}} icon={<span className="w-4 h-4 block rounded-sm bg-primary" />}>
          Go to Dashboard
        </CommandMenuItem>
        <CommandMenuItem onSelect={() => {}} icon={<span className="w-4 h-4 block rounded-sm bg-secondary" />}>
          Go to Documents
        </CommandMenuItem>
      </CommandMenuSection>
      <CommandMenuSection label="Actions">
        <CommandMenuItem onSelect={() => {}} shortcut="⌘N">New Document</CommandMenuItem>
        <CommandMenuItem onSelect={() => {}} shortcut="⌘⇧N">New Project</CommandMenuItem>
        <CommandMenuItem onSelect={() => {}}>Copy Link</CommandMenuItem>
      </CommandMenuSection>
      <CommandMenuSection label="Preferences">
        <CommandMenuItem onSelect={() => {}}>Toggle Theme</CommandMenuItem>
        <CommandMenuItem onSelect={() => {}} shortcut="⌘,">Settings</CommandMenuItem>
      </CommandMenuSection>
    </CommandMenuWrapper>
  ),
};

export const EmptyState: Story = {
  render: () => (
    <CommandMenuWrapper>
      <CommandMenuSection label="Navigation">
        <CommandMenuItem onSelect={() => {}}>Go to Dashboard</CommandMenuItem>
      </CommandMenuSection>
    </CommandMenuWrapper>
  ),
};
