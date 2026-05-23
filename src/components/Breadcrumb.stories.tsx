import type { Meta, StoryObj } from '@storybook/react';
import { Breadcrumb } from './Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  component: Breadcrumb,
  title: 'Structure/Breadcrumb',
};
export default meta;

type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Home', href: '#' },
        { label: 'Documents', href: '#' },
        { label: 'Design', onClick: () => {} },
        { label: 'Phase 5' },
      ]}
    />
  ),
};

export const SingleItem: Story = {
  render: () => <Breadcrumb items={[{ label: 'Dashboard' }]} />,
};
