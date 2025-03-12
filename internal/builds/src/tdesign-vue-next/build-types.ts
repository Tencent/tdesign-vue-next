import { globSync } from 'glob';
import { run } from '@tdesign/internal-utils';
import { readFile, copy, writeFile, remove } from 'fs-extra';
import { resolve, getWorkSpaceRoot } from '@tdesign/internal-utils';

const generateSourceTypes = async () => {
  // 1. 编译 tsc
  await run('tsc --outDir dist/types -p tsconfig.json --emitDeclarationOnly');

  const workSpaceRoot = await getWorkSpaceRoot();
  const distTypesDir = resolve(workSpaceRoot, 'dist/types');

  // 2. 删除 style 目录
  const styleDirPaths = globSync(`${resolve(distTypesDir, 'packages/**/style')}`);
  await Promise.all(
    styleDirPaths.map(async (styleDirPath) => {
      await remove(styleDirPath);
    }),
  );

  // 3. 复制 common 到 packages 下
  await copy(resolve(distTypesDir, 'packages/common'), resolve(distTypesDir, 'packages/components/common'));
};

const generateTargetTypes = async (target: 'es' | 'esm' | 'lib' | 'cjs') => {
  const workSpaceRoot = await getWorkSpaceRoot();
  const distTypesDir = resolve(workSpaceRoot, 'dist/types');

  // 1. 复制 packages/components 到 packages/tdesign-vue-next/target 下
  const targetDir = resolve(workSpaceRoot, `packages/tdesign-vue-next/${target}`);
  await copy(resolve(distTypesDir, `packages/components`), targetDir);

  // 2. 替换 @tdesign/common-js 为 tdesign-vue-next/common/js
  const dtsPaths = globSync(`${resolve(targetDir, '**/*.d.ts')}`);
  const rewrite = dtsPaths.map(async (filePath) => {
    const content = await readFile(filePath, 'utf8');
    await writeFile(filePath, content.replace(/@tdesign\/common-js/g, `tdesign-vue-next/${target}/common/js`), 'utf8');
  });
  await Promise.all(rewrite);
};

const removeSourceTypes = async () => {
  const workSpaceRoot = await getWorkSpaceRoot();
  const distTypesRoot = resolve(workSpaceRoot, 'dist');
  await remove(distTypesRoot);
};

export const buildTypes = async () => {
  await removeSourceTypes();
  await generateSourceTypes();
  const targets = ['es', 'esm', 'lib', 'cjs'] as const;
  await Promise.all(
    targets.map(async (target) => {
      await generateTargetTypes(target);
    }),
  );
  await removeSourceTypes();
};
