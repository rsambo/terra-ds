#!/usr/bin/env node
/**
 * Export a self-contained Terra DS bundle into a new project.
 *
 * Usage: node scripts/export-bundle.mjs <targetDir>
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const targetDir = process.argv[2];
if (!targetDir) {
  console.error('Usage: node scripts/export-bundle.mjs <targetDir>');
  process.exit(1);
}

const absTarget = path.resolve(targetDir);
fs.mkdirSync(absTarget, { recursive: true });

function copyFile(src, dest) {
  const dir = path.dirname(dest);
  fs.mkdirSync(dir, { recursive: true });
  fs.copyFileSync(src, dest);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

// Copy DESIGN specs
 copyFile(path.join(ROOT, 'DESIGN.md'), path.join(absTarget, 'DESIGN.md'));
 copyFile(path.join(ROOT, 'DESIGN.dark.md'), path.join(absTarget, 'DESIGN.dark.md'));

// Copy source
 copyDir(path.join(ROOT, 'src/components'), path.join(absTarget, 'src/components'));
 copyFile(path.join(ROOT, 'src/index.css'), path.join(absTarget, 'src/index.css'));
 copyFile(path.join(ROOT, 'src/tokens.css'), path.join(absTarget, 'src/tokens.css'));

// Copy config
 copyFile(path.join(ROOT, 'tailwind.config.js'), path.join(absTarget, 'tailwind.config.js'));
 copyFile(path.join(ROOT, 'postcss.config.js'), path.join(absTarget, 'postcss.config.js'));

// Copy scripts
 copyFile(path.join(ROOT, 'scripts/generate-css-vars.js'), path.join(absTarget, 'scripts/generate-css-vars.js'));
 copyFile(path.join(ROOT, 'build-tokens.sh'), path.join(absTarget, 'build-tokens.sh'));

// Copy editor
 copyDir(path.join(ROOT, 'theme-editor'), path.join(absTarget, 'theme-editor'));
 copyFile(path.join(ROOT, 'tokens-meta.ts'), path.join(absTarget, 'tokens-meta.ts'));

// Write package.json fragment
const pkg = {
  name: 'terra-ds-custom',
  version: '0.1.0',
  private: true,
  scripts: {
    'build-tokens': './build-tokens.sh',
    'theme-editor': 'vite --config theme-editor/vite.config.ts --port 5174',
  },
  devDependencies: {
    '@google/design.md': '^0.2.0',
    '@vitejs/plugin-react': '^4.7.0',
    'tailwindcss': '^3.4.3',
    'vite': '^5.2.0',
    'autoprefixer': '^10.4.19',
    'postcss': '^8.4.38',
    'tailwindcss-animate': '^1.0.7',
  },
  peerDependencies: {
    'react': '>=18.0.0',
    'react-dom': '>=18.0.0',
    '@radix-ui/react-dialog': '>=1.0.0',
    '@radix-ui/react-tabs': '>=1.0.0',
    '@radix-ui/react-switch': '>=1.0.0',
    '@radix-ui/react-checkbox': '>=1.0.0',
    '@radix-ui/react-select': '>=1.0.0',
    '@radix-ui/react-dropdown-menu': '>=2.0.0',
    '@radix-ui/react-tooltip': '>=1.0.0',
    '@radix-ui/react-toast': '>=1.0.0',
  },
};

fs.writeFileSync(
  path.join(absTarget, 'package.json'),
  JSON.stringify(pkg, null, 2) + '\n'
);

console.log(`Bundle exported to ${absTarget}`);
console.log('Next steps:');
console.log(`  cd ${path.relative(process.cwd(), absTarget)}`);
console.log('  npm install');
console.log('  npm run theme-editor');
