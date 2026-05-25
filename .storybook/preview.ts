import type { Preview } from '@storybook/react';
import '../src/index.css';

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
      showName: true,
    },
  },
};

export const decorators = [
  (Story, context) => {
    const theme = context.globals.theme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    return Story();
  },
];

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'terra-surface',
      values: [
        { name: 'terra-surface', value: '#f5f0e8' },
      ],
    },
  },
};

export default preview;
