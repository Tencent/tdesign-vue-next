import { glob } from 'glob';
import { readFile, writeFile, remove, mkdir } from 'fs-extra';
import { rollup, Plugin } from 'rollup';
import url from '@rollup/plugin-url';
import copy from 'rollup-plugin-copy';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import vuePlugin from 'rollup-plugin-vue';
import styles from 'rollup-plugin-styles';
import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import analyzer from 'rollup-plugin-analyzer';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import ignoreImport from 'rollup-plugin-ignore-import';
// @ts-ignore
import { terser } from 'rollup-plugin-terser';
// @ts-ignore
import multiInput from 'rollup-plugin-multi-input';
// @ts-ignore
import staticImport from 'rollup-plugin-static-import';

import pkg from '@tdesign-vue-next/chat/package.json';
import {
  joinWorkspaceRoot,
  joinCommonRoot,
  joinProComponentsChatRoot,
  joinTdesignVueNextChatRoot,
} from '@tdesign/internal-utils';

const name = '@tdesign-vue-next/chat';
const esExternalDeps = Object.keys(pkg.dependencies || {}).concat('tdesign-vue-next/es/config-provider/hooks');
const externalDeps = [...esExternalDeps, /@babel\/runtime/];
const externalPeerDeps = Object.keys(pkg.peerDependencies || {});
const DEFAULT_EXTENSIONS = ['.js', '.jsx', '.es6', '.es', '.mjs', '.cjs'];
const banner = `/**
 * ${name} v${pkg.version}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */
`;

const input = joinProComponentsChatRoot('index-lib.ts');

const inputList = [
  joinProComponentsChatRoot('**/*.ts'),
  joinProComponentsChatRoot('**/*.tsx'),
  `!${joinProComponentsChatRoot('**/demos')}`,
  `!${joinProComponentsChatRoot('**/*.d.ts')}`,
  `!${joinProComponentsChatRoot('**/type.ts')}`,
  `!${joinProComponentsChatRoot('**/types.ts')}`,
  `!${joinProComponentsChatRoot('**/__tests__')}`,
  `!${joinProComponentsChatRoot('**/_example')}`,
  `!${joinProComponentsChatRoot('**/node_modules')}`,
];

const getPlugins = ({
  cssBuildType,
  env,
  isProd,
}: {
  cssBuildType?: 'single' | 'multi' | 'source' | 'ignore';
  env?: string;
  isProd?: boolean;
} = {}) => {
  const plugins = [
    nodeResolve({
      extensions: ['.mjs', '.js', '.json', '.node', '.ts', '.tsx'],
    }) as unknown as Plugin,
    vuePlugin(),
    commonjs(),
    esbuild({
      target: 'esnext',
      minify: false,
      jsx: 'preserve',
    }),
    babel({
      babelHelpers: 'runtime',
      extensions: [...DEFAULT_EXTENSIONS, '.vue', '.ts', '.tsx'],
      configFile: joinWorkspaceRoot('babel.config.js'),
    }),
    json(),
    url(),
    replace({
      preventAssignment: true,
      values: {
        PKG_VERSION: JSON.stringify(pkg.version),
      },
    }),
  ];

  // css 打包到一个文件中
  if (cssBuildType === 'single') {
    plugins.push(
      postcss({
        extract: `${isProd ? `${name}.min` : name}.css`,
        minimize: isProd,
        sourceMap: true,
        extensions: ['.sass', '.scss', '.css', '.less'],
      }),
    );
  }
  // css 分别打包到各自的 style 下
  if (cssBuildType === 'multi') {
    plugins.push(
      staticImport({
        baseDir: joinProComponentsChatRoot(),
        include: [joinProComponentsChatRoot('**/style/css.mjs')],
      }),
      ignoreImport({
        include: [joinProComponentsChatRoot('**/style/*')],
        body: 'import "./style/css.mjs";',
      }),
      copy({
        targets: [
          {
            src: [joinProComponentsChatRoot('**/style/css.js'), `!${joinProComponentsChatRoot('**/node_modules')}`],
            dest: joinTdesignVueNextChatRoot('es'),
            rename: (name, extension, fullPath) =>
              `${fullPath.replace(joinProComponentsChatRoot(), '').slice(0, -6)}${name}.mjs`,
          },
        ],
        verbose: true,
      }),
    );
  }
  // 不打包 less，但保持引用
  if (cssBuildType === 'source') {
  }
  // 完全忽略 less
  if (cssBuildType === 'ignore') {
    plugins.push(
      ignoreImport({
        include: [joinProComponentsChatRoot('**/style/index.js')],
      }),
    );
  }

  if (env) {
    plugins.push(
      replace({
        preventAssignment: true,
        values: {
          'process.env.NODE_ENV': JSON.stringify(env),
        },
      }),
    );
  }

  if (isProd) {
    plugins.push(
      terser({
        output: {
          ascii_only: true,
        },
      }),
    );
  }
  return plugins;
};

