import { defineComponent } from 'vue';
import { PLACEMENT_OFFSET } from './const';
import TMessage from './message';
import { prefix } from '../config';
import { MessageOptions } from '@TdTypes/message/TdMessageProps';

export const DEFAULT_Z_INDEX = 6000;

const getUniqueId = (() => {
  let id = 0;
  return () => {
    id = id + 1;
    return id;
  };
})();

export const MessageList = defineComponent({
  name: `${prefix}-message-list`,
  components: { TMessage },
  props: {
    zIndex: Number,
    placement: String,
  },
  data() {
    return {
      list: [],
      messageList: [],
    };
  },
  computed: {
    styles(): Styles {
      return Object.assign(
        {
          zIndex: this.zIndex !== DEFAULT_Z_INDEX,
        },
        PLACEMENT_OFFSET[this.placement]
      );
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
    msgStyles(item: { offset: object }) {
      const styles = {};
      item.offset && Object.assign(styles, item.offset, {
        position: 'absolute',
        width: 'auto',
      });
      return styles;
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
    }
  },
  render() {
    if (!this.list.length) return;
    return (
      <div class='t-message-list' style={this.styles}>
        {this.list
          .map((item, index) => (
            <t-message
              key={item.key}
              style={this.msgStyles(item)}
              ref={this.addChild}
              { ...item }
              { ...this.getListeners(index) }
            />
          ))
        }
      </div>
    );
  },
});

export default MessageList;
