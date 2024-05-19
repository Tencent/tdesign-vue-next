import { defineComponent } from '@td/adapter-vue';
import baseTableProps from '@td/intel/components/table/base-table-props';
import primaryTableProps from '@td/intel/components/table/primary-table-props';

// !! 该文件仅用作代码提示，不用做任何功能开发 !!
export default defineComponent({
  name: 'TTable',
  props: {
    ...baseTableProps,
    ...primaryTableProps,
  },
});