export const buildEs = async () => {
  const buildCss = async () => {
    const bundle = await rollup({
      input: [joinProComponentsChatRoot('**/style/index.js')],
      plugins: [multiInput({ relative: joinProComponentsChatRoot() }), styles({ mode: 'extract' }), nodeResolve()],
    });
    bundle.write({
      banner,
      dir: joinTdesignVueNextChatRoot('es/'),
      assetFileNames: '[name].css',
    });
  };

  const buildComp = async () => {
    const esExternal = [...esExternalDeps, ...externalPeerDeps];

    const bundle = await rollup({
      input: [...inputList, `!${joinProComponentsChatRoot('index-lib.ts')}`],
      // 为了保留 style/css.js
      treeshake: false,
      external: (id) => esExternal.some((dep) => id === dep || id.startsWith(`${dep}/`) || id.endsWith('.css')),
      plugins: [multiInput({ relative: joinProComponentsChatRoot() }), ...getPlugins({ cssBuildType: 'multi' })],
    });
    bundle.write({
      banner,
      dir: joinTdesignVueNextChatRoot('es/'),
      format: 'esm',
      sourcemap: true,
      entryFileNames: '[name].mjs',
      chunkFileNames: '_chunks/dep-[hash].mjs',
    });
    const files = await glob(`${joinTdesignVueNextChatRoot('es/**/style/index.js')}`);
    const rewrite = files.map(async (filePath) => {
      await remove(filePath);
    });
    await Promise.all(rewrite);
  };
  await buildCss();
  await buildComp();
};

export const buildEsm = async () => {
  const externalDeps = [...esExternalDeps, externalPeerDeps, /@tdesign\/common-style/];
  const bundle = await rollup({
    input: [...inputList, `!${joinProComponentsChatRoot('index-lib.ts')}`],
    external: (id) =>
      externalDeps.some((dep) => id === dep || id.startsWith(`${dep}/`) || id.endsWith('.css') || id.endsWith('.less')),
    plugins: [multiInput({ relative: joinProComponentsChatRoot() }), ...getPlugins({ cssBuildType: 'source' })],
  });
  await bundle.write({
    banner,
    dir: joinTdesignVueNextChatRoot('esm/'),
    format: 'esm',
    sourcemap: true,
    chunkFileNames: '_chunks/dep-[hash].js',
  });

  // 替换 @tdesign/common-style 为 tdesign-vue-next/esm/common/style
  // TODO 这个可以提取成公共函数
  // 这里稍微有点性能问题
  const files = await glob(`${joinTdesignVueNextChatRoot('esm/**/*.*')}`);
  const rewrite = files.map(async (filePath) => {
    const content = await readFile(filePath, 'utf8');
    // 直接复用 vue-next 的 style 即可，因此 vue-next 一定存在
    await writeFile(filePath, content.replace(/@tdesign\/common-style/g, 'tdesign-vue-next/esm/common/style'), 'utf8');
  });
  await Promise.all(rewrite);

  // 写 style，用于开发者引入全局的样式资源
  await mkdir(joinTdesignVueNextChatRoot('esm/style'));
  await writeFile(
    joinTdesignVueNextChatRoot('esm/style/index.js'),
    `import 'tdesign-vue-next/esm/style/index.js';`, // 直接复用 vue-next 的 style
    'utf8',
  );
};

