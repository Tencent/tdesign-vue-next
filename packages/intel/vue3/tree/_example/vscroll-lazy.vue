<template>
  <t-space :size="32" direction="vertical" style="width: 100%">
    <t-space direction="vertical" style="width: 80%">
      <h3>虚拟滚动 - lazy模式</h3>
      <t-tree
        ref="tree"
        :data="lazyItems"
        hover
        activable
        expand-all
        :height="300"
        :expand-on-click-node="false"
        :label="label"
        :scroll="{
          rowHeight: 34,
          bufferSize: 10,
          threshold: 10,
          type: 'lazy',
        }"
      ></t-tree>
    </t-space>
    <div style="height: 100px"></div>
  </t-space>
</template>

<script setup>
import { ref } from 'vue';
const allLevels = [5, 5, 5];
function createTreeData() {
  let cacheIndex = 0;
  function getValue() {
    cacheIndex += 1;
    return `t${cacheIndex}`;
  }
  function createNodes(items, level) {
    const count = allLevels[level];
    if (count) {
      let index = 0;
      for (index = 0; index < count; index += 1) {
        const value = getValue();
        const item = {
          value,
        };
        items.push(item);
        if (allLevels[level + 1]) {
          item.children = [];
          createNodes(item.children, level + 1);
        }
      }
    }
  }
  const items = [];
  createNodes(items, 0);
  return {
    getValue,
    items,
  };
}
const lazyTree = createTreeData();
const lazyItems = ref(lazyTree.items);
const label = (h, node) => {
  return `${node.value}`;
};
</script>
