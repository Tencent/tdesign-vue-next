import url from '@rollup/plugin-url';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import vuePlugin from 'rollup-plugin-vue';
import styles from 'rollup-plugin-styles';
import deletePlugin from 'rollup-plugin-delete';
import esbuild from 'rollup-plugin-esbuild';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import analyzer from 'rollup-plugin-analyzer';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import { DEFAULT_EXTENSIONS } from '@babel/core';
import multiInput from 'rollup-plugin-multi-input';
import nodeResolve from '@rollup/plugin-node-resolve';
import staticImport from 'rollup-plugin-static-import';
import ignoreImport from 'rollup-plugin-ignore-import';
import copy from 'rollup-plugin-copy';

import pkg from 'tdesign-vue-next/package.json';
import { resolveTDesignVueNextRoot } from '@tdesign/internal-utils';

// TODO: 等 utils fs 处理好后，记得删除 output
// targets: ['es', 'esm', 'dist', 'cjs', 'lib']

const name = 'tdesign';

const esExternalDeps = Object.keys(pkg.dependencies || {});
const externalDeps = esExternalDeps.concat([/@babel\/runtime/]);
const externalPeerDeps = Object.keys(pkg.peerDependencies || {});
const banner = `/**
 * ${name} v${pkg.version}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */
`;

const input = 'packages/components/index-lib.ts';
const inputList = [
  'packages/components/**/*.ts',
  'packages/components/**/*.tsx',
  '!packages/components/**/demos',
  '!packages/components/**/*.d.ts',
  '!packages/components/**/__tests__',
];

