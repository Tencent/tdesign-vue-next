import { App, Plugin } from 'vue';

export type WithInstallType<T> = T & Plugin;
export const withInstall = <T>(comp: T): T & Plugin => {
  const c = comp as any;

  c.install = function (app: App, name?: string) {
    const defaultName = c.name.includes('-mapprops') ? c.name.replace('-mapprops', '') : c.name; // 正确命名map-props的组件
    app.component(name || defaultName, comp);
  };

  return c as T & Plugin;
};
