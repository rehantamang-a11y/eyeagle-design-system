# @eyeagle/tokens

The first EyEagle design-system package. It contains the approved token contract and generated CSS output.

This package is experimental and is published as a private prerelease while the design system is being validated.

## Outputs

- `@eyeagle/tokens/tokens`: structured DTCG-style token JSON
- `@eyeagle/tokens/css`: generated CSS custom properties

## CSS usage

```css
@import "@eyeagle/tokens/css";
```

Figma values are authored in px. CSS dimensions are generated in rem using `1rem = 16px`.
