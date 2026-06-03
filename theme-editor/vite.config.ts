import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

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
  plugins: [react(), themeWriterPlugin()],
  resolve: {
    alias: {
      '@terra-ds/components': path.resolve(__dirname, '../src/components'),
    },
  },
  root: __dirname,
  publicDir: false,
});
