<template>
  <t-space :size="32" direction="vertical" class="tdesign-tree-demo" style="width: 100%">
    <t-space :size="10" direction="vertical" class="tdesign-tree-vscroll-lazy" style="width: 80%">
      <h3 class="title">虚拟滚动 - lazy模式</h3>
      <t-tree
        ref="tree"
        :data="lazyItems"
        hover
        activable
        expand-all
        :height="300"
        :expand-on-click-node="false"
        :label="label"
        :scroll="{
          rowHeight: 34,
          bufferSize: 10,
          threshold: 10,
          type: 'lazy',
        }"
      ></t-tree>
    </t-space>

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
            <t-input v-model="textInsertCount" />
          </t-input-adornment>
        </t-form-item>
        <t-form-item>
          <t-button @click="append()">插入根节点</t-button>
        </t-form-item>
      </t-form>
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
const allLevels = [5, 5, 5];

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

const lazyTree = createTreeData();
const virtualTree = createTreeData();

export default {
  data() {
    return {
      index: 0,
      transition: true,
      textInsertCount: '1',
      useActived: false,
      enableVScroll: true,
      lazyVScroll: false,
      expandParent: true,
      showLine: true,
      showIcon: true,
      isCheckable: true,
      isOperateAble: true,
      items: virtualTree.items,
      lazyItems: lazyTree.items,
    };
  },
  computed: {
    insertCount() {
      return parseInt(this.textInsertCount, 10) || 1;
    },
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
  },
};
</script>
