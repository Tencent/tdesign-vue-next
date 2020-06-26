/**
 * this.$message('info', '这是信息')
 * this.$message.info('这是信息')
 * this.$message.info('这是信息', 3000)
 * this.$message.info({ default: '这是信息', duration: 3000 })
 * this.$message.success({ content: '这是信息', duration: 3000 })
 * this.$message.warning()
 * this.$message.error()
 * this.$message.question()
 * this.$message.loading()
 * this.$message.close()
 * this.$message.closeAll()
 */
import Vue from 'vue';
import TMessage from './message';
import { THEME_LIST, PLACEMENT_OFFSET } from './const';

const DEFAULT_Z_INDEX = 6000;

const getUniqueId = (() => {
  let id = 0;
  return () => {
    id = id + 1;
    return id;
  };
})();

const MessageList = Vue.extend({
  components: { TMessage },
  data() {
    return {
      list: [],
      zIndex: DEFAULT_Z_INDEX,
      placement: 'top',
    };
  },
  computed: {
    styles(): object {
      return Object.assign(
        {
          zIndex: this.zIndex !== DEFAULT_Z_INDEX,
        },
        PLACEMENT_OFFSET[this.placement]
      );
    },
    on() {
      return {
        'click-close-btn': (e: Event, instance: any) => this.remove(instance),
        'duration-end': (instance: any) => this.remove(instance),
      };
    },
  },
  methods: {
    add(msg: { key: number }): number {
      msg.key = getUniqueId();
      this.list.push(msg);
      return this.list.length - 1;
    },
    remove(instance: any) {
      const children: object = this.$el.children;
      this.list = this.list.filter((v, i) => children[i] !== instance.$el);
    },
    removeAll() {
      this.list = [];
    },
  },
  render() {
    if (!this.list.length) return;
    return (
      <div class='t-message-list' style={this.styles}>
        {this.list
          .map(item => (
            <t-message
              key={item.key}
              {...{ props: item }}
              {...{ on: this.on }}
            />
          ))
        }
      </div>
    );
  },
});

const getAttach = (attach: string | Function = 'body') => {
  let r: Element;
  if (typeof attach === 'string') {
    r = document.querySelector(attach);
  } else if (typeof attach === 'function') {
    r = attach();
  } else {
    console.error('TDesign Error: attach type must a string or function.');
  }
  return r;
};

const setInstance = (() => {
  // 存储不同 attach 和 不同 placement 消息列表实例
  const instanceMap: Map<Element, object> = new Map();
  return (props: { attach: string | Function; placement: string; zIndex: number }) => {
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
    return instanceMap.get(_a)[placement];
  };
})();

function Message(theme: string, params: Record<string, any>, duration: number) {
  const props: {
    theme: string;
    duration: number;
    attach: string | Function;
    placement: string;
    default: string;
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
  return setInstance(props);;
}

const MessagePlugin = Message;

THEME_LIST.forEach((t: string) => {
  MessagePlugin[t] = (params: object = {}, time: number) => {
    Message(t, params, time);
  };
});

export default MessagePlugin;
