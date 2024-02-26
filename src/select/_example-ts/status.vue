<template>
  <t-space direction="vertical">
    <t-select v-model="value1" :options="options" placeholder="请选择云解决方案" />

    <t-select v-model="value2" :options="options" disabled placeholder="请选择云解决方案" />

    <t-select v-model="value3" :options="options" loading placeholder="请选择云解决方案" />
  </t-space>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { SelectProps } from 'tdesign-vue-next';
const options: SelectProps['options'] = [
  {
    label: '架构云',
    value: '1',
  },
  {
    label: '大数据',
    value: '2',
  },
  {
    label: '区块链',
    value: '3',
  },
  {
    label: '物联网',
    value: '4',
    disabled: true,
  },
  {
    label: '人工智能',
    value: '5',
  },
];
const value1 = ref('');
const value2 = ref('');
const value3 = ref('');
</script>
<style scoped>
.tdesign-demo-select-base {
  width: 680px;
  display: flex;
}

.tdesign-demo-select-base .t-select__wrap + .t-select__wrap {
  margin-left: 36px;
}
</style>
