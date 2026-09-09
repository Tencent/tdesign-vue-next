/**
 * 为每个组件生成 LLM 友好的 Markdown 文档（对齐 Ant Design button-cn.md 模式）。
 * 数据均来自仓库已有文档，零新增维护成本。
 *
 * 以 vite 插件形式提供（默认导出）：
 *   dev：拦截 /llms/* 请求，实时返回生成的 Markdown / 索引
 *   build：closeBundle 阶段把全部 llms 文档写入 site/dist/llms
 *
 * 用法:
 *   tsx script/generate-llms-md.ts                 # 全量生成到 site/dist/llms
 *   tsx script/generate-llms-md.ts --only button   # 只生成指定组件
 *
 * 也可作为核心生成模块被引用，导出 generateLlmsMd / generateComponentLlms 等。
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import type { ViteDevServer } from 'vite';

// 兼容 tsx / vite(ESM) 执行
/* eslint-disable no-underscore-dangle */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/* eslint-enable no-underscore-dangle */

// ---------- 路径工具 ----------
const WORKSPACE_ROOT = path.resolve(__dirname, '..');
const PACKAGES_ROOT = path.join(WORKSPACE_ROOT, 'packages');
const COMPONENTS_ROOT = path.join(PACKAGES_ROOT, 'components');
const PRO_CHAT_ROOT = path.join(PACKAGES_ROOT, 'pro-components', 'chat');
const COMMON_ROOT = path.join(PACKAGES_ROOT, 'common');
const API_DOCS_DIR = path.join(COMMON_ROOT, 'docs', 'web', 'api');
const DESIGN_DOCS_DIR = path.join(COMMON_ROOT, 'docs', 'web', 'design');

// 默认输出目录：packages/tdesign-vue-next/site/dist/llms
const DEFAULT_OUTPUT_DIR = path.join(PACKAGES_ROOT, 'tdesign-vue-next', 'site', 'dist', 'llms');

/**
 * llms 输出目录（vite 插件 dev 中间件与 build 写盘共用）。
 */
export function getLlmsDir() {
  return DEFAULT_OUTPUT_DIR;
}

// ---------- spline -> category 映射 ----------
const SPLINE_TO_CATEGORY: Record<string, string> = {
  base: '基础',
  layout: '布局',
  navigation: '导航',
  form: '输入',
  data: '数据展示',
  message: '消息提醒',
  explain: '说明',
  ai: 'AI 对话',
};

export function splineToCategory(spline?: string): string {
  if (!spline) return '通用';
  return SPLINE_TO_CATEGORY[spline] || spline;
}

// ---------- 组件元信息 ----------
export interface LlmsComponent {
  name: string;
  title: string;
  description: string;
  spline?: string;
  category: string;
  apiPath: string;
  componentDocPath: string;
  exampleDir: string;
  designPath?: string;
}

export function findComponentRoot(name: string): string | null {
  const candidates = [path.join(COMPONENTS_ROOT, name), path.join(PRO_CHAT_ROOT, name)];
  for (const c of candidates) {
    if (fs.existsSync(path.join(c, `${name}.md`))) return c;
  }
  return null;
}

export function listComponentNames(): string[] {
  if (!fs.existsSync(API_DOCS_DIR)) return [];
  return fs
    .readdirSync(API_DOCS_DIR)
    .filter((f) => f.endsWith('.md') && !f.endsWith('.en-US.md'))
    .map((f) => f.replace(/\.md$/, ''));
}

function readFrontmatter(file: string): Record<string, any> {
  try {
    return matter(fs.readFileSync(file, 'utf-8'), {}).data || {};
  } catch {
    return {};
  }
}

