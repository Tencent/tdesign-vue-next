import type { App } from '@td/adapter-vue';
import * as COMMON from './src/common';
import * as VUE27 from './src/vue2.7';

export function install(app: App, config?: Record<string, unknown>): void {
  const components = { ...COMMON, ...VUE27 };
  Object.keys(components).forEach((key) => {
    /plugin/i.test(key) ? app.use(components[key]) : app.use(components[key], config);
  });
}

export * from './src/common';
export * from './src/vue2.7';

export default {
  install,
  version: typeof PKG_VERSION === 'undefined' ? '' : PKG_VERSION,
};
