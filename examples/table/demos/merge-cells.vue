<template>
  <div>
    <t-table
      :bordered="true"
      :data="data"
      :columns="columns"
      :row-key="rowKey"
      :size="size"
      :rowspan-and-colspan="rowspanAndColspan"
    />
  </div>
</template>
<script>
import { defineComponent } from 'vue';

const data = [
  {
    platform: '公有',
    type: 'Array<any>',
    default: '[]',
    needed: 'Y',
    description: '数据源',
  },
  {
    platform: '私有',
    type: 'String/""',
    default: '""',
    needed: 'Y',
    description: '描述',
  },
  {
    platform: '私有',
    type: 'Object / {}',
    default: '{}',
    needed: 'Y',
    description: '复杂类型',
  },
  {
    platform: '公有',
    type: 'Boolean',
    default: 'false',
    needed: 'N',
    description: '标识符',
  },
  {
    platform: '公有',
    type: 'Number',
    default: '-1 / N',
    needed: 'Y',
    description: '位置',
  },
  {
    platform: '私有',
    type: 'Number',
    default: '-1',
    needed: 'N',
    description: 'Number 类型',
  },
];

const columns = [
  {
    align: 'left',
    width: '100',
    minWidth: '100',
    className: 'test',
    ellipsis: true,
    colKey: 'platform',
    title: '平台',
  },
  {
    align: 'left',
    width: '100',
    minWidth: '100',
    className: 'row',
    ellipsis: true,
    colKey: 'type',
    title: '类型',
  },
  {
    align: 'left',
    width: '100',
    minWidth: '100',
    className: 'test4',
    ellipsis: true,
    colKey: 'default',
    title: '默认值',
  },
  {
    align: 'left',
    width: '100',
    minWidth: '100',
    className: 'test3',
    ellipsis: true,
    colKey: 'needed',
    title: '是否必传',
  },
  {
    align: 'left',
    width: '100',
    minWidth: '100',
    className: 'row',
    ellipsis: true,
    colKey: 'description',
    title: '说明',
  },
];

const rowspanAndColspan = ({ col, rowIndex }) => {
  if (col.colKey === 'needed' && rowIndex === 0) {
    return {
      colspan: 2,
    };
  }
  if (col.colKey === 'type' && rowIndex === 1) {
    return {
      colspan: 2,
      rowspan: 2,
    };
  }
  if (col.colKey === 'default' && rowIndex === 4) {
    return {
      colspan: 2,
      rowspan: 2,
    };
  }
};

export default defineComponent({
  setup() {
    return {
      data,
      columns,
      rowspanAndColspan,
      rowKey: 'default',
      size: 'small',
    };
  },
});
</script>
