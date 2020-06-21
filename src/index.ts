import { VueConstructor } from 'vue';
import Icon from './icon';
import Button from './button';
import Pagination from './pagination';
import Popup from './popup';
import Input from './input';
import InputGroup from './input-group';
import Addon from './addon';
import Dialog from './dialog';
import TransferDom from './utils/transfer-dom';

const components = {
  Icon,
  Button,
  Pagination,
  Popup,
  Input,
  Addon,
  InputGroup,
  Dialog,
};

function install(Vue: VueConstructor, config?: object): void {
  // 增加指令v-transfer-dom，用于元素指定挂载点的
  Vue.directive('transfer-dom', TransferDom);
  const defaults = {
    prefix: 't',
  };
  const installConfig = { ...defaults, ...config };
  Object.keys(components).forEach((key) => {
    Vue.component(installConfig.prefix + key, components[key]);
  });
};

declare const window: {
  [propName: string]: any, // eslint-disable-line
  Vue: VueConstructor;
};

// install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  version: typeof VERSION === 'undefined' ? '' : VERSION, // eslint-disable-line
  ...components,
};
