# @ablegroup/design-system

The _able brand system — CSS design tokens and React components for Able Group products.

Maintained by Able Group. Dhiraj Bhatt, Chief Architect.

---

## Two layers — use one or both

**Token layer (framework-agnostic)** — pure CSS custom properties. Works in React, Vue, Angular, Svelte, plain HTML — anything that runs in a browser. Import once. All `--able-*` variables are available globally.

**Component layer (React)** — Badge, Button, Card built on top of the tokens. React 18+. If your stack is not React, import the tokens and build your own components using the `--able-*` variables.

## Contents

- **Color tokens** — Full Mulberry, Aquamarine, Affogato, and secondary palettes. Semantic aliases adapt to light and dark mode automatically.
- **Typography tokens** — Newsreader (display/serif), Host Grotesk (UI/body), DM Mono (data, captions, eyebrows).
- **Spacing tokens** — 4px base unit, full scale from 4px to 96px.
- **Shadow tokens** — Warm Mulberry-tinted shadows, Aqua glow variants.
- **React components** — Badge, Button, Card — dark mode out of the box.

## Quickstart

### 1. Auth

Add to your repo's `.npmrc`:

```
@ablegroup:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

`GITHUB_TOKEN` must have `read:packages` scope.

### 2. Install

```bash
npm install @ablegroup/design-system
```

### 3. Import tokens (once, at app root)

```js
// Next.js: pages/_app.js or app/layout.js
// Vite:    src/main.jsx
import '@ablegroup/design-system/tokens.css'
```

### 4. Use components

```jsx
import { Badge, Button, Card, CardHeader, CardTitle, CardBody } from '@ablegroup/design-system'

export default function Example() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan Portfolio</CardTitle>
        <Badge variant="success" dot>Live</Badge>
      </CardHeader>
      <CardBody>
        <Button variant="primary">Approve</Button>
        <Button variant="ghost">Cancel</Button>
      </CardBody>
    </Card>
  )
}
```

### Non-React frameworks (Vue, Angular, Svelte, plain HTML)

Import only the tokens — skip step 4. Use `--able-*` variables directly in your own components:

```css
/* your-component.css */
.card {
  background:  var(--able-surface);
  color:       var(--able-text);
  border:      1px solid var(--able-border);
  box-shadow:  var(--able-shadow-md);
  border-radius: 16px;
  padding: var(--able-space-6);
}
```

All token values — colors, typography, spacing, shadows — are available. You own the markup.

### 5. Dark mode

Set `data-theme="dark"` on `<html>`. All tokens adapt automatically.

```js
document.documentElement.setAttribute('data-theme', 'dark')
```

## Token Reference

All tokens use the `--able-` prefix. Use them in your own CSS:

```css
.my-component {
  background:  var(--able-surface);
  color:       var(--able-text);
  border:      1px solid var(--able-border);
  font-family: var(--able-font-body);
  box-shadow:  var(--able-shadow-md);
}
```

Key tokens:

| Token | Light | Dark |
|-------|-------|------|
| `--able-bg` | `#F6F3EE` Foam | `#180113` Mulberry Black |
| `--able-surface` | `#FFFFFF` | `#2E0524` Mulberry Deep |
| `--able-text` | `#180113` | `#FFFFFF` |
| `--able-accent` | `#42C9AE` Aqua | `#42C9AE` Aqua |
| `--able-border` | `rgba(24,1,19,.08)` | `rgba(255,255,255,.08)` |

See `src/tokens/colors.css` for the full list.

## Playbook

Open `playbook/index.html` in a browser for the full visual reference — colors, typography, spacing, components, and usage patterns. No server required.

## Storybook

```bash
npm run storybook
```

Opens at `http://localhost:6006`.

## Build

```bash
npm run build
```

Outputs to `dist/`:
- `index.js` — ESM
- `index.cjs` — CommonJS
- `styles.css` — compiled component styles (tokens ship separately via `tokens.css`)

## Publish

Requires write access to GitHub Packages under the `CredableTech` org.

```bash
npm version patch   # or minor / major
npm publish
```

## Contributing

1. Token change: edit `src/tokens/`, add dark override, bump minor, update playbook.
2. New component: `src/components/<Name>/`, consume tokens only (no hardcoded hex), export from `src/index.js`, add story, update playbook.
3. PR to `main` — one reviewer minimum.

## Fonts

The design system does not bundle fonts. Include the Google Fonts URL in your app:

```html
<link href="https://fonts.googleapis.com/css2?family=DM+Mono:ital,wght@0,300;0,400;0,500;1,400&family=Host+Grotesk:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Newsreader:ital,opsz,wght@0,6..72,200..700;1,6..72,200..700&display=swap" rel="stylesheet">
```
