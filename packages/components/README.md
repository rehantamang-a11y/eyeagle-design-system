# @eyeagle/components

Framework-neutral EyEagle v1 Web Components built from the approved Figma tranche and `@eyeagle/tokens`.

## V1 components

- `ey-button`
- `ey-icon-button`
- `ey-nav-bar`
- `ey-mobile-menu`
- `ey-text-input`
- `ey-select`
- `ey-card`
- `ey-status-badge`

## Usage

```js
import "@eyeagle/tokens/css";
import "@eyeagle/components";
```

```html
<ey-button intent="primary" size="md">Become a member</ey-button>
<ey-text-input label="Email" name="email" required></ey-text-input>
<ey-status-badge intent="success">Ready</ey-status-badge>
```

Icon-only controls require a label:

```html
<ey-icon-button label="Open menu">menu</ey-icon-button>
```

This private alpha does not contain page compositions, checkout logic, SOS behavior, or Astro integration.
