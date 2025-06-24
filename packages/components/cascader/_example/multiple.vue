<template>
  <t-cascader v-model="value" :options="options" multiple clearable value-type="full" @focus="onFocus" @blur="onBlur" />
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
        value: '1.3',
      },
    ],
  },
];

const value = ref([['1', '1.3']]);

const onFocus = (ctx) => {
  console.log('focus', ctx);
};

const onBlur = (ctx) => {
  console.log('blur', ctx);
};
</script>
