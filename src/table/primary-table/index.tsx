import { defineComponent, computed, provide } from 'vue';
import baseTableProps from '../base-table-props';
import primaryTableProps from '../primary-table-props';
import BaseTable from '../base-table';
import { prefix } from '../../config';
import { RenderExpandRowParams } from '../util/interface';
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
    const rehandleColumns = computed(() => columnsProcessor.getProcessedColumns());
    const rehandleData = computed(() => columnsProcessor.getRehandleData());
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
    };
  },
  render() {
    const {
      $props, rehandleColumns, rehandleData, slots: defaultSlots,
    } = this;
    const slots = {

      ...defaultSlots,
    };
    const props = {
      ...$props,
      data: rehandleData,
      columns: rehandleColumns,
    };
    return <BaseTable {...props}>{slots}</BaseTable>;
  },
});
