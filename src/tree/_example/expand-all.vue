<template>
  <t-space direction="vertical">
    <t-form label-width="150">
      <t-form-item label="切换数据">
        <t-switch @change="toggleData" />
      </t-form-item>
      <t-form-item label="展开动画">
        <t-switch v-model="transition" />
      </t-form-item>
    </t-form>
    <t-tree :data="items" expand-all :transition="transition" />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const data1 = [
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
];

const data2 = [
  {
    label: '1',
  },
  {
    label: '2',
  },
  {
    label: '3',
    children: [
      {
        label: '3.1',
      },
      {
        label: '3.2',
      },
    ],
  },
];

const items = ref(data1);
const transition = ref(true);

const toggleData = (value) => {
  items.value = value ? data2 : data1;
};
</script>
