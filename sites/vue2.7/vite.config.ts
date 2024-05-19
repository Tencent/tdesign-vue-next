import * as path from 'node:path';
import { VitePWA } from 'vite-plugin-pwa';
// import vue2 from '@vitejs/plugin-vue2';
import { createVuePlugin } from 'vite-plugin-vue2';
import ScriptSetup from 'unplugin-vue2-script-setup/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';

import PWA from './configs/pwa';
import TDocPlugin from './plugins/doc';
// import vue2Jsx from '@vitejs/plugin-vue2-jsx';
import vue2Jsx from './plugins/vue2Jsx';

const workspaceRoot = searchForWorkspaceRoot(process.cwd());
const getRootPath = (...args: string[]) => path.posix.resolve(workspaceRoot, ...args);

function resolveAlias(vueVersion: number) {
  return {
    '@adapter/vue': getRootPath(`packages/adapter/vue/vue${vueVersion}`),
    '@adapter/hooks': getRootPath(`packages/adapter/hooks/vue${vueVersion}`),
    '@adapter/utils': getRootPath(`packages/adapter/utils/vue${vueVersion}`),
    '@td/intel': getRootPath(`packages/intel/vue${vueVersion}`),
    '@td/component': getRootPath(`packages/components/vue${vueVersion}`),
    'tdesign-vue/es': getRootPath(`packages/components/src`),
    'tdesign-vue': getRootPath(`packages/components/vue${vueVersion}`),
  };
}

const publicPathMap = {
  preview: '/',
  intranet: '/vue-next/',
  production: 'https://static.tdesign.tencent.com/vue-next/',
};

// ! vue-next 中是从 ../script/vite.base.config 引入
const isCustomElement = tag => tag.startsWith('td-') || tag.startsWith('tdesign-theme');

export function transformTDIcon() {
  return {
    name: 'transform-icon',
    transform(code, id) {
      const intelReg = /from ['"]tdesign-icons-vue-next['"]/g;
      code = code.replace(intelReg, 'from \'tdesign-icons-vue\'');

      return code;
    },
  };
}

export default defineConfig(({ mode }) => {
  return {
    base: publicPathMap[mode],
    resolve: {
      alias: {
        ...resolveAlias(2.7),
        '@': path.resolve(__dirname),
      },
    },
    server: {
      host: '0.0.0.0',
      port: 16000,
      open: '/',
      fs: {
        allow: ['..'],
      },
    },
    plugins: [
      transformTDIcon(),
      ScriptSetup({}),
      vue2Jsx({
        vModel: true,
        compositionAPI: { importSource: '@td/adapter-vue' },
      }),
      createVuePlugin({
        include: /(\.md|\.vue)$/,
        exclude: /\.tsx$/,
      }),
      VitePWA(PWA),
      TDocPlugin(),
    ],
    optimizeDeps: {
      include: ['prismjs', 'prismjs/components/prism-bash.js', '@vue/babel-helper-vue-jsx-merge-props', 'tdesign-icons-vue'],
    },
  };
});
