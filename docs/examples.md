# Usage Examples

## Complete Coming Soon Page

Here's a complete example of a Coming Soon page using all hero components:

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

---

## Button Examples

```tsx
import { Button } from '@b3-crow/ui-kit'

// Outline button (default)
<Button variant="outline">Try Now</Button>

// Solid button
<Button variant="solid">Get Started</Button>

// Button as link
<Button href="/docs">View Docs</Button>

// Button with click handler
<Button onClick={() => console.log('clicked')}>Click Me</Button>

// Button without arrow
<Button showArrow={false}>No Arrow</Button>
```

---

## Card Examples

```tsx
import { Card, Button } from '@b3-crow/ui-kit'
import { FiCode, FiBook } from 'react-icons/fi'

// Feature card
<Card
  title="Feature Title"
  description="Feature description text goes here"
  icon={<FiCode />}
  index={0}
  layout="feature"
  button={<Button variant="outline">Try Now</Button>}
/>

// Documentation card with center alignment
<Card
  title="Documentation"
  description="Read our comprehensive guides"
  icon={<FiBook />}
  index={1}
  layout="documentation"
  contentAlign="center"
  button={<Button href="/docs">View Docs</Button>}
/>

// Simple card without button
<Card
  title="Simple Card"
  description="Just text, no button needed"
  icon={<FiCode />}
/>
```

---

## Globe Examples

```tsx
import { Globe } from '@b3-crow/ui-kit'
import { BsGlobe2, BsDatabase } from 'react-icons/bs'

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
    },
    {
      label: 'Database',
      icon: <BsDatabase />,
      position: { x: -30, y: -20 }
    }
  ]}
/>
```

---

## GradientBackground Examples

```tsx
import { GradientBackground } from '@b3-crow/ui-kit'

// Top gradient (default)
<section style={{ position: 'relative' }}>
  <GradientBackground position="top" />
  <div>Your content here</div>
</section>

// Bottom gradient with custom height
<section style={{ position: 'relative' }}>
  <GradientBackground position="bottom" height="50vh" />
  <div>Your content here</div>
</section>

// Custom colors
<GradientBackground
  position="top"
  colors={{
    start: 'rgba(100, 50, 150, 0.9)',
    middle1: 'rgba(80, 40, 120, 0.7)',
    middle2: 'rgba(60, 30, 100, 0.6)',
    middle3: 'rgba(40, 20, 80, 0.4)',
  }}
  blur="200px"
/>
```

---

## InputField Examples

```tsx
import { InputField } from '@b3-crow/ui-kit'
import { useState } from 'react'

// Default input with submit button
<InputField
  placeholder="Ask CROW Anything..."
  onSubmit={(value) => console.log('Submitted:', value)}
/>

// Controlled input
function ControlledExample() {
  const [inputValue, setInputValue] = useState('')

  return (
    <InputField
      value={inputValue}
      onChange={(value) => setInputValue(value)}
      onSubmit={(value) => {
        console.log('Submitted:', value)
        setInputValue('')
      }}
    />
  )
}

// Different sizes and variants
<InputField size="sm" variant="transparent" placeholder="Small input" />
<InputField size="md" variant="filled" placeholder="Medium filled" />
<InputField size="lg" variant="transparent" placeholder="Large input" />

// Without button
<InputField showButton={false} placeholder="No submit button" />

// Button on left
<InputField buttonPosition="left" placeholder="Button on left" />
```

---

## SectionLabel Examples

```tsx
import { SectionLabel } from '@b3-crow/ui-kit'

// Animated label
<SectionLabel label="FEATURES" className="mb-16" />

// Static label (no animation)
<SectionLabel label="ABOUT" animate={false} />

// With custom styling
<SectionLabel label="TEAM" className="mb-8 opacity-80" />
```

---

## Full Page Example

Here's a complete landing page example using multiple components:

```tsx
import {
  AnimatedBackground,
  HeroText,
  Logo,
  TypewriterText,
  Subtitle,
  SectionLabel,
  Card,
  Button,
  Globe,
  InputField,
} from '@b3-crow/ui-kit';
import { FiCode, FiBook, FiZap } from 'react-icons/fi';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center">
        <AnimatedBackground />
        <Logo src="/logo.png" alt="CROW Logo" />
        <HeroText text="CROW-B3" />
        <TypewriterText text="COMING SOON" />
        <Subtitle>
          The future of development is here
          <br />
          Built for modern web applications
        </Subtitle>
      </section>

      {/* Features Section */}
      <section className="relative px-8 py-24">
        <SectionLabel label="FEATURES" className="mb-16" />
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          <Card
            title="Fast Development"
            description="Build faster with pre-built components"
            icon={<FiZap />}
            layout="feature"
            button={<Button variant="outline">Learn More</Button>}
          />
          <Card
            title="Documentation"
            description="Comprehensive guides and examples"
            icon={<FiBook />}
            layout="feature"
            button={<Button href="/docs">View Docs</Button>}
          />
          <Card
            title="Open Source"
            description="Free and open source forever"
            icon={<FiCode />}
            layout="feature"
            button={<Button href="/github">GitHub</Button>}
          />
        </div>
      </section>

      {/* Globe Section */}
      <section className="relative flex items-center justify-center py-24">
        <Globe size={600} />
      </section>

      {/* CTA Section */}
      <section className="relative px-8 py-24 text-center">
        <h2 className="mb-8 text-4xl font-bold">Get Early Access</h2>
        <div className="mx-auto max-w-md">
          <InputField
            placeholder="Enter your email..."
            size="lg"
            onSubmit={email => console.log('Email:', email)}
          />
        </div>
      </section>
    </div>
  );
}
```

---

## Important Notes

1. **Scrolling Requirements**: The parent container of `AnimatedBackground` MUST have `position: relative` and a defined height (e.g., `minHeight: '100vh'`) to enable proper scrolling

2. **Tailwind CSS**: Most components use Tailwind CSS classes, ensure Tailwind is configured in your project

3. **Dark Theme**: Components are designed for dark backgrounds, using white text with opacity variants

4. **Animations**: All animated components use Framer Motion with scroll-triggered animations

5. **TypeScript**: All components are fully typed with exported TypeScript interfaces
