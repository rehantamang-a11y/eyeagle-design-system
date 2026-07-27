# EyEagle Design System

The shared design foundation for EyEagle products.

The repository contains the machine-readable token contract and the first standalone Web Component primitives that connect the EyEagle Ultimate DS Figma file to consumers.

## Current status

- Version: `0.1.0-alpha.1`
- Packages: `@eyeagle/tokens`, `@eyeagle/components`
- Release model: private prereleases
- Website integration: intentionally deferred

## Workflow

1. Review token intent in EyEagle Ultimate DS.
2. Update the approved token contract in `packages/tokens/src/tokens.json`.
3. Run validation and generate CSS.
4. Compare the contract with the reviewed Figma export.
5. Record the change in `docs/changelog.md`.

## Commands

```bash
pnpm tokens:validate
pnpm tokens:build
pnpm tokens:compare-figma
pnpm storybook
pnpm storybook:build
pnpm components:test
pnpm build
```

Storybook is the visual review surface for the v1 Web Components. See [`docs/storybook.md`](docs/storybook.md) for local review and the later Chromatic publishing flow.

The Astro website remains frozen until this foundation is accepted.
