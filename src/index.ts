import { VueConstructor } from 'vue';

import TransferDom from './utils/transfer-dom';
import * as plugins from './plugins';
import * as components from './components';

function install(Vue: VueConstructor, config?: object): void {
  // 增加指令v-transfer-dom，用于元素指定挂载点的
  Vue.directive('transfer-dom', TransferDom);

  Object.keys(components).forEach((key) => {
    Vue.use(components[key], config);
  });

  Object.keys(plugins).forEach((key) => {
    Vue.use(plugins[key]);
  });
};

declare const window: {
  [propName: string]: any; // eslint-disable-line
  Vue: VueConstructor;
};

// install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export * from './plugins';
export * from './components';
export default {
  install,
  version: typeof __VERSION__ === 'undefined' ? '' : __VERSION__, // eslint-disable-line
};
