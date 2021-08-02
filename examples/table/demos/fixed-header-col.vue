<template>
  <t-table
    rowKey="index"
    :data="data"
    :columns="columns"
    height="200"
    bordered
  ></t-table>
</template>
<script>
const data = [];
for (let i = 0; i < 20; i ++) {
  data.push({
    index: i,
    platform: i % 2 === 0 ? '共有' : '私有',
    type: ['String', 'Number', 'Array', 'Object'][i % 4],
    default: ['-', '0', '[]', '{}'][i % 4],
    detail: {
      postion: `读取 ${i} 个数据的嵌套信息值`,
    },
    needed: i % 4 === 0 ? '是' : '否',
    operation: '删除',
  });
}
export default {
  data() {
    return {
      data,
      columns: [
        {
          align: 'center',
          width: 150,
          colKey: 'index',
          title: '序号',
          fixed: 'left',
        },
        {
          colKey: 'platform',
          title: '平台',
          width: 150,
          fixed: 'left',
        },
        {
          colKey: 'type',
          title: '类型',
          width: 150,
        },
        {
          colKey: 'default',
          title: '默认值',
          width: 150,
        },
        {
          colKey: 'detail.postion',
          title: '详情信息',
          width: 250,
        },
        {
          colKey: 'needed',
          title: '是否必传',
          width: 150,
          fixed: 'right',
        },
        {
          colKey: 'operation',
          title: '操作',
          width: 80,
          fixed: 'right',
        },
      ],
    };
  },
};
</script>
