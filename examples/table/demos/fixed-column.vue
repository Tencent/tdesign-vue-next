<template>
  <t-table
    :data="data"
    :columns="columns"
    rowKey="index"
    bordered
  >
    <template #operation="slotProps">
      <a class="link" @click="rehandleClickOp(slotProps)">删除</a>
    </template>
  </t-table>
</template>
<script>
import { defineComponent } from 'vue';

const data = [];
for (let i = 0; i < 5; i ++) {
  data.push({
    index: i,
    platform: i % 2 === 0 ? '共有' : '私有',
    type: ['String', 'Number', 'Array', 'Object'][i % 4],
    default: ['-', '0', '[]', '{}'][i % 4],
    detail: {
      postion: `读取 ${i} 个数据的嵌套信息值`,
    },
    needed: i % 4 === 0 ? '是' : '否',
    description: '数据源',
  });
}
const columns = [
  {
    align: 'center',
    width: 100,
    colKey: 'index',
    title: '序号',
    fixed: 'left',
  },
  {
    colKey: 'platform',
    title: '平台',
    width: 100,
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
    colKey: 'description',
    title: '说明',
    width: 100,
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
    width: 100,
    fixed: 'right',
    cell: 'operation',
  },
]

export default defineComponent({
  setup() {
    return {
      data,
      columns
    }
  }
});
</script>
<style lang="less" scoped>
.tdesign-demo-block-column {
  width: 100%;
}
</style>