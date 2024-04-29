import { defineComponent } from 'vue';

import baseTableProps from './base-table-props';
import primaryTableProps from './primary-table-props';

// !! 该文件仅用作代码提示，不用做任何功能开发 !!
export default defineComponent({
  name: 'TTable',
  props: {
    ...baseTableProps,
    ...primaryTableProps,
  },
});
