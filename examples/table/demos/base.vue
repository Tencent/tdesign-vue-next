<template>
  <t-table
    :data="data"
    :columns="columns"
    :empty="empty"
    :rowKey="rowKey"
    :verticalAlign="verticalAlign"
    :border="border"
    :hover="hover"
    :stripe="stripe"
    :size="size">
    <!-- 自定义表头 支持 slot -->
    <span slot='customTitle'>😁 My Name</span>
    <!-- 自定义单元格 支持 slot -->
    <span slot='property' slot-scope='{text, record}'>
      😸 - {{text}} - {{record.description}}
    </span>
    <!-- 自定义空表格 -->
    <span slot='empty'>
      😄 It's empty.
    </span>
  </t-table>
</template>
<script>
export default {
  data() {
    return {
      data: [
        {
          platform: '公有',
          property: 'data',
          type: 'any[]',
          default: '[]',
          needed: 'Y',
          description: '数据源',
        },
        {
          platform: '公有',
          property: 'rowkey',
          type: 'String',
          default: '-1',
          needed: 'Y',
          description: '指定rowkey',
        },
      ],
      columns: [
        {
          align: 'left',
          width: 200,
          minWidth: '200',
          className: 'row',
          ellipsis: true,
          colKey: 'type',
          slots: { title: 'customTitle' },
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
          width: 100,
          fixed: 'right',
          minWidth: '100',
          className: 'test3',
          ellipsis: true,
          colKey: 'needed',
          title: '是否必传',
        },
        {
          align: 'left',
          fixed: 'right',
          width: 100,
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
      empty: {
        customRender: 'empty',
      },
      height: 100,
      rowClassName: rowKey => `${rowKey}-class`,
      // 与pagination对齐
      pagination: {
        pageSize: 10,
        pageIndex: 0,
        total: 100,
      },
    };
  },
};
</script>
