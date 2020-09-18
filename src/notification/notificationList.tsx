import Vue from 'vue';
import Notification from './notification';
import { NotificationProps, NotificationInstanceType, Offset, OffsetDirection } from './type/index';

const DEFAULT_Z_INDEX = 6000;
const _margin = 16;

export default Vue.extend({
  components: { Notification },
  props: {
    placement: {
      type: String,
      default: 'top-right',
      validator(v: string): boolean {
        return (
          [
            'top-left',
            'top-right',
            'bottom-left',
            'bottom-right',
          ].indexOf(v) > -1
        );
      },
    },
  },
  data() {
    return {
      list: [],
      zIndex: DEFAULT_Z_INDEX,
    };
  },
  computed: {
    on() {
      return {
        'click-close-btn': (e: Event, instance: NotificationInstanceType) => this.remove(instance),
        'duration-end': (instance: NotificationInstanceType) => this.remove(instance),
      };
    },
  },
  methods: {
    add(options: NotificationProps): number {
      this.list.push(options);
      return this.list.length - 1;
    },
    remove(instance: NotificationInstanceType) {
      // eslint-disable-next-line
      const children: HTMLCollection = this.$el.children;
      this.list = this.list.filter((v, i) => children[i] !== instance.$el);
    },
    removeAll() {
      this.list = [];
    },
    msgStyles(item: { offset: Offset; zIndex: number }) {
      const styles = {};
      this.placement.split('-').forEach((direction: OffsetDirection) => {
        let margin = _margin;
        if (item.offset && item.offset[direction]) {
          margin += item.offset[direction];
        }
        styles[`margin-${direction}`] = `${margin}px`;
      });
      styles['z-index'] = item.zIndex ? item.zIndex : this.zIndex;
      return styles;
    },
  },
  render() {
    if (!this.list.length) return;
    return (
      <div class={`t-notification__show--${this.placement}`} style={`z-index: ${this.zIndex}`}>
        {this.list
          .map(item => (
            <t-notification
              key={item.id}
              style={this.msgStyles(item)}
              {...{ props: item }}
              {...{ on: this.on }}
            />
          ))
        }
      </div>
    );
  },
});
