import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const packageRoot = fileURLToPath(new URL('../packages/tdesign-vue-next-chat/', import.meta.url));
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
}
console.info('chat 发布产物检查通过：es / esm 均不包含测试代码或声明');
