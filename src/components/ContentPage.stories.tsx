import type { Meta, StoryObj } from '@storybook/react';
import { ContentPage } from './ContentPage';

const meta: Meta<typeof ContentPage> = {
  component: ContentPage,
  title: 'Content/ContentPage',
};
export default meta;

type Story = StoryObj<typeof ContentPage>;

export const All: Story = {
  render: () => (
    <ContentPage>
      <h1 className="font-content-display text-on-content mb-md">The Warm Canvas</h1>
      <p className="font-content-body-lg text-on-content-muted mb-md leading-relaxed">
        This is the content register. Text is set in Noto Serif for comfortable reading.
        The measure is constrained to roughly sixty-five characters per line, the classic
        ideal for sustained reading.
      </p>
      <p className="font-content-body-md text-on-content-muted">
        The surface is the warmest cream in the system, visibly distinct from UI chrome.
        This is where the interface recedes and the content breathes.
      </p>
    </ContentPage>
  ),
};
