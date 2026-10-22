import { defineConfig } from 'vitest/config';
import { resolve } from 'node:path';

export default defineConfig({
  resolve: {
    alias: [
      { find: 'obsidian', replacement: resolve(import.meta.dirname, 'tests/obsidian-mocks.ts') },
      { find: 'commons/workspace', replacement: resolve(import.meta.dirname, '../obsidian-commons/src/workspace/index.ts') },
      { find: 'commons/windows', replacement: resolve(import.meta.dirname, '../obsidian-commons/src/windows/index.ts') },
      { find: 'commons/modal', replacement: resolve(import.meta.dirname, '../obsidian-commons/src/modal/index.ts') },
      { find: 'commons/search', replacement: resolve(import.meta.dirname, '../obsidian-commons/src/search/index.ts') },
      { find: 'commons/geometry', replacement: resolve(import.meta.dirname, '../obsidian-commons/src/geometry/index.ts') },
      { find: 'commons/color', replacement: resolve(import.meta.dirname, '../obsidian-commons/src/color/index.ts') },
      { find: 'commons/os', replacement: resolve(import.meta.dirname, '../obsidian-commons/src/os/index.ts') },
      { find: 'commons/testing', replacement: resolve(import.meta.dirname, '../obsidian-commons/src/testing/index.ts') },
      { find: 'commons/internals', replacement: resolve(import.meta.dirname, '../obsidian-commons/src/internals.ts') },
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['tests/**/*.test.ts'],
  },
});
