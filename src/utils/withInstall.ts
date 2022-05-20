import { App, Plugin, Component } from 'vue';

function withInstall<T>(comp: T, alias?: string): T & Plugin {
  const componentPlugin = comp as T & Component & Plugin;

  componentPlugin.install = (app: App, name?: string) => {
    const defaultName = componentPlugin.name.includes('-mapprops')
      ? componentPlugin.name.replace('-mapprops', '')
      : componentPlugin.name; // 正确命名map-props的组件
    app.component(alias || name || defaultName, comp);
  };

  return componentPlugin as T & Plugin;
}

export default withInstall;
