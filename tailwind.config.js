const terraTheme = require('./dist/tokens/tailwind.theme.json');

// Build CSS var references for all color tokens
const colorVars = {};
for (const name of Object.keys(terraTheme.theme.extend.colors)) {
  colorVars[name] = `var(--color-${name})`;
}

module.exports = {
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      ...terraTheme.theme.extend,
      colors: colorVars,
      boxShadow: {
        raised: 'var(--shadow-raised, 0 1px 4px rgba(26,22,20,0.08), 0 0 1px rgba(26,22,20,0.06))',
        overlay: 'var(--shadow-overlay, 0 8px 32px rgba(26,22,20,0.12), 0 2px 8px rgba(26,22,20,0.08))',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
