import { defineComponent, ref, computed, TransitionGroup, Ref } from 'vue';
import Notification from './notification';
import { TdNotificationProps, NotificationOptions } from './type';
import { Styles } from '../common';
import { DEFAULT_Z_INDEX, PLACEMENT_OFFSET, DISTANCE } from './const';
import { usePrefixClass } from '../hooks/useConfig';

export default defineComponent({
  props: {
    placement: {
      type: String,
      default: 'top-right',
      validator(v: string): boolean {
        return ['top-left', 'top-right', 'bottom-left', 'bottom-right'].indexOf(v) > -1;
      },
    },
  },
  setup(props, { expose }) {
    const COMPONENT_NAME = usePrefixClass('notification-list');

    const { placement } = props as NotificationOptions;

    const list: Ref<NotificationOptions[]> = ref([]);

    const styles = computed(() => ({
      zIndex: DEFAULT_Z_INDEX,
      ...PLACEMENT_OFFSET[placement],
    }));

    const add = (options: TdNotificationProps): number => {
      list.value.push(options);
      return list.value.length - 1;
    };

    const remove = (index: number) => {
      list.value.splice(index, 1);
    };

    const removeAll = () => {
      list.value = [];
    };

    const getOffset = (val: string | number) => {
      if (!val) return;
      return isNaN(Number(val)) ? val : `${val}px`;
    };

    const notificationStyles = (item: { offset: NotificationOptions['offset']; zIndex: number }) => {
      const styles: Styles = {
        marginBottom: DISTANCE,
      };
      if (item.offset) {
        styles.position = 'relative';
        styles.left = getOffset(item.offset[0]);
        styles.top = getOffset(item.offset[1]);
      }
      if (item.zIndex) styles['z-index'] = item.zIndex;
      return styles;
    };

    const getListeners = (index: number) => {
      return {
        onCloseBtnClick: () => remove(index),
        onDurationEnd: () => remove(index),
      };
    };

    expose({ add, remove, removeAll });

    return () => (
      <div class={`${COMPONENT_NAME.value}__show-transition--${placement}`} style={styles.value}>
        <TransitionGroup name="notification-slide-fade">
          {list.value.map((item: { offset: NotificationOptions['offset']; zIndex: number; id: number }, index) => (
            <Notification
              ref={`notification${index}`}
              key={item.id}
              style={notificationStyles(item)}
              {...item}
              {...getListeners(index)}
            />
          ))}
        </TransitionGroup>
      </div>
    );
  },
});
