<template>
  <div class="tdesign-tree-select-lazy">
    <t-tree-select
      v-model="value"
      :data="options"
      clearable
      placeholder="请选择"
      :tree-props="{
        load: loadFunc,
      }"
    />
  </div>
</template>
<script setup>
import { ref } from 'vue';

const options = [
  {
    label: 'A',
    value: '1',
    children: true,
  },
  {
    label: 'B',
    value: '2',
    children: true,
  },
];

const value = ref('');

const loadFunc = (node) =>
  new Promise((resolve) => {
    let timer = setTimeout(() => {
      let nodes = [];
      if (node.level < 2) {
        nodes = [
          {
            label: `${node.label}.A`,
            value: `${node.value}.1`,
            children: true,
          },
          {
            label: `${node.label}.B`,
            value: `${node.value}.2`,
            children: true,
          },
        ];
      }
      resolve(nodes);
      clearTimeout(timer);
      timer = null;
    }, 1000);
  });
</script>
<style scoped>
.tdesign-tree-select-lazy {
  width: 300px;
  margin: 0 20px;
}
</style>
