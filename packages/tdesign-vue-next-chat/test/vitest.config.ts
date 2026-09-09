import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vitest/config';

const chatRoot = fileURLToPath(new URL('../../pro-components/chat', import.meta.url));
const componentsRoot = fileURLToPath(new URL('../../components', import.meta.url));

export default defineConfig({
  // TODO: use joinComponentsRoot() after @tdesign/internal-utils can be loaded correctly by the Chat Vitest ESM config.
  resolve: {
    alias: {
      'tdesign-vue-next/es': componentsRoot,
      'tdesign-vue-next': componentsRoot,
    },
  },
  plugins: [vue(), vueJsx()],
  test: {
    name: '@tdesign/vue-next-chat-test',
    include: [`${chatRoot}/chat-engine/**/__tests__/*.{test,spec}.{js,jsx,ts,tsx}`],
    environment: 'jsdom',
    testTimeout: 5000,
  },
});
