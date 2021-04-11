import { App, Plugin } from 'vue';
import NotificationList from './notificationList';
import { getAttach } from '../utils/dom';
import {
  NotificationOptions,
  NotificationInstance,
  NotificationMethod,
  NotificationInfoMethod,
  NotificationWarningMethod,
  NotificationErrorMethod,
  NotificationSuccessMethod,
  NotificationCloseMethod,
  NotificationCloseAllMethod,
} from '@TdTypes/notification/TdNotificationProps';

let seed = 0;
// 存储不同 attach 和 不同 placement 消息列表实例
const instanceMap: Map<AttachNodeReturnValue, object> = new Map();

const NotificationFunction = (options: NotificationOptions): Promise<NotificationInstance> => {
  seed += 1;
  const hackOptions = {
    placement: 'top-right',
    zIndex: 6000,
    attach: 'body',
    id: seed,
    ...options,
  };
  hackOptions.content = options.content ? options.content : '';

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

const showThemeNotification: NotificationMethod = (theme, options) => {
  const hackOptions = { ...options, theme };
  return NotificationFunction(hackOptions);
};

interface ExtraApi {
  info: NotificationInfoMethod;
  success: NotificationSuccessMethod;
  warning: NotificationWarningMethod;
  error: NotificationErrorMethod;
  close: NotificationCloseMethod;
  closeAll: NotificationCloseAllMethod;
};

const extraApi: ExtraApi = {
  info: options => showThemeNotification('info', options),
  success: options => showThemeNotification('success', options),
  warning: options => showThemeNotification('warning', options),
  error: options => showThemeNotification('error', options),
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

const NotificationPlugin: Plugin = {
  install: (app: App) => {
    app.config.globalProperties.$notify = showThemeNotification;
    Object.keys(extraApi).forEach((funcName) => {
      app.config.globalProperties.$notify[funcName] = extraApi[funcName];
    });
  },
};

Object.keys(extraApi).forEach((funcName) => {
  NotificationPlugin[funcName] = extraApi[funcName];
});

export default NotificationPlugin;
