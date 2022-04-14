<template>
  <div>
    <t-cascader-panel
      v-model="value"
      :options="options"
      clearable
      size="medium"
      placeholder="请选择"
      @change="onChange"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const options = [
  {
    label: '选项一1231231231212313123132312',
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

const onChange = (e, context) => {
  console.log(e);
  console.log(context);
};
</script>
