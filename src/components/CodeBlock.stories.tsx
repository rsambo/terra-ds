import type { Meta, StoryObj } from '@storybook/react';
import { CodeBlock } from './CodeBlock';

const meta: Meta<typeof CodeBlock> = {
  component: CodeBlock,
  title: 'Content/CodeBlock',
};
export default meta;

type Story = StoryObj<typeof CodeBlock>;

export const Short: Story = {
  render: () => (
    <CodeBlock language="tsx">
{`function greet(name: string) {
  return \`Hello, \${name}!\`;
}`}
    </CodeBlock>
  ),
};

export const Wide: Story = {
  render: () => (
    <CodeBlock language="css">
{`.example {
  background-color: var(--surface-raised);
  color: var(--on-surface);
  border-radius: var(--rounded-md);
  padding: var(--spacing-md);
  box-shadow: 0 1px 4px rgba(26, 22, 20, 0.08), 0 0 1px rgba(26, 22, 20, 0.06);
}`}
    </CodeBlock>
  ),
};
