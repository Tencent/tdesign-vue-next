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

<script lang="ts" setup>
import { ref } from 'vue'; // 预期规则:
// 默认父节点被禁用，所有子节点一并呈现禁用状态
// checkStrictly = true 时，父节点禁用状态不影响子节点禁用状态。
// 父节点操作选中，不影响被禁用的子节点的原始选中状态。
// 子节点被禁用且未选中，父节点半选状态再次点击可切换为未选中状态。
import { TreeInstanceFunctions, TreeProps, TypeTreeNodeModel } from 'tdesign-vue-next';
const tree = ref<TreeInstanceFunctions>();
const checkable = ref(true);
const activable = ref(false);
const disabled = ref(false);
const disabledMap = ref(new Map([['1.1', true]]));
const items = ref<TreeProps['data']>([
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
const fnDisableCheck: TreeProps['disableCheck'] = (node) => {
  const map = disabledMap.value;
  return map.get(String(node.value));
};
const label: TreeProps['label'] = (h, node) => {
  return String(node.value);
};
const setEnable = (node: TypeTreeNodeModel) => {
  const map = disabledMap.value;
  if (node.disabled) {
    map.delete(String(node.value));
    // 移除节点本身的 disabled 属性
    // 这个属性在 data 中被预先定义
    // 如果不更新状态，则该节点仍然被视为禁用状态
    tree.value.setItem(node.value, {
      disabled: false,
    });
    tree.value.refresh();
  }
};
const setDisable = (node: TypeTreeNodeModel) => {
  const map = disabledMap.value;
  // 交给 disable-check 接管 disabled 属性判断
  // 注意这里的逻辑: 如果先禁用了某个子节点，再禁用其父节点
  // 启用父节点时，子节点会仍然为禁用状态，因为它还在 map 当中，这是符合逻辑的
  map.set(String(node.value), true);
  // 由于传递给 tree 的 disableCheck 函数未变更，所以不会自动更新节点状态
  // 需要调用 refresh 方法来更新节点状态
  tree.value.refresh();
};
</script>
