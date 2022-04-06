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
<script setup>
const data = new Array(6).fill(null).map((_, i) => ({
  i,
  platform: ['公有', '私有'][i % 1],
  type: ['Array<any>', 'String', 'Object', 'Boolean', 'Number'][i % 4],
  default: ['[]', '""', '{}', 'false', '-1', '0'][i % 5],
  needed: ['Y', 'N'][i % 1],
  description: ['数据源', '描述', '复杂类型', '标识符', '位置'][i % 4],
}));

const columns = [
  {
    align: 'left',
    width: '100',
    minWidth: '100',
    className: 'test',
    colKey: 'platform',
    title: '平台',
  },
  {
    align: 'left',
    width: '100',
    minWidth: '100',
    className: 'row',
    colKey: 'type',
    title: '类型',
  },
  {
    align: 'left',
    width: '100',
    minWidth: '100',
    className: 'test4',
    colKey: 'default',
    title: '默认值',
  },
  {
    align: 'left',
    width: '100',
    minWidth: '100',
    className: 'test3',
    colKey: 'needed',
    title: '是否必传',
  },
  {
    align: 'left',
    width: '100',
    minWidth: '100',
    className: 'row',
    colKey: 'description',
    title: '说明',
  },
];

const rowspanAndColspan = ({ col, rowIndex, colIndex }) => {
  if (colIndex === 0 && rowIndex % 2 === 0) {
    return {
      rowspan: 2,
    };
  }
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

const rowKey = 'default';
const size = 'small';
</script>
