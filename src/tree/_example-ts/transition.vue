<template>
  <t-space direction="vertical">
    <t-space>
      <span>展开动画:</span>
      <t-switch v-model="transition" />
    </t-space>
    <t-space>
      <span>显示连线:</span>
      <t-switch v-model="showLine" />
    </t-space>
    <t-space>
      <span>显示图标:</span>
      <t-switch v-model="showIcon" />
    </t-space>
    <t-tree
      :data="items"
      hover
      activable
      checkable
      :transition="transition"
      :expand-on-click-node="false"
      :line="showLine"
      :icon="showIcon"
      :label="label"
    ></t-tree>
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TreeProps } from 'tdesign-vue-next';
const initialData = [
  {
    value: 't1',
    children: [
      {
        value: 't1.1',
        children: [
          {
            value: 't1.1.1',
          },
          {
            value: 't1.1.2',
          },
        ],
      },
      {
        value: 't1.2',
        children: [
          {
            value: 't1.2.1',
          },
          {
            value: 't1.2.2',
          },
        ],
      },
    ],
  },
  {
    value: 't2',
    children: [
      {
        value: 't2.1',
      },
      {
        value: 't2.2',
      },
    ],
  },
  {
    value: 't3',
    children: [
      {
        value: 't3.1',
      },
      {
        value: 't3.2',
      },
    ],
  },
];
const transition = ref(false);
const showLine = ref<TreeProps['line']>(true);
const showIcon = ref<TreeProps['icon']>(true);
const items = ref<TreeProps['data']>(initialData);
const label: TreeProps['label'] = (h, node) => {
  return `${node.value}`;
};
</script>
