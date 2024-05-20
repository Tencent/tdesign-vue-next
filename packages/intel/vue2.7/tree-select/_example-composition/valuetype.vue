<template>
  <t-space direction="vertical">
    <t-tree-select
      style="width: 300px"
      :data="options"
      v-model="value"
      clearable
      valueType="object"
      placeholder="请选择"
    />
    <t-tree-select
      style="width: 300px"
      :data="options"
      v-model="mulValue"
      clearable
      multiple
      valueType="object"
      placeholder="请选择"
    />
  </t-space>
</template>
<script setup>
import { ref, reactive } from 'vue';

const value = reactive({
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
const options = ref([
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
]);
</script>
