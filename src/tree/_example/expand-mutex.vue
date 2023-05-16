<template>
  <t-space direction="vertical">
    <t-form label-width="120">
      <t-form-item label="互斥展开">
        <t-switch v-model="mutex" />
      </t-form-item>
      <t-form-item label="整个节点可点击">
        <t-switch v-model="expandOnClickNode" />
      </t-form-item>
    </t-form>
    <t-tree
      :data="items"
      hover
      :expand-mutex="mutex"
      :expand-on-click-node="expandOnClickNode"
      @click="onClick"
      @expand="handleExpand"
    />
  </t-space>
</template>

<script setup lang="ts">
import { TreeNodeModel } from 'tdesign-vue-next';
import { ref } from 'vue';

type Item = {
  label: string;
  children: {
    label: string;
    children?: {
      label: string;
      children?: {
        label: string;
      }[];
    }[];
  }[];
};

const items: Item[] = [
  {
    label: '1',
    children: [
      {
        label: '1.1',
        children: [
          {
            label: '1.1.1',
          },
          {
            label: '1.1.2',
          },
        ],
      },
      {
        label: '1.2',
        children: [
          {
            label: '1.2.1',
          },
          {
            label: '1.2.2',
          },
        ],
      },
    ],
  },
  {
    label: '2',
    children: [
      {
        label: '2.1',
        children: [
          {
            label: '2.1.1',
          },
          {
            label: '2.1.2',
          },
        ],
      },
      {
        label: '2.2',
        children: [
          {
            label: '2.2.1',
          },
          {
            label: '2.2.2',
          },
        ],
      },
    ],
  },
];

const mutex = ref(true);
const expandOnClickNode = ref(true);

const onClick = (context: { node: TreeNodeModel<Item>; e: MouseEvent }) => {
  console.info('onClick', context);
};

const handleExpand = (
  value: Item[],
  context: { node: TreeNodeModel<Item>; e?: MouseEvent; trigger: 'node-click' | 'icon-click' | 'setItem' },
) => {
  console.info('onExpand', value, context);
};
</script>
