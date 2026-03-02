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
  viteFinal: async (config, { configType }) => {
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
      include: [
        ...(config.optimizeDeps?.include || []),
        'three',
        'three-globe',
        'framer-motion',
        'lenis',
      ],
    };
    config.build = {
      ...config.build,
      sourcemap: configType === 'DEVELOPMENT',
      ...(configType === 'PRODUCTION' && {
        minify: 'esbuild' as const,
        esbuild: {
          drop: ['console', 'debugger'],
        },
      }),
      rollupOptions: {
        ...config.build?.rollupOptions,
        onwarn(warning, defaultHandler) {
          if (
            warning.code === 'MODULE_LEVEL_DIRECTIVE' &&
            warning.message.includes('use client')
          ) {
            return;
          }
          if (
            warning.message?.includes(
              "Can't resolve original location of error"
            )
          ) {
            return;
          }
          defaultHandler(warning);
        },
        output: {
          ...(config.build?.rollupOptions?.output as object),
          manualChunks(id: string) {
            if (
              id.includes('node_modules/three-globe') ||
              id.includes('node_modules/three/')
            ) {
              return 'vendor-three';
            }
            if (id.includes('node_modules/framer-motion')) {
              return 'vendor-framer-motion';
            }
            if (
              id.includes('node_modules/shiki') ||
              id.includes('node_modules/@shikijs')
            ) {
              return 'vendor-shiki';
            }
            if (id.includes('node_modules/lenis')) {
              return 'vendor-lenis';
            }
          },
        },
      },
    };
    return config;
  },
};
export default config;
