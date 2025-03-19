import { glob } from 'glob';
import { readFile, writeFile, remove } from 'fs-extra';

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

import pkg from 'tdesign-vue-next/package.json';
import { resolve, getWorkSpaceRoot } from '@tdesign/internal-utils';

const name = 'tdesign';
const esExternalDeps = Object.keys(pkg.dependencies || {});
// @ts-ignore
const externalDeps = esExternalDeps.concat([/@babel\/runtime/]);
const externalPeerDeps = Object.keys(pkg.peerDependencies || {});
const DEFAULT_EXTENSIONS = ['.js', '.jsx', '.es6', '.es', '.mjs', '.cjs'];
const banner = `/**
 * ${name} v${pkg.version}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */
`;

const getInput = async () => {
  const workSpaceRoot = await getWorkSpaceRoot();
  return resolve(workSpaceRoot, 'packages/components/index-lib.ts');
};

const getInputList = async () => {
  const workSpaceRoot = await getWorkSpaceRoot();
  return [
    resolve(workSpaceRoot, 'packages/components/**/*.ts'),
    resolve(workSpaceRoot, 'packages/components/**/*.tsx'),
    `!${resolve(workSpaceRoot, 'packages/components/**/demos')}`,
    `!${resolve(workSpaceRoot, 'packages/components/**/*.d.ts')}`,
    `!${resolve(workSpaceRoot, 'packages/components/**/__tests__')}`,
  ];
};

const getPlugins = async ({
  env = '',
  isProd = false,
  ignoreLess = true,
  extractOneCss = false,
  extractMultiCss = false,
} = {}) => {
  const workSpaceRoot = await getWorkSpaceRoot();
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
      configFile: resolve(workSpaceRoot, 'babel.config.js'),
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
    const workSpaceRoot = await getWorkSpaceRoot();
    plugins.push(
      staticImport({
        baseDir: resolve(await getWorkSpaceRoot(), 'packages/components'),
        include: [resolve(await getWorkSpaceRoot(), 'packages/components/**/style/css.mjs')],
      }),
      ignoreImport({
        include: [resolve(await getWorkSpaceRoot(), 'packages/components/*/style/*')],
        body: 'import "./style/css.mjs";',
      }),
      copy({
        targets: [
          {
            src: resolve(await getWorkSpaceRoot(), 'packages/components/**/style/css.js'),
            dest: resolve(await getWorkSpaceRoot(), 'packages/tdesign-vue-next', 'es'),
            rename: (name, extension, fullPath) =>
              `${fullPath.replace(resolve(workSpaceRoot, 'packages/components'), '').slice(0, -6)}${name}.mjs`,
          },
        ],
        verbose: true,
      }),
    );
  } else if (ignoreLess) {
    plugins.push(
      ignoreImport({
        include: [resolve(await getWorkSpaceRoot(), 'packages/components/**/style/index.js')],
      }),
    );
  } else {
    plugins.push(
      staticImport({
        baseDir: resolve(await getWorkSpaceRoot(), 'packages/components'),
        include: [resolve(await getWorkSpaceRoot(), 'packages/components/**/style/index.js')],
      }),
      staticImport({
        baseDir: resolve(await getWorkSpaceRoot(), 'packages/common'),
        include: [resolve(await getWorkSpaceRoot(), 'packages/common/style/web/**/*.less')],
      }),
      ignoreImport({
        include: [resolve(await getWorkSpaceRoot(), 'packages/components/*/style/*')],
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
          ascii_only: true,
        },
      }),
    );
  }
  return plugins;
};

export const buildCss = async () => {
  const workSpaceRoot = await getWorkSpaceRoot();
  const bundle = await rollup({
    input: [resolve(workSpaceRoot, 'packages/components/**/style/index.js')],
    plugins: [
      multiInput({ relative: resolve(workSpaceRoot, 'packages/components') }),
      styles({ mode: 'extract' }),
      nodeResolve(),
    ],
  });
  bundle.write({
    banner,
    dir: resolve(workSpaceRoot, 'packages/tdesign-vue-next', 'es/'),
    assetFileNames: '[name].css',
  });
};

export const buildEs = async () => {
  const workSpaceRoot = await getWorkSpaceRoot();
  // const tdesignVueNextRoot = await getTdesignVueNextRoot();
  // lodash会使ssr无法运行,@babel\runtime affix组件报错,tinycolor2 颜色组件报错,dayjs 日期组件报错
  const exception = ['tinycolor2', 'dayjs'];
  const esExternal = esExternalDeps.concat(externalPeerDeps).filter((value) => !exception.includes(value));
  const input = await getInputList();
  const bundle = await rollup({
    input: input.concat(`!${resolve(workSpaceRoot, 'packages/components/index-lib.ts')}`),
    // 为了保留 style/css.js
    treeshake: false,
    external: esExternal,
    plugins: [multiInput({ relative: resolve(workSpaceRoot, 'packages/components') })].concat(
      await getPlugins({ extractMultiCss: true }),
    ),
  });
  bundle.write({
    banner,
    dir: resolve(workSpaceRoot, 'packages/tdesign-vue-next', 'es/'),
    format: 'esm',
    sourcemap: true,
    entryFileNames: '[name].mjs',
    chunkFileNames: '_chunks/dep-[hash].mjs',
  });
  const files = await glob(`${resolve(workSpaceRoot, 'packages/tdesign-vue-next', 'es/**/style/index.js')}`);
  const rewrite = files.map(async (filePath) => {
    await remove(filePath);
  });
  await Promise.all(rewrite);
};

