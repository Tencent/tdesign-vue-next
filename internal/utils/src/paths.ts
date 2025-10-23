import { existsSync } from 'node:fs';
import { posix, dirname, win32 } from 'node:path';

const normalizePathRegExp = new RegExp(`\\${win32.sep}`, 'g');

/**
 *@description 归一化路径,将 windows 风格的路径转换为 posix 风格的路径
 */
const toPosixPath = (filename: string) => filename.replace(normalizePathRegExp, posix.sep);

/**
 *@description POSIX 风格的路径解析,只能处理相对路径
 */
const resolvePosix = (...paths: string[]) => toPosixPath(posix.resolve(...paths));

/**
 *@description POSIX 风格的路径拼接
 */
const joinPosix = (...paths: string[]) => toPosixPath(posix.join(...paths));

export { resolvePosix, joinPosix };

/**
 * root 原本是使用 @pnpm/find-workspace-dir 获取的，但它的获取方式是异步的，导致部分地方使用时出现问题，比如 vitest 的 snapshot 测试，
 * 因此这里改成同步写，在本项目中不会出现问题，因为整个项目只有一个 pnpm-workspace.yaml 文件
 * @returns
 */
export const getWorkspaceRoot = () => {
  let dir = process.cwd();
  while (dir !== '/') {
    if (existsSync(`${dir}/pnpm-workspace.yaml`)) {
      return toPosixPath(dir);
    }
    dir = dirname(dir);
  }
  throw new Error('Could not find workspace root');
};

// packages
export const getPackagesRoot = () => {
  return joinPosix(getWorkspaceRoot(), 'packages');
};

// packages/common
export const getCommonRoot = () => {
  return joinPosix(getPackagesRoot(), 'common');
};

// packages/components
export const getComponentsRoot = () => {
  return joinPosix(getPackagesRoot(), 'components');
};

// packages/pro-components
export const getProComponentsRoot = () => {
  return joinPosix(getPackagesRoot(), 'pro-components');
};

// packages/pro-components-chat
export const getProComponentsChatRoot = () => {
  return joinPosix(getProComponentsRoot(), 'chat');
};

// packages/tdesign-vue-next
export const getTdesignVueNextRoot = () => {
  return joinPosix(getPackagesRoot(), 'tdesign-vue-next');
};

// packages/tdesign-vue-next-chat
export const getTdesignVueNextChatRoot = () => {
  return joinPosix(getPackagesRoot(), 'tdesign-vue-next-chat');
};

// joinPosix
export const joinWorkspaceRoot = (...paths: string[]) => {
  return joinPosix(getWorkspaceRoot(), ...paths);
};

export const joinPackagesRoot = (...paths: string[]) => {
  return joinPosix(getPackagesRoot(), ...paths);
};

export const joinCommonRoot = (...paths: string[]) => {
  return joinPosix(getCommonRoot(), ...paths);
};

export const joinComponentsRoot = (...paths: string[]) => {
  return joinPosix(getComponentsRoot(), ...paths);
};

export const joinProComponentsRoot = (...paths: string[]) => {
  return joinPosix(getProComponentsRoot(), ...paths);
};

export const joinProComponentsChatRoot = (...paths: string[]) => {
  return joinPosix(getProComponentsChatRoot(), ...paths);
};

export const joinTdesignVueNextRoot = (...paths: string[]) => {
  return joinPosix(getTdesignVueNextRoot(), ...paths);
};

export const joinTdesignVueNextChatRoot = (...paths: string[]) => {
  return joinPosix(getTdesignVueNextChatRoot(), ...paths);
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
