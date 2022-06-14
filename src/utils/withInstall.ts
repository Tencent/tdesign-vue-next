import { App, Plugin, Component } from 'vue';

function withInstall<T>(comp: T, alias?: string): T & Plugin {
  const componentPlugin = comp as T & Component & Plugin;

  componentPlugin.install = (app: App, name?: string) => {
    app.component(alias || name || componentPlugin.name, comp);
  };

  return componentPlugin as T & Plugin;
}

export default withInstall;
