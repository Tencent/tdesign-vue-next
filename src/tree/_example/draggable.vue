<template>
  <t-space direction="vertical">
    <t-tree
      :data="items"
      activable
      hover
      transition
      expand-all
      draggable
      :allow-drop="handleAllowDrop"
      @drag-start="handleDragStart"
      @drag-end="handleDragEnd"
      @drag-over="handleDragOver"
      @drag-leave="handleDragLeave"
      @drop="handleDrop"
    />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';
const items = ref([
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
        label: '2.2 不允许拖放为 2.2 的子节点',
      },
    ],
  },
]);
const handleDragStart = (ctx) => {
  console.log('handleDragStart', ctx);
};
const handleDragEnd = (ctx) => {
  console.log('handleDragEnd', ctx);
};
const handleDragOver = (ctx) => {
  console.log('handleDragOver', ctx);
};
const handleDragLeave = (ctx) => {
  console.log('handleDragLeave', ctx);
};
const handleDrop = (ctx) => {
  console.log('handleDrop', ctx);
};
const handleAllowDrop = (ctx) => {
  const { dropNode, dropPosition } = ctx;
  if (dropNode.value === '2.2' && dropPosition === 0) {
    return false;
  }
};
</script>
