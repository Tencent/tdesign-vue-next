import { resolve } from 'path';
export { resolve };
export declare const workspaceRoot: string;
export declare const packagesRoot: string;
export declare const componentsRoot: string;
export declare const tdesignVueNextRoot: string;
export declare const resolveWorkSpaceRoot: (...args: string[]) => string;
export declare const resolvePackagesRoot: (...args: string[]) => string;
export declare const resolveComponentsRoot: (...args: string[]) => string;
export declare const resolveTDesignVueNextRoot: (...args: string[]) => string;
/**
 * getRelativeWorkspaceRootPath
 * @description get the relative path from the workspaceRoot directory
 * @param absolutePath string
 * @returns string
 */
export declare const getRelativeWorkspaceRootPath: (absolutePath: string) => string;
