<template>
  <t-space direction="vertical">
    filterable
    <t-cascader v-model="value1" filterable :options="options" clearable />
    <t-cascader v-model="value2" multiple filterable :options="options" clearable />
    filterable checkStrictly
    <t-cascader v-model="value3" filterable :options="options" clearable check-strictly />
    <t-cascader v-model="value4" multiple filterable :options="options" clearable check-strictly />
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

const value1 = ref('1.1');
const value2 = ref([]);
const value3 = ref([]);
const value4 = ref([]);

const onChange = (val, context) => {
  console.log(val, context);
};

const onFocus = (ctx) => {
  console.log('focus', ctx);
};

const onBlur = (ctx) => {
  console.log('blur', ctx);
};
</script>