function buildMeta(name: string, apiPath: string, root: string | null): LlmsComponent {
  const data = readFrontmatter(apiPath);
  const componentDocPath = root ? path.join(root, `${name}.md`) : '';
  const exampleDir = root ? path.join(root, '_example') : '';
  const designPath = path.join(DESIGN_DOCS_DIR, `${name}.md`);

  return {
    name,
    title: data.title || name,
    description: data.description || '',
    spline: data.spline,
    category: splineToCategory(data.spline),
    apiPath,
    componentDocPath,
    exampleDir,
    designPath: fs.existsSync(designPath) ? designPath : undefined,
  };
}

export function getComponentMeta(name: string): LlmsComponent | null {
  const apiPath = path.join(API_DOCS_DIR, `${name}.md`);
  if (!fs.existsSync(apiPath)) return null;
  return buildMeta(name, apiPath, findComponentRoot(name));
}

export function listComponents(): LlmsComponent[] {
  return listComponentNames()
    .map((name) => getComponentMeta(name))
    .filter((c): c is LlmsComponent => c !== null);
}

// ---------- 文档生成 ----------
function stripHtmlComments(text: string): string {
  return text.replace(/<!--[\s\S]*?-->/g, '');
}

function readDemoCode(exampleDir: string, demo: string): string {
  const safeName = demo.replace(/[^a-zA-Z0-9_./-]/g, '');
  const demoPath = path.join(exampleDir, `${safeName}.vue`);
  if (!fs.existsSync(demoPath)) return '';
  const code = fs.readFileSync(demoPath, 'utf-8');
  return `\`\`\`vue\n${code}\n\`\`\``;
}

/**
 * 将文档正文中的 {{ demo }} 占位符替换为对应示例源码代码块。
 */
export function replaceDemos(body: string, exampleDir: string): string {
  if (!exampleDir || !fs.existsSync(exampleDir)) return body;
  // 使用 replace + 回调，一次遍历所有占位符，避免因改写 length 导致正则 lastIndex 错位而陷入死循环
  const demoReg = /\{\{\s+([\w.-]+)\s+\}\}/g;
  return body.replace(demoReg, (match, demo: string) => {
    const code = readDemoCode(exampleDir, demo);
    return code ? `\n\n${code}\n` : '';
  });
}

/**
 * 生成单个组件的纯 Markdown 文档内容。
 */
