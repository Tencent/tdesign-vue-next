import { defineComponent, ref, computed, Ref, CSSProperties } from '@td/adapter-vue';
import Notification from './notification';
import { TdNotificationProps, NotificationOptions } from '@td/intel/notification/type';
import { DEFAULT_Z_INDEX, PLACEMENT_OFFSET, DISTANCE } from './const';
import { usePrefixClass } from '@td/adapter-hooks';

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
    const notificationList = ref([]);

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
      const styles: CSSProperties = {
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

    const getProps = (index: number, item: NotificationOptions) => {
      return {
        ...item,
        onCloseBtnClick: (e: any) => {
          if (item.onCloseBtnClick) {
            item.onCloseBtnClick(e);
          }
          return remove(index);
        },
        onDurationEnd: () => {
          if (item.onDurationEnd) {
            item.onDurationEnd();
          }
          return remove(index);
        },
      };
    };

    const addChild = (el: Element) => {
      if (el) {
        notificationList.value.push(el);
      }
    };
    expose({ add, remove, removeAll, list, notificationList });

    return () => {
      if (!list.value.length) return;

      return (
        <div class={`${COMPONENT_NAME.value}__show`} style={styles.value}>
          {list.value.map((item: { offset: NotificationOptions['offset']; zIndex: number; id: number }, index) => (
            <Notification ref={addChild} key={item.id} style={notificationStyles(item)} {...getProps(index, item)} />
          ))}
        </div>
      );
    };
  },
});
