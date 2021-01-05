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

import Vue from 'vue';
import { MessageList, DEFAULT_Z_INDEX } from './messageList';
import { getAttach } from '../utils/dom';
import { MessageOptions, MessageInfoOptions, MessageMethod, MessageInstance, ThemeList,
  MessageInfoMethod, MessageErrorMethod, MessageWarningMethod, MessageSuccessMethod,
  MessageLoadingMethod, MessageQuestionMethod, MessageCloseMethod, MessageCloseAllMethod } from '@TdTypes/message/TdMessageProps';

// 存储不同 attach 和 不同 placement 消息列表实例
const instanceMap: Map<Element, object> = new Map();

function handleParams(params: MessageOptions): MessageOptions {
  const options: MessageOptions = Object.assign(
    {
      duration: 3000,
      attach: 'body',
      zIndex: DEFAULT_Z_INDEX,
      placement: 'top',
    },
    params
  );
  options.content = params.content;
  return options;
}

const MessageFunction = (props: MessageOptions): Promise<MessageInstance> => {
  const options = handleParams(props);
  const { attach, placement } = options;
  const _a = getAttach(attach);
  if (!instanceMap.get(_a)) {
    instanceMap.set(_a, []);
  }
  const _p = instanceMap.get(_a)[placement];
  if (!_p) {
    const instance = new MessageList({
      propsData: {
        zIndex: options.zIndex,
        placement: options.placement,
      },
    }).$mount();
    instance.add(options);
    instanceMap.get(_a)[placement] = instance;
    _a.appendChild(instance.$el);
  } else {
    _p.add(options);
  }
  // 返回最新消息的 Element
  return new Promise((resolve) => {
    const _ins = instanceMap.get(_a)[placement];
    _ins.$nextTick(() => {
      const msg: Array<MessageInstance> = _ins.$children;
      resolve(msg[msg.length - 1]);
    });
  });
};

const showThemeMessage: MessageMethod = (theme: ThemeList, params: string | MessageInfoOptions, duration: number) => {
  let options: MessageOptions = { theme };
  if (typeof params === 'string') {
    options.content = params;
  } else if (typeof params === 'object' && !(params instanceof Array)) {
    options = Object.assign(options, params);
  }
  (duration || duration === 0) && (options.duration = duration);
  return MessageFunction(options);
};

const extraAPi: {
  info: MessageInfoMethod;
  success: MessageSuccessMethod;
  warning: MessageWarningMethod;
  error: MessageErrorMethod;
  question: MessageQuestionMethod;
  loading: MessageLoadingMethod;
  close: MessageCloseMethod;
  closeAll: MessageCloseAllMethod;
} = {
  info: (params, duration) => showThemeMessage('info', params, duration),
  success: (params, duration) => showThemeMessage('success', params, duration),
  warning: (params, duration) => showThemeMessage('warning', params, duration),
  error: (params, duration) => showThemeMessage('error', params, duration),
  question: (params, duration) => showThemeMessage('question', params, duration),
  loading: (params, duration) => showThemeMessage('loading', params, duration),
  close: (promise) => {
    promise.then(instance => instance.close());
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

const MessagePlugin = showThemeMessage as (MessageMethod & Vue.PluginObject<void>);

Object.keys(extraAPi).forEach((key) => {
  MessagePlugin[key] = extraAPi[key];
});

MessagePlugin.install = () => {
  Vue.prototype.$message = MessagePlugin;
};

export default MessagePlugin;
