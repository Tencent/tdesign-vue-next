<template>
  <div class="tdesign-tree-base">
    <h3>render:</h3>
    <t-tree :data="items" hover expand-all :load="load" :icon="icon" />
    <h3>scope slot:</h3>
    <t-tree :data="items" hover lazy :load="load">
      <template #icon="{ node }">
        <t-icon v-if="node.getChildren() && !node.expanded" name="caret-right" />
        <t-icon v-else-if="node.getChildren() && node.expanded" name="caret-down" />
        <t-icon v-else name="attach" />
      </template>
    </t-tree>
  </div>
</template>

<script setup lang="ts">
import { resolveComponent, ref, h } from 'vue';
import { Icon as TIcon, TreeNodeModel } from 'tdesign-vue-next';
type H = typeof h;
type Item = {
  label: string;
  children: boolean;
};
const items = ref([
  {
    label: '1',
    children: true,
  },
  {
    label: '2',
    children: true,
  },
]);

const icon = (h: H, node: TreeNodeModel<Item[]>) => {
  console.log(node);
  let name = 'file';
  const TIcon = resolveComponent('t-icon');
  if (node.getChildren(true)) {
    if (node.expanded) {
      name = 'folder-open';
    } else {
      name = 'folder';
    }
  }

  return h(TIcon, {
    name,
  });
};

const load = (node: TreeNodeModel<Item[]>) => {
  console.log('load:', node);
  const maxLevel = 2;
  return new Promise((resolve) => {
    setTimeout(() => {
      let nodes = [];
      if (node.level < maxLevel) {
        nodes = [
          {
            label: `${node.label}.1`,
            children: node.level < maxLevel - 1,
          },
          {
            label: `${node.label}.2`,
            children: node.level < maxLevel - 1,
          },
        ];
      }
      resolve(nodes);
    }, 100);
  });
};
</script>
<style scoped>
.demo-tree-base {
  display: block;
}
</style>
