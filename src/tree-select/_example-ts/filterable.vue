<template>
  <t-space direction="vertical">
    <t-radio-group v-model="type" variant="default-filled">
      <t-radio-button value="default"> 默认 </t-radio-button>
      <t-radio-button value="function"> 自定义方法 </t-radio-button>
    </t-radio-group>
    <t-tree-select
      v-if="type === 'default'"
      v-model="value"
      :data="options"
      clearable
      filterable
      placeholder="请选择"
    />
    <t-tree-select v-else v-model="value" :data="options" clearable :filter="filterFunction" placeholder="请选择" />
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TreeSelectProps } from 'tdesign-vue-next';
const options: TreeSelectProps['data'] = [
  {
    label: '广东省',
    value: 'guangdong',
    children: [
      {
        label: '广州市',
        value: 'guangzhou',
      },
      {
        label: '深圳市',
        value: 'shenzhen',
      },
    ],
  },
  {
    label: '江苏省',
    value: 'jiangsu',
    children: [
      {
        label: '南京市',
        value: 'nanjing',
      },
      {
        label: '苏州市',
        value: 'suzhou',
      },
    ],
  },
];
const value = ref('shenzhen');
const type = ref('default');
const filterFunction: TreeSelectProps['filter'] = (searchText, node) => {
  return node.data.label.indexOf(searchText) >= 0;
};
</script>
