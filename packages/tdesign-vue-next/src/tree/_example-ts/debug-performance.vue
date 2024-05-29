<template>
  <t-space direction="vertical">
    <t-space>
      <t-input-adornment prepend="插入节点数量:">
        <t-input v-model="textInsertCount" />
      </t-input-adornment>
    </t-space>
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
    <t-space>
      <t-button @click="append()">插入根节点</t-button>
    </t-space>
    <t-tree
      ref="tree"
      :data="items"
      hover
      activable
      checkable
      :transition="transition"
      :expand-on-click-node="false"
      :line="showLine"
      :icon="showIcon"
      :label="label"
    >
      <template #operations="{ node }">
        <div class="tdesign-demo-block-row">
          <t-button size="small" variant="base" @click="append(node)">添加子节点</t-button>
          <t-button size="small" variant="base" theme="danger" @click="remove(node)">删除</t-button>
        </div>
      </template>
    </t-tree>
  </t-space>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import { TreeProps, TreeInstanceFunctions } from 'tdesign-vue-next';
const allLevels = [3, 3, 3];
let cacheIndex = 0;
function getValue() {
  cacheIndex += 1;
  return `t${cacheIndex}`;
}

// @ts-ignore
function createNodes(items, level) {
  const count = allLevels[level];
  if (count) {
    let index = 0;
    for (index = 0; index < count; index += 1) {
      const value = getValue();
      const item = {
        value,
      };
      items.push(item);
      if (allLevels[level + 1]) {
        // @ts-ignore
        item.children = [];
        // @ts-ignore
        createNodes(item.children, level + 1);
      }
    }
  }
}
function createTreeData() {
  const items: TreeProps['data'] = [];
  createNodes(items, 0);
  return items;
}
const tree = ref<TreeInstanceFunctions>();
const initialData = createTreeData();
const transition = ref(true);
const textInsertCount = ref('1');
const showLine = ref<TreeProps['line']>(true);
const showIcon = ref<TreeProps['icon']>(true);
const items = ref<TreeProps['data']>(initialData);
const insertCount = computed(() => {
  return parseInt(textInsertCount.value, 10) || 1;
});
const label: TreeProps['label'] = (h, node) => {
  return `${node.value}`;
};
const getInsertItem = () => {
  const value = getValue();
  return {
    value,
  };
};
const append = (node?: { value: number }) => {
  if (!node) {
    for (let index = 0; index < insertCount.value; index += 1) {
      const item = getInsertItem();
      tree.value.appendTo('', item);
    }
  } else {
    for (let index = 0; index < insertCount.value; index += 1) {
      const item = getInsertItem();
      tree.value.appendTo(node.value, item);
    }
  }
};

// @ts-ignore
const remove = (node) => {
  node.remove();
};
</script>
