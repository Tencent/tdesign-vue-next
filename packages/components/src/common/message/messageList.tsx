import { computed, defineComponent, ref } from '@td/adapter-vue';
import { PLACEMENT_OFFSET } from './const';
import TMessage from './message';
import type { MessageOptions } from '@td/intel/components/message/type';
import { usePrefixClass } from '@td/adapter-hooks';

export const DEFAULT_Z_INDEX = 6000;

const getUniqueId = (() => {
  let id = 0;
  return () => {
    id += 1;
    return id;
  };
})();

export default defineComponent({
  name: 'TMessageList',
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
  setup(props, { expose }) {
    const COMPONENT_NAME = usePrefixClass('message__list');
    const list = ref([]);
    const messageList = ref([]);

    const styles = computed(() => ({
      ...PLACEMENT_OFFSET[props.placement],
      zIndex: props.zIndex !== DEFAULT_Z_INDEX ? props.zIndex : DEFAULT_Z_INDEX,
    }));

    const add = (msg: MessageOptions): number => {
      const mg = { ...msg, key: getUniqueId() };
      list.value.push(mg);
      return mg.key;
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

    const msgStyles = (item: { offset: Array<string | number> }) => {
      return (
        item.offset && {
          position: 'relative',
          left: getOffset(item.offset[0]),
          top: getOffset(item.offset[1]),
        }
      );
    };

    const getProps = (index: number, item: MessageOptions) => {
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
        messageList.value.push(el);
      }
    };

    expose({ add, removeAll, list, messageList });

    return () => {
      if (!list.value.length) return;

      return (
        <div class={COMPONENT_NAME.value} style={styles.value}>
          {list.value.map((item, index) => (
            <TMessage key={item.key} style={msgStyles(item)} ref={addChild} {...getProps(index, item)} />
          ))}
        </div>
      );
    };
  },
});
