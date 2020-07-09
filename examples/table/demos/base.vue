<template>
  <t-table
    :data="data"
    :columns="columns"
    :rowKey="rowKey"
    :verticalAlign="verticalAlign"
    :border="border"
    :hover="hover"
    :stripe="stripe"
    :size="size"
    :pagination="pagination">
  </t-table>
</template>
<script>
export default {
  data() {
    const item = {
      property: 'data',
      platform: '公有',
      type: 'any[]',
      default: '[]',
      needed: 'Y',
      description: '数据源',
    };
    const data = [];
    for (let i = 0;i < 10; i ++) {
      data.push({
        ...item,
        index: i,
      });
    }
    return {
      data,
      columns: [
        {
          align: 'left',
          width: '100',
          minWidth: '100',
          className: 'row',
          ellipsis: true,
          colKey: 'index',
          title: 'index',
        },
        {
          align: 'left',
          width: 200,
          minWidth: '200',
          className: 'row',
          ellipsis: true,
          colKey: 'type',
          title: '类型',
        },
        {
          align: 'left',
          width: 100,
          minWidth: '100',
          className: 'test',
          ellipsis: true,
          colKey: 'platform',
          title: '平台',
        },
        {
          align: 'left',
          width: 200,
          minWidth: '200',
          className: 'test2',
          ellipsis: true,
          colKey: 'property',
          title: '属性',
        },
        {
          align: 'left',
          // width: 100,
          // minWidth: '100',
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
      ],
      rowKey: 'property',
      tableLayout: 'auto',
      verticalAlign: 'top',
      size: 'small',
      border: true,
      hover: true,
      stripe: true,
      rowClassName: rowKey => `${rowKey}-class`,
      // 与pagination对齐
      pagination: {
        show: true,
        pageSize: 10,
        pageIndex: 0,
        total: 100,
      },
    };
  },
};
</script>
