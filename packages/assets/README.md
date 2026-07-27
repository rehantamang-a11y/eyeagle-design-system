# @eyeagle/assets

EyEagle brand assets for product and design-system consumers.

This alpha contains four approved PNG logo variants:

| Export | Use |
| --- | --- |
| `logos/wordmark-dark.png` | Wordmark on light backgrounds |
| `logos/wordmark-light.png` | Wordmark on dark backgrounds |
| `logos/lockup-dark.png` | Wordmark and mission line on light backgrounds |
| `logos/lockup-light.png` | Wordmark and mission line on dark backgrounds |

## Install

```bash
pnpm add @eyeagle/assets
```

## Use

```js
import logoUrl from "@eyeagle/assets/logos/wordmark-dark.png";
```

Use the logo as an image with meaningful alternative text when it conveys content. For decorative repeated branding, use an empty `alt` value. Do not recolor, crop, stretch, or place the light variant on a light background.

The asset API is experimental until the final SVG source files and brand-use guidance are approved.
