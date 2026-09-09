import { fileURLToPath } from 'node:url';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { defineConfig } from 'vitest/config';

const chatRoot = fileURLToPath(new URL('../../pro-components/chat', import.meta.url));

export default defineConfig({
  plugins: [vue(), vueJsx()],
  test: {
    name: '@tdesign/vue-next-chat-test',
    include: [`${chatRoot}/chat-engine/**/__tests__/*.{test,spec}.{js,jsx,ts,tsx}`],
    environment: 'jsdom',
    testTimeout: 5000,
  },
});
