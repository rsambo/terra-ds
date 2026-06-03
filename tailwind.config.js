const terraTheme = require('./dist/tokens/tailwind.theme.json');

// Build CSS var references for all color tokens
const colorVars = {};
for (const name of Object.keys(terraTheme.theme.extend.colors)) {
  colorVars[name] = `var(--color-${name})`;
}

// Build CSS var references for spacing tokens
const spacingVars = {};
for (const name of Object.keys(terraTheme.theme.extend.spacing)) {
  spacingVars[name] = `var(--spacing-${name})`;
}

// Build CSS var references for borderRadius tokens
const radiusVars = {};
for (const name of Object.keys(terraTheme.theme.extend.borderRadius)) {
  radiusVars[name] = `var(--rounded-${name})`;
}

// Unified typography plugin: .font-{role} applies family + size + weight + line-height + letter-spacing
const typographyPlugin = ({ addComponents }) => {
  const roles = Object.keys(terraTheme.theme.extend.fontFamily);
  const comps = {};
  for (const role of roles) {
    comps[`.font-${role}`] = {
      fontFamily: `var(--font-family-${role})`,
      fontSize: `var(--font-size-${role})`,
      fontWeight: `var(--font-weight-${role})`,
      lineHeight: `var(--line-height-${role})`,
      letterSpacing: `var(--letter-spacing-${role})`,
    };
  }
  addComponents(comps);
};

// Remove fontFamily and fontSize from the extend so the plugin's .font-{role} is the only utility
const { fontFamily, fontSize, ...restExtend } = terraTheme.theme.extend;

module.exports = {
  content: ['./src/**/*.{ts,tsx}', './.storybook/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      ...restExtend,
      colors: colorVars,
      spacing: spacingVars,
      borderRadius: radiusVars,
      boxShadow: {
        raised: 'var(--shadow-raised, 0 1px 4px rgba(26,22,20,0.08), 0 0 1px rgba(26,22,20,0.06))',
        overlay: 'var(--shadow-overlay, 0 8px 32px rgba(26,22,20,0.12), 0 2px 8px rgba(26,22,20,0.08))',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), typographyPlugin],
};
