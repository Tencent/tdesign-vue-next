import { VueConstructor } from 'vue';
import Icon from './icon';
import Button from './button';
import Pagination from './pagination';
import Input from './input';
import InputGroup from './input-group';
import Addon from './addon';
import { Menu, HeadMenu, MenuItem } from './menu';

const components = {
  Icon,
  Button,
  Pagination,
  Input,
  Addon,
  InputGroup,
  Menu,
  HeadMenu,
  MenuItem,
};

function install(Vue: VueConstructor, config?: object): void {
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
