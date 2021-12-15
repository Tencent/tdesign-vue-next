import { defineComponent } from 'vue';
import { PLACEMENT_OFFSET } from './const';
import TMessage from './message';
import { prefix } from '../config';
import { MessageOptions } from './type';

export const DEFAULT_Z_INDEX = 6000;

const getUniqueId = (() => {
  let id = 0;
  return () => {
    id += 1;
    return id;
  };
})();

export const MessageList = defineComponent({
  name: `${prefix}-message__list`,
  components: { TMessage },
  props: {
    zIndex: {
      type: Number,
      default: 0,
    },
    placement: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      list: [],
      messageList: [],
    };
  },
  computed: {
    styles(): Record<string, string | number> {
      return {
        ...PLACEMENT_OFFSET[this.placement],
        zIndex: this.zIndex !== DEFAULT_Z_INDEX ? this.zIndex : DEFAULT_Z_INDEX,
      };
    },
  },
  methods: {
    add(msg: MessageOptions): number {
      const mg = {
        ...msg,
        key: getUniqueId(),
      };
      this.list.push(mg);
      return this.list.length - 1;
    },
    remove(index: number) {
      this.list.splice(index, 1);
    },
    removeAll() {
      this.list = [];
    },
    getOffset(val: string | number) {
      if (!val) return;
      return isNaN(Number(val)) ? val : `${val}px`;
    },
    msgStyles(item: { offset: Array<string | number> }) {
      return (
        item.offset && {
          position: 'relative',
          left: this.getOffset(item.offset[0]),
          top: this.getOffset(item.offset[1]),
        }
      );
    },
    getListeners(index: number) {
      return {
        onClickCloseBtn: () => this.remove(index),
        onDurationEnd: () => this.remove(index),
      };
    },
    addChild(el: Element) {
      if (el) {
        this.messageList.push(el);
      }
    },
  },
  render() {
    if (!this.list.length) return;
    return (
      <div class="t-message__list" style={this.styles}>
        {this.list.map((item, index) => (
          <t-message
            key={item.key}
            style={this.msgStyles(item)}
            ref={this.addChild}
            {...item}
            {...this.getListeners(index)}
          />
        ))}
      </div>
    );
  },
});

export default MessageList;
