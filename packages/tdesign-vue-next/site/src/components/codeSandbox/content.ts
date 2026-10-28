import { catalogs } from '@tdesign/internal-utils/catalogs';
import { tdesignVueNextPackageJson } from '@tdesign/internal-utils/package-json';

export const htmlContent = '<div id="app"></div>';

export const mainJsContent = `
  import { createApp } from 'vue';
  import TDesign from 'tdesign-vue-next';
  import Demo from './demo.vue';

  // 引入组件库全局样式资源
  import 'tdesign-vue-next/es/style/index.css';
  import './index.css';

  const app = createApp(Demo);

  app.use(TDesign).mount('#app');
`;

export const styleContent = `
  /* 竖排展示 demo 行间距 16px */
  .tdesign-demo-block-column {
    display: flex;
    flex-direction: column;
    row-gap: 16px;
  }

  /* 竖排展示 demo 行间距 32px */
  .tdesign-demo-block-column-large {
    display: flex;
    flex-direction: column;
    row-gap: 32px;
  }

  /* 横排排展示 demo 列间距 16px */
  .tdesign-demo-block-row {
    display: flex;
    column-gap: 16px;
    align-items: center;
  }

  /* swiper 组件示例展示 */
  .tdesign-demo-block--swiper .demo-item {
    display: flex;
    height: 280px;
    background-color: #4b5b76;
    color: #fff;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    font-size: 20px;
  }

  /* grid 组件示例展示 */
  .tdesign-demo-item--grid .t-col > div {
    min-height: 40px;
    margin-top: 8px;
    margin-bottom: 8px;
    background: #366ef4;
    color: #fff;
    text-align: center;
    line-height: 40px;
  }

  .tdesign-demo-item--grid .t-col:nth-of-type(2n) > div {
    background: #8eabff;
  }

`;

export async function prepareDemoCode(code: string) {
  const { parse, compileScript } = await import('vue/compiler-sfc');
  const { descriptor, errors } = parse(code);
  if (errors.length) throw new Error(String(errors[0]));
  const script = descriptor.scriptSetup
    ? compileScript(descriptor, {
        id: 'codesandbox-demo',
        inlineTemplate: true,
        templateOptions: { compilerOptions: { scopeId: undefined, hoistStatic: false } },
      })
    : descriptor.script;
  if (!script || (!descriptor.scriptSetup && !/^(ts|tsx|jsx)$/.test(script.lang || ''))) return code;

  const { transform } = await import('@babel/standalone');
  const lang = script.lang || 'js';
  const useJsx = /^(jsx|tsx)$/.test(lang);
  const jsxPlugin = useJsx ? (await import('@vue/babel-plugin-jsx')).default : null;
  const transformed = transform(script.content, {
    filename: `demo.${lang}`,
    presets: /^tsx?$/.test(lang)
      ? [['typescript', { allExtensions: true, isTSX: lang === 'tsx', onlyRemoveTypeImports: true }]]
      : [],
    plugins: useJsx ? [jsxPlugin] : [],
  }).code;

  const blocks = (
    descriptor.scriptSetup ? [descriptor.script, descriptor.scriptSetup, descriptor.template] : [descriptor.script]
  )
    .filter(Boolean)
    .sort((a, b) => b.loc.start.offset - a.loc.start.offset);
  let result = code;
  for (const block of blocks) {
    const start = code.lastIndexOf(`<${block.type}`, block.loc.start.offset);
    const end = code.indexOf(`</${block.type}>`, block.loc.end.offset) + block.type.length + 3;
    const replacement =
      block === (descriptor.scriptSetup || descriptor.script) ? `<script>\n${transformed}\n</script>` : '';
    result = `${result.slice(0, start)}${replacement}${result.slice(end)}`;
  }
  return result;
}

export const sandboxConfigContent = JSON.stringify({ template: 'vue-cli' }, null, 2);

export const babelrcContent = JSON.stringify({ presets: ['env'], plugins: [] }, null, 2);

export const packageJSONContent = (name: string) => {
  return JSON.stringify(
    {
      name,
      version: '0.0.0',
      private: true,
      main: 'src/main.js',
      dependencies: {
        vue: catalogs.deps.vue,
        less: catalogs.bundle.less,
        'tdesign-vue-next': tdesignVueNextPackageJson.version,
        'tdesign-icons-vue-next': catalogs.tdesign['tdesign-icons-vue-next'],
        dayjs: catalogs.deps.dayjs,
      },
    },
    null,
    2,
  );
};
