# Storybook

Storybook is the visual review surface for the approved v1 Web Components. It is separate from the token package output and does not change the Astro website.

## Run locally

```bash
pnpm install
pnpm storybook
```

Open `http://localhost:6006` in the browser. Stories are grouped into Actions, Navigation, Forms, Surfaces, and Feedback, and render the actual custom elements from `packages/components/src/index.js`. Example copy uses neutral placeholders so the catalog demonstrates component behavior without implying production content.

## Build the catalog

```bash
pnpm storybook:build
```

The static output is written to `storybook-static/` and is suitable for a static host or CI artifact.

## Chromatic later

After the Storybook review is approved, publish it with:

```bash
CHROMATIC_PROJECT_TOKEN=your-token pnpm chromatic
```

Keep the project token in a local environment variable or a GitHub Actions secret. Never commit it to this repository or put it in a story.

## Review flow

1. Review the component states and controls locally.
2. Run `pnpm storybook:build` to catch production-build issues.
3. Run the token and component checks with `pnpm build`.
4. Publish to Chromatic only after the v1 component API is approved.
