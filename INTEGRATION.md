# Using Terra DS in your project

## Prerequisites

Your project needs:
- React 18+
- Tailwind CSS v3
- TypeScript (recommended)

## 1. Link or install

For now, Terra DS is consumed via local linking:

```bash
# In your project
npm link ../path/to/terra-ds
```

Or copy the `dist/` folder and reference it directly.

## 2. Configure Tailwind

Terra DS tokens must be loaded into your project's Tailwind config so token-named utilities (`bg-surface-raised`, `text-on-content`, etc.) resolve.

```js
// tailwind.config.js
const terraTheme = require('./node_modules/terra-ds/dist/tokens/tailwind.theme.json');

module.exports = {
  content: [
    './src/**/*.{ts,tsx}',
    './node_modules/terra-ds/dist/**/*.{js,mjs}', // scan Terra components
  ],
  theme: {
    extend: {
      ...terraTheme.theme.extend,
      boxShadow: {
        raised: '0 1px 4px rgba(26,22,20,0.08), 0 0 1px rgba(26,22,20,0.06)',
        overlay: '0 8px 32px rgba(26,22,20,0.12), 0 2px 8px rgba(26,22,20,0.08)',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
```

**Important:** The `content` array must include the Terra dist path so Tailwind scans Terra component files and keeps the token-named utilities in your output.

## 3. Load fonts

Terra DS uses Inter (UI register) and Noto Serif (content register). Add these to your HTML `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Serif:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
```

Then add font-family declarations to your global CSS:

```css
/* index.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Inter', sans-serif;
  background-color: theme('colors.surface');
  color: theme('colors.on-surface');
}
```

## 4. Wrap your app with Toast provider

If you use the Toast component, wrap your app root with Radix's ToastProvider:

```tsx
import * as ToastPrimitive from '@radix-ui/react-toast';
import { ToastViewport } from 'terra-ds';

function App() {
  return (
    <ToastPrimitive.Provider>
      {/* your app */}
      <ToastViewport />
    </ToastPrimitive.Provider>
  );
}
```

## 5. Use components

```tsx
import { Button, Input, Card, AppShell, Sidebar, Header } from 'terra-ds';
```

All components, sub-components, and the `useToast` hook are available as named exports from the top-level `terra-ds` import.

## 6. Accessibility setup

### SkipLink

Add a `SkipLink` as the first focusable element in your `AppShell` (or page wrapper) so keyboard users can bypass navigation:

```tsx
import { SkipLink, AppShell, Sidebar, Header } from 'terra-ds';

function App() {
  return (
    <>
      <SkipLink />
      <AppShell
        header={<Header title="My App" />}
        sidebar={<Sidebar navLabel="Main navigation">...</Sidebar>}
      >
        ...
      </AppShell>
    </>
  );
}
```

`AppShell` renders the main content area with `id="main-content"`, which is the default target of `SkipLink`. If you use a custom layout, add `id="main-content"` to your primary content container.

### Sidebar navigation label

`Sidebar` renders as a `<nav>` element. Pass `navLabel` to set the accessible name:

```tsx
<Sidebar navLabel="Project navigation">...</Sidebar>
```

### Radix ARIA contract

Terra DS builds on Radix primitives, which handle most ARIA attributes automatically (roles, states, focus management, and keyboard behavior). You generally do not need to add `role`, `aria-expanded`, or `aria-selected` manually — the primitives inject them. The exceptions are landmark components (`Header`, `Sidebar`, `AppShell`) and `SkipLink`, which use semantic HTML directly.

## Re-theming

To change a token (e.g. the accent color), edit `DESIGN.md` in the Terra DS repo, run `./build-tokens.sh`, rebuild (`npm run build`), and re-link. Every component that uses the token will reflect the new value with no component edits.
