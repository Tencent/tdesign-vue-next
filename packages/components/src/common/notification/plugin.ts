import type { App, Plugin, ComponentPublicInstance } from '@td/adapter-vue';
import { createApp, nextTick, pluginInstall } from '@td/adapter-vue';
import { getAttach } from '@td/adapter-utils';
import type {
  NotificationOptions,
  NotificationInstance,
  NotificationMethod,
  NotificationInfoMethod,
  NotificationWarningMethod,
  NotificationErrorMethod,
  NotificationSuccessMethod,
  NotificationCloseMethod,
  NotificationCloseAllMethod,
} from '@td/intel/components/notification/type';
import type { AttachNodeReturnValue } from '@td/shared/interface';

import './style';
import NotificationList from './notificationList';

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

  const attachEl = getAttach(hackOptions.attach);

  if (!instanceMap.get(attachEl)) {
    instanceMap.set(attachEl, {});
  }
  let tmpInstance = instanceMap.get(attachEl)[hackOptions.placement];
  if (!tmpInstance) {
    const wrapper = document.createElement('div');

    const instance = createApp(NotificationList, {
      placement: hackOptions.placement,
    }).mount(wrapper);

    instance.add(hackOptions);
    instanceMap.get(attachEl)[hackOptions.placement] = instance;
    tmpInstance = instance;
    attachEl.appendChild(instance.$el);
  } else {
    tmpInstance.add(hackOptions);
  }

  return new Promise((resolve) => {
    const ins = instanceMap.get(attachEl)[hackOptions.placement];
    nextTick(() => {
      const { notificationList } = ins;
      resolve(notificationList[notificationList.length - 1]);
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
export type NotificationPluginType = Plugin & ExtraApi & NotificationMethod;

const NotificationPlugin: NotificationPluginType = showThemeNotification as NotificationPluginType;

NotificationPlugin.install = (app: App) => {
  pluginInstall(app, showThemeNotification, '$notify')
  pluginInstall(app, showThemeNotification, '$notification')
  Object.keys(extraApi).forEach((funcName) => {
    pluginInstall(app, extraApi[funcName], '$notify', funcName)
  });
};

Object.keys(extraApi).forEach((funcName) => {
  NotificationPlugin[funcName] = extraApi[funcName];
});

export default NotificationPlugin;
