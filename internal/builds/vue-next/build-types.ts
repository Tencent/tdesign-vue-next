import path from 'node:path';
import { glob } from 'glob';
import { readFile, copy, writeFile, remove } from 'fs-extra';
import { run, joinPosix, joinWorkspaceRoot, joinTdesignVueNextRoot } from '@tdesign/internal-utils';

const typesTempDir = 'vue-next';

const generateSourceTypes = async () => {
  // 1. 编译 tsc
  await run(`tsc --outDir ${typesTempDir} -p tsconfig.json --emitDeclarationOnly`);

  const typesRoot = joinWorkspaceRoot(typesTempDir);

  // 2. 删除 style 目录
  const styleDirPaths = await glob(`${joinPosix(typesRoot, 'packages/**/style')}`);
  await Promise.all(
    styleDirPaths.map(async (styleDirPath) => {
      await remove(styleDirPath);
    }),
  );

  // 3. 复制 common 到 packages 下
  await copy(joinPosix(typesRoot, 'packages/common'), joinPosix(typesRoot, 'packages/components/common'));
};

const generateTargetTypes = async (target: 'es' | 'esm' | 'lib' | 'cjs') => {
  const typesRoot = joinWorkspaceRoot(typesTempDir);

  // 1. 复制 packages/components 到 packages/tdesign-vue-next/target 下
  const targetDir = joinTdesignVueNextRoot(`${target}`);
  await copy(joinPosix(typesRoot, `packages/components`), targetDir, {
    filter: (srcPath) => {
      // 将路径解析为标准化格式，避免跨平台路径分隔符问题
      const normalizedPath = path.normalize(srcPath);
      // 判断路径中是否包含 __tests__ 目录（匹配完整目录名，避免误判）
      const hasTestsDir = normalizedPath.split(path.sep).includes('__tests__');

      // 包含 __tests__ 忽略
      return !hasTestsDir;
    },
  });

  // 2. 替换 @tdesign/common-js 为 tdesign-vue-next/common/js
  const dtsPaths = await glob(`${joinPosix(targetDir, '**/*.d.ts')}`);
  const rewrite = dtsPaths.map(async (filePath) => {
    const content = await readFile(filePath, 'utf8');
    await writeFile(filePath, content.replace(/@tdesign\/common-js/g, `tdesign-vue-next/${target}/common/js`), 'utf8');
  });
  await Promise.all(rewrite);
};

const removeSourceTypes = async () => {
  const distTypesRoot = joinWorkspaceRoot(typesTempDir);
  await remove(distTypesRoot);
};

export const buildTypes = async () => {
  try {
    await removeSourceTypes();
    await generateSourceTypes();
    const targets = ['es', 'esm', 'lib', 'cjs'] as const;
    await Promise.all(
      targets.map(async (target) => {
        await generateTargetTypes(target);
      }),
    );
  } catch (error) {
    console.error(error);
  } finally {
    await removeSourceTypes();
  }
};
