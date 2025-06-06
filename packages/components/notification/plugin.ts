import { App, Plugin, nextTick, AppContext, createVNode, render, VNode } from 'vue';
import NotificationList from './notification-list';
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
import './style';

let seed = 0;
// 存储不同 attach 和 不同 placement 消息列表实例
const instanceMap: Map<AttachNodeReturnValue, Record<string, VNode>> = new Map();

const NotificationFunction = (options: NotificationOptions, context?: AppContext): Promise<NotificationInstance> => {
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

    const instance = createVNode(NotificationList, {
      placement: hackOptions.placement,
    });

    // eslint-disable-next-line no-underscore-dangle
    if (context ?? NotificationPlugin._context) {
      // eslint-disable-next-line no-underscore-dangle
      instance.appContext = context ?? NotificationPlugin._context;
    }

    // 会遗留一个容器在 attach 中，需要找合适的时机回收
    attachEl.appendChild(wrapper);
    render(instance, wrapper);
    instance.component.exposed.add(hackOptions);
    instanceMap.get(attachEl)[hackOptions.placement] = instance;
    tmpInstance = instance;
  } else {
    tmpInstance.component.exposed.add(hackOptions);
  }

  return new Promise((resolve) => {
    const ins = instanceMap.get(attachEl)[hackOptions.placement];
    nextTick(() => {
      const notificationList: NotificationInstance[] = ins.component.exposed.notificationList.value ?? [];
      resolve(
        notificationList?.find((notify) => {
          return (notify as any).$?.vnode?.key === hackOptions.id;
        }),
      );
    });
  });
};

const showThemeNotification: NotificationMethod = (theme, options, context) => {
  const hackOptions = { ...options, theme };
  return NotificationFunction(hackOptions, context);
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
  info: (options, context) => showThemeNotification('info', options, context),
  success: (options, context) => showThemeNotification('success', options, context),
  warning: (options, context) => showThemeNotification('warning', options, context),
  error: (options, context) => showThemeNotification('error', options, context),
  close: (promise) => {
    promise.then((instance) => instance.close());
  },
  closeAll: () => {
    instanceMap.forEach((attach) => {
      Object.keys(attach).forEach((placement) => {
        attach[placement].component.exposed.removeAll();
      });
    });
  },
};

export type NotificationPluginType = Plugin &
  ExtraApi &
  NotificationMethod & {
    _context?: AppContext;
  };

const NotificationPlugin: NotificationPluginType = showThemeNotification as NotificationPluginType;

NotificationPlugin.install = (app: App) => {
  app.config.globalProperties.$notify = showThemeNotification;
  Object.keys(extraApi).forEach((funcName: keyof ExtraApi) => {
    app.config.globalProperties.$notify[funcName] = extraApi[funcName];
  });
  // eslint-disable-next-line no-underscore-dangle
  NotificationPlugin._context = app._context;
};

Object.keys(extraApi).forEach((funcName: keyof ExtraApi) => {
  // @ts-ignore
  // TODO https://github.com/microsoft/TypeScript/issues/32693
  NotificationPlugin[funcName] = extraApi[funcName];
});

export const NotifyPlugin = NotificationPlugin;

export default NotificationPlugin;
