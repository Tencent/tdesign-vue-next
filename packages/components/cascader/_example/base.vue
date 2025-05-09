<template>
  <t-cascader v-model="value" :options="options" clearable filterable check-strictly multiple @change="onChange" />
</template>

<script setup>
import { ref } from 'vue';

const options = [
  {
    label: '选项一',
    value: '1',
    // disabled: true,
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

const onChange = (val, context) => {
  console.log('onChange', val, context);
};

// const onFocus = (ctx) => {
//   console.log('onFocus', ctx);
// };

// const onBlur = (ctx) => {
//   console.log('onBlur', ctx);
// };
</script>
