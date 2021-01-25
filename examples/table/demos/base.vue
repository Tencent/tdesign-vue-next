<template>
  <t-table
    :data="data"
    :columns="columns"
    :rowKey="rowKey"
    :verticalAlign="verticalAlign"
    :bordered="bordered"
    :hover="hover"
    :stripe="stripe"
    :size="size"
    :pagination="pagination"
    @page-change="rehandlePageChange"
    @change="rehandleChange">
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
      detail: {
        name: '嵌套信息读取',
      },
    };
    const data = [];
    for (let i = 0; i < 100; i ++) {
      data.push({
        ...item,
        index: i,
      });
    }
    return {
      data,
      columns: [
        {
          align: 'center',
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
          className: 'test3',
          ellipsis: true,
          colKey: 'detail.name',
          title: '详情信息',
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
      bordered: true,
      hover: true,
      stripe: true,
      rowClassName: rowKey => `${rowKey}-class`,
      // 与pagination对齐
      pagination: {
        pageSize: 5,
        total: 120,
        current: 1,
        visibleWithOnePage: true,
        onChange() {
          console.log('pagination change');
        },
      },
    };
  },
  methods: {
    rehandlePageChange(curr, pageInfo) {
      console.log('分页变化', curr, pageInfo);
    },
    rehandleChange(changeParams, triggerAndData) {
      console.log('统一Change', changeParams, triggerAndData);
    },
  },
};
</script>
