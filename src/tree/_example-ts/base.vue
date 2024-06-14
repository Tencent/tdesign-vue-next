<template>
  <t-space direction="vertical">
    <t-tree :data="items" activable hover transition />
  </t-space>
</template>

<script lang="ts" setup>
import { TreeProps } from 'tdesign-vue-next';
import { ref } from 'vue';
const items = ref<TreeProps['data']>([
  {
    label: '第一段',
    children: [
      {
        label: '第二段',
      },
      {
        label: '第二段',
      },
    ],
  },
  {
    label: '第一段',
    children: [
      {
        label: '第二段',
      },
      {
        label: '第二段',
      },
    ],
  },
  {
    label: '第一段',
    children: [
      {
        label: '第二段',
      },
      {
        label: '第二段',
      },
    ],
  },
  {
    label: '第一段',
    children: [
      {
        label: '第二段',
      },
      {
        label: '第二22段',
      },
    ],
  },
]);
</script>
