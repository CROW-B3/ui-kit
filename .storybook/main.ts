import type { StorybookConfig } from '@storybook/react-vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: '@storybook/react-vite',
  staticDirs: ['../public'],
  docs: {
    defaultName: 'Docs',
  },
  core: {
    disableTelemetry: true,
  },
  features: {
    sidebarOnboardingChecklist: false,
  },
  viteFinal: async config => {
    config.define = {
      ...config.define,
      'process.env': {},
    };
    config.resolve = {
      ...config.resolve,
      alias: {
        ...config.resolve?.alias,
        'next/image': path.resolve(__dirname, './NextImageMock.tsx'),
      },
    };
    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [...(config.optimizeDeps?.include || []), 'react-icons/lu'],
    };
    return config;
  },
};
export default config;
