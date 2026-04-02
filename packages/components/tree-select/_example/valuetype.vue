<template>
  <t-space direction="vertical">
    <t-tree-select v-model="value" :data="options" clearable value-type="object" placeholder="请选择" />
    <t-tree-select v-model="mulValue" :data="options" clearable multiple value-type="object" placeholder="请选择" />
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
const value = ref({
  label: '深圳市',
  value: 'shenzhen',
});
const mulValue = ref([
  {
    label: '广州市',
    value: 'guangzhou',
  },
  {
    label: '深圳市',
    value: 'shenzhen',
  },
]);
</script>
