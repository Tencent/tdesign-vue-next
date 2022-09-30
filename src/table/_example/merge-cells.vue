<template>
  <div>
    <t-table
      :bordered="true"
      :data="data"
      :columns="columns"
      row-key="i"
      :rowspan-and-colspan="rowspanAndColspan"
      resizable
      table-layout="fixed"
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
  comment: '表头向左合并',
}));

const columns = [
  {
    className: 'test',
    colKey: 'platform',
    title: '平台',
  },
  {
    className: 'row',
    colKey: 'type',
    title: '类型',
  },
  {
    className: 'test4',
    colKey: 'default',
    title: '默认值',
  },
  {
    className: 'test3',
    colKey: 'needed',
    title: '是否必传',
  },
  {
    className: 'row',
    colKey: 'description',
    title: '说明',
    // 仅适用于单行表头合并列
    colspan: 2,
    // 设置列样式，注释的示例代码有效
    // attrs: ({ type, col, row, colIndex, rowIndex }) => ({
    //   style: {
    //     color: 'blue',
    //   },
    // }),
  },
  {
    colKey: 'comment',
    title: '合并列',
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
</script>
