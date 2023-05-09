<template>
  <t-cascader v-model="value" :options="options" clearable :load="load" />
</template>

<script setup lang="ts">
import { TreeNodeModel } from 'tdesign-vue-next';
import { ref } from 'vue';

type CascaderOption = {
  label: string;
  value: string;
  children: boolean;
};

const options = ref<CascaderOption[]>([
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

const value = ref();

const load = (node: TreeNodeModel<CascaderOption[]>) =>
  new Promise((resolve) => {
    setTimeout(() => {
      let nodes = [];
      if (node.level < 2) {
        nodes = [
          {
            label: `${node.label}.1`,
            children: node.level < 1,
          },
          {
            label: `${node.label}.2`,
            children: node.level < 1,
          },
        ];
      }
      resolve(nodes);
    }, 1000);
  });
</script>
