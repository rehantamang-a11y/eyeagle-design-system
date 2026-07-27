# Token Contract

`packages/tokens/src/tokens.json` is the canonical, versioned token contract. It follows the DTCG shape: groups are semantic paths, and token leaves contain `$value`, `$type`, and `$description`.

## Naming

Use lowercase slash-separated paths. Prefer the vocabulary already established in EyEagle Ultimate DS:

```txt
type/heading/h1/fontSize
type/body/default/lineHeight
color/text/primary
color/bg/page
space/section/md
radius/md
```

Use camelCase for properties inside a role (`fontSize`, `lineHeight`, `letterSpacing`) and kebab-case for generated CSS custom properties.

## Primitives And Semantics

Primitive values describe a raw palette or scale. Semantic values describe a product decision and may alias a primitive. Components should consume semantic tokens when they are introduced; pages should not invent new values for established roles.

Aliases use the DTCG-style form `{group/path}` and are resolved by the build and validation scripts.

## Units And Generated CSS

Figma dimensions remain in px. CSS dimensions are generated in rem using `1rem = 16px`. Percentage tracking is generated as em (`-1.2%` becomes `-0.012em`). Font weights stay numeric. Colors, shadows, durations, and cubic-bezier values are emitted in their native CSS form.

## Typography Contract

The production web roles are the Ultimate DS values: Plus Jakarta Sans, Display Hero `64/68` Bold, H1 `36/44` Semibold, H2 `28/36` Semibold, H3 `20/28` Semibold, H4 `16/24` Semibold, Body Large `18/28` Regular, Body Default `16/24` Regular, Body Small `14/20` Regular, Label Nav and Default `14/20` Semibold at `+3%`, Label Eyebrow `12/16` Bold at `+4%`, Button Medium `16/24` Semibold at `+2%`, and Caption Metadata `12/16` Medium at `-1%`.

## Adding A Token

1. Confirm the role is reusable across more than one surface.
2. Match the nearest Ultimate DS Figma variable or text style name.
3. Add `$type`, `$value`, and a concise `$description` to `tokens.json`.
4. Run `pnpm tokens:validate` and `pnpm tokens:build`.
5. Add or update the corresponding Figma export snapshot, review the diff, and record the decision in `docs/changelog.md`.

Never silently overwrite a token from Figma. Renames and deprecations require a documented migration window.
