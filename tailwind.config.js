const terraTheme = require('./dist/tokens/tailwind.theme.json');

module.exports = {
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
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
