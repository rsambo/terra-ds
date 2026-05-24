import type { Meta, StoryObj } from '@storybook/react';
import { SkipLink } from './SkipLink';

const meta: Meta<typeof SkipLink> = {
  component: SkipLink,
  title: 'Accessibility/SkipLink',
};
export default meta;

type Story = StoryObj<typeof SkipLink>;

export const Default: Story = {
  render: () => (
    <div className="relative h-48 bg-surface p-md">
      <SkipLink />
      <p className="font-body-md text-on-surface-muted mt-lg">
        Press Tab to focus the skip link.
      </p>
    </div>
  ),
};

export const CustomText: Story = {
  render: () => (
    <div className="relative h-48 bg-surface p-md">
      <SkipLink href="#content">Skip to content</SkipLink>
      <p className="font-body-md text-on-surface-muted mt-lg">
        Press Tab to focus the skip link with custom text.
      </p>
    </div>
  ),
};