const getPlugins = ({
  env,
  isProd = false,
  ignoreLess = true,
  extractOneCss = false,
  extractMultiCss = false,
} = {}) => {
  const plugins = [
    nodeResolve({
      extensions: ['.mjs', '.js', '.json', '.node', '.ts', '.tsx'],
    }),
    vuePlugin(),
    commonjs(),
    esbuild({
      target: 'esnext',
      minify: false,
      jsx: 'preserve',
      tsconfig: 'tsconfig.build.json',
    }),
    babel({
      babelHelpers: 'runtime',
      extensions: [...DEFAULT_EXTENSIONS, '.vue', '.ts', '.tsx'],
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

  // css
  if (extractOneCss) {
    plugins.push(
      postcss({
        extract: `${isProd ? `${name}.min` : name}.css`,
        minimize: isProd,
        sourceMap: true,
        extensions: ['.sass', '.scss', '.css', '.less'],
      }),
    );
  } else if (extractMultiCss) {
    plugins.push(
      staticImport({
        baseDir: 'packages/components',
        include: ['packages/components/**/style/css.mjs'],
      }),
      ignoreImport({
        include: ['packages/components/*/style/*'],
        body: 'import "./style/css.mjs";',
      }),
      copy({
        targets: [
          {
            src: 'packages/components/**/style/css.js',
            dest: resolveTDesignVueNextRoot('es'),
            rename: (name, extension, fullPath) =>
              `${fullPath.substring('packages/components/'.length, fullPath.length - 6)}${name}.mjs`,
          },
        ],
        verbose: true,
      }),
    );
  } else if (ignoreLess) {
    plugins.push(ignoreImport({ extensions: ['*.less'] }));
  } else {
    plugins.push(
      staticImport({
        baseDir: 'packages/components',
        include: ['packages/components/**/style/index.js'],
      }),
      staticImport({
        baseDir: 'packages/common',
        include: ['packages/common/style/web/**/*.less'],
      }),
      ignoreImport({
        include: ['packages/components/*/style/*'],
        body: 'import "./style/index.js";',
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
          /* eslint-disable */
          ascii_only: true,
          /* eslint-enable */
        },
      }),
    );
  }

  return plugins;
};

/** @type {import('rollup').RollupOptions} */
const cssConfig = {
  input: ['packages/components/**/style/index.js'],
  plugins: [multiInput({ relative: 'packages/components/' }), styles({ mode: 'extract' }), nodeResolve()],
  output: {
    banner,
    dir: resolveTDesignVueNextRoot('es/'),
    assetFileNames: '[name].css',
  },
};

const deleteEmptyJSConfig = {
  input: 'script/utils/rollup-empty-input.js',
  plugins: [deletePlugin({ targets: resolveTDesignVueNextRoot('es/**/style/index.js'), runOnce: true })],
};

// lodash会使ssr无法运行,@babel\runtime affix组件报错,tinycolor2 颜色组件报错,dayjs 日期组件报错
const exception = ['tinycolor2', 'dayjs'];
const esExternal = esExternalDeps.concat(externalPeerDeps).filter((value) => !exception.includes(value));
const esConfig = {
  input: inputList.concat('!packages/components/index-lib.ts'),
  // 为了保留 style/css.js
  treeshake: false,
  external: esExternal,
  plugins: [multiInput({ relative: 'packages/components/' })].concat(getPlugins({ extractMultiCss: true })),
  output: {
    banner,
    dir: resolveTDesignVueNextRoot('es/'),
    format: 'esm',
    sourcemap: true,
    entryFileNames: '[name].mjs',
    chunkFileNames: '_chunks/dep-[hash].mjs',
  },
};

/** @type {import('rollup').RollupOptions} */
const esmConfig = {
  input: inputList.concat('!packages/components/index-lib.ts'),
  // 为了保留 style/index.js
  treeshake: false,
  external: externalDeps.concat(externalPeerDeps),
  plugins: [multiInput({ relative: 'packages/components/' })].concat(getPlugins({ ignoreLess: false })),
  output: {
    banner,
    dir: resolveTDesignVueNextRoot('esm/'),
    format: 'esm',
    sourcemap: true,
    chunkFileNames: '_chunks/dep-[hash].js',
  },
};

/** @type {import('rollup').RollupOptions} */
const libConfig = {
  input: inputList,
  external: externalDeps.concat(externalPeerDeps),
  plugins: [multiInput({ relative: 'packages/components/' })].concat(getPlugins()),
  output: {
    banner,
    dir: resolveTDesignVueNextRoot('lib/'),
    format: 'esm',
    sourcemap: true,
    chunkFileNames: '_chunks/dep-[hash].js',
  },
};

const cjsExternalException = ['lodash-es'];
const cjsExternal = externalDeps.concat(externalPeerDeps).filter((value) => !cjsExternalException.includes(value));

/** @type {import('rollup').RollupOptions} */
const cjsConfig = {
  input: inputList,
  external: cjsExternal,
  plugins: [multiInput({ relative: 'packages/components/' })].concat(getPlugins()),
  output: {
    banner,
    dir: resolveTDesignVueNextRoot('cjs/'),
    format: 'cjs',
    sourcemap: true,
    exports: 'named',
    chunkFileNames: '_chunks/dep-[hash].js',
  },
};

/** @type {import('rollup').RollupOptions} */
const umdConfig = {
  input,
  external: externalPeerDeps,
  plugins: getPlugins({
    env: 'development',
    extractOneCss: true,
  }).concat(
    analyzer({
      limit: 5,
      summaryOnly: true,
    }),
  ),
  output: {
    name: 'TDesign',
    banner,
    format: 'umd',
    exports: 'named',
    globals: { vue: 'Vue' },
    sourcemap: true,
    file: resolveTDesignVueNextRoot(`dist/${name}.js`),
  },
};

/** @type {import('rollup').RollupOptions} */
const umdMinConfig = {
  input,
  external: externalPeerDeps,
  plugins: getPlugins({
    isProd: true,
    extractOneCss: true,
    env: 'production',
  }),
  output: {
    name: 'TDesign',
    banner,
    format: 'umd',
    exports: 'named',
    globals: { vue: 'Vue' },
    sourcemap: true,
    file: resolveTDesignVueNextRoot(`dist/${name}.min.js`),
  },
};

// 单独导出 reset.css 到 dist 目录，兼容旧版本样式
const resetCss = {
  input: 'packages/common/style/web/_reset.less',
  output: {
    file: resolveTDesignVueNextRoot('dist/reset.css'),
  },
  plugins: [postcss({ extract: true })],
};

// 单独导出 plugin 相关组件的样式，支持修改前缀的但因为上下文暂时无法获取的情况使用
const pluginCss = {
  input: 'packages/common/style/web/_plugin.less',
  output: {
    file: resolveTDesignVueNextRoot('dist/plugin.css'),
  },
  plugins: [postcss({ extract: true })],
};

export default [
  cssConfig,
  esConfig,
  esmConfig,
  libConfig,
  cjsConfig,
  umdConfig,
  umdMinConfig,
  resetCss,
  pluginCss,
  deleteEmptyJSConfig,
];
