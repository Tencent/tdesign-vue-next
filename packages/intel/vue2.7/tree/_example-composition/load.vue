<template>
  <t-space direction="vertical">
    <t-space>
      <span>可选:</span>
      <t-switch v-model="checkable" />
    </t-space>
    <t-space>
      <t-button @click="reload()">重新加载数据</t-button>
    </t-space>
    <t-tree v-model="value" :data="items" hover expand-all :checkable="checkable" :load="load" :lazy="false" />
  </t-space>
</template>

<script setup>
import { ref } from 'vue';

const treeData = [
  {
    label: '1',
    value: '1',
    children: true,
  },
  {
    label: '2',
    value: '2',
    children: true,
  },
];
const checkable = ref(true);
const value = ref(['1.1.1']);
const items = ref([]);
const reload = () => {
  items.value = [];
  setTimeout(() => {
    items.value = treeData;
  });
};
const load = (node) => new Promise((resolve) => {
  setTimeout(() => {
    let nodes = [];
    if (node.level < 2) {
      nodes = [
        {
          label: `${node.label}.1`,
          value: `${node.value}.1`,
          children: true,
        },
        {
          label: `${node.label}.2`,
          value: `${node.value}.2`,
          children: true,
        },
      ];
    }
    resolve(nodes);
  }, 1000);
});
</script>
