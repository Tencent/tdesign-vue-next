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
import { App, createApp, nextTick, Plugin, ComponentPublicInstance } from 'vue';
import MessageList, { DEFAULT_Z_INDEX } from './messageList';
import { getAttach } from '../utils/dom';
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
} from './type';
import { AttachNodeReturnValue } from '../common';
import { isObject } from 'lodash-es';
import { isString } from 'lodash-es';

// 存储不同 attach 和 不同 placement 消息列表实例
const instanceMap: Map<AttachNodeReturnValue, Record<string, ComponentPublicInstance>> = new Map();

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

const MessageFunction = (props: MessageOptions): Promise<MessageInstance> => {
  const options = handleParams(props);
  const { attach, placement } = options;
  const attachDom = getAttach(attach);
  if (!instanceMap.get(attachDom)) {
    instanceMap.set(attachDom, {});
  }
  const p = instanceMap.get(attachDom)[placement];
  let mgKey: number;
  if (!p) {
    const wrapper = document.createElement('div');

    const instance = createApp(MessageList, {
      zIndex: options.zIndex,
      placement: options.placement,
    }).mount(wrapper);

    mgKey = instance.add(options);
    instanceMap.get(attachDom)[placement] = instance;
    attachDom.appendChild(wrapper);
  } else {
    mgKey = p.add(options);
  }
  // 返回最新消息的 Element
  return new Promise((resolve) => {
    const ins = instanceMap.get(attachDom)[placement];
    nextTick(() => {
      const msg: Array<MessageInstance> = ins.messageList;
      resolve(msg?.find((mg) => mg.$?.vnode?.key === mgKey));
    });
  });
};

const showThemeMessage: MessageMethod = (theme, params, duration) => {
  let options: MessageOptions = { theme };
  if (isString(params)) {
    options.content = params;
  } else if (isObject(params) && !(params instanceof Array)) {
    options = { ...options, ...params };
  }
  (duration || duration === 0) && (options.duration = duration);
  return MessageFunction(options);
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
}

export type MessagePluginType = Plugin & ExtraApi & MessageMethod;

const extraApi: ExtraApi = {
  info: (params, duration) => showThemeMessage('info', params, duration),
  success: (params, duration) => showThemeMessage('success', params, duration),
  warning: (params, duration) => showThemeMessage('warning', params, duration),
  error: (params, duration) => showThemeMessage('error', params, duration),
  question: (params, duration) => showThemeMessage('question', params, duration),
  loading: (params, duration) => showThemeMessage('loading', params, duration),
  close: (promise) => {
    promise.then((instance) => instance?.close());
  },
  closeAll: () => {
    if (instanceMap instanceof Map) {
      instanceMap.forEach((attach) => {
        Object.keys(attach).forEach((placement) => {
          const instance = attach[placement];
          instance.list = [];
        });
      });
    }
  },
};

export const MessagePlugin: MessagePluginType = showThemeMessage as MessagePluginType;

MessagePlugin.install = (app: App): void => {
  app.config.globalProperties.$message = showThemeMessage;
  // 这样定义后，可以通过 this.$message 调用插件
  Object.keys(extraApi).forEach((funcName: keyof ExtraApi) => {
    app.config.globalProperties.$message[funcName] = extraApi[funcName];
  });
};

/**
 * 这样定义后，用户可以直接引入方法然后调用，示例如下：
 * import { showMessage } from 'message/index.ts';
 * showMessage();
 */
Object.keys(extraApi).forEach((funcName: keyof ExtraApi) => {
  // @ts-ignore
  // TODO 我😭
  MessagePlugin[funcName] = extraApi[funcName];
});

export default MessagePlugin;
