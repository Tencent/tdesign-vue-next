/* eslint-disable no-param-reassign */
import { VueConstructor } from 'vue';
import Icon from './icon';
import Button from './button';
import Pagination from './pagination';
import { Notification, NotificationPlugin } from './notification';
import Tag from './tag';
import CheckTag from './tag/check-tag';
import Popup from './popup';
import Input from './input';
import InputGroup from './input-group';
import Addon from './addon';
import Dialog from './dialog';
import TransferDom from './utils/transfer-dom';
import Radio, { RadioButton, Group as RadioGroup } from './radio';
import Checkbox, { Group as CheckboxGroup } from './checkbox';
import Steps from './steps';
import Step from './step';
import Tabs from './tabs';
import TabPanel from './tabs/tab-panel.vue';
import { List, ListItem, ListItemMeta } from './list';
import { Message, MessagePlugin } from './message';
import Popconfirm from './popconfirm';
import { Select, Option, OptionGroup } from './select';
import Switch from './switch';
import Alert from './alert';
import AlertSwiper from './alert-swiper';

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
  Dialog,
  Radio,
  RadioButton,
  RadioGroup,
  Checkbox,
  CheckboxGroup,
  Notification,
  Steps,
  Step,
  Tabs,
  TabPanel,
  List,
  ListItem,
  ListItemMeta,
  Message,
  Popconfirm,
  Select,
  Option,
  OptionGroup,
  Switch,
  Alert,
  AlertSwiper,
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

  Vue.prototype.$message = MessagePlugin;
  Vue.prototype.$notify = NotificationPlugin;
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
