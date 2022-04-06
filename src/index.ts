import { App } from 'vue';
import * as components from './components';

function install(app: App, config?: Record<string, unknown>): void {
  Object.keys(components).forEach((key) => {
    /plugin/i.test(key) ? app.use(components[key]) : app.use(components[key], config);
  });
}

export * from './components';
export default {
  install,
  version: typeof PKG_VERSION === 'undefined' ? '' : PKG_VERSION, // eslint-disable-line
};
