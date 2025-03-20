declare const resolve: (...paths: string[]) => string;
export { resolve };
/**
 * root 原本是使用 @pnpm/find-workspace-dir 获取的，但它的获取方式是同步的，导致部分地方使用时出现问题，比如 vitest 的 snapshot 测试，
 * 因此这里改成同步写，在本项目中不会出现问题，因为整个项目只有一个 pnpm-workspace.yaml 文件
 * @returns
 */
export declare const getWorkspaceRoot: () => string;
export declare const getPackagesRoot: () => string;
export declare const getCommonRoot: () => string;
export declare const getComponentsRoot: () => string;
export declare const getTdesignVueNextRoot: () => string;
export declare const resolveWorkspaceRoot: (...paths: string[]) => string;
export declare const resolvePackagesRoot: (...paths: string[]) => string;
export declare const resolveCommonRoot: (...paths: string[]) => string;
export declare const resolveComponentsRoot: (...paths: string[]) => string;
export declare const resolveTdesignVueNextRoot: (...paths: string[]) => string;
/**
 * getRelativeWorkspaceRootPath
 * @description get the relative path from the workspaceRoot directory
 * @param absolutePath string
 * @returns string
 */
export declare const getRelativeWorkspaceRootPath: (absolutePath: string) => string;
