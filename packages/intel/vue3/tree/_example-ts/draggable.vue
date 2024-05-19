<template>
  <t-space direction="vertical">
    <t-tree
      :data="items"
      activable
      hover
      transition
      expand-all
      draggable
      @drag-start="handleDragStart"
      @drag-end="handleDragEnd"
      @drag-over="handleDragOver"
      @drag-leave="handleDragLeave"
      @drop="handleDrop"
    />
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TreeProps } from 'tdesign-vue-next';
const items = ref<TreeProps['data']>([
  {
    value: '1',
    label: '1',
    children: [
      {
        value: '1.1',
        label: '1.1',
        children: [
          {
            value: '1.1.1',
            label: '1.1.1',
            children: [
              {
                value: '1.1.1.1',
                label: '1.1.1.1',
              },
              {
                value: '1.1.1.2',
                label: '1.1.1.2',
              },
            ],
          },
          {
            value: '1.1.2',
            label: '1.1.2',
            children: [
              {
                value: '1.1.2.1',
                label: '1.1.2.1',
              },
              {
                value: '1.1.2.2',
                label: '1.1.2.2',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    value: '2',
    label: '2',
    children: [
      {
        value: '2.1',
        label: '2.1',
      },
      {
        value: '2.2',
        label: '2.2',
      },
    ],
  },
]);
const handleDragStart: TreeProps['onDragStart'] = (ctx) => {
  console.log('handleDragStart', ctx);
};
const handleDragEnd: TreeProps['onDragEnd'] = (ctx) => {
  console.log('handleDragEnd', ctx);
};
const handleDragOver: TreeProps['onDragOver'] = (ctx) => {
  console.log('handleDragOver', ctx);
};
const handleDragLeave: TreeProps['onDragLeave'] = (ctx) => {
  console.log('handleDragLeave', ctx);
};
const handleDrop: TreeProps['onDrop'] = (ctx) => {
  console.log('handleDrop', ctx);
};
</script>
