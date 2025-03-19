declare const resolve: (...paths: string[]) => string;
export { resolve };
export declare const getWorkspaceRoot: () => Promise<string>;
export declare const getPackagesRoot: () => Promise<string>;
export declare const getCommonRoot: () => Promise<string>;
export declare const getComponentsRoot: () => Promise<string>;
export declare const getTdesignVueNextRoot: () => Promise<string>;
export declare const resolveWorkspaceRoot: (...paths: string[]) => Promise<string>;
export declare const resolvePackagesRoot: (...paths: string[]) => Promise<string>;
export declare const resolveCommonRoot: (...paths: string[]) => Promise<string>;
export declare const resolveComponentsRoot: (...paths: string[]) => Promise<string>;
export declare const resolveTdesignVueNextRoot: (...paths: string[]) => Promise<string>;
/**
 * getRelativeWorkspaceRootPath
 * @description get the relative path from the workspaceRoot directory
 * @param absolutePath string
 * @returns string
 */
export declare const getRelativeWorkspaceRootPath: (absolutePath: string) => Promise<string>;
