import Vue from 'vue';
import NotificationList from './notificationList';
import { getAttach } from '../utils/dom';
import { NotificationProps, ThemeString, NotificationInstanceType, NotificationPluginExtra, NotificationPluginAPI } from './type/index';

let seed = 0;
// 存储不同 attach 和 不同 placement 消息列表实例
const instanceMap: Map<Element, object> = new Map();

const NotificationFunction = (options: NotificationProps): Promise<NotificationInstanceType> => {
  seed += 1;
  const hackOptions = Object.assign({
    placement: 'top-right',
    zIndex: 6000,
    attach: 'body',
    id: seed,
  }, options);
  hackOptions.default = options.content ? options.content : '';

  const _a = getAttach(hackOptions.attach);
  if (!instanceMap.get(_a)) {
    instanceMap.set(_a, {});
  }
  let _p = instanceMap.get(_a)[hackOptions.placement];
  if (!_p) {
    const List = new NotificationList({
      propsData: {
        placement: hackOptions.placement,
      },
    });
    List.add(hackOptions);
    List.$mount();
    instanceMap.get(_a)[hackOptions.placement] = List;
    _a.appendChild(List.$el);
    _p = instanceMap.get(_a)[hackOptions.placement];
  } else {
    _p.add(hackOptions);
  }

  return new Promise((resolve) => {
    _p.$nextTick(() => {
      const list = _p.$children;
      resolve(list[list.length - 1]);
    });
  });
};

const showThemeNotification = (theme: ThemeString, options: NotificationProps) => {
  const hackOptions = Object.assign(options, { theme });
  return NotificationFunction(hackOptions);
};

const extraAPi: NotificationPluginExtra = {
  info: (options: NotificationProps) => showThemeNotification('info', options),
  success: (options: NotificationProps) => showThemeNotification('success', options),
  warning: (options: NotificationProps) => showThemeNotification('warning', options),
  error: (options: NotificationProps) => showThemeNotification('error', options),
  close: (promise) => {
    promise.then(instance => instance.close());
  },
  closeAll: () => {
    instanceMap.forEach((attach) => {
      Object.keys(attach).forEach((placement) => {
        attach[placement].removeAll();
      });
    });
  },
};

Object.keys(extraAPi).forEach((key) => {
  NotificationFunction[key] = extraAPi[key];
});

const NotificationPlugin = NotificationFunction as (typeof NotificationFunction & NotificationPluginAPI);

NotificationPlugin.install = () => {
  Vue.prototype.$notify = NotificationPlugin;
};

export default NotificationPlugin;
