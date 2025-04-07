import { existsSync } from 'fs-extra';
import { posix, dirname, resolve } from 'path';

export { resolve };

/**
 * root 原本是使用 @pnpm/find-workspace-dir 获取的，但它的获取方式是异步的，导致部分地方使用时出现问题，比如 vitest 的 snapshot 测试，
 * 因此这里改成同步写，在本项目中不会出现问题，因为整个项目只有一个 pnpm-workspace.yaml 文件
 * @returns
 */
export const getWorkspaceRoot = () => {
  let dir = process.cwd();
  while (dir !== '/') {
    if (existsSync(`${dir}/pnpm-workspace.yaml`)) {
      return dir;
    }
    dir = dirname(dir);
  }
  throw new Error('Could not find workspace root');
};

// packages
export const getPackagesRoot = () => {
  return resolve(getWorkspaceRoot(), 'packages');
};

// packages/common
export const getCommonRoot = () => {
  return resolve(getPackagesRoot(), 'common');
};

// packages/components
export const getComponentsRoot = () => {
  return resolve(getPackagesRoot(), 'components');
};

// packages/tdesign-vue-next
export const getTdesignVueNextRoot = () => {
  return resolve(getPackagesRoot(), 'tdesign-vue-next');
};

// resolve
export const resolveWorkspaceRoot = (...paths: string[]) => {
  return resolve(getWorkspaceRoot(), ...paths);
};

export const resolvePackagesRoot = (...paths: string[]) => {
  return resolve(getPackagesRoot(), ...paths);
};

export const resolveCommonRoot = (...paths: string[]) => {
  return resolve(getCommonRoot(), ...paths);
};

export const resolveComponentsRoot = (...paths: string[]) => {
  return resolve(getComponentsRoot(), ...paths);
};

export const resolveTdesignVueNextRoot = (...paths: string[]) => {
  return resolve(getTdesignVueNextRoot(), ...paths);
};

/**
 * getRelativeWorkspaceRootPath
 * @description get the relative path from the workspaceRoot directory
 * @param absolutePath string
 * @returns string
 */
export const getRelativeWorkspaceRootPath = (absolutePath: string) => {
  const workspaceRoot = getWorkspaceRoot();
  if (!absolutePath.startsWith(workspaceRoot)) {
    throw new Error('path is not a workspaceRoot path');
  }
  return absolutePath.replace(workspaceRoot, '.');
};
