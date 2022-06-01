<template>
  <div class="tdesign-tree-base">
    <div class="operations">
      <t-form label-width="150">
        <t-form-item label="可选">
          <t-switch v-model="checkable" />
        </t-form-item>
        <t-form-item label="默认展开全部">
          <t-switch v-model="expandAll" />
        </t-form-item>
        <t-form-item label="懒加载">
          <t-switch v-model="lazy" />
        </t-form-item>
      </t-form>
    </div>
    <div v-if="rebuilding" class="rebuild-container">树重建中....</div>
    <t-tree v-else :data="items" :checkable="checkable" hover :load="load" :expand-all="expandAll" :lazy="lazy" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const checkable = ref(true);
const lazy = ref(true);
const expandAll = ref(false);
const rebuilding = ref(false);

const items = [
  {
    label: '1',
    children: true,
  },
  {
    label: '2',
    children: true,
  },
];

watch([lazy, expandAll], () => {
  rebuilding.value = true;
  setTimeout(() => {
    rebuilding.value = false;
  }, 1000);
});

const load = (node) =>
  new Promise((resolve) => {
    setTimeout(() => {
      let nodes = [];
      if (node.level < 2) {
        nodes = [
          {
            label: `${node.label}.1`,
            children: true,
          },
          {
            label: `${node.label}.2`,
            children: true,
          },
        ];
      }
      resolve(nodes);
    }, 1000);
  });
</script>
<style scoped>
.demo-tree-base {
  display: block;
}
.rebuild-container {
  width: 100px;
  margin: 50px 20px;
  text-align: center;
}
</style>
