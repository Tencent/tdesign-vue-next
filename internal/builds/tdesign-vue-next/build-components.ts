import { rollup } from 'rollup';
// @ts-ignore
import multiInput from 'rollup-plugin-multi-input';
import multiEntry from '@rollup/plugin-multi-entry';
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
// @ts-ignore
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
// @ts-ignore
import staticImport from 'rollup-plugin-static-import';
import ignoreImport from 'rollup-plugin-ignore-import';
import copy from 'rollup-plugin-copy';

import { readFile, writeFile, remove } from 'fs-extra';
import pkg from 'tdesign-vue-next/package.json';
import { resolve, getWorkSpaceRoot } from '@tdesign/internal-utils';
import { relative } from 'path';
import { glob } from 'glob';

const name = 'tdesign';
const esExternalDeps = Object.keys(pkg.dependencies || {});
const externalDeps = esExternalDeps.concat(['@babel/runtime']);
const externalPeerDeps = Object.keys(pkg.peerDependencies || {});
const DEFAULT_EXTENSIONS = ['.js', '.jsx', '.es6', '.es', '.mjs'];
const banner = `/**
 * ${name} v${pkg.version}
 * (c) ${new Date().getFullYear()} ${pkg.author}
 * @license ${pkg.license}
 */
`;
const input = 'packages/components/index-lib.ts';
const getInputList = async () => {
  const workspaceRoot = await getWorkSpaceRoot();
  return [
    resolve(workspaceRoot, 'packages/components/**/*.ts'),
    resolve(workspaceRoot, 'packages/components/**/*.tsx'),
    `!${resolve(workspaceRoot, 'packages/components/index-lib.ts')}`,
    `!${resolve(workspaceRoot, 'packages/components/**/demos')}`,
    `!${resolve(workspaceRoot, 'packages/components/**/*.d.ts')}`,
  ];
};

const getPlugins = async ({
  env = '',
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
      presets: [
        [
          '@babel/preset-env',
          {
            targets: {
              browsers: [
                'last 3 Chrome versions',
                'last 3 Firefox versions',
                'Safari >= 10',
                'Explorer >= 11',
                'Edge >= 12',
              ],
              esmodules: true,
            },
            modules: false,
          },
        ],
      ],
      plugins: ['@vue/babel-plugin-jsx', '@babel/plugin-transform-runtime'],
      env: {
        test: {
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  node: 'current',
                },
                modules: 'commonjs',
              },
            ],
          ],
          plugins: ['@vue/babel-plugin-jsx'],
        },
        production: {
          presets: [
            [
              '@babel/preset-env',
              {
                modules: false,
              },
            ],
          ],
          plugins: ['@vue/babel-plugin-jsx', '@babel/plugin-transform-runtime'],
        },
      },
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
            dest: resolve(await getWorkSpaceRoot(), 'es'),
            rename: (name, extension, fullPath) =>
              `${fullPath.replace(resolve(workSpaceRoot, 'packages/components'), '').slice(0, -6)}${name}.mjs`,
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
          /* eslint-disable */
          ascii_only: true,
          /* eslint-enable */
        },
      }),
    );
  }
  return plugins;
};

export const buildCss = async () => {
  const workspaceRoot = await getWorkSpaceRoot();
  const bundle = await rollup({
    input: [resolve(workspaceRoot, 'packages/components/**/style/index.js')],
    plugins: [
      multiInput({ relative: resolve(workspaceRoot, 'packages/components') }),
      styles({ mode: 'extract' }),
      nodeResolve(),
    ],
  });
  bundle.write({
    banner,
    dir: resolve(workspaceRoot, 'es/'),
    assetFileNames: '[name].css',
  });
};

