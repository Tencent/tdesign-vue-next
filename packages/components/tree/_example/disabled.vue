<template>
  <t-space direction="vertical" style="width: 90%">
    <t-space>
      <span>是否禁用整个 tree:</span>
      <t-switch v-model="disabled" />
    </t-space>
    <t-space>
      <span>可选:</span>
      <t-switch v-model="checkable" />
    </t-space>
    <t-space>
      <span>可激活:</span>
      <t-switch v-model="activable" />
    </t-space>
    <t-tree
      ref="tree"
      hover
      expand-all
      :checkable="checkable"
      :activable="activable"
      :data="items"
      :label="label"
      :disabled="disabled"
      :disable-check="fnDisableCheck"
      :check-strictly="false"
    >
      <template #operations="{ node }">
        <t-space :size="10">
          <t-button v-if="node.disabled" size="small" theme="success" variant="base" @click="setEnable(node)">
            enable
          </t-button>
          <t-button v-if="!node.disabled" size="small" theme="warning" variant="base" @click="setDisable(node)">
            disable
          </t-button>
        </t-space>
      </template>
    </t-tree>
  </t-space>
</template>

<script setup>
import { ref } from 'vue'; // 预期规则:
// 默认父节点被禁用，所有子节点一并呈现禁用状态
// checkStrictly = true 时，父节点禁用状态不影响子节点禁用状态。
// 父节点操作选中，不影响被禁用的子节点的原始选中状态。
// 子节点被禁用且未选中，父节点半选状态再次点击可切换为未选中状态。
const tree = ref();
const checkable = ref(true);
const activable = ref(false);
const disabled = ref(false);

const items = ref([
  {
    value: '1',
    children: [
      {
        value: '1.1',
        children: [
          {
            value: '1.1.1',
          },
          {
            value: '1.1.2',
          },
        ],
      },
      {
        value: '1.2',
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
    value: '2',
    children: [
      {
        value: '2.1',
        disabled: true,
        children: [
          {
            value: '2.1.1',
          },
          {
            value: '2.1.2',
          },
        ],
      },
      {
        value: '2.2',
        children: [
          {
            value: '2.2.1',
          },
          {
            value: '2.2.2',
          },
        ],
      },
    ],
  },
]);

const label = (h, node) => {
  return String(node.value);
};
const setEnable = (node) => {
  tree.value.setItem(node.value, {
    disabled: false,
  });
};
const setDisable = (node) => {
  tree.value.setItem(node.value, {
    disabled: true,
  });
};
</script>
