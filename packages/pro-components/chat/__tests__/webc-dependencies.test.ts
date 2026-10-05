import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import baseline from '../test/webc-baseline.json';
import { exceededWebcBudget, isWebcModule, webcModules } from '../test/helpers/webc';

const chatRoot = path.resolve(__dirname, '..');
const chatPackage = path.resolve(__dirname, '../../../tdesign-vue-next-chat/package.json');

const sourceReferences = (): Record<string, string[]> => {
  const result: Record<string, string[]> = {};
  const walk = (dir: string) => {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!['node_modules', '__tests__', '_example', '_usage', 'test'].includes(entry.name)) walk(full);
      } else if (/\.(?:ts|tsx|js|jsx|vue)$/.test(entry.name)) {
        const modules = webcModules(fs.readFileSync(full, 'utf8'), full);
        if (modules.length) result[path.relative(chatRoot, full).split(path.sep).join('/')] = modules;
      }
    });
  };
  walk(chatRoot);
  return result;
};

const packageReferences = (): string[] => {
  const pkg = JSON.parse(fs.readFileSync(chatPackage, 'utf8'));
  return Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies, ...pkg.optionalDependencies })
    .filter(isWebcModule)
    .sort();
};

describe('webc 依赖收敛', () => {
  it('组件内允许搬迁引用，但引用预算不得增长或引入新的 webc 包', () => {
    const references = sourceReferences();
    const added = Object.entries(references).flatMap(([file, modules]) =>
      modules
        .filter((module) => !baseline.dependencies.some((pkg) => module === pkg || module.startsWith(`${pkg}/`)))
        .map((module) => `${file}: ${module}`),
    );
    expect(added, '源码引用了新的 webc 包').toEqual([]);
    expect(exceededWebcBudget(references, baseline.units), '组件 webc 引用预算增长').toEqual([]);
  });

  it('发布包不得新增 webc 依赖', () => {
    expect(packageReferences().filter((module) => !baseline.dependencies.includes(module))).toEqual([]);
  });

  it.runIf(process.env.CHAT_MIGRATION_DONE === '1')('迁移收尾时源码与发布包 webc 依赖必须清零', () => {
    expect(sourceReferences(), '源码仍然引用 webc（包括类型引用）').toEqual({});
    expect(packageReferences(), '发布包仍然声明 webc 依赖').toEqual([]);
  });
});
