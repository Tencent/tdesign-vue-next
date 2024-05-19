<template>
  <t-space direction="vertical">
    <t-space>
      <span>可选:</span>
      <t-switch v-model="checkable" />
    </t-space>
    <t-space>
      <span>严格模式:</span>
      <t-switch v-model="checkStrictly" />
    </t-space>
    <t-tree
      ref="tree"
      :data="items"
      hover
      expand-all
      :checkable="checkable"
      :check-strictly="checkStrictly"
      :load="load"
      value-mode="all"
      @load="onLoad"
    />
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TreeOptionData, TreeProps } from 'tdesign-vue-next';
const checkable = ref(true);
const checkStrictly = ref(false);
const items = ref<TreeProps['data']>([
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
]);
const onLoad: TreeProps['onLoad'] = (state) => {
  console.log('on load:', state);
};
const load: TreeProps['load'] = (node) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let nodes: TreeOptionData[] = [];
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
};
</script>
