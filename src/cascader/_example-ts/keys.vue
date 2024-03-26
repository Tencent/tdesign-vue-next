<template>
  <t-space direction="vertical">
    <t-cascader
      v-model="value"
      :keys="{ label: 'name', value: 'code', children: 'items' }"
      :options="options"
      clearable
    />
    <t-cascader
      v-model="value2"
      :keys="{ label: 'name', value: 'code', children: 'items' }"
      :options="options"
      clearable
      multiple
    />
  </t-space>
</template>

<script lang="tsx" setup>
import { ref } from 'vue';
import { CascaderProps } from 'tdesign-vue-next';
const options: CascaderProps['options'] = [
  {
    name: '选项一',
    code: '1',
    items: [
      {
        name: '子选项一',
        code: '1.1',
      },
      {
        name: '子选项二',
        code: '1.2',
      },
      {
        name: '子选项三',
        code: '1.3',
      },
    ],
  },
  {
    name: '选项二',
    code: '2',
    items: [
      {
        name: '子选项一',
        code: '2.1',
      },
      {
        name: '子选项二',
        code: '2.2',
      },
    ],
  },
];
const value = ref('1.1');
const value2 = ref(['1.1']);
</script>
