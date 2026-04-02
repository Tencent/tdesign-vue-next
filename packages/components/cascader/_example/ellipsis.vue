<template>
  <t-space direction="vertical">
    <t-cascader v-model="value1" :options="options" clearable placeholder="请选择" />
    <t-cascader v-model="value2" multiple :options="options" clearable placeholder="请选择" />
  </t-space>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { CascaderProps } from 'tdesign-vue-next';
const options: CascaderProps['options'] = [
  {
    label: '当选项一数据展示文本过长时',
    value: '1',
    children: [
      {
        label: '子选项一',
        value: '1.1',
      },
      {
        label: '子选项二',
        value: '1.2',
      },
      {
        label: '当选项数据展示文本过长时',
        value: '1.3',
      },
    ],
  },
  {
    label: '选项二',
    value: '2',
    children: [
      {
        label: '子选项一',
        value: '2.1',
      },
      {
        label: '当选项数据展示文本过长时',
        value: '2.2',
      },
    ],
  },
];
const value1 = ref('1.1');
const value2 = ref(['1.1']);
</script>
<style>
.t-cascader-demo {
  width: 100%;
}
</style>
