<template>
  <t-space direction="vertical" style="width: 100%">
    <h3>虚拟滚动 - virtual 模式</h3>
    <t-space>
      <span>动画:</span>
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
      <span>可选:</span>
      <t-switch v-model="isCheckable" />
    </t-space>
    <t-space>
      <span>可操作:</span>
      <t-switch v-model="isOperateAble" />
    </t-space>
    <t-space>
      <t-button theme="primary" @click="clearTree">清空 tree</t-button>
    </t-space>
    <t-space>
      <t-input-adornment prepend="level1 节点数量:">
        <t-input v-model="textLevel1Count" />
      </t-input-adornment>
      <t-input-adornment prepend="level2 节点数量:">
        <t-input v-model="textLevel2Count" />
      </t-input-adornment>
      <t-input-adornment prepend="level3 节点数量:">
        <t-input v-model="textLevel3Count" />
      </t-input-adornment>
      <t-button theme="primary" @click="createTree">构造 tree</t-button>
    </t-space>
    <t-space>
      <t-input-adornment prepend="插入节点数量:">
        <t-input v-model="textInsertCount" />
      </t-input-adornment>
    </t-space>
    <t-space>
      <t-button @click="append()">插入根节点</t-button>
    </t-space>
    <t-space>
      <t-input-adornment prepend="filter:">
        <t-input v-model="filterText" @change="onInput" />
      </t-input-adornment>
    </t-space>
    <t-tree
      ref="tree"
      :data="items"
      hover
      activable
      :checkable="isCheckable"
      expand-all
      :height="300"
      :transition="transition"
      :expand-on-click-node="false"
      :line="showLine"
      :icon="showIcon"
      :label="label"
      :filter="filterByText"
      :scroll="{
        rowHeight: 34,
        bufferSize: 10,
        threshold: 10,
        type: 'virtual',
      }"
    >
      <template #operations="{ node }">
        <div v-if="isOperateAble" class="tdesign-demo-block-row">
          <t-button size="small" variant="base" @click="append(node)">添加子节点</t-button>
          <t-button size="small" variant="base" theme="danger" @click="remove(node)">删除</t-button>
        </div>
      </template>
    </t-tree>
    <div style="height: 100px"></div>
  </t-space>
</template>

<script setup>
import { ref, computed } from 'vue';
const tree = ref();
const index = ref(0);
const transition = ref(true);
const textInsertCount = ref('1');
const showLine = ref(true);
const showIcon = ref(true);
const isCheckable = ref(true);
const isOperateAble = ref(true);
const items = ref([]);
const filterText = ref('');
const filterByText = ref(null);
const textLevel1Count = ref('10');
const textLevel2Count = ref('10');
const textLevel3Count = ref('10');
const level1Count = computed(() => {
  return parseInt(textLevel1Count.value, 10) || 1;
});
const level2Count = computed(() => {
  return parseInt(textLevel2Count.value, 10) || 1;
});
const level3Count = computed(() => {
  return parseInt(textLevel3Count.value, 10) || 1;
});
const insertCount = computed(() => {
  return parseInt(textInsertCount.value, 10) || 1;
});
const label = (h, node) => {
  return `${node.value}`;
};
const getValue = () => {
  index.value += 1;
  return `t${index.value}`;
};
const getInsertItem = () => {
  const value = getValue();
  return {
    value,
  };
};
const append = (node) => {
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
const remove = (node) => {
  node.remove();
};
const onInput = (state) => {
  console.info('onInput:', state);
  if (filterText.value) {
    // 存在过滤文案，才启用过滤
    filterByText.value = (node) => {
      const rs = node.value.indexOf(filterText.value) >= 0;
      // 命中的节点会强制展示
      // 命中节点的路径节点会锁定展示
      // 未命中的节点会隐藏
      return rs;
    };
  } else {
    // 过滤文案为空，则还原 tree 为无过滤状态
    filterByText.value = null;
  }
};
const createTreeData = () => {
  const allLevels = [level1Count.value, level2Count.value, level3Count.value];
  const createNodes = (items, level) => {
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
          item.children = [];
          createNodes(item.children, level + 1);
        }
      }
    }
  };
  const items = [];
  createNodes(items, 0);
  return items;
};
const createTree = () => {
  items.value = createTreeData();
};
const clearTree = () => {
  items.value = [];
};
</script>
