import { defineConfig, searchForWorkspaceRoot } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { joinPosix, joinComponentsRoot, joinTdesignVueNextRoot } from '@tdesign/internal-utils';
import tDocPlugin from './plugins/plugin-doc';
import siteMetadata from './plugins/site-metadata';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const publicPathMap: Record<string, string> = {
  preview: '/',
  intranet: '/chat/',
  production: 'https://static.tdesign.tencent.com/chat/',
};
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  return {
    base: publicPathMap[mode],
    resolve: {
      alias: {
        '@': joinPosix(__dirname, './'),
        '@tdesign/vue-next': joinTdesignVueNextRoot(),
        '@tdesign/components': joinComponentsRoot(),
        // TODO: paopao 为什么还需要 alias，因为在 example 中的写法只能是 tdesign-vue-next，虽然有这个子应用，但没有 build 是没用的，同时即便是 prebuild 了，hmr 也是问题
        'tdesign-vue-next/es': joinComponentsRoot(),
        'tdesign-vue-next': joinComponentsRoot(),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 17001,
      open: '/',
      fs: {
        allow: [searchForWorkspaceRoot(process.cwd())],
      },
    },
    plugins: [vue(), vueJsx(), tDocPlugin(), siteMetadata()],
    optimizeDeps: {
      include: ['prismjs', 'prismjs/components/prism-bash.js'],
    },
  };
});
