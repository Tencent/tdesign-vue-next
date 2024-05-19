<template>
  <t-space direction="vertical">
    <!-- 非受控用法 -->
    <t-cascader :options="options" :default-value="value" clearable size="small" />
    <!-- 受控+语法糖用法 -->
    <t-cascader v-model="value" :options="options" clearable size="medium" />
    <!-- 受控用法 -->
    <t-cascader :options="options" :value="value" clearable size="large" @change="handleValueChange" />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const options = [
  {
    label: '选项一',
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
        label: '子选项三',
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
        label: '子选项二',
        value: '2.2',
      },
    ],
  },
];

const value = ref('1.1');
const handleValueChange = (e) => {
  value.value = e;
};
</script>
