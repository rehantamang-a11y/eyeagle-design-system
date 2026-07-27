# EyEagle Design System

The shared design foundation for EyEagle products.

The repository contains the machine-readable token contract and the first standalone Web Component primitives that connect the EyEagle Ultimate DS Figma file to consumers.

## Current status

- Version: `0.1.0-alpha.1`
- Packages: `@eyeagle/tokens`, `@eyeagle/assets`, `@eyeagle/components`
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
pnpm --filter @eyeagle/assets test
pnpm build
pnpm packages:verify
```

Storybook is the visual review surface for the v1 Web Components. See [`docs/storybook.md`](docs/storybook.md) for local review and the later Chromatic publishing flow.

The static Storybook can be shared publicly through GitHub Pages. See [`docs/public-storybook.md`](docs/public-storybook.md).

The Astro website remains frozen until this foundation is accepted.

## Package workflow

`pnpm packages:verify` validates the tokens, builds Storybook, and creates local tarballs in `dist/` for installation testing. It does not publish anything.

When the alpha API is approved, publish the token package first and the components package second:

```bash
pnpm --filter @eyeagle/tokens publish --access public
pnpm --filter @eyeagle/assets publish --access public
pnpm --filter @eyeagle/components publish --access public
```

Publishing is deliberately deferred until a clean consumer test and a reviewed Chromatic build pass.
