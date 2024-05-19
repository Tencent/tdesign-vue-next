<template>
  <t-cascader v-model="value" :options="options" clearable @change="onChange">
    <template #label>
      <div>单选：</div>
    </template>
  </t-cascader>
</template>
<script setup>
import { ref } from 'vue';

const options = ref([
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
]);
const value = ref('1.1');
const onChange = (val, context) => {
  console.log(value.value, val, context);
  console.log('path: ', context.node.getPath());
};
</script>
