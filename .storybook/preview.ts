import type { Preview } from '@storybook/react-vite';

import theme from './theme';
import '../src/styles.css';

const preview: Preview = {
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0a' },
        { name: 'light', value: '#fafafa' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme,
      canvas: {
        sourceState: 'hidden',
      },
      source: {
        language: 'tsx',
      },
    },
    a11y: {
      test: 'todo',
    },
  },
};

export default preview;

export const tags = ['!dev'];
