import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    coverage: {
      exclude: [
        'src/config/**',
        '**/schemas/**',
        '**/*.d.ts',
        '**/__tests__/mockData.ts',
        'tests/__mocks__/**/*.ts',
      ],
      include: ['src/**/*'],
      reporter: ['html', 'json-summary', 'json', 'text'],
    },
    env: loadEnv('', process.cwd(), ''),
    globals: true,
    // This is needed by @testing-library to be cleaned up after each test
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,cjs,jsx,ts,tsx}'],
    setupFiles: ['./vitest-setup.ts'],
  },
});
