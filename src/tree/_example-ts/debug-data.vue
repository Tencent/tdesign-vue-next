<template>
  <t-space direction="vertical">
    <h3>数据切换</h3>
    <t-space>
      <span>切换数据:</span>
      <t-switch @change="toggleData" />
    </t-space>
    <t-space>
      <span>默认展开全部:</span>
      <t-switch v-model="expandAll" />
    </t-space>
    <t-space>
      <span>可选:</span>
      <t-switch v-model="checkable" />
    </t-space>
    <t-space>
      <span>节点可高亮:</span>
      <t-switch v-model="activable" />
    </t-space>
    <t-space>
      <span>展开动画:</span>
      <t-switch v-model="transition" />
    </t-space>
    <t-tree
      :data="items"
      hover
      :expand-all="expandAll"
      :transition="transition"
      :activable="activable"
      :checkable="checkable"
      :label="label"
    />
  </t-space>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TreeProps, SwitchProps, TNode, TreeNodeModel, TreeOptionData, SlotReturnValue } from 'tdesign-vue-next';
const data1 = [
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
            value: '1.2.1',
          },
          {
            value: '1.2.2',
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
];
const data2 = [
  {
    value: 'd1',
    children: [
      {
        value: 'd1.1',
        label: 'd1.1 custom label',
        children: [
          {
            value: 'd1.1.1',
          },
        ],
      },
      {
        value: 'd1.2',
        children: [
          {
            value: 'd1.2.1',
          },
          {
            value: 'd1.2.2',
          },
        ],
      },
    ],
  },
  {
    value: 'd2',
    children: [
      {
        value: 'd2.1',
      },
      {
        value: 'd2.2',
      },
    ],
  },
];
const expandAll = ref(true);
const activable = ref(true);
const checkable = ref(true);
const transition = ref(true);
const items = ref<TreeProps['data']>(data1);
const toggleData: SwitchProps['onChange'] = () => {
  const tmpItems = items.value[0].value === 't1' ? data2 : data1;
  items.value = tmpItems;
};
const label: TNode<TreeNodeModel<TreeOptionData>> = (h, node) => {
  return (node.label || node.value) as SlotReturnValue;
};
</script>
