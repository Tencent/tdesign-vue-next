import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: ['packages/*/test/vitest.config.ts', 'packages/pro-components/chat/test/vitest.config.ts'],
  },
});
