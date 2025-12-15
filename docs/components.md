# Component Reference

## Hero Components

### AnimatedBackground

Animated gradient background with blurred circles.

**Props:**

- None

**Requirements:**

- Parent container must have `position: relative`
- Parent should have defined height (e.g., `minHeight: '100vh'`)

**Usage:**

```tsx
<section style={{ position: 'relative', minHeight: '100vh' }}>
  <AnimatedBackground />
</section>
```

---

### HeroText

Large gradient text with fade-in animation.

**Props:**

- `text` (required): The text to display
- `gradient` (optional): Custom gradient CSS

**Usage:**

```tsx
<HeroText text="Your Brand" />
```

---

### Logo

Animated logo component with breathing effect.

**Props:**

- `src` (required): Logo image source
- `alt` (required): Alt text for accessibility

**Usage:**

```tsx
<Logo src="/your-logo.png" alt="Your Logo" />
```

---

### TypewriterText

Typewriter effect text with blinking cursor.

**Props:**

- `text` (required): The text to animate

**Usage:**

```tsx
<TypewriterText text="COMING SOON" />
```

---

### Subtitle

Subtitle text with fade-in animation.

**Props:**

- `children` (required): JSX content for the subtitle

**Usage:**

```tsx
<Subtitle>
  Your subtitle text here
  <br />
  Can be multi-line with custom formatting
</Subtitle>
```

---

## UI Components

### Button

Customizable button with arrow icon.

**Props:**

- `variant`: `"outline"` | `"solid"` (default: `"outline"`)
- `href`: Optional link URL
- `onClick`: Optional click handler
- `showArrow`: Show/hide arrow icon (default: `true`)
- `children`: Button content

**Usage:**

```tsx
<Button variant="outline">Try Now</Button>
<Button variant="solid" href="/docs">Get Started</Button>
```

---

### Card

Flexible card component for features and documentation.

**Props:**

- `title` (required): Card title
- `description` (required): Card description
- `icon`: Optional icon component
- `button`: Optional button component
- `layout`: `"feature"` | `"documentation"` (default: `"feature"`)
- `contentAlign`: `"left"` | `"center"` (default: `"left"`)
- `index`: Animation delay index

**Usage:**

```tsx
<Card
  title="Feature Title"
  description="Feature description"
  icon={<YourIcon />}
  layout="feature"
  button={<Button>Learn More</Button>}
/>
```

---

### Globe

Interactive 3D globe with custom data points powered by the `cobe` library.

**Props:**

- `size`: Globe diameter in pixels (default: `500`)
- `points`: Array of custom data points with label, icon, and position

**Usage:**

```tsx
<Globe size={600} />

<Globe
  size={500}
  points={[
    {
      label: 'Data Source',
      icon: <BsGlobe2 />,
      position: { x: 50, y: 30 }
    }
  ]}
/>
```

---

### GradientBackground

Radial gradient background effect.

**Props:**

- `position`: `"top"` | `"bottom"` (default: `"top"`)
- `colors`: Custom color object with `start`, `middle1`, `middle2`, `middle3`
- `blur`: Blur amount (default: `"150px"`)
- `height`: Height of gradient (default: `"100vh"`)

**Usage:**

```tsx
<GradientBackground position="top" />

<GradientBackground
  position="bottom"
  height="50vh"
  colors={{
    start: 'rgba(100, 50, 150, 0.9)',
    middle1: 'rgba(80, 40, 120, 0.7)',
    middle2: 'rgba(60, 30, 100, 0.6)',
    middle3: 'rgba(40, 20, 80, 0.4)',
  }}
/>
```

---

### SectionLabel

Animated section label with bracket styling.

**Props:**

- `label` (required): Label text
- `className`: Additional CSS classes
- `animate`: Enable/disable animation (default: `true`)

**Usage:**

```tsx
<SectionLabel label="FEATURES" className="mb-16" />
<SectionLabel label="ABOUT" animate={false} />
```

---

### InputField

Customizable input field with optional submit button.

**Props:**

- `placeholder`: Input placeholder text
- `value`: Controlled input value
- `onChange`: Value change handler
- `onSubmit`: Submit handler
- `variant`: `"transparent"` | `"filled"` (default: `"transparent"`)
- `size`: `"sm"` | `"md"` | `"lg"` (default: `"md"`)
- `showButton`: Show/hide submit button (default: `true`)
- `buttonPosition`: `"left"` | `"right"` (default: `"right"`)

**Usage:**

```tsx
<InputField
  placeholder="Ask CROW Anything..."
  onSubmit={(value) => console.log('Submitted:', value)}
/>

<InputField
  value={inputValue}
  onChange={(value) => setInputValue(value)}
  size="lg"
  variant="filled"
/>
```

---

## TypeScript

All components are fully typed with exported TypeScript interfaces. Import types as needed:

```tsx
import type { ButtonProps, CardProps, GlobeProps } from '@b3-crow/ui-kit';
```