export const buildEs = async () => {
  const workspaceRoot = await getWorkSpaceRoot();
  // const tdesignVueNextRoot = await getTdesignVueNextRoot();
  // lodash会使ssr无法运行,@babel\runtime affix组件报错,tinycolor2 颜色组件报错,dayjs 日期组件报错
  const exception = ['tinycolor2', 'dayjs'];
  const esExternal = esExternalDeps.concat(externalPeerDeps).filter((value) => !exception.includes(value));
  const input = await getInputList();
  const bundle = await rollup({
    input: input.concat(`!${resolve(workspaceRoot, 'packages/components/index-lib.ts')}`),
    // 为了保留 style/css.js
    treeshake: false,
    external: esExternal,
    plugins: [multiInput({ relative: resolve(workspaceRoot, 'packages/components') })].concat(
      await getPlugins({ extractMultiCss: true }),
    ),
  });
  bundle.write({
    banner,
    dir: resolve(workspaceRoot, 'es/'),
    format: 'esm',
    sourcemap: true,
    entryFileNames: '[name].mjs',
    chunkFileNames: '_chunks/dep-[hash].mjs',
  });
};

export const buidlEsm = async () => {
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
            dest: resolve(workSpaceRoot, 'esm'),
            rename: (name, extension, fullPath) => `${fullPath.replace(resolve(workSpaceRoot, 'packages'), '')}`,
          },
        ],
        verbose: true,
      }),
    ].concat(await getPlugins({ ignoreLess: false })),
  });
  await bundle.write({
    banner,
    dir: resolve(workSpaceRoot, 'esm/'),
    format: 'esm',
    sourcemap: true,
    chunkFileNames: '_chunks/dep-[hash].js',
  });

  // 替换 @tdesign/common-style 为 tdesign-vue-next/esm/common/style
  // TODO 这个可以提取成公共函数
  // 这里稍微有点性能问题
  const files = await glob(`${resolve(workSpaceRoot, 'esm/', '**/style/*.js')}`);
  const rewrite = files.map(async (filePath) => {
    const content = await readFile(filePath, 'utf8');
    await writeFile(filePath, content.replace(/@tdesign\/common-style/g, 'tdesign-vue-next/esm/common/style'), 'utf8');
  });
  await Promise.all(rewrite);
};

// export const buidLib = async () => {
//   const workSpaceRoot = await getWorkSpaceRoot();
//   const input = await getInputList();
//   const bundle = await rollup({
//     input: input.concat(`${resolve(workSpaceRoot, 'packages/common/js/**/*.{js,ts}')}`),
//     external: externalDeps.concat(externalPeerDeps),
//     plugins:  [
//       multiInput({ relative: resolve(workSpaceRoot) }),
//       // copy({
//       //   targets: [
//       //     {
//       //       src: resolve(workSpaceRoot, 'packages/common/js/**/*.*'),
//       //       dest: resolve(workSpaceRoot, 'lib'),
//       //       rename: (name, extension, fullPath) =>
//       //         `${fullPath.replace(resolve(workSpaceRoot, 'packages'), '')}`,
//       //     },
//       //   ],
//       //   verbose: true,
//       // }),
//     ].concat(await getPlugins({ ignoreLess: false })),
//   });
//   await bundle.write({
//     banner,
//     dir: resolve(workSpaceRoot, 'lib/'),
//     format: 'esm',
//     sourcemap: true,
//     chunkFileNames: '_chunks/dep-[hash].js',
//   });

//   // TODO 如上
//   const files = await glob(`${resolve(workSpaceRoot, 'lib/', '**/*.*')}`);
//   // const rewrite = files.map(async (filePath) => {
//   //   const content = await readFile(filePath, 'utf8');
//   //   await writeFile(
//   //     filePath,
//   //     content
//   //       .replace(/@tdesign\/common-style/g, 'tdesign-vue-next/esm/common/style')
//   //       .replace(/@tdesign\/common-js/g, 'tdesign-vue-next/esm/common/js'),
//   //     'utf8'
//   //   );
//   // });
//   // await Promise.all(rewrite);
// };

export const buildComponents = async () => {
  // await buildCss();
  // await buildEs();
  await buidlEsm();
  // await buidLib();
};