export const buildEsm = async () => {
  const workSpaceRoot = await getWorkSpaceRoot();
  const input = await getInputList();
  const bundle = await rollup({
    input: input.concat(`!${resolve(workSpaceRoot, 'packages/components/index-lib.ts')}`),
    treeshake: false,
    external: externalDeps.concat(externalPeerDeps),
    plugins: [
      multiInput({ relative: resolve(workSpaceRoot, 'packages/components') }),
      copy({
        targets: [
          {
            src: resolve(workSpaceRoot, 'packages/common/style/web/**/*.less'),
            dest: resolve(workSpaceRoot, 'packages/tdesign-vue-next', 'esm'),
            rename: (name, extension, fullPath) => `${fullPath.replace(resolve(workSpaceRoot, 'packages'), '')}`,
          },
        ],
        verbose: true,
      }),
    ].concat(await getPlugins({ ignoreLess: false })),
  });
  await bundle.write({
    banner,
    dir: resolve(workSpaceRoot, 'packages/tdesign-vue-next', 'esm/'),
    format: 'esm',
    sourcemap: true,
    chunkFileNames: '_chunks/dep-[hash].js',
  });

  // 替换 @tdesign/common-style 为 tdesign-vue-next/esm/common/style
  // TODO 这个可以提取成公共函数
  // 这里稍微有点性能问题
  const files = await glob(`${resolve(workSpaceRoot, 'packages/tdesign-vue-next', 'esm/', '**/style/*.js')}`);
  const rewrite = files.map(async (filePath) => {
    const content = await readFile(filePath, 'utf8');
    await writeFile(filePath, content.replace(/@tdesign\/common-style/g, 'tdesign-vue-next/esm/common/style'), 'utf8');
  });
  await Promise.all(rewrite);
};

export const buildLib = async () => {
  const workSpaceRoot = await getWorkSpaceRoot();
  const input = await getInputList();
  const bundle = await rollup({
    input,
    external: externalDeps.concat(externalPeerDeps),
    plugins: [multiInput({ relative: resolve(workSpaceRoot, 'packages/components') })].concat(await getPlugins()),
  });
  await bundle.write({
    banner,
    dir: resolve(workSpaceRoot, 'packages/tdesign-vue-next', 'lib/'),
    format: 'esm',
    sourcemap: true,
    chunkFileNames: '_chunks/dep-[hash].js',
  });
};

export const buildCjs = async () => {
  const cjsExternalException = ['lodash-es'];
  const cjsExternal = externalDeps.concat(externalPeerDeps).filter((value) => !cjsExternalException.includes(value));
  const workSpaceRoot = await getWorkSpaceRoot();
  const input = await getInputList();

  const bundle = await rollup({
    input,
    external: cjsExternal,
    plugins: [multiInput({ relative: resolve(workSpaceRoot, 'packages/components') })].concat(await getPlugins()),
  });
  await bundle.write({
    banner,
    dir: resolve(workSpaceRoot, 'packages/tdesign-vue-next', 'cjs/'),
    format: 'cjs',
    sourcemap: true,
    exports: 'named',
    chunkFileNames: '_chunks/dep-[hash].js',
  });
};

export const buildUmd = async (isMin = false) => {
  const workSpaceRoot = await getWorkSpaceRoot();
  const bundle = await rollup({
    input: await getInput(),
    external: externalPeerDeps,
    plugins: isMin
      ? await getPlugins({
          isProd: true,
          extractOneCss: true,
          env: 'production',
        })
      : [
          analyzer({
            limit: 5,
            summaryOnly: true,
          }),
          ...(await getPlugins({
            env: 'development',
            extractOneCss: true,
          })),
        ],
  });
  await bundle.write({
    name: 'TDesign',
    banner,
    format: 'umd',
    exports: 'named',
    globals: { vue: 'Vue' },
    sourcemap: true,
    file: resolve(workSpaceRoot, 'packages/tdesign-vue-next', `dist/${name}${isMin ? '.min' : ''}.js`),
  });
};

// 单独导出 reset.css 到 dist 目录，兼容旧版本样式
export const buildResetCss = async () => {
  const workSpaceRoot = await getWorkSpaceRoot();
  const bundle = await rollup({
    input: resolve(workSpaceRoot, 'packages/common/style/web/_reset.less'),
    plugins: [postcss({ extract: true })],
  });
  await bundle.write({
    file: resolve(workSpaceRoot, 'packages/tdesign-vue-next', 'dist/reset.css'),
  });
};

// 单独导出 plugin 相关组件的样式，支持修改前缀的但因为上下文暂时无法获取的情况使用
export const buildPluginCss = async () => {
  const workSpaceRoot = await getWorkSpaceRoot();
  const bundle = await rollup({
    input: resolve(workSpaceRoot, 'packages/common/style/web/_plugin.less'),
    plugins: [postcss({ extract: true })],
  });
  await bundle.write({
    file: resolve(workSpaceRoot, 'dist/plugin.css'),
  });
};

export const buildComponents = async () => {
  await buildCss();
  await buildEs();
  await buildEsm();
  await buildLib();
  await buildCjs();
  await buildUmd();
  await buildUmd(true);
  await buildResetCss();
  await buildPluginCss();
};
