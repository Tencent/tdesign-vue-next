/**
 * this.$message.info('这是信息')
 * this.$message.info('这是信息', 3000)
 * this.$message.info({ default: '这是信息', duration: 3000 })
 * this.$message.success()
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
  },
  methods: {
    add(msg: Record<string, any>): number {
      this.list.push(msg);
      return this.list.length - 1;
    },
    remove(index: number) {
      this.list.splice(index, 1);
    },
    removeAll() {
      this.list = [];
    },
  },
  render() {
    return (
      <div class='t-message-list' style={this.styles}>
        {this.list
          .filter(msg => msg)
          .map(item => <t-message {...{ props: item }}/>)
        }
      </div>
    );
  },
});

const getInstance = (() => {
  let instance: any = null;
  return () => {
    if (instance) return instance;
    instance = new Vue(MessageList).$mount();
    document.body.appendChild(instance.$el);
    return instance;
  };
})();

function Message(t: string, params: Record<string, any>, duration: number) {
  const props: Record<string, any> = {
    theme: t,
    duration: [undefined, null].includes(duration) ? 3000 : duration,
  };
  if (typeof params === 'object') {
    Object.assign(props, params);
  } else if (typeof params === 'string') {
    props.default = params;
  }
  const _vm = getInstance();
  params.zIndex && (_vm.zIndex = params.zIndex);
  params.placement && (_vm.placement = params.placement);
  _vm.add(props);
  return _vm;
}

function close(index: number) {
  const _vm = getInstance();
  _vm.remove(index);
}

function closeAll() {
  const _vm = getInstance();
  _vm.removeAll();
}

const MessagePlugin = ((): object => {
  const plugins = {
    close,
    closeAll,
  };
  THEME_LIST.forEach((t: string) => {
    plugins[t] = (params: object = {}, time: number) => {
      Message(t, params, time);
    };
  });
  return plugins;
})();

export default MessagePlugin;
