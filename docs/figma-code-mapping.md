# Figma To Code Mapping

Figma is the visual design authority. Git is the machine-readable contract used to generate package outputs. They are compared through an explicit export snapshot; they are not automatically synchronized.

## Current Authority

- File: EyEagle Ultimate DS
- File key: `0KamrNF87WktxWoXFspYyC`
- Web typography collection: `zz Internal / Pulse / Web / Typography`
- Git contract: `packages/tokens/src/tokens.json`
- Read-only snapshot: `figma/ultimate-ds-web-export.json`

## Mapping Rules

| Figma concept | Git path | Notes |
| --- | --- | --- |
| Web Display Hero text style | `type/display/hero/*` | 64/68, 700, -2% |
| Web H1-H4 text styles | `type/heading/h1` through `h4` | Semibold headings |
| Web Body styles | `type/body/large`, `default`, `small` | Regular body contract |
| Web Label styles | `type/label/nav`, `default`, `eyebrow` | Positive tracking labels |
| Web Button Medium style | `type/button/medium` | Compact action text |
| Web Caption Metadata style | `type/caption/metadata` | Supporting metadata |
| Semantic color variables | `color/*` | Prefer aliases to primitives |
| Layout variables | `space/*`, `radius/*`, `size/*` | Figma px values, CSS rem output |

## Review Process

1. Change a variable or text style in Ultimate DS.
2. Export or inspect the affected Figma variables/styles into the snapshot format.
3. Run `pnpm tokens:compare-figma`.
4. Review missing names, values, types, descriptions, and typography bindings in Git.
5. Approve the difference by updating `tokens.json`, the snapshot, and the changelog together.

The initial snapshot covers the approved web typography contract. The comparison command reports any Git tokens outside the snapshot as unreviewed so coverage can expand deliberately.
