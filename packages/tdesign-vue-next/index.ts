import type { App } from '@td/adapter-vue';
import * as components from './src';

export function install(app: App, config?: Record<string, unknown>): void {
  Object.keys(components).forEach((key) => {
    /plugin/i.test(key) ? app.use(components[key]) : app.use(components[key], config);
  });
}

export * from './src';

export default {
  install,
  version: typeof PKG_VERSION === 'undefined' ? '' : PKG_VERSION,
};
