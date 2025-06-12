import { glob } from 'glob';
import { readFile, copy, writeFile, remove } from 'fs-extra';
import { run, joinPosix, joinWorkspaceRoot, joinTdesignVueNextChatRoot } from '@tdesign/internal-utils';

const generateSourceTypes = async () => {
  // 1. 编译 tsc
  await run('tsc --outDir dist/types -p tsconfig.json --emitDeclarationOnly');

  const typesRoot = joinWorkspaceRoot('dist/types');

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
  const typesRoot = joinWorkspaceRoot('dist/types');

  // 1. 复制 packages/pro-components/chat 到 packages/tdesign-vue-next-chat/target 下
  const targetDir = joinTdesignVueNextChatRoot(`${target}`);
  // TODO
  // temp delete 'dist/types/packages/pro-components/chat/_example'
  // should be use correct tsconfig.json to generate correct types
  await remove(joinPosix(typesRoot, `packages/pro-components/chat/_example`));
  await copy(joinPosix(typesRoot, `packages/pro-components/chat`), targetDir);

  // 2. 替换 @tdesign/common-js 为 tdesign-vue-next/common/js
  // TODO: check if this is needed, NOW chat does not use common-js
  // const dtsPaths = await glob(`${joinPosix(targetDir, '**/*.d.ts')}`);
  // const rewrite = dtsPaths.map(async (filePath) => {
  //   const content = await readFile(filePath, 'utf8');
  //   await writeFile(filePath, content.replace(/@tdesign\/common-js/g, `tdesign-vue-next/${target}/common/js`), 'utf8');
  // });
  // await Promise.all(rewrite);
};

const removeSourceTypes = async () => {
  const distTypesRoot = joinWorkspaceRoot('dist');
  await remove(distTypesRoot);
};

export const buildTypes = async () => {
  await removeSourceTypes();
  await generateSourceTypes();
  // const targets = ['es', 'esm', 'lib', 'cjs'] as const;
  const targets = ['es', 'esm'] as const;
  await Promise.all(
    targets.map(async (target) => {
      await generateTargetTypes(target);
    }),
  );
  await removeSourceTypes();
};
