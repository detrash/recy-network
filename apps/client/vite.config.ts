import react from '@vitejs/plugin-react';
import path from 'node:path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      app: path.resolve(import.meta.dirname, 'src', 'app'),
      components: path.resolve(import.meta.dirname, 'src', 'components'),
      hooks: path.resolve(import.meta.dirname, 'src', 'hooks'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        changeOrigin: true,
        secure: false,
        target: 'http://localhost:4000',
      },
    },
  },
});
