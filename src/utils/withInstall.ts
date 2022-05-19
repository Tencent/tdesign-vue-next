import { App, Plugin, Component } from 'vue';

export const withInstall = (comp: Component, alias?: string) => {
  const componentPlugin = comp as Component & Plugin;

  componentPlugin.install = (app: App, name?: string) => {
    const defaultName = componentPlugin.name.includes('-mapprops')
      ? componentPlugin.name.replace('-mapprops', '')
      : componentPlugin.name; // 正确命名map-props的组件
    app.component(alias || name || defaultName, comp);
  };

  return componentPlugin;
};

export default withInstall;
