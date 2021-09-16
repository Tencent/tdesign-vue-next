import { defineComponent, VNode } from 'vue';
import { DataType, TdPrimaryTableProps } from '../../type';
import { prefix } from '../../../config';
import { emitEvent } from '../../../utils/event';

export interface RowDragEventArgs {
  index: number,
  data: any,
  vNode?: VNode,
}

export default defineComponent({
  name: `${prefix}-primary-table-row-draggable`,
  emits: ['drag-sort'],
  data() {
    return {
      draggingRowCurrentIndex: -1,
      dragging: false,
      currentRowData: null,
    };
  },
  methods: {
    onDragStart({ index, data }: RowDragEventArgs) {
      this.draggingRowCurrentIndex = index;
      this.currentRowData = data;
      this.dragging = true;
      this.addDragEndListener();
    },
    onDragOver({ index: overIndex, vNode, data }: RowDragEventArgs) {
      const { classList } = vNode.el as HTMLElement;
      if ([...classList].includes('v-move')) return;

      const { draggingRowCurrentIndex } = this;
      if (draggingRowCurrentIndex === -1 || draggingRowCurrentIndex === overIndex) return;

      this.emitChange(this.currentRowData, data, draggingRowCurrentIndex, overIndex);
      this.draggingRowCurrentIndex = overIndex;
    },
    addDragEndListener() {
      const onDragEnd = () => {
        this.dragging = false;
        document.removeEventListener('dragend', onDragEnd);
      };
      document.addEventListener('dragend', onDragEnd);
    },
    emitChange(current: DataType, target: DataType, currentIndex: number, targetIndex: number) {
      emitEvent<Parameters<TdPrimaryTableProps['onDragSort']>>(this, 'drag-sort', {
        current, target, currentIndex, targetIndex,
      });
    },
  },
});
