import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Dialog } from './Dialog';
import { Button } from './Button';

const meta: Meta<typeof Dialog> = {
  component: Dialog,
  title: 'Composition/Dialog',
};
export default meta;

type Story = StoryObj<typeof Dialog>;

export const All: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button variant="primary" onClick={() => setOpen(true)}>Open Dialog</Button>
        <Dialog open={open} onOpenChange={setOpen} title="Confirm Action">
          <p className="font-body-md text-on-surface-muted mb-md">
            This dialog uses the overlay surface, warm shadow, and Radix for accessibility.
          </p>
          <div className="flex gap-sm justify-end">
            <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>Confirm</Button>
          </div>
        </Dialog>
      </>
    );
  },
};
