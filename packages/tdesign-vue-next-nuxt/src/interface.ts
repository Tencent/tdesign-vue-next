import type { TdesignPlugin } from './config/plugins';

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * whether to import ESM version
   * @default false
   */
  esm?: boolean;
  /**
   * self-defined the component prefix
   */
  prefix?: string;
  /**
   * exclude component name, if match do not resolve the name
   */
  exclude?: string | RegExp | (string | RegExp)[];
  /**
   * included component, only resolve component which match include
   */
  include?: string | RegExp | (string | RegExp)[];
  /**
   * resolve `tdesign-icons-vue-next'
   * @default false
   */
  resolveIcons?: boolean;
  /**
   * self-defined the icon prefix
   * @default undefined
   */
  iconPrefix?: string;
  /**
   * excluded icons, if match do not resolve the icon from tdesign-icons-vue-next
   */
  iconExclude?: string | RegExp | (string | RegExp)[];
  /**
   * included icons, only resolve icons which match iconInclude
   */
  iconInclude?: string | RegExp | (string | RegExp)[];
  /**
   * self-defined import plugin from tdesign-vue-next
   */
  plugins?: TdesignPlugin[];
  /**
   * import default theme variables or not, set it to false if customize theme
   * @default true
   */
  importVariables?: boolean | string;
}
