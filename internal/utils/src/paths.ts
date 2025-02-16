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

// resolve tdesignVueNextRoot
export const resolveTDesignVueNextRoot = (...args: string[]) => resolve(tdesignVueNextRoot, ...args);
