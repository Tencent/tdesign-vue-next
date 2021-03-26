import { App } from 'vue';

import TransferDom from './utils/transfer-dom';
// import * as plugins from './plugins';
import * as components from './components';

function install(app: App, config?: Record<string, unknown>): void {
  // 增加指令v-transfer-dom，用于元素指定挂载点的
  app.directive('transfer-dom', TransferDom);

  Object.keys(components).forEach((key) => {
    if (key.match(/plugin/)) {
      return;
    }
    app.use(components[key], config);
  });

  // Object.keys(plugins).forEach((key) => {
  //   app.use(plugins[key]);
  // });
};

// export * from './plugins';
export * from './components';
export default {
  install,
  version: typeof __VERSION__ === 'undefined' ? '' : __VERSION__, // eslint-disable-line
};
