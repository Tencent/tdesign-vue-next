<template>
  <t-tree-select
    v-model="value"
    :data="options"
    clearable
    placeholder="请选择"
    :tree-props="{
      load: loadFunc,
    }"
  />
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TreeNodeModel } from 'tdesign-vue-next';
interface TreeNode {
  label: string;
  value: string;
  children?: boolean | TreeNode[];
}
const options: TreeNode[] = [
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
const value = ref('');
const loadFunc = (node: TreeNodeModel<TreeNode>) =>
  new Promise((resolve) => {
    let timer = setTimeout(() => {
      let nodes: TreeNode[] = [];
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
      clearTimeout(timer);
      timer = null;
    }, 1000);
  });
</script>
