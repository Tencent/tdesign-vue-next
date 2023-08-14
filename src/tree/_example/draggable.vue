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

const handleDragStart = ({ node, e }) => {
  console.log('handleDragStart', node.value, e);
};
const handleDragEnd = ({ node, e }) => {
  console.log('handleDragEnd', node.value, e);
};
const handleDragOver = () => {};
const handleDragLeave = ({ node, e }) => {
  console.log('handleDragLeave', node.value, e);
};
const handleDrop = ({ node, dropPosition, e }) => {
  console.log('handleDrop', node.value, dropPosition, e);
};
</script>
