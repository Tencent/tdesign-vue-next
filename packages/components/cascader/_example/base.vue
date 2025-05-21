<template>
  <t-cascader v-model="value" :options="options" clearable value-type="full" @change="onChange" />
</template>

<script setup>
import { onMounted, ref } from 'vue';

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
        value: '1.3',
      },
    ],
  },
];

// const value = ref([
//   ['1', '1.3'],
//   ['2', '2.1'],
// ]);

const value = ref(['1', '1.3']);

const onChange = (val, context) => {
  console.log(val, context);
};

const onFocus = (ctx) => {
  console.log('focus', ctx);
};

const onBlur = (ctx) => {
  console.log('blur', ctx);
};

// onMounted(() => {
//   console.log('mounted');
//   setTimeout(() => {
//     value.value = [
//       ['2', '1.3'],
//       ['2', '2.1'],
//     ];
//   }, 5000);
// });
</script>
