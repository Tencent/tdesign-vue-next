<template>
  <t-space direction="vertical">
    <t-space>
      <span>互斥展开:</span>
      <t-switch v-model="mutex" />
    </t-space>
    <t-space>
      <span>整个节点可点击:</span>
      <t-switch v-model="expandOnClickNode" />
    </t-space>
    <t-tree
      :data="items"
      hover
      :expand-mutex="mutex"
      :expand-on-click-node="expandOnClickNode"
      :on-expand="propOnExpand"
      @click="onClick"
      @expand="onExpand"
    />
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TreeProps } from 'tdesign-vue-next';
const mutex = ref(true);
const expandOnClickNode = ref(true);
const items = ref<TreeProps['data']>([
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
]);
const onClick: TreeProps['onClick'] = (context) => {
  console.info('onClick', context);
};
const onExpand: TreeProps['onExpand'] = (value, context) => {
  console.info('onExpand', value, context);
};
const propOnExpand: TreeProps['onExpand'] = (value, context) => {
  console.info('propOnExpand', value, context);
};
</script>
