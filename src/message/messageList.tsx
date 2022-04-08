import { computed, defineComponent, ref } from 'vue';
import { PLACEMENT_OFFSET } from './const';
import TMessage from './message';
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
    const list = ref([]);
    const messageList = ref([]);

    const styles = computed(() => ({
      ...PLACEMENT_OFFSET[props.placement],
      zIndex: props.zIndex !== DEFAULT_Z_INDEX ? props.zIndex : DEFAULT_Z_INDEX,
    }));

    const add = (msg: MessageOptions): number => {
      const mg = { ...msg, key: getUniqueId() };
      list.value.push(mg);
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

    const msgStyles = (item: { offset: Array<string | number> }) => {
      return (
        item.offset && {
          position: 'relative',
          left: getOffset(item.offset[0]),
          top: getOffset(item.offset[1]),
        }
      );
    };

    const getListeners = (index: number) => {
      return {
        onCloseBtnClick: () => remove(index),
        onDurationEnd: () => remove(index),
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
        <div class="t-message__list" style={styles.value}>
          {list.value.map((item, index) => (
            <TMessage key={item.key} style={msgStyles(item)} ref={addChild} {...item} {...getListeners(index)} />
          ))}
        </div>
      );
    };
  },
});

export default MessageList;
