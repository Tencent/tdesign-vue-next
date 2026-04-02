<template>
  <t-space direction="vertical">
    {{ value }}
    <t-cascader v-model="value" :options="options" value-type="full" />
    {{ value2 }}
    <t-cascader v-model="value2" multiple :options="options" value-type="full" />
  </t-space>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { CascaderProps } from 'tdesign-vue-next';
const options: CascaderProps['options'] = [
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
const value = ref(['1', '1.1']);
const value2 = ref([
  ['1', '1.1'],
  ['1', '1.2'],
]);
</script>
