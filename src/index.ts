/* eslint-disable no-param-reassign */
import { VueConstructor } from 'vue';
import Icon from './icon';
import Button from './button';
import Pagination from './pagination';
import Tag from './tag';
import CheckTag from './tag/check-tag';
import Popup from './popup';
import Input from './input';
import InputGroup from './input-group';
import Addon from './addon';
import Radio, { Group as RadioGroup } from './radio';
import Checkbox, { Group as CheckboxGroup } from './checkbox';
import Steps from './steps';
import Step from './step';
import { Message, MessagePlugin } from './message';

const components = {
  Icon,
  Button,
  Pagination,
  Tag,
  CheckTag,
  Popup,
  Input,
  Addon,
  InputGroup,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Steps,
  Step,
  Message,
};

function install(Vue: VueConstructor, config?: object): void {
  const defaults = {
    prefix: 't',
  };
  const installConfig = { ...defaults, ...config };
  Object.keys(components).forEach((key) => {
    Vue.component(installConfig.prefix + key, components[key]);
  });

  Vue.prototype.$message = MessagePlugin;
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
