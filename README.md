# CROW-B3 UI Kit

A modern React component library built with Framer Motion for smooth animations and designed for dark-themed web applications.

![Coming Soon Page](https://raw.githubusercontent.com/CROW-B3/ui-kit/main/docs/screenshot.svg)

## Features

- 🎨 Beautiful animated components for hero sections and landing pages
- 🌙 Designed for dark themes with elegant gradients
- ⚡ Built with performance in mind using Framer Motion
- 📦 TypeScript support with full type definitions
- 🎯 Tailwind CSS v4 compatible
- 🔧 Easy to customize and extend

## Quick Start

### Installation

```bash
bun add @b3-crow/ui-kit
```

### Install Dependencies

This library requires React 19.2.0 or later. Ensure your application has React installed:

```bash
# If you haven't installed React yet
bun add react@^19.2.0 react-dom@^19.2.0
```

Then install the UI kit's dependencies:

```bash
bun add framer-motion react-icons cobe
```

### Basic Usage

```tsx
import {
  AnimatedBackground,
  HeroText,
  TypewriterText,
  Subtitle,
} from '@b3-crow/ui-kit';

function App() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AnimatedBackground />
      <HeroText text="Your Brand" />
      <TypewriterText text="COMING SOON" />
      <Subtitle>Building something amazing</Subtitle>
    </section>
  );
}
```

## Components

### Hero Components

- **AnimatedBackground** - Animated gradient background
- **HeroText** - Large gradient text with fade-in
- **Logo** - Animated logo with breathing effect
- **TypewriterText** - Typewriter effect with cursor
- **Subtitle** - Subtitle text with fade-in

### UI Components

- **Button** - Customizable button with variants
- **Card** - Feature and documentation cards
- **Globe** - Interactive 3D globe
- **GradientBackground** - Radial gradient effects
- **SectionLabel** - Animated section labels
- **InputField** - Input with submit button

## Documentation

- **[Setup Guide](./docs/setup.md)** - Installation and configuration
- **[Component Reference](./docs/components.md)** - Complete API documentation
- **[Usage Examples](./docs/examples.md)** - Code examples and patterns
- **[Development Guide](./docs/development.md)** - Contributing and building

## Local Development

Link the package for local development:

```json
{
  "dependencies": {
    "@b3-crow/ui-kit": "file:../ui-kit"
  }
}
```

For Next.js projects:

```ts
// next.config.ts
export default {
  transpilePackages: ['@b3-crow/ui-kit'],
};
```

## Development

```bash
# Install dependencies
bun install

# Build the library
bun run build

# Watch mode
bun run build:watch

# Lint and format
bun run lint
bun run format
```

## License

MIT
