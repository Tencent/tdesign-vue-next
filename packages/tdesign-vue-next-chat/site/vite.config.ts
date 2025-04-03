import { defineConfig, searchForWorkspaceRoot } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import tDocPlugin from './plugin-doc';
import { resolve, resolveComponentsRoot, resolveTdesignVueNextRoot } from '@tdesign/internal-utils';

const isCustomElement = (tag) => tag.startsWith('td-') || tag.startsWith('tdesign-theme');

const publicPathMap = {
  preview: '/',
  intranet: '/chat/',
  production: 'https://static.tdesign.tencent.com/chat/',
};

export default ({ mode }) => {
  return defineConfig({
    base: publicPathMap[mode],
    resolve: {
      alias: {
        '@': resolve(__dirname, './'),
        '@tdesign/vue-next': resolveTdesignVueNextRoot(),
        '@tdesign/components': resolveComponentsRoot(),
        // TODO: paopao 为什么还需要 alias，因为在 example 中的写法只能是 tdesign-vue-next，虽然有这个子应用，但没有 build 是没用的，同时即便是 prebuild 了，hmr 也是问题
        'tdesign-vue-next/es': resolveComponentsRoot(),
        'tdesign-vue-next': resolveComponentsRoot(),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 17001,
      open: '/',
      https: false,
      fs: {
        allow: [searchForWorkspaceRoot(process.cwd())],
      },
    },
    plugins: [
      vue({
        ssr: false,
        template: {
          compilerOptions: {
            isCustomElement,
          },
        },
      }),
      vueJsx({
        isCustomElement,
      }),
      tDocPlugin(),
    ],
    optimizeDeps: {
      include: ['prismjs', 'prismjs/components/prism-bash.js'],
    },
  });
};
