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
    :onRowHover="onRowHover"
    :onRowClick="onRowClick"
    :onRowMouseup="onRowMouseup"
    @row-hover="rowHover"
    @row-click="rowClick"
    @page-change="rehandlePageChange"
    @change="rehandleChange"
    @row-mouseup="rowRowMouseup">
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
      /** 非受控用法：与分页组件对齐 */
      pagination: {
        defaultCurrent: 2,
        defaultPageSize: 10,
        total: 120,
      },
      /** 受控用法：与分页组件对齐（此处注释为受控用法示例，代码有效，勿删） */
      // pagination: {
      //   current: 1,
      //   pageSize: 10,
      //   total: 120,
      //   // 也可以监听表格组件的 page-change 事件进行处理
      //   onChange: (val) => {
      //     this.pagination.current = val;
      //   },
      //   // 也可以监听表格组件的 page-change 事件进行处理
      //   onPageSizeChange: (val) => {
      //     this.pagination.pageSize = val;
      //   },
      // },
    };
  },
  methods: {
    rehandlePageChange(curr, pageInfo) {
      console.log('分页变化', curr, pageInfo);
    },
    rehandleChange(changeParams, triggerAndData) {
      console.log('统一Change', changeParams, triggerAndData);
    },
    onRowHover(params) {
      console.log(params, '@row-hover与onRowHover任选一种方式即可，其他几个事件类似');
    },
    rowHover() {
      console.log('row-hover');
    },
    onRowClick(params) {
      console.log(params, '@row-click与onRowClick任选一种方式即可，其他几个事件类似');
    },
    rowClick() {
      console.log('row-click');
    },
    rowRowMouseup() {
      console.log('row-mouseup');
    },
    onRowMouseup() {
      console.log('@row-mouseup与onRowMouseup任选一种方式即可，其他几个事件类似');
    },
  },
};
</script>
