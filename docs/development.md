# Development Guide

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) v1.3.3 or higher
- Node.js v18 or higher (for compatibility)
- Git

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/CROW-B3/ui-kit.git
cd ui-kit
bun install
```

## Project Structure

```
ui-kit/
├── src/
│   ├── components/          # All UI components
│   ├── lib/                 # Utility functions
│   ├── index.ts             # Main exports
│   └── styles.css           # Global styles
├── dist/                    # Compiled output
├── docs/                    # Documentation
├── package.json
├── tsconfig.json
└── README.md
```

## Development Workflow

### Building

Build the library for production:

```bash
bun run build
```

Watch mode for development:

```bash
bun run build:watch
```

### Linting

Run ESLint to check for code issues:

```bash
bun run lint
```

Auto-fix linting issues:

```bash
bun run lint:fix
```

### Formatting

Format code with Prettier:

```bash
bun run format
```

### Pre-commit Hooks

The project uses Husky for Git hooks:

- **Pre-commit**: Runs lint-staged to lint and format changed files
- **Commit-msg**: Validates commit messages using conventional commits

Hooks are automatically installed after running `bun install`.

## Code Standards

### TypeScript

- All components must be fully typed
- Export component prop types
- Use strict TypeScript configuration
- No `any` types unless absolutely necessary

### Styling

- Use Tailwind CSS utility classes
- Follow dark theme design system
- Use consistent spacing and sizing
- Prefer composition over configuration

### Component Structure

```tsx
import type { ComponentProps } from 'react';

export interface YourComponentProps {
  // Props interface
  required: string;
  optional?: number;
}

export function YourComponent({ required, optional }: YourComponentProps) {
  // Component implementation
  return <div>{required}</div>;
}
```

### Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new component
fix: resolve animation bug
docs: update README
chore: bump dependencies
```

Types:

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `test`: Adding/updating tests
- `chore`: Maintenance tasks

## Testing

### Manual Testing

Link the package locally in a test project:

```json
{
  "dependencies": {
    "@b3-crow/ui-kit": "file:../ui-kit"
  }
}
```

For Next.js projects, add to `next.config.ts`:

```ts
const nextConfig = {
  transpilePackages: ['@b3-crow/ui-kit'],
};
```

### Visual Testing

Test components in different scenarios:

- Dark backgrounds
- Light backgrounds
- Different viewport sizes
- Animation triggers
- Scroll behavior

## Publishing

### Version Bump

Update version in `package.json`:

```json
{
  "version": "0.0.25"
}
```

### Build and Publish

```bash
# Build the library
bun run build

# Publish to npm
npm publish
```

### Automated Publishing

The project uses GitHub Actions for automated publishing:

- Pushes to `main` trigger automatic version bumps
- Releases are created automatically
- Package is published to npm registry

## Contributing

### Pull Request Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Make your changes
4. Commit using conventional commits
5. Push to your fork
6. Open a pull request

### Code Review

- All PRs require review before merging
- Ensure CI passes (linting, building)
- Update documentation if needed
- Add examples for new components

## File Checklist

When adding a new component:

- [ ] Create component in `src/components/`
- [ ] Export from `src/index.ts`
- [ ] Add TypeScript types
- [ ] Document in `docs/components.md`
- [ ] Add examples in `docs/examples.md`
- [ ] Test locally with a consumer project
- [ ] Update version in `package.json`

## Troubleshooting

### Build Errors

**TypeScript errors:**

```bash
# Check TypeScript configuration
cat tsconfig.json

# Clean and rebuild
rm -rf dist
bun run build
```

**Missing dependencies:**

```bash
# Clean install
rm -rf node_modules bun.lock
bun install
```

### Import Errors

**Cannot resolve module:**

- Ensure component is exported in `src/index.ts`
- Check `package.json` exports field
- Verify build output in `dist/`

**Type errors in consumer:**

- Ensure `.d.ts` files are generated
- Check `types` field in `package.json`
- Rebuild the library

### Next.js Integration

**Module not found:**

- Add package to `transpilePackages` in `next.config.ts`
- Clear Next.js cache: `rm -rf .next`
- Reinstall dependencies

**Tailwind classes not working:**

- Ensure consumer project has Tailwind configured
- Check PostCSS configuration
- Verify Tailwind v4 is installed

## Resources

- [Bun Documentation](https://bun.sh/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## License

MIT License - see [LICENSE](../LICENSE) file for details.
