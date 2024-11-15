/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';
import path from 'path';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/web-mobile',

  server: {
    port: 4200,
    host: 'localhost',
  },

  preview: {
    port: 4300,
    host: 'localhost',
  },

  plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],


  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // Ensure '@' points to the 'src' directory
      '@/assets': path.resolve(__dirname, '../public/assets'),
      '@/components': path.resolve(__dirname, 'components'),
      '@/config': path.resolve(__dirname, 'config'),
      '@/hooks': path.resolve(__dirname, 'hooks'),
      '@/layouts': path.resolve(__dirname, 'layouts'),
      '@/libs': path.resolve(__dirname, 'libs'),
      '@/pages': path.resolve(__dirname, 'pages'),
      '@/services': path.resolve(__dirname, 'services'),
      '@/providers': path.resolve(__dirname, 'providers'),
      '@/styles': path.resolve(__dirname, 'styles'),
      '@/stores': path.resolve(__dirname, 'stores'),
      '@/utils': path.resolve(__dirname, 'utils'),
      '@/scripts': path.resolve(__dirname, 'scripts'),
      '@/entities': path.resolve(__dirname, 'entities'),
      '@/modules': path.resolve(__dirname, 'modules'),
      '@/tests': path.resolve(__dirname, '../tests/utils'),
      '@/mocks': path.resolve(__dirname, '../tests/mocks')
    },
  },

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  build: {
    outDir: '../../dist/apps/web-mobile',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
