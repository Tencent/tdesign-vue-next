<template>
  <t-space :size="32" direction="vertical">
    <t-space direction="vertical">
      <h3>属性设置 jsx 形式</h3>
      <t-tree :data="items" expand-all :label="label"></t-tree>
    </t-space>
    <t-space direction="vertical">
      <h3>slot 形式</h3>
      <t-tree :data="items" expand-all checkable>
        <template #label="{ node }">
          <span style="color: blue">label: {{ node.label }}, value: {{ node.value }}</span>
        </template>
      </t-tree>
    </t-space>
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TreeProps } from 'tdesign-vue-next';
const items = ref<TreeProps['data']>([
  {
    label: '1',
    children: [
      {
        label: '1.1',
      },
      {
        label: '1.2',
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
]);
const label = ref<TreeProps['label']>((h, node) => {
  // 注意 vue2 和 vue3 下 h 的使用方法实际上存在差异
  return h('strong', `value: ${node.value}, label: ${node.label}`);
});
</script>
