import type { App } from '@td/adapter-vue';
import * as COMMON from '@td/components-common';
import * as VUE3 from './src';

export function install(app: App, config?: Record<string, unknown>): void {
  const components = { ...COMMON, ...VUE3 };
  Object.keys(components).forEach((key) => {
    /plugin/i.test(key) ? app.use(components[key]) : app.use(components[key], config);
  });
}

export * from '@td/components-common';
export * from './src';

export default {
  install,
  version: typeof PKG_VERSION === 'undefined' ? '' : PKG_VERSION,
};
