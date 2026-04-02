/**
 * 自动将 _example 中的 Vue SFC（lang="ts" / lang="tsx"）编译为普通 JS 版本，
 * 输出到同级的 _example-js 目录。
 *
 * 用法: tsx script/generate-js-examples.ts
 *
 * 转换逻辑:
 *   1. <script lang="ts" setup>  →  <script setup>   (去掉类型标注)
 *   2. <script lang="tsx" setup> →  <script setup>   (去掉类型标注，JSX 保留)
 *   3. 无 script 或已经是 JS   →  原样复制
 *   4. <template> / <style> 部分保持不变
 */

import { readdirSync, statSync, existsSync, mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { join, relative, dirname } from 'node:path';
import { transform } from 'esbuild';

const COMPONENTS_DIR = join(__dirname, '..', 'packages', 'components');

// 匹配 lang="ts" 或 lang="tsx"
const LANG_ATTR_RE = /\s+lang=["'](tsx?)["']/;
// 匹配整个 <script ...>...</script> 块（支持多个）
const SCRIPT_BLOCK_RE = /(<script\b[^>]*>)([\s\S]*?)(<\/script>)/g;

/**
 * 将 Vue SFC 中的 TS/TSX script 块转换为 JS
 */
async function transformVueSFC(source: string): Promise<string> {
  // 检查是否有 lang="ts" 或 lang="tsx"
  if (!LANG_ATTR_RE.test(source)) {
    // 没有 TS，原样返回
    return source;
  }

  let result = source;
  const blocks: { original: string; transformed: string }[] = [];

  // 收集所有 script 块
  const matches = [...source.matchAll(SCRIPT_BLOCK_RE)];

  for (const match of matches) {
    const [fullMatch, openTag, scriptContent, closeTag] = match;
    const langMatch = openTag.match(LANG_ATTR_RE);

    if (!langMatch) {
      // 这个 script 块没有 lang="ts"/"tsx"，跳过
      continue;
    }

    const lang = langMatch[1]; // "ts" 或 "tsx"

    // 使用 esbuild 去掉类型标注
    const { code: jsCode } = await transform(scriptContent, {
      loader: lang === 'tsx' ? 'tsx' : 'ts',
      jsx: lang === 'tsx' ? 'preserve' : undefined,
      charset: 'utf8',
      // 去掉 import type 等类型导入
      tsconfigRaw: {
        compilerOptions: {
          // 保留 JSX
          jsx: 'preserve',
          // 确保 verbatimModuleSyntax 关闭，让 esbuild 处理 type-only imports
          verbatimModuleSyntax: false,
        },
      },
    });

    // 重建 open tag：去掉 lang 属性
    const newOpenTag = openTag.replace(LANG_ATTR_RE, '');

    // 清理 esbuild 输出：去掉尾部多余空行，确保开头有换行
    let cleanedCode = jsCode.replace(/\n{3,}/g, '\n\n').replace(/\n+$/, '\n');
    // 确保 script 标签后的代码从新行开始
    if (!cleanedCode.startsWith('\n')) {
      cleanedCode = `\n${cleanedCode}`;
    }

    blocks.push({
      original: fullMatch,
      transformed: `${newOpenTag}${cleanedCode}${closeTag}`,
    });
  }

  // 替换所有转换过的 script 块
  for (const block of blocks) {
    result = result.replace(block.original, block.transformed);
  }

  return result;
}

/**
 * 递归收集目录下所有 .vue 文件
 */
function collectVueFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      files.push(...collectVueFiles(fullPath));
    } else if (entry.endsWith('.vue')) {
      files.push(fullPath);
    }
  }
  return files;
}

/**
 * 主流程
 */
async function main() {
  const startTime = Date.now();
  let totalFiles = 0;
  let transformedFiles = 0;
  let skippedFiles = 0;

  // 遍历所有组件
  const components = readdirSync(COMPONENTS_DIR).filter((name) => {
    const exampleDir = join(COMPONENTS_DIR, name, '_example');
    return statSync(join(COMPONENTS_DIR, name)).isDirectory() && existsSync(exampleDir);
  });

  console.log(`\x1B[36m[generate-js-examples]\x1B[0m 开始处理 ${components.length} 个组件...`);

  for (const component of components) {
    const exampleDir = join(COMPONENTS_DIR, component, '_example');
    const jsExampleDir = join(COMPONENTS_DIR, component, '_example-js');

    // 清理旧的 _example-js 目录
    if (existsSync(jsExampleDir)) {
      rmSync(jsExampleDir, { recursive: true });
    }

    // 收集所有 vue 文件
    const vueFiles = collectVueFiles(exampleDir);

    if (vueFiles.length === 0) continue;

    for (const vuePath of vueFiles) {
      totalFiles++;
      const source = readFileSync(vuePath, 'utf-8');
      const relativePath = relative(exampleDir, vuePath);
      const targetPath = join(jsExampleDir, relativePath);

      try {
        const transformed = await transformVueSFC(source);

        // 确保目标目录存在
        const targetDir = dirname(targetPath);
        if (!existsSync(targetDir)) {
          mkdirSync(targetDir, { recursive: true });
        }

        writeFileSync(targetPath, transformed, 'utf-8');

        if (transformed !== source) {
          transformedFiles++;
        } else {
          skippedFiles++;
        }
      } catch (err) {
        console.error(`\x1B[31m[generate-js-examples]\x1B[0m 转换失败: ${vuePath}`);
        console.error(err);
        // 转换失败时原样复制
        const targetDir = dirname(targetPath);
        if (!existsSync(targetDir)) {
          mkdirSync(targetDir, { recursive: true });
        }
        writeFileSync(targetPath, source, 'utf-8');
        skippedFiles++;
      }
    }
  }

  const elapsed = Date.now() - startTime;
  console.log(
    `\x1B[32m[generate-js-examples]\x1B[0m 完成! ` +
      `共 ${totalFiles} 个文件, ` +
      `${transformedFiles} 个已转换, ` +
      `${skippedFiles} 个无需转换, ` +
      `耗时 ${elapsed}ms`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
