import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';
import camelCase from 'camelcase';

import testCoverage from './test-coverage';

// import { compileUsage, getGitTimestamp } from '@td/shared/_common/docs/compile';
// ! zhangpaopao 因为 common/_common 为 cjs 的，所以无法通过 ESM 加载
// 问题来了，为啥 path 可以呢？ 因为 path 是本地文件，而 workspace 是 node_models(依赖)
import { compileUsage, getGitTimestamp } from '../../node_modules/@td/shared/_common/docs/compile';

const DEFAULT_TABS = [
  { tab: 'demo', name: '示例' },
  { tab: 'api', name: 'API' },
  { tab: 'design', name: '指南' },
];

const DEFAULT_EN_TABS = [
  { tab: 'demo', name: 'DEMO' },
  { tab: 'api', name: 'API' },
  { tab: 'design', name: 'Guideline' },
];

export default async function mdToVue(options) {
  const mdSegment = await customRender(options);
  const { demoDefsStr, demoCodesDefsStr, demoInstallStr, demoCodeInstallStr } = options;

  let coverage = {};
  if (mdSegment.isComponent) {
    coverage = testCoverage[camelCase(mdSegment.componentName)] || '0%';
  }

  const sfc = `
    <template>
      <td-doc-content ref="tdDocContent" page-status="hidden">
        ${
          mdSegment.tdDocHeader
            ? `
          <td-doc-header
            slot="doc-header"
            ref="tdDocHeader"
            spline="${mdSegment.spline}"
            platform="web"
          >
          ${mdSegment.isComponent ? `<td-doc-badge slot="badge" label="coverage" message="${coverage}" />` : ''}
          </td-doc-header>`
            : ''
        }
        ${
          mdSegment.isComponent
            ? `
          <td-doc-tabs ref="tdDocTabs" :tab="tab"></td-doc-tabs>

          <div v-show="tab === 'demo'">
            <div name="DEMO">${mdSegment.demoMd}</div>
            <td-contributors
              platform="web"
              framework="vue"
              component-name="${mdSegment.componentName}"
            ></td-contributors>
          </div>
          <div v-show="tab === 'api'" name="API">${mdSegment.apiMd}</div>
          <div v-show="tab === 'design'" name="DESIGN">${mdSegment.designMd}</div>
        `
            : `<div name="DOC" class="${mdSegment.docClass}">${mdSegment.docMd}</div>`
        }
        <div style="margin-top: 48px;">
          <td-doc-history :time="lastUpdated" :key="lastUpdated"></td-doc-history>
        </div>
        <td-doc-footer slot="doc-footer"></td-doc-footer>
      </td-doc-content>
    </template>

    <script>
      ${demoDefsStr}
      ${demoCodesDefsStr}
      ${mdSegment.usage.importStr}
      import Prismjs from 'prismjs';

      export default {

        components: {
          ${mdSegment.usage.installStr}
          ${demoInstallStr}
        },

        data() {
          return {
            ${demoCodeInstallStr}
          };
        },

        computed: {
          lastUpdated() {
            if (this.tab === 'design') return ${mdSegment.designDocLastUpdated};
            return ${mdSegment.lastUpdated};
          },
          tab: {
            get() {
              return this.$route.query.tab || 'demo';
            },
            set(v) {
              if (this.$route.query.tab !== v)
                this.$router.push({ query: { tab: v } });
            }
          },
        },

        mounted() {
          const { tdDocContent, tdDocHeader, tdDocTabs } = this.$refs;

          if (tdDocHeader) {
            tdDocHeader.docInfo = {
              title: \`${mdSegment.title}\`,
              desc: \`${mdSegment.description}\`,
            };
          }
          document.title = \`${mdSegment.title} | TDesign\`;

          if (tdDocTabs) {
            tdDocTabs.tabs = ${JSON.stringify(mdSegment.tdDocTabs)};
            tdDocTabs.onchange = ({ detail: currentTab }) => this.tab = currentTab;
          }

          Prismjs.highlightAll();
    
          this.$emit('loaded', () => {
            tdDocContent.pageStatus = 'show';
          });
        },
      };
    </script>
  `;

  return sfc;
}

// 解析 markdown 内容
async function customRender({ source, file, md }) {
  const { content, data } = matter(source);
  const lastUpdated = (await getGitTimestamp(file)) || Math.round(fs.statSync(file).mtimeMs);
  // console.log('data', data);
  const isEn = file.endsWith('en-US.md');

  // md top data
  const pageData = {
    spline: '',
    toc: true,
    title: '',
    description: '',
    isComponent: false,
    tdDocHeader: true,
    tdDocTabs: !isEn ? DEFAULT_TABS : DEFAULT_EN_TABS,
    apiFlag: /#+\s*API/,
    docClass: '',
    lastUpdated,
    designDocLastUpdated: lastUpdated,
    ...data,
  };

  // md filename
  const reg = file.match(/([\w-]+)\.?([\w-]+)?\.md/);
  const componentName = reg && reg[1];

  // split md
  let [demoMd = '', apiMd = ''] = content.split(pageData.apiFlag);

  const mdSegment = {
    ...pageData,
    componentName,
    usage: { importStr: '', installStr: '' },
    docMd: '<td-doc-empty></td-doc-empty>',
    demoMd: '<td-doc-empty></td-doc-empty>',
    apiMd: '<td-doc-empty></td-doc-empty>',
    designMd: '<td-doc-empty></td-doc-empty>',
  };

  // 渲染 live demo
  if (pageData.usage && pageData.isComponent) {
    const usageObj = compileUsage({
      componentName,
      usage: pageData.usage,
      // ! zhangpaopao 直接走的 node_modules
      demoPath: path.posix.resolve(__dirname, '../../', `node_modules/@td/intel-vue2.7/components/${componentName}/_usage/index.vue`).replace(/\\/g, '/'),
    });
    if (usageObj) {
      mdSegment.usage = usageObj;
      demoMd = `${usageObj.markdownStr} ${demoMd}`;
    }
  }

  if (pageData.isComponent) {
    mdSegment.demoMd = md.render.call(
      md,
      `${pageData.toc ? '[toc]\n' : ''}${demoMd.replace(/<!--[\s\S]+?-->/g, '')}`,
    ).html;
    mdSegment.apiMd = md.render.call(
      md,
      `${pageData.toc ? '[toc]\n' : ''}${apiMd.replace(/<!--[\s\S]+?-->/g, '')}`,
    ).html;
  } else {
    mdSegment.docMd = md.render.call(
      md,
      `${pageData.toc ? '[toc]\n' : ''}${content.replace(/<!--[\s\S]+?-->/g, '')}`,
    ).html;
  }

  // 设计指南内容 不展示 design Tab 则不解析
  if (pageData.isComponent && pageData.tdDocTabs.some((item) => item.tab === 'design')) {
    // ! zhangpaopao 直接走的 node_modules
    const designDocPath = path.resolve(__dirname, '../../', `node_modules/@td/shared/_common/docs/web/design/${componentName}.md`);

    if (fs.existsSync(designDocPath)) {
      const designDocLastUpdated =
        (await getGitTimestamp(designDocPath)) || Math.round(fs.statSync(designDocPath).mtimeMs);
      mdSegment.designDocLastUpdated = designDocLastUpdated;

      const designMd = fs.readFileSync(designDocPath, 'utf-8');
      mdSegment.designMd = md.render.call(md, `${pageData.toc ? '[toc]\n' : ''}${designMd}`).html;
    } else {
      console.log(`[vite-plugin-tdoc]: 未找到 ${designDocPath} 文件`);
    }
  }

  return mdSegment;
}
