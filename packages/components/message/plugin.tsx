/**
 * Vue.prototype.$message = MessagePlugin;
 *
 * this.$message({ theme: 'info', default: '这是信息', duration: 3000 })
 * this.$message.info('这是信息')
 * this.$message.info('这是信息', 3000)
 * this.$message.info({ content: '这是信息', duration: 3000 })
 * this.$message.success({ content: '这是信息', duration: 3000 })
 * this.$message.warning()
 * this.$message.error()
 * this.$message.question()
 * this.$message.loading()
 * 上述函数返回值：promise: Promise<{close: Function}>
 *
 * // close all message
 * this.$message.closeAll()
 *
 * // close one message. 参数 p 为 this.$message 系列函数返回值，promise: Promise<{close: Function}>
 * this.$message.close(p)
 *
 * // close one message.
 * const msg = this.$message.info({ content: '这是信息', duration: 0 })
 * msg.then(instance => instance.close())
 *
 */
import { App, nextTick, Plugin, AppContext, createVNode, render, VNode } from 'vue';
import MessageList, { DEFAULT_Z_INDEX } from './message-list';
import { getAttach } from '@tdesign/shared-utils';
import {
  MessageOptions,
  MessageMethod,
  MessageInstance,
  MessageInfoMethod,
  MessageErrorMethod,
  MessageWarningMethod,
  MessageSuccessMethod,
  MessageLoadingMethod,
  MessageQuestionMethod,
  MessageCloseMethod,
  MessageCloseAllMethod,
  MessageClearByKeyMethod,
  MessageConfigMergeMethod,
  MessageMergeConfig,
} from './type';
import { AttachNodeReturnValue } from '../common';
import { isObject, isString } from 'lodash-es';

// 存储不同 attach 和 不同 placement 消息列表实例
const instanceMap: Map<AttachNodeReturnValue, Record<string, VNode>> = new Map();

function handleParams(params: MessageOptions): MessageOptions {
  const options: MessageOptions = {
    duration: 3000,
    attach: 'body',
    zIndex: DEFAULT_Z_INDEX,
    placement: 'top',
    ...params,
  };
  options.content = params.content;
  return options;
}

const MessageFunction = (props: MessageOptions, context?: AppContext): Promise<MessageInstance> => {
  const options = handleParams(props);
  const { attach, placement } = options;
  const attachDom = getAttach(attach);
  if (!instanceMap.get(attachDom)) {
    instanceMap.set(attachDom, {});
  }
  const p = instanceMap.get(attachDom)[placement];
  let mgKey: number;
  if (!p || !attachDom.contains(p.el as HTMLElement)) {
    const wrapper = document.createElement('div');

    const instance = createVNode(MessageList, {
      zIndex: options.zIndex,
      placement: options.placement,
    });

    // eslint-disable-next-line no-underscore-dangle
    if (context ?? MessagePlugin._context) {
      // eslint-disable-next-line no-underscore-dangle
      instance.appContext = context ?? MessagePlugin._context;
    }

    attachDom.appendChild(wrapper);
    render(instance, wrapper);

    mgKey = instance.component.exposed.add(options);
    instanceMap.get(attachDom)[placement] = instance;
  } else {
    mgKey = p.component.exposed.add(options);
  }
  // 返回最新消息的 Element
  return new Promise((resolve) => {
    const ins = instanceMap.get(attachDom)[placement];
    nextTick(() => {
      const msg: Array<MessageInstance> = ins.component.exposed.messageList.value;
      resolve(msg?.find((mg) => (mg as any).$?.vnode?.key === mgKey));
    });
  });
};

const showThemeMessage: MessageMethod = (theme, params, duration, context) => {
  let options: MessageOptions = { theme };
  if (isString(params)) {
    options.content = params;
  } else if (isObject(params) && !(params instanceof Array)) {
    options = { ...options, ...params };
  }
  (duration || duration === 0) && (options.duration = duration);
  return MessageFunction(options, context);
};

interface ExtraApi {
  info: MessageInfoMethod;
  success: MessageSuccessMethod;
  warning: MessageWarningMethod;
  error: MessageErrorMethod;
  question: MessageQuestionMethod;
  loading: MessageLoadingMethod;
  close: MessageCloseMethod;
  closeAll: MessageCloseAllMethod;
  clearByKey: MessageClearByKeyMethod;
  configMerge: MessageConfigMergeMethod;
}

export type MessagePluginType = Plugin & ExtraApi & MessageMethod;

const extraApi: ExtraApi = {
  info: (params, duration, context) => showThemeMessage('info', params, duration, context),
  success: (params, duration, context) => showThemeMessage('success', params, duration, context),
  warning: (params, duration, context) => showThemeMessage('warning', params, duration, context),
  error: (params, duration, context) => showThemeMessage('error', params, duration, context),
  question: (params, duration, context) => showThemeMessage('question', params, duration, context),
  loading: (params, duration, context) => showThemeMessage('loading', params, duration, context),
  close: (promise) => {
    promise.then((instance) => instance?.close());
  },
  closeAll: () => {
    if (instanceMap instanceof Map) {
      instanceMap.forEach((attach) => {
        Object.keys(attach).forEach((placement) => {
          const instance = attach[placement];
          instance.component.exposed.removeAll();
        });
      });
    }
  },
  clearByKey: (mergeKey: string) => {
    if (instanceMap instanceof Map) {
      instanceMap.forEach((attach) => {
        Object.keys(attach).forEach((placement) => {
          const instance = attach[placement];
          if (instance.component.exposed.clearByKey) {
            instance.component.exposed.clearByKey(mergeKey);
          }
        });
      });
    }
  },
  configMerge: (config: MessageMergeConfig) => {
    if (instanceMap instanceof Map) {
      instanceMap.forEach((attach) => {
        Object.keys(attach).forEach((placement) => {
          const instance = attach[placement];
          if (instance.component.exposed.configMerge) {
            instance.component.exposed.configMerge(config);
          }
        });
      });
    }
  },
};

export const MessagePlugin = showThemeMessage as MessagePluginType & {
  _context?: AppContext;
};

MessagePlugin.install = (app: App): void => {
  app.config.globalProperties.$message = showThemeMessage;
  // 这样定义后，可以通过 this.$message 调用插件
  Object.keys(extraApi).forEach((funcName: keyof ExtraApi) => {
    app.config.globalProperties.$message[funcName] = extraApi[funcName];
  });
  // eslint-disable-next-line no-underscore-dangle
  MessagePlugin._context = app._context;
};

/**
 * 这样定义后，用户可以直接引入方法然后调用，示例如下：
 * import { showMessage } from 'message/index.ts';
 * showMessage();
 */
Object.keys(extraApi).forEach((funcName: keyof ExtraApi) => {
  // @ts-ignore
  // TODO https://github.com/microsoft/TypeScript/issues/32693
  MessagePlugin[funcName] = extraApi[funcName];
});

export default MessagePlugin;
