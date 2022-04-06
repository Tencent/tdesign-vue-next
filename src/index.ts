import { App } from 'vue';
import * as components from './components';

function install(app: App, config?: Record<string, unknown>): void {
  Object.keys(components).forEach((key) => {
    if (/use/i.test(key)) return; // 组件导出了 hooks，后续全部迁移到hooks文件里
    /plugin/i.test(key) ? app.use(components[key]) : app.use(components[key], config);
  });
}

export * from './components';
export default {
  install,
  version: typeof PKG_VERSION === 'undefined' ? '' : PKG_VERSION, // eslint-disable-line
};
