<template>
  <t-space direction="vertical">
    <t-space>
      <span>节点可高亮: </span>
      <t-switch v-model="activable" />
    </t-space>
    <t-space>
      <span>节点可多选高亮:</span>
      <t-switch v-model="activeMultiple" />
    </t-space>
    <t-space>
      <span>整个节点可点击:</span>
      <t-switch v-model="expandOnClickNode" />
    </t-space>
    <t-tree
      :data="items"
      expand-all
      :activable="activable"
      :active-multiple="activeMultiple"
      :expand-on-click-node="expandOnClickNode"
      :on-active="propOnActive"
      hover
      @click="onClick"
      @active="onActive"
    />
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TreeProps } from 'tdesign-vue-next';
const activable = ref(true);
const activeMultiple = ref(false);
const expandOnClickNode = ref(false);
const items = ref<TreeProps['data']>([
  {
    value: 't1',
    label: '1',
    children: [
      {
        value: 't1.1',
        label: '1.1',
      },
      {
        value: 't1.2',
        label: '1.2',
      },
    ],
  },
  {
    value: 't2',
    label: '2',
    children: [
      {
        value: 't2.1',
        label: '2.1',
      },
      {
        value: 't2.2',
        label: '2.2',
      },
    ],
  },
]);
const onClick: TreeProps['onClick'] = (context) => {
  console.info('onClick', context);
  const { node } = context;
  console.info(node.value, 'actived:', node.actived);
};
const onActive: TreeProps['onActive'] = (value, context) => {
  console.info('onActive', value, context);
  const { node } = context;
  console.info(node.value, 'actived:', node.actived);
};
const propOnActive: TreeProps['onActive'] = (value, context) => {
  console.info('propOnActive', value, context);
  const { node } = context;
  console.info(node.value, 'actived:', node.actived);
};
</script>
