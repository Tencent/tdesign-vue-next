/**
 * Vue.prototype.$message = MessagePlugin;
 *
 * this.$message('info', '这是信息')
 * this.$message.info('这是信息')
 * this.$message.info('这是信息', 3000)
 * this.$message.info({ default: '这是信息', duration: 3000 })
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
 * const msg = this.$message.info('这是信息')
 * msg.then(instance => instance.close())
 *
 */

import Vue, { VueConstructor, PluginObject } from 'vue';
import { THEME_LIST } from './const';
import { MessageList, DEFAULT_Z_INDEX } from './messageList';
import { getAttach } from '../utils/dom';
import { MessageProps } from './type/index';

// 存储不同 attach 和 不同 placement 消息列表实例
const instanceMap: Map<Element, object> = new Map();

const showMessage = (props: { attach: string | Function; placement: string; zIndex: number }) => {
  const { attach, placement, zIndex } = props;
  const _a = getAttach(attach);
  if (!instanceMap.get(_a)) {
    instanceMap.set(_a, []);
  }
  const _p = instanceMap.get(_a)[placement];
  if (!_p) {
    const instance: any = new Vue(MessageList).$mount();
    placement && (instance.placement = placement);
    zIndex && (instance.zIndex = zIndex);
    instance.add(props);
    instanceMap.get(_a)[placement] = instance;
    _a.appendChild(instance.$el);
  } else {
    _p.add(props);
  }
  return new Promise((resolve) => {
    const _ins = instanceMap.get(_a)[placement];
    _ins.$nextTick(() => {
      const msg = _ins.$children;
      resolve(msg[msg.length - 1]);
    });
  });
};

function Message(theme: string, params: string | MessageProps, duration: number) {
  const props: {
    theme: string;
    duration: number;
    attach: string | Function;
    placement: string;
    default: string | Function;
    zIndex: number;
  } = {
    theme,
    duration: [undefined, null].includes(duration) ? 3000 : duration,
    attach: 'body',
    placement: 'top',
    default: '',
    zIndex: DEFAULT_Z_INDEX,
  };
  if (typeof params === 'object' && !(params instanceof Array)) {
    Object.assign(props, params);
    props.default = params.default || params.content;
  } else if (typeof params === 'string') {
    props.default = params;
  }
  return showMessage(props);
}

function closeAll() {
  if (instanceMap instanceof Map) {
    instanceMap.forEach((attach) => {
      Object.keys(attach).forEach((placement) => {
        const instance = attach[placement];
        instance.list = [];
      });
    });
  }
}

const MessagePlugin = Message as (typeof Message & PluginObject<void>);

THEME_LIST.forEach((theme: string) => {
  MessagePlugin[theme] = (params: string | MessageProps, time: number) => Message(theme, params, time);
  Object.assign(MessagePlugin, {
    close: (promise: Promise<{close: Function}>) => {
      promise.then(instance => instance.close());
    },
    closeAll,
  });
});

MessagePlugin.install = (Vue: VueConstructor) => {
  /* eslint-disable no-param-reassign */
  Vue.prototype.$message = MessagePlugin;
};

export default MessagePlugin;
