import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

const ROOT = path.resolve(__dirname, '..');

// Lists candidate design.md specs at the repo root: any *.md whose YAML front
// matter declares a `colors:` block (excludes README-style docs).
const listDesigns = () =>
  fs
    .readdirSync(ROOT)
    .filter((f) => f.endsWith('.md'))
    .filter((f) => {
      try {
        const head = fs.readFileSync(path.join(ROOT, f), 'utf-8').slice(0, 2000);
        return /^colors:/m.test(head) && head.startsWith('---');
      } catch {
        return false;
      }
    });

// Design-source plugin — localhost dev-only. GET lists specs; POST maps a
// selected spec onto Terra's token structure (Claude API when needed).
const designSourcePlugin = () => ({
  name: 'design-source',
  configureServer(server: any) {
    server.middlewares.use('/__list-designs', (_req: any, res: any) => {
      res.setHeader('Content-Type', 'application/json');
      try {
        res.end(JSON.stringify({ ok: true, files: listDesigns() }));
      } catch (err: any) {
        res.statusCode = 500;
        res.end(JSON.stringify({ ok: false, error: err?.message || String(err) }));
      }
    });

    server.middlewares.use('/__apply-design', async (req: any, res: any) => {
      if (req.method !== 'POST') {
        res.statusCode = 405;
        res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }));
        return;
      }
      let body = '';
      req.on('data', (chunk: Buffer) => (body += chunk.toString()));
      req.on('end', async () => {
        res.setHeader('Content-Type', 'application/json');
        try {
          const { file } = JSON.parse(body);
          if (!file || !listDesigns().includes(file)) {
            res.statusCode = 400;
            res.end(JSON.stringify({ ok: false, error: 'Unknown or disallowed design file.' }));
            return;
          }
          const content = fs.readFileSync(path.join(ROOT, file), 'utf-8');
          const { transformDesign } = await import('./transform-design.mjs');
          const result = await transformDesign(content, file);
          res.statusCode = result.ok ? 200 : 500;
          res.end(JSON.stringify(result));
        } catch (err: any) {
          res.statusCode = 500;
          res.end(JSON.stringify({ ok: false, error: err?.message || String(err) }));
        }
      });
    });
  },
});

// Theme writer plugin — localhost dev-only authoring endpoint
// See P4 for the full POST /__write-tokens implementation
const themeWriterPlugin = () => ({
  name: 'theme-writer',
  configureServer(server: any) {
    server.middlewares.use('/__write-tokens', async (req: any, res: any, next: any) => {
      if (req.method !== 'POST') {
        res.statusCode = 405;
        res.end(JSON.stringify({ ok: false, error: 'Method not allowed' }));
        return;
      }
      let body = '';
      req.on('data', (chunk: Buffer) => (body += chunk.toString()));
      req.on('end', async () => {
        try {
          const payload = JSON.parse(body);
          // Delegate to the write-tokens script for atomic patch + regenerate
          const { writeTokens } = await import('./write-tokens.mjs');
          const result = await writeTokens(payload);
          res.setHeader('Content-Type', 'application/json');
          res.statusCode = result.ok ? 200 : 500;
          res.end(JSON.stringify(result));
        } catch (err: any) {
          res.statusCode = 500;
          res.end(JSON.stringify({ ok: false, error: err?.message || String(err) }));
        }
      });
    });
  },
});

export default defineConfig({
  plugins: [react(), themeWriterPlugin(), designSourcePlugin()],
  resolve: {
    alias: {
      '@terra-ds/components': path.resolve(__dirname, '../src/components'),
    },
  },
  root: __dirname,
  publicDir: false,
});
