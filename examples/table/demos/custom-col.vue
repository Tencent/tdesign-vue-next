<template>
  <div class="tdesign-demo-block-column-large">
    <!-- 按钮操作区域 -->
    <!-- 设置哪些列允许自定义显示 :columnController="{ fields: ['platform', 'type', 'default']}" -->
    <t-table
      row-key="index"
      :data="data"
      :columns="columns"
      :column-controller="{ displayType: 'fixed-width', fields: ['platform', 'type', 'default'] }"
      table-layout="auto"
      stripe
      bordered
      @column-change="onColumnChange"
    ></t-table>
  </div>
</template>
<script setup lang="jsx">
const data = [];
for (let i = 0; i < 5; i++) {
  data.push({
    index: i,
    platform: i % 2 === 0 ? '共有' : '私有',
    type: ['String', 'Number', 'Array', 'Object'][i % 4],
    default: ['-', '0', '[]', '{}'][i % 4],
    detail: {
      position: `读取 ${i} 个数据的嵌套信息值`,
    },
    needed: i % 4 === 0 ? '是' : '否',
    description: '数据源',
  });
}

const columns = [
  {
    align: 'center',
    className: 'row',
    colKey: 'index',
    title: '序号',
  },
  {
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
    colKey: 'detail.position',
    title: '详情信息',
    ellipsis: true,
  },
];

const onColumnChange = (params) => {
  console.log(params);
};
</script>
