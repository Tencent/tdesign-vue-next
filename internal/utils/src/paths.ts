import { resolve } from 'node:path';

export { resolve };

// 根目录
export const workspaceRoot = resolve(__dirname, '..', '..', '..', '..');
// packages
export const packagesRoot = resolve(workspaceRoot, 'packages');
// packages/components
export const componentsRoot = resolve(packagesRoot, 'components');
// packages/tdesign-vue-next
export const tdesignVueNextRoot = resolve(packagesRoot, 'tdesign-vue-next');

// resolve packagesRoot
export const resolvePackagesRoot = (...args: string[]) => resolve(packagesRoot, ...args);
// resolve componentsRoot
export const resolveComponentsRoot = (...args: string[]) => resolve(componentsRoot, ...args);
// resolve tdesignVueNextRoot
export const resolveTDesignVueNextRoot = (...args: string[]) => resolve(tdesignVueNextRoot, ...args);

/**
 * getRelativeWorkspaceRootPath
 * @description get the relative path from the workspaceRoot directory
 * @param absolutePath
 * @returns
 */
export const getRelativeWorkspaceRootPath = (absolutePath: string) => {
  if (!absolutePath.startsWith(workspaceRoot)) {
    throw new Error('path is not a workspaceRoot path');
  }
  return absolutePath.replace(workspaceRoot, '.');
};
