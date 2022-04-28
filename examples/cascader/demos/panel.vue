<template>
  <div class="tdesign-demo-block-row">
    <t-cascader-panel v-model="value1" :options="options" clearable @change="onChange" />
    <t-cascader-panel v-model="value2" multiple :options="options" clearable @change="onChange" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const options = [
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
const value2 = ref(['1.1']);

const onChange = (e, context) => {
  console.log(e);
  console.log(context);
};
</script>
