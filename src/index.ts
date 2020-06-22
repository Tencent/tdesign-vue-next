import { VueConstructor } from 'vue';
import Icon from './icon';
import Button from './button';
import Pagination from './pagination';
import Popup from './popup';
import Input from './input';
import InputGroup from './input-group';
import Addon from './addon';
import Steps from './steps';
import Step from './step';
import Tabs from './tabs';
import TabPanel from './tabs/tab-panel.vue';

const components = {
  Icon,
  Button,
  Pagination,
  Popup,
  Input,
  Addon,
  InputGroup,
  Steps,
  Step,
  Tabs,
  TabPanel,
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
