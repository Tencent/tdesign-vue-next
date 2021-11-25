import { defineComponent } from 'vue';
import Notification from './notification';
import { TdNotificationProps, NotificationOptions } from './type';

const DEFAULT_Z_INDEX = 6000;
const MARGIN = 16;

export default defineComponent({
  components: { Notification },
  props: {
    placement: {
      type: String,
      default: 'top-right',
      validator(v: string): boolean {
        return ['top-left', 'top-right', 'bottom-left', 'bottom-right'].indexOf(v) > -1;
      },
    },
  },
  data() {
    return {
      list: [],
      zIndex: DEFAULT_Z_INDEX,
    };
  },
  methods: {
    add(options: TdNotificationProps): number {
      this.list.push(options);
      return this.list.length - 1;
    },
    remove(index: number) {
      this.list.splice(index, 1);
    },
    removeAll() {
      this.list = [];
    },
    notificationStyles(item: { offset: NotificationOptions['offset']; zIndex: number }) {
      const styles = {};
      this.placement.split('-').forEach((direction: 'left' | 'top' | 'bottom' | 'right') => {
        let margin = MARGIN;
        if (item.offset && item.offset[direction]) {
          margin += item.offset[direction];
        }
        styles[`margin-${direction}`] = `${margin}px`;
      });
      styles['z-index'] = item.zIndex ? item.zIndex : this.zIndex;
      return styles;
    },
    getListeners(index: number) {
      return {
        onClickCloseBtn: () => this.remove(index),
        onDurationEnd: () => this.remove(index),
      };
    },
    getLastChild() {
      return this.$refs[`notification${this.list.length - 1}`];
    },
  },
  render() {
    if (!this.list.length) return;
    return (
      <div class={`t-notification__show--${this.placement}`} style={`z-index: ${this.zIndex}`}>
        {this.list.map((item, index) => (
          <Notification
            ref={`notification${index}`}
            key={item.id}
            style={this.notificationStyles(item)}
            {...item}
            {...this.getListeners(index)}
          />
        ))}
      </div>
    );
  },
});
