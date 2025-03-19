// paths.ts 是用于之前处理路径的，但因为是直接使用的相对路径，在根目录下使用（比如根目录下执行 rollup 打包）路径是没问题的
// 但如果在非根目录下使用，就会有问题，但又不能直接废弃，因此这里重新写一份
import { findWorkspaceDir } from '@pnpm/find-workspace-dir';
import { posix } from 'path';

const resolve = posix.resolve;

export { resolve };

// root
export const getWorkspaceRoot = async () => {
  return await findWorkspaceDir(process.cwd());
};
// packages
export const getPackagesRoot = async () => {
  return resolve(await getWorkspaceRoot(), 'packages');
};
// packages/common
export const getCommonRoot = async () => {
  return resolve(await getPackagesRoot(), 'common');
};
// packages/components
export const getComponentsRoot = async () => {
  return resolve(await getPackagesRoot(), 'components');
};
// packages/tdesign-vue-next
export const getTdesignVueNextRoot = async () => {
  return resolve(await getPackagesRoot(), 'tdesign-vue-next');
};

// resolve
export const resolveWorkspaceRoot = async (...paths: string[]) => {
  return resolve(await getWorkspaceRoot(), ...paths);
};
export const resolvePackagesRoot = async (...paths: string[]) => {
  return resolve(await getPackagesRoot(), ...paths);
};
export const resolveCommonRoot = async (...paths: string[]) => {
  return resolve(await getCommonRoot(), ...paths);
};
export const resolveComponentsRoot = async (...paths: string[]) => {
  return resolve(await getComponentsRoot(), ...paths);
};
export const resolveTdesignVueNextRoot = async (...paths: string[]) => {
  return resolve(await getTdesignVueNextRoot(), ...paths);
};

/**
 * getRelativeWorkspaceRootPath
 * @description get the relative path from the workspaceRoot directory
 * @param absolutePath string
 * @returns string
 */
export const getRelativeWorkspaceRootPath = async (absolutePath: string) => {
  const workspaceRoot = await getWorkspaceRoot();
  if (!absolutePath.startsWith(workspaceRoot)) {
    throw new Error('path is not a workspaceRoot path');
  }
  return absolutePath.replace(workspaceRoot, '.');
};
