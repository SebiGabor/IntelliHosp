import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './test/setup.ts',
    coverage: {
        provider: 'istanbul',
        reporter: ['text', 'json', 'html'],
        reportsDirectory: './test/coverage'
    },
  },
});
