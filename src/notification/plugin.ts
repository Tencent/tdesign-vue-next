import {
  App, Plugin, createApp, nextTick, ComponentPublicInstance,
} from 'vue';
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
} from './type';
import { AttachNodeReturnValue } from '../common';

let seed = 0;
// 存储不同 attach 和 不同 placement 消息列表实例
const instanceMap: Map<AttachNodeReturnValue, Record<string, ComponentPublicInstance>> = new Map();

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

  const a = getAttach(hackOptions.attach);

  if (!instanceMap.get(a)) {
    instanceMap.set(a, {});
  }
  let p = instanceMap.get(a)[hackOptions.placement];
  if (!p) {
    const wrapper = document.createElement('div');

    const instance = createApp(NotificationList, {
      placement: hackOptions.placement,
    }).mount(wrapper);

    instance.add(hackOptions);
    instanceMap.get(a)[hackOptions.placement] = instance;
    p = instance;
    a.appendChild(instance.$el);
  } else {
    p.add(hackOptions);
  }

  return new Promise((resolve) => {
    nextTick(() => {
      const lastChild = p.getLastChild();
      resolve(lastChild);
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
}

const extraApi: ExtraApi = {
  info: (options) => showThemeNotification('info', options),
  success: (options) => showThemeNotification('success', options),
  warning: (options) => showThemeNotification('warning', options),
  error: (options) => showThemeNotification('error', options),
  close: (promise) => {
    promise.then((instance) => instance.close());
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
    // eslint-disable-next-line no-param-reassign
    app.config.globalProperties.$notify = showThemeNotification;
    Object.keys(extraApi).forEach((funcName) => {
      // eslint-disable-next-line no-param-reassign
      app.config.globalProperties.$notify[funcName] = extraApi[funcName];
    });
  },
};

Object.keys(extraApi).forEach((funcName) => {
  NotificationPlugin[funcName] = extraApi[funcName];
});

export default NotificationPlugin;
