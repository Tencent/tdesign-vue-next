import { App, Plugin, Component } from 'vue';

function withInstall<T>(comp: T, alias?: string, directive?: any): T & Plugin {
  const componentPlugin = comp as T & Component & Plugin;

  componentPlugin.install = (app: App, name?: string) => {
    app.component(alias || name || componentPlugin.name, comp);
    directive && app.directive(directive.name, directive.com);
  };

  return componentPlugin as T & Plugin;
}

export default withInstall;