export const buildLib = async () => {
  const bundle = await rollup({
    input: inputList,
    external: [...externalDeps, ...externalPeerDeps],
    plugins: [multiInput({ relative: joinProComponentsChatRoot() }), ...getPlugins({ cssBuildType: 'ignore' })],
  });
  await bundle.write({
    banner,
    dir: joinTdesignVueNextChatRoot('lib/'),
    format: 'esm',
    sourcemap: true,
    chunkFileNames: '_chunks/dep-[hash].js',
  });
};

export const buildCjs = async () => {
  const cjsExternalException = ['lodash-es'];
  const cjsExternal = [...externalDeps, ...externalPeerDeps].filter((value) =>
    typeof value === 'string' ? !cjsExternalException.includes(value) : true,
  );
  const bundle = await rollup({
    input: inputList,
    external: cjsExternal,
    plugins: [multiInput({ relative: joinProComponentsChatRoot() }), ...getPlugins({ cssBuildType: 'ignore' })],
  });
  await bundle.write({
    banner,
    dir: joinTdesignVueNextChatRoot('cjs/'),
    format: 'cjs',
    sourcemap: true,
    exports: 'named',
    chunkFileNames: '_chunks/dep-[hash].js',
  });
};

export const buildUmd = async (isMin = false) => {
  const bundle = await rollup({
    input,
    // TODO: NEED TDESIGN-VUE-NEXT BUILD FIRST, otherwise, it will report an error, tdesign-vue-next can not be resolved ????
    // two way to fix this problem:
    // 1. build tdesign-vue-next first
    // 2. replace tdesign-vue-next to @tdesign/components first ????
    external: externalPeerDeps,
    plugins: isMin
      ? getPlugins({
          cssBuildType: 'single',
          isProd: true,
          env: 'production',
        })
      : [
          analyzer({
            limit: 5,
            summaryOnly: true,
          }),
          ...getPlugins({
            cssBuildType: 'single',
            env: 'development',
          }),
        ],
  });
  await bundle.write({
    name: 'TDesign',
    banner,
    format: 'umd',
    exports: 'named',
    globals: { vue: 'Vue' },
    sourcemap: true,
    // TODO: check the name of the file
    file: joinTdesignVueNextChatRoot(`dist/${name}${isMin ? '.min' : ''}.js`),
  });
};

// 单独导出 reset.css 到 dist 目录，兼容旧版本样式
export const buildResetCss = async () => {
  const bundle = await rollup({
    input: joinCommonRoot('style/web/_reset.less'),
    plugins: [postcss({ extract: true })],
  });
  await bundle.write({
    file: joinTdesignVueNextChatRoot('dist/reset.css'),
  });
};

// 单独导出 plugin 相关组件的样式，支持修改前缀的但因为上下文暂时无法获取的情况使用
export const buildPluginCss = async () => {
  const bundle = await rollup({
    input: joinCommonRoot('style/web/_plugin.less'),
    plugins: [postcss({ extract: true })],
  });
  await bundle.write({
    file: joinTdesignVueNextChatRoot('dist/plugin.css'),
  });
};

export const deleteOutput = async () => {
  const removes = ['es', 'esm'].map(async (filePath) => await remove(joinTdesignVueNextChatRoot(filePath)));
  await Promise.all(removes);
};

export const buildComponents = async () => {
  await deleteOutput();
  await buildEs();
  await buildEsm();
};
