import Vue from 'vue';
import { PLACEMENT_OFFSET } from './const';
import TMessage from './message';
import { prefix } from '../config';
import { TdMessageProps } from '@TdTypes/message/TdMessageProps';

export const DEFAULT_Z_INDEX = 6000;

const getUniqueId = (() => {
  let id = 0;
  return () => {
    id = id + 1;
    return id;
  };
})();

export const MessageList = Vue.extend({
  name: `${prefix}-message-list`,
  components: { TMessage },
  props: {
    zIndex: Number,
    placement: String,
  },
  data() {
    return {
      list: [],
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
    add(msg: TdMessageProps): number {
      const _msg = Object.assign({}, msg, {
        key: getUniqueId(),
      });
      this.list.push(_msg);
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
        'click-close-btn': () => this.remove(index),
        'duration-end': () => this.remove(index),
      };
    },
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
              {...{ props: item }}
              {...{ on: this.getListeners(index) }}
            />
          ))
        }
      </div>
    );
  },
});

export default MessageList;
