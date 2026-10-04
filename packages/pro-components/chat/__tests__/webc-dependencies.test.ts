import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import baseline from '../test/webc-baseline.json';
import { isWebcModule, webcModules } from '../test/helpers/webc';

const sourceBaseline: Record<string, string[]> = baseline.sources;
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
  it('源码不得新增 webc 模块引用，允许迁移中删除引用', () => {
    const added = Object.entries(sourceReferences()).flatMap(([file, modules]) =>
      modules.filter((module) => !sourceBaseline[file]?.includes(module)).map((module) => `${file}: ${module}`),
    );
    expect(added, '新增 webc 依赖；迁移过程只允许收缩基线').toEqual([]);
  });

  it('发布包不得新增 webc 依赖', () => {
    expect(packageReferences().filter((module) => !baseline.dependencies.includes(module))).toEqual([]);
  });

  it.runIf(process.env.CHAT_MIGRATION_DONE === '1')('迁移收尾时源码与发布包 webc 依赖必须清零', () => {
    expect(sourceReferences(), '源码仍然引用 webc（包括类型引用）').toEqual({});
    expect(packageReferences(), '发布包仍然声明 webc 依赖').toEqual([]);
  });
});
