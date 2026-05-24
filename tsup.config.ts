import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/components/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: [
    'react',
    'react-dom',
    '@radix-ui/react-dialog',
    '@radix-ui/react-tabs',
    '@radix-ui/react-switch',
    '@radix-ui/react-checkbox',
    '@radix-ui/react-select',
    '@radix-ui/react-dropdown-menu',
    '@radix-ui/react-tooltip',
    '@radix-ui/react-toast',
  ],
  jsx: 'react-jsx',
});
