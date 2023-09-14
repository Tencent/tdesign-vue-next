<template>
  <t-space :size="32" direction="vertical" class="tdesign-tree-demo" style="width: 100%">
    <t-space :size="10" direction="vertical" style="width: 100%">
      <h3 class="title">虚拟滚动 - virtual 模式</h3>
      <t-form label-width="150" style="max-width: 500px">
        <t-form-item label="动画">
          <t-switch v-model="transition" />
        </t-form-item>
        <t-form-item label="显示连线">
          <t-switch v-model="showLine" />
        </t-form-item>
        <t-form-item label="显示图标">
          <t-switch v-model="showIcon" />
        </t-form-item>
        <t-form-item label="可选">
          <t-switch v-model="isCheckable" />
        </t-form-item>
        <t-form-item label="可操作">
          <t-switch v-model="isOperateAble" />
        </t-form-item>
      </t-form>
      <t-form label-align="left" :label-width="80" style="max-width: 500px">
        <t-form-item>
          <t-input-adornment prepend="插入节点数量:">
            <t-input v-model="insertCount" />
          </t-input-adornment>
        </t-form-item>
        <t-form-item>
          <t-button @click="append()">插入根节点</t-button>
        </t-form-item>
        <t-form-item label="">
          <t-input-adornment prepend="filter:">
            <t-input v-model="filterText" @change="onInput" />
          </t-input-adornment>
        </t-form-item>
      </t-form>
    </t-space>
    <t-tree
      :data="items"
      hover
      activable
      ref="tree"
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

<script>
const allLevels = [10, 20, 25];

function createTreeData() {
  let cacheIndex = 0;

  function getValue() {
    cacheIndex += 1;
    return `t${cacheIndex}`;
  }

  function createNodes(items, level) {
    const count = allLevels[level];
    if (count) {
      let index = 0;
      for (index = 0; index < count; index += 1) {
        const value = getValue();
        const item = { value };
        items.push(item);
        if (allLevels[level + 1]) {
          item.children = [];
          createNodes(item.children, level + 1);
        }
      }
    }
  }

  const items = [];
  createNodes(items, 0);

  return {
    getValue,
    items,
  };
}

const virtualTree = createTreeData();

export default {
  data() {
    return {
      index: 0,
      transition: true,
      insertCount: 1,
      useActived: false,
      enableVScroll: true,
      lazyVScroll: false,
      expandParent: true,
      showLine: true,
      showIcon: true,
      isCheckable: true,
      isOperateAble: true,
      items: virtualTree.items,
      filterText: '',
      filterByText: null,
    };
  },
  methods: {
    label(createElement, node) {
      return `${node.value}`;
    },
    getInsertItem() {
      const value = virtualTree.getValue();
      return {
        value,
      };
    },
    append(node) {
      const { tree } = this.$refs;
      if (!node) {
        for (let index = 0; index < this.insertCount; index += 1) {
          const item = this.getInsertItem();
          tree.appendTo('', item);
        }
      } else {
        for (let index = 0; index < this.insertCount; index += 1) {
          const item = this.getInsertItem();
          tree.appendTo(node.value, item);
        }
      }
    },
    remove(node) {
      node.remove();
    },
    onInput(state) {
      console.info('onInput:', state);
      if (this.filterText) {
        // 存在过滤文案，才启用过滤
        this.filterByText = (node) => {
          const rs = node.value.indexOf(this.filterText) >= 0;
          // 命中的节点会强制展示
          // 命中节点的路径节点会锁定展示
          // 未命中的节点会隐藏
          return rs;
        };
      } else {
        // 过滤文案为空，则还原 tree 为无过滤状态
        this.filterByText = null;
      }
    },
  },
};
</script>
