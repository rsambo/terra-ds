import type { Preview } from '@storybook/react';
import '../src/index.css';

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
