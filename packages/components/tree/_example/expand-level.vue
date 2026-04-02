<template>
  <t-space direction="vertical">
    <t-tree :data="items" hover :expand-level="1" />
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TreeProps } from 'tdesign-vue-next';
const items = ref<TreeProps['data']>([
  {
    label: '1',
    children: [
      {
        label: '1.1',
        children: [
          {
            label: '1.1.1',
          },
          {
            label: '1.1.2',
          },
        ],
      },
      {
        label: '1.2',
        children: [
          {
            label: '1.2.1',
          },
          {
            label: '1.2.2',
          },
        ],
      },
    ],
  },
  {
    label: '2',
    children: [
      {
        label: '2.1',
      },
      {
        label: '2.2',
      },
    ],
  },
]);
</script>
