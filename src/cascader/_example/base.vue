<template>
  <t-cascader v-model="value" :options="options" clearable @change="onChange" />
</template>

<script setup lang="ts">
import { CascaderChangeContext, CascaderValue } from 'tdesign-vue-next';
import { ref } from 'vue';

type CascaderOption = {
  label: string;
  value: string;
  children: {
    label: string;
    value: string;
  }[];
};

const options: CascaderOption[] = [
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

const onChange = (value: CascaderValue<CascaderOption>, context: CascaderChangeContext<CascaderOption>) => {
  console.log(value);
  console.log(context);
};
</script>
