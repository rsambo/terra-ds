import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';
import { Button } from './Button';

const meta: Meta<typeof Header> = {
  component: Header,
  title: 'Structure/Header',
};
export default meta;

type Story = StoryObj<typeof Header>;

export const TitleOnly: Story = {
  render: () => <Header title="My App" />,
};

export const BreadcrumbOnly: Story = {
  render: () => (
    <Header
      breadcrumb={[
        { label: 'Home', href: '#' },
        { label: 'Projects', href: '#' },
        { label: 'Terra DS' },
      ]}
    />
  ),
};

export const ActionsOnly: Story = {
  render: () => (
    <Header
      actions={
        <>
          <Button variant="ghost">Settings</Button>
          <Button variant="primary">New</Button>
        </>
      }
    />
  ),
};

export const AllTogether: Story = {
  render: () => (
    <Header
      breadcrumb={[
        { label: 'Home', href: '#' },
        { label: 'Projects', href: '#' },
        { label: 'Terra DS' },
      ]}
      actions={
        <>
          <Button variant="ghost">Share</Button>
          <Button variant="primary">New</Button>
        </>
      }
    />
  ),
};
