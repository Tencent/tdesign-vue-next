import { defineComponent } from 'vue';
import baseTableProps from '../base-table-props';
import primaryTableProps from '../primary-table-props';
import enhancedTableProps from '../enhanced-table-props';
import PrimaryTable from '../primary-table';
import TreeData from './tree';
import TreeSelect from './tree-select';
import { TdEnhancedTableProps } from '../type';

export default defineComponent({
  name: 'TEnhancedTable',
  mixins: [TreeData, TreeSelect],
  props: {
    ...baseTableProps,
    ...primaryTableProps,
    ...enhancedTableProps,
  },
  data() {
    return {
      dataSource: this.data,
    };
  },
  computed: {
    childrenKey(): string {
      return (this.tree as TdEnhancedTableProps['tree'])?.childrenKey || 'children';
    },
  },
  watch: {
    data(val) {
      this.dataSource = val;
    },
  },
  render() {
    const { $slots, $props } = this;

    const listeners = {
      onSelectChange: this.onInnerSelectChange,
    };

    const primaryTableProps = {
      ...$props,
      ...this.$attrs,
      data: this.dataSource,
      columns: this.columnsSource,
      ...listeners,
    };
    return (
      <PrimaryTable {...primaryTableProps}>{$slots}</PrimaryTable>
    );
  },
});
