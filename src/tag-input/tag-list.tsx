import { defineComponent, PropType } from 'vue';
import Tag from '../tag';
import props from './props';

export interface CloseFuncContext {
  e: MouseEvent;
  item: string | number;
  index: number;
}

export type CloseFunc = (context: CloseFuncContext) => void;

export default defineComponent({
  name: 'TTagList',

  props: {
    list: props.value,
    tagProps: props.tagProps,
    readonly: props.readonly,
    onClose: {
      type: Function as PropType<CloseFunc>,
    },
  },

  render() {
    const list = this.list?.map((item, index) => (
      <Tag onClose={(e) => this.onClose({ e, item, index })} closable={!this.readonly} {...this.tagProps}>
        {item}
      </Tag>
    ));
    return list;
  },
});
