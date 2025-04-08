import { existsSync } from 'fs-extra';
import { posix, dirname, win32 } from 'path';

const normalizePathRegExp = new RegExp(`\\${win32.sep}`, 'g');

/**
 *@description 归一化路径,将 windows 风格的路径转换为 posix 风格的路径
 */
const normalizePath = (filename: string) => filename.replace(normalizePathRegExp, posix.sep);

/**
 *@description POSIX 风格的路径解析,只能处理相对路径
 */
const posixNormalizePathResolve = (...paths: string[]) => normalizePath(posix.resolve(...paths));

/**
 *@description POSIX 风格的路径拼接
 */
const posixNormalizePathJoin = (...paths: string[]) => normalizePath(posix.join(...paths));

export { posixNormalizePathResolve, posixNormalizePathJoin };

/**
 * root 原本是使用 @pnpm/find-workspace-dir 获取的，但它的获取方式是异步的，导致部分地方使用时出现问题，比如 vitest 的 snapshot 测试，
 * 因此这里改成同步写，在本项目中不会出现问题，因为整个项目只有一个 pnpm-workspace.yaml 文件
 * @returns
 */
export const getWorkspaceRoot = () => {
  let dir = process.cwd();
  while (dir !== '/') {
    if (existsSync(`${dir}/pnpm-workspace.yaml`)) {
      return normalizePath(dir);
    }
    dir = dirname(dir);
  }
  throw new Error('Could not find workspace root');
};

// packages
export const getPackagesRoot = () => {
  return posixNormalizePathJoin(getWorkspaceRoot(), 'packages');
};

// packages/common
export const getCommonRoot = () => {
  return posixNormalizePathJoin(getPackagesRoot(), 'common');
};

// packages/components
export const getComponentsRoot = () => {
  return posixNormalizePathJoin(getPackagesRoot(), 'components');
};

// packages/tdesign-vue-next
export const getTdesignVueNextRoot = () => {
  return posixNormalizePathJoin(getPackagesRoot(), 'tdesign-vue-next');
};

// posixNormalizePathJoin
export const joinWorkspaceRoot = (...paths: string[]) => {
  return posixNormalizePathJoin(getWorkspaceRoot(), ...paths);
};

export const joinPackagesRoot = (...paths: string[]) => {
  return posixNormalizePathJoin(getPackagesRoot(), ...paths);
};

export const joinCommonRoot = (...paths: string[]) => {
  return posixNormalizePathJoin(getCommonRoot(), ...paths);
};

export const joinComponentsRoot = (...paths: string[]) => {
  return posixNormalizePathJoin(getComponentsRoot(), ...paths);
};

export const joinTdesignVueNextRoot = (...paths: string[]) => {
  return posixNormalizePathJoin(getTdesignVueNextRoot(), ...paths);
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
