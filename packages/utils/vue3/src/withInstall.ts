import type { App, Component, Directive, Plugin } from '@td/adapter-vue';

export function withInstall<T>(
  comp: T,
  alias?: string,
  directive?: { name: string; comp: Directive<T & Plugin> },
): T & Plugin {
  const componentPlugin = comp as T & Component & Plugin;

  componentPlugin.install = (app: App, name?: string) => {
    app.component(alias || name || componentPlugin.name, comp);
    directive && app.directive(directive.name, directive.comp);
  };

  return componentPlugin as T & Plugin;
}
