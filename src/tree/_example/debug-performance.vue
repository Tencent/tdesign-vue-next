<template>
  <t-space :size="32" direction="vertical" class="tdesign-tree-demo">
    <t-space :size="10" direction="vertical">
      <t-form label-width="150" style="max-width: 500px">
        <t-form-item>
          <t-input-adornment prepend="插入节点数量:">
            <t-input v-model="insertCount" />
          </t-input-adornment>
        </t-form-item>
        <t-form-item label="展开动画">
          <t-switch v-model="transition" />
        </t-form-item>
        <t-form-item label="显示连线">
          <t-switch v-model="showLine" />
        </t-form-item>
        <t-form-item label="显示图标">
          <t-switch v-model="showIcon" />
        </t-form-item>
        <t-form-item>
          <t-button @click="append()">插入根节点</t-button>
        </t-form-item>
      </t-form>

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
  </t-space>
</template>

<script>
const allLevels = [3, 3, 3];

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

function createTreeData() {
  const items = [];
  createNodes(items, 0);
  return items;
}

export default {
  data() {
    const items = createTreeData();
    return {
      index: 0,
      transition: true,
      insertCount: 1,
      useActived: false,
      expandParent: true,
      showLine: true,
      showIcon: true,
      items,
    };
  },
  methods: {
    label(createElement, node) {
      return `${node.value}`;
    },

    getInsertItem() {
      const value = getValue();
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

<style>
.tdesign-tree-demo .t-tree {
  margin-bottom: 20px;
}
.tdesign-tree-demo .title {
  margin-bottom: 10px;
}
.tdesign-tree-demo .tips {
  margin-bottom: 10px;
}
.tdesign-tree-demo .operations {
  margin-bottom: 10px;
}
.tdesign-tree-demo .t-form__item {
  margin-bottom: 5px;
}
</style>
