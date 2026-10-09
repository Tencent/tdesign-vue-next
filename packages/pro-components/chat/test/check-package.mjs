import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const packageRoot = fileURLToPath(new URL('../../../tdesign-vue-next-chat/', import.meta.url));
const artifacts = ['es', 'esm'];
for (const artifact of artifacts) {
  const root = path.join(packageRoot, artifact);
  assert.ok(fs.existsSync(path.join(root, 'index.d.ts')), `${artifact} 缺少入口类型声明`);
  assert.ok(fs.existsSync(path.join(root, artifact === 'es' ? 'index.mjs' : 'index.js')), `${artifact} 缺少入口代码`);
  const walk = (dir) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      assert.ok(!['test', '__tests__'].includes(entry.name), `发布包包含测试文件：${full}`);
      if (entry.isDirectory()) walk(full);
    }
  };
  walk(root);

  // 不读取根 tsconfig，避免源码 paths alias 掩盖发布声明的兼容性问题。
  const consumer = fileURLToPath(new URL('./consumer/public-api.tsx', import.meta.url));
  const program = ts.createProgram([consumer], {
    noEmit: true,
    strict: true,
    skipLibCheck: true,
    target: ts.ScriptTarget.ESNext,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    jsx: ts.JsxEmit.Preserve,
    jsxImportSource: 'vue',
    types: [],
    paths: { '@tdesign-vue-next/chat': [path.join(root, 'index.d.ts')] },
  });
  const diagnostics = ts.getPreEmitDiagnostics(program);
  assert.equal(
    diagnostics.length,
    0,
    `${artifact} 公开类型使用方检查失败：\n${ts.formatDiagnosticsWithColorAndContext(diagnostics, {
      getCanonicalFileName: (file) => file,
      getCurrentDirectory: () => process.cwd(),
      getNewLine: () => '\n',
    })}`,
  );
}
console.info('chat 发布产物检查通过：es / esm 无测试文件，公开类型使用方编译通过');
