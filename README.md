# CROW-B3 UI Kit

CROW-B3 UI Kit is a set of UI components for CROW-B3 projects.
A React component library built with Framer Motion for smooth animations.

## Preview

![Coming Soon Page](./docs/screenshot.svg)

## Installation

```bash
pnpm add @b3-crow/ui-kit
```

## Local Development

```json
"@b3-crow/ui-kit": "file:../ui-kit"
```

## Setup

### 1. Install Peer Dependencies

```bash
pnpm add react react-dom framer-motion
```

## Usage

### Coming Soon Components

The UI kit includes a complete Coming Soon page with animated components:

```tsx
import {
  AnimatedBackground,
  HeroText,
  Logo,
  TypewriterText,
  Subtitle,
} from '@b3-crow/ui-kit';

function App() {
  return (
    <div>
      <AnimatedBackground />
      <Logo src="/your-logo.png" alt="Your Logo" />
      <HeroText text="Your Brand" />
      <TypewriterText text="COMING SOON" />
      <Subtitle>
        Your subtitle text here
        <br />
        Can be multi-line with custom formatting
      </Subtitle>
    </div>
  );
}
```

### Available Components

- **AnimatedBackground**: Animated gradient background with blurred circles
- **HeroText**: Large gradient text with fade-in animation (requires `text` prop, optional `gradient` prop)
- **Logo**: Animated logo component with breathing effect (requires `src` and `alt` props)
- **TypewriterText**: Typewriter effect text with blinking cursor (requires `text` prop)
- **Subtitle**: Subtitle text with fade-in animation (requires `children` for custom JSX content)

## Development

```bash
# Install dependencies
pnpm install

# Build the library
pnpm run build

# Lint
pnpm run lint

# Format
pnpm run format
```

## License

MIT
