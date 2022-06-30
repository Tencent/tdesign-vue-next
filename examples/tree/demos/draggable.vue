<template>
  <div class="tdesign-tree-base">
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
  </div>
</template>

<script setup>
const items = [
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
];

const handleDragStart = ({ node, e }) => {};
const handleDragEnd = ({ node, e }) => {};
const handleDragOver = ({ node, e }) => {};
const handleDragLeave = ({ node, e }) => {};
const handleDrop = ({ node, dropPosition, e }) => {
  console.log(node, dropPosition, e);
};
</script>

<style scoped></style>
