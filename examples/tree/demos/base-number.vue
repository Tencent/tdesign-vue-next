<template>
  <t-tree hover :data="items" :checkable="true" @change="onChange" @click="onClick" />
</template>

<script setup>
const items = [
  {
    label: '第一段',
    value: 1,
    children: [
      {
        value: 1.1,
        label: '第一段',
      },
      {
        value: 1.2,
        label: '第二段',
      },
    ],
  },
  {
    label: '第二段',
    value: 2,
    children: [
      {
        value: 2.1,
        label: '第一段',
      },
      {
        value: 2.2,
        label: '第二段',
      },
    ],
  },
  {
    label: '第三段',
    value: 'a',
    children: [
      {
        value: 'a.1',
        label: '第一段',
      },
      {
        value: 'a.2',
        label: '第二段',
      },
    ],
  },
  {
    label: '第四段',
    value: 'b',
    children: [
      {
        value: 'b.1',
        label: '第一段',
      },
      {
        value: 'b.2',
        label: '第二段',
      },
    ],
  },
];

const onClick = (context) => {
  console.info('onClick:', context);
};
const onChange = (checked, context) => {
  console.info('onChange:', checked, context);
};
</script>