export function generateComponentMarkdown(meta: LlmsComponent): string {
  const { name, apiPath, componentDocPath, exampleDir, designPath } = meta;

  const apiRaw = fs.existsSync(apiPath) ? fs.readFileSync(apiPath, 'utf-8') : '';
  const { data, content: apiContent } = matter(apiRaw, {});

  const shellRaw =
    componentDocPath && fs.existsSync(componentDocPath) ? fs.readFileSync(componentDocPath, 'utf-8') : '';

  // 1. 关键信息：优先取当前 apiPath 指向文件的 frontmatter（英文版可取英文标题）
  const title = data.title || meta.title || name;
  const description = data.description || meta.description || '';

  // 2. 拆分演示正文与 API 部分
  //    - API 部分来自组件文档（shell）中 `## API` 之后的内容（含标题）
  //    - 演示正文来自 api 文档正文
  const apiMatched = shellRaw.match(/(^|\n)## API[\s\S]*$/);
  const apiText = apiMatched ? apiMatched[0].trim() : '';

  // 演示正文：api 文档内容（剔除注释），若 API 也在 api 正文中则一并切分
  let demoBody = stripHtmlComments(apiContent).trim();
  const apiInDemo = demoBody.match(/(^|\n)## API[\s\S]*$/);
  if (apiInDemo) {
    demoBody = demoBody.replace(apiInDemo[0], '').trim();
  }

  // 若 shell 中也包含 API 之外的内容（如 ::: 容器、额外说明），追加到 demo 部分
  const shellNonApi = shellRaw
    .replace(apiMatched ? apiMatched[0] : '', '')
    .replace(':: BASE_DOC ::', '')
    .trim();

  // 3. 替换 demo 占位符为源码
  demoBody = replaceDemos(demoBody, exampleDir);
  const shellNonApiResolved = replaceDemos(shellNonApi, exampleDir);

  // 4. 组装正文
  const sections: string[] = [];
  // 演示正文 = api 文档正文 + 组件文档中位于 API 之前的内容
  const demoParts = [demoBody, shellNonApiResolved].filter(Boolean).join('\n\n');
  if (demoParts) {
    // 若演示正文以三级或更深标题/纯文本开头，为其外挂 ## 代码演示 外壳，
    // 使其结构对齐 Ant Design 文档。若本身已是二级标题则不重复嵌套。
    const firstHeading = demoParts.match(/^(#{1,6})\s/);
    const headingLevel = firstHeading ? firstHeading[1].length : 0;
    if (headingLevel >= 3 || headingLevel === 0) {
      sections.push(`## 代码演示\n\n${demoParts}`);
    } else {
      sections.push(demoParts);
    }
  }
  if (apiText) sections.push(apiText);
  if (designPath && fs.existsSync(designPath)) {
    const designRaw = fs.readFileSync(designPath, 'utf-8');
    const { content: designContent } = matter(designRaw, {});
    sections.push(`## 设计指南\n\n${designContent.trim()}`);
  }

  const body = sections.join('\n\n');

  // 5. 组装 frontmatter
  const category = data.spline ? splineToCategory(data.spline) : meta.category;
  const frontmatter = [
    '---',
    `title: ${title}`,
    description ? `description: ${description}` : '',
    `category: ${category}`,
    '---',
  ]
    .filter(Boolean)
    .join('\n');

  return `${frontmatter}\n\n${body}\n`;
}

// ---------- index（llms.txt）生成 ----------
const INDEX_TEMPLATE = `# TDesign Vue Next Component Library

This is a machine-readable index of the TDesign Vue Next component documentation.

URL: https://tdesign.tencent.com/vue-next/llms/

## Component Categories

{categorySections}

> Each component page is available at /vue-next/llms/{component}.md
`;

export function buildIndexText(components: LlmsComponent[]): string {
  const groups = new Map<string, LlmsComponent[]>();
  for (const c of components) {
    const cat = c.category;
    if (!groups.has(cat)) groups.set(cat, []);
    groups.get(cat)?.push(c);
  }

  const sections: string[] = [];
  for (const [cat, items] of groups.entries()) {
    const lines: string[] = [`## ${cat}`];
    for (const item of items) {
      lines.push(`- [${item.title}](${item.name}.md)`);
    }
    sections.push(lines.join('\n'));
  }

  return INDEX_TEMPLATE.replace('{categorySections}', sections.join('\n\n'));
}

// ---------- 主流程 ----------
export interface GenerateOptions {
  outputDir?: string;
  only?: string;
  write?: boolean;
}

export function generateLlmsMd(options: GenerateOptions = {}) {
  const outputDir = options.outputDir || DEFAULT_OUTPUT_DIR;
  const write = options.write !== false;

  const all = listComponents();
  const onlyList = options.only ? options.only.split(',').map((s) => s.trim()) : [];
  const targets = options.only ? all.filter((c) => onlyList.includes(c.name)) : all;

  const files: Record<string, string> = {};

  for (const meta of targets) {
    files[`${meta.name}.md`] = generateComponentMarkdown(meta);
    files[`${meta.name}.en-US.md`] = generateEnglishMarkdown(meta);
  }

  files['llms.txt'] = buildIndexText(targets);

  if (write) {
    fs.mkdirSync(outputDir, { recursive: true });
    for (const [fileName, content] of Object.entries(files)) {
      fs.writeFileSync(path.join(outputDir, fileName), content, 'utf-8');
    }
  }

  return { outputDir, files, count: targets.length };
}

/**
 * 生成某组件的英文版文档。
 * 基于英文 api / 组件文档生成；缺失时回退中文版。
 */
export function generateEnglishMarkdown(meta: LlmsComponent): string {
  const enApiPath = path.join(API_DOCS_DIR, `${meta.name}.en-US.md`);
  const enDesignPath = path.join(DESIGN_DOCS_DIR, `${meta.name}.en-US.md`);
  const enComponentDocPath = meta.componentDocPath ? meta.componentDocPath.replace(/\.md$/, '.en-US.md') : '';

  const enMeta: LlmsComponent = {
    ...meta,
    apiPath: fs.existsSync(enApiPath) ? enApiPath : meta.apiPath,
    componentDocPath:
      enComponentDocPath && fs.existsSync(enComponentDocPath) ? enComponentDocPath : meta.componentDocPath,
    designPath: fs.existsSync(enDesignPath) ? enDesignPath : meta.designPath,
  };

  return generateComponentMarkdown(enMeta);
}

// ---------- vite 插件 ----------
/**
 * 将 llms 生成能力封装为 vite 插件（默认导出）：
 *  - dev：拦截 /llms/* 请求，实时返回生成的 Markdown / 索引
 *  - build：closeBundle 阶段把全部 llms 文档写入 site/dist/llms
 *
 * 在 vite.config.ts 中直接引入即可：
 *   import llmsMd from '../../../script/generate-llms-md';
 *   plugins: [..., llmsMd()]
 */
export interface LlmsMdPluginOptions {
  /** 输出目录，默认 site/dist/llms */
  outputDir?: string;
}

export default function llmsMd(options: LlmsMdPluginOptions = {}) {
  const outputDir = options.outputDir || getLlmsDir();

  return {
    name: 'llms-md',
    configureServer(server: ViteDevServer) {
      // 拦截 /llms/* 请求：url 中保留子路径（不含 /llms 前缀由 express 自动剥离）
      server.middlewares.use('/llms', async (req, res) => {
        try {
          res.setHeader('Content-Type', 'text/markdown; charset=utf-8');
          const urlPath = (req.url || '').split('?')[0];
          const fileName = urlPath.replace(/^\/+/, '');

          if (fileName === '' || fileName === 'llms.txt') {
            res.end(buildIndexText(listComponents()));
            return;
          }

          const name = fileName.replace(/\.en-US\.md$/, '').replace(/\.md$/, '');
          const isEn = fileName.endsWith('.en-US.md');
          const meta = getComponentMeta(name);
          if (!meta) {
            res.statusCode = 404;
            res.end(`# ${name} not found`);
            return;
          }
          const md = isEn ? generateEnglishMarkdown(meta) : generateComponentMarkdown(meta);
          res.end(md);
        } catch (err) {
          res.statusCode = 500;
          res.end(`# Error\n${(err as Error).message}`);
        }
      });
    },
    /**
     * closeBundle 只在 vite build 时触发（dev 服务器不会调用），
     * 因此无需判断环境变量，构建成功即写入物理文件。
     */
    async closeBundle(error?: Error) {
      if (error) return;
      generateLlmsMd({ outputDir });
    },
  };
}

// ---------- CLI ----------
// 通过 import.meta.url 判断当前文件是否作为入口直接执行，兼容 tsx / vite(ESM)
const isMain = process.argv[1] ? fileURLToPath(import.meta.url) === path.resolve(process.argv[1]) : false;
if (isMain) {
  const args = process.argv.slice(2);
  const onlyIndex = args.indexOf('--only');
  const only = onlyIndex >= 0 ? args[onlyIndex + 1] : undefined;
  const start = Date.now();

  try {
    const result = generateLlmsMd({ only });
    console.log(
      `\x1B[36m[generate-llms-md]\x1B[0m 完成! 共生成 ${result.count} 个组件文档，${
        Object.keys(result.files).length
      } 个文件`,
    );
    console.log(`\x1B[36m[generate-llms-md]\x1B[0m 输出目录: ${result.outputDir}`);
    console.log(`\x1B[36m[generate-llms-md]\x1B[0m 耗时 ${Date.now() - start}ms`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
