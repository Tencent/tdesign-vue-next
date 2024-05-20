<template>
  <t-tree-select
    v-model="value"
    :data="options"
    clearable
    placeholder="请选择"
    :treeProps="{
      load: loadFunc,
    }"
    style="width: 300px"
  />
</template>
<script setup>
import { ref } from 'vue';

const value = ref('');
const options = ref([
  {
    label: '选项1',
    value: '1',
    children: true,
  },
  {
    label: '选项2',
    value: '2',
    children: true,
  },
]);
const loadFunc = (node) => new Promise((resolve) => {
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
  }, 2000);
});
</script>
