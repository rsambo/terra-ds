import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton, SkeletonText } from './Skeleton';
import { Card } from './Card';

const meta: Meta<typeof Skeleton> = {
  component: Skeleton,
  title: 'Feedback/Skeleton',
};
export default meta;

type Story = StoryObj<typeof Skeleton>;

export const TextLine: Story = {
  render: () => <Skeleton width="240px" height="16px" />,
};

export const Circle: Story = {
  render: () => <Skeleton width="48px" height="48px" rounded="full" />,
};

export const CardShape: Story = {
  render: () => <Skeleton width="200px" height="120px" rounded="lg" />,
};

export const TextBlock: Story = {
  render: () => <SkeletonText lines={4} lastLineWidth="50%" />,
};

export const LoadingCard: Story = {
  render: () => (
    <Card className="w-72">
      <Skeleton width="100%" height="160px" rounded="md" />
      <div className="mt-md">
        <SkeletonText lines={3} lastLineWidth="40%" />
      </div>
      <div className="mt-md flex gap-sm">
        <Skeleton width="80px" height="36px" rounded="md" />
        <Skeleton width="80px" height="36px" rounded="md" />
      </div>
    </Card>
  ),
};
