<template>
  <t-cascader v-model="value" :options="options">
    <template #panelHeader="{ panelIndex }">
      <t-input v-if="panelIndex === 1" v-model="searchValue" placeholder="请输入搜索内容" />
    </template>
  </t-cascader>
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
