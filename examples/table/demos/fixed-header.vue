<template>
  <t-table row-key="index" :data="data" :columns="columns" :max-height="200" />
</template>
<script>
import { defineComponent } from 'vue';

const data = [];
for (let i = 0; i < 20; i++) {
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
    width: '100',
    colKey: 'index',
    title: '序号',
  },
  {
    width: 100,
    colKey: 'platform',
    title: '平台',
  },
  {
    colKey: 'type',
    title: '类型',
  },
  {
    colKey: 'default',
    title: '默认值',
  },
  {
    colKey: 'needed',
    title: '是否必传',
  },
  {
    colKey: 'detail.postion',
    title: '详情信息',
    width: 200,
    ellipsis: true,
  },
  {
    colKey: 'description',
    title: '说明',
  },
];
export default defineComponent({
  setup() {
    return {
      data,
      columns,
    };
  },
});
</script>
