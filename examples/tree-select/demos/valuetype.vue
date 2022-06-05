<template>
  <div class="tdesign-demo-block-row">
    <t-tree-select v-model="value" :data="options" clearable value-type="object" placeholder="请选择" />
    <t-tree-select
      v-model="mulValue"
      class="tree-select-multiple"
      :data="options"
      clearable
      multiple
      size="small"
      value-type="object"
      placeholder="请选择"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue';

const options = [
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

const value = ref({ label: '深圳市', value: 'shenzhen' });
const mulValue = ref([
  { label: '广州市', value: 'guangzhou' },
  { label: '深圳市', value: 'shenzhen' },
]);
</script>
<style scoped>
.tdesign-tree-select-base {
  width: 300px;
  margin: 0 20px;
}
.tree-select-multiple {
  margin-top: 20px;
}
</style>
