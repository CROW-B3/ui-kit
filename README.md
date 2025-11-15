# CROW-B3 UI Kit

CROW-B3 UI Kit is a set of UI components for CROW-B3 projects.
A React component library built with shadcn/ui and Tailwind CSS v4.

## Installation

```bash
pnpm add @crow-b3/ui-kit
```

## Local Development

```json
"@crow-b3/ui-kit": "file:../ui-kit"
```

## Setup

### 1. Install Peer Dependencies

```bash
pnpm add react react-dom
pnpm add -D tailwindcss @tailwindcss/postcss postcss
```

### 2. Configure PostCSS

Create or update `postcss.config.mjs`:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

### 3. Import Styles

Import the global styles in your app:

```tsx
import '@crow-b3/ui-kit/dist/styles/globals.css';
```

## Usage

### Button Component

```tsx
import { Button } from '@crow-b3/ui-kit';

function App() {
  return (
    <div>
      <Button>Click me</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="destructive">Delete</Button>
      <Button size="lg">Large</Button>
    </div>
  );
}
```

### Available Components

- **Button**: Fully customizable button component with multiple variants and sizes

### Utilities

- **cn**: Utility function for merging Tailwind classes

```tsx
import { cn } from '@crow-b3/ui-kit';

const className = cn('px-4 py-2', 'bg-blue-500', { 'text-white': true });
```

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
