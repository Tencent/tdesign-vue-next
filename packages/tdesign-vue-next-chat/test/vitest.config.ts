import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vitest/config';

// Vitest glob patterns require forward slashes on Windows too.
const chatRoot = fileURLToPath(new URL('../../pro-components/chat', import.meta.url)).replace(/\\/g, '/');
const componentsRoot = fileURLToPath(new URL('../../components', import.meta.url));

export default defineConfig({
  // TODO: use joinComponentsRoot() after @tdesign/internal-utils can be loaded correctly by the Chat Vitest ESM config.
  resolve: {
    alias: {
      'tdesign-vue-next/es': componentsRoot,
      'tdesign-vue-next': componentsRoot,
      // omi-vueify's exports do not provide a resolvable ESM entry.
      'omi-vueify': fileURLToPath(new URL('../../../node_modules/omi-vueify/dist/omi-vueify.es.js', import.meta.url)),
    },
  },
  plugins: [vue(), vueJsx()],
  test: {
    name: '@tdesign/vue-next-chat-test',
    include: [`${chatRoot}/**/__tests__/*.{test,spec}.{js,jsx,ts,tsx}`],
    environment: 'jsdom',
    server: {
      deps: {
        // Let Vite resolve extensionless imports in the webc dependencies.
        inline: ['@tdesign/web-components', '@tdesign/web-components-chat', 'tdesign-icons-web-components'],
      },
    },
    testTimeout: 5000,
    setupFiles: [`${chatRoot}/test/setup.ts`],
  },
});
