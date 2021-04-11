import { defineComponent } from 'vue';
import Notification from './notification';
import { TdNotificationProps, PlacementList } from '@TdTypes/notification/TdNotificationProps';

const DEFAULT_Z_INDEX = 6000;
const _margin = 16;

export default defineComponent({
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
    notificationStyles(item: { offset: PlacementList; zIndex: number }) {
      const styles = {};
      this.placement.split('-').forEach((direction: 'left' | 'top' | 'bottom' | 'right') => {
        let margin = _margin;
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
        'click-close-btn': () => this.remove(index),
        'duration-end': () => this.remove(index),
      };
    },
  },
  render() {
    if (!this.list.length) return;
    return (
      <div class={`t-notification__show--${this.placement}`} style={`z-index: ${this.zIndex}`}>
        {this.list
          .map((item, index) => (
            <t-notification
              key={item.id}
              style={this.notificationStyles(item)}
              {...{ props: item }}
              {...{ on: this.getListeners(index) }}
            />
          ))
        }
      </div>
    );
  },
});
