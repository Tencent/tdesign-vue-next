import baseTableProps from '../../../types/base-table/props';
import primaryTableProps from '../../../types/primary-table/props';
import BaseTable from '../base-table';
import { prefix } from '../../config';
import { RenderExpandRowParams } from '../util/interface';
import { defineComponent, computed, provide } from 'vue';
import ColumnsProcessor from './columns-processor';

export default defineComponent({
  name: `${prefix}-primary-table`,
  props: {
    ...baseTableProps,
    ...primaryTableProps,
  },
  setup(props, context) {
    const { slots } = context;
    const columnsProcessor = new ColumnsProcessor(props);
    const rehandleColumns = computed(() => {
      return columnsProcessor.getProcessedColumns();
    });
    const rehandleData = computed(() => {
      return columnsProcessor.getRehandleData();
    });
    if (props.expandedRow || props.asyncLoading) {
      const renderRow = (params: RenderExpandRowParams): void => {
        columnsProcessor.renderRow?.(params);
      };
      provide('renderRow', renderRow);
    }
    return {
      rehandleData,
      rehandleColumns,
      slots,
    }
  },
  render() {
    const { $props, rehandleColumns, rehandleData, slots: defaultSlots } = this;
    const slots = Object.assign(
      {},
      defaultSlots,
    );
    const props = Object.assign({}, $props, {
      data: rehandleData,
      columns: rehandleColumns,
    });
    return <BaseTable {...props}>{slots}</BaseTable>;
  },
});
