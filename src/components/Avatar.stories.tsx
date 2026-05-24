import type { Meta, StoryObj } from '@storybook/react';
import { Avatar, AvatarGroup } from './Avatar';

const meta: Meta<typeof Avatar> = {
  component: Avatar,
  title: 'Identity/Avatar',
};
export default meta;

type Story = StoryObj<typeof Avatar>;

export const Image: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?u=robin',
    alt: 'Robin Sambo',
    size: 'md',
  },
};

export const Initials: Story = {
  args: {
    alt: 'Robin Sambo',
    size: 'md',
  },
};

export const ExplicitInitials: Story = {
  args: {
    initials: 'JD',
    size: 'md',
  },
};

export const Muted: Story = {
  args: {
    initials: 'AB',
    size: 'md',
    muted: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-md">
      <Avatar alt="Robin Sambo" size="sm" />
      <Avatar alt="Robin Sambo" size="md" />
      <Avatar alt="Robin Sambo" size="lg" />
      <Avatar alt="Robin Sambo" size="xl" />
    </div>
  ),
};

export const Fallback: Story = {
  args: {
    src: 'https://invalid.url/avatar.jpg',
    alt: 'Jane Doe',
    size: 'lg',
  },
};

export const Group: Story = {
  render: () => (
    <AvatarGroup
      max={3}
      size="md"
      avatars={[
        { src: 'https://i.pravatar.cc/150?u=a', alt: 'Alice' },
        { src: 'https://i.pravatar.cc/150?u=b', alt: 'Bob' },
        { src: 'https://i.pravatar.cc/150?u=c', alt: 'Carol' },
        { alt: 'David' },
        { alt: 'Eve' },
      ]}
    />
  ),
};
