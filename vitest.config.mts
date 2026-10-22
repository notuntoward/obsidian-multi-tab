import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  resolve: {
    alias: [
      {
        find: 'obsidian',
        replacement: resolve(import.meta.dirname, 'tests/obsidian-mocks.ts'),
      },
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.test.ts'],
  },
});
