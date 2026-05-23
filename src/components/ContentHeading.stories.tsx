import type { Meta, StoryObj } from '@storybook/react';
import { ContentHeading } from './ContentHeading';
import { ContentBody } from './ContentBody';
import { ContentBlockquote } from './ContentBlockquote';
import { ContentCaption } from './ContentCaption';
import { ContentPage } from './ContentPage';

const meta: Meta = {
  title: 'Content/ContentTypography',
};
export default meta;

type Story = StoryObj;

export const All: Story = {
  render: () => (
    <ContentPage>
      <ContentHeading level={1}>The Warm Canvas</ContentHeading>
      <ContentBody size="lg">
        This is the content register. Text is set in Noto Serif for comfortable reading.
        The measure is constrained to roughly sixty-five characters per line.
      </ContentBody>
      <ContentHeading level={2}>A Subsection</ContentHeading>
      <ContentBody>
        The surface is the warmest cream in the system, visibly distinct from UI chrome.
        This is where the interface recedes and the content breathes.
      </ContentBody>
      <ContentBlockquote>
        "Every decision privileges clarity over ornament."
      </ContentBlockquote>
      <ContentCaption>
        — Terra DS design principle
      </ContentCaption>
      <ContentHeading level={3}>Another heading</ContentHeading>
      <ContentBody>
        Smaller headings still use the content register, maintaining the warm editorial feel throughout.
      </ContentBody>
    </ContentPage>
  ),
};
