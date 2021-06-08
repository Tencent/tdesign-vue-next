import { App, Plugin } from 'vue';

export type WithInstallType<T> = T & Plugin;
export const withInstall = <T>(comp: T): T & Plugin => {
  const c = comp as any;

  c.install = function (app: App, name?: string) {
    app.component(name || c.name, comp);
  };

  return c as T & Plugin;
};
