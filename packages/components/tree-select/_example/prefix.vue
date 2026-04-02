<template>
  <t-tree-select v-model="value" :data="options" placeholder="请输入">
    <template #prefixIcon>
      <t-icon name="browse" size="16" />
    </template>
  </t-tree-select>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TreeSelectProps } from 'tdesign-vue-next';
const options: TreeSelectProps['data'] = [
  {
    label: '开发一组',
    value: 'group1',
    children: [
      {
        label: '小赵',
        value: 'zhao',
      },
      {
        label: '小钱',
        value: 'qian',
      },
    ],
  },
  {
    label: '开发二组',
    value: 'group2',
    children: [
      {
        label: '小孙',
        value: 'sun',
      },
      {
        label: '小李',
        value: 'li',
      },
    ],
  },
];
const value = ref('');
</script>
