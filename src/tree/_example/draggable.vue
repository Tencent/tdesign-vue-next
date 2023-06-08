<template>
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
</template>

<script setup lang="ts">
import { TreeNodeModel } from 'tdesign-vue-next';

type Item = {
  value: string;
  label: string;
  children: {
    value: string;
    label: string;
    children?: {
      value: string;
      label: string;
      children: {
        value: string;
        label: string;
      }[];
    }[];
  }[];
};
const items: Item[] = [
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
            draggable: false,
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
];

const handleDragStart = ({ node, e }: { e: DragEvent; node: TreeNodeModel<Item> }) => {
  console.log('handleDragStart', node.value, e);
};
const handleDragEnd = ({ node, e }: { e: DragEvent; node: TreeNodeModel<Item> }) => {
  console.log('handleDragEnd', node.value, e);
};
const handleDragOver = () => {};
const handleDragLeave = ({ node, e }: { e: DragEvent; node: TreeNodeModel<Item> }) => {
  console.log('handleDragLeave', node.value, e);
};
const handleDrop = ({ node, dropPosition, e }: { node: TreeNodeModel<Item>; e: DragEvent; dropPosition: number }) => {
  console.log('handleDrop', node.value, dropPosition, e);
};
</script>
