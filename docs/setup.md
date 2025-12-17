# Setup Guide

## Installation

Install the UI kit using your preferred package manager:

```bash
bun add @b3-crow/ui-kit
```

## Local Development

For local development, you can link the package directly:

```json
{
  "dependencies": {
    "@b3-crow/ui-kit": "file:../ui-kit"
  }
}
```

## Peer Dependencies

Install the required peer dependencies:

```bash
bun add react react-dom framer-motion react-icons cobe
```

### Required Versions

- `react`: ^19.2.0
- `react-dom`: ^19.2.0
- `framer-motion`: Latest
- `react-icons`: Latest
- `cobe`: Latest

## Tailwind CSS Configuration

Most components use Tailwind CSS classes. Ensure Tailwind v4 is configured in your project:

```bash
bun add -D tailwindcss @tailwindcss/postcss
```

### PostCSS Configuration

Create or update `postcss.config.mjs`:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

### Next.js Configuration

If using with Next.js and local packages, add to `next.config.ts`:

```ts
const nextConfig = {
  transpilePackages: ['@b3-crow/ui-kit'],
};

export default nextConfig;
```

## Dark Theme

All components are designed for dark backgrounds with white text and opacity variants. Ensure your app has a dark theme configured.
