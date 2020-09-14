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
import { MessageProps, ThemeString, MessagePluginExtra, MessageInstanceType, MessagePluginAPI } from './type/index';

// 存储不同 attach 和 不同 placement 消息列表实例
const instanceMap: Map<Element, object> = new Map();

function handleParams(params: MessageProps): MessageProps {
  const options: MessageProps = Object.assign(
    {
      duration: 3000,
      attach: 'body',
      zIndex: DEFAULT_Z_INDEX,
      placement: 'top',
    },
    params
  );
  options.default = params.content || params.default;
  return options;
}

const MessageFunction = (props: MessageProps): Promise<MessageInstanceType> => {
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
      const msg: Array<MessageInstanceType> = _ins.$children;
      resolve(msg[msg.length - 1]);
    });
  });
};

const showThemeMessage = (theme: ThemeString, params: string | MessageProps, duration: number) => {
  let options: MessageProps = { theme };
  if (typeof params === 'string') {
    options.content = params;
  } else if (typeof params === 'object' && !(params instanceof Array)) {
    options = Object.assign(options, params);
  }
  duration && (options.duration = duration);
  return MessageFunction(options);
};

const extraAPi: MessagePluginExtra = {
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

Object.keys(extraAPi).forEach((key) => {
  MessageFunction[key] = extraAPi[key];
});

const MessagePlugin = MessageFunction as (typeof MessageFunction & MessagePluginAPI);

MessagePlugin.install = () => {
  Vue.prototype.$message = MessagePlugin;
};

export default MessagePlugin;
