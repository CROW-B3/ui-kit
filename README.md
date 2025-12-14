# CROW-B3 UI Kit

CROW-B3 UI Kit is a set of UI components for CROW-B3 projects.
A React component library built with Framer Motion for smooth animations.

## Preview

![Coming Soon Page](https://raw.githubusercontent.com/CROW-B3/ui-kit/main/docs/screenshot.svg)

## Installation

```bash
bun add @b3-crow/ui-kit
```

## Local Development

```json
"@b3-crow/ui-kit": "file:../ui-kit"
```

## Setup

### 1. Install Peer Dependencies

```bash
bun add react react-dom framer-motion react-icons cobe
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
    <>
      {/* Hero Section - must have position: relative and min-height */}
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
        <Logo src="/your-logo.png" alt="Your Logo" />
        <HeroText text="Your Brand" />
        <TypewriterText text="COMING SOON" />
        <Subtitle>
          Your subtitle text here
          <br />
          Can be multi-line with custom formatting
        </Subtitle>
      </section>

      {/* Other sections - add your own background */}
      <section
        style={{ background: 'white', padding: '4rem 2rem', minHeight: '50vh' }}
      >
        <h2>Your Content Here</h2>
        <p>Additional sections will scroll normally</p>
      </section>
    </>
  );
}
```

**Important:** The parent container of `AnimatedBackground` must have `position: relative` to properly contain the absolutely positioned background. Use `minHeight: '100vh'` for full-screen hero sections.

### Available Components

#### Hero Components

- **AnimatedBackground**: Animated gradient background with blurred circles (requires parent with `position: relative`)
- **HeroText**: Large gradient text with fade-in animation (requires `text` prop, optional `gradient` prop)
- **Logo**: Animated logo component with breathing effect (requires `src` and `alt` props)
- **TypewriterText**: Typewriter effect text with blinking cursor (requires `text` prop)
- **Subtitle**: Subtitle text with fade-in animation (requires `children` for custom JSX content)

#### UI Components

- **Button**: Customizable button with arrow icon (supports `variant`, `href`, `onClick`, `showArrow` props)
- **Card**: Flexible card component for features and documentation (supports `layout`, `icon`, `button`, `contentAlign` props)
- **Globe**: Interactive 3D globe with custom data points (uses `cobe` library, accepts `points` and `size` props)
- **GradientBackground**: Radial gradient background effect (supports `position`, `colors`, `blur`, `height` props)
- **SectionLabel**: Animated section label with bracket styling (requires `label` prop)
- **InputField**: Customizable input field with optional submit button (supports `variant`, `size`, `buttonPosition`, `onSubmit` props)

### Additional Component Examples

#### Using Button Component

```tsx
import { Button } from '@b3-crow/ui-kit';

// Outline button (default)
<Button variant="outline">Try Now</Button>

// Solid button
<Button variant="solid">Get Started</Button>

// Button as link
<Button href="/docs">View Docs</Button>

// Button with click handler
<Button onClick={() => console.log('clicked')}>Click Me</Button>
```

#### Using Card Component

```tsx
import { Card, Button } from '@b3-crow/ui-kit';

// Feature card
<Card
  title="Feature Title"
  description="Feature description"
  icon={<YourIcon />}
  index={0}
  layout="feature"
  button={<Button variant="outline">Try Now</Button>}
/>

// Documentation card
<Card
  title="Documentation"
  description="Read our docs"
  icon={<DocsIcon />}
  index={1}
  layout="documentation"
  contentAlign="center"
  button={<Button href="/docs">View Docs</Button>}
/>
```

#### Using Globe Component

```tsx
import { Globe } from '@b3-crow/ui-kit';
import { BsGlobe2 } from 'react-icons/bs';

// Default globe with preset points
<Globe size={500} />

// Custom globe with custom data points
<Globe
  size={600}
  points={[
    {
      label: 'Data Source',
      icon: <BsGlobe2 />,
      position: { x: 50, y: 30 }
    }
  ]}
/>
```

#### Using GradientBackground

```tsx
import { GradientBackground } from '@b3-crow/ui-kit';

// Top gradient (default)
<GradientBackground position="top" />

// Bottom gradient with custom height
<GradientBackground position="bottom" height="50vh" />

// Custom colors
<GradientBackground
  position="top"
  colors={{
    start: 'rgba(100, 50, 150, 0.9)',
    middle1: 'rgba(80, 40, 120, 0.7)',
    middle2: 'rgba(60, 30, 100, 0.6)',
    middle3: 'rgba(40, 20, 80, 0.4)',
  }}
/>
```

#### Using SectionLabel

```tsx
import { SectionLabel } from '@b3-crow/ui-kit';

<SectionLabel label="FEATURES" className="mb-16" />
<SectionLabel label="ABOUT" animate={false} />
```

#### Using InputField

```tsx
import { InputField } from '@b3-crow/ui-kit';

// Default input with submit button
<InputField
  placeholder="Ask CROW Anything..."
  onSubmit={(value) => console.log('Submitted:', value)}
/>

// Controlled input
<InputField
  value={inputValue}
  onChange={(value) => setInputValue(value)}
  onSubmit={handleSubmit}
/>

// Different sizes and variants
<InputField size="sm" variant="transparent" />
<InputField size="md" variant="filled" />
<InputField size="lg" variant="transparent" />

// Without button or custom button position
<InputField showButton={false} />
<InputField buttonPosition="left" />
```

### Important Notes

1. **Scrolling Requirements**: The parent container of `AnimatedBackground` MUST have `position: relative` and a defined height (e.g., `minHeight: '100vh'`) to enable proper scrolling
2. **Tailwind CSS**: Most components use Tailwind CSS classes, ensure Tailwind is configured in your project
3. **Dark Theme**: Components are designed for dark backgrounds, using white text with opacity variants
4. **Animations**: All animated components use Framer Motion with scroll-triggered animations
5. **TypeScript**: All components are fully typed with exported TypeScript interfaces

## Development

```bash
# Install dependencies
bun install

# Build the library
bun run build

# Lint
bun run lint

# Format
bun run format
```

## License

MIT
